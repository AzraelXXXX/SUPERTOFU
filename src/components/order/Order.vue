<template>
  <div class="order-container">
    <div class="top">
      <img src="../../assets/img/back.png" alt="" class="back" @click="$router.back()" />
      <div class="search">
        <img src="../../assets/img/de-search.png" alt="" />
        <input type="text" placeholder="SUPERTOFU" />
      </div>
      <img src="../../assets/img/other.png" alt="" />
    </div>

    <div class="header">
      <ul>
        <li v-for="(item, index) in navs" :key="item.id" :class="index === current ? 'active' : ''" @click="tabSwitch(index)">{{ item.title }}</li>
      </ul>
    </div>
    <div class="swiper">
      <div class="content" v-for="(item, index) in navs" :key="item.id" v-show="current === index">
        <Item :goods="goods(index)" :index="index" @postDelId="orderDelete">
          <template slot-scope="{state}">
            <a href="javascript:;" v-if="state.status === 2" @click="maskShow('提醒发货成功')">提醒发货</a>
            <a href="javascript:;" v-if="state.status === 3">一键收获</a>
            <a href="javascript:;" v-if="state.status === 4">追加评论</a>
          </template>
        </Item>
      </div>
    </div>
    <div class="alert" v-show="isshow">{{maskText}}</div>
  </div>
</template>

<script>
import Item from './Item.vue'
export default {
  name: 'Order',
  components: { Item },
  data() {
    return {
      current: 0,
      navs: [
        { id: 1, title: '全部' },
        { id: 2, title: '待付款' },
        { id: 3, title: '代发货' },
        { id: 4, title: '代收获' },
        { id: 5, title: '待评价' },
      ],
      lists: [],
      maskText: '',
      isshow: false,
    }
  },
  methods: {
    tabSwitch(index) {
      this.current = index
    },
    async getOrder() {
      const { data: res } = await this.$http.get('/api/order')
      this.lists = res.data
    },
    async orderDelete(id) {
      const { data: res } = await this.$http.post('/api/del/order', { id })
      if (res.status === 200) {
        this.maskShow(res.msg)
        this.getOrder()
      }
    },
    maskShow(msg) {
      this.maskText = msg
      this.isshow = true
      setTimeout(() => {
        this.isshow = false
      }, 1000)
    },
  },
  computed: {
    goods() {
      return function (index) {
        return this.lists.filter((item) => {
          if (index !== 0) {
            return item.status === index
          } else {
            return item
          }
        })
      }
    },
  },

  created() {
    this.getOrder()
  },
}
</script>

<style lang="less" scoped>
.order-container {
  width: 100%;
  .top {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 0.82rem;
    background-color: #f1f1f1;
    > img {
      width: 0.46rem;
      height: 0.46rem;
    }
    .search {
      display: flex;
      align-items: center;
      width: 4.4rem;
      height: 0.56rem;
      background-color: #fff;
      border-radius: 0.28rem;

      img {
        margin: 0 0.2rem;
        width: 0.28rem;
        height: 0.28rem;
      }

      input {
        padding-left: 0.2rem;
        outline: none;
        font-size: 0.24rem;
        border: none;
        border-left: 2px solid #a9a9a9;
      }

      input::placeholder {
        color: #aeaeae;
        font-size: 0.24rem;
      }
    }
  }
  .header {
    position: fixed;
    top: 0.82rem;
    left: 0;
    width: 100%;
    background-color: #f1f1f1;
    ul {
      display: flex;
      justify-content: space-around;
      line-height: 0.82rem;
      li {
        font-size: 0.3rem;
      }
      .active {
        color: #ff5000;
        font-weight: 600;
      }
    }
  }
  .swiper {
    margin-top: 1.64rem;
  }
  .content {
    height: 100%;
  }
  .alert {
    position: fixed;
    top: 50%;
    left: 50%;
    padding: 0 0.5rem;
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
