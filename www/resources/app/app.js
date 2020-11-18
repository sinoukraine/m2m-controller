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

var API_DOMIAN = "https://m2mdata03.sinopacific.com.ua/api/v3/";
API_URL.PRE_LOGIN = API_DOMIAN + "consumers/tokens/";

//var API_DOMIAN1 = "https://m2mdata03.sinopacific.com.ua/m2mdata/v3/";
API_URL.URL_GET_COMMAND_HISTORY = API_DOMIAN + "sims/";

// Create custom events bus
var myEvents = new Framework7.Events();

var virtualCommandsHistoryList = null;
// Init App
Framework7.request.setup({
    headers: { 
        Authorization: "12345"
    }
});
				
var app = new Framework7({
	dialog: {
		// set default title for all dialog shortcuts
		title: 'M2M Data Controller',
		// change default "OK" button text
		buttonOk: 'Ok',
	},
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

			self.methods.handleAndroidBackButton();
			
            if(localStorage.ACCOUNT && localStorage.PASSWORD) {
                self.methods.preLogin();
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
        preLogin: function(){
            let self = this;
            				
							
            this.preloader.show();
	/*
			app.request.setup({
				headers: {
					"content-type": "application/json",
					"Origin": "file://",
				}
			});
			
			app.request.post('https://m2mdata03.sinopacific.com.ua/api/v3/consumers/tokens', {}, function (result) {
				console.log(result);
			  if(result && result.consumerToken) {
							let consumerToken = result.consumerToken
							app.preloader.hide();
							app.dialog.alert('SUCCESS');
							//app.methods.login(consumerToken);
							
						}else {
							self.utils.nextFrame(()=>{
								app.preloader.hide();
								
								app.dialog.alert('ER_0');
								app.loginScreen.open('.login-screen');
							});
						}	
			}, function(error){
				console.log('can not connect: txt = '+textStatus+' err = '+errorThrown);
						self.utils.nextFrame(()=>{
							app.preloader.hide();
							app.dialog.alert('ER_1');
							app.loginScreen.open('.login-screen');
						});
			}, 'json');
*/
			$.ajax({
					async: true,
					crossDomain: true,
					url: 'https://m2mdata03.sinopacific.com.ua/api/v3/consumers/tokens',
					method: "POST",
					headers: {
						"content-type": "application/json",
						"Origin": "file://",
					},
					processData: false,
					success: function (result) {	
						if(result && result.consumerToken) {
							let consumerToken = result.consumerToken
							app.methods.login(consumerToken);
						}else {
							self.utils.nextFrame(()=>{
								app.preloader.hide();
								//app.dialog.alert(LANGUAGE.LOGIN_MSG01);
							app.dialog.alert('Er0');
								app.loginScreen.open('.login-screen');
							});
						}	
					},
					error: function(XMLHttpRequest, textStatus, errorThrown){
						console.log('can not connect: txt = '+textStatus+' err = '+errorThrown);
						self.utils.nextFrame(()=>{
							app.preloader.hide();
							app.dialog.alert('Er1');
							app.loginScreen.open('.login-screen');
						});
					}
				});	
				
            /*app.request.get(API_URL.LOGIN, data, function (result, xhr, status) {
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
        login: function(token){
            let self = this;
			let consumerToken = token;
			
            let account = $$("input[name='username']");
            let password = $$("input[name='password']");

            let data = {
                login: account.val() ? account.val() : localStorage.ACCOUNT,
                password: password.val() ? password.val() : localStorage.PASSWORD,
                /*appKey: localStorage.PUSH_APP_KEY,
                mobileToken: localStorage.PUSH_MOBILE_TOKEN,
                deviceToken: localStorage.PUSH_DEVICE_TOKEN,
                deviceType: localStorage.DEVICE_TYPE,*/
            };

			localStorage.ACCOUNT = account.val();
            localStorage.PASSWORD = password.val();
									
			//app.dialog.progress();
			this.preloader.show();
			$.ajax({
					async: true,
					crossDomain: true,
					url: 'https://m2mdata03.sinopacific.com.ua/api/v3/people/tokens',
					method: "POST",
					headers: {
						"authorization": "Bearer " + consumerToken,
						"content-type": "application/json",						
						"Origin": "file://",
					},
					processData: false,
					data: JSON.stringify(data),
					success: function (result) {
						if(result && result.accessToken) {
							if(account.val()) {
								localStorage.ACCOUNT = account.val().trim().toLowerCase();
								localStorage.PASSWORD = password.val();
							}
							//mainView.router.navigate('/home/');
							//self.methods.submitSearchForm('');
							
							password.val(null);
							self.methods.setInStorage({
								name:'userInfo',
								data: {
									accessToken: result.accessToken
									/*MajorToken: result.Data.MajorToken,
									MinorToken: result.Data.MinorToken,
									UserInfo: result.Data.UserInfo*/
								}
							});
							//self.data.CustomerType = result.Data.UserInfo.CustomerType;
							app.preloader.hide();
							app.panel.close();
							app.loginScreen.close();
							
							myEvents.emit('home');
							
							//leftView.router.back('/panel-left/');
						}else {
							self.utils.nextFrame(()=>{
								app.preloader.hide();
								app.dialog.alert(LANGUAGE.LOGIN_MSG01);
								
								app.dialog.alert('Er2');
								app.loginScreen.open('.login-screen');
							});
						}					
					},
					error: function(XMLHttpRequest, textStatus, errorThrown){
						console.log('can not connect: txt = '+textStatus+' err = '+errorThrown);
						self.utils.nextFrame(()=>{
							app.preloader.hide();
							app.dialog.alert('Error occured during login');							
							app.dialog.alert('Er3');
							app.loginScreen.open('.login-screen');
						});
					}
				});	
		},
		handleAndroidBackButton: function () {
    //var app = cordovaApp.f7;
    //const $ = app.$;
	var f7 = this;
    if (f7.device.electron) return;

    document.addEventListener('backbutton', function (e) {
      if ($('.actions-modal.modal-in').length) {
        f7.actions.close('.actions-modal.modal-in');
        e.preventDefault();
        return false;
      }
      if ($('.dialog.modal-in').length) {
        f7.dialog.close('.dialog.modal-in');
        e.preventDefault();
        return false;
      }
      if ($('.sheet-modal.modal-in').length) {
        f7.sheet.close('.sheet-modal.modal-in');
        e.preventDefault();
        return false;
      }
      if ($('.popover.modal-in').length) {
        f7.popover.close('.popover.modal-in');
        e.preventDefault();
        return false;
      }
      if ($('.popup.modal-in').length) {
        if ($('.popup.modal-in>.view').length) {
          const currentView = f7.views.get('.popup.modal-in>.view');
          if (currentView && currentView.router && currentView.router.history.length > 1) {
            currentView.router.back();
            e.preventDefault();
            return false;
          }
        }
        f7.popup.close('.popup.modal-in');
        e.preventDefault();
        return false;
      }
      if ($('.login-screen.modal-in').length) {
        f7.loginScreen.close('.login-screen.modal-in');
        e.preventDefault();
        return false;
      }
      if($('.searchbar-enabled').length){
        f7.searchbar.disable();
        e.preventDefault();
        return false;
      }
      
      const currentView = f7.views.current;
      if (currentView && currentView.router && currentView.router.history.length > 1) {
        currentView.router.back();
        e.preventDefault();
        return false;
      }

      if ($('.panel.panel-in').length) {
        f7.panel.close('.panel.panel-in');
        e.preventDefault();
        return false;
      }
    }, false);
},
        getFromStorage: function(name){
            var ret = [];
            var str = '';
            if (name) {
                switch (name){
                    case 'cmd':
                        str = localStorage.getItem("COM.M2MDATA.CMD");
                        if(str) {
                            ret = JSON.parse(str);
                        }
                    break;
                    case 'userInfo':
                        str = localStorage.getItem("COM.M2MDATA.USERINFO");
                        if(str) {
                            ret = JSON.parse(str);
                        }
                    break; 
					default:
                        //App.dialog.alert('There is no item saved with such name - '+name);
                }
            }else{
                //App.dialog.alert('Wrong query parameters!');
            }
            return ret;
		},
		
        setInStorage: function(params){
            let self = this;
            if (typeof(params) == 'object' && params.name && params.data) {
                switch (params.name){
                    case 'cmd':
                        localStorage.setItem("COM.M2MDATA.CMD", JSON.stringify(params.data));
                    break; 
					case 'userInfo':
                        localStorage.setItem("COM.M2MDATA.USERINFO", JSON.stringify(params.data));
                    break;                     
                    default:
                        //App.dialog.alert('There is no function associated with this name - '+params.name);
                }   
            }else{
               // App.dialog.alert('Wrong query parameters!');
            }
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
    app.methods.preLogin(this);
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