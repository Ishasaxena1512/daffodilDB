var AIModule = {}, 
request = require('request'), 
Promise = require('bluebird'), 
intent = require('./intent'), 
industryModel = require('../modules/industry'),
templates = require('./intentTemplateMapping');
var test = require('./intentTemplateMapping2');

// var context = require('./context');
module.exports = AIModule;

AIModule.getDataFromAgent = function(query, token, callBack) {
    // console.log("callleddd>>>>>>>..")
    var returnValue = "";
    var headers = {
        'Authorization': 'Bearer 450666cddb2144e68a4ee63ff5d97a7e'
    };
    var dataString = 'grant_type=client_credentials';
    var options = {
        url: 'https://api.dialogflow.com/v1/query?v=20150910&lang=en&query='+query+'&sessionId='+token+'&timezone=America/New_York',
        method: 'GET',
        headers: headers
    };
    request(options, responseMethod);
    
    function responseMethod(error, response, body) {
        if (!error && response.statusCode == 200) {
            // console.log("getDataFromAgent response>>", body)
            var body = JSON.parse(body);
            console.log("body", body)
            callBack(null,body.result) ;
        } else {
            console.log("----------------------getDataFromAgent Error--->",error);
            callBack(error,null);
            
        }
    }
};

AIModule.getChatData = (questionToResolve, sessionId) => {
  // console.log("called>>>>>>>>")
   return new Promise((resolve, reject) => {
       try {
           var apiai = require('apiai');
           var app = apiai("85cf893e895a431a83de41f2996d72fe");
           var request = app.textRequest(questionToResolve, {
               sessionId
           });
           request.on('response', function (response) {
            // console.log("response>>>>", response)
               resolve(response);
           });
           request.on('error', function (error) {
               reject(error);
           });
           request.end();
       } catch (err) {
           reject(err);
       }
   })
};

AIModule.getCollection = (intentName, params) => {
    // if(intentName == 'About tech' && params){
    //   if(params.technology && params.technology.length){
    //     return "technology";
    //   } else if(params.service && params.service.length) {
    //     return "projects";
    //   } else if(params.domain && params.domain.length) {
    //     return "industry";
    //   } else {
    //     return "technology";
    //   }
    // } else {
      return intent[intentName];
    // }
};

AIModule.getTemplate = (intent, context, queryResult, params) => {
  var template  = "";

  // console.log("queryResult>>::::", queryResult);
  // console.log("intent>>", intent);
  // if(intent && templates[intent]){
  if(intent){
      if(queryResult && queryResult.length) {
        if(intent == "about daffodil") {
          // console.log("queryResult.aboutUs>>", queryResult[0].aboutUs)
          template = test.getDirectFromDB(queryResult[0].aboutUs);
        }
        if(intent == "How many employees are there?") {
          // template = templates[intent]["no_context"]["template"].replace("_", queryResult[0].employeeSize);
          template = test.getEmpSize(queryResult[0].employeeSize);
        }
        if(intent == "About tech") {

            // if(params.technology && params.technology.length)
            //   // template = ("Yes we have worked in ").concat(params?params.technology[0] : '');
            //   template = test.getAboutTechPos(params.technology[0], queryResult, context);
            // else if(params.domain && params.domain.length)
            //   // template = ("yes we have clients in ").concat(params?params.domain+ " industry" : '');
            //   template = test.getAboutTechPos(params.domain, queryResult, context);
            // else if(params.service && params.service.length)
            //   // template = ("Yes we have worked in ").concat(params?params.service+ " service area" : '');
            //   template = test.getAboutTechPos(params.service, queryResult, context);
              template = test.getAboutTechPos(params, queryResult, context);
              // console.log("in about tech intent template", template);
        }        
        if(intent == "ceo") {
          template = test.getCeoName(queryResult[0].name);          
        }        
        if(intent == "location") {
          // template = templates[intent]["no_context"]["template"].replace("_", queryResult[0].title);          
          template = test.getHeadquarter(queryResult[0].title);
        }
        if(intent == "code management info" && queryResult[0].comm_tools) {
          // console.log("code management info :::::::::::  queryResult>", comm_tools)
          // var comm_tools = queryResult[0].comm_tools;
          // template = templates[intent]["no_context"]["template"].replace("_", comm_tools.join(', '));          
          if(context == 'client')
            template = test.getCodeMgmtInfo(queryResult[0].comm_tools, 'client');
          else
            template = test.getCodeMgmtInfo(queryResult[0].comm_tools, 'default');
        }
        if(intent == "communication tools" && queryResult[0].code_mgmt_tools) {
          // console.log("communication tools queryResult")
          // var code_mgmt_tools = queryResult[0].code_mgmt_tools.join(', ');
          // template = templates[intent]["no_context"]["template"].replace("_", code_mgmt_tools);          
          template = test.getCommTools(queryResult[0].code_mgmt_tools);
        }
        if(intent == "PM tool info" && queryResult[0].project_mgmt_tools) {
          // console.log("communication tools queryResult")
          // var project_mgmt_tools = queryResult[0].project_mgmt_tools.join(', ');
          // template = templates[intent]["no_context"]["template"].replace("_", project_mgmt_tools);          
          if(context == 'client')
            template = test.getPMToolInfo(queryResult[0].project_mgmt_tools, 'client');
          else
            template = test.getPMToolInfo(queryResult[0].project_mgmt_tools, 'default');
        }
        if(intent == "tech info") {
          // console.log("queryResult>", queryResult)
          // var technology = "";
          // queryResult.forEach((item, index)=>{
          //   if(index == 0 || index == queryResult.length)
          //     technology = technology + item.title;
          //   else if(index == queryResult.length - 1)
          //     technology = technology +" and "+ item.title;
          //   else 
          //     technology = technology +", "+ item.title;
          // })
          // template = templates[intent]["no_context"]["template"].replace("_", technology);
          if(context == 'client')
            template = test.getTechInfo(queryResult, 'client');
          else 
            template = test.getTechInfo(queryResult, 'default');
        }
        if(intent == "model info" && queryResult[0].business_model) {
          // console.log("queryResult>", queryResult)
          // var model = "";
          // queryResult[0].business_model.forEach((item, index)=>{
          //   if(index == 0 || index == queryResult[0].business_model.length)
          //     model = model + item;
          //   else if(index == queryResult[0].business_model.length - 1)
          //     model = model +" and "+ item;
          //   else 
          //     model = model +", "+ item;
          // })
          // template = templates[intent]["no_context"]["template"].replace("?", queryResult[0].business_model.length);
          // console.log("template>>", template)
          // template = template.replace("_", model);
          if(context == 'client')
            template = test.getModelInfo(queryResult[0].business_model, 'client');
          else
            template = test.getModelInfo(queryResult[0].business_model, 'default');
        }
        if(intent == 'HR - Biodata') {
          template = test.getDirectFromDB(queryResult[0].description);
        }
        if(intent == 'HR - freshers') {
          template = test.getDirectFromDB(queryResult[0].description);
        }
        if(intent == 'HR - learning sessions') {
          template = test.getDirectFromDB(queryResult[0].description);
        }
        if(intent == 'HR - onsite') {
          template = test.getDirectFromDB(queryResult[0].description);
        }
        if(intent == 'HR - Open Positions') {
          template = queryResult(queryResult.aboutUs);
        }
        if(intent == 'HR - product service') {
          template = test.getDirectFromDB(queryResult[0].description);
        }
        if(intent == 'HR - recruitment process') {
          template = test.getDirectFromDB(queryResult[0].description);
        }
        if(intent == 'HR - work culture') {
          template = test.getDirectFromDB(queryResult[0].description);
        }
        if(intent == 'HR - work timings') {
          template = test.getDirectFromDB(queryResult[0].description);
        }        
        if(intent == 'portfolio') {
          console.log("portfolio sesciotn")
          if(context == 'client')
            template = test.getProjectTByDomain(queryResult, 'client');
          else
            template = test.getProjectTByDomain(queryResult, 'default');
        }                
        if(intent == 'Address') {
          template = test.getAddress(queryResult);
        }
        if(intent == "contact-details"){
          template = test.getContactDetails(queryResult);
        } 
      } else {
        if(intent == "About tech" && params) {
          // console.log("params", params)
          template = test.getAboutTechNeg();
        }else if(intent == "portfolio" && params) {
          template = test.getPortfolioNeg(params.domain);
                    // console.log("template", template)
        } else if(intent == "Asking About Bot"){
          template = test.getStaticTemplate('AboutBot');
        }        
        else if(intent == "bye bot"){
          template = test.getStaticTemplate('ByeBot');
        }               
        else if(intent == "Default Fallback Intent"){
          template = test.getStaticTemplate('DefaultFallbackIntent');
        }        
        else if(intent == "Default Welcome Intent"){
          template = test.getStaticTemplate('DefaultWelcomeIntent');
        }        
        else if(intent == "do you work internationally"){
          if(context == 'client')
            template = test.getStaticTemplate('AboutInternationalityClient');
          else
            template = test.getStaticTemplate('AboutInternationalityDefault');
        }        
        else if(intent == "how are you"){
          template = test.getStaticTemplate('HowAreYou');
        }        
        else if(intent == "project info"){
          if(context == 'client')
            template = test.getStaticTemplate('ProjectInfoClient');
          else
            template = test.getStaticTemplate('ProjectInfoDefault');
        }        
        else if(intent == "setup meeting"){
          if(context == 'client')
            template = test.getStaticTemplate('SetupMeetingClient');
          else
            template = test.getStaticTemplate('SetupMeetingDefault');

        }        
        else if(intent == "Thank you"){
          template = test.getStaticTemplate('ThankYou');
        }        
        else if(intent == "contact me"){
          template = test.getStaticTemplate('ContactMe');
        }
        else if(intent == "how to contact / rates"){
          if(context == 'client')
            template = test.getStaticTemplate('ContactMeClient');
          else
            template = test.getStaticTemplate('ContactMeDefault');
        }
        else if(intent == "ok intent"){
          var textArray = [test.getStaticTemplate('Ok'), test.getStaticTemplate('Fine')];
          var randomIndex = Math.floor(Math.random() * textArray.length); 
          template = textArray[randomIndex];
        }
      }
  }
  // console.log("template>", template)
  return template;  
};

AIModule.buildQuery = (intent, params, callBack) => {
  // console.log("buildQuery :: params >>>> ", intent, params)
  var query  = {};
  if(params){
    if(intent == 'ceo') {
      // console.log("intent ceo")
          query = { "designation" : "CEO" };
          // console.log("query ceo", query)
          callBack(query, null); 
    }
    else if(intent == 'HR - Biodata') {
      // console.log("Htemplate = queryResult;R - Biodata>>>");
      query = {"title" : "Biodata"};
      callBack(query, null); 
    }
    else if(intent == 'HR - freshers') {
      // console.log("Htemplate = queryResult;R - freshers>>>");
      query = {"title" : "Freshers"};
      callBack(query, null); 
    }
    else if(intent == 'HR - learning sessions') {
      // console.log("Htemplate = queryResult;R - learning>>>");
      query = {"title" : "learning sessions"};
      callBack(query, null); 
    }
    else if(intent == 'HR - onsite') {
      // console.log("Htemplate = queryResult;R - onsite>>>");
      query = {"title" : "Onsite"};
      callBack(query, null); 
    }
    else if(intent == 'HR - Open Positions') {
      // console.log("Htemplate = queryResult;R - Open>>>");
      query = {"title" : "Open Positions"};
      callBack(query, null); 
    }
    else if(intent == 'HR - product service') {
      // console.log("Htemplate = queryResult;R - product>>>");
      query = {"title" : "product service"};
      callBack(query, null); 
    }
    else if(intent == 'HR - recruitment process') {
      // console.log("Htemplate = queryResult;R - recruitment>>>");
      query = {"title" : "Recruitment process"};
      callBack(query, null); 
    }
    else if(intent == 'HR - work culture') {
      // console.log("Htemplate = queryResult;R - work>>>");
      query = {"title" : "work culture"};
      callBack(query, null); 
    }
    else if(intent == 'HR - work timings') {
      // console.log("Htemplate = queryResult;R - work>>>");
      query = {"title" : "work timings"};
      callBack(query, null); 
    }
    else if(intent == 'location') {
      // console.log("intent location")
          query = { "isHeadQuartered" : true };
          console.log("query ceo", query)
          callBack(query, null); 
    }    
    else if(intent == 'portfolio') {
      // console.log("intent location", params.domain)
      if(params.domain) {
          industryModel.findIndustry({"title" : {$regex: new RegExp('^' + params.domain, 'i')}})
          .then(function(result) {
            // console.log("::::::::::result>>", result)
            if(result && result.length)  {

              query = { "industry"  : result[0]._id };
              // console.log("query portfolio", query)
              callBack(query, null);  
            }
            
          }, function(err) {
            console.log("::::::::::::::err>>", err);
            callBack(null, err); 
          })
          .catch();
          
      } else {
          query = { "domain" : "Unknown" };
          callBack(query, null);  
      }
    }
    else if(intent == 'About tech') {

        // console.log("About tech>>>>>>.technology", params.technology)
        if(params.technology && params.technology.length && params.service && params.service.length &&params.domain && params.domain.length) {
          // query = { "frontendTechnology.name" : {$in : params.technology }, "industry.title" :  {$regex: new RegExp('^' + params.domain, 'i')}, "platform" :  {$in : [params.service]  } };
          query =  [ 
            {
              $match : {"platform" :  {$in : [params.service]  }}
            },
            {
             $lookup: {
                 from: "industries",
                 localField: "industry",
                 foreignField: "_id",
                 as: "industry_title"
             }
            },{
              $unwind : "$industry_title"
            },
            {$match : {
              "industry_title.title" : params.domain
            }},
            {
             $lookup: {
                 from: "technologies",
                 localField: "allTechnologies",
                 foreignField: "_id",
                 as: "technology_title"
             }
            },{
              $unwind : "$technology_title"
            },
            {$match : {
              "technology_title.title" : {$in : params.technology }
            }}
          ];
        } else if(params.technology && params.technology.length && params.service && params.service.length) {
          // query = { "frontendTechnology.name" : {$in : params.technology }, "platform" :  {$in : [params.service]  } };
          query =  [ 
            {
              $match : {"platform" :  {$in : [params.service]  }}
            },
            {
             $lookup: {
                 from: "technologies",
                 localField: "allTechnologies",
                 foreignField: "_id",
                 as: "technology_title"
             }
            },{
              $unwind : "$technology_title"
            },
            {$match : {
              "technology_title.title" : {$in : params.technology }
            }}
          ];
        }
        else if(params.technology && params.technology.length && params.domain && params.domain.length) {
          // query = { "frontendTechnology.name" : {$in : params.technology }, "industry.title" :  {$regex: new RegExp('^' + params.domain, 'i')} };
          query =  [ 
            {
              $match : {}
            },
            {
             $lookup: {
                 from: "industries",
                 localField: "industry",
                 foreignField: "_id",
                 as: "industry_title"
             }
            },{
              $unwind : "$industry_title"
            },
            {$match : {
              "industry_title.title" : params.domain
            }},
            {
             $lookup: {
                 from: "technologies",
                 localField: "allTechnologies",
                 foreignField: "_id",
                 as: "technology_title"
             }
            },{
              $unwind : "$technology_title"
            },
            {$match : {
              "technology_title.title" : {$in : params.technology }
            }}
          ];
        }
        else if(params.service && params.service.length && params.domain && params.domain.length) {
          // query = { "platform" :  {$in : [params.service]  }, "industry.title" :  {$regex: new RegExp('^' + params.domain, 'i')} };
          query =  [ 
            {
              $match : {"platform" :  {$in : [params.service]  }}
            },
            {
             $lookup: {
                 from: "industries",
                 localField: "industry",
                 foreignField: "_id",
                 as: "industry_title"
             }
            },{
              $unwind : "$industry_title"
            },
            {$match : {
              "industry_title.title" : params.domain
            }}
          ];
        }
        else if(params.technology && params.technology.length) {
          // query = { "frontendTechnology.name" : {$in : params.technology } };
          query =  [ 
            {
              $match : {}
            },
            {
             $lookup: {
                 from: "technologies",
                 localField: "allTechnologies",
                 foreignField: "_id",
                 as: "technology_title"
             }
            },{
              $unwind : "$technology_title"
            },
            {$match : {
              "technology_title.title" : {$in : params.technology }
            }}
          ];
        }
        else if(params.service && params.service.length) {
          // query = { "platform" :  {$in : [params.service]  } };
         query =  [ 
            {
              $match : {"platform" :  {$in : [params.service]  }}
            }
          ];
        }
        else if(params.domain && params.domain.length) {
          // query = { "industry.title" :  {$regex: new RegExp('^' + params.domain, 'i')}  };
          query =  [ 
            {
              $match : {}
            },
            {
             $lookup: {
                 from: "industries",
                 localField: "industry",
                 foreignField: "_id",
                 as: "industry_title"
             }
            },{
              $unwind : "$industry_title"
            },
            {$match : {
              "industry_title.title" : params.domain
            }}
          ];
        }
        else
          query = { "title" : "Unknown" };

        callBack(query, null); 
    } else {
      callBack(query, null); 
    }
    
  }
  // console.log("buildQuery :: query>>",  query)
  
};

AIModule.callQuery = (collection, query, callBack) => {
  var result;
  // console.log("callQuery ::: collection, query>>>>>>>>>.", collection, query)
  switch(collection){
    case "thirdPartyApi": { 
      // console.log("thirdPartyApi"); 
      var module = require('../modules/thirdPartyApis');
      result = module.findThirdPartyApi;
      break; 
    } 
    case "socialWork": { 
        // console.log("socialWork"); 
        var module = require('../modules/socialWork');
        result = module.findSocialWork;
        break; 
    }
    case "resources": { 
        // console.log("resources"); 
        var module = require('../modules/resources');
        result = module.findResource;
        break;    
    } 
    case "leadershipTeam": { 
        // console.log("leadershipTeam"); 
        var module = require('../modules/leadershipTeam');
        result = module.findLeadershipTeam;
        break; 
    }     
    case "industry": { 
        // console.log("industry"); 
        var module = require('../modules/industry');
        result = module.findIndustry;
        break; 
    }
    case "domain": { 
        // console.log("domain"); 
        var module = require('../modules/domain');
        result = module.findDomain;
        break;    
    } 
    case "clientFeedback": { 
        // console.log("clientFeedback"); 
        var module = require('../modules/clientFeedback');
        result = module.findClientFeedback;
        break; 
    }     
    case "daffodil": { 
        // console.log("daffodil"); 
        var module = require('../modules/daffodil');
        result = module.findDaffodil;
        break; 
    }
    case "technology": { 
        console.log("inside select collection.>> technology"); 
        var module = require('../modules/technology');
        result = module.findTechnology;
        break;    
    } 
    case "locations": { 
        // console.log("locations"); 
        var module = require('../modules/location');
        result = module.findLocation;
        break; 
    }       
    case "teamMember": { 
        // console.log("boardMember"); 
        var module = require('../modules/teamMember');
        result = module.findTeamMember;
        break; 
    }
    case "hrPolicy": { 
        // console.log("hrPolicy"); 
        var module = require('../modules/hRPolicy');
        result = module.findHRPolicy;
        break; 
    }       
    case "currentOpening": { 
        // console.log("currentOpening"); 
        var module = require('../modules/currentOpening');
        result = module.findCurrentOpening;
        break; 
    }
    case "projects": { 
        // console.log("projects"); 
        var module = require('../modules/project');
        result = module.findProjectAggregate;
        break;    
    } 
    case "career": { 
        // console.log("career"); 
        var module = require('../modules/careers');
        result = module.findCareer;
        break; 
    }  
    default: { 
        // console.log("default"); 
        result = null;
    } 
  }
  if(result) {
    // console.log(">>query", query)
    result(query)
    .then(function(res) {
      callBack(res, null);
    }, function(err) {
      console.log("err", err);
      callBack(null, err);
    })
    .catch();
  } else {
    callBack([], null);
  }
};
