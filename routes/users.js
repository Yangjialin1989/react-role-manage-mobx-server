var express = require('express');
var router = express.Router();
var Users = require('../models/users');
/* GET users listing. */
const redis = require('../utils/redis');
// 引入 nodemailer
var nodemailer = require('nodemailer');
const jwt = require("jsonwebtoken") // 导入jwt
const Transporter = require('../utils/email');
const GraceInfos = require("../models/graceInfos");
const secretKEY =  'lsjifjd23ds0' //秘钥
const {expressjwt} = require('express-jwt')
var {setToken} = require('../utils/token')
router.post('/validUsername', function(req, res, next) {
    let param = {
        name:req.body.username
    }
    console.log(param)
    Users.findOne(param,function(err,doc){
        if(!doc){
            res.json({
                code:300,
                msg:'该用户名可以注册!'
            })
        }
        if(doc){
            res.json({
                code:102,
                msg:'用户名已存在,请更换!'
            })
        }
    })
});

router.post('/login',async (req,res,next)=> {

    const token = await setToken('hhh')
    //const token = jwt.sign({name: req.body.name}, secretKEY, {expiresIn: "60s"})
    console.log(token)
    let param = req.body
    var userInfo = {
        id: 7,
        name: 'hhh',
        userHeader: 'Cat.png',
        RoleId: 1
    }

    var menuInfo = [{
        menuId: 1,
        menuName: '欢迎',
        menuUrl: 'welecome',
        pathRoute: 'welecome',
        componentPath: 'welecome/Welecome',
        menuImgClass: 'SmileOutlined',
        pId: 0,
        menuState: '0',
        isContainChildren: false,
        menuChilds: []
    }, {
        menuId: 2,
        menuName: '用户管理',
        menuUrl: 'index/user',
        pathRoute: 'user',
        componentPath: 'user/UserManger',
        menuImgClass: 'TeamOutlined',
        pId: 0,
        menuState: '0',
        isContainChildren: false,
        menuChilds: [{
            menuId: 10,
            menuName: '用户列表',
            menuUrl: 'user/userlist',
            pathRoute: 'userlist',
            componentPath: 'user/UserList',
            menuImgClass: 'InsertRowAboveOutlined',
            pId: 2,
            menuState: '0',
            isContainChildren: false,
            menuChilds: []
        }, {
            menuId: 11,
            menuName: '修改用户',
            menuUrl: 'user/edituser',
            pathRoute: 'edituser',
            componentPath: 'user/EditUser',
            menuImgClass: 'UserSwitchOutlined',
            pId: 2,
            menuState: '0',
            isContainChildren: false,
            menuChilds: []
        }]
    }, {
        menuId: 3,
        menuName: '角色管理',
        menuUrl: 'index/role',
        pathRoute: 'role',
        componentPath: 'role/RoleManger',
        menuImgClass: 'IdcardOutlined',
        pId: 0,
        menuState: '0',
        isContainChildren: true,
        menuChilds: [{
            menuId: 7,
            menuName: '添加角色',
            menuUrl: 'role/addrole',
            pathRoute: 'addrole',
            componentPath: 'role/AddRole',
            menuImgClass: 'UserAddOutlined',
            pId: 2,
            menuState: '0',
            isContainChildren: false,
            menuChilds: []
        }, {
            menuId: 8,
            menuName: '角色详情',
            menuUrl: 'role/roleinfo',
            pathRoute: 'roleinfo',
            componentPath: 'role/RoleInfo',
            menuImgClass: 'SolutionOutlined',
            pId: 2,
            menuState: '0',
            isContainChildren: false,
            menuChilds: []
        }, {
            menuId: 9,
            menuName: '角色列表',
            menuUrl: 'role/rolelist',
            pathRoute: 'rolelist',
            componentPath: 'role/RoleList',
            menuImgClass: 'InsertRowAboveOutlined',
            pId: 2,
            menuState: '0',
            isContainChildren: false,
            menuChilds: []
        }]
    },

    ]

    var users = await Users.findOne(param);
    if (!users) {
        return res.json({
            code: 100,
            msg: '用户不存在，请注册',
            token: null,
            remember: false
        })
    }
    return res.send({
        code: 200,
        msg: '登录成功',
        token,
        remember: true,
        data: {
            userInfo: userInfo,
            menuInfo: menuInfo
        }
    })
})
//注册
router.post('/register',function(req,res,next){
    console.log(req.body)
    const users = req.body
    const user = new Users(users)
     user.save().then((result)=>{
        console.log("存储数据成功!")
        res.json({
            code: 200,
            msg:'注册成功！',
            email:req.body.email,
            name:req.body.name
        })
    })

})
router.post('/sendemail',function(req,res,next){
    Transporter(req.body.email,req.body.name)
})
//获取数据
router.post('/userlist',function(req,res,next){
    console.log('userlist',req.headers.authorization)

    let param = {}
    let param1 = {limit:req.body.limit*16}
    console.log(param1)
    Users.find({},{id:1,name:1,email:1,telephone:1},param1,function(err,result){
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
//删除数据
router.post('/deleteadmins',function(req,res,next){


    console.log('delete',req.headers.authorization)
    let param = req.body;

    Users.remove(param,function(err,doc){
        if(err){
            return res.json({
                code:-1,
                msg:'数据删除失败！'+err
            })
        }
        if(doc){
            res.json({
                code:0,
                msg:'数据删除成功！',
                data:req.auth
            })
        }
    })


})
//删除数据
router.post('/userdelete',function(req,res,next){
    let param = req.body;
    console.log(param)
    Users.deleteOne(param,function(err,doc){
        if(err){
            return res.json({
                code:-1,
                msg:'数据删除失败！'+err
            })
        }
        if(doc){
            res.json({
                code:0,
                msg:'数据删除成功！'
            })
        }
    })


})
//添加管理员
router.post('/addadmins',function(req,res,next){
    console.log(req.body)
    const users = req.body
    const user = new Users(users)
    user.save().then((result)=>{
        console.log("存储数据成功!")
        res.json({
            code: 200,
            msg:'添加成功！',
            email:req.body.email,
            name:req.body.name
        })
        //添加id

        Users.findOneAndUpdate(user)
    })
})

//更新已有的用户
router.post('/userupdate',function(req,res,next){
    let param = {id:req.body.id};
    let data = req.body
    Users.findOne(param,function(err,doc){
        if(doc){
            Users.update(param,data).then((result)=>{
                res.json({
                    status:700,
                    msg:"原数据更新成功！",
                    res:doc
                })
            })
        }
    })
})
router.post('/usersearch', function(req, res, next) {
    console.log(req.body)

    if(req.body.name === ''){

        Users.find({},{id:1,name:1,email:1,telephone:1,_id:0},function(err,doc){
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
        Users.findOne(param,{id:1,name:1,email:1,telephone:1,_id:0},function(err,doc){
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




module.exports = router;
