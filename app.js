'use strict';
// Module Dependencies
// -------------------
var express     = require('express');
var bodyParser  = require('body-parser');
var errorhandler = require('errorhandler');
var http        = require('http');
var path        = require('path');
var request     = require('request');
var axios =require('axios');
var routes      = require('./routes');
var activity    = require('./routes/activity');
var xml2js = require('xml2js');
var parser = require('xml2json');

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
 
  
 // var request = require('request');
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
  console.log(response.body);
   var body2 = JSON.parse(response.body);
  console.log(body2['access_token']);
  getautomation(body2['access_token'],slug[2]);
});

});

function getautomation(accesstoken,automationname) {
 console.log('access token------------>'+accesstoken);
 console.log('automationname-------------->'+automationname);
 
 
 var options = {
  'method': 'POST',
  'url': 'https://mc6vgk-sxj9p08pqwxqz9hw9-4my.soap.marketingcloudapis.com/Service.asmx',
  'headers': {
    'Content-Type': 'application/soap+xml'
  },
  body: '<?xml version="1.0" encoding="UTF-8"?>\n<s:Envelope xmlns:s="http://www.w3.org/2003/05/soap-envelope" xmlns:a="http://schemas.xmlsoap.org/ws/2004/08/addressing" xmlns:u="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">\n    <s:Header>\n        <a:Action s:mustUnderstand="1">Retrieve</a:Action>\n        <a:To s:mustUnderstand="1">https://mc6vgk-sxj9p08pqwxqz9hw9-4my.soap.marketingcloudapis.com/Service.asmx</a:To>\n        <fueloauth xmlns="http://exacttarget.com">'+accesstoken+'</fueloauth>\n    </s:Header>\n    <s:Body xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">\n        <RetrieveRequestMsg xmlns="http://exacttarget.com/wsdl/partnerAPI">\n            <RetrieveRequest>\n                <ObjectType>Automation</ObjectType>\n        <Properties>ProgramID</Properties>\n         <Properties>Name</Properties>\n                <Properties>Description</Properties>\n                <Properties>CustomerKey</Properties>\n                <Properties>IsActive</Properties>\n                <Properties>ScheduledTime</Properties>\n                <Properties>Status</Properties>\n                <Properties>Definition</Properties>\n                <Properties>AutomationType</Properties>\n               <Properties>LastRunTime</Properties>\n               <Properties>LastSaveDate</Properties>\n               <Properties>ModifiedBy</Properties>\n               <Properties>CreatedBy</Properties>\n               <Properties>Scheduled</Properties>      \n                <Filter xsi:type="SimpleFilterPart">\n                    <Property>Name</Property>                 \n                    <SimpleOperator>equals</SimpleOperator>\n                    <Value>'+automationname+'</Value>\n                </Filter>\n            </RetrieveRequest>\n        </RetrieveRequestMsg>\n    </s:Body>\n</s:Envelope>'

};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log('response.body--------------------->');
  console.log(response.body);
  var data1 = parser.toJson(response.body);
  console.log(parser.toJson(response.body));
  console.log(data1['ObjectID']);
  
});

}
/*
body : '<?xml version="1.0" encoding="UTF-8"?>'+
'<s:Envelope xmlns:s="http://www.w3.org/2003/05/soap-envelope" xmlns:a="http://schemas.xmlsoap.org/ws/2004/08/addressing" xmlns:u="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">'+
'    <s:Header>'+
'        <a:Action s:mustUnderstand="1">Retrieve</a:Action>'+
'        <a:To s:mustUnderstand="1">https://mc6vgk-sxj9p08pqwxqz9hw9-4my.soap.marketingcloudapis.com/Service.asmx</a:To>'+
'        <fueloauth xmlns="http://exacttarget.com">'+accesstoken+'</fueloauth>'+
'    </s:Header>'+
'    <s:Body xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">'+
'        <RetrieveRequestMsg xmlns="http://exacttarget.com/wsdl/partnerAPI">'+
'            <RetrieveRequest>'+
'                <ObjectType>Automation</ObjectType>'+
'                <Properties>Name</Properties>'+
'                <Properties>Description</Properties>'+
'                <Properties>CustomerKey</Properties>'+
'                <Properties>IsActive</Properties>'+
'                <Properties>ScheduledTime</Properties>'+
'                <Properties>Status</Properties>'+
'                <Properties>Definition</Properties>'+
'                <Properties>AutomationType</Properties>'+
'               <Properties>LastRunTime</Properties>'+
'               <Properties>LastSaveDate</Properties>'+
'               <Properties>ModifiedBy</Properties>'+
'               <Properties>CreatedBy</Properties>'+
'               <Properties>Scheduled</Properties>      '+
'                 <Filter xsi:type="SimpleFilterPart">'+
'                 <Property>Name</Property>    '+             
'                <SimpleOperator>equals</SimpleOperator>'+
'                <Value>'+automationname+'</Value>'+
'           </Filter>'+
'            </RetrieveRequest>'+
'        </RetrieveRequestMsg>'+
'    </s:Body>'+
'</s:Envelope>',

*/
//------------get automation with same name---------------------------

/******************************************ANIL KUMAR*******************************************/


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
