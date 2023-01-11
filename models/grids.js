var mongoose = require('mongoose')
var Schema = mongoose.Schema
var gridsSchema = new Schema({
	caption: {
		required: true,
		type: String,
	},
	filename: {
		required: true,
		type: String,
	},
	fileId: {
		required: true,
		type: String,
	},
	createdAt: {
		default: Date.now(),
		type: Date,
	},
})
module.exports = mongoose.model('grids',gridsSchema)
