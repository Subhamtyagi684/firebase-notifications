const express = require('express');
const router  = express.Router();
const axios = require('axios');
const server_key = "AAAAskQNnFg:APA91bG61IxsYO3OtGmL0JZmX1qZ37nrYLX6sh5tT8Yy-AVfNohH0ukaTQZvx5CuNCUwZn6ftmgND5EEofmozHDe3zyvPTuYiVGFBkfLKPJoti4JzKPwgFauJ4PSgUv5ZBdRegpWKxi1";
const api_key = "AIzaSyD85gYt_5ldJnQE3-3VNWUqSXJ_YISvwLI"


router.post('/send-to-group',function(req,res){
    var notification = {
        'title':'Title of notification',
        'body':'Subtitle',
        'image':'https://images.news18.com/ibnlive/uploads/2021/08/shah-rukh-khan-01.jpg',
        'click_action':'https://www.hocalwire.com'
    };
    var fcm_tokens = ["fycp14feH71RLvfF78_AoC:APA91bF2gxB-FhnYmDbm3ucRDjjoUcqV3vwR0_nSINYykKB6pZdt2vTRBTlGbAIfUxhrS7HY4FMKpOSCzMWKLIT_bPqJrsmhzSIuMsBpbGkOTeumOttWf9JHsRffeekCGkPnUn7n2OAP"]
    var notification_body = {
        'notification': notification,
        'registration_ids': fcm_tokens,
    };
    const postData = JSON.stringify(notification_body)
    axios.post('https://fcm.googleapis.com/fcm/send',postData,{
        'headers':{
            'Authorization':'key='+server_key,
            'Content-Type':'application/json'
        }
    }).then(function(){
        res.status(200).send('Notifications sent successfully');
    }).catch(function(){
        res.status(500).send('Notifications sending failed');
    });
})


// router.post('/sendnotification',function(req,res){
//     var notification = {
//         "body":"This is an FCM notification message!",
//         "title":"FCM Message"
//     };
    
//     var notification_body = {

//         "message": {
//             "topic" : "foo-bar",
//             "notification": {
//               "body": "This is a Firebase Cloud Messaging Topic Message!",
//               "title": "FCM Message"
//             }
//           }
          
//     }

//     var data = JSON.stringify(notification_body)
//     axios.post('https://fcm.googleapis.com/v1/projects/website-61ecc/messages:send',data,{
//         'headers':{
//             'Authorization':"Bearer ya29.A0ARrdaM-box5xvDzSB7yTk2f7gSoncLd-ApmYusT8eXBI4Ivn9wj8cFnq99_tKB1MoYyU34DZQ9ByDHiGapLapUoAhvQv4NOpQCDiuktWUUvVcD2PXo7lRqRTVgSY-QFHkFHfgMcg6jvvCmQPuKPcliZqdZM9",
//             'Content-Type':'application/json'
//         }
//     }).then(function(){
//         res.status(200).send('Notifications send successfully');
//     }).catch(function(err){
//         res.status(500).send(err);
//     });
// })

router.post('/create-new-group',function(req,res){
    
    var notification_body  = {
        "operation": "create",
        "notification_key_name": "appUser-Chris",
        "registration_ids": ["fycp14feH71RLvfF78_AoC:APA91bGixzCfMKlA4gcV02oafEbvM7F4YW2LJlGW80LzNdt8stuNsxFVy-lqdezgan_UHYJJe5AAWQ0DOk616lrdNFRqIoc1zcjcpoogLpuKQJFp59zhshjz3eQNk4tj6DMZDb2zmFzZ","c-KenttXsxf87s_5E6h-ot:APA91bGh6UPN5MI-A2ZC0h-GOdyRzrbj7gZoY1jEZGBe8Hx1XkoCDJX81N55vdYENFgwX6an0dNRRifJGIkDo9I5pr8ILlmnyWhfrstEYQYieVhFy3kys1q_v_3Uu0LHdpGk9KB80HQd"]
    }

    var data = JSON.stringify(notification_body)
    axios.post('https://fcm.googleapis.com/fcm/notification',data,{
        "headers":{
            "Authorization":"key="+api_key,
            "Content-Type":"application/json",
            "project_id":"website-61ecc"
        }
    }).then(function(result){
        res.status(200).send(result);
    }).catch(function(err){
        res.status(500).send(err);
    });
})


router.post('/get-group',function(req,res){
    
    axios.get('https://fcm.googleapis.com/fcm/notification?notification_key_name=appUser-Chris',{
        'headers':{
            'Authorization':"key="+api_key,
            'Content-Type':'application/json',
            "project_id":"website-61ecc"

        }
    }).then(function(data){
        res.status(200).send(data);
    }).catch(function(err){
        res.status(500).send(err);
    });
})

router.post('/add-to-group',function(req,res){
    
    var notification_body  = {
        "operation": "add",
        "notification_key_name": "appUser-Chris",
        "registration_ids": ["fQyMfvH75Ik8euuvuf8qQk:APA91bEwusFR2no3hRxtNEIB1mKcppCx0hLwsbknUd3fQXfD9vjahj_aFfEEIKqwNaO2hv0vVNVSgmRV-zcavX4XNYwwNvb0qSa43nJNl5-10rIQhISy8dCJNYzWR6ujJlERkPRoEiVw"]
    }

    var data = JSON.stringify(notification_body)
    axios.post('https://fcm.googleapis.com/fcm/notification',data,{
        "headers":{
            "Authorization":"key="+api_key,
            "Content-Type":"application/json",
            "project_id":"website-61ecc"
        }
    }).then(function(result){
        res.status(200).send(result);
    }).catch(function(err){
        res.status(500).send(err);
    });
})


router.post('/remove-from-group',function(req,res){
    
    axios.get('https://fcm.googleapis.com/fcm/notification?notification_key_name=appUser-Chris',data,{
        'headers':{
            'Authorization':"key="+api_key,
            'Content-Type':'application/json',
            "project_id":"website-61ecc"

        }
    }).then(function(data){
        res.status(200).send(data);
    }).catch(function(err){
        res.status(500).send(err);
    });
})

module.exports = router;