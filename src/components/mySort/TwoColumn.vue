<template>
  <div class="pb">
    <div class="item" v-for="list in lists" :key="list.id" @click="toDetail(list.title)">
      <div class="item-img">
        <img :src="require('../../assets/' + list.img)" />
      </div>
      <div class="item-con">
        <h5>{{ list.title }}</h5>
        <p>
          <span>￥</span>
          <span>{{ list.price }}</span>
          <span>{{ list.num }}人付款</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TwoColumn',
  props: ['lists'],
  methods: {
    toDetail(title) {
      sessionStorage.setItem('title',title)
      this.$router.push('/detail')
    }
  }
}
</script>

<style lang="less" scoped>
.pb {
  width: 7.02rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .item {
    width: 3.42rem !important;
    margin-bottom: 0.18rem;
    width: 100%;
    background-color: #fff;
    border-radius: 0.1rem;
    overflow: hidden;

    .item-img {
      width: 100%;

      img {
        width: 3.42rem;
        height: 3.42rem;
      }
    }

    .item-con {
      padding: 0 0.2rem 0.09rem;

      h5 {
        margin: 0.25rem 0;
        width: 100%;
        height: 0.63rem;
        color: #333;
        font-size: 0.26rem;
        font-weight: 400;
        overflow: hidden;
      }

      p {
        display: flex;
        align-items: center;
        span {
          color: #ff5000;
        }
        span:nth-child(1) {
          margin-top: 0.1rem;
          font-size: 0.2rem;
        }
        span:nth-child(2) {
          margin: 0 0.09rem 0 0.04rem;
          font-size: 0.34rem;
        }
        span:nth-child(3) {
          margin-top: 0.06rem;
          color: #999;
          font-size: 0.22rem;
        }
      }
    }
  }
}
</style>
