
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBDQjRGoc1Eb0rZt5QLaZSaoTEtX2apL7k",
  authDomain: "fir-project-affb7.firebaseapp.com",
  projectId: "fir-project-affb7",
  storageBucket: "fir-project-affb7.appspot.com",
  messagingSenderId: "753676898557",
  appId: "1:753676898557:web:9bda4e81a74703c4c66e94",
  measurementId: "G-VB6Z9QN1G1"
};
firebase.initializeApp(firebaseConfig);

if(firebase.messaging)
{
    if (firebase.messaging.isSupported()){
        const messaging = firebase.messaging();
        navigator.serviceWorker.register('/sw.js?v=1.0.0',{scope: "/"}).then((registration) => {
            messaging.useServiceWorker(registration);
            messaging.requestPermission().then(function() {
                console.log('Notification Permission Granted!');
                messaging.getToken({ vapidKey: "BEwZLZAXyfUGCQmEfS8To-es8P65QRn2UKvBE7koxtpWTDYeKXuEgDLId-WWuCyaGlyCY2ey4wkJ5RxVrvJ-lgs" }).then((ntoken) => {
                    if (ntoken) {
                        console.log(ntoken);
                        sendTokenToServer(ntoken);
                    } else {
                        console.log('No registration token available. Request permission to generate one.');
                        setTokenSentToServer(false);
                    }
                }).catch((err) => {
                    console.log('An error occurred while retrieving token. ');
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
        var title = payload.notification.title?payload.notification.title:'Title';
        var options = {
            body: payload.notification.body?payload.notification.body:'Description',
            icon: payload.notification.icon,
            image: payload.notification.image,
            data: {
                click_action: payload.notification.web_url?payload.notification.web_url:"https://www.google.com"
            }
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
}