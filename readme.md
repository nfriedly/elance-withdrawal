Elance Automatic Withdrawal Bot
===============================

Logs into your Elance account and withdrawals any available funds to the account you specify.

Installation
------------

    npm install -g elance-withdrawal
    
(Requires node.js - doenload it from http://nodejs.org/)

Usage
-----

    elance-withdrawal --username=foo@bar.com --password=abc123 --withdrawal-account-id=12434567 --"security question?"="security answer" --"other security question?"="other answer"

To find your --withdrawal-account-id, view-source on the [withdrawal](https://www.elance.com/php/CommerceLegacyFrontEnd/Mops/Withdrawal/Controller/Withdraw.php) form and find the `value` of the `<option>` in the `<select>` dropdown that lists your accounts.

Tip: you can shorten the security question to a smaller substring such as --pet=rover or --teacher="Mr.Smith"

Heroku Usage
------------

Create the app with the casperjs buildpack from http://github.com/misza222/heroku-buildpack-casperjs

    heroku apps:create [optional-app-name] --stack cedar --buildpack http://github.com/misza222/heroku-buildpack-casperjs.git
  
Add logging and cronjob suppport:

    heroku addons:add loggly:mole
    heroku addons:add scheduler
  
Open the cronjob config page:

    heroku addons:open scheduler
  
Set the cronjob to run

    ./vendor/casperjs/bin/casperjs index.js --username=you@yoursit.com --password=... etc.
    
If it doesn't seem to be working, run `heroku run bash` to open a shell on a new server instance. Then you can try running different commands and see what's going on.

MIT License
------------

Copyright (c) 2014 Nathan Friedly - http://nfriedly.com/

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
