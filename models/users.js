var mongoose = require('mongoose')
var Schema = mongoose.Schema
var grids = require('../models/grids');
var userSchema = new Schema({
	"id": {
		type:'Number'
	},
	"name":{//昵称
		type:String
	},
	"email":String,
	"password":String,
	"profile":{
		type:String,//个人简介
		default:'个人简介'
	},
	"telephone":String,
	"avatar":{
		type:String,
		default:'https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png'
	},
	"status":Number,
	'lastLoginIp': String,
	'lastLoginTime':Number,
	'creatorId': {
		type:String,
		default:'admins'
	},
	'createTime':Number ,
	'deleted': {
		type:'Number',
		default:0
	},
	'role_id': Number,
	'lang':  {
		type:String,
		default:'zh-CN'
	},
	'islive': {
		type:Boolean,
		default:false
	},
	"createdAt":{
		type:Date,
		default:new Date()
	},
	"updatedAt":{
		type:Date
	},
	"deletedAt":{
		type:Date
	},
	"grids": {
		type:Array,
		default:grids
	},
	//权限列表
	"permissions":{
		type:Array,
	},
	"menuList":{
		type:Array
	}
})
module.exports = mongoose.model('Users',userSchema)
