import { Post, Get, PostFromData } from '@/api/axios.config'

const SiteManageAjax = {
  showStationDetails (params) {
    // 查看物流公司站点详情
    let result = PostFromData('/crm/Station/show/StationDetails', params)
    return result
  },
  QueryRoute (params) {
    // 物流官网根据运单号码运行轨迹查询
    let result = PostFromData('/waybill/api/waybillTrajectory/select/officialWaybillTrajectory', params)
    return result
  },
  insertApplication (params) {
    // 合作申请提交
    let result = Post('/crm/cooperation/insert/cooperationApplication', params)
    return result
  },
  QueryAreaList (params) {
    // 获取省市
    let result = Get('/crm/AreaCode/query/list', params)
    return result
  }
}

export default SiteManageAjax
