# Template Node Egg

基于 Egg.js 的后端脚手架。


## 快速开始

**注意：因为隐私问题，项目的邮箱的账号和授权码采取了从服务器的环境变量中读取，如果需要可以在config.prod.js中自行配制对应的环境变量**

- `user: process.env.ApiKnight_EMAIL_ACCESS_KEY, // 发件人的 QQ 邮箱`
- `pass: process.env.ApiKnight_EMAIL_KEY// 邮箱授权码，不是登录密码`

```bash
# 安装
yarn install

# 启动开发
yarn run dev

# 生产环境启动
yarn run start

# 生产环境停止
yarn run stop
```


## License

[MIT](/LICENSE)
# ApiKnightBack
HTTP 接口管理平台的后台
>>>>>>> origin/leedev