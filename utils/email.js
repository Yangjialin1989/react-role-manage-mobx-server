//email.js
// 引入 nodemailer
var nodemailer = require('nodemailer');
// 创建一个SMTP客户端配置
var config = {
  host: 'smtp.qq.com',
  port: 465,
  auth: {
    user: '729850713@qq.com', //刚才注册的邮箱账号
    pass: 'qyvqxkvtmgnqbgaj' //邮箱的授权码，不是注册时的密码
  }
};
// 创建一个SMTP客户端对象
var Transporter = nodemailer.createTransport(config);
// 发送邮件
module.exports = function (mail,msg){

  options = {
    from:'729850713@qq.com',
    to:mail,
    subject:'欢迎！',
    html:`<div><h1>欢迎${msg}，注册后台管理系统！</h1></div>`
  }
  Transporter.sendMail(options, function(error, info){
    if(error) {
      return console.log(error);
    }
    console.log('mail sent:', info.response);
  });
};