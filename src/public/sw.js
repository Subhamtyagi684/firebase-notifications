

    self.addEventListener('install', function(event) {
      console.log('service worker is installing...')
      
    });
    
    
    
    self.addEventListener('activate', function(e) {
        console.log('service worker is activated....')
    });
    
    