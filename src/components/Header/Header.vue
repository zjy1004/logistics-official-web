<template>
   <div class="header">
     <div class="header-wrap">
       <div class="logo"></div>
       <ul class="tab">
        <li :class="{'li-active' : index === activeIndex}" v-for="(item, index) in tabList" :key="index" @click="handleClick(index)">{{item.name}}</li>
      </ul>
      <div class="title">
        <span>商家后台</span><span class="line"></span><span>物流货源推荐</span>
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
  width: 100%;
  background: #fff;
  .header-wrap {
    width: 1200px;
    height: 100%;
    margin: 0 auto;
    display: flex;
    .logo {
      width: 160px;
      height: 48px;
      margin-top: 26px;
      background: url('../../images/logo.png') no-repeat;
      background-size:100% 100%;
    }
    .tab {
      display: flex;
      width: 338px;
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
      }
    }
    .title {
      width:169px;
      height:15px;
      font-size:14px;
      font-family:Microsoft YaHei;
      font-weight:400;
      color:rgba(107,111,126,1);
      margin-top: 34px;
      margin-left: 191px;
      .line {
        display: inline-block;
        margin: 0 4px;
        width:1px;
        height:14px;
        background:rgba(199,202,214,1);
      }
    }
  }
}
</style>
