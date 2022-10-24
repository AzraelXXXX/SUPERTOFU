<template>
  <div :class="state?'item-con item-co-bg':'item-con'">
    <input type="checkbox" class="item-sel" :checked="state" @change="stateChange(id, !state)" />
    <img :src="require('../../assets/' + src)" alt="" class="it_img" />
    <div class="item-intro">
      <h2>{{ title }}</h2>
      <div>
        <span class="item_color">{{ color }}</span
        ><img src="../../assets/img/bottom-9c.png" alt="" />
      </div>
      <span>跨店没200减20</span>
      <span class="price">￥{{ price }}</span>
    </div>
    <div class="p-num">
      <a href="javascript:;" class="decrement" @click="subCount(id, count - 1)">-</a>
      <input type="text" class="itxt" :value="count" />
      <a href="javascript:;" class="increment" @click="addCount(id, count + 1)">+</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Item',
  props: {
    id: {
      type: Number,
      required: true
    },
    title: {
      default: '',
      type: String
    },
    price: {
      default: 0,
      type: Number
    },
    count: {
      default: 1,
      type: Number
    },
    state: {
      default: false,
    },
    src: {
      default: '',
      type: String
    },
    color: {
      default: '',
      type: String
    }
  },
  methods: {
    addCount(id, count) {
      this.$emit('share', { id, count })
    },
    subCount(id, count) {
      if (count === 0) {
        this.$emit('notsub', '已经不能再减了！')
      } else {
        this.$emit('share', { id, count })
      }
    },
    stateChange(id, state) {
      this.$emit('newState', { id, state })
    },
  },
}
</script>

<style lang="less" scoped>
.item-con {
  position: relative;
  display: flex;
  padding: 0.1rem 0.23rem 0.32rem;
  width: 100%;

  > input {
    margin-top: 0.66rem;
  }

  > img {
    margin-right: 0.22rem;
    width: 1.7rem;
    height: 1.7rem;
  }

  .item-intro {
    font-size: 0.22rem;
    flex: 1;
    h2 {
      width: 4.04rem;
      line-height: 0.44rem;
      font-size: 0.24rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    div {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0.05rem 0 0.14rem;
      width: 2.38rem;
      height: 0.46rem;
      color: #9c9c9c;
      background-color: #f8f8f8;

      img {
        width: 0.21rem;
        height: 0.21rem;
      }
    }

    span:nth-child(3) {
      padding: 0 0.1rem;
      color: #ff4605;
      background-color: #f9eaeb;
    }

    span:nth-child(4) {
      display: block;
      margin-top: 0.35rem;
      color: #ff4605;
    }
  }

  .p-num {
    position: absolute;
    bottom: 0.23rem;
    right: 0.23rem;
    display: flex;
    width: 1.64rem;
    height: 0.42rem;
    .decrement,
    .increment {
      border: 0.02rem solid #e6e6e6;
      height: 0.42rem;
      line-height: 0.38rem;
      width: 0.44rem;
      text-align: center;
      color: #666;
      margin-left: -0.01rem;
      background-color: #fff;
    }
    .itxt {
      border: 0.02rem solid #e6e6e6;
      width: 0.72rem;
      height: 0.42rem;
      line-height: 0.38rem;
      text-align: center;
      margin-left: -0.01rem;
      font-size: 0.2rem;
      color: #000;
    }
    a:nth-child(1) {
      border-radius: 0.08rem 0 0 0.08rem;
    }
    a:nth-child(3) {
      border-radius: 0 0.08rem 0.08rem 0;
    }
  }
}
.item-co-bg {
  background-color: rgb(248, 248, 248);
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
</style>
