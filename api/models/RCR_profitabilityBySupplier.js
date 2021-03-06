var mongoose = require('mongoose'),
	http = require('http'),
	util = require('util'),
	_ = require('underscore'),
	request = require('request'),
	q = require('q');

//new Schema, 2014-Apr-17th:
var RCR_profitabilityBySupplierSchema = mongoose.Schema({
    period : Number,
    seminar : String,
    retailerID  : Number, //TBMRetailers : 1~3 (BMRetsMax)

    rcrps_ShelfSpace                     : [factoriesDetailsSchema],
    rcrps_NetSales                       : [factoriesDetailsSchema],
    rcrps_NetSalesPerShelfSpace          : [factoriesDetailsSchema],
    rcrps_NetSalesShare                  : [factoriesDetailsSchema],
    rcrps_GrossContribution              : [factoriesDetailsSchema],
    rcrps_GrossContributionPerShelfSpace : [factoriesDetailsSchema],
    rcrps_GrossContributionMargin        : [factoriesDetailsSchema],
    rcrps_GrossContributionShare         : [factoriesDetailsSchema],
    rcrps_PaymentTerms                   : [factoriesDetailsSchema],
})
    /*    
    {                                TFactories correspond to:                                                    }
    {       [1] = Supplier_1,                                                                                     }
    {       [2] = Supplier_2,                                                                                     }
    {       [3] = Supplier_3,                                                                                     }
    {       [4] = Supplier_4, only if he is ACTIVE player and in that case can sell his brands to B&M retailers,  }
    {                         otherwise (i.e. Supplier_4 is PASSIVE) this column(s) should not be displayed       }
    {                         because Supplier_4 brands are only sold on-line                                     }
    {       [5] = Supplier_4, this time as a producer of private labels                                           }
    */   
var factoriesDetailsSchema = mongoose.Schema({
    categoryID : Number,  //TCategoriesTotal : 1~2 
    marketID : Number, //TMarketsTotal : 1~3
    factoriesID : Number, 
    value : Number    
})


var RCR_profitabilityBySupplier=mongoose.model('RCR_profitabilityBySupplier',RCR_profitabilityBySupplierSchema);

exports.addReports = function(options){
    var deferred = q.defer();
    var startFrom = options.startFrom,
    endWith = options.endWith;

   (function sendRequest(currentPeriod){        
      var reqOptions = {
          hostname: options.cgiHost,
          port: options.cgiPort,
          path: options.cgiPath + '?period=' + currentPeriod + '&seminar=' + options.seminar + '&retailerID=' + options.retailerID
      };

      http.get(reqOptions, function(response) { 
        var data = '';
        response.setEncoding('utf8');
        response.on('data', function(chunk){
          data += chunk;
        }).on('end', function(){
          if ( response.statusCode === (404 || 500) ) 
            deferred.reject({msg:'Get 404||500 error from CGI server, reqOptions:' + JSON.stringify(reqOptions)});
          else {
            try {
              var singleReport = JSON.parse(data);
            } catch(e) {
              deferred.reject({msg: 'cannot parse JSON data from CGI:' + data, options:options});
            }
          }      
          if (!singleReport) return; 

          RCR_profitabilityBySupplier.update({seminar    : singleReport.seminar, 
                                   period     : singleReport.period,
                                   retailerID : singleReport.retailerID},
                                {
                                rcrps_ShelfSpace                     : singleReport.rcrps_ShelfSpace,                    
                                rcrps_NetSales                       : singleReport.rcrps_NetSales,                      
                                rcrps_NetSalesPerShelfSpace          : singleReport.rcrps_NetSalesPerShelfSpace,         
                                rcrps_NetSalesShare                  : singleReport.rcrps_NetSalesShare,                 
                                rcrps_GrossContribution              : singleReport.rcrps_GrossContribution,             
                                rcrps_GrossContributionPerShelfSpace : singleReport.rcrps_GrossContributionPerShelfSpace,
                                rcrps_GrossContributionMargin        : singleReport.rcrps_GrossContributionMargin,       
                                rcrps_GrossContributionShare         : singleReport.rcrps_GrossContributionShare,        
                                rcrps_PaymentTerms                   : singleReport.rcrps_PaymentTerms                  
                                },      
                                {upsert: true},
                                function(err, numberAffected, raw){
                                  if(err) deferred.reject({msg:err, options: options});                                  
                                  currentPeriod--;
                                  if (currentPeriod >= startFrom) {
                                     sendRequest(currentPeriod);
                                  } else {
                                     deferred.resolve({msg: options.schemaName + ' (seminar:' + options.seminar + ', retailer:' + options.retailerID+ ') import done. from period ' + startFrom + ' to ' + endWith, options: options});
                                  }
                                });   

        });
      }).on('error', function(e){
        deferred.reject({msg:'errorFrom add ' + options.schemaName + ': ' + e.message + ', requestOptions:' + JSON.stringify(reqOptions),options: options});
      });
    })(endWith);

    return deferred.promise;
}

exports.getRCR_profitabilityBySupplier = function(req, res, next) {
    var data = {
        'seminar': req.params.seminar,
        'period': req.params.period,
        'retailerID': req.params.retailerID
    };
    RCR_profitabilityBySupplier.find(data, function(err, docs) {
        if (err) {
            return next(new Error(err));
        }
        if (docs) {
            res.send(200, docs);
        } else {
            res.send(404, 'failed');
        }
    })
}
