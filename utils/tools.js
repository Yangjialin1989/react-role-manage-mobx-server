const SvgCaptcha = require('svg-captcha');

/**
 * 工具封装
 */
class Tools {

    //返回SVG图片验证码
    getCaptcha() {
        const captcha = SvgCaptcha.create({
            size: 4,
            ignoreCharsL: 'o01i',
            noise: 1,
            color: true,
            background:  '#cc9966'
        });

        return captcha;
    }
}