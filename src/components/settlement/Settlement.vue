<template>
  <div class="settlement-container">
    <div class="header">
      <div class="inner">
        <img src="../../assets/img/left.png" alt="" class="back" @click="isshow = true" />
        <div class="zfb">
          <img src="../../assets/img/zhifubao.png" alt="" />
          <h1>支付宝付款</h1>
        </div>
        <img src="../../assets/img/yiwen.png" alt="" />
      </div>
    </div>

    <div class="password">
      <h1>输入支付密码</h1>
      <ul>
        <li v-for="(item, index) in password" :key="index">
          <input type="password" maxlength="1" v-model.number="item.val" ref="refipt" @keyup="inputNextFocus($event, index)" />
        </li>
      </ul>
    </div>

    <div class="need">
      <div class="inner">
        <span>需付款</span>
        <span
          >￥<span class="price">{{ price }}</span></span
        >
      </div>
    </div>

    <div class="information">
      <div class="inner">
        <div>
          <span>订单信息</span>
          <p>
            淘宝合并交易<span class="num">{{ count }}</span
            >笔
          </p>
        </div>
        <div>
          <span>支付宝账号</span>
          <p>144******44</p>
        </div>
        <div>
          <span>付款方式</span>
          <p class="func">花呗<img src="../../assets/img/right-ccc.png" alt="" /></p>
        </div>
      </div>
    </div>

    <div class="alert" v-show="mask">{{ maskTitle }}</div>

    <div class="is_true" v-if="isshow">
      <div class="content">
        <h2>是否退出？</h2>
        <div class="con_btn">
          <button class="cancel" @click="isshow = false">否</button>
          <button class="determine" @click="demain">是</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Settlement',
  data() {
    return {
      isshow: false,
      mask: false,
      password: [{ val: '' }, { val: '' }, { val: '' }, { val: '' }, { val: '' }, { val: '' }],
      maskTitle: '',
      iTime: null
    }
  },
  methods: {
    demain() {
      this.resetstate()
      this.$router.back()
    },
    inputNextFocus(el, index) {
      if (el.target.value.length >= 1) {
        if (index + 1 > 5) {
          this.$refs.refipt[index].blur()
          if (this.password[0].val == 1 && this.password[1].val == 4 && this.password[2].val == 7 && this.password[3].val == 2 && this.password[4].val == 5 && this.password[5].val == 8) {
            this.goods.forEach((i) => {
              this.$http.post('/api/update/order', { title: i.title, color: i.color }).then((data) => {
                const { data: res } = data
                if (res.status === 200) {
                  this.maskshow(res.msg)
                  clearTimeout(this.iTime)
                  this.iTime = setTimeout(() => {
                    this.$router.replace('/order')
                  }, 500)
                }
              })
            })
          } else {
            this.maskshow('密码错误')
            this.password.forEach((i) => {
              i.val = ''
            })
            this.$refs.refipt[0].focus()
          }
        } else {
          this.$refs.refipt[index + 1].focus()
        }
      } else if ((el, index)) {
        if (el.target.value.length < 1) {
          this.$refs.refipt[index - 1].focus()
        }
      }
    },
    maskshow(msg) {
      this.maskTitle = msg
      this.mask = true
      setTimeout(() => {
        this.mask = false
      }, 1000)
    },
    resetstate() {
      this.$store.commit('resetstate')
    },
  },
  computed: {
    price() {
      return this.$store.state.price
    },
    count() {
      return this.$store.state.count
    },
    goods() {
      return this.$store.state.goods
    },
  },
}
</script>

<style lang="less" scoped>
.settlement-container {
  width: 100%;
  .inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    width: 7.06rem;
  }
  .header {
    width: 100%;
    .inner {
      line-height: 0.8rem;
      > img {
        width: 0.36rem;
      }
      .zfb {
        display: flex;
        align-items: center;
        img {
          width: 0.42rem;
        }
        h1 {
          font-size: 0.34rem;
        }
      }
    }
  }
  .password {
    padding-top: 0.4rem;
    text-align: center;
    h1 {
      line-height: 0.76rem;
      font-size: 0.48rem;
      font-weight: 400;
    }
    ul {
      display: flex;
      justify-content: center;
      margin: 0.33rem auto;
      li {
        width: 1.19rem;
        height: 0.83rem;
        border: 0.02rem solid #e4e4e4;
        margin-left: -0.02rem;
        overflow: hidden;
        input {
          width: 100%;
          height: 100%;
          font-size: 0.4rem;
          text-align: center;
          outline: none;
          border: none;
        }
      }
      li:first-child {
        border-radius: 0.12rem 0 0 0.12rem;
      }

      li:last-child {
        border-radius: 0 0.12rem 0.12rem 0;
      }
    }
  }
  .need {
    border-bottom: 0.02rem solid #e4e4e4;
    .inner {
      line-height: 0.9rem;
      span {
        font-size: 0.28rem;
        font-weight: 600;
      }
    }
  }
  .information {
    padding: 0.11rem 0;
    border-bottom: 0.02rem solid #e4e4e4;
    .inner {
      flex-direction: column;
      div {
        width: 100%;
        display: flex;
        justify-content: space-between;
        line-height: 0.64rem;
        span {
          color: #939393;
        }
        .func {
          display: flex;
          align-items: center;
          img {
            margin-left: 0.14rem;
            width: 0.26rem;
            height: 0.26rem;
          }
        }
      }
    }
  }
  .alert {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 3rem;
    height: 0.8rem;
    line-height: 0.8rem;
    text-align: center;
    transform: translate(-50%, -50%);
    background-color: rgba(0, 0, 0, 0.8);
    color: #fff;
    border-radius: 0.1rem;
    z-index: 999;
  }
  .is_true {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    .content {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 6rem;
      height: 2.3rem;
      background-color: #fff;
      border-radius: 0.18rem;
      overflow: hidden;
      h2 {
        line-height: 1.32rem;
        font-size: 0.24rem;
        font-weight: 400;
        text-align: center;
      }
      h2 {
        line-height: 1.32rem;
        font-size: 0.24rem;
        font-weight: 400;
        text-align: center;
      }
      .con_btn {
        display: flex;
        border-top: 0.02rem solid #f3f3f3;
        button {
          flex: 1;
          height: 0.98rem;
          font-size: 0.28rem;
          color: #1890ff;
          border: none;
          background-color: #fff;
        }
        .determine {
          border-left: 0.02rem solid #f3f3f3;
        }
      }
    }
  }
}
</style>
