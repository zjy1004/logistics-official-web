import { Get, GetResponse, PostFromData } from '@/api/axios.config'

const LoginAjax = {
  GetVerificationCode (params) {
    // 获取登录图片验证码
    let result = GetResponse('/captcha/generate', params)
    return result
  },
  Login (params) {
    // 登录
    let result = PostFromData('/crm/auth/login', params)
    return result
  },
  ResetPassword (params) {
    // 重置密码
    let result = PostFromData('/crm/auth/password/reset', params)
    return result
  },
  ValidateUserName (params) {
    // 校验账号是否存在
    let result = Get('/crm/auth/account/valid', params)
    return result
  },
  QueryMenus (params) {
    // 查询用户拥有的菜单
    let result = Get('/crm/auth/queryUserMenus', params)
    return result
  },
  QueryRegistrationAgreement (params) {
    // 根据协议类型查询协议信息1中驰车福物流云平台网站注册服务协议，2物流云“驮付宝”货款收取见证系统使用规则
    let result = PostFromData('/crm/api/crmProtocol/queryProtocolVoByProtocolType', params)
    return result
  },
  QueryProtocolVoList (params) {
    // 查询所有协议
    let result = Get('/crm/api/crmProtocol/queryProtocolVoList', params)
    return result
  }
}

export default LoginAjax
