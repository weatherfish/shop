//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')
var util = require('./utils/util.js')

App({
  globalData: {
    appId: config.service.appId,
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
  },

  onLaunch: function (opt) {
    console.log("app onLaunch")
    var that = this
    that.globalData.opt = opt
    wx.showShareMenu({
      withShareTicket: true
    })
    qcloud.setLoginUrl(config.service.loginUrl)

    
  },

  pageGetUserInfo(page, openIdReadyCallback) { //在page中获取用户信息
    var that = this
    const userInfo = that.globalData.userInfo
    console.log("3333",userInfo)
    if (userInfo) {
      page.setData({
        userInfo,
        openId: userInfo.openId
      })
      if (openIdReadyCallback) {
        openIdReadyCallback(userInfo.openId)
      }
    } else {
      this.userInfoReadyCallback = (userInfo) => {  //获取用户信息后的回调函数
        page.setData({  //每个page都会自动存储userInfo和openId
          userInfo,
          openId: userInfo.openId
        })
        if (openIdReadyCallback) {  //如果设置了openid的回调函数，则调用回调
          openIdReadyCallback(userInfo.openId)
        }
      }
    }
  },

  // 切换是否带有登录态
  switchRequestMode: function (e) {
    this.globalData.takeSession = e.detail.value
    this.doRequest()
  },

  doRequest: function () {
    util.showBusy('请求中...')
    var options = {
      url: config.service.requestUrl,
      login: true,
      success(result) {
        util.showSuccess('请求成功完成')
        console.log('request success', result)
        this.globalData.requestResult = JSON.stringify(result.data)

      },
      fail(error) {
        util.showModel('请求失败', error);
        console.log('request fail', error);
      }
    }
    if (this.globalData.takeSession) {  // 使用 qcloud.request 带登录态登录
      qcloud.request(options)
    } else {    // 使用 wx.request 则不带登录态
      wx.request(options)
    }
  },
})