const express = require('express');
const router  = express.Router();
const axios = require('axios');
const server_key = 'AAAAskQNnFg:APA91bG61IxsYO3OtGmL0JZmX1qZ37nrYLX6sh5tT8Yy-AVfNohH0ukaTQZvx5CuNCUwZn6ftmgND5EEofmozHDe3zyvPTuYiVGFBkfLKPJoti4JzKPwgFauJ4PSgUv5ZBdRegpWKxi1';

router.post('/sendnotification',function(req,res){
    var notification = {
        'title':'Hello world',
        'body':'test body',
        'icon':'https://images.news18.com/ibnlive/uploads/2021/08/shah-rukh-khan-01.jpg',
        'click_action':'https://www.hocalwire.com'
    };
    var fcm_tokens = ['fxwenWhiKdqFDyxSe3PIKz:APA91bE9-CroQ8TH4HwWd_vCbOdXvHi5Sxtk49HMDDb1h2E3GzsKGI2JmTK9ZUdukaL8uw-hZC-qWpngWJvdkGdxffyaHTlmhFA9624lfa109Wm1YZ4W-4SgY79BSqoCzW23vXG4P0Dv','fycp14feH71RLvfF78_AoC:APA91bEl2THXMbNM4BSZBhg65jpnaR70SzfUoQN3VhgXrMZLwadrb7GtEATLWJmqQ0YgTfirtIfM1vUuidXY1sv2H2my3Q7SgLxGea35OUF4umzIrr9dfVJdRPrPUmLlfcQuoKqrncSM' ];
    var notification_body = {
        'notification': notification,
        'to': fcm_tokens,
    };
    const postData = JSON.stringify(notification_body)
    axios.post('https://fcm.googleapis.com/fcm/send',postData,{
        'headers':{
            'Authorization':'key='+server_key,
            'Content-Type':'application/json'
        }
    }).then(function(){
        res.status(200).send('Notifications send successfully');
    }).catch(function(){
        res.status(200).send('Notifications send failed');
    });
})

module.exports = router;