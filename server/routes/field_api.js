var express = require('express');
var router = express.Router();
var findBestMove = require('./StolenAlgh')

router.get('/', function (req, res, next) {
    console.log(req.headers)
    console.log(req.headers.board.split('/').map(value => value === '' ? '_' : value))
    const boardData = req.headers.board.split('/').map(value => value === '' ? '_' : value)
    const board = [boardData.splice(0, 3), boardData.splice(0, 3), boardData.splice(0, 3)]
    console.log(board)
    console.log('Col: ' + findBestMove.bestMove(board).col, ' Row: ' + findBestMove.bestMove(board).row,)
    const row = findBestMove.bestMove(board).row
    const col = findBestMove.bestMove(board).col
    setTimeout(() =>
        res.json({
            myStep: [col, row]
        }), +Math.random() * 2000
    )
});

module.exports = router;
