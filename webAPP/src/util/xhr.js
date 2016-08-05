define(['appFunc',"underscore"],function(appFunc,_) {
    var xhr = {
        //webServerAddress : "http://10.80.11.222/envwheel",
        config:{
            "getActWinlist":"/getActWinlist",//获取中奖列表
            "actreport":"/actreport",//报名
            "getActResult":"/getActResult",//报名信息返回
            "editDepartmentUser":"/tenantadmin/tenant/contact/{{id}}"
        },
        search: function(code, array){
            for (var i=0;i< array.length; i++){
                if (array[i].code === code) {
                    return array[i];
                }
            }
            return false;
        },
        getRequestURL: function(options){
            var query = options.query || {};
            var func = options.func || '';
            //json/cars.json
            //var apiServer = this.config[func] + '?';
            var apiServer = func;
            var name;
            if(apiServer.indexOf('{{') > -1){
                apiServer = mustache.render(apiServer,_.extend({},query,options.data));
            }
            if (options.method === "GET") {
               // options.data.JSESSIONID = appFunc.localData.get('jid');
                //options.data.mobile = true;
            } else {
                if (func !== 'user_login') {
                   // query.JSESSIONID = appFunc.localData.get('jid');
                }
                //query.mobile = true;
            }
            for (name in query) {
                apiServer += name + '=' + query[name] + '&';
            }
            //return xhr.webServerAddress +  apiServer.replace(/&$/gi, '');
            return  apiServer.replace(/&$/gi, '');
        },
        simpleCall: function(options,callback,error){
            var params = _.extend({
                data:{},
                method: 'GET'//If you access your server api ,please user `post` method.
               // start: function(xhr){
                    //     //xhr.setRequestHeader("Accept", "application/json; version=1.0");
                    // };
            },options || {});
            params.headers = _.extend({
                Accept: "application/json; version=2.0"
            },options.headers || {} );
            params.url = xhr.getRequestURL(options);
            if(options.func==="terminals-status"||options.func==="session-touch"){
                params.url += "times="+options.nextTime||1;
            }

            var success = options.success;
            params.success =function(data,statusCode,XHR){
                // console.log("data == ",data)
                //     try{
                //         data = $.parseJSON(data);
                //     }catch(e){
                //         data = '';
                //     }
                //     console.log("data == ",data)
                    if((typeof(success) === 'function')&&success(data,statusCode,XHR)===false){
                        return false
                    };


                    if((typeof(callback) === 'function') && callback(data)===false){
                        return false
                    };
                    // appFunc.postMessage(options.func,XHR.responseText);
            }
            var func = params.func;
            var complete = options.complete;
            params.complete =  function(XHR) {
                    if (XHR.status === 401) {
                        //appFunc.postMessage('doLogin', XHR.responseText);
                        alert('连接超时，请重新登录！');
                        appFunc.localData.clear();
                        window.location.href = "../login.html";
                    }else if (XHR.status == 404) {
                         //console.log(func);
                        //alert('服务器地址错误  ');
                    } else if (XHR.status !== 200) {
                        (typeof(error) === 'function') && error(XHR);
                    }
                    if ((typeof(complete) === 'function') && complete(XHR) === false) {
                        return false;
                    };
            }

            return $.ajax(params);

        }
    };
    return xhr;
});
