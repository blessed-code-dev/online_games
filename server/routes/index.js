var express = require('express');
var router = express.Router();
var findBestMove = require('./StolenAlgh')
var getIP = require('ipware')().get_ip;
var requestIp = require('request-ip');
/* GET home page. */


router.get('/', function (req, res, next) {
    console.log(req.headers)
    console.log(req.headers.board.split('/').map(value => value === '' ? '_' : value))
    const boardData = req.headers.board.split('/').map(value => value === '' ? '_' : value)
    const board = [boardData.splice(0, 3), boardData.splice(0, 3), boardData.splice(0, 3)]
    console.log(board)

    console.log('Col: ' + findBestMove.bestMove(board).col, ' Row: ' + findBestMove.bestMove(board).row,)
    const row = findBestMove.bestMove(board).row
    const col = findBestMove.bestMove(board).col
    // console.log( req.headers['x-forwarded-for'] || req.connection.remoteAddress)
    console.log("ip is",requestIp.getClientIp(req))


    let ip
    if (req.headers['x-forwarded-for']) {
        ip = req.headers['x-forwarded-for'].split(",")[0];
    } else if (req.connection && req.connection.remoteAddress) {
        ip = req.connection.remoteAddress;
    } else {
        ip = req.ip;
    }

    console.log("client IP is *********************" + ip);


    var ipaddress = (req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress).split(",")[0];

    console.log("v2:",ipaddress)
    setTimeout(() =>
        res.json({
            myStep: [col, row]
        }), +Math.random() * 2000
    )
});

module.exports = router;
