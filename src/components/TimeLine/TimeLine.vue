<template>
   <div class="time-line">
     <ul class="status">
      <li class="status-item" :class="{'tl-active' : item.status === 1}" v-for="(item, index) in dataArr" :key="index">{{item.i}}</li>
    </ul>
    <el-timeline>
      <el-timeline-item
        placement="top"
        v-for="(activity, index) in dataArr"
        :key="index"
        :type="activity.type"
        :color="activity.color"
        :size="activity.size"
        :timestamp="activity.timestamp">
        {{activity.content}}
      </el-timeline-item>
    </el-timeline>
   </div>
</template>

<script>
export default {
  name: 'TimeLine',
  props: {
    dataArr: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      activities: []
    }
  },
  components: {},
  created () {
    this.resetData()
  },
  methods: {
    resetData () {
      this.dataArr.map((item, index) => {
        if (item.status === 1) {
          item.size = 'large'
          item.type = 'primary'
        }
        return item
      })
    },
    addActiveClass () {
      var timeArr = document.getElementsByClassName('el-timeline-item__timestamp')
      var contentArr = document.getElementsByClassName('el-timeline-item__content')
      this.dataArr.forEach((item, index) => {
        if (item.status === 1) {
          timeArr[index].classList.add('tl-active')
          contentArr[index].classList.add('tl-active')
        }
      })
    }
  },
  mounted () {
    this.addActiveClass()
  }
}
</script>

<style scoped lang="less">
.time-line {
  width: 100%;
  height: 100%;
  display: flex;
  .status {
    // width: 100px;
    margin-right: 35px;
    .status-item {
      // width: 100%;
      height: 40px;
      font-size: 14px;
      color: #909399;
      // margin-bottom: 25px;
      -text-align: center;
    }
  }
}
</style>
<style lang="less">
// @import '../../style/base.less';
.time-line {
  .el-timeline-item {
    height: 40px;
    // line-height: 50px;
    padding-bottom: 0;
  }
  .el-timeline-item__wrapper {
    display: flex;
  }
  .el-timeline-item__timestamp.is-top {
  }
  .el-timeline-item__timestamp {
    font-size: 14px;
    color: #969AA9;
  }
  .el-timeline-item__content {
    color: #969AA9;
    padding-top: 4px;
    margin-left: 63px;
    font-size: 14px;
  }
  .tl-active {
    color: #0A1633!important;
    font-weight: 500;
  }
}
</style>
