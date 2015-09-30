# sms-cli (alpha)
Stealth desktop SMS app. Compatible with Android via SMS Gateway API (http://smsgateway.me).

Able to get last X messages (received and sent) and to send new messages, from your Android Device.

# Usage

![Image](http://i.imgur.com/c9tJiim.png)


Cyan header represents the received messages.

#### Steps

**Send To:** Message index (numbers on the left), phone number or nothing (defaults to the sender of the last message).

**Message:** Your message content (new lines not supported)

**Confirmation:** "Y" or "y" to confirm. 

# Installation

1. Install ["SMS Gateway API"](https://play.google.com/store/apps/details?id=networked.solutions.sms.gateway.api) app and login or signup.

2. Clone  

        $ git clone https://github.com/atduarte/sms-cli.git
        $ cd sms-cli

3. Change configurations

        $ cp config.dist.js config.js
        $ vi config.js # And replace fields with your "SMS Gateway API" info
  
4. Get dependencies & Run it

        $ npm install
        $ sudo chmod +x index.js
        $ sudo ln -s ./index.js /usr/bin/sms-cli
        $ sms-cli
        
# Documentation

## Configuration

* email, password (strings) - Email and password used with SMS Gateway API
* deviceId (number) - Device ID from the Android phone you want to use. Available on the SMS Gateway API app.
* messageCount (number) - How many messages (received and sent) do you want to show?
* baseUrl (string) - Base URL from SMS Gateway API. You shouldn't need to change this.
        
# Known Problems

* SMS Gateway API (http://smsgateway.me) repeats some "manual sent" messages and misses others. We are considering creating our own Android App and API Gateway
