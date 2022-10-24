<template>
  <div class="inner">
    <div class="tit" v-if="goods.length == 0">
      <img src="../../assets/img/dingdan.png" alt="" />
      <h1>您还没有相关的订单</h1>
      <p>可以去看看有哪些想买的</p>
    </div>
    <div class="item" v-else v-for="good in goods" :key="good.id">
      <div class="item-top">
        <div class="shop-name">
          <img src="../../assets/img/dianpu-000.png" alt="" />
          <h2>SUPERTOFU</h2>
          <img src="../../assets/img/right-ccc.png" alt="" />
        </div>
        <span>
          {{ good.status | capi }}
          <!-- {{if $value.status == 1}}待付款 {{else if $value.status == 2}}代发货 {{else if $value.status == 3}}代收获 {{else if $value.status == 4}}代评价
          {{/if}} -->
        </span>
      </div>
      <div class="item-con">
        <img :src="require('../../assets/' + good.img)" alt="" />
        <div class="information">
          <div class="name">
            <h3 class="title">{{ good.title }}</h3>
            <p>
              ￥<span>{{ good.price }}</span>
            </p>
          </div>
          <div class="specification">
            <p class="color">{{ good.color }}</p>
            <p>x{{ good.num }}</p>
          </div>
          <span>7天无理由退换</span>
        </div>
      </div>
      <div class="payment" v-if="good.status === 1">应付款<span>￥</span>{{ good.price * good.num }}<span></span></div>
      <div class="btn">
        <slot :state="good"></slot>
        <a href="javascript:;" class="del" @click="del(good.id)">删除订单</a>
        <a href="javascript:;" class="add">加入购物车</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Item',
  props: ['goods'],
  data() {
    return {
      
    }
  },
  methods: {
    del(id) {
      this.$emit('postDelId', id)
    }
  },
  filters: {
    capi(val) {
      if(val === 1) {
        return '待付款'
      }
      else if(val === 2) {
        return '待发货'
      }
      else if(val === 3) {
        return '待收货'
      }
      else if(val === 4) {
        return '待评价'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.inner {
  padding-top: 0.18rem;
  margin: 0 auto;
  width: 7.28rem;
  .item {
    margin-bottom: 0.18rem;
    padding: 0.26rem 0.26rem 0.2rem;
    background-color: #fff;
    border-radius: 0.2rem;
    .item-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.32rem;
      .shop-name {
        display: flex;
        align-items: center;
        img:first-child {
          margin-right: 0.14rem;
          width: 0.42rem;
          height: 0.37rem;
        }
        h2 {
          margin-right: 0.1rem;
          font-size: 0.26rem;
        }
        img:last-child {
          width: 0.24rem;
          height: 0.24rem;
        }
      }
      span {
        color: #ff5000;
      }
    }

    .item-con {
      display: flex;
      img {
        margin-right: 0.26rem;
        width: 1.8rem;
        height: 1.8rem;
      }
      .information {
        flex: 1;
        > div {
          display: flex;
          justify-content: space-between;
          align-items: center;
          line-height: 0.44rem;
          font-size: 0.26rem;
        }
        .name {
          h3 {
            width: 3.76em;
            flex: 1;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          p {
            font-size: 0.1rem;
            color: #000;
            span {
              font-size: 0.28rem;
              font-weight: 600;
            }
          }
        }
        .specification {
          color: #909090;
        }
        > span {
          padding: 0 0.1rem;
          font-size: 0.18rem;
          color: #ff5000;
          border: 0.01rem solid #ff5000;
          border-radius: 0.04rem;
        }
      }
    }
    .payment {
      margin: 0.3rem 0 0.4rem;
      color: #000;
      font-weight: 700;
      text-align: right;
      span {
        font-size: 0.1rem;
        font-weight: 500;
      }
    }
    .btn {
      display: flex;
      justify-content: flex-end;
      a {
        margin-left: 0.18rem;
        width: 1.7rem;
        height: 0.7rem;
        line-height: 0.66rem;
        text-align: center;
        color: #000;
        border: 0.02rem solid #c8c8c8;
        border-radius: 0.35rem;
      }
    }
  }
}
.tit {
  padding-top: 4rem;
  text-align: center;
  color: #666;
  img {
    width: 1.4rem;
  }
  h1 {
    line-height: 0.5rem;
    font-size: 0.3rem;
  }
  p {
    line-height: 0.5rem;
    font-size: 0.24rem;
  }
}
</style>
