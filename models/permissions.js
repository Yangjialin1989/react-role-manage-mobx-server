var mongoose = require('mongoose')
var Schema = mongoose.Schema
var permissionsSchema = new Schema({
	'apiPath':String,
	'id':Number,
	'method':{
		type:String,
		default:'POST'
	},
	'path':String,
	'pathRoute':String,
	'parentId':{
		type:Number

	},
	'createdAt':{
		type:Date,
		default:new Date()
	},
	'deletedAt':Date,
	'isMenu':{
		type:Number,
		default:0
	},
	'isContainChildren':{
		type:Boolean,
		default:false
	},
    'menuImgClass':String,
	'rule':String,
	'updatedAt':Date,
	'title':String,
	'key':String,
	'parentKey':String,
	'child':Array
})
module.exports = mongoose.model('Permissions',permissionsSchema)
