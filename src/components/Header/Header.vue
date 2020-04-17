<template>
   <div class="header">
     <div class="header-wrap">
       <div class="h-logo"></div>
       <ul class="h-tab">
        <li :class="{'li-active' : index === activeIndex}" v-for="(item, index) in tabList" :key="index" @click="handleClick(index)">{{item.name}}</li>
      </ul>
      <div class="h-left">
        <ul class="l-text">
          <li class="t-left">商家后台</li>
          <li class="t-line"></li>
          <li class="t-right">物流货源推荐</li>
        </ul>
        <div class="h-phone">
          <div class="p-icon"><img src="../../images/Telephone-icon.png" alt=""></div>
          <div class="p-num">400-008-8122</div>
        </div>
      </div>
     </div>
   </div>
</template>

<script type="">
export default {
  name: 'Header',
  components: {},
  data () {
    return {
      activeIndex: 0,
      tabList: [
        {tabIndex: 0, name: '首页'},
        {tabIndex: 1, name: '物流查询'},
        {tabIndex: 2, name: '合作伙伴'},
        {tabIndex: 3, name: '关于我们'}
      ]
    }
  },
  methods: {
    handleClick (index) {
      switch (index) {
        case 0:
          this.$router.push({name: 'Index'})
          break
        case 1:
          this.$router.push({name: 'LogisticsQuery'})
          break
        case 2:
          this.$router.push({name: 'Partner'})
          break
        case 3:
          this.$router.push({name: 'AboutUs'})
          break
        default:
          break
      }
    }
  },
  computed: {
    routeName () {
      return this.$route.name
    }
  },
  watch: {
    routeName (newVal, oldVal) {
      switch (newVal) {
        case 'Index':
          this.activeIndex = 0
          break
        case 'LogisticsQuery':
          this.activeIndex = 1
          break
        case 'Partner':
          this.activeIndex = 2
          break
        case 'AboutUs':
          this.activeIndex = 3
          break
        default:
          break
      }
    }
  }
}
</script>

<style scoped lang="less">
.header {
  height: 100px;
  width: 1920px;
  background: #fff;
  padding: 0 360px;
  .header-wrap {
    width: 1200px;
    height: 100%;
    display: flex;
    .h-logo {
      width: 160px;
      height: 48px;
      margin-top: 26px;
      background: url('../../images/logo.png') no-repeat;
      background-size:100% 100%;
    }
    .h-tab {
      display: flex;
      min-width: 338px;
      height: 30px;
      align-items: center;
      justify-content: space-between;
      margin-top: 33px;
      margin-left: 123px;
      li {
        list-style: none;
        height: 30px;
        width: auto;
        color: #0A1633;
        font-weight:bold;
        cursor: pointer;
      }
      li:hover {
        color: #5982F7;
      }
      .li-active {
        color: #5982F7;
        border-bottom: 4px solid rgba(58,98,244,1);
        transition: all 0.3s;
      }
    }
    .h-left {
      display: flex;
      width: 388px;
      margin-left: 190px;
      justify-content: space-between;
      .l-text {
        // width: auto;
        height:15px;
        font-size:14px;
        font-weight:400;
        color:rgba(107,111,126,1);
        margin-top: 34px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        li {
          line-height: 15px;
          height: 15px;
          width: auto;
        }
        .t-line {
          width:1px;
          height:14px;
          margin-left: 6px;
          background:rgba(199,202,214,1);
        }
        .t-right {
          margin-left: 6px;
        }
      }
      .h-phone {
        margin-top: 32px;
        display: flex;
        .p-icon {
          width:18px;
          height:17px;
        }
        .p-num {
          // min-width:143px;
          height:17px;
          font-size:22px;
          margin-left: 8px;
          font-family:Arial;
          font-weight:bold;
          color:rgba(63,66,77,1);
          line-height:20px;
        }
      }
    }
  }
}
</style>
