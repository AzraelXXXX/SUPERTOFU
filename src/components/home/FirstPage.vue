<template>
  <div class="con">
    <div class="guide images">
      <img src="../../assets/img/zhinan.webp" alt="" />
    </div>
    <div class="chao_woo images">
      <img src="../../assets/img/chao_woo.webp" alt="" />
    </div>
    <div class="coupons images">
      <div class="coupons-bg">
        <div class="coupons-left">
          <div class="cou-price">
            <span>￥</span>
            <span>100</span>
          </div>
          <div class="cou-con">
            <span>分享抢优惠券</span>
            <span>满666元可用</span>
          </div>
        </div>
        <div class="coupons-right">
          <div class="cou-btn">
            <img src="../../assets/img/share.png" alt="" />
          </div>
        </div>
      </div>
    </div>
    <div class="con-99 images con-all">
      <router-link to="/index/paging"><img src="../../assets/img/con-3.webp" alt="" /></router-link>
    </div>

    <div class="images con-all" v-for="(item, index) in indexinfo.goods1" :key="index">
      <a href="javascript:;" class="to_de" @click="todetail(item.title)"><img :src="require('../../assets/' + item.src)" :title="item.title" /></a>
    </div>
    <div class="con-99-new3 images con-all">
      <a href="javascript:;" class="to_de"><img src="../../assets/img/con-6.webp" alt="" title="SUPERTOFU(SPTF) AW22 眼睛椰树手绘图案 袖臂细节 270g长袖TEE" /></a>
    </div>
    <div class="images con-all" v-for="item in indexinfo.goods2" :key="item.src">
      <a href="javascript:;" class="to_de" @click="todetail(item.title)"><img :src="require('../../assets/' + item.src)" :title="item.title" /></a>
    </div>
    <div class="con-99-new6 images con-all">
      <img src="../../assets/img/con-9.webp" alt="" />
    </div>
    <div class="con-99-new7 images con-all">
      <img src="../../assets/img/con-10.webp" alt="" />
    </div>
    <div class="con-99-new8 images con-all">
      <img src="../../assets/img/con-11.webp" alt="" />
    </div>
    <div class="banner images con-all">
      <div class="swiper-container swiper1">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="item in indexinfo.banner1" :key="item.src">
            <a href="javascript:;" class="to_de" @click="todetail(item.title)"><img :src="require('../../assets/' + item.src)" :title="item.title" /></a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
    </div>
    <div class="images con-all" v-for="item in indexinfo.goods3" :key="item.src">
      <a href="javascript:;" class="to_de" @click="todetail(item.title)"><img :src="require('../../assets/' + item.src)" :title="item.title" /></a>
    </div>
    <div class="con-99-new12 images con-all">
      <img src="../../assets/img/con-15.webp" alt="" />
    </div>
    <div class="con-99-new13 images con-all">
      <img src="../../assets/img/con-16.webp" alt="" />
    </div>

    <div class="con-99-new14 images con-all" v-for="item in indexinfo.goods4" :key="item.src">
      <a href="javascript:;" class="to_de" @click="todetail(item.title)"><img :src="require('../../assets/' + item.src)" :title="item.title" /></a>
    </div>

    <div class="con-99-new16 images con-all">
      <img src="../../assets/img/con-19.webp" alt="" />
    </div>
    <div class="con-99-new17 images con-all">
      <img src="../../assets/img/con-20.webp" alt="" />
    </div>
    <div class="banner images con-all">
      <div class="swiper-container swiper1">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="item in indexinfo.banner2" :key="item.src">
            <a href="javascript:;" class="to_de" @click="todetail(item.title)"><img :src="require('../../assets/' + item.src)" :title="item.title" /></a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
    </div>
    <div class="con-99-new18 images con-all">
      <img src="../../assets/img/con-21.webp" alt="" />
    </div>
    <div class="con-99-new19 images con-all">
      <img src="../../assets/img/con-22.webp" alt="" />
    </div>
    <div class="con-99-new20 images con-all">
      <img src="../../assets/img/con-23.webp" alt="" />
    </div>
    <div class="con-99-new21 images con-all">
      <img src="../../assets/img/con-24.webp" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'FirstPage',
  data() {
    return {
      indexinfo: {
        goods1: [],
        goods2: [],
        goods3: [],
        goods4: [],
        banner1: [],
        banner2: []
      }
    }
  },
  methods: {
    indexSwiper() {
      const swiper1 = new Swiper('.swiper1', {
        pagination: '.swiper-pagination',
        // paginationClickable: true,
        loop: true,
        autoplay: 2000,
        speed: 800,
        autoplayDisableOnInteraction: false,
      })
    },
    async getindex() {
      const {data: res} = await this.$http.get('/my/index')
      const data = res.data
      this.indexinfo.goods1 = JSON.parse(data.goods1).goods1
      this.indexinfo.goods2 = JSON.parse(data.goods2).goods2
      this.indexinfo.goods3 = JSON.parse(data.goods3).goods3
      this.indexinfo.goods4 = JSON.parse(data.goods4).goods4
      this.indexinfo.banner1 = JSON.parse(data.banner1).banner1
      this.indexinfo.banner2 = JSON.parse(data.banner2).banner2
    },
    todetail(title) {
      sessionStorage.setItem('title', title)
      this.$router.push('/detail')
    }
  },
  created() {
    this.getindex()
  },
  mounted() {
    setTimeout(() => {
      this.indexSwiper()
    }, 50)
  },

}
</script>

<style lang="less" scoped>
.con {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  .images {
    margin-bottom: 0.24rem;
    text-align: center;
  }
  img {
    width: 7.14rem;
  }
  .coupons {
    width: 100%;
    height: 1.8rem;
    background-color: #fff;
    .coupons-bg {
      display: flex;
      justify-content: space-between;
      margin: 0.13rem 0.18rem 0;
      width: 7.14rem;
      height: 1.64rem;
      color: #ff1616;
      font-size: 0.32rem;
      background: url(../../assets/img/coupons.png) no-repeat 0 0 / 7.14rem 1.64rem;
      .coupons-left {
        display: flex;
        .cou-price {
          display: flex;
          align-items: center;
          margin-right: 0.14rem;
          span:first-child {
            margin-top: 0.38rem;
          }
          span:last-child {
            font-size: 0.9rem;
            font-weight: 600;
          }
        }
        .cou-con {
          display: flex;
          flex-direction: column;
          justify-content: center;
          span:last-child {
            text-align: left;
            margin-top: 0.14rem;
            font-size: 0.28rem;
          }
        }
      }
      .coupons-right {
        display: flex;
        align-items: center;
        .cou-btn {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 0.24rem;
          width: 1.96rem;
          height: 0.68rem;
          background-color: #ff1616;
          border-radius: 0.34rem;
          img {
            width: 1.23rem;
            height: 0.33rem;
          }
        }
      }
    }
  }
  .con-all {
    border-radius: 0.2rem;
    overflow: hidden;
  }
  .banner {
    width: 7.14rem;
  }
}
</style>
