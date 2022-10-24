<template>
  <div class="car-container">
    <!-- 顶部 -->
    <div class="header">
      <div class="inner">
        <div class="top">
          <h1>
            <i class="back" @click="back"></i>购物车(<span class="tit_num">{{ lists.length }}</span
            >)
          </h1>
          <span @click="administration">管理</span>
        </div>
        <h2>
          共<span class="tit_num">{{ lists.length }}</span
          >件宝贝
        </h2>
      </div>
    </div>

    <!-- 内容 -->
    <div class="content">
      <div class="inner">
        <div class="item">
          <div class="item-top">
            <input type="checkbox" class="set-all" :checked="fullState" @change="fullChange" />
            <div>
              <img src="../../assets/img/dianpu-000.png" alt="" />
              <h2>SUPERTOFU</h2>
              <img src="../../assets/img/right-8d.png" alt="" />
            </div>
          </div>

          <div class="cross-store">
            <div class="cro-left">
              <span>跨店减满</span>
              <p>每满200减20,可跨店</p>
            </div>
            <div class="cro-right">
              <span>凑单</span>
              <img src="../../assets/img/right-f40.png" alt="" />
            </div>
          </div>

          <div class="item-con-all">
            <Item 
              v-for="list in lists" 
              :key="list.id" 
              :id="list.id" 
              :title="list.title" 
              :price="list.price" 
              :count="list.count" 
              :state="list.state" :src="list.src" :color="list.color" @share="getNewCount" @newState="getNewState" @notsub="alertNew"></Item>
          </div>

          <div class="cross-store store-activity">
            <div class="cro-left">
              <span>本店活动</span>
              <p>直降除外,部分商品满2件打9.50折</p>
            </div>
            <div class="cro-right">
              <span>凑单</span>
              <img src="../../assets/img/right-f40.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="settlement">
      <div class="inner">
        <div class="set-left">
          <input type="checkbox" class="sel-bot-all" :checked="fullState" @change="fullChange" />
          <span>全选</span>
        </div>
        <div class="set-right">
          <p>
            合计:<span>￥</span><span class="all-price">{{ allprice }}</span>
          </p>
          <div @click="settlement">
            结算(<span class="count">{{ allcount }}</span
            >)
          </div>
          <a href="javascript:;" class="del" v-show="isdel" @click="del">删除</a>
        </div>
      </div>
    </div>

    <div class="alert" v-show="isalert">{{ mask }}</div>
  </div>
</template>

<script>
import Item from '@/components/goods/Item.vue'
export default {
  name: 'Car',
  components: { Item },
  data() {
    return {
      lists: [],
      isdel: false,
      mask: '',
      isalert: false,
    }
  },
  methods: {
    async getCar() {
      const { data: res } = await this.$http.get('/api/car')
      this.lists = res.data
    },
    async getNewCount(e) {
      const { data: res } = await this.$http.post('/api/update/car', e)
      if (res.status === 200) {
        this.lists.some((item) => {
          if (item.id == e.id) {
            item.count = e.count
            return true
          }
        })
      }
    },
    getNewState(e) {
      this.lists.some((item) => {
        if (item.id === e.id) {
          item.state = e.state
          return true
        }
      })
    },
    fullChange(e) {
      this.lists.forEach((item) => (item.state = e.target.checked))
    },
    back() {
      this.$router.push('/detail')
    },
    administration() {
      this.isdel = !this.isdel
    },
    del() {
      const hastrue = this.lists.some((item) => {
        return item.state == true
      })
      if (hastrue) {
        this.lists.forEach((item) => {
          if (item.state) {
            this.$http.post('/api/del/car', { id: item.id }).then((data) => {
              const { data: res } = data
              if (res.status === 200) {
                this.mask = res.msg
                this.maskalert()
                this.getCar()
              }
            })
          }
        })
      } else {
        this.mask = '请勾选要删除的商品'
        this.maskalert()
      }
    },
    maskalert() {
      this.isalert = true
      setTimeout(() => {
        this.isalert = false
      }, 1000)
    },
    alertNew(e) {
      this.mask = e
      this.maskalert()
    },
    settlement() {
      if(this.allcount === 0) {
        this.mask = '请选择商品再结算'
        this.maskalert()
      }
      else {
        let n = 1
        this.lists.forEach(item => {
          if(item.state) {
            this.goodspush({id: item.id, title: item.title, color: item.color})
            this.$http.post('/api/order', {title: item.title, img: item.src, price: item.price, num: item.count, color: item.color}).then(data => {
              const {data: res} = data
              if(res.status === 200) {
                this.countedit(this.allcount)
                this.priceedit(this.allprice)
                this.$router.push('/settlement')
              }
            })
          }
        })
      }
    },
    goodspush(obj) {
      this.$store.commit('goodspush',obj)
    },
    countedit(count) {
      this.$store.commit('countedit',count)
    },
    priceedit(price) {
      this.$store.commit('priceedit',price)
    }
  },
  computed: {
    fullState() {
      return this.lists.every((item) => item.state === true)
    },
    allprice() {
      return this.lists.filter((item) => item.state).reduce((total, item) => (total += item.price * item.count), 0)
    },
    allcount() {
      return this.lists.filter((item) => item.state).length
    },
  },
  beforeCreate() {
    document.querySelector('body').style.backgroundColor = '#f1f1f1'
  },
  created() {
    this.getCar()
  },
  beforeDestroy() {
    document.querySelector('body').style.backgroundColor = '#fff'
  },
}
</script>

<style lang="less" scoped>
.car-container {
  background-color: #f1f1f1;
  width: 100%;

  .inner {
    margin: 0 auto;
    width: 7.06rem;
  }

  .header {
    width: 100%;
    height: 3.28rem;
    background-image: linear-gradient(to right, #ff7d03, #ff4a01);

    .inner {
      position: fixed;
      top: 0;
      width: 100%;
      padding: 0 0.22rem;
      background-image: linear-gradient(to right, #ff7d03, #ff4a01);
      z-index: 9999;
      .top {
        padding-top: 0.35rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #fff;

        h1 {
          display: flex;
          align-items: center;
          i {
            display: block;
            margin-right: 0.1rem;
            width: 0.36rem;
            height: 0.36rem;
            background: url(../../assets/img/back-fff.png) no-repeat 0 0.02rem / 100%;
          }
          font-size: 0.36rem;
        }
      }

      h2 {
        margin-top: 0.28rem;
        color: #fff;
        font-size: 0.2rem;
        font-weight: 400;
      }
    }
  }

  .content {
    margin: -1.48rem 0 0.96rem;

    .item {
      padding: 0.18rem 0;
      width: 100%;
      background-color: #fff;
      border-radius: 0.18rem;

      .item-top {
        display: flex;
        align-items: center;
        padding: 0 0.23rem;

        div {
          display: flex;
          align-items: center;

          img:first-child {
            margin-right: 0.2rem;
            width: 0.34rem;
            height: 0.32rem;
          }

          h2 {
            font-size: 0.22rem;
          }

          img:last-child {
            width: 0.18rem;
            height: 0.18rem;
          }
        }
      }

      .cross-store {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0.48rem 0.23rem 0 0.86rem;

        .cro-left {
          display: flex;
          align-items: center;

          span {
            padding: 0 0.05rem;
            margin-right: 0.18rem;
            font-size: 0.2rem;
            color: #d22f39;
            border: 1px solid #d22f39;
            border-radius: 0.06rem;
          }
        }

        .cro-right {
          display: flex;
          align-items: center;

          span {
            margin-right: 0.08rem;
            font-size: 0.2rem;
            color: #ff4400;
          }

          img {
            width: 0.16rem;
          }
        }
      }

      .item-con-all {
        margin: 0.31rem 0;
      }
      .store-activity {
        .cro-left {
          span {
            color: #ff4605;
            border: 1px solid #d22f39;
          }
          p {
            width: 3.38rem;
            font-size: 0.2rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }

  .settlement {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0.96rem;
    background-color: #fff;
    .inner {
      height: 0.96rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .set-left {
        display: flex;
        align-items: center;
        .sel-bot-all {
          margin-right: 0.1rem;
        }
        span {
          color: #5a5a5a;
          font-size: 0.22rem;
        }
      }
      .set-right {
        display: flex;
        align-items: center;
        p {
          margin-right: 0.2rem;
          span {
            color: #ff5000;
          }
        }
        div {
          width: 1.62rem;
          line-height: 0.6rem;
          text-align: center;
          color: #fff;
          border-radius: 0.3rem;
          background-image: linear-gradient(to right, #fb8d0c, #fd3600);
        }
        a {
          margin-left: 0.2rem;
          color: #666;
        }
      }
    }
  }
  input[type='checkbox'] {
    display: block;
    margin-right: 0.23rem;
    width: 0.4rem;
    height: 0.4rem;
    border-radius: 50%;
    border: 1px solid #ccc;
    background-color: transparent;
  }
  input[type='checkbox']:checked {
    border: none;
    background: #ff5000 url(../../assets/img/checked.png) no-repeat 0 0 / cover;
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
}
</style>
