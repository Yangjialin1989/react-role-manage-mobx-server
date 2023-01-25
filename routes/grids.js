var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var formidable = require('formidable');
const Grid = require('gridfs-stream');
var Images = require('../models/images');
Grid.mongo = mongoose.mongo;
const fs = require('fs');
var path = require('path');
const multer = require("multer");
const Users = require("../models/users");
//const utils = require('../resource/utils');
//const jwt = require('jsonwebtoken');
//const config = require('../config');
let myfilename = ''




mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
var conn = mongoose.connection;

/////////////文件上传/////////////////////////////////
 function uploadFile(ctx) {
	try {
		console.log('uploadFile', ctx)


		var gfs;

			gfs = Grid(conn, mongoose.mongo);

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


///////////////图片上传//////////////////////////////////////
// 创建存放头像图片的目录(当头像目录不存在时)
fs.readdir(__dirname + "/images/", function (err, files) {
	if (err) {
		fs.mkdir(__dirname + "/images/", function (err) {
			if (err) {
				console.log(err)
			}
			console.log("目录创建成功。");
		})
	}
})
// 设置图片存储路径
var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		//cb(null,path.join(__dirname ,'../public/images/'))// ../uploads是将存放图片文件夹创建在node项目平级，./uploads会存放在node项目根目录下，需要提前建好文件夹，否则会报错
		cb(null,'public/images')// ../uploads是将存放图片文件夹创建在node项目平级，./uploads会存放在node项目根目录下，需要提前建好文件夹，否则会报错
	},
	filename: function (req, file, cb) {
		cb(null, `${Date.now()}-${file.originalname}`) // 文件名
	}
})
//文件上传限制
const limits = {
	fields: 10,//非文件字段的数量
	fileSize: 2000 * 1024,//文件大小 单位 b
	files: 10//文件数量
}
// 添加配置文件到muler对象。
var upload = multer({ storage: storage });



//uploadFile('file')

//获取数据
router.post('/imgupload',upload.single('avatar'),async (ctx,res)=>{
	// 当前接口允许跨域
	console.log(ctx.fileList)
	let {filledname,originalname,encoding,mimetype,distination,filename,path,size} = ctx.file;
	const images = ctx.file
	console.log(images)
	let avatar = `http://localhost:6006/${ctx.file.destination}/${ctx.file.filename}`
	const image = new Images(images)
	image.save().then((result)=>{
		res.cookie('avatar',avatar)
		console.log("存储数据成功!")
		res.json({
			code:200,
			msg:'图片存储成功',
			data:avatar
		})
	}).catch(error=>{
		console.log(error)
		res.json({
			code:100,
			msg:'图片存储失败'
		})
	})
});



module.exports = router
