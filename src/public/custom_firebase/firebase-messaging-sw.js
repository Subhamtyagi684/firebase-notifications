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
});ss


// firebase.messaging();

// const messaging = firebase.messaging();

// messaging.onBackgroundMessage((payload) => {
//     console.log('[firebase-messaging-sw.js] Received background message ', payload);
//     var notificationTitle = payload.notification.title?payload.notification.title:'Title';
//     var notificationOptions = {
//         body: payload.notification.body?payload.notification.body:'Description',
//         icon: payload.notification.icon,
//         image: payload.notification.image,
//         data: {
//             click_action: payload.notification.web_url?payload.notification.web_url:"https://www.google.com"
//         }
//     };
//     return self.registration.showNotification(notificationTitle,
//       notificationOptions);
//   });

  const messaging = firebase.messaging();

  // [START messaging_on_background_message]
  messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
      body: 'Background Message body.',
      icon: '/firebase-logo.png'
    };
  
    self.registration.showNotification(notificationTitle,
      notificationOptions);
  });