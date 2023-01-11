var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var GraceInfos = require('../models/graceInfos');
var DieInfos = require('../models/dieInfos');

var mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const fs = require('fs');
//const utils = require('../resource/utils');
//const jwt = require('jsonwebtoken');
//const config = require('../config');
Grid.mongo = mongoose.mongo;





//红牌
//存储数据


async function uploadFile(ctx) {
	try {
		console.log('uploadFile', ctx)
		var conn = mongoose.connection;
		var gfs = Grid(conn.db);
		//filename 文件名称，我这里是自定义的文件名称，为了保证同名文件不冲突。使用的用户ID加4位随机数加时间戳
		let writeStream = new Date()
		// const girdFSBucket = new mongoose.mongo.GridFSBucket(conn.db)
		// var writeStream = girdFSBucket.openUploadStream(jwt.verify(ctx.headers.authorization, config.encrypt.JWT_SECRET) + "_" + utils.generateProductId() + ctx.request.files.file.name.toString().toLowerCase().substr(ctx.request.files.file.name.toString().length - 4))
		//var result = fs.createReadStream(ctx.request.files.file.path).pipe(writeStream);
		// console.log(result)
		//ctx.body = result.options

	} catch (error) {
		console.log(error)
		throw error;
	}
}

//获取数据
router.post('/imgupload',function(req,res,next){
	//console.log(req.body)
	//文件上传至 mongodb

    uploadFile(req.body);


	res.json({
		code: 200,
		msg:'数据获取成功！',
		data:"result"
	})


});


module.exports = router
