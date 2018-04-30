console.log("calledd >>> run.js");
var methods = require('./lib/methods');
var test = require('./lib/intentTemplateMapping2');

// var locationTemplate = test.getAddress(2, [{
// 	"contact" : [
// 		911246630100
// 	],
// 	"images" : [ ],
// 	"title" : "Gurugram, India",
// 	"address" : "Daffodil Software Pvt. Ltd. 15th Floor, Building A3, DLF Silokhera SEZ, Sector 30, NH 8, Gurugram, Haryana - 122001",
// 	"googleMapUrl" : "https://www.google.co.in/maps/place/Daffodil+Software/@28.4626075,77.0539525,17z/data=!4m5!3m4!1s0x390d181b03ac9f6f:0x3ec5a92a519f94ad!8m2!3d28.4626075!4d77.0561465?hl=en",
// 	"__v" : 0,
// 	"isHeadQuartered" : true
// 	},
// 	{
// 		"contact" : [
// 			12019841549
// 		],
// 		"images" : [ ],
// 		"title" : "Grandville, USA",
// 		"address" : "Daffodil Software Pvt. Ltd. 2885, Sanford Ave SW #28585, Grandville, MI 49418 USA",
// 		"googleMapUrl" : "https://www.google.co.in/maps/place/Daffodil+Software+Ltd./@42.912772,-85.757645,17z/data=!3m1!4b1!4m5!3m4!1s0x8819b06fe95583ab:0x88309ff6815e7bd4!8m2!3d42.912772!4d-85.755451?hl=en",
// 		"__v" : 0
// 	}
// ]);
// console.log("locationTemplate>>", locationTemplate)

// var portfolioTemplate = test.getProject([{"platform":["Web"],"images":[],"url":[],"clientFeedback":[],"frontendTechnology":[{"_id":"5ae00acac3e4f20e00a3409a","title":"Meteor"}],"backendTechnology":[{"_id":"5ae00acac3e4f20e00a3409a","title":"Meteor"}],"thirdPartyApis":[{"_id":"5ae0182bc3e4f20e00a340aa","name":"Twilio"}],"_id":"5ae2b1b84ce8551763b71868","title":"Figbo","description":"Its a ecommerce shopping website","overview":"Its a ecommerce shopping website","highlights":"","domain":{"_id":"5ae0061bc3e4f20e00a3408d","title":"Software Development"},"industry":{"_id":"5ae00685c3e4f20e00a3408f","title":"e-commerce"},"usp":"","clientInfo":"","teamSize":1,"timespan":"1 year","deployedOn":"Galaxy","__v":0}]);
// console.log("portfolioTemplate>>", portfolioTemplate)
// console.log("getStaticTemplate>>>", test.getStaticTemplate('AboutBot'));
// console.log("getAddress>>>>>>>", test.getAddress());
// console.log("getProjectTByDomain>>>>>>>", test.getProjectTByDomain());
// console.log("getDirectFromDB>>>>>>>", test.getDirectFromDB('daffodil is sdjfbgjfkvjj'));
// console.log("getCeoName>>>>>>>", test.getCeoName('Yogesh Agarwal'));
// console.log("getEmpSize>>>>>>>", test.getEmpSize(500));
// console.log("getHeadquarter>>>>>>>", test.getHeadquarter('Gurugram, India'));
// console.log("getCodeMgmtInfo>>>>>>>", test.getCodeMgmtInfo(['git', 'bitbucket']));
// console.log("getCommTools>>>>>>>", test.getCommTools(['skype', 'slack', 'uberconference']));
// console.log("getPMToolInfo>>>>>>>", test.getPMToolInfo(['manaze', 'jira']));
// console.log("getTechInfo>>>>>>>", test.getTechInfo([{'title' : 'angularjs'}]));
// console.log("getModelInfo>>>>>>>", test.getModelInfo(['t&m', 'b&g', 'y&l']));


// methods.getDataFromAgent('about daffodil', '1234567', function(err, res){
// 	console.log("err, res>>>>>>>>>>>>>>>>", err, res);
// 	if(res) {
// 		var collection = methods.getCollection(res.metadata.intentName, res.parameters);
// 		console.log("collection", collection);
// 		methods.buildQuery(res.metadata.intentName, res.parameters,function(query, error) {
// 			console.log("error query::::::::", error, query);
// 			methods.callQuery(collection, query, function(response, error) {
// 				console.log("response>>>", JSON.stringify(response));
// 				var template = methods.getTemplate(res.metadata.intentName, res.contexts, response, res.parameters);
// 				console.log("template", template);
// 			});
// 		});
// 	} else {
// 		console.log("getDataFromAgent>>",err)
// 	}
// });


// methods.getChatData('how are you', '12345678');

