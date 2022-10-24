<template>
  <div class="login-container">
    <div class="mask" v-show="isshow">
      <div class="warning">
        <div class="title">{{ masktitle }}</div>
        <div class="clo_btn" @click="cancel">确定</div>
      </div>
    </div>

    <div class="mask1" v-show="isagree">
      <div class="warning">
        <div class="title">服务协议及隐私保护</div>
        <div class="con">
          为了更好地保障您的合法权益，请您阅读并同意以下协议<a href="javascript:;">《淘宝平台服务协议》</a> <a href="javascript:;">《隐私权政策》</a><a href="javascript:;">《支付宝及客户端服务协议》</a>
          ，未注册手机号将自动为您创建账号。
        </div>
        <div class="mask_btn">
          <button class="no" @click="isagree = !isagree">不同意</button>
          <button class="yes" @click="agree">同意</button>
        </div>
      </div>
    </div>
    <!-- 登录头部 -->
    <div class="top">
      <h1>淘宝账号登录</h1>
    </div>
    <!-- logo部分 -->
    <div class="logo">
      <img src="../../assets/img/taobao_logo.png" alt="" />
    </div>

    <div class="login-form dn">
      <form action="">
        <div class="tel acnum">
          <input type="text" placeholder="手机号/邮箱/账号名" class="usernum" v-model.trim="username" />
          <i></i>
        </div>
        <div class="psw">
          <input :type="ispassword ? 'text' : 'password'" placeholder="请输入登录密码" class="password" v-model.trim="password" />
          <i></i>
          <span class="eyes" @click="ispassword = !ispassword"></span>
        </div>
        <div class="switch">
          <a href="javascript:;">短信验证码登录</a>
        </div>
        <div class="btn">
          <button class="btn2" type="button" @click="loginBtn">登录</button>
        </div>
        <div class="agreement">
          <em :class="ischeck ? 'em_bg' : ''" @click="agreementCheck"></em>
          <p>已阅读并同意以下协议<a href="#">淘宝平台服务协议</a>、<a href="#">隐私权政策</a>、<a href="#">法律声明</a>、<a href="#">支付宝及客户端服务协议</a>，未注册手机号将自动为您创建账号。</p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      masktitle: '',
      isshow: false,
      isagree: false,
      ischeck: false,
      ispassword: false,
    }
  },
  methods: {
    loginBtn() {
      const pattern1 = /^1((34[0-8])|(8\d{2})|(([35][0-35-9]|4[579]|66|7[35678]|9[1389])\d{1}))\d{7}$/
      if (this.username === '') {
        this.masktitle = '请输入账号'
        this.isshow = true
      } else if (!pattern1.test(this.username)) {
        this.masktitle = '账号格式不正确，请重新输入'
        this.isshow = true
      } else {
        // 判断协议是否选中
        if (!this.ischeck) {
          this.isagree = true
        } else {
          // 判断密码锁是否正确
          const pattern2 = /^[a-zA-Z0-9_]{8,16}$/
          if (this.password === '') {
            this.masktitle = '请输入密码'
            this.isshow = true
          } else if (!pattern2.test(this.password)) {
            this.masktitle = '密码格式不正确，请重新输入'
            this.isshow = true
          } else {
            this.loginPost()
          }
        }
      }
    },
    cancel() {
      this.isshow = !this.isshow
      this.password = ''
    },
    agreementCheck() {
      this.ischeck = !this.ischeck
    },
    agree() {
      this.ischeck = !this.ischeck
      this.isagree = !this.isagree
    },
    async loginPost() {
      const {data: res} = await this.$http.post('/my/login', { username: this.username, password: this.password })
      console.log(res);
      if(res.status === 0) {
        this.masktitle = res.msg
        this.isshow = true
      }
      else {
        localStorage.setItem('token', res.token)
        this.$router.replace('/index')
      }
    },
  },
}
</script>

<style lang="less" scoped>
.login-container {
  width: 100%;
  height: 100%;

  // 登录页面头部
  .top {
    width: 100%;
    background-color: #f7f7f8;
    border-bottom: 1px solid #c8c8c8;
    text-align: center;

    h1 {
      line-height: 45px;
      font-size: 18px;
      font-weight: 400;
    }
  }

  // logo部分
  .logo {
    width: 100%;
    line-height: 91px;
    text-align: center;

    img {
      width: 135px;
    }
  }

  // form手机号登录部分
  .login-form {
    .tel input,
    .psw input {
      flex: 1;
      outline: none;
      border: none;
      font-size: 16px;
      line-height: 50px;
    }

    i {
      display: none;
      width: 16px;
      height: 16px;
      background: url(../../assets/img/close.png) no-repeat 0 0 / 100%;
      margin-right: 15px;
    }

    .tel {
      display: flex;
      align-items: center;
      width: 100%;
      background-color: #fff;
      border-bottom: 1px solid #c8c8c8;

      select {
        padding: 0 14px 0 10px;
        border: none;
        background: url(../../assets/img/top-bottom.png) no-repeat 90px center / 24px;
      }
    }

    .psw {
      display: flex;
      align-items: center;
      padding: 0 15px;
      width: 100%;
      background-color: #fff;
      border-bottom: 1px solid #c8c8c8;

      a {
        color: #fd6020;
        font-size: 16px;
        line-height: 50px;
      }

      span {
        width: 20px;
        height: 22px;
        background: url(../../assets/img/close_eye.png) no-repeat 0 0 / cover;
      }
    }

    .switch {
      display: flex;
      padding: 0 10px;
      margin: 15px 0 23px;

      a {
        margin: 0;
        font-size: 16px;
        color: #555;
      }
    }

    .btn {
      padding: 0 10px;

      button {
        width: 100%;
        line-height: 45px;
        background-color: #fd6020;
        border: none;
        border-radius: 5px;
        color: #fff;
        font-size: 16px;
      }
    }

    .agreement {
      margin-top: 30px;
      display: flex;
      text-align: center;

      em {
        display: block;
        width: 15px;
        height: 15px;
        margin-left: 2px;
        border: 2px solid #ccc;
        border-radius: 50%;
        transform: translateY(4px);
      }

      .em_bg {
        border: none;
        background: #ff5000 url(../../assets/img/checked.png) no-repeat 0 0 / cover;
      }

      p {
        flex: 1;
        color: #999;
        font-size: 14px;

        a {
          color: #fd6020;
        }
      }
    }

    .acnum {
      padding-left: 15px;
    }
  }

  .mask,
  .mask1 {
    position: fixed;
    top: 0;
    left: 0;
    // display: none;
    width: 100%;
    height: 100%;
    z-index: 999;
    background-color: rgba(0, 0, 0, 0.7);

    .warning {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 300px;
      text-align: center;
      background-color: #fff;
      border-radius: 8px;
      transform: translate(-50%, -50%);

      .title {
        padding: 20px;
      }

      .clo_btn {
        padding: 10px;
        color: #f40;
        border-top: 1px solid #ddd;
      }
    }
  }

  .mask1 {
    .warning {
      width: 320px;
      padding: 20px 16px;
      border-radius: 20px;

      .title {
        padding: 0;
      }

      .con {
        margin: 12px 0;
        text-align: left;
        font-size: 13px;
        color: #999;

        a {
          color: #111;
        }
      }

      .mask_btn {
        display: flex;
        justify-content: space-between;

        button {
          width: 138px;
          line-height: 40px;
          font-size: 16px;
          color: #ff5000;
          border: 1px solid #ff9000;
          background: none;
          border-radius: 21px;
        }

        button.yes {
          color: #fff;
          background-image: linear-gradient(90deg, #ff9000, #ff5000 98%);
        }
      }
    }
  }
}
</style>
