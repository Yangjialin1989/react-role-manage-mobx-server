var mongoose = require('mongoose')
var Schema = mongoose.Schema
var dieInfosSchema = new Schema({
	'register':String,
	'uper':String,
	'downer':String,
	'content':String,
	'address':String,
	"recorder":String,
	'date':Date,
	'comment':String


})
module.exports = mongoose.model('DieInfos',dieInfosSchema)
