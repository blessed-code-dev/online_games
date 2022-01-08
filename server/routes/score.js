var express = require('express');
var router = express.Router();
const mySql = require('mysql');
const bdConfig = require('../bd_config.json')


router.post('/', function (req, res, next) {


	const conn = mySql.createConnection(bdConfig)
	conn.connect(err => {
		if (err) {
			console.log(err);
		} else {
			console.log('Database OK');
		}
	})


	let query1 = "CREATE TABLE Rating (date VARCHAR(30),score INT, nick VARCHAR(20))"
	let query2 = "SELECT * FROM Rating"


	let query = `INSERT INTO ${req.headers.game}_rating VALUES(\"${new Date().toLocaleString("en-US", {
		timeZone: "Europe/Moscow",
		hour12: false
	}).toString()}\", ${req.headers.score}, "${req.headers.nick}")`


	conn.query(query, (err, res, field) => {
		console.log('err')
		console.log(err)
		console.log('res')
		console.log(res)
		console.log('field')
		console.log(field)
	})

	conn.end();

	res.json({
		ok: 'ok'
	})
});


router.get('/get_pos', function (req, res, next) {

	console.log(req.headers)

	const conn = mySql.createConnection(bdConfig)
	conn.connect(err => {
		if (err) {
			console.log(err);
		} else {
			console.log('Database OK');
		}
	})


	let query = `SELECT * FROM ${req.headers.game}_rating ORDER BY ${req.headers.game}_rating.score DESC`

	let pos
	conn.query(query, (err, response, field) => {
		console.log('err')
		console.log(err)
		console.log('res')
		console.log(response)
		// response.sort((value1, value2) => value1.score - value2.score)
		pos = response.findIndex(value => {
			console.log('comparing', value.score, req.headers.score)
			return value.score <= req.headers.score
		}) + 1

		if (pos === 0) {
			//worst result of the score table
			pos = response.length + 1;
		}
		console.log('index is', pos)


		res.json({
			ok: "ok)",
			pos: pos
		})
	})
	conn.end();


})

module.exports = router;
