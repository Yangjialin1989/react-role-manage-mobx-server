var mongoose = require('mongoose')
var Schema = mongoose.Schema
var graceInfosSchema = new Schema({
	'benefactor':String,
	'gender':String,
	'content':String,
	'address':String,
	'recorder':String,
	'date':Date,
	'comment':String


})
module.exports = mongoose.model('GraceInfos',graceInfosSchema)
