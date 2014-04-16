Elance Automatic Withdrawal Bot
===============================

Logs into your Elance account once per day and withdrawals any available funds. 
Built because Elance won't do it automatically.

Installation: 

    npm install -g elance-withdrawal

Usage: 

    elance-withdrawal --username=foo@bar.com --password=abc123 --withdrawal-account-id=12434567 --"security question?"="security answer" --"other security question?"="other answer"

To find your --withdrawal-account-id, view-source on the withdrawal form and find the *VALUE* of the <option> in the select dropdown that lists your accounts.

Tip: you can shorten the security question to a smaller substring such as --pet=rover or --teacher="Mr.Smith"

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