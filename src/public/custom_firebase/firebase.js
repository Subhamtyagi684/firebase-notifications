firebase.initializeApp({
    apiKey: "AIzaSyD85gYt_5ldJnQE3-3VNWUqSXJ_YISvwLI",
    authDomain: "website-61ecc.firebaseapp.com",
    projectId: "website-61ecc",
    storageBucket: "website-61ecc.appspot.com",
    messagingSenderId: "765645921368",
    appId: "1:765645921368:web:4ddfb22c00ae7344b03e2d",
    measurementId: "G-GWPD6550Z3"
});

if (firebase.messaging.isSupported()){
    const messaging = firebase.messaging();
    navigator.serviceWorker.register('/firebase-messaging-sw.js').then((registration) => {
        messaging.useServiceWorker(registration);
        messaging.requestPermission().then(function() {
            console.log('Notification Permission Granted!');
            messaging.getToken({ vapidKey: "BJLq0HRxwHbeKToA8WmHGOctKWjrtHoLnYTyXXsB200a-pwmVCyZ7D67ssj6bhXNJCSRCYlFtoiG6IyoPPF813M" }).then((ntoken) => {
                if (ntoken) {
                    console.log(ntoken);
                    sendTokenToServer(ntoken);
                } else {
                    console.log('No registration token available. Request permission to generate one.');
                    setTokenSentToServer(false);
                }
            }).catch((err) => {
                console.log('An error occurred while retrieving token. ', err);
                setTokenSentToServer(false);
            });
        }).catch(function(err) {
            console.log('Notification Permission Denied!');
        });
    }).catch(function(error) {
        // registration failed
        console.log('Registration failed with ' + error);
    });


function sendTokenToServer(ntoken) {
    if (!isTokenSentToServer()) {
        console.log('Sending token to server...');
        // var data = {};
        // var url = "";
        // $.ajax({
        //     url: url,
        //     type: "POST",
        //     data: JSON.stringify(data),
        //     dataType: "text",
        //     processData: false,
        //     contentType: "application/json; charset=utf-8",
        //     success: function (data, status, jqXHR) {
        //         console.log("successfully retrieved token");
        //     },
        //     error: function (err) {
        //         console.log(err);
        //     },
        //     complete: function (jqXHR, status) {
        //         console.log("request complete");
        //     }
        // });
        setTokenSentToServer(true);
    } else {
        console.log('Token already sent to server so won\'t send it again ');
    }
}

function isTokenSentToServer() {
    return window.localStorage.getItem('sentToServer') == 1;
}

function setTokenSentToServer(sent) {
    window.localStorage.setItem('sentToServer', sent ? 1 : 0);
}


messaging.onMessage( function(payload) {
    console.log("++++++++on message+++++++",payload)
    var title = payload.notification.title;
    var options = {
        body: payload.notification.body,
        image: payload.notification.image,
        icon:payload.notification.icon,
        click_action: payload.notification.click_action
    };
    var notification = new Notification(title, options);
    notification.onclick = function(event) {
        event.preventDefault(); // prevent the browser from focusing the Notification's tab
        window.open(event.currentTarget.data.click_action, '_blank');
        notification.close();
    };
});

}
else{
    console.log('FCM is not supported')
}