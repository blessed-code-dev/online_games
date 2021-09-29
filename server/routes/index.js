var express = require('express');
var router = express.Router();
var requestIp = require('request-ip');
var fs = require('fs');
var util = require('util');
/* GET users listing. */
router.get('/', function (req, res, next) {
    console.log("ip is", requestIp.getClientIp(req))
    let log_file = fs.createWriteStream(__dirname + '/debug.log', {flags: 'a'});
    let log_stdout = process.stdout;
    const log = `Connected from ${requestIp.getClientIp(req)} at ${new Date()}`
    log_file.write(util.format(log) + '\n');
    log_stdout.write(util.format(log) + '\n');
    next()
});

module.exports = router;
