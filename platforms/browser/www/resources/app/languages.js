window.LanguagePackages= {
	"zh":{
		
	},
	"en":{
		"COM_MSG000": "Submit",
		"COM_MSG001": "Cancel",
		"COM_MSG002": "Search",

		"PROMPT_MSG000": "Nothing found",

		"HOME_MSG00": "Home",

		"MENU_MSG00": "Home",
		"MENU_MSG01": "User Settings",
		"MENU_MSG02": "Sign Out",

	},
	"ua":{
		
	},
	"ru":{
		
	},
	"es":{
		
	}
};
var lang = navigator.browserLanguage ? navigator.browserLanguage.toLowerCase() : navigator.language.toLowerCase();
if(lang.indexOf("en") >= 0) {
	lang = "en";
}
else if(lang.indexOf("es") >= 0) {
	lang = "en";
}
else if(lang.indexOf("zh") >= 0) {
	lang = "en";
}	
else if(lang.indexOf("ua") >= 0 || lang.indexOf("uk") >= 0) {
	//lang = "ua";
	lang = "en";	
}
else if(lang.indexOf("ru") >= 0) {
	//lang = "ru";
	lang = "en";	
}	
else {
	lang = "en";		
}
window.LANGUAGE = LanguagePackages[lang];
if(!Template7.global)
{
	Template7.global = {};
}

Template7.global.LANGUAGE = window.LANGUAGE;