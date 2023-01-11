var mongoose = require('mongoose')
var Schema = mongoose.Schema
var userSchema = new Schema({
	"id": {
		type:'Number',
		default:1
	},
	"name":{//昵称
		type:String,
		default:'test'
	},
	"username":String,
	"email":String,
	"password":String,
	"profile":{
		type:String,//个人简介
		default:'个人简介'
	},
	"avatar":{
		type:String,
		default:'https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png'
	},
	"status":Number,
	"telephone":String,
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
	'roleId': String,
	'lang':  {
		type:String,
		default:'zh-CN'
	},
	'token': {
		type:String,
		default:'4291d7da9005377ec9aec4a71ea837f'
	},
	'islive': {
		type:Boolean,
		default:false
	}
})
module.exports = mongoose.model('Users',userSchema)
