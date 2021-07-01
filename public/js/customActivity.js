define([
    'postmonger'
], function (
    Postmonger
) {
    'use strict';

    var connection = new Postmonger.Session();
    var authTokens = {};
    var payload = {};
    
    var lastStepEnabled = false;
    
    $(window).ready(onRender);

    connection.on('initActivity', initialize);
    connection.on('requestedTokens', onGetTokens);
    connection.on('requestedEndpoints', onGetEndpoints);

    //connection.on('clickedNext', next());
    
    var steps = [ // initialize to the same value as what's set in config.json for consistency
        { "label": "First Step", "key": "step1" },
        { "label": "Second Step", "key": "step2" },
        { "label": "Third Step", "key": "step3" },
        { "label": "Final Step", "key": "step4" }
    ];
    
    var currentStep = steps[0].key;
    connection.on('clickedNext', onClickedNext);
    connection.on('clickedBack', onClickedBack);
    //connection.on('gotoStep', onGotoStep);

    
    
    function onRender() {
        // JB will respond the first time 'ready' is called with 'initActivity'
        connection.trigger('ready');

        connection.trigger('requestTokens');
        connection.trigger('requestEndpoints');

    }
    
    function onClickedNext () {
        if (currentStep.key === 'step4') 
        {
            save();
        }
        else
        {
            connection.trigger('nextStep');
        }
    }

    function onClickedBack () 
    {
        connection.trigger('prevStep');
    }


    function initialize(data) {
        console.log(data);
        if (data) {
            payload = data;
        }
        
        var hasInArguments = Boolean(
            payload['arguments'] &&
            payload['arguments'].execute &&
            payload['arguments'].execute.inArguments &&
            payload['arguments'].execute.inArguments.length > 0
        );

        var inArguments = hasInArguments ? payload['arguments'].execute.inArguments : {};

        console.log(inArguments);

        $.each(inArguments, function (index, inArgument) {
            $.each(inArgument, function (key, val) {
                
              
            });
        });

        connection.trigger('updateButton', {
            button: 'nextStep',
            text: 'Done',
            visible: true
        });
    }

    function onGetTokens(tokens) {
        console.log(tokens);
        authTokens = tokens;
    }

    function onGetEndpoints(endpoints) {
        console.log(endpoints);
    }

    function save() {

        var accountSid = $('#accountSID').val();
        var authToken = $('#authToken').val();
        var messagingService = $('#messagingService').val();
        var body = $('#messageBody').val();
        //var to='{{Contact.Attribute.TwilioCustomActivity.Phone}}';
        //console.log('To:'+to);

        payload['arguments'].execute.inArguments = [{
            "accountSid": accountSid,
            "authToken": authToken,
            "messagingService": messagingService,
            "body": body,
            "to": "" //<----This should map to your data extension name and phone number column
        }];

        payload['metaData'].isConfigured = true;

        console.log("Payload on SAVE function: "+JSON.stringify(payload));
        connection.trigger('updateActivity', payload);

    } 


});
