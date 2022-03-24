importScripts('https://www.gstatic.com/firebasejs/8.3.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.3.0/firebase-messaging.js');


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


const messaging = firebase.messaging();

 messaging.onBackgroundMessage((payload) => {
      const notificationTitle = payload.notification.title;
      const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.icon
      };
    
      self.registration.showNotification(notificationTitle,notificationOptions);
    });

    self.addEventListener('install', function(event) {
      event.waitUntil(self.skipWaiting());
    });
    
    self.addEventListener('activate', function(event) {
      event.waitUntil(self.clients.claim());
    });