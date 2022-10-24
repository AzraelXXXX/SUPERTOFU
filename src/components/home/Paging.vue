<template>
  <div>
    <!-- 内容顶部 -->
    <div class="con-top">
      <ul>
        <li v-for="(nav, index) in navs" :key="nav.id" :class="nav.isactive ? 'active' : ''" @click="navSwitch(index)">{{ nav.title }}</li>
        <li :class="priceActive ? 'active' : ''" @click="priceBtn">
          价格<span><i :class="topPrice?'active_price_top':'price_top'"></i><i :class="bottomPrice?'active_price_bottom':'price_bottom'"></i></span>
        </li>
        <li @click="isopen"><a :class="shrink ? 'shrink' : ''"></a></li>
      </ul>
    </div>

    <!-- 内容 -->
    <div class="con">
      <div class="inner">
        <TwoColumn v-if="!shrink" :lists="lists"></TwoColumn>
        <Only v-else="shrink" :lists="lists"></Only>
      </div>
    </div>

    <!-- 返回顶部 -->
    <div class="goback" ref="backImg" @click="goback">
      <img src="../../assets/img/goback.png" alt="" />
    </div>
  </div>
</template>

<script>
import TwoColumn from '../mySort/TwoColumn.vue'
import Only from '../mySort/Only.vue'

export default {
  name: 'Paging',
  data() {
    return {
      lists: [],
      shrink: false,
      navs: [
        { id: 1, title: '综合', isactive: true },
        { id: 2, title: '销量', isactive: false },
        { id: 3, title: '新品', isactive: false },
      ],
      priceActive: false,
      topPrice: false,
      bottomPrice: false,
      flag: true
    }
  },
  methods: {
    async getPaging(num) {
      const { data: res } = await this.$http.get('/api/paging', { params: { num } })
      this.lists = res.data
    },
    isopen() {
      this.shrink = !this.shrink
    },
    navSwitch(index) {
      this.getPaging(index)
      this.navs.forEach((i) => {
        i.isactive = false
      })
      this.navs[index].isactive = true
      this.priceActive = false
      this.topPrice = false
      this.bottomPrice = false
    },
    priceBtn() {
      this.priceActive = true
      this.navs.forEach((i) => {
        i.isactive = false
      })
      if(this.flag) {
        this.flag = false
        this.topPrice = true
        this.bottomPrice = false
        this.getPaging(3)
      }
      else {
        this.flag = true
        this.topPrice = false
        this.bottomPrice = true
        this.getPaging(4)
      }
    },
    back() {
      const bbb = window.scrollY
      if(bbb >= 1600) {
        this.$refs.backImg.style.bottom = '.05rem'
      }
      else {
        this.$refs.backImg.style.bottom = '-.9rem'
      }
    },
    goback() {
      window.scrollTo({ top: 0 })
    }
  },
  created() {
    this.getPaging(0)
  },
  mounted() {
    window.addEventListener('scroll', this.back)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.back)
  },
  components: { TwoColumn, Only },
}
</script>

<style lang="less" scoped>
// 内容顶部
.con-top {
  width: 100%;
  height: 0.9rem;

  ul {
    display: flex;
    align-items: center;
    width: 100%;
    background-color: #f4f4f4;

    li {
      height: 0.9rem;
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 1;
      color: #737373;
      a {
        color: #737373;
        text-decoration: none;
      }
    }
    .active {
      color: #ff5000;
    }
    li:nth-child(4) {
      span {
        margin-left: 0.1rem;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 0.14rem;

        i {
          width: 0.14rem;
          height: 0.14rem;
        }

        .price_top {
          background: url(../../assets/img/top.png) no-repeat 0 0.02rem / 100%;
        }

        .price_bottom {
          background: url(../../assets/img/bottom.png) no-repeat 0 -0.02rem / 100%;
        }
        .active_price_top {
          background: url(../../assets/img/top-ff5000.png) no-repeat 0 0.02rem / 100%;
        }
        .active_price_bottom {
          background: url(../../assets/img/bottom-ff5000.png) no-repeat 0 -0.02rem / 100%;
        }
      }
    }

    li:nth-child(5) {
      a {
        width: 0.26rem;
        height: 0.26rem;
        background: url(../../assets/img/open.png) no-repeat 0 0 / 0.26rem;
      }
      .shrink {
        background: url(../../assets/img/shrink.png) no-repeat 0 0 / 0.26rem;
      }
    }
  }
}

// 内容
.con {
  .inner {
    display: flex;
    justify-content: space-between;
  }
}
.goback {
  position: fixed;
  bottom: -0.9rem;
  right: 0.08rem;
  transition: all 500ms;
  img {
    width: 0.8rem;
  }
}
</style>
