var mongoose = require('mongoose')
var Schema = mongoose.Schema
var permissionsSchema = new Schema({
	'apiPath':String,
	'id':Number,
	'method':String,
	'path':String,
	'parentId':Number,
	'createdAt':Date,
	'dataedAt':Date,
	'isMenu':Number,
	'rule':String,
	'updatedAt':Date,
	'title':String,
	'key':String,
	'child':Array
})
module.exports = mongoose.model('Permissions',permissionsSchema)
