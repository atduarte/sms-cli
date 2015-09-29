#!/usr/bin/node

var _ = require('underscore'),
    clc = require('cli-color'),
    async = require('async'),
    request = require('request'),
    read = require('read'),
    Entities = require('html-entities').AllHtmlEntities,
    entities = new Entities(),
    config = require('./config');

request = request.defaults({
    baseUrl: config.baseUrl,
    qs: {email: config.email, password: config.password}
});

var selectMessages = function (rawMessages, count) {
    return _.uniq(rawMessages, false, function (value) { return value.contact.number + '|' + value.message })
        .splice(0, count)
        .reverse();
};

var printMessages = function (messages) {
    var i;
    for (i = 0; i < config.count && i < messages.length; i++) {
        var message = messages[i];

        //var date = message.received_at || message.sent_at;
        var color = message.received_at ? clc.cyan : clc.white;
        var arrow = message.received_at ? '→' : '←';

        console.log(color('[' + i + '] ' + arrow + ' ' + entities.decode(message.contact.name)));
        console.log(entities.decode(message.message));
    }
    console.log('');
};

var promptSend = function (messages) {
    var number = undefined,
        content = null;

    async.waterfall([
        async.apply(read, {prompt: 'Send to: '}),
        function (result, isDefault, next) {
           result = !result ? messages.length-1 : parseInt(result, 10);

           if (result >= 0 && result < messages.length) {
               number = messages[result].contact.number;
           }

           if (result.toString().length >= 9) number = result;

           if (!number) return next(clc.red('Invalid input'));

            next();
        },
        async.apply(read, {prompt: 'Message: '}),
        function (result, isDefault, next) {
            if (!result) {
                return next(clc.yellow('Message not sent'));
            }

            content = result;

            read({prompt: 'Are you sure? This will go to: ' + number + '. (Y/N)'}, next);
        },
        function (result, isDefault, next) {
            if (result.toUpperCase() !== 'Y') {
                return next(clc.yellow('Message not sent'));
            }

            sendMessage(number, content, next);
        }
    ], function (err) {
        if (err) console.log(err);
    });
};

var sendMessage = function (number, message, callback) {
     request.post({url: 'messages/send', qs: {device: config.deviceId, number: number, message: message}}, function (err, httpResponse, body) {
         if (err || httpResponse.statusCode != 200) {
             console.log(err);
             console.log(body);
             return callback(clc.red('Error'));
         }

         console.log(clc.green('Sent!'));
         callback();
    });
};

request.get('messages', function (err, httpResponse, body) {
    if (err || httpResponse.statusCode != 200) {
        console.error('Couldn\'t connect to the API to get the messages');
        return;
    }

    var messages = selectMessages(JSON.parse(body).result || {}, config.messageCount);

    if (messages.length == 0) {
        console.error(clc.red('No messages to show'));
        return;
    }

    printMessages(messages);
    promptSend(messages);
});
