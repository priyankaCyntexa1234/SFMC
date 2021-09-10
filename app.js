'use strict';
// Module Dependencies
// -------------------
var express     = require('express');
var bodyParser  = require('body-parser');
var errorhandler = require('errorhandler');
var http        = require('http');
var path        = require('path');
var request     = require('request');
var routes      = require('./routes');
var activity    = require('./routes/activity');

var app = express();

const { urlencoded } = require('body-parser');
app.use(urlencoded({ extended: false }));



// Configure Express
app.set('port', process.env.PORT || 3000);
app.use(bodyParser.raw({type: 'application/jwt'}));
//app.use(bodyParser.urlencoded({ extended: true }));

//app.use(express.methodOverride());
//app.use(express.favicon());


app.post('/slackmsg',function(req,res){
 // console.log("Slack Message Received");
 // console.log(req);
 // console.log(req.body);
 // console.log('Text:'+req.body.text);
 // console.log('Trigger-word:'+req.body.trigger_word);
 // console.log('Trigger-word:'+req.body.user_name);
 // console.log('Channel Id:'+req.body.channel_id);
  let str = req.body.text;
  const slug = str.split(' ');
  console.log(slug[2]);
  

  
var options = {
  'method': 'POST',
  'url': 'https://mc6vgk-sxj9p08pqwxqz9hw9-4my.auth.marketingcloudapis.com/v2/token',
  'headers': {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "grant_type": "client_credentials",
    "client_id": "4qdbeo2pv92jb8yf2v0pq6zi",
    "client_secret": "6y9SPiqgG5mjzmptf33PCTvS",
    "account_id": "514015917"
  })

};
request(options, function (error, response) {
  if (error) throw new Error(error);
 // console.log('--------authsecret---------');
  console.log(response.body);
 console.log('--------authsecret---------');
  console.log(response.body.access_token);
 
  func(slug[2]);
 // getautomation(slug[2]);
});

});
//------------get automation with same name---------------------------
function func(abc){
console.log(abc);
}
function getautomation(automationame,et_subdomain,dne_etAccessToken) {
  console.log('automation name-------->'+automationame);
  console.log('Subdomain-------->'+et_subdomain);
 console.log('access token-------->'+dne_etAccessToken);
  
}

/******************************************ANIL KUMAR*******************************************/
app.post('/slackMessage',function(req,res){
  console.log("Slack Message Received");
  //console.log(req);
  console.log(req.body);
 // console.log('Text:'+req.body.text);
 // console.log('Trigger-word:'+req.body.trigger_word);
//  console.log('Trigger-word:'+req.body.user_name);
//  console.log('Channel Id:'+req.body.channel_id);
  var sfmcToken='';
  var accessToken = {
    'method': 'POST',
    'url': 'https://mc6vgk-sxj9p08pqwxqz9hw9-4my.auth.marketingcloudapis.com/v2/token',
    'headers': {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "grant_type": "client_credentials",
      "client_id": "mmjtrzndyiscakj3l2g8ncwj",
      "client_secret": "4jaPtqHXVyeUr6byzr7ZWcOF",
      "account_id": "514015916"
    })
  
  };
  request(accessToken, function (error, response) {
   //console.log(response.body);
   sfmcToken=response.body.access_token; 
  });
  
  var journeyText=req.body.text;
  var journey = journeyText.split(" ");
  //For journey
  console.log('Journey Name:'+journey[1]+' JourneyVersion:'+journey[2]);
  var journeyURL='https://mc6vgk-sxj9p08pqwxqz9hw9-4my.rest.marketingcloudapis.com/interaction/v1/interactions?name='+journey[1];
  var gettingJourney = {
    'method': 'GET',
    'url': journeyURL,
    'headers': {
      'Content-Type':'application/json',
      'Authorization': 'Bearer ' + sfmcToken
    }
  };
  request(gettingJourney, function (error, response) {
    if(error)
    {
      console.log('Error White retriving journey'+error);
    }
    else
    {
      console.log('Journey Data');
      console.log('Response:'+JSON.stringify(response));
    }
  });

  //For access token
  /*async function getacesstoken1() {
    try {
      return new Promise(function (resolve, reject) {
        axios.post('https://mc6vgk-sxj9p08pqwxqz9hw9-4my.auth.marketingcloudapis.com/v2/token',
          {
            'client_id': 'mmjtrzndyiscakj3l2g8ncwj',
            'client_secret': '4jaPtqHXVyeUr6byzr7ZWcOF',
            'grant_type': 'client_credentials'
          })
          .then((response) => {
            resolve({
              'AccessToken': response.data.access_token,
              'RestURL': response.data.rest_instance_url,
              'SoapURL': response.data.soap_instance_url
            });
          },
            (error) => {
              var errorMessage = {
                error: "This is error"
              };
              res.send(errorMessage);
            })
      });
    }
    catch (err) {
    }
  }*/
});
/**********************************************END*************************************************/

app.use(express.static(path.join(__dirname, 'public')));

// Express in Development Mode
if ('development' == app.get('env')) {
  app.use(errorhandler());
}

// HubExchange Routes
app.get('/', routes.index );
app.post('/login', routes.login );
app.post('/logout', routes.logout );

// Custom Hello World Activity Routes
app.post('/journeybuilder/save/', activity.save );
app.post('/journeybuilder/validate/', activity.validate );
app.post('/journeybuilder/publish/', activity.publish );
app.post('/journeybuilder/execute/', activity.execute );

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
