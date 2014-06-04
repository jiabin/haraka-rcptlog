// rcptlog

// documentation via: haraka -c /usr/local/etc/haraka -h plugins/rcptlog

// Put your plugin code here
// type: `haraka -h Plugins` for documentation on how to create a plugin

exports.hook_queue_outbound = function (next, connection) {
    this.loginfo("New inbound email detected, inserting into rcptlog file");

    var fs      = require('fs');
    var now     = new Date();
    var txn     = connection.transaction;
    var subject = txn.header.headers.subject;

    var to = [];
    for (var i = 0; i < txn.rcpt_to.length; i++) {
        var smtp  = txn.rcpt_to[i];
        var email = smtp.user + "@" + smtp.host;
        
        to.push(email);
    }
    var from = txn.mail_from.user + "@" + txn.mail_from.host;
    var subject = txn.header.headers.subject.toString().replace(/(\r\n|\n|\r)/gm,"");
    this.logemerg(subject);

    var month = (now.getUTCMonth() + 1).toString();
    if (month.substr(0, 1) !== "0" && month.length < 2) {
        month = "0"+month;
    }
    var date  = now.getUTCDate().toString();
    if (date.substr(0, 1) !== "0" && date.length < 2) {
        date = "0"+date;
    }
    var name = "rcptlog-" + now.getUTCFullYear().toString() + "-" + month + "-" + date + ".log";
    var log = fs.createWriteStream(name, {'flags': 'a'});
    log.end("\n["+now.toISOString()+"]["+from+"]["+subject+"] " + to);

    return next();
}