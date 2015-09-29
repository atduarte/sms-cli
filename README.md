# sms-cli (alpha)
Stealth SMS sending for Android from CLI, via SMS Gateway API (http://gateway.me).


# Usage

1. Install ["SMS Gateway API"](https://play.google.com/store/apps/details?id=networked.solutions.sms.gateway.api) app and login or signup.

2. Clone  

        git clone https://github.com/atduarte/sms-cli.git
        cd sms-cli

3. Change configurations

        cp config.dist.js config.js
        vi config.js # And replace fields with your "SMS Gateway API" info
  
4. Run it

        sudo chmod +x index.js
        sudo ln ./index.js /usr/bin/sms-cli
        sms-cli


