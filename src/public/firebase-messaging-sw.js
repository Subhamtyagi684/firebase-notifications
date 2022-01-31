importScripts('https://www.gstatic.com/firebasejs/8.3.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.3.0/firebase-messaging.js');


firebase.initializeApp({
    apiKey: "AIzaSyD85gYt_5ldJnQE3-3VNWUqSXJ_YISvwLI",
    authDomain: "website-61ecc.firebaseapp.com",
    projectId: "website-61ecc",
    storageBucket: "website-61ecc.appspot.com",
    messagingSenderId: "765645921368",
    appId: "1:765645921368:web:4ddfb22c00ae7344b03e2d",
    measurementId: "G-GWPD6550Z3"
});


self.addEventListener('notificationclick', function(event) {
   event.notification.close();
   var on_click = event.notification.image;
   event.waitUntil(
       clients.openWindow(on_click)
   )
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
      image:payload.notification.image
    };
  
    self.registration.showNotification(notificationTitle, notificationOptions);

});