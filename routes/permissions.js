var express = require('express');
var router = express.Router();
var Users = require('../models/users');
var Permissions = require('../models/permissions');
var Roles = require('../models/roles');


//1角色存储
router.post('/save',function(req,res,next){
    console.log(req.body)

    const permissions = req.body
    const permission = new Permissions(permissions)
     permission.save().then((result)=>{
        console.log("存储权限成功!")
        res.json({
            code: 200,
            msg:'权限存储成功！',
            data:result
        })
    }).catch(error=>{
        res.json({
            code:101,
            msg:error
        })
     })

})
//2权限列表
router.post('/list',function(req,res,next){
    //let param = {}
    //let param1 = {limit:req.body.limit*16}
    //console.log(param1)
    Permissions.find({deletedAt:null},function(err,result){
        //console.log(result)
        if(err){
            res.json({
                code:104,
                msg:'数据获取失败！',
                data:''
            })
        }
        res.json({
            code: 200,
            msg:'权限列表获取成功！',
            data:result
        })

    })

})


//3权限查询
router.post('/search', function(req, res, next) {
    console.log(req.body)

    if(req.body.title === ''){

        Permissions.find({deletedAt:null},function(err,doc){
            if(!doc){
                res.json({
                    code:300,
                    msg:'没有查询到',
                    data:[]
                })
            }
            if(doc){
                res.json({
                    code:102,
                    msg:'查询到了',
                    data:[doc]
                })
            }

        })
    }else{
        let param = req.body
        Permissions.findOne(param,function(err,doc){
            if(!doc){
                res.json({
                    code:300,
                    msg:'没有查询到',
                    data:[]
                })
            }
            if(doc){
                res.json({
                    code:102,
                    msg:'查询到了',
                    data:[doc]
                })
            }

        })
    }

});
//4权限删除
router.post('/delete',function(req,res,next){
    let param = {_id:req.body._id};
    //console.log(req.body)
    //console.log(param)
    let data = req.body
    Permissions.findOne(param,function(err,doc){
        console.log(doc)
        Permissions.update(param,data).then((result)=>{
            res.json({
                status:200,
                msg:'权限删除成功！',
                res:doc
            })
        })
    })



})
//5角色更新
router.post('/update',function(req,res,next){
    let param = {_id:req.body._id}
    let params = {id:req.body.id}
    console.log(param)
    let data = req.body
    //delete data._id;
    console.log(data)
    Permissions.findOne(param,function(err,doc){
        //console.log('doc',doc)
        if(doc){
            Permissions.updateOne(param,data).then((result)=>{
                console.log(doc)
                res.json({
                    status:700,
                    msg:"原数据更新成功！",
                    data:doc
                })
            })
        }
    })
})
//6.多个查询
router.post('/findmany',function(req,res,next){
    console.log(req.body)
    Permissions.find({key:{$in:[...req.body]}},function(err,doc){
        console.log(doc)
        if(doc){
            res.json({
                status:200,
                msg:'查询成功',
                res:doc
            })
        }
    })
})


module.exports = router;
