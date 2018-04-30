// var templates = require('./template');
var intentTemplateJson = {
	"DirectFromDB"  : "%DBcontent%",
	"AboutTechPosTSDClient"  : "Yes we have worked in %technology% technology in %domain% domain on %plaform% platform",
	"AboutTechPosTSClient"  : "Yes we have worked in %technology% technology on %plaform% platform",
	"AboutTechPosSDClient"  : "Yes we have worked in %domain% domain on %plaform% platform",
	"AboutTechPosTDClient"  : "Yes we have worked in %technology% technology in %domain% domain",
	"AboutTechPosTClient"  : "Yes we have worked in %technology% technology",
	"AboutTechPosSClient"  : "Yes we have worked on %plaform% platform",
	"AboutTechPosDClient"  : "Yes we have worked in %domain% domain",
	"AboutTechPosTSDDefault"  : "Yes we have worked in %technology% technology in %domain% domain on %plaform% platform",
	"AboutTechPosTSDefault"  : "Yes we have worked in %technology% technology on %plaform% platform",
	"AboutTechPosSDDefault"  : "Yes we have worked in %domain% domain on %plaform% platform",
	"AboutTechPosTDDefault"  : "Yes we have worked in %technology% technology in %domain% domain",
	"AboutTechPosTDefault"  : "Yes we have worked in %technology% technology",
	"AboutTechPosSDefault"  : "Yes we have worked on %plaform% platform",
	"AboutTechPosDDefault"  : "Yes we have worked in %domain% domain",
	"AboutTechNeg"  : "No, we have not work on this.",
	"Address"  :  "Our offices are located at %count% locations.",
	"PortfolioClient"  :  "We have worked on %count% project/projects in this particular domain. Thanks for asking.",
	"PortfolioDefault"  :  "We have worked on %count% project/projects in this particular domain",
	"PortfolioNeg"  :  "No we have not worked in %domain% domain",
	"AboutBot"  : "My name is Daffodil Bot and I am a chatbot. I can provide information about Daffodil Software Ltd.",
	"ByeBot"  : "Bye. Have a nice time.",
	"Ceo"  : "%CeoName% is Founder CEO of Daffodil.",
	"CodeMgmtInfoClient"  : "We normally use %tools%. Of course we can use any other tool that you prefer.",
	"CodeMgmtInfoDefault"  : "We normally use %tools%.",
	"CommTools"  : "Most of our clients prefer %tools% etc. Of course we can use any other tool that you prefer.",
	"ContactMeClient"  : "Sure. Asking a Consultant to contact you.",
	"ContactMeDefault"  : "Sure. You can contact us over email",
	"ContactTemplate"  : "You may call us at ",
	"ContactEmail"  : "In case you want to connect over email, please email us at %email%.",
	"DefaultFallbackIntent"  : "I didn't get that. Please rephrase the question so I can understand.",
	"DefaultWelcomeIntent"  : "Hi, Daffodil Bot here! You can ask me simple questions about Daffodil and I'll do my best to answer. How may I help you ?",
	"AboutInternationalityClient"  : "Yes, most of our clientele belongs to international market and our major client base lies in US, UK, EU and AU. If you have any projects in queue, do let us know we would love to be a part.",
	"AboutInternationalityDefault"  : "Yes, most of our clientele belongs to international market and our major client base lies in US, UK, EU and AU.",
	"HowAreYou"  :"Doing fine. Thank you",
	"EmployeesSize" : "We have %count%+ employees at 2 development centres.",
	"HowToContact"  : "Please click/tap 'Discuss Your Project' button. Fill the form and a Consultant will contact you with relevant information.",
	"HeadquarterLocation"  : "Daffodil is headquartered in %location%.",
	"ModelInfoClient"  : "We work on %count% business model/models - %modelArray%. But we can switch to other business model as well as per client requirement",
	"ModelInfoDefault"  : "We work on %count% business model/models - %modelArray%.",
	"PMToolInfoClient"  : "Our teams are comfortable in using various project management tools like %tools% etc. And we are comfortable in using any project management tool you use.",
	"PMToolInfoDefault"  : "Our teams are comfortable in using various project management tools like %tools% etc. ",
	"ProjectInfoClient"  : "I am sending your requirement to our team. A Consultant will contact you asap",
	"ProjectInfoDefault"  : "I am sending your requirement to our team. A Consultant will contact you asap",
	"SetupMeetingClient"  : "Ok. I am asking a consultant to setup a meeting with you over email.",
	"SetupMeetingDefault"  : "Ok. contact us anytime over email.",
	"TechInfoClient"  : "We primarily work on %technologies% to deliver great solutions to our Clients on Web & Mobile apps.",
	"TechInfoDefault"  : "We primarily work on %technologies%.",
	"ThankYou"  : "You are most welcome.",
	"Fine"  : "Fine.",
	"Ok"  : "Ok."
}
module.exports =  intentTemplateJson;

intentTemplateJson.getAddress = function(locationArray){
	var locationText = "";
	locationArray.forEach((item, index)=>{
		locationText = locationText+(index+1)+". "+item.title+",\n"+item.address+".\n";
	})
	return intentTemplateJson.Address.replace("%count%", locationArray.length)+"\n"+locationText;
}

intentTemplateJson.getContactDetails = function(daffodil){
	// console.log("daffodil>>", daffodil[0].locations)
	var contactDetailText = intentTemplateJson.ContactTemplate;
	// intentTemplateJson.IndividualContact.replace();
	daffodil[0].locations.forEach((item, index)=>{
		contactDetailText = contactDetailText+'+'+item.contact[0]+" in "+item.title+", ";
	})
	return contactDetailText+'\nOr '+intentTemplateJson.ContactEmail.replace("%email%", daffodil[0].email[0]);
}

intentTemplateJson.getPortfolioNeg = function(params){
	return intentTemplateJson.PortfolioNeg.replace('%domain%', params)
}

intentTemplateJson.getProjectTByDomain = function(projectArray, context){
	var projectText = "";
	projectArray.forEach((item, index)=>{
		// console.log("item>>", JSON.stringify(item))
		projectText = projectText+(index+1)+". "+item.title+"\nBreif : "+item.description+".\nDomain : "+item.industry.title+"\nFrontend Technology : "+item.frontendTechnology[0].title+" \nBackend Technology : "+item.backendTechnology[0].title;
	})
	if(context == 'client')
		return intentTemplateJson.PortfolioClient.replace("%count%", projectArray.length)+"\n"+projectText;
	else
		return intentTemplateJson.PortfolioDefault.replace("%count%", projectArray.length)+"\n"+projectText;
}

intentTemplateJson.getStaticTemplate = function(templateName){
	return intentTemplateJson[templateName];
}

intentTemplateJson.getAboutTechPos = function(params, resObject, context){
	// console.log("intentTemplateJson['AboutTechPos']>>", resObject)
	var projectText = "";
	if(resObject && resObject.length) {
		projectText = "\nHere are some projects :";
		resObject.forEach((item, index)=>{
			// console.log("item>>", JSON.stringify(item))
			projectText = projectText+'\n'+(index+1)+". "+item.title+"\nBreif : "+item.description;
		})
	}
    if(params.technology && params.technology.length && params.service && params.service.length &&params.domain && params.domain.length)
    	if(context == 'client') {

			var template = intentTemplateJson['AboutTechPosTSDClient'].replace('%technology%', params.technology[0]);
			template = template.replace('%domain%', params.domain);
			template = template.replace('%platform%', params.service);
			return template+projectText;
    	}
		else {

			var template = intentTemplateJson['AboutTechPosTSDDefault'].replace('%technology%', params.technology[0]);
			template = template.replace('%domain%', params.domain);
			template = template.replace('%platform%', params.service);
			return template;
		}
    else if(params.technology && params.technology.length && params.service && params.service.length)
    	if(context == 'client') {
			var template = intentTemplateJson['AboutTechPosTSClient'].replace('%technology%', params.technology[0]);
			template = template.replace('%platform%', params.service);
			return template+projectText;
		}
		else {
			var template = intentTemplateJson['AboutTechPosTSDefault'].replace('%technology%', params.technology[0]);
			template = template.replace('%platform%', params.service);
			return template;
		}
    else if(params.technology && params.technology.length && params.domain && params.domain.length)
    	if(context == 'client') {
			var template =  intentTemplateJson['AboutTechPosTDClient'].replace('%technology%', params.technology[0]);
			template = template.replace('%domain%', params.domain);
			return template+projectText;
		}
		else {
			var template =  intentTemplateJson['AboutTechPosTDDefault'].replace('%parameter%', params.technology[0]);
    		template = template.replace('%domain%', params.domain);
			return template;
		}
    else if(params.service && params.service.length && params.domain && params.domain.length)
    	if(context == 'client'){
			var template = intentTemplateJson['AboutTechPosSDClient'].replace('%platform%', params.service);
			template = template.replace('%domain%', params.domain);
			return template+projectText;
		}
		else {
			var template = intentTemplateJson['AboutTechPosSDDefault'].replace('%platform%', params.service);
    		template = template.replace('%domain%', params.domain);
			return template;
		}
    else if(params.technology && params.technology.length)
    	if(context == 'client')
			return intentTemplateJson['AboutTechPosTClient'].replace('%technology%', params.technology[0])+projectText;
		else
			return intentTemplateJson['AboutTechPosTDefault'].replace('%technology%', params.technology[0]);
    else if(params.service && params.service.length)
    	if(context == 'client')
			return intentTemplateJson['AboutTechPosSClient'].replace('%platform%', params.platform)+projectText;
		else
			return intentTemplateJson['AboutTechPosSDefault'].replace('%platform%', params.platform);
    else if(params.domain && params.domain.length)
    	if(context == 'client')
			return intentTemplateJson['AboutTechPosDClient'].replace('%domain%', params.domain)+projectText;
		else 
			return intentTemplateJson['AboutTechPosDDefault'].replace('%domain%', params.domain);
  //   else
		// if(context == 'client')
		// 	return intentTemplateJson['AboutTechPosClient'].replace('%parameter%', parameter);
		// else
		// 	return intentTemplateJson['AboutTechPosDefault'].replace('%parameter%', parameter);

}

intentTemplateJson.getAboutTechNeg = function(){
	// console.log("parameter", JSON.parse(parameter))
	return intentTemplateJson['AboutTechNeg'];
}

intentTemplateJson.getDirectFromDB = function(DBContent){
	return intentTemplateJson['DirectFromDB'].replace('%DBcontent%', DBContent);
}

intentTemplateJson.getCeoName = function(CeoName){
	return intentTemplateJson['Ceo'].replace('%CeoName%', CeoName);
}

intentTemplateJson.getEmpSize = function(EmpSize){
	return intentTemplateJson['EmployeesSize'].replace('%count%', EmpSize);
}

intentTemplateJson.getHeadquarter = function(location){
	return intentTemplateJson['HeadquarterLocation'].replace('%location%', location);
}

intentTemplateJson.getCodeMgmtInfo = function(toolsArray, context){
    var code_mgmt_tools = toolsArray.join(', ');
	if(context == 'client')
		return intentTemplateJson['CodeMgmtInfoClient'].replace('%tools%', code_mgmt_tools);
	else
		return intentTemplateJson['CodeMgmtInfoDefault'].replace('%tools%', code_mgmt_tools);
}

intentTemplateJson.getCommTools = function(toolsArray){
    var comm_tools = toolsArray.join(', ');
    return intentTemplateJson['CommTools'].replace('%tools%', comm_tools);
}

intentTemplateJson.getPMToolInfo = function(toolsArray, context){
    var pm_tools = toolsArray.join(', ');
    if(context == 'client')
    	return intentTemplateJson['PMToolInfoClient'].replace('%tools%', pm_tools);
    else
    	return intentTemplateJson['PMToolInfoDefault'].replace('%tools%', pm_tools);
}

intentTemplateJson.getTechInfo = function(techArray, context){
	var technology = "";
	techArray.forEach((item, index)=>{
	    if(index == 0 || index == techArray.length)
	      technology = technology + item.title;
	    else if(index == techArray.length - 1)
	      technology = technology +" and "+ item.title;
	    else 
	      technology = technology +", "+ item.title;
	})
	if(context == 'client')
		return intentTemplateJson['TechInfoClient'].replace('%technologies%', technology);
	else
		return intentTemplateJson['TechInfoDefault'].replace('%technologies%', technology);
}

intentTemplateJson.getModelInfo = function(modelArray, context){
	var model = "", template = "";
	if(context == 'client')
		template = intentTemplateJson['ModelInfoClient'].replace('%count%', modelArray.length);
	else
		template = intentTemplateJson['ModelInfoDefault'].replace('%count%', modelArray.length);
	modelArray.forEach((item, index)=>{
	    if(index == 0 || index == modelArray.length)
	      model = model + item;
	    else if(index == modelArray.length - 1)
	      model = model +" and "+ item;
	    else 
	      model = model +", "+ item;
	})
	template = template.replace('%modelArray%', model);
	return template;
}
