var express = require('express');
var router = express.Router();
var Users = require('../models/users');
var Admins = require('../models/admins');
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
const Images = require("../models/images");
const fs = require("fs");
const multer = require("multer");
var path = require('path');


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




///////////////////管理员管理///////////////////////////////////////

//1.登录
router.post('/login',async (req,res,next)=> {
    const payload = 'sjwoeodlf sldfjsldjfsd'
    const exp = 7200;
    const token = await setToken(payload,exp)
    const refresh_token = await setToken(payload,exp*10)

    //const token = jwt.sign({name: req.body.name}, secretKEY, {expiresIn: "60s"})
    //const token = jwt.sign({name: req.body.name}, secretKEY, {expiresIn: "60s"})
    let param = req.body
    var userInfo = {
        id: 7,
        name: req.body.name,
        avatar: 'static/image1.jpeg',
        RoleId: 1
    }

    var permissionInfo = [
        {
            apiPath:'/user',
            createdAt:'2021-04-09 12:33:15',
            dataedAt:'',
            id:11,
            isMenu:0,
            method:'POST',
            parentId:0,
            path:'user',
            rule:'',
            title:'用户管理',
            updatedAt:'2021-04-09 12:33:33',
            child:[
                {
                    apiPath:'/user/userlist',
                    createdAt:'2021-04-09 12:33:15',
                    dataedAt:'',
                    id:111,
                    isMenu:0,
                    method:'POST',
                    parentId:11,
                    path:'userlist',
                    rule:'',
                    title:'用户列表',
                    updatedAt:'2021-04-09 12:33:33',
                    child:[]
                },
                {
                    apiPath:'/user/useredit',
                    createdAt:'2021-04-09 12:33:15',
                    dataedAt:'',
                    id:112,
                    isMenu:0,
                    method:'POST',
                    parentId:11,
                    path:'useredit',
                    rule:'',
                    title:'用户修改',
                    updatedAt:'2021-04-09 12:33:33',
                    child:[]
                },
                {
                    apiPath:'/user',
                    createdAt:'2021-04-09 12:33:15',
                    dataedAt:'',
                    id:113,
                    isMenu:0,
                    method:'POST',
                    parentId:11,
                    path:'userdelete',
                    rule:'',
                    title:'用户删除',
                    updatedAt:'2021-04-09 12:33:33',
                    child:[]
                }
            ]
        },

        {
            apiPath:'/role',
            createdAt:'2021-04-09 12:33:15',
            dataedAt:'',
            id:22,
            isMenu:1,
            method:'POST',
            parentId:0,
            path:'role',
            rule:'',
            title:'权限管理',
            updatedAt:'2021-04-09 12:33:33',
            child:[
                {
                    apiPath:'/role/rolelist/:roleId',
                    createdAt:'2021-04-09 12:33:15',
                    dataedAt:'',
                    id:221,
                    isMenu:0,
                    method:'POST',
                    parentId:22,
                    path:'rolelist',
                    rule:'',
                    title:'权限列表',
                    updatedAt:'2021-04-09 12:33:33',
                    child:[]
                },
                {
                    apiPath:'/role/roleedit/:roleId',
                    createdAt:'2021-04-09 12:33:15',
                    dataedAt:'',
                    id:222,
                    isMenu:0,
                    method:'POST',
                    parentId:22,
                    path:'roleedit',
                    rule:'',
                    title:'权限修改',
                    updatedAt:'2021-04-09 12:33:33',
                    child:[]
                },
                {
                    apiPath:'/role/roledelete/:roleId',
                    createdAt:'2021-04-09 12:33:15',
                    dataedAt:'',
                    id:223,
                    isMenu:0,
                    method:'POST',
                    parentId:22,
                    path:'roledelete',
                    rule:'',
                    title:'权限删除',
                    updatedAt:'2021-04-09 12:33:33',
                    child:[]
                }
            ]
        },

        {
            apiPath:'/roler',
            createdAt:'2021-04-09 12:33:15',
            dataedAt:'',
            id:33,
            isMenu:1,
            method:'POST',
            parentId:0,
            path:'rolerlist',
            rule:'',
            title:'角色管理',
            updatedAt:'2021-04-09 12:33:33',
            child:[
                {
                    apiPath:'/roler/rolerlist/:roleId',
                    createdAt:'2021-04-09 12:33:15',
                    dataedAt:'',
                    id:331,
                    isMenu:0,
                    method:'POST',
                    parentId:33,
                    path:'rolerlist',
                    rule:'',
                    title:'角色列表',
                    updatedAt:'2021-04-09 12:33:33',
                    child:[]
                },
                {
                    apiPath:'/roler/roleredit/:roleId',
                    createdAt:'2021-04-09 12:33:15',
                    dataedAt:'',
                    id:332,
                    isMenu:0,
                    method:'POST',
                    parentId:33,
                    path:'roleredit',
                    rule:'',
                    title:'角色修改',
                    updatedAt:'2021-04-09 12:33:33',
                    child:[]
                },
                {
                    apiPath:'/roler/rolerdelete/:roleId',
                    createdAt:'2021-04-09 12:33:15',
                    dataedAt:'',
                    id:333,
                    isMenu:0,
                    method:'POST',
                    parentId:33,
                    path:'rolerdelete',
                    rule:'',
                    title:'角色删除',
                    updatedAt:'2021-04-09 12:33:33',
                    child:[]
                }
            ]
        }

    ]

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
            meta:{
                superAdmin:true
            },
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
    },
        {
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
    },{
            menuId: 4,
            menuName: '权限管理',
            menuUrl: 'index/permission',
            pathRoute: 'permission',
            componentPath: 'permission/PermissionManger',
            menuImgClass: 'SolutionOutlined',
            pId: 0,
            menuState: '0',
            isContainChildren: false,
            menuChilds: [{
                menuId:10,
                menuName: '权限列表',
                menuUrl: 'permission/permissionlist',
                pathRoute: 'permissionlist',
                componentPath: 'permission/PermissionList',
                menuImgClass: 'InsertRowAboveOutlined',
                pId: 2,
                menuState: '0',
                isContainChildren: false,
                meta:{
                    superAdmin:true
                },
                menuChilds: []
            }]
        },{
            menuId: 5,
            menuName: '管理员管理',
            menuUrl: 'index/admin',
            pathRoute: 'admin',
            componentPath: 'admin/AdminManger',
            menuImgClass: 'TeamOutlined',
            pId: 0,
            menuState: '0',
            isContainChildren: false,
            menuChilds: [{
                menuId:11,
                menuName: '管理员列表',
                menuUrl: 'admin/adminlist',
                pathRoute: 'adminlist',
                componentPath: 'admin/AdminList',
                menuImgClass: 'InsertRowAboveOutlined',
                pId: 2,
                menuState: '0',
                isContainChildren: false,
                meta:{
                    superAdmin:true
                },
                menuChilds: []
            }]
        }

    ]


    Admins.findOne(param,function(err,doc){
        if(doc !==null){
            console.log(doc)
            res.send({
                code: 200,
                msg: '登录成功',
                token,
                refresh_token,
                remember: true,
                data: {
                    userInfo:{
                        id:doc.id,
                        lang:doc.lang,
                        sex:doc.sex,
                        profile:doc.profile,
                        email:doc.email,
                        name:doc.name,
                        avatar:doc.avatar,
                        roleName:doc.roleName
                    },
                   // menuInfo,
                    menuInfo:doc.menuList,
                    //permissionInfo
                }
            })
        }else{
                res.json({
                    code: 100,
                    msg: '用户不存在，请注册或重新核对信息。',
                    token: null,
                    remember: false
                })
        }
    })


    // var admins = await Admins.findOne(param);
    // if (!admins) {
    //     return res.json({
    //         code: 100,
    //         msg: '用户不存在，请注册或重新核对信息。',
    //         token: null,
    //         remember: false
    //     })
    // }
    // return res.send({
    //     code: 200,
    //     msg: '登录成功',
    //     token,
    //     refresh_token,
    //     remember: true,
    //     data: {
    //         userInfo,
    //         menuInfo,
    //         permissionInfo
    //     }
    // })
})
//2.注册
router.post('/register',function(req,res,next){
    console.log(req.body)
    const admins = req.body
    const admin = new Admins(admins)
     admin.save().then((result)=>{
        console.log("存储数据成功!")
        res.json({
            code: 200,
            msg:'注册成功！',
            email:req.body.email,
            name:req.body.name
        })
    }).catch(error=>{
        res.json({
            code:101,
            msg:error
        })
     })

})
//3.获取数据
router.post('/list',function(req,res,next){
    //console.log('userlist',req.headers.authorization)
    console.log(req.body)
        //,{id:1,name:1,email0000:1,telephone:1}
    let param1 = {limit:req.body.limit*16}
    console.log(param1)
    Admins.find({deletedAt:null},{},param1,function(err,result){
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
//4.搜索
router.post('/search', function(req, res, next) {
    console.log(req.body)

    if(req.body.name === ''){

        Admins.find({},{id:1,name:1,password:1,profile:1,avatar:1,sex:1,role_id:1,roleName:1,email:1,telephone:1,_id:0},function(err,doc){
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
        Admins.findOne(param,{id:1,name:1,password:1,profile:1,avatar:1,sex:1,role_id:1,roleName:1,email:1,telephone:1,_id:0},function(err,doc){
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

//5.删除
router.post('/delete',function(req,res,next){
    let param = {id:req.body.id};
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
    Admins.findOne(param,function(err,doc){
        Admins.update(param,data).then((result)=>{
            res.json({
                status:200,
                msg:'管理员删除成功！',
                res:doc
            })
        })
    })



})
//6.更新编辑
router.post('/update',function(req,res,next){
    let param = {id:req.body.id};
    let data = req.body
    let param1 = {name:req.body.name}
            Admins.findOne(param,function(err,doc){
                if(doc){
                    Admins.update(param,data).then((result)=>{

                        res.json({
                            status:700,
                            msg:"原数据更新成功！",

                            res:doc
                        })
                    })
                }else{
                    res.json({
                        status:107,
                        msg:'失败。'
                    })
                }
            })




})
//7.管理员名称验证
router.post('/valid', function(req, res, next) {
    let param = {
        name:req.body.name
    }
    console.log(param)
    Users.findOne(param,function(err,doc){
        console.log(doc)
        if(doc===null){
            res.json({
                code:300,
                msg:'该名称可以注册!'
            })
        }
        if(doc){
            console.log(doc)
            res.json({
                code:102,
                msg:'该名称已存在,请更换!'
            })
        }
    })
});
//8.上传头像、修改头像
///////////////图片上传//////////////////////////////////////
// 创建存放头像图片的目录(当头像目录不存在时)
fs.readdir(__dirname + "/images/", function (err, files) {
    if (err) {
        fs.mkdir(__dirname + "/images/", function (err) {
            if (err) {
                console.log(err)
            }
            console.log("目录创建成功。");
        })
    }
})
// 设置图片存储路径
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        //cb(null,path.join(__dirname ,'../public/images/'))// ../uploads是将存放图片文件夹创建在node项目平级，./uploads会存放在node项目根目录下，需要提前建好文件夹，否则会报错
        cb(null,'public/images')// ../uploads是将存放图片文件夹创建在node项目平级，./uploads会存放在node项目根目录下，需要提前建好文件夹，否则会报错
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`) // 文件名
    }
})
//文件上传限制
const limits = {
    fields: 10,//非文件字段的数量
    fileSize: 20000 * 1024,//文件大小 单位 b
    files: 10//文件数量
}
// 添加配置文件到muler对象。
var upload = multer({ storage: storage });
//获取数据
router.post('/avatar',upload.single('avatar'),async (ctx,res)=>{
    // 当前接口允许跨域
    //console.log(ctx.body)
    //console.log(ctx.headers)
    let {filledname,originalname,encoding,mimetype,distination,filename,path,size} = ctx.file;
    const images = ctx.file
    console.log(images)
    let url = ctx.file.destination.replace(/public/,'static')
    let avatar = `${url}/${ctx.file.filename}`
    let param = {_id:ctx.headers.id};
    console.log(param)
    let data = {'avatar':avatar};
    Admins.findOne(param,function(err,doc){

                console.log(doc.avatar)
               let deleteUrl = doc.avatar.replace(/static/,'public');
                fs.unlink( deleteUrl,(err)=>{
                    if(err) throw err;
                    console.log('文件已删除')
                })

       // console.log(doc)
        if(doc){
            Admins.update(param, {avatar:avatar},{new:true}).then((result)=>{
                //console.log(result)
                res.json({
                    status:700,
                    msg:"原数据更新成功！",
                    //res:doc
                })
            })
        }else{
            res.json({
                status:107,
                msg:'失败。'
            })
        }
    })
});
//refresh_token
router.post('/refreshtoken',async function(req,res,next){
    var reftoken = req.headers['authorization']
    console.log('ref',reftoken)
    if (reftoken === undefined) {
        return next()
    } else {

        verToken(reftoken).then(async (data) => {
            console.log('refreshtoken :', data)
            const payload = 'sjwoeodlf sldfjsldjfsd'
            const exp = 120;
            const token = await setToken(payload, exp)
            res.cookie('exp',data.exp)
            res.json({
                code: 200,
                token
            })
            next()
        }).catch(error => {
            // console.log(error)
            // res.json({
            //     code:100,
            //     msg:'refresh_token过期了'
            // })
            next()

        })

    }
})


//////////////////////////////////////////////////////////////////////////////////////////////////////




//角色存储
router.post('/userps',function(req,res,next){
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
router.post('/userpl',function(req,res,next){
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
router.post('/sendemail',function(req,res,next){
    Transporter(req.body.email,req.body.name)
})
//refresh_token
router.post('/refreshtoken',async function(req,res,next){
    var reftoken = req.headers['authorization']
    console.log('ref',reftoken)
    if (reftoken === undefined) {
        return next()
    } else {

        verToken(reftoken).then(async (data) => {
            console.log('refreshtoken :', data)
            const payload = 'sjwoeodlf sldfjsldjfsd'
            const exp = 120;
            const token = await setToken(payload, exp)
            res.cookie('exp',data.exp)
            res.json({
                code: 200,
                token
            })
            next()
        }).catch(error => {
            // console.log(error)
            // res.json({
            //     code:100,
            //     msg:'refresh_token过期了'
            // })
            next()

        })

    }
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
//角色查询
router.post('/userpf', function(req, res, next) {
    console.log(req.body)

    if(req.body.roleName === ''){

        Roles.find({},function(err,doc){
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
                res.json({
                    code:102,
                    msg:'查询到了',
                    data:[doc]
                })
            }

        })
    }

});
//角色删除
router.post('/userpd',function(req,res,next){
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
router.post('/userpu',function(req,res,next){
    let param = {_id:req.body._id};
    console.log(req.body)
    let data = req.body
    Roles.findOne(param,function(err,doc){
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
