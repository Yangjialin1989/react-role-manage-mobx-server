var mongoose = require('mongoose')
var Schema = mongoose.Schema
var rolesSchema = new Schema({
	'id': {
		type:Number,
		default:new Date().valueOf()
	},
	"createdAt":{
		type:Date,
		default:new Date()
	},
	"updatedAt":{
		type:Date,
		default:new Date()
	},
	"deletedAt":{
		type:Date,
		default:null
	},
	"roleName":String,

	"permissionList":Array,
	"menuInfo":Array




})
module.exports = mongoose.model('Roles',rolesSchema)
