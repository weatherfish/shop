const app = getApp()

Page({
  data: {
    imgUrls: [
      '../../assets/images/start.jpg',
    ],
    indicatorDots: !1,
    autoplay: !1,
    current: 0,
    interval: 3000,
    duration: 1000,
    circular: !1,
  },
  onLoad() { 
    var result = wx.getStorageSync("WX_userInfo_weatherfish")
    console.log("444", result)
    if (result.openId) {
      app.globalData.logged = true
      app.globalData.userInfo = result
    }
  },
  onShow() { },
  swiperload(e) {
    setTimeout(app.globalData.logged ? this.goIndex : this.goLogin, 3000)
  },
  goIndex() {
    wx.navigateTo({
      url: '/pages/index/index',
    })
  },
  goLogin() {
    wx.navigateTo({
      url: '/pages/login/index',
    })
  },
})
