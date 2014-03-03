var mongoose = require('mongoose'),
    http = require('http'),
    util = require('util'),
    _ = require('underscore'),
	uniqueValidator = require('mongoose-unique-validator'),
	passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	userRoles = require('../../app/js/routingConfig').userRoles,
	check = require('validator');

var seminarSchema = mongoose.Schema({
	seminarCode : {type:String, require:true, unique:true},
	seminarDescription : String, 
	seminarDate : {type:Date, default:Date.now},
	currentPeriod : {type:Number, default:0},
	isInitialise : {type:Boolean, default:false}, //when user login, need check this value
	producers : [producerSchema],
	retailers : [retailerSchema],
	facilitator : [facilitatorSchema],

    simulationSpan : Number,
    traceActive : Boolean,
    traditionalTradeActive : Boolean,
    EMallActive : Boolean,
    virtualSupplierActive : Boolean,
    independentMarkets : Boolean,
    forceNextDecisionsOverwrite : Boolean,
	market1ID : Number,
	market2ID : Number,
	category1ID : Number,
	category2ID : Number
})

var producerSchema = mongoose.Schema({
	producerID : Number, //1,2,3 
	password : String,
	newProductDecisionReadyPeriod : Number,
	decisionReadyPeriod : Number,
	members : [memberSchema]
})

var retailerSchema = mongoose.Schema({
	retailerID : Number, //1,2,3
	password : String,
	decisionReadyPeriod : Number,
	members : [memberSchema]	
})

var facilitatorSchema = mongoose.Schema({
	facilitatorDescription : String,
	password : String
})

var memberSchema = mongoose.Schema({
	name : String,
	description : String
})

seminarSchema.plugin(uniqueValidator);

var seminar = mongoose.model('seminar', seminarSchema);

exports.localStrategy = new LocalStrategy(function(username, password, done){
	    var parameters = ['','',''],j = 0;    
	    for (var i = 0; i < username.length; i++) {
	      if(username[i] == '^') j = j + 1;
	      else parameters[j] = parameters[j] + username[i]; 
	      if(j>2) break;      
	    };
	    var para_seminar = parameters[0],
	    para_role = parameters[1],
	    para_roleID = parameters[2];
	    console.log('seminar:' + para_seminar + ',role:' + para_role + ',roleID:' + para_roleID);
		seminar.findOne({seminarCode:para_seminar},function(err,doc){
			if(err){ return done(err); }
			if(!doc){ console.log('incorrestseminar'); return done(null, false, {message:'Incorrect seminar code.'}); }
			if(!doc.isInitialise) { console.log('notIni');  return done(null, false, {message:'Seminar has not opened.'})}
			switch(parseInt(para_role, 10)){
				case userRoles.producer:
					if(doc.producers[para_roleID-1].password != password){ return done(null, false, {message:'Incorrect password'}); }
					break;
				case userRoles.retailer:
					if(doc.retailers[para_roleID-1].password != password){ return done(null, false, {message:'Incorrect password'}); }
					break;
				case userRoles.facilitator:
					if(doc.facilitator[para_roleID-1].password != password){ return done(null, false, {message:'Incorrect password'}); }
					break;				
				default:
					return done(null, false, {message:'role does not exist.'});
			}			
			return done(null, { seminar: para_seminar, role: para_role, roleID: para_roleID, username: username });
		});
});

exports.serializeUser = function(user, done){
	done(null, user.username);
}

exports.deserializeUser = function(username, done){
    var parameters = ['','',''],j = 0;    
    for (var i = 0; i < username.length; i++) {
      if(username[i] == '^') j = j + 1;
      else parameters[j] = parameters[j] + username[i]; 
      if(j>2) break;      
    };
    var para_seminar = parameters[0],
    para_role = parameters[1],
    para_roleID = parameters[2];	
	seminar.findOne({seminarCode:para_seminar},function(err,doc){
		if(err){ return done(err); }
		if(!doc){ console.log('incorrestseminar'); return done(null, false, {message:'Incorrect seminar code.'}); }
		if(!doc.isInitialise) {  return done(null, false, {message:'Seminar has not opened.'})}
		return done(null, { seminar: para_seminar, role: para_role, roleID: para_roleID, username: username });
	});
}

exports.getSeminarList=function(req,res,next){
	return seminar.find(function(err, docs){
		if(!err){
			return res.send(docs);
		} else {
			return console.log(err);
		}
	});
}

exports.getCurrentPeriod=function(req,res,next){
	console.log(req.params.seminar);
	return seminar.findOne({
		seminarCode:req.params.seminar
	},function(err,doc){
		if(err){
			next(new Error(err));
		}
		if(!doc){
			console.log('cannot find matched doc');
		}else{
			res.send(200,doc);
		}
	})
}

exports.checkProducerDecision=function(req,res,next){
	seminar.findOne({seminarCode:req.params.seminar},function(err,doc){
		if(err) {next(new Error(err))};
		if(doc){
			if(doc.producers[req.params.producerID-1].newProductDecisionReadyPeriod>=doc.currentPeriod){
				res.send(200,'isReady');
			}else{
				res.send(200,'unReady');
			}
		}else{
			res.send(404,'there is no contract');
		}
	})
}

exports.submitDecision=function(io){
	return function(req,res,next){
		var queryCondition={
			seminar:req.body.seminar,
			producerID:req.body.producerID
		}
		console.log(queryCondition);
		seminar.findOne({seminarCode:queryCondition.seminar},function(err,doc){
			if(err) {next(new Error(err))};
			if(doc){
				doc.producers[queryCondition.producerID-1].newProductDecisionReadyPeriod=doc.currentPeriod;
				console.log(doc.producers[queryCondition.producerID-1].newProductDecisionReadyPeriod);
				doc.markModified('producers');
				doc.save(function(err){
					if(!err){
						io.sockets.emit('producerBaseChanged', 'this is a baseChanged');
						res.send(200,'success');
					}else{
						io.sockets.emit('producerBaseChanged', 'this is a baseChanged');
						res.send(400,'fail');
					}
				})
			}else{
				res.send(404,'there is no contract');
			}
		})
	}
}

exports.setCurrentPeriod = function(req, res, next){
		var queryCondition={
			seminar:req.body.seminar,
			period:req.body.period
		}
		console.log('setCurrentPeriod:' + queryCondition.seminar + '/' + queryCondition.period);
		seminar.findOne({seminarCode:queryCondition.seminar},function(err,doc){
			if(err) {next(new Error(err))};
			if(doc){
				console.log('find seminar:' + doc)
				doc.currentPeriod = queryCondition.period;
				doc.save(function(err){
					if(!err){
						console.log('update seminar:' + doc)						
						res.send(200,'success');
					}else{
						res.send(400,'fail');
					}
				})
			}else{
				res.send(404,'there is no such seminar...');
			}
		})
}

exports.addSeminar=function(req,res,next){
	var Newseminar = new seminar({
		seminarCode: req.body.seminarCode,
		seminarDescription: req.body.seminarDescription,
		seminarDate: Date.now(),
		currentPeriod:1,
		isInitialise: false,
		producers : [{
			producerID : 1,
			password : "110",
			newProductDecisionReadyPeriod : 1,
			decisionReadyPeriod : 0,
			members : [{
				name : "Tom",
				description: "Tom and Jack"
			},{
				name : "Jack",
				description: "Tom and Jack"			
			}]
		},{
			producerID : 2,
			password : "120",
			newProductDecisionReadyPeriod : 1,
			decisionReadyPeriod : 0,
			members : [{
				name : "Tom",
				description: "Tom and Jack"
			},{
				name : "Jack",
				description: "Tom and Jack"			
			}]
		},{
			producerID : 3,
			password : "130",
			newProductDecisionReadyPeriod : 1,
			decisionReadyPeriod : 0,
			members : [{
				name : "Tom",
				description: "Tom and Jack"
			},{
				name : "Jack",
				description: "Tom and Jack"			
			}]
		},{
			producerID : 4,
			password : "140",
			newProductDecisionReadyPeriod : 1,
			decisionReadyPeriod : 0,
			members : [{
				name : "Tom",
				description: "Tom and Jack"
			},{
				name : "Jack",
				description: "Tom and Jack"			
			}]
		}],
		retailers : [{
			retailerID : 1,
			password : "210",
			decisionReadyPeriod : 0,
			members : [{
				name : "Tom",
				description: "Tom and Jack"
			},{
				name : "Jack",
				description: "Tom and Jack"			
			}]
		},{
			retailerID : 2,
			password : "220",
			decisionReadyPeriod : 0,
			members : [{
				name : "Tom",
				description: "Tom and Jack"
			},{
				name : "Jack",
				description: "Tom and Jack"			
			}]
		},{
			retailerID : 3,
			password : "230",
			decisionReadyPeriod : 0,
			members : [{
				name : "Tom",
				description: "Tom and Jack"
			},{
				name : "Jack",
				description: "Tom and Jack"			
			}]
		},{
			retailerID : 4,
			password : "240",
			decisionReadyPeriod : 0,
			members : [{
				name : "Tom",
				description: "Tom and Jack"
			},{
				name : "Jack",
				description: "Tom and Jack"			
			}]
		}],
		facilitator : [{
			facilitatorDescription : "Help you",
			password : "310"
		}],
	    simulationSpan : 6,
	    traceActive : true,
	    traditionalTradeActive : false,
	    EMallActive : false,
	    virtualSupplierActive : false,
	    independentMarkets : false,
	    forceNextDecisionsOverwrite : false,
		market1ID : 1,
		market2ID : 2,
		category1ID : 1,
		category2ID : 2		
	});

	Newseminar.save(function(err) {
		if(!err){
			res.send(200,Newseminar);
			console.log("created new seminar:"+Newseminar);
		} else {
			res.send(400,"Seminar code has existed in the list, validation failed.");
		}
	});
}

exports.updateSeminar=function(req,res,next){
	var queryCondition={
		seminarCode:req.body.seminarCode,
		currentPeriod:req.body.currentPeriod,
		behaviour:req.body.behaviour,
		/*
		password:edit password(need location ,additionalIdx,value)
		*/
		location:req.body.location,
		additionalIdx:req.body.additionalIdx,
		value:req.body.value
	};
	console.log(queryCondition);
	seminar.findOne({seminarCode:queryCondition.seminarCode},function(err,doc){
		if(err){
			next(new Error(err));
		}
		if(!doc){
			console.log("cannot find matched doc....");
			res.send(404,'cannot find matched doc....');
		}else{
			var isUpdate=true;
			switch(queryCondition.behaviour){
				case 'updatePassword':
					doc[queryCondition.location][queryCondition.additionalIdx].password=queryCondition.value;
					break;
				case 'updateCurrentPeriod':
					doc.currentPeriod = queryCondition.value;
					break;
				case 'updateActive':
					doc.is
			}
			if(isUpdate){
				doc.markModified('facilitator');
				doc.markModified('retailers');
				doc.markModified('producers');
				console.log(doc.producers[0].password);
				doc.save(function(err,doc,numberAffected){
					if(err){
						next(new Error(err));
					}
					console.log('save updated, number affected:'+numberAffected+'doc:'+doc);
                    res.send(200, 'mission complete!');
				});
			}

		}
	});
}

exports.initializeSeminar = function(options){
	var deferred = q.defer();

	console.log('initialise Seminar:' + options);
	var reqOptions = {
		hostname: options.cgiHost,
		port: options.cgiPort,
		path: options.cgiPath + '?seminar=' + options.seminar
			  + '&span=' + options.simulationSpan
			  + '&isTraceActive=' + options.traceActive
			  + '&isTraditionalTradeActive=' + options.traditionalTradeActive
			  + '&isEMallActive=' + options.EMallActive
			  + '&isVirtualSupplierActive=' + options.virtualSupplierActive
			  + '&isIndependentMarkets=' + options.independentMarkets
			  + '&isForceNextDecisionsOverwrite=' + options.forceNextDecisionsOverwrite
			  + '&market1ID=' + options.market1ID
			  + '&market2ID=' + options.market2ID
			  + '&category1ID=' + options.category1ID
			  + '&category2ID=' + options.category2ID
	};

	http.get(reqOptions, function(response){
		var data = '';
		response.setEncoding('utf8');
		response.on('data', function(chunk){
			data += chunk;
		}).on('end', function(){
			if (response.statusCode === (404 || 500))
  			  	deferred.reject({msg:data});
			else {
				seminar.findOne({seminarCode:options.seminar},function(err,doc){
					if(err){ deferred.reject({msg:err}); } 
					if(!doc){ deferred.reject({msg:'cannot find matched seminar : ' + options.seminar}); } 
				    doc.simulationSpan = options.simulationSpan;
				    doc.traceActive = options.traceActive;
				    doc.traditionalTradeActive = options.traditionalTradeActive;
				    doc.EMallActive = options.EMallActive;
				    doc.virtualSupplierActive = options.virtualSupplierActive;
				    doc.independentMarkets = options.independentMarkets;
				    doc.forceNextDecisionsOverwrite = options.forceNextDecisionsOverwrite;
					doc.market1ID = options.market1ID;
					doc.market2ID = options.market2ID;
					doc.category1ID = options.category1ID;
					doc.category2ID = options.category2ID;
					doc.save(function(err,doc,numberAffected){
						if(err){ deferred.reject({msg:err}); }
						deferred.resolve({msg:'Initialize complete: '+ data})
					});				
  		   	    });					
			}
		}).on('error', function(e){
			deferred.reject({msg:e.message});
		});
	})

	return deferred.promise;
}

exports.passiveSeminar = function(options){
	var deferred = q.defer();
	seminar.findOne({seminarCode:options.seminar}, function(err, doc){
		if(err){ deferred.reject({msg:err}); } 
		if(!doc){ deferred.reject({msg:'cannot find matched seminar : ' + options.seminar}); } 
		var reqOptions = {
			hostname: options.cgiHost,
			port: options.cgiPort,
			path: options.cgiPath + '?seminar=' + doc.seminar
				  + '&span=' + doc.simulationSpan
				  + '&isTraceActive=' + doc.traceActive
				  + '&isTraditionalTradeActive=' + doc.traditionalTradeActive
				  + '&isEMallActive=' + doc.EMallActive
				  + '&isVirtualSupplierActive=' + doc.virtualSupplierActive
				  + '&isIndependentMarkets=' + doc.independentMarkets
				  + '&isForceNextDecisionsOverwrite=' + doc.forceNextDecisionsOverwrite
				  + '&market1ID=' + doc.market1ID
				  + '&market2ID=' + doc.market2ID
				  + '&category1ID=' + doc.category1ID
				  + '&category2ID=' + doc.category2ID,
			period : options.period
		};
		http.get(reqOptions, function(response){
			var data = '';
			response.setEncoding('utf8');
			response.on('data', function(chunk){
				data += chunk;
			}).on('end', function(){		
				if (response.statusCode === (404 || 500))
	  			  	deferred.reject({msg:data});
				else {				
					deferred.resolve({msg:'Get passive decision complete:' + data});
				}
			}).on('error', function(e){
				deferred.reject({msg:e.message});
			});				

		})
	});	
	return deferred.promise;
}

exports.kernelSeminar = function(options){
	var deferred = q.defer();
	seminar.findOne({seminarCode:options.seminar}, function(err, doc){
		if(err){ deferred.reject({msg:err}); } 
		if(!doc){ deferred.reject({msg:'cannot find matched seminar : ' + options.seminar}); } 
		var reqOptions = {
			hostname: options.cgiHost,
			port: options.cgiPort,
			path: options.cgiPath + '?seminar=' + doc.seminar
				  + '&span=' + doc.simulationSpan
				  + '&isTraceActive=' + doc.traceActive
				  + '&isTraditionalTradeActive=' + doc.traditionalTradeActive
				  + '&isEMallActive=' + doc.EMallActive
				  + '&isVirtualSupplierActive=' + doc.virtualSupplierActive
				  + '&isIndependentMarkets=' + doc.independentMarkets
				  + '&isForceNextDecisionsOverwrite=' + doc.forceNextDecisionsOverwrite
				  + '&market1ID=' + doc.market1ID
				  + '&market2ID=' + doc.market2ID
				  + '&category1ID=' + doc.category1ID
				  + '&category2ID=' + doc.category2ID,
			period : options.period

		};
		http.get(reqOptions, function(response){
			var data = '';
			response.setEncoding('utf8');
			response.on('data', function(chunk){
				data += chunk;
			}).on('end', function(){		
				if (response.statusCode === (404 || 500))
	  			  	deferred.reject({msg:data});
				else {				
					deferred.resolve({msg:'Run kernel complete:' + data});
				}
			}).on('error', function(e){
				deferred.reject({msg:e.message});
			});				
		})	
	});
	return deferred.promise;
}

function duplicateSeminarDoc(options){
	var deferred = q.defer();

	seminar.findOne({seminarCode:options.originalSeminarCode}, function(err, doc){
		if(err){ deferred.reject({msg:err});}
		if(doc){
			console.log(doc);
			deferred.resolve({msg:'duplicate seminar document complete.'});
		}else{
			deferred.reject({msg:'cannot find matched seminar : ' + options.originalSeminarCode});
		}

		// if(!doc){ deferred.reject({msg:'cannot find matched seminar : ' + options.originalSeminarCode});}
		// console.log(doc);
		// console.log('doc:' + util.inspect(doc, {depth:null}));
		// var newDoc = doc;
		// console.log('newDoc:' + util.inspect(newDoc,{depth:null}));

		// newDoc.seminarCode = options.targetSeminarCode;
		// newDoc.seminarDescription = options.seminarDescription;
		// newDoc.save(function(err){
		// 	if(!err){ deferred.resolve({msg:'duplicate seminar document complete.'});}
		// 	else{ deferred.reject({msg:'duplicate seminar document failed, err: ' + err});}
		// })
	})			

	return deferred.promise;
}

exports.duplicateSeminar = function(req, res, next){
	var queryCondition = {
		originalSeminarCode : req.body.originalSeminarCode,
		targetSeminarCode : req.body.targetSeminarCode,
		seminarDescription : req.body.seminarDescription
	}

	console.log('query:' + util.inspect(queryCondition));
	duplicateSeminarDoc(queryCondition)
	//deal with promises chain 						
	.then(function(result){ //log the success info
        io.sockets.emit('AdminProcessLog', { msg: result.msg, isError: false });	
        res.send(200, result.msg);
	}, function(error){ //log the error
		console.log(error.msg);
        io.sockets.emit('AdminProcessLog', { msg: error.msg, isError: true });			
        res.send(404, error.msg);            
	}, function(progress){ //log the progress
        io.sockets.emit('AdminProcessLog', { msg: progress.msg, isError: false });			
	})	
}