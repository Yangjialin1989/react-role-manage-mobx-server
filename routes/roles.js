var express = require('express');
var router = express.Router();
var Users = require('../models/users');
var Permissions = require('../models/permissions');
var Roles = require('../models/roles');
/* GET users listing. */
const redis = require('../utils/redis');
// 引入 nodemailer
var nodemailer = require('nodemailer');
const jwt = require("jsonwebtoken") // 导入jwt
const Transporter = require('../utils/email');
const GraceInfos = require("../models/graceInfos");
const secretKEY =  'lsjifjd23ds0' //秘钥
const {expressjwt} = require('express-jwt')
var {setToken,verToken} = require('../utils/token')


//获取数据
router.post('/userplist',function(req,res,next){

    let param = {}
    Permissions.find({},function(err,result){

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
            msg:'数据获取成功！',
            data:result
        })

    })

})


//角色存储
router.post('/save',function(req,res,next){
    console.log(req.body)

    const roles = req.body
    const role = new Roles(roles)
     role.save().then((result)=>{
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
//角色列表
router.post('/list',function(req,res,next){
    let param = {}
    let param1 = {limit:req.body.limit*16}
    console.log(param1)
    Roles.find({deletedAt:null},function(err,result){
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


//角色查询
router.post('/search', function(req, res, next) {
    console.log(req.body)

    if(req.body.roleName === ''){
        console.log('jinlail')
        Roles.find({deletedAt:null},function(err,doc){
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
        Roles.findOne(param,function(err,doc){
            if(!doc){
                res.json({
                    code:300,
                    msg:'没有查询到',
                    data:[]
                })
            }
            if(doc){
                console.log(doc)
                res.json({
                    code:102,
                    msg:'查询到了',
                    data:doc
                })
            }

        })
    }

});
//角色删除
router.post('/delete',function(req,res,next){
    let param = {_id:req.body._id};
    console.log(req.body)
    console.log(param)
    let data = req.body
    // Roles.deleteOne(param,function(err,doc){
    //     if(err){
    //         return res.json({
    //             code:-1,
    //             msg:'数据删除失败！'+err
    //         })
    //     }
    //     if(doc){
    //         res.json({
    //             code:0,
    //             msg:'数据删除成功！'
    //         })
    //     }
    // })
    Roles.findOne(param,function(err,doc){
        Roles.update(param,data).then((result)=>{
            res.json({
                status:200,
                msg:'角色删除成功！',
                res:doc
            })
        })
    })



})
//角色更新
router.post('/update',function(req,res,next){
    let param = {_id:req.body._id};
    console.log(param)
    console.log(req.body)
    let data = req.body
    Roles.findOne(param,function(err,doc){
        console.log(doc)
        if(doc){
            Roles.update(param,data).then((result)=>{
                console.log(doc)
                res.json({
                    status:700,
                    msg:"原数据更新成功！",
                    res:doc
                })
            })
        }
    })
})


module.exports = router;
