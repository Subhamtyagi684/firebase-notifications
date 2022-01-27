
var pushId = ""?"":"web.com.herokuapp.hakonieminotification";  
  
var subscribe = document.querySelector("#subscribe");  
subscribe.addEventListener("click", function(evt) {  
    pushNotification();   
}, false);  
  
var pushNotification = function () {  
    "use strict";  
      
    if ('safari' in window && 'pushNotification' in window.safari) {  
        var permissionData = window.safari.pushNotification.permission(pushId);  
        checkRemotePermission(permissionData);  
    } else {  
        alert("Push notifications not supported.");  
    }  
};  
  
var checkRemotePermission = function (permissionData) {  
    "use strict";  
      
    if (permissionData.permission === 'default') {  
        console.log("The user is making a decision");  
        window.safari.pushNotification.requestPermission(  
            'https://hakonieminotification.herokuapp.com',  
            pushId,  
            {},  
            checkRemotePermission  
        );  
    }  
    else if (permissionData.permission === 'denied') {  
        console.dir(arguments);  
    }  
    else if (permissionData.permission === 'granted') {  
        console.log("The user said yes, with token: "+ permissionData.deviceToken);  
    }  
}; 