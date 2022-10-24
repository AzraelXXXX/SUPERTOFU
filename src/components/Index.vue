<template>
  <div class="index-container">
    <!-- 头部 -->
    <div class="header">
      <!-- 头部的上部分 -->
      <div class="top">
        <div class="inner">
          <!-- 头部标题 -->
          <div class="header-tit">
            <div class="title">
              <h1>SUPERTOFU</h1>
              <img src="../assets/img/right.webp" alt="" />
            </div>
            <div class="follow">
              <img src="../assets/img/guanzhu.webp" alt="" />
              <span>关注</span>
            </div>
          </div>
          <!-- 店铺等级和粉丝数 -->
          <div class="ifashion">
            <img src="../assets/img/ifashion.webp" alt="" />
            <img src="../assets/img/huangguan.webp" alt="" />
            <span>粉丝数112万</span>
          </div>
        </div>
      </div>
      <!-- 导航部分 -->
      <div :class="isfixTab ? 'nav navfixed' : 'nav'" ref="navlist">
        <div class="search">
          <img src="../assets/img/search.webp" alt="" />
          <span>搜索</span>
        </div>
        <div class="nav-list">
          <ul>
            <li v-for="(nav, index) in navs" :key="nav.id" @click="navSwitch(index)">
              <!-- <a href="javascript:;">{{nav.title}}</a> -->
              <router-link :to="'/index/' + nav.to">{{ nav.title }}</router-link>
              <span v-show="current === index"></span>
            </li>
            <li><a href="javascript:;">新品</a></li>
            <li><a href="javascript:;">活动</a></li>
            <li><a href="javascript:;">分类</a></li>
            <li><a href="javascript:;">微淘</a></li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 内容部分 -->
    <router-view></router-view>
  </div>
</template>

<script>
import '../assets/css/header.less'

export default {
  name: 'Index',
  data() {
    return {
      current: 0,
      navs: [
        {id: 1, title: '首页', active: true, to: 'firstpage'},
        {id: 2, title: '宝贝', active: false, to: 'paging'}
      ],
      isfixTab: false
    }
  },
  methods: {
    navSwitch(index) {
      this.current = index
    },
    switchfixed() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      const navsrolltop = this.$refs.navlist.offsetTop
      scrollTop > navsrolltop ? (this.isfixTab = true) : (this.isfixTab = false)
    },
    aaa() {
      console.log(this.$route);
    }
  },
  mounted() {
    if(this.$route.path == '/index/firstpage') {
      this.current = 0
    }
    else {
      this.current = 1
    }
    window.addEventListener('scroll', this.switchfixed)
  },
  updated() {
    if(this.$route.path == '/index/firstpage') {
      this.current = 0
    }
    else {
      this.current = 1
    }
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.switchfixed)
  }
}
</script>

<style lang="less" scoped>
.index-container {
  width: 100%;
  background-color: rgb(242, 241, 239);
  .inner {
    margin: 0 auto;
    width: 7.02rem;
  }
  .navfixed {
  position: fixed;
  top: 0;
}
}
.swiper-container {
  width: 100%;
  height: 100%;
}
.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}
.banner .swiper-pagination-bullet {
  width: 0.12rem;
  height: 0.12rem;
  opacity: 1;
  background-color: rgba(255, 255, 255, 0.5) !important;
}
.banner .swiper-pagination-bullet-active {
  background-color: #ff5000 !important;
}
</style>
