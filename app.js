


var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
var logger = require('morgan');
const {expressjwt} = require('express-jwt')
//const expressJwt = require('express-jwt')
const jwt = require("jsonwebtoken") // 导入jwt
//Initialize the storage engine
const secretKEY = 'lsjifjd23ds0' //秘钥
const cors = require('cors')
var { verToken, singKey } = require('./utils/token')
const io = require('nodejs-websocket')


var indexRouter = require('./routes/index');
var adminsRouter = require('./routes/admins');
var usersRouter = require('./routes/users');
var infosRouter = require('./routes/infos');
var captchaRouter = require('./routes/captcha');
var gridsRouter = require('./routes/grids');
var socketsRouter = require('./routes/sockets');
var rolesRouter = require('./routes/roles');
var permissionsRouter = require('./routes/permissions');
var app = express();
app.use('/static',express.static(path.join(__dirname, 'public')));



//验证token是否过期并规定哪些路由不用验证
app.use(
    expressjwt({
        secret: singKey, // 密匙
        algorithms: ['HS256'],
    }).unless({
        //path: ['/users/login','/public'],
        //除了这个地址，其他的URL都需要验证
        //path: ['/users/login'], //除了这个地址，其他的URL都需要验证
        //path:[/^\/unauth\//,'/users/login']
        path:[/^\/unauth\//,'/users/login','/admins/login']
        //上面api表示，所有路由特别加unauth的不需要验证
    })
)




// view engine setup
//
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//app.use(express.static('public'));
//app.use('/public',express.static(path.join(__dirname,'Users/Administrator/WebstormProjects/20221217-react-redux/role-manage-mobx-server/public')));
//app.use(express.static('public'));
app.use('/', indexRouter);
app.use('/users',usersRouter);
app.use('/infos',infosRouter);
app.use('/admins',adminsRouter);
app.use('/grids',gridsRouter);
app.use('/unauth/sockets',socketsRouter);
app.use('/roles',rolesRouter);
app.use('/permissions',permissionsRouter);

//验证码
app.use('/captcha',captchaRouter);

// 错误处理
// app.use(function (err, req, res, next) {
//     // set locals, only providing error in development
//     res.locals.message = err.message
//     res.locals.error = req.app.get('env') === 'development' ? err : {}
//     // render the error page
//     res.status(err.status || 500)
//     console.log(err)
//
//     if (err.status == 401) {
//         res.send({data:'401'})
//
//     } else if (err.status == 404) {
//         res.send({data:'404'})
//     } else {
//         res.send({code: err.status, data: {}, msg: err.status})
//     }
//
// })
//解析token获取用户信息
app.use(function (req, res, next) {
    var token = req.headers['authorization']
    if (token === undefined) {
        return next()
    } else {
        verToken(token)
            .then((data) => {
                let expTime = data.exp
                let nowTime = Date.parse(new Date())/1000
                console.log('token过期时间exp：',expTime,new Date(expTime*1000))
                console.log('当前时间nowt',nowTime,new Date())
                console.log('refresh_token还有',expTime-nowTime,'s过期'  )
                let difference = expTime - nowTime;
                //res.cookie('exp',10)

                // token过期0时间exp：         1673536464
                // 当前时间nowt 1673536345798 1673536346
                res.cookie('difference',difference)
                //req.data = data.iat
                return next()
            })
            .catch((error) => {
                console.log('verToken err',error)
                return next()
            })
    }
})



var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;

db.on('error',console.error.bind(console,'connection error'));
db.once('open',()=>{
  console.log('serve is running')

})

//redis


module.exports = app;
