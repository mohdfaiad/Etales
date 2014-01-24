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
		currentPeriod:req.body.currentPeriod,
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
