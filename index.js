#!/usr/bin/env casperjs

var usageMsg = [
    'Usage: ',
    'elance-withdrawal --username=foo@bar.com --password=abc123 --withdrawal-account-id=12434567 --"security question?"="security answer" --"other security question?"="other answer"',
    '',
    'To find your --withdrawal-account-id, view-source on the withdrawal form and find the *VALUE* of the <option> in the select dropdown that lists your accounts.',
    '',
    'Tip: you can shorten the security question to a smaller substring such as --pet=rover or --teacher="Mr.Smith"'
].join('\n');

var casper = require('casper').create();

var username = casper.cli.get("username");
var password = casper.cli.get("password");
var withdrawalAccountId = casper.cli.get('withdrawal-account-id'); // '';
var securityQuestions = Object.keys(casper.cli.options).filter(function(q) {
    // everything except the args below is assumed to be a potential security question
    return ['casper-path', 'cli', 'direct', 'log-level', 'engine', 'username', 'password', 'withdrawal-account-id'].indexOf(q) == -1;
});
if (!username || !password || !withdrawalAccountId || !securityQuestions.length) {
    throw usageMsg;
}
casper.start('https://www.elance.com/php/CommerceLegacyFrontEnd/Mops/Withdrawal/Controller/Withdraw.php', function() {
    this.echo('Logging in...');
    this.fill('#loginForm', { lnm: username, pwd: password }, false); // false = don't submit - all of their forms requires some magic JS to work properly
    this.click('#spr-sign-in-btn-standard');
});

casper.waitForUrl(/securityAudit/, function() {
    var securityQ = this.evaluate(function() {
        var titles = document.querySelectorAll('div.title');
        var securityTitleDiv = Array.prototype.filter.call(titles, function(e) {
            return e.textContent == 'Secret Question';
        })[0];
        var securityQ = securityTitleDiv.getNext().textContent;
        return securityQ;
    });
    var questionParam = securityQuestions.filter(function(param) {
        return securityQ.indexOf(param) != -1;
    })[0];
    if (!questionParam) { 
        throw 'No answer found for security question: '+ securityQ;
    }
    var answer = this.cli.get(questionParam);
    this.echo('Security question is "' + securityQ + '". Answering with value from --' + questionParam);
    this.fill('#sa-securityForm', {challengeAnswer: answer}, false);
    this.click('#ContinueLogin');
});

// this must be written this way because otherwise it will run early on https://www.elance.com/php/myelance/main/index.php?redirect=https://www.elance.com/php/CommerceLegacyFrontEnd/Mops/Withdrawal/Controller/Withdraw.php?
casper.waitForUrl(/^https:\/\/www.elance.com\/php\/CommerceLegacyFrontEnd\/Mops\/Withdrawal\/Controller\/Withdraw.php/, function() {
    var textBalance = this.evaluate(function() {
        return document.querySelectorAll('table.withdrawTable tr:first-child td:last-child')[0].textContent;
    });
    console.log('Available balance is $' + textBalance);
    
    // only continue if there is a balance alaliable
    if (parseFloat(textBalance) > 0) {
        // evidently you have to wait for this form..?
        casper.waitForSelector('#withdrawForm', function() {
            this.fill('#withdrawForm', {method: withdrawalAccountId, txn_amount: textBalance}, false);
            this.click('#FundWithDraw');
        });
    } else {
        casper.exit();
    }
});

casper.waitForUrl('#stage=preview', function() {
    this.fill('#previewForm', {password: password}, false);
    this.click('#submit_btn');
});

var success_url_start = 'https://www.elance.com/php/framework/main/confirm.php?mode=withdraw&txn_id='
casper.waitForUrl(success_url_start, function() {
    var transactionId = this.getGlobal('location').href.substr(success_url_start.length)
    this.echo("Withdrawal complete, transaction ID is " + transactionId);
});


casper.run();