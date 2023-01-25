var mongoose =require('mongoose')
var Schema = mongoose.Schema
var imageSchema = new Schema({
	"fieldname"    : String,
	"originalname"  : String,
	"encoding"    : String,
	"mimetype" : String,
	"destination"   : String,
	"filename"      : String,
	"path"      : String,
	"size"      : Number,
})
module.exports = mongoose.model('Images',imageSchema)
