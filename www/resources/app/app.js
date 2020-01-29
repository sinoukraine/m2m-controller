// Dom7
var $$ = Dom7;

// Theme
var theme = 'md';
if (Framework7.device.ios) {
    theme = 'ios';
}

var htmlTemplate = $$('script#loginScreenTemplate').html();
var compiledTemplate = Template7.compile(htmlTemplate);
$$('#app').append(compiledTemplate());

var API_URL = {};
var API_DOMIAN1 = "https://m2mdata03.sinopacific.com.ua/m2mdata/v2/";
API_URL.URL_GET_COMMAND_HISTORY = API_DOMIAN1 + "sims/";


var virtualCommandsHistoryList = null;
// Init App
var app = new Framework7({
    id: 'io.framework7.testapp',
    root: '#app',
    theme: theme,
    view: {
        stackPages: true,
    },
    input: {
        scrollIntoViewOnFocus: true,
        scrollIntoViewCentered: true,
    },
    notification:{
        //title: self.name,
        icon: '<img src="resources/images/favicon.png" class="icon-notification" alt="" />',
        closeTimeout: 3000,
    },
    data: function () {
        return {
            user: {
                firstName: 'John',
                lastName: 'Doe',
            },
        };
    },
    on: {
        routerAjaxStart: function () {
            app.progressbar.show();
        },
        routerAjaxComplete: function () {
            app.progressbar.hide();
        },
        init: function () {
            var self = this;

            if(localStorage.ACCOUNT && localStorage.PASSWORD) {
                self.methods.login();
            }
            else {
                self.methods.logout();
            }
        }
    },
    methods: {
        capitalize: function(s) {
            if (typeof s !== 'string') return '';
            return s.charAt(0).toUpperCase() + s.slice(1)
        },
        isJsonString: function(str){
            try{var ret=JSON.parse(str);}catch(e){return false;}return ret;
        },
        findObjectByKey: function(array, key, value) {
            for (var i = 0; i < array.length; i++) {
                if (array[i][key] == value) {
                    return array[i];
                }
            }
            return null;
        },
        isObjEmpty: function(obj) {
            // null and undefined are "empty"
            if (obj == null) return true;

            // Assume if it has a length property with a non-zero value
            // that that property is correct.
            if (obj.length > 0)    return false;
            if (obj.length === 0)  return true;

            // If it isn't an object at this point
            // it is empty, but it can't be anything *but* empty
            // Is it empty?  Depends on your application.
            if (typeof obj !== "object") return true;

            // Otherwise, does it have any properties of its own?
            // Note that this doesn't handle
            // toString and valueOf enumeration bugs in IE < 9
            for (var key in obj) {
                if (hasOwnProperty.call(obj, key)) return false;
            }

            return true;
        },
        hideKeyboard: function() {
            document.activeElement.blur();
            $$("input").blur();
        },
        clearUserInfo: function(){

        },
        logout: function(){
            let self = this;
            if (localStorage.ACCOUNT) {
                $$("input[name='username']").val(localStorage.ACCOUNT);
            }


            //self.methods.clearUserInfo();

            self.loginScreen.open('.login-screen');

        },
        login: function(){
            let self = this;
            //self.methods.getPlusInfo();

            let account = $$("input[name='username']");
            let password = $$("input[name='password']");

            let data = {
                account: account.val() ? account.val() : localStorage.ACCOUNT,
                password: password.val() ? password.val() : localStorage.PASSWORD,
                appKey: localStorage.PUSH_APP_KEY,
                mobileToken: localStorage.PUSH_MOBILE_TOKEN,
                deviceToken: localStorage.PUSH_DEVICE_TOKEN,
                deviceType: localStorage.DEVICE_TYPE,
            };

            self.loginScreen.close();

            /*app.dialog.progress();
            app.request.get(API_URL.LOGIN, data, function (result, xhr, status) {
                    console.log(result);
                    if(result && result.MajorCode == '000') {
                        if(account.val()) {
                            localStorage.ACCOUNT = account.val().trim().toLowerCase();
                            localStorage.PASSWORD = password.val();
                        }
                        password.val(null);
                        self.methods.setInStorage({
                            name:'userInfo',
                            data: {
                                MajorToken: result.Data.MajorToken,
                                MinorToken: result.Data.MinorToken,
                                UserInfo: result.Data.UserInfo
                            }
                        });
                        self.data.CustomerType = result.Data.UserInfo.CustomerType;

                        app.panel.close();
                        app.loginScreen.close();
                        leftView.router.back('/panel-left/');
                    }else {
                        self.utils.nextFrame(()=>{
                            app.dialog.close();
                            app.dialog.alert(LANGUAGE.LOGIN_MSG01);
                            app.loginScreen.open('.login-screen');
                        });
                    }
                },
                function (xhr, status) {
                    self.utils.nextFrame(()=>{
                        app.dialog.close();
                        app.dialog.alert('Error occured during login');
                        app.loginScreen.open('.login-screen');
                    });
                },
                'json');*/
        },
    },
    routes: routes,
    popup: {
        closeOnEscape: true,
    },
    sheet: {
        closeOnEscape: true,
    },
    popover: {
        closeOnEscape: true,
    },
    actions: {
        closeOnEscape: true,
    }
});


var mainView = app.views.create('.view-main', {
    //url: app.view.pushStateRoot ? app.view.pushStateRoot : '/',
    url: '/',
    name: 'view-main'
});


$$('body').on('click', '#mainMenu li', menuList)

function menuList() {
		let listId = $$(this).attr('id');
		
		if (listId) {
			switch (listId) {
				case 'imsi-statistics':
					loadIMSIStatisticsPage();
					app.panel.close($$('.panel-left'), true);
				break;
			}
		}
}

function loadIMSIStatisticsPage() {	
	mainView.router.navigate('/imsi-statistics/');
}

$$('body').on('submit', '[name="login-form"]', function (e) {
    e.preventDefault();
    //preLogin();
    app.methods.hideKeyboard();
    app.methods.login(this);
    return false;
});

$$('body').on('click', '.password-toggle', function(){
    var password = $$(this).siblings("input");
    if(password.prop("type") == "text"){
        password.prop("type", "password");
    }else{
        password.prop("type", "text");
    }
    $$(this).toggleClass('text-color-gray');
});