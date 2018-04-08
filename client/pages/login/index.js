var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

const app = getApp()

Page({
  data: {
  },
  onLoad() { },
  onShow() {
    app.globalData.logged && setTimeout(this.goIndex, 1500)
  },
  login() {
    this.doLogin(this.goIndex)
  },
  goIndex() {
    wx.navigateTo({
      url: '/pages/index/index',
    })
  },
  showModal() {
    App.WxService.showModal({
      title: '友情提示',
      content: '获取用户登录状态失败，请重新登录',
      showCancel: !1,
    })
  },

  doLogin(callback) {
    // 用户登录示例
    if (app.globalData.logged) return

    util.showBusy('正在登录')
    // 调用登录接口
    qcloud.login({
      success(result) {
        console.log("111", result)
        if (result) {
          util.showSuccess('登录成功')
          app.globalData.userInfo = result
          app.globalData.logged = true
          callback()
        } else {
          // 如果不是首次登录，不会返回用户信息，请求用户信息接口获取
          qcloud.request({
            url: config.service.requestUrl,
            login: true,
            success(result) {
              console.log("222", result)
              util.showSuccess('登录成功')
              app.globalData.userInfo = result
              app.globalData.logged = true
              callback()
            },

            fail(error) {
              util.showModel('请求失败', error)
              console.log('request fail', error)
            }
          })
        }
      },

      fail(error) {
        util.showModel('登录失败', error)
        console.log('登录失败', error)
      }
    })
  }
})