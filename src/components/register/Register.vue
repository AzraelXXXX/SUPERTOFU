<template>
  <div class="register-container">
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

    <div class="inner">
      <!-- 标题 -->
      <div class="title">
        <h1>手机号注册</h1>
        <p>亲，欢迎注册淘宝账号</p>
      </div>
      <!-- form -->
      <div class="register_form">
        <form action="">
          <div class="tel">
            <input type="text" placeholder="请输入你的手机号码" class="phone" v-model.trim="username" />
          </div>
          <div class="psw">
            <input type="password" placeholder="请输入密码" class="code" v-model.trim="password" />
          </div>
          <button type="button" class="btn" @click="registerBtn">注册</button>
          <div class="agreement">
            <em :class="ischeck ? 'em_bg' : ''" @click="agreementCheck"></em>
            <p>已阅读并同意以下协议<a href="#">淘宝平台服务协议</a>、<a href="#">隐私权政策</a>、<a href="#">法律声明</a>、<a href="#">支付宝及客户端服务协议</a></p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
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
    registerBtn() {
      const pattern1 = /^1((34[0-8])|(8\d{2})|(([35][0-35-9]|4[579]|66|7[35678]|9[1389])\d{1}))\d{7}$/
      if (this.username === '') {
        this.masktitle = '请输入手机号'
        this.isshow = true
      } else if (!pattern1.test(this.username)) {
        this.masktitle = '手机号格式不正确，请重新输入'
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
            console.log('ok');
            this.registerPost()
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
    async registerPost() {
      const {data: res} = await this.$http.post('/my/rej', { username: this.username, password: this.password })
      console.log(res);
      if(res.status === 0) {
        this.masktitle = res.msg
        this.isshow = true
      }
      else {
        this.$router.replace('/index')
      }
    },
  },
}
</script>

<style lang="less" scoped>
.register-container {
  width: 100%;
  .inner {
    padding-top: 65px;
    width: 320px;
    margin: 0 auto;
    .title {
      margin-bottom: 50px;
      h1 {
        font-size: 30px;
        font-weight: 400;
        color: #333;
      }
      p {
        margin-top: 12px;
        font-size: 16px;
        color: #999;
      }
    }

    // form部分
    .register_form {
      form {
        .tel,
        .psw {
          padding-left: 15px;
          margin-top: 12px;
          width: 100%;
          height: 48px;
          display: flex;
          align-items: center;
          border-bottom: 1px solid #ccc;
          input {
            flex: 1;
            color: #111;
            font-size: 16px;
            outline: none;
            border: none;
          }
          input::placeholder {
            color: rgb(187, 187, 187);
          }
        }
        .psw {
          a {
            font-size: 16px;
            color: #ff5000;
          }
        }
        button {
          margin-top: 80px;
          width: 100%;
          line-height: 45px;
          border-radius: 23px;
          border: none;
          font-size: 18px;
          color: #fff;
          background-image: linear-gradient(90deg, #f90, #ff5000);
          opacity: 0.5;
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
      }
    }
  }
  .mask,
  .mask1 {
    position: fixed;
    top: 0;
    left: 0;
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
