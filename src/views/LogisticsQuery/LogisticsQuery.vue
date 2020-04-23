<template>
   <div class="logistics-query">
     <div class="q-search">
       <div class="s-tltle">运单查询</div>
       <div class="s-wrap">
         <div class="w-input">
           <el-input
            placeholder="请输入运单号进行查询"
            v-model="searchVal">
          </el-input>
         </div>
         <div class="w-icon" @click="delWaybill()">
           <img src="../../images/Trash.png" alt="">
         </div>
         <div class="w-btn" @click="search()">查询</div>
       </div>
     </div>
     <div class="q-route">
       <div class="route-wrap">
         <div id="map-container" class="r-map">1</div>
         <div class="r-info">
           <div class="i-top">
             <div>
                <span class="t-span-left">运单号:</span>
                <span class="t-span-right">289840466019</span>
             </div>
             <div class="empty-box"></div>
             <div>
               <span class="t-span-left">签收时间:</span>
              <span class="t-span-right">2019-09-05 12:32:01</span>
             </div>
             <!-- <span class="t-span-left">运单号:</span>
             <span class="t-span-right">289840466019</span>
             <span class="t-span-left" style="margin-left: 94px;">签收时间:</span>
             <span class="t-span-left">签收时间:</span>
             <span class="t-span-right">2019-09-05 12:32:01</span> -->
           </div>
           <div class="i-bottom">
             <div class="b-text">杭州市</div>
             <div class="b-icon">
               <!-- <img src="../../images/orange.png" alt=""> -->
               </div>
             <div class="b-text">北京市</div>
           </div>
         </div>
         <div class="r-desc">
           <time-line
            :dataArr=activities
          />
         </div>
       </div>
     </div>
   </div>
</template>

<script type="">
import MapLoader from '@/assets/AMap.js'
import posIcon from '@/images/pos-icon.gif'
import carIcon from '@/images/car2.gif'
import TimeLine from '@/components/TimeLine/TimeLine'
export default {
  name: 'LogisticsQuery',
  components: {
    TimeLine
  },
  data () {
    return {
      searchVal: '',
      activities: [
        { i: '已签收', status: 1, content: '支持使用图标', timestamp: '2018-04-12 20:46' },
        { i: '运输中', status: 0, content: '支持使用图标', timestamp: '2018-04-12 20:46' },
        { i: '分拣中', status: 1, content: '支持使用图标', timestamp: '2018-04-12 20:46' },
        { i: '已签收', status: 0, content: '支持使用图标', timestamp: '2018-04-12 20:46' },
        { i: '已签收', status: 0, content: '支持使用图标', timestamp: '2018-04-12 20:46' },
        { i: '已签收', status: 0, content: '支持使用图标', timestamp: '2018-04-12 20:46' },
        { i: '已签收', status: 0, content: '支持使用图标', timestamp: '2018-04-12 20:46' },
        { i: '已签收', status: 0, content: '支持使用图标', timestamp: '2018-04-12 20:46' },
        { i: '已签收', status: 0, content: '支持使用图标', timestamp: '2018-04-12 20:46' }
      ],
      endName: '长沙市',
      map: null,
      mapOption: {
        resizeEnable: true,
        center: ['116.23661', '40.06667'],
        zoom: 13
      },
      startPosition: ['116.407387', '39.904179'],
      driverPosition: ['113.625351', '34.746303'],
      endPosition: ['114.075031', '32.123274']
    }
  },
  methods: {
    delWaybill () {
      this.searchVal = ''
    },
    search () {
      this.mapInit('search')
    },
    mapInit (flag) {
      MapLoader().then(AMap => {
        this.map = new AMap.Map('map-container', this.mapOption)
        this.setControlBar(AMap)
        // this.drawMarker(AMap)
        // this.initRoute(AMap)
        // this.drawLine([this.startPosition, this.driverPosition], AMap, 'real')
        // this.drawDefaultMarker(AMap)
        // this.initDefaultRoute(AMap)
        // this.setNewCenter()
        if (flag === 'default') {
          this.drawDefaultMarker(AMap)
          this.initDefaultRoute(AMap)
          this.setNewCenter()
        }
        if (flag === 'search') {
          this.drawMarker(AMap)
          this.initRoute(AMap)
          this.drawLine([this.startPosition, this.driverPosition], AMap, 'real')
          this.setNewCenter()
        }
      }, e => {
        console.log('地图加载失败', e)
      })
    },
    // 设置控制组件
    setControlBar (AMap) {
      AMap.plugin(['AMap.ToolBar', 'AMap.Scale', 'AMap.Autocomplete', 'AMap.Driving', 'AMap.Geolocation'], () => {
        let toolbar = new AMap.ToolBar({position: 'RB', liteStyle: true})
        // let scale = new AMap.Scale({position: 'LT'})
        var autoOptions = {
          // city 限定城市，默认全国
          city: '全国'
        }
        // let geolocation = new AMap.Geolocation({
        //   enableHighAccuracy: true, // 是否使用高精度定位，默认:true
        //   timeout: 10000, // 超过10秒后停止定位，默认：无穷大
        //   maximumAge: 0, // 定位结果缓存0毫秒，默认：0
        //   convert: true, // 自动偏移坐标，偏移后的坐标为高德坐标，默认：true
        //   showButton: true, // 显示定位按钮，默认：true
        //   buttonPosition: 'LB', // 定位按钮停靠位置，默认：'LB'，左下角
        //   buttonOffset: new AMap.Pixel(10, 20), // 定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
        //   showMarker: true, //  定位成功后在定位到的位置显示点标记，默认：true
        //   showCircle: true, // 定位成功后用圆圈表示定位精度范围，默认：true
        //   panToLocation: true, // 定位成功后将定位到的位置作为地图中心点，默认：true
        //   zoomToAccuracy: true // 定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        // })
        let complate = new AMap.Autocomplete(autoOptions)
        this.map.addControl(toolbar)
        // this.map.addControl(scale)
        this.map.addControl(complate)
        // this.map.addControl(geolocation)
      })
    },
    // 绘制标记点
    drawMarker (AMap) {
      let startMarker = new AMap.Marker({
        map: this.map, // 要显示该marker的地图对象
        draggable: false, // 设置点标记是否可拖拽移动，默认为false
        position: this.startPosition, // 点标记在地图上显示的位置，默认为地图中心点
        riseOnHover: true,
        icon: new AMap.Icon({
          size: new AMap.Size(35, 40), // 图标的大小
          image: posIcon
        }),
        autoRotation: true,
        angle: 0
      })
      let driverMarker = new AMap.Marker({
        map: this.map,
        draggable: false,
        position: new AMap.LngLat(this.driverPosition[0], this.driverPosition[1]),
        riseOnHover: true,
        icon: new AMap.Icon({
          size: new AMap.Size(35, 40), // 图标的大小
          image: carIcon
        }),
        autoRotation: true,
        angle: 0
      })
      let endMarker = new AMap.Marker({
        map: this.map,
        draggable: false,
        position: this.endPosition,
        riseOnHover: true,
        title: '收货方',
        // icon: new AMap.Icon({
        //   size: new AMap.Size(35, 40), // 图标的大小
        //   image: posIcon
        // }),
        autoRotation: true,
        angle: 0
      })
      endMarker.setLabel({
        offset: new AMap.Pixel(-3, 0), // 设置文本标注偏移量
        // content: `<div class='info'><div class='i-left'>收</div><div class='i-right'>${this.endName}</div></div>`, // 设置文本标注内容
        content: `<div class='info'><div class='i-left'>收</div><div class='i-right'>${this.endName}</div></div>`, // 设置文本标注内容
        direction: 'right' // 设置文本标注方位
      })
      this.map.add([startMarker, driverMarker, endMarker])
    },
    // 绘制标记点
    drawDefaultMarker (AMap) {
      let startMarker = new AMap.Marker({
        map: this.map, // 要显示该marker的地图对象
        draggable: false, // 设置点标记是否可拖拽移动，默认为false
        position: this.startPosition, // 点标记在地图上显示的位置，默认为地图中心点
        riseOnHover: true,
        icon: new AMap.Icon({
          size: new AMap.Size(35, 40), // 图标的大小
          image: posIcon
        }),
        autoRotation: true,
        angle: 0
      })
      let endMarker = new AMap.Marker({
        map: this.map,
        draggable: false,
        position: this.endPosition,
        riseOnHover: true,
        title: '收货方',
        // icon: new AMap.Icon({
        //   size: new AMap.Size(35, 40), // 图标的大小
        //   image: posIcon
        // }),
        autoRotation: true,
        angle: 0
      })
      endMarker.setLabel({
        offset: new AMap.Pixel(-3, 0), // 设置文本标注偏移量
        // content: `<div class='info'><div class='i-left'>收</div><div class='i-right'>${this.endName}</div></div>`, // 设置文本标注内容
        content: `<div class='info'><div class='i-left'>收</div><div class='i-right'>${this.endName}</div></div>`, // 设置文本标注内容
        direction: 'right' // 设置文本标注方位
      })
      this.map.add([startMarker, endMarker])
    },
    // 根据司机坐标重新设置中心点
    setNewCenter () {
      let newCenter = this.map.setFitView()
      this.mapOption.center[0] = newCenter.pc.lng
      this.mapOption.center[1] = newCenter.pc.lat
    },
    // 绘制默认导航线路
    initDefaultRoute (AMap) {
      let drivingOption = {
        policy: AMap.DrivingPolicy.LEAST_TIME, // 路线规划策略
        ferry: 1, // 是否可以使用轮渡
        hideMarkers: false,
        showTraffic: true, // 是否显示实时路况信息
        isOutline: true, // 是否显示描边
        outlineColor: 'white', // 描边颜色
        autoFitView: false // 是否自动调整视野
      }
      let driving = new AMap.Driving(drivingOption)
      driving.search(new AMap.LngLat(this.startPosition[0], this.startPosition[1]), new AMap.LngLat(this.endPosition[0], this.endPosition[1]), (status, result) => {
        if (status === 'complete') {
          if (result.routes && result.routes.length) {
            // 绘制第一条路线，也可以按需求绘制其它几条路线
            this.drawDefaultLine(result.routes[0], AMap, 'project')
          }
        } else {
          console.log('获取驾车数据失败：' + result)
        }
      })
    },
    // 绘制导航线路
    initRoute (AMap) {
      let drivingOption = {
        policy: AMap.DrivingPolicy.LEAST_TIME, // 路线规划策略
        ferry: 1, // 是否可以使用轮渡
        hideMarkers: false,
        showTraffic: true, // 是否显示实时路况信息
        isOutline: true, // 是否显示描边
        outlineColor: 'white', // 描边颜色
        autoFitView: false // 是否自动调整视野
      }
      let driving = new AMap.Driving(drivingOption)
      driving.search(new AMap.LngLat(this.driverPosition[0], this.driverPosition[1]), new AMap.LngLat(this.endPosition[0], this.endPosition[1]), (status, result) => {
        if (status === 'complete') {
          if (result.routes && result.routes.length) {
            // 绘制第一条路线，也可以按需求绘制其它几条路线
            this.drawLine(result.routes[0], AMap, 'project')
          }
        } else {
          console.log('获取驾车数据失败：' + result)
        }
      })
    },
    drawLine (route, AMap, flag) {
      if (flag === 'project') {
        let path = this.parseRouteToPath(route)
        let routeLine = new AMap.Polyline({
          path: path,
          isOutline: true,
          outlineColor: '#ffeeee',
          borderWeight: 2,
          strokeWeight: 4,
          strokeColor: '#888',
          strokeStyle: 'dashed',
          lineJoin: 'round'
        })
        routeLine.setMap(this.map)
      }
      if (flag === 'real') {
        let path = route
        let routeLine = new AMap.Polyline({
          path: path,
          isOutline: true,
          outlineColor: '#ffeeee',
          borderWeight: 2,
          strokeWeight: 5,
          strokeColor: '#5677fc',
          lineJoin: 'round'
        })
        routeLine.setMap(this.map)
      }
      // 调整视野达到最佳显示区域
      // this.map.setFitView([ startMarker, endMarker, routeLine ])
    },
    drawDefaultLine (route, AMap) {
      let path = this.parseRouteToPath(route)
      let routeLine = new AMap.Polyline({
        path: path,
        isOutline: true,
        outlineColor: '#ffeeee',
        borderWeight: 2,
        strokeWeight: 4,
        strokeColor: '#5677fc',
        lineJoin: 'round'
      })
      routeLine.setMap(this.map)
    },
    parseRouteToPath (route) {
      let path = []
      for (let i = 0, l = route.steps.length; i < l; i++) {
        let step = route.steps[i]
        for (let j = 0, n = step.path.length; j < n; j++) {
          path.push(step.path[j])
        }
      }
      return path
    }
  },
  mounted () {
    this.mapInit('default')
  }
}
</script>

<style scoped lang="less">
.logistics-query {
  min-width: 1280px;
  .q-search {
    min-width: 1280px;
    height: 310px;
    background: url('../../images/物流查询.png') no-repeat;
    background-size: 100% 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .s-tltle {
      font-size:36px;
      font-weight:400;
      color:rgba(255,255,255,1);
    }
    .s-wrap {
      width:660px;
      height:50px;
      margin-top: 40px;
      background:rgba(255,255,255,1);
      box-shadow:0px 1px 18px 0px rgba(204,204,204,0.2);
      border-radius:4px;
      display: flex;
      .w-input {
        width: 536px;
        height: 50px;
        margin-left: 12px;
      }
      .w-icon {
        width: 40px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        img { width: 16px; height: 16px; }
      }
      .w-btn {
        width: 72px;
        height: 50px;
        background:rgba(244,109,0,1);
        border-radius:0px 4px 4px 0px;
        color:rgba(255,255,255,1);
        font-size: 14px;
        line-height: 50px;
        text-align: center;
        cursor: pointer;
      }
    }
  }
  .q-route {
    height: 1133px;
    background: rgba(246,248,251,1);
    display: flex;
    align-items: center;
    justify-content: center;
    .route-wrap {
      width: 1200px;
      height: 1033px;
      background:rgba(255,255,255,1);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .r-map { width: 1000px; height: 444px; }
      .r-info {
        width: 1000px;
        height: 124px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        border-bottom: 1px solid rgba(241,241,241,1);
        .i-top {
          height: 20px;
          // line-height: 20px;
          // width: 480px;
          display: flex;
          align-items: center;
          // justify-content: space-between;
          .t-span-left { font-size:14px; color:rgba(150,154,169,1); }
          .t-span-right { font-size:14px; color:rgb(10,22,51,1); margin-left: 12px;}
          .empty-box { width: 94px; height: 20px; }
        }
        .i-bottom {
          margin-top: 18px;
          width: 450px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .b-text { font-size:18px; color:rgba(10,22,51,1); }
          .b-icon {
            width: 84px;
            height: 4px;
            background: url('../../images/orange.png') no-repeat;
            background-size: 100% 100%;
          }
        }
      }
      .r-desc {
        width: 1000px;
        height: 330px;
        margin-top: 54px;
        overflow-y: auto;
      }
    }
  }
}
</style>

<style lang="less">
  .logistics-query {
    .el-input {
      width: 538px;
      height: 50px;
      font-size: 14px;
    }
    .el-input--suffix .el-input__inner {
      padding-right: 0;
    }
    .el-input__inner {
      height: 50px;
      line-height: 50px;
      border: none;
      padding: 0;
      font-size: 14px;
      color: #000;
      &::-webkit-input-placeholder {
        /* WebKit browsers 适配谷歌 */
        color:rgba(185,189,204,1);
      }
      &::-moz-placeholder {
        /* Mozilla Firefox 19+ 适配火狐 */
        color:rgba(185,189,204,1);
      }

      &:-ms-input-placeholder {
        /* Internet Explorer 10+  适配ie*/
        color:rgba(185,189,204,1);
      }
    }
    #map-container {
      .amap-marker-label{
        border: none;
        background: #fff;
        opacity: 1;
        padding: 0;
        .info{
          font-weight: bold;
          // width: 80px;
          // height: 25px;
          text-align: center;
          // line-height: 25px;
          font-size: 14px;
          display: flex;
          border-radius: 5px;
          // border: 1px solid #000;
          // background-color: #FF9900;
          .i-left{
            width: 25px;
            height: 25px;
            line-height: 25px;
            background-color: #FF9900;
            color: #fff;
          }
          .i-right{
            width: 55px;
            height: 25px;
            line-height: 25px;
            background-color: #fff;
            color: #000;
          }
        }
      }
      .amap-icon{
        img{
          width: 90%!important;
          height: 100%!important;
        }
      }
    }
  }
</style>
