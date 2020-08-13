const koa = require('koa')
const router = require('koa-router')()
const bodyParser = require('koa-bodyparser')
const jwt = require("jsonwebtoken");
const static = require('koa-static')
const app = new koa()

app.use(bodyParser())
app.use(static(__dirname + '/'));

const secret = "it's a secret";

router.post("/login", async ctx => {
  const { body } = ctx.request;
  const userinfo = body.username;
  ctx.body = {
    message: "登录成功",
    user: userinfo,
    token: jwt.sign(
      {
        data: userinfo,
        exp: Math.floor(Date.now() / 1000) + 60 * 60
      },
      secret
    )
  };
});

app.use(router.routes());
app.use(router.allowedMethods());
app.listen(3000)