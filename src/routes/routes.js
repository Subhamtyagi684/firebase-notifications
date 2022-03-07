const express = require('express');
const router  = express.Router();
const axios = require('axios');
const server_key = "AAAAskQNnFg:APA91bG61IxsYO3OtGmL0JZmX1qZ37nrYLX6sh5tT8Yy-AVfNohH0ukaTQZvx5CuNCUwZn6ftmgND5EEofmozHDe3zyvPTuYiVGFBkfLKPJoti4JzKPwgFauJ4PSgUv5ZBdRegpWKxi1";
const api_key = "AIzaSyD85gYt_5ldJnQE3-3VNWUqSXJ_YISvwLI"
const bearer_token = "ya29.A0ARrdaM9N5qPrOIYtB87QO79xzPPj7JgJy2hgAhazhZYLj3znzQ0eBac57mLKGgivI5FdqAqjyceatak1CVUK68c0X0_Q9iT40E9IvMns5hez97qUW_K5z5rgA6Q9gDq5RI_e-6YCy0vUJZR_2QCSJu72wltA"




const groupHeaders = {
    "Content-Type":"application/json",
    "Authorization":"key="+server_key,
    "project_id":"765645921368"
};


// to send notification to device groups/topics/tokens

// router.post('/send-notification',function(req,res){
//     var notification = {
//         "message":{
//            "to":"APA91bGDc-M3hn6l3ADviSvp3qAohNnF15H8EQYJEWAo8_jjBoROn11NQn-A0I8shLC32pXCmASXNwnuh7FKfJi62hcKq3Nb7BEcDRPRkwGo0j3gsYG2hDE",
//         //    "topics":"movies",
//            "notification":{
//              "body":"This is a test FCM notification message from shubham!",
//              "title":"Shubham tyagi",
//              "image":"https://www.hocalwire.com/images/logo.png"
//            },
//            "webpush":{
//              "headers":{
//                     "image":"https://www.hocalwire.com/images/logo.png"
//                 }
//             }
//         }
//     }
//     const postData = JSON.stringify(notification)
//     axios.post('https://fcm.googleapis.com/v1/projects/website-61ecc/messages:send',postData,{
//         'headers':{
//             'Authorization':"Bearer "+bearer_token,
//             'Content-Type':'application/json'
//         }
//     }).then(function(data){
//         console.log(data)
//         res.status(200).send('Notifications sent successfully ');
//     }).catch(function(err){
//         let error_data = err.data || err.response.data
//         let error_status = err.status || err.response.status
//         res.status(error_status).json(error_data);
//     });
// })


// --------------------------------------------------------------------------------------
//                                 GROUPS API
// --------------------------------------------------------------------------------------




// To create a device group, send a POST request that provides a name for the group, and a list of registration tokens for the devices. 
// FCM returns a new notification_key that represents the device group.
// A successful request returns a notification_key

router.post('/create-new-group',function(req,res){
    
    var notification_body  = {
        "operation": "create",
        "notification_key_name": "appUser-Chris",
        "registration_ids": ["e_Ls6XyrnqL97vSlQ-EpxT:APA91bHrLRrXjZKKo201LMZDxkkL92hZV6SoPEW1ZvMEgDcmopk2-uPOkMhyFfJhVfkLg0jbSVqGVjHdMYpOntY6mynGc-5Tc3tYsaMYE2JF-wZHa-zq0XfWHDn7dcBbkZDPawBkjJJF"]
     }

    var data = JSON.stringify(notification_body);
    
    
    axios.post('https://fcm.googleapis.com/fcm/notification',data,{
        "headers":groupHeaders
    }).then(function(data){
        console.log(data.response.data)
        res.status(data.status).send(data);
    }).catch(function(err){
        console.log(err)
        res.status(403).send(err.response.data);
    });
})


// following api will return a notification_key which will need a notification_key_name
// If you need to retrieve an existing notification key, use the notification_key_name in a GET request

router.post('/get-group',function(req,res){
    
    axios.get('https://fcm.googleapis.com/fcm/notification?notification_key_name=appUser-Chris',{
        'headers':groupHeaders
    }).then(function(data){
        res.status(data.status).send(data.data)
    }).catch(function(err){
        res.status(err.status).send(err.data)
    });
})



// following api will add a token/user to a group which is represented by a notification_key
// To add or remove devices from an existing group, send a POST request with the operation parameter set to add or remove, and provide the registration tokens for addition or removal.
// A successful request to either add or remove a device returns a notification_key

router.post('/add-to-group',function(req,res){
    
    var notification_body  = {
        "operation": "add",
        "notification_key_name": "appUser-Chris",
        "notification_key":"APA91bGDc-M3hn6l3ADviSvp3qAohNnF15H8EQYJEWAo8_jjBoROn11NQn-A0I8shLC32pXCmASXNwnuh7FKfJi62hcKq3Nb7BEcDRPRkwGo0j3gsYG2hDE",
        "registration_ids": ["fycp14feH71RLvfF78_AoC:APA91bF2gxB-FhnYmDbm3ucRDjjoUcqV3vwR0_nSINYykKB6pZdt2vTRBTlGbAIfUxhrS7HY4FMKpOSCzMWKLIT_bPqJrsmhzSIuMsBpbGkOTeumOttWf9JHsRffeekCGkPnUn7n2OAP"]
    }

    var data = JSON.stringify(notification_body)
    axios.post('https://fcm.googleapis.com/fcm/notification',data,{
        "headers":groupHeaders
    }).then(function(data){
        res.status(data.status).send(data.data);
    }).catch(function(err){
        res.status(500).send(err);
    });
})

// following api will remove a token/user from a group which is represented by a notification_key
// To add or remove devices from an existing group, send a POST request with the operation parameter set to add or remove, and provide the registration tokens for addition or removal.
// A successful request to either add or remove a device returns a notification_key

router.post('/remove-from-group',function(req,res){
    
    var notification_body  = {
        "operation": "remove",
        "notification_key_name": "appUser-Chris",
        "notification_key":"APA91bGDc-M3hn6l3ADviSvp3qAohNnF15H8EQYJEWAo8_jjBoROn11NQn-A0I8shLC32pXCmASXNwnuh7FKfJi62hcKq3Nb7BEcDRPRkwGo0j3gsYG2hDE",
        "registration_ids": ["e_Ls6XyrnqL97vSlQ-EpxT:APA91bHrLRrXjZKKo201LMZDxkkL92hZV6SoPEW1ZvMEgDcmopk2-uPOkMhyFfJhVfkLg0jbSVqGVjHdMYpOntY6mynGc-5Tc3tYsaMYE2JF-wZHa-zq0XfWHDn7dcBbkZDPawBkjJJF"]
    }

    var data = JSON.stringify(notification_body)
    axios.post('https://fcm.googleapis.com/fcm/notification',data,{
        "headers":groupHeaders
    }).then(function(data){
        res.status(data.status).send(data.data);
    }).catch(function(err){
        res.status(500).send(err);
    });
})



// --------------------------------------------------------------------------------------
//                                 TOPICS API
// --------------------------------------------------------------------------------------

router.post('/token-details',function(req,res){
    var iid_token =req.body.token ;
    
    if (iid_token){
        axios.get('https://iid.googleapis.com/iid/info/'+iid_token+"?details="+true,{
            'headers':{
                "Authorization":"key="+server_key
            }
        }).then(function(data){
            let result = data.data || data.response.data
            res.status(200).send(result);
        }).catch(function(err){
            if (err.data || err.response.data){
                let error_data = err.data || err.response.data
                let error_status = err.status || err.response.status
                res.status(error_status).send(error_data);
            }
            else{
                res.status(500).send(error_data);
            }
        });
    }
    else{
        res.status(500).send("No token found,Check to provide Content-type : application/json in headers and provide key as token and value as valid token")
    }
})

router.post('/add-topic',function(req,res){
    var iid_token =req.body.token ;
    var topic_name = req.body.topic_name

    if (iid_token && topic_name){
        axios.post('https://iid.googleapis.com/iid/v1/'+iid_token+'/rel/topics/'+topic_name,{
            'headers':{
                "Authorization":"key="+server_key
            }
        }).then(function(data){
            let result = data.data || data.response.data
            res.status(200).send(result);
        }).catch(function(err){
            if (err.data || err.response.data){
                let error_data = err.data || err.response.data
                let error_status = err.status || err.response.status
                res.status(error_status).send(error_data);
            }
            else{
                res.status(500).send(error_data);
            }
        });
    }
    else{
        res.status(500).send("No token found,Check to provide Content-type : application/json in headers and provide key as token and value as valid token")
    }
})


router.post('/add-topics',function(req,res){
    var tokens = req.body.tokens ;
    var topic_name = req.body.topic_name;

    // Example of req.body
    // {
    //     "tokens":["token1","token2"],
    //     "topic_name":"movies"
    // } 

    var notification_body = {
        "to":"/topics/"+topic_name,
        "registration_tokens":Array.isArray(tokens)?tokens:Array(tokens)
    }

    var data = JSON.stringify(notification_body)
    
    if (tokens && topic_name){
        axios.post('https://iid.googleapis.com/iid/v1:batchAdd',data,{
            'headers':{
                "Authorization":"key="+server_key
            }
        }).then(function(data){
            let result = data.data || data.response.data
            res.status(200).send(result);
        }).catch(function(err){
            if (err.data || err.response.data){
                let error_data = err.data || err.response.data
                let error_status = err.status || err.response.status
                res.status(error_status).send(error_data);
            }
            else{
                res.status(500).send(error_data);
            }
        });
    }
    else{
        res.status(500).send("No token found,Check to provide Content-type : application/json in headers and provide key as token and value as valid token")
    }
})

router.post('/remove-topics',function(req,res){
    var tokens = req.body.tokens ;
    var topic_name = req.body.topic_name;

    // Example of req.body
    // {
    //     "tokens":["token1","token2"],
    //     "topic_name":"movies"
    // } 

    var notification_body = {
        "to":"/topics/"+topic_name,
        "registration_tokens":Array.isArray(tokens)?tokens:Array(tokens)
    }

    var data = JSON.stringify(notification_body)
    
    if (tokens && topic_name){
        axios.post('https://iid.googleapis.com/iid/v1:batchRemove',data,{
            'headers':{
                "Authorization":"key="+server_key
            }
        }).then(function(data){
            let result = data.data || data.response.data
            res.status(200).send(result);
        }).catch(function(err){
            if (err.data || err.response.data){
                let error_data = err.data || err.response.data
                let error_status = err.status || err.response.status
                res.status(error_status).send(error_data);
            }
            else{
                res.status(500).send(error_data);
            }
        });
    }
    else{
        res.status(500).send("No token found,Check to provide Content-type : application/json in headers and provide key as token and value as valid token")
    }
})




// --------------------------------------------------------------------------------------
//                                 SEND NOTIFICATIONS API
// --------------------------------------------------------------------------------------


// send notifications

router.post('/send-notification',function(req,res){

    var notification = {
        "registration_ids":["fycp14feH71RLvfF78_AoC:APA91bF2gxB-FhnYmDbm3ucRDjjoUcqV3vwR0_nSINYykKB6pZdt2vTRBTlGbAIfUxhrS7HY4FMKpOSCzMWKLIT_bPqJrsmhzSIuMsBpbGkOTeumOttWf9JHsRffeekCGkPnUn7n2OAP","token2"],
        "priority":"HIGH",
        "notification":{
            "body":"This is a test FCM notification message from shubham!",
            "title":"Shubham tyagi",
            "image":"https://www.hocalwire.com/images/logo.png",
            "icon":"https://www.hocalwire.com/images/logo.png"
        }
        
    }
    const data = JSON.stringify(notification)
    axios.post('https://fcm.googleapis.com/fcm/send',data,{
        'headers':groupHeaders
    }).then(function(data){
        let result = data.data || data.response.data
        res.status(200).send(result);
    }).catch(function(err){
        let error_data = err.data || err.response.data
        let error_status = err.status || err.response.status
        res.status(error_status).json(error_data);
    });
})



module.exports = router;