<template>
  <div class="detail-container">
    <!-- 头部 -->
    <div class="header" ref="header">
      <div class="back">
        <img src="../assets/img/back.png" alt="" @click="back" />
        <span></span>
        <img src="../assets/img/other.png" alt="" />
      </div>
      <div class="search">
        <img src="../assets/img/de-search.png" alt="" />
        <input type="text" placeholder="背心" />
      </div>
      <div class="shop-car" @click="tocar">
        <img src="../assets/img/shop-car.png" alt="" />
      </div>
    </div>

    <div class="nav" v-show="navisshow">
      <div v-for="(nav, index) in navs" :key="nav.id" :class="nav.isactive ? 'active' : ''" @click="activeSwitch(index)">
        <span>{{ nav.title }}</span>
      </div>
    </div>

    <!-- 轮播 -->
    <div class="banner scroll a">
      <div class="swiper-container swiper2">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(good, index) in banner_img" :key="index"><img :src="require('../assets/' + good)" alt="" /></div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
    </div>

    <!-- 商品内容 -->
    <div class="content">
      <div class="inner">
        <!-- 商品介绍 -->
        <div class="introduce all">
          <div class="coupons">
            <span>跨店每200减20</span>
            <span>淘金币抵3%</span>
          </div>
          <div class="price">
            <span>¥</span>
            <span>{{ goodsinfo.price }}</span>
          </div>
          <div class="describe">
            <div>
              <img src="../assets/img/ifashion.webp" alt="" />
              <span>追流行趋势</span>
              <span>买风格新品</span>
            </div>
            <span
              >月销<span>{{ goodsinfo.num }}</span></span
            >
          </div>
          <div class="title">
            <h2>{{ goodsinfo.title }}</h2>
          </div>
          <div class="receive">
            <span>领券</span>
            <img src="../assets/img/right-fff.png" alt="" />
          </div>
        </div>
        <!-- 参数 -->
        <div class="parameter all">
          <div class="para-item">
            <div>
              <span>选择</span>
              <p>颜色/尺码</p>
            </div>
            <i></i>
          </div>
          <div class="select">
            <img v-for="(selimg, index) in selects" :key="index" :src="require('../assets/' + selimg.src)" :class="current == index ? 'img_active' : ''" @click="selectImg(selimg.src, selimg.color, index)" />
            <span v-if="img_sel">{{ color }}</span>
            <span v-else
              >共<span class="sel_num">{{ selects.length }}</span
              >种颜色可选</span
            >
          </div>
          <div class="para-item">
            <div>
              <span>发货</span>
              <p>广东东莞<em></em>快递: 18.00元</p>
            </div>
            <i></i>
          </div>
          <div class="para-item">
            <div>
              <span>保障</span>
              <p>七天无理由· 运费险</p>
            </div>
            <i></i>
          </div>
          <div class="para-item">
            <div>
              <span>参数</span>
              <p>品牌 尺码...</p>
            </div>
            <i></i>
          </div>
        </div>
        <!-- 评价 -->
        <div class="evaluate all scroll a" ref="evaluate">
          <!-- 宝贝评价 -->
          <div class="goods-eva">
            <div class="eva-tit">
              <h2>宝贝评价(200+)</h2>
              <div>
                <span>查看全部</span>
                <img src="../assets/img/right-f40.png" alt="" />
              </div>
            </div>
            <div class="buy-eva">
              <div class="eva-top">
                <img src="../assets/img/head-pic-1.jpg" alt="" />
                <div>
                  <span>丶**开</span>
                  <span>2个月前</span>
                </div>
              </div>
              <p>太绝了最帅格子衫一点也不程序员 面料比较厚</p>
            </div>
            <div class="buy-eva">
              <div class="eva-top">
                <img src="../assets/img/head-pic-2.jpg" alt="" />
                <div>
                  <span>t**1</span>
                  <span>2个月前</span>
                </div>
              </div>
              <p>尺码感受：刚刚好的oversize 古巴领搭配起来很帅</p>
            </div>
          </div>
          <!-- 卖家秀 -->
          <div class="buyer">
            <div class="eva-top">
              <div class="eva-tit">
                <h2>买家秀(4)</h2>
                <div>
                  <span>查看全部</span>
                  <img src="../assets/img/right-f40.png" alt="" />
                </div>
              </div>
            </div>
            <div class="buy-pic">
              <img src="../assets/img/maijiaxiu-1.jpg" alt="" />
              <img src="../assets/img/maijiaxiu-2.jpg" alt="" />
              <img src="../assets/img/maijiaxiu-3.jpg" alt="" />
              <img src="../assets/img/maijiaxiu-4.jpg" alt="" />
            </div>
          </div>
          <!-- 问大家 -->
          <div class="question">
            <div class="eva-top">
              <div class="eva-tit">
                <h2>问大家(16)</h2>
                <div>
                  <span>查看全部</span>
                  <img src="../assets/img/right-f40.png" alt="" />
                </div>
              </div>
              <div class="que-item">
                <div>
                  <i></i>
                  <p>红色还是黄色好看</p>
                </div>
                <span>5个回答</span>
              </div>
              <div class="que-item">
                <div>
                  <i></i>
                  <p>170 130 穿多大</p>
                </div>
                <span>2个回答</span>
              </div>
            </div>
          </div>
        </div>
        <!-- 店铺 -->
        <div class="shop all">
          <div class="shop-top">
            <div class="left">
              <img src="../assets/img/shop.png" alt="" />
              <div>
                <h2>SUPERTOFU</h2>
                <img src="../assets/img/huangguan.webp" alt="" />
              </div>
            </div>
            <div class="right">
              <p>宝贝描述4.9<span>高</span></p>
              <p>卖家服务4.9<span>高</span></p>
              <p>物流服务4.9<span>高</span></p>
            </div>
          </div>
          <div class="shop-bottom">
            <div class="btn">进店逛逛</div>
            <div class="btn">全部宝贝</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 分割 -->
    <div class="mid scroll">
      <hr />
      <div>
        <img src="../assets/img/pic.png" alt="" />
        <span>详情</span>
      </div>
      <hr />
    </div>

    <!-- 详情 -->
    <div class="information a">
      <img src="../assets/img/de-header.png" alt="" />
      <img v-for="(infosrc, index) in details_img" :key="index" :src="require('../assets/' + infosrc)" alt="" />
    </div>

    <!-- 价格说明 -->
    <div class="explain">
      <h2>价格说明</h2>
      <ul>
        <li>
          <h5>划线价格</h5>
          <p>商品的专柜价、吊牌价、正品零售价、厂商指导价或该商品的曾经展示过的销售价等，<span>并非原价</span>，仅供参考。</p>
        </li>
        <li>
          <h5>未划线价格</h5>
          <p>商品的<span>实时标价</span>，不因表述的差异改变性质。具体成交价格根据商品参加活动,或会员使用优惠券、积分等发生变化，最终以订单结算页价格为准。</p>
        </li>
        <li>
          <p>商家详情页(含主图)以图片或文字形式标注的一口价、促销价、优惠价等价格可能是在使用优惠券、满减或特定优惠活动和时段等情形下的价格，具体请以结算页面的标价、优惠条件或活动规则为准。</p>
        </li>
        <li>
          <p>此说明仅当出现价格比较时有效，具体请参见《淘宝价格发布规范》。若商家单独对划线价格进行说明的，以商家的表述为准。</p>
        </li>
      </ul>
    </div>

    <!-- 底部 -->
    <div class="footer">
      <div class="fot-nav">
        <img src="../assets/img/dianpu.png" alt="" />
        <span>店铺</span>
      </div>
      <div class="fot-nav">
        <img src="../assets/img/kefu.png" alt="" />
        <span>客服</span>
      </div>
      <div class="fot-nav collection">
        <img src="../assets/img/shoucang.png" alt="" />
        <span>收藏</span>
      </div>
      <div class="fot-btn">
        <div class="btn-left" @click="addcar">加入购物车</div>
        <div class="btn-right" @click="buy">立即购买</div>
      </div>
    </div>
    <div class="alert" v-show="norms.isalert">{{ norms.alert }}</div>
    <!-- <div class="collect-alert"></div> -->
  </div>
</template>

<script>
import '../assets/css/details.less'
export default {
  name: 'Detail',
  data() {
    return {
      current: null,
      color: null,
      img_sel: false,
      goodsinfo: {
        id: '',
        title: '',
        price: 0,
        num: 0,
      },
      banner_img: [],
      details_img: [],
      selects: [],
      navisshow: false,
      navs: [
        { id: 1, title: '宝贝', isactive: true },
        { id: 2, title: '评价', isactive: false },
        { id: 3, title: '详情', isactive: false },
      ],
      norms: {
        alert: '',
        isalert: false,
      },
      path: ''
    }
  },
  methods: {
    async getDetails() {
      const { data: res } = await this.$http.get('/api/details', { params: { title: sessionStorage.getItem('title') } })
      this.goodsinfo.id = res.data.id
      this.goodsinfo.title = res.data.title
      this.goodsinfo.price = res.data.price
      this.goodsinfo.num = res.data.num
      this.banner_img = JSON.parse(res.data.banner_img).img
      this.details_img = JSON.parse(res.data.details_img).img
      this.selects = JSON.parse(res.data.sel).select
    },
    detailSwiper() {
      let swiper2 = new Swiper('.swiper2', {
        pagination: '.swiper-pagination',
        paginationType: 'fraction',
      })
    },
    selectImg(src, color, index) {
      this.current = index
      this.color = color
      this.img_sel = true
      sessionStorage.setItem('color', color)
      sessionStorage.setItem('src', src)
    },
    back() {
      if(this.path === '/car') {
        this.$router.push('/index/paging')
      }
      else {
        this.$router.back()
      }
    },
    detailscroll() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      const topHeight = this.$refs.header.offsetHeight
      const a = document.querySelectorAll('.a')
      if (scrollTop > topHeight) {
        this.navisshow = true
      } else {
        this.navisshow = false
      }
    },
    activeSwitch(index) {
      this.navs.forEach((i) => {
        i.isactive = false
      })
      this.navs[index].isactive = true
      document.querySelectorAll('.a')[index].scrollIntoView()
    },
    tocar() {
      this.$router.push('/car')
    },
    async addcar() {
      if (this.current === null) {
        this.norms.alert = '请选择商品规格'
        this.norms.isalert = true
        setTimeout(() => {
          this.norms.isalert = false
        }, 1000)
      } else {
        const { data: res } = await this.$http.post('/api/car', { color: sessionStorage.getItem('color'), src: sessionStorage.getItem('src'), price: this.goodsinfo.price, title: this.goodsinfo.title })
        this.norms.alert = res.msg
        this.norms.isalert = true
        setTimeout(() => {
          this.norms.isalert = false
        }, 1000)
      }
    },
    async buy() {
      if (this.current === null) {
        this.norms.alert = '请选择商品规格'
        this.norms.isalert = true
        setTimeout(() => {
          this.norms.isalert = false
        }, 1000)
      } else {
        this.goodspush({id: this.goodsinfo.id, title: this.goodsinfo.title, color: sessionStorage.getItem('color')})
        const { data: res } = await this.$http.post('api/order', { color: sessionStorage.getItem('color'), img: sessionStorage.getItem('src'), price: this.goodsinfo.price, title: this.goodsinfo.title, num: 1})
        if(res.status === 200) {
          this.countedit(1)
          this.priceedit(this.goodsinfo.price)
          this.$router.push('/settlement')
        }
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
  created() {
    this.getDetails()
  },
  mounted() {
    window.scrollTo({top: 0})
    setTimeout(() => {
      this.detailSwiper()
    }, 50)
    window.addEventListener('scroll', this.detailscroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.detailscroll)
    sessionStorage.removeItem('color')
    sessionStorage.removeItem('src')
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.path = from.path
    })
  }
}
</script>
