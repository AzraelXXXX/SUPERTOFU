<template>
  <div class="only">
    <div class="item" v-for="list in lists" :key="list.id" @click="toDetail(list.title)">
      <div class="only-item">
        <img :src="require('../../assets/' + list.img)" />
        <div class="o-it-r">
          <div>
            <h2>{{ list.title }}</h2>
            <span>运费 ￥ 18</span>
          </div>
          <p>
            <span>￥ </span><span>{{ list.price }}</span
            >{{ list.num }}人付款
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Only',
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
.only {
  width: 100%;
  .only-item {
    display: flex;
    margin-bottom: 0.14rem;
    border-radius: 0.2rem;
    background-color: #fff;
    overflow: hidden;
    img {
      width: 2.8rem;
      height: 2.8rem;
    }
    .o-it-r {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 0.34rem 0.24rem 0 0.22rem;
      width: 100%;
      div {
        h2 {
          margin-bottom: 0.2rem;
          width: 3.6rem;
          height: 0.7rem;
          font-size: 0.26rem;
          overflow: hidden;
        }
        span {
          font-size: 0.22rem;
          color: #666;
        }
      }
      p {
        font-size: 0.22rem;
        color: #666;
        span:first-child {
          color: #ff5000;
        }
        span:last-child {
          font-size: 0.32rem;
          color: #ff5000;
        }
      }
    }
  }
}
</style>
