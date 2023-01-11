//encapsulation-redis.js文件

const redis = require('redis')// Version 4.0.6
class Redis{
    constructor() {
        this.client = redis.createClient()
        this.client.on('error', err => {
            console.log(err)
        })
    }
    //建立链接
    async connect() {
        await this.client.connect('6379','localhost',{})
    }
    qiut() {
        //断开链接
        this.client.quit()
    }
    //添加数据
    async set(key, value, time) {
        //判断value值是否是对象类型
        if (typeof value === 'object') {
            value = JSON.stringify(value)
        }
        //time为过期时间，可选
        time ? await this.client.set(key, value, {
            EX: time,
            NX: true
        }) : await this.client.set(key, value)
    }
    //获取数据
    async get(key) {
        return new Promise((resolve, reject) => {
            const data = this.client.get(key)
            if (data) {
                resolve(data)
            } else {
                reject(false)
            }
        })
    }
    //删除数据
    async delete(key) {
        await this.client.del(key)
    }
}

module.exports = new Redis()