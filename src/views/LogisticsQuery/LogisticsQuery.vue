<template>
   <div class="logistics-query">
     <div class="q-search">
       <div class="s-tltle">运单查询</div>
       <div class="s-wrap">
         <div class="w-input">
           <el-input
            placeholder="请输入运单号进行查询"
            v-model="form.waybillNumber">
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
         <div id="map-container" class="r-map"></div>
         <div class="r-info">
           <div class="i-top"  v-show="infoShow">
             <div>
                <span class="t-span-left">运单号:</span>
                <span class="t-span-right">{{waybillNumber}}</span>
             </div>
             <div class="empty-box"></div>
             <div v-show="isReceive">
               <span class="t-span-left">签收时间:</span>
              <span class="t-span-right">{{submissionTime}}</span>
             </div>
           </div>
           <div class="i-bottom"  v-show="infoShow">
             <div class="b-text">{{sendClientName}}</div>
             <div class="b-icon">
               </div>
             <div class="b-text">{{receiveClientName}}</div>
           </div>
         </div>
        <div class="r-desc">
           <time-line
            v-show="infoShow"
            :dataArr=waybillTransportInfoList
          />
         </div>
       </div>
     </div>
   </div>
</template>

<script type="">
import MapLoader from '@/assets/AMap.js'
// import posIcon from '@/images/pos-icon.gif'
import carIcon from '@/images/trucks.gif'
import TimeLine from '@/components/TimeLine/TimeLine'
import WaybillQueryAjax from '@/api/WaybillQuery/WaybillQuery.js'
export default {
  name: 'LogisticsQuery',
  components: {
    TimeLine
  },
  data () {
    return {
      form: {
        waybillNumber: ''
      },
      infoShow: false,
      waybillNumber: '',
      receiveClientName: '',
      sendClientName: '',
      submissionTime: '',
      waybillTransportInfoList: [], // 途径信息
      waybillTrajectoryList: [], // 运单轨迹list
      map: null,
      mapOption: {
        resizeEnable: true,
        center: ['116.407387', '39.904179'],
        zoom: 10
      },
      // startPosition: ['112.938888', '28.228272'],
      // driverPosition: ['113.625351', '34.746303'],
      // endPosition: ['116.407387', '39.904179'],
      startPosition: ['', ''],
      driverPosition: ['', ''],
      endPosition: ['', ''],
      realPath: []
    }
  },
  computed: {
    isReceive () {
      return this.waybillTransportInfoList.some(item => {
        return item.operateType === 3
      })
    }
  },
  methods: {
    delWaybill () {
      this.form.waybillNumber = ''
    },
    search () {
      if (this.form.waybillNumber === '') {
        this.$notify({
          type: 'error',
          message: '运单号不能为空！'
        })
      } else {
        this.mapInit('search')
      }
    },
    resetForm () {
      return new Promise((resolve, reject) => {
        this.infoShow = false
        this.receiveClientName = ''
        this.sendClientName = ''
        this.waybillNumber = ''
        this.submissionTime = ''
        this.waybillTransportInfoList = [] // 途径信息
        this.waybillTrajectoryList = [] // 运单轨迹list
        this.mapOption = {
          resizeEnable: true,
          center: ['116.407387', '39.904179'],
          zoom: 10
        }
        this.startPosition = ['', '']
        this.driverPosition = ['', '']
        this.endPosition = ['', '']
        this.realPath = []
        resolve()
      })
    },
    mapInit (flag) {
      MapLoader().then(AMap => {
        this.map = new AMap.Map('map-container', this.mapOption)
        this.setControlBar(AMap)
        if (flag === 'default') {
          // this.setNewCenter()
        }
        if (flag === 'search') {
          // this.initRoute(AMap)
          // this.drawLine([this.startPosition, this.driverPosition], AMap, 'real')
          this.resetForm().then(() => {
            WaybillQueryAjax.QueryRoute({waybillNumber: this.form.waybillNumber}).then(res => {
              if (res.code === 200) {
                if (res.data !== null && res.data !== '') {
                  this.infoShow = true
                  let resData = res.data
                  this.sendClientName = resData.sendClientName
                  this.receiveClientName = resData.receiveClientName
                  this.submissionTime = resData.submissionTime
                  this.waybillNumber = resData.waybillNumber
                  if (resData.waybillTransportInfoList !== null && resData.waybillTransportInfoList !== '') {
                    this.waybillTransportInfoList = resData.waybillTransportInfoList.map((item, index) => {
                      if (index === 0) {
                        item.size = 'large'
                        item.type = 'primary'
                      }
                      switch (item.operateType) {
                        case 1:
                          item.operateTypeName = '待发车'
                          break
                        case 2:
                          item.operateTypeName = '运输中'
                          break
                        case 3:
                          item.operateTypeName = '已签收'
                          break
                        case 4:
                          item.operateTypeName = '已拒签'
                          break
                        default:
                          break
                      }
                      return item
                    })
                  }
                  if (resData.waybillTrajectoryList !== null && resData.waybillTrajectoryList !== '') {
                    this.waybillTrajectoryList = resData.waybillTrajectoryList
                    resData.waybillTrajectoryList.forEach((item, index) => {
                      this.realPath.push([item.longitude, item.latitude])
                    })
                    if (this.realPath.length > 1) {
                      this.drawLine(this.realPath, AMap, 'real')
                    }
                    let waybillTrajectoryLen = resData.waybillTrajectoryList.length
                    if (waybillTrajectoryLen === 1) {
                      this.driverPosition[0] = resData.waybillTrajectoryList[0].longitude
                      this.driverPosition[1] = resData.waybillTrajectoryList[0].latitude
                      this.endPosition[0] = resData.waybillTrajectoryList[0].longitude
                      this.endPosition[1] = resData.waybillTrajectoryList[0].latitude
                      this.drawMarker(AMap)
                    } else if (waybillTrajectoryLen === 2) {
                      this.startPosition[0] = resData.waybillTrajectoryList[0].longitude
                      this.startPosition[1] = resData.waybillTrajectoryList[0].latitude
                      this.driverPosition[0] = resData.waybillTrajectoryList[1].longitude
                      this.driverPosition[1] = resData.waybillTrajectoryList[1].latitude
                      this.endPosition[0] = resData.waybillTrajectoryList[1].longitude
                      this.endPosition[1] = resData.waybillTrajectoryList[1].latitude
                      this.drawMarker(AMap)
                    } else if (waybillTrajectoryLen > 2) {
                      this.startPosition[0] = resData.waybillTrajectoryList[0].longitude
                      this.startPosition[1] = resData.waybillTrajectoryList[0].latitude
                      this.driverPosition[0] = resData.waybillTrajectoryList[waybillTrajectoryLen - 1].longitude
                      this.driverPosition[1] = resData.waybillTrajectoryList[waybillTrajectoryLen - 1].latitude
                      this.endPosition[0] = resData.waybillTrajectoryList[waybillTrajectoryLen - 1].longitude
                      this.endPosition[1] = resData.waybillTrajectoryList[waybillTrajectoryLen - 1].latitude
                      this.drawMarker(AMap)
                    }
                  }
                }
              }
            })
          })
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
      let len = this.waybillTrajectoryList.length
      if (len === 1) {
        if (this.isReceive) {
          let endMarker = new AMap.Marker({
            map: this.map,
            draggable: false,
            position: this.endPosition,
            riseOnHover: true,
            title: '收货方',
            icon: new AMap.Icon({
              size: new AMap.Size(0, 0), // 图标的大小
              image: ''
            }),
            autoRotation: true,
            angle: 0
          })
          endMarker.setLabel({
            offset: new AMap.Pixel(0, 0), // 设置文本标注偏移量
            // content: `<div class='info'><div class='i-left'>收</div><div class='i-right'>${this.endName}</div></div>`, // 设置文本标注内容
            content: `<div class='rec-info'>收</div>`, // 设置文本标注内容
            direction: 'right' // 设置文本标注方位
          })
          this.map.add(endMarker)
          // this.map.setFitView(endMarker)
          this.setNewCenter()
        } else {
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
          this.map.add(driverMarker)
          // this.map.setFitView(driverMarker)
          this.setNewCenter()
        }
      }
      if (len > 1) {
        if (this.isReceive) {
          let startMarker = new AMap.Marker({
            map: this.map, // 要显示该marker的地图对象
            draggable: false, // 设置点标记是否可拖拽移动，默认为false
            position: this.startPosition, // 点标记在地图上显示的位置，默认为地图中心点
            riseOnHover: true,
            title: '发货方',
            icon: new AMap.Icon({
              size: new AMap.Size(0, 0), // 图标的大小
              image: ''
            }),
            autoRotation: true,
            angle: 0
          })
          startMarker.setLabel({
            offset: new AMap.Pixel(0, 0), // 设置文本标注偏移量
            // content: `<div class='info'><div class='i-left'>收</div><div class='i-right'>${this.endName}</div></div>`, // 设置文本标注内容
            content: `<div class='send-info'>发</div>`, // 设置文本标注内容
            direction: 'right' // 设置文本标注方位
          })
          let endMarker = new AMap.Marker({
            map: this.map,
            draggable: false,
            position: this.endPosition,
            riseOnHover: true,
            title: '收货方',
            icon: new AMap.Icon({
              size: new AMap.Size(0, 0), // 图标的大小
              image: ''
            }),
            autoRotation: true,
            angle: 0
          })
          endMarker.setLabel({
            offset: new AMap.Pixel(-3, 0), // 设置文本标注偏移量
            // content: `<div class='info'><div class='i-left'>收</div><div class='i-right'>${this.endName}</div></div>`, // 设置文本标注内容
            content: `<div class='rec-info'>收</div>`, // 设置文本标注内容
            direction: 'right' // 设置文本标注方位
          })
          this.map.add([startMarker, endMarker])
          // this.map.setFitView([startMarker, endMarker])
          this.setNewCenter()
        } else {
          let startMarker = new AMap.Marker({
            map: this.map, // 要显示该marker的地图对象
            draggable: false, // 设置点标记是否可拖拽移动，默认为false
            position: this.startPosition, // 点标记在地图上显示的位置，默认为地图中心点
            riseOnHover: true,
            title: '发货方',
            icon: new AMap.Icon({
              size: new AMap.Size(0, 0), // 图标的大小
              image: ''
            }),
            autoRotation: true,
            angle: 0
          })
          startMarker.setLabel({
            offset: new AMap.Pixel(0, 0), // 设置文本标注偏移量
            // content: `<div class='info'><div class='i-left'>收</div><div class='i-right'>${this.endName}</div></div>`, // 设置文本标注内容
            content: `<div class='send-info'>发</div>`, // 设置文本标注内容
            direction: 'right' // 设置文本标注方位
          })
          let driverMarker = new AMap.Marker({
            map: this.map,
            draggable: false,
            position: new AMap.LngLat(this.driverPosition[0], this.driverPosition[1]),
            riseOnHover: true,
            icon: new AMap.Icon({
              size: new AMap.Size(45, 50), // 图标的大小
              image: carIcon
            }),
            autoRotation: true,
            angle: 0
          })
          this.map.add([startMarker, driverMarker])
          // this.map.setFitView([startMarker, driverMarker])
          this.setNewCenter()
        }
      }
    },
    // 根据司机坐标重新设置中心点
    setNewCenter () {
      let newCenter = this.map.setFitView()
      this.mapOption.center[0] = newCenter.pc.lng
      this.mapOption.center[1] = newCenter.pc.lat
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
    background: url('../../images/wlcx.png') no-repeat;
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
          display: flex;
          align-items: center;
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
        .rec-info {
          height: 25px;
          width: 25px;
          text-align: center;
          line-height: 25px;
          background-color: #FF9900;
          color: #fff;
          font-size: 14px;
          font-weight: bold;
        }
        .send-info {
          height: 25px;
          line-height: 25px;
          width: 25px;
          text-align: center;
          background-color: #33cccc;
          color: #fff;
          font-size: 14px;
          font-weight: bold;
        }
        // .info{
        //   font-weight: bold;
        //   text-align: center;
        //   font-size: 14px;
        //   display: flex;
        //   border-radius: 5px;
        //   .i-left{
        //     width: 25px;
        //     height: 25px;
        //     line-height: 25px;
        //     background-color: #FF9900;
        //     color: #fff;
        //   }
        //   .i-right{
        //     width: 55px;
        //     height: 25px;
        //     line-height: 25px;
        //     background-color: #fff;
        //     color: #000;
        //   }
        // }
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
