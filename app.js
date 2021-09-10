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
  console.log("Slack Message Received");
  console.log(req);
  console.log(req.body);
  console.log('Text:'+req.body.text);
  console.log('Trigger-word:'+req.body.trigger_word);
  console.log('Trigger-word:'+req.body.user_name);
  console.log('Channel Id:'+req.body.channel_id);
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
  func(slug[2]);
  
});

});
//------------get automation with same name---------------------------
function func(abc){
console.log(abc);
}
function getautomation(automationame) {
  console.log('automation name'+automationame);
  var options = {
    'method': 'POST',
    'url': 'https://mc6vgk-sxj9p08pqwxqz9hw9-4my.soap.marketingcloudapis.com/Service.asmx',
    'headers': {
      'Content-Type': 'application/xml'
    },
    body: '<?xml version="1.0" encoding="UTF-8"?>\n<s:Envelope xmlns:s="http://www.w3.org/2003/05/soap-envelope" xmlns:a="http://schemas.xmlsoap.org/ws/2004/08/addressing" xmlns:u="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">\n    <s:Header>\n        <a:Action s:mustUnderstand="1">Retrieve</a:Action>\n        <a:To s:mustUnderstand="1">https://mc6vgk-sxj9p08pqwxqz9hw9-4my.soap.marketingcloudapis.com/Service.asmx</a:To>\n        <fueloauth xmlns="http://exacttarget.com">eyJhbGciOiJIUzI1NiIsImtpZCI6IjQiLCJ2ZXIiOiIxIiwidHlwIjoiSldUIn0.eyJhY2Nlc3NfdG9rZW4iOiJZQ0JObWRDUGQwaEZXTFJRTDFveDB3OXMiLCJjbGllbnRfaWQiOiI0cWRiZW8ycHY5MmpiOHlmMnYwcHE2emkiLCJlaWQiOjExMDAwNTY5MCwic3RhY2tfa2V5IjoiUzExIiwicGxhdGZvcm1fdmVyc2lvbiI6MiwiY2xpZW50X3R5cGUiOiJTZXJ2ZXJUb1NlcnZlciJ9.2jx1ppxn2P-1lGVepgMjC3rnlNEH-Vh34s8R0iBivRY.5c-_Bobbxb6pho-3__Y4n_4Z3AHfKQ87Jj8BrinfckKkOj9JRnf-XFeEi9z1WvPt00ImjRKaTLvAg99G2haUyRRNE8W27liHG4CpW50yRstLE9vnuOUwCe2EicKXt4FA8MHIqEYtN-Tpn3KS8PEdjj0U-8c6rREvHAnYMmWW8GT-aWrcaZ6</fueloauth>\n    </s:Header>\n    <s:Body xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">\n        <RetrieveRequestMsg xmlns="http://exacttarget.com/wsdl/partnerAPI">\n            <RetrieveRequest>\n                <ObjectType>Automation</ObjectType>\n                <Properties>Name</Properties>\n                <Properties>Description</Properties>\n                <Properties>CustomerKey</Properties>\n                <Properties>IsActive</Properties>\n                <Properties>ScheduledTime</Properties>\n                <Properties>Status</Properties>\n                <Properties>Definition</Properties>\n                <Properties>AutomationType</Properties>\n               <Properties>LastRunTime</Properties>\n               <Properties>LastSaveDate</Properties>\n               <Properties>ModifiedBy</Properties>\n               <Properties>CreatedBy</Properties>\n               <Properties>Scheduled</Properties>      \n                <Filter xsi:type="SimpleFilterPart">\n                    <Property>Name</Property>                 \n                    <SimpleOperator>equals</SimpleOperator>\n                     <Value>'+automationame+'</Value>\n                </Filter>\n            </RetrieveRequest>\n        </RetrieveRequestMsg>\n    </s:Body>\n</s:Envelope>'
  
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log('automation name');
    console.log(response.body);
  });
}

/******************************************ANIL KUMAR*******************************************/
app.post('/slackMessage',function(req,res){
  console.log("Slack Message Received");
  //console.log(req);
  //console.log(req.body);
  console.log('Text:'+req.body.text);
  console.log('Trigger-word:'+req.body.trigger_word);
  console.log('Trigger-word:'+req.body.user_name);
  console.log('Channel Id:'+req.body.channel_id);
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
      console.log('Journey');
      console.log(response);
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
