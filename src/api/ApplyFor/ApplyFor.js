import { Post, Get, PostFromData } from '@/api/axios.config'

const SiteManageAjax = {
  showStationDetails (params) {
    // 查看物流公司站点详情
    let result = PostFromData('/crm/Station/show/StationDetails', params)
    return result
  },
  updateStation (params) {
    // 修改站点
    let result = Post('/crm/Station/update/updateCrmLogisticsStation', params)
    return result
  },
  QueryAreaList (params) {
    // 获取省市
    let result = Get('/crm/AreaCode/query/list', params)
    return result
  }
}

export default SiteManageAjax
