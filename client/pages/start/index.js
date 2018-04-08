const app = getApp()

Page({
  data: {
    indicatorDots: !1,
    autoplay: !1,
    current: 0,
    interval: 3000,
    duration: 1000,
    circular: !1,
  },
  onLoad() { },
  onShow() { },
  bindload(e) {
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
