var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var GraceInfos = require('../models/graceInfos');
var DieInfos = require('../models/dieInfos');
/* GET users listing. */
router.get('/', function(req, res, next) {
	res.send('respond with a resource');
});


//红牌
//存储数据
router.post('/saveGraceInfos',function(req,res,next){
    console.log(req.body)
	const graceInfos = req.body
	const graceInfos1 = new GraceInfos(graceInfos)
	graceInfos1.save().then((result)=>{
		console.log("存储数据成功!")
		res.json({
			status: 0,
			result:result,
			msg:'数据存储成功！'
		})
	})
})
//获取数据
router.post('/getGraceInfos',function(req,res,next){
	let param = {}
	GraceInfos.find(param,function(err,result){
		if(err){
			res.send('查询失败');
		}
		res.send(result);

	})
})


//黄牌
//存储数据
router.post('/saveDieInfos',function(req,res,next){
	console.log('进来了。')
	console.log(req.body)
	const dieInfos = req.body
	const dieInfos1 = new DieInfos(dieInfos)
	dieInfos1.save().then((result)=>{
		console.log("存储数据成功!")
		res.json({
			status: 0,
			result:result
		})
	})
})
//获取数据
router.post('/getDieInfos',function(req,res,next){
	let param = {}
	DieInfos.find(param,function(err,result){
		if(err){
			res.send('查询失败');
		}
		res.send(result);

	})
})



/*获取数据
router.post('/getlists',function(req,res,next){
	//let param = {goods_attr:"08"},
	let param = {}
	Lists.findOne(param,function(err,doc){
		if(err) return console.log(err);
		
		if(doc){
			res.json({
				status:0,
				msg:'头像上传成功!',
				res:doc
			})
		}
	})
})
*/
// router.post('/getlists',function(req,res,next){
//
//
// //	let param = { goods_medicines_quality_guarantee_period: 3}
// 	Lists.find(function(err,doc){
// 		if(err) return console.log(err);
//
// 		if(doc){
//
//
// 			    res.json({
// 				status:0,
// 				msg:'头像上传成功!',
// 				res:doc
// 		     	})
//
// 				}
// })
// })
// //删除
// router.post('/DeteleLists',function(req,res,next){
// 	     let param = req.body;
//         console.log(param)
// 	Lists.remove(param,function(err,doc){
// 		if(err) return console.log(err);
//
// 		if(doc){
//
//
// 			    res.json({
// 				status:0,
// 				msg:'头像上传成功!',
// 				res:doc
// 		     	})
//
// 				}
// })
// })
// //更新
// router.post('/UpdateLists',function(req,res,next){
// 	let param = {_id:req.body._id};
// 	let data = req.body
// 	Lists.findOne(param,function(err,doc){
// 		if(doc){
// 			Lists.update(param,data).then((result)=>{
// 				res.json({
// 					status:700,
// 					msg:"原数据更新成功！",
// 					res:doc
// 				})
// 			})
// 		}
// 	})
// })
module.exports = router
