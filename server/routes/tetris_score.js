var express = require('express');
var router = express.Router();
const mySql = require('mysql');
const bdConfig = require('../bd_config.json')


router.post('/', function (req, res, next) {
	console.log(req.headers)
	const conn = mySql.createConnection(bdConfig)
	conn.connect(err => {
		if (err) {
			console.log(err);
		} else {
			console.log('Database OK');
		}
	})


	let query = `INSERT INTO Rating VALUES(\"${new Date().toLocaleString("en-US", {
		timeZone: "Europe/Moscow",
		hour12: false
	}).toString()}\", ${req.headers.score})`



	conn.query(query,(err,res,field)=>{
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

module.exports = router;
