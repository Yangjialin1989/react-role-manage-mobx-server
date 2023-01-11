


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




var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');
var usersRouter = require('./routes/users');
var infosRouter = require('./routes/infos');
var captchaRouter = require('./routes/captcha');
var gridsRouter = require('./routes/grids');
var app = express();
app.use(cors())
//core
// app.all('*',function(req,res,next){
//   res.header('Access-Control-Allow-Origin','*');
//   res.header('Access-Control-Allow-Headers','X-Requested-With,token,Content-Type');
//   res.header('Access-Control-Allow-Methods','PUT,POST,GET,DELETE,OPTIONS');
//   res.header('X-Powered-By','3.2.1')
//   res.header('Content-Type','application/json;charset=utf-8');
//   next()
// })

//app.use(cors())
// 解析token获取用户信息
app.use(function (req, res, next) {
  var token = req.headers['authorization']
  if (token === undefined) {
    return next()
  } else {
    verToken(token)
        .then((data) => {
          console.log(data)
          req.data = data
          return next()
        })
        .catch((error) => {
          return next()
        })
  }
})
//验证token是否过期并规定哪些路由不用验证
app.use(
    expressjwt({
      secret: singKey, // 密匙
      algorithms: ['HS256'],
    }).unless({
      path: ['/users/login','/users/userlist'], //除了这个地址，其他的URL都需要验证
    })
)


//app.use(expressjwt({ secret:secretKEY, algorithms: ["HS256"] }).unless({path: ["/users/userlist","/users/login"] })) //使用express-jwt这个中间件 排除路径为api/login
// app.use(function(err,req,res,next){
//   let token = ('app',req.headers.authorization)
//   console.log('app',token)
//   const result = expressjwt.verify(token,secretKEY,(err,decoded)=>{
//     if(err){
//       if(err.name === 'TokenExpriedError'){
//         return console.log('token过期')
//       }else if(err.name === 'JsonWebTokenError'){
//         return console.log('无效的token')
//       }else{
//         return console.log(decoded);
//       }
//
//     }
//   })
//
//   console.log('jwt',result)
//   next();
// })

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users',usersRouter);
app.use('/infos',infosRouter);
app.use('/admin',adminRouter);
app.use('/grids',gridsRouter);

//验证码
app.use('/captcha',captchaRouter);
// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });
//
//
//
//
// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });
//   捕获错误的路由需要放在所有路由的后面
// app.use((err, req, res, next)=> {
//   console.log(err)
//   if(err.name === "JsonWebTokenError"){
//     res.status(401).send("无效的token...");
//   }else {
//     next(err);
//   }
// });

// 错误处理
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}
    // render the error page
    res.status(err.status || 500)
    console.log(err)

    if (err.status == 401) {
        res.send({data:'401'})

    } else if (err.status == 404) {
        res.send({data:'404'})
    } else {
        res.send({code: err.status, data: {}, msg: err.status})
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
