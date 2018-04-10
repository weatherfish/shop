//index.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

const app = getApp()

Page({
    data: {
      activeIndex: 0,
      navList: [],
      indicatorDots: !0,
      autoplay: !1,
      current: 0,
      interval: 3000,
      duration: 1000,
      circular: !0,
      goods: {},
      prompt: {
        hidden: !0,
      },
    },
    swiperchange(e) {
      // console.log(e.detail.current)
    },
    onLoad(){
      app.pageGetUserInfo(this)
      
      this.banner = 
      
      app.HttpResource('/banner/:id', { id: '@id' })
      this.goods = app.HttpResource('/goods/:id', { id: '@id' })
      this.classify = app.HttpResource('/classify/:id', { id: '@id' })

      this.getBanners()
      this.getClassify()
    },
     initData() {
      const type = this.data.goods.params && this.data.goods.params.type || ''
      const goods = {
        items: [],
        params: {
          page: 1,
          limit: 10,
          type: type,
        },
        paginate: {}
      }

      this.setData({
        goods: goods
      })
    },

     navigateTo(e) {
       console.log(e)
       wx.navigateTo({
         url: '/pages/goods/detail/index',
       })
     }, 
     search() {
       wx.navigateTo({
         url: '/pages/search/index',
       })
     },
     getBanners() {
       // App.HttpService.getBanners({is_show: !0})
       this.banner.queryAsync({ is_show: !0 })
         .then(res => {
           const data = res.data
           console.log(data)
           if (data.meta.code == 0) {
             data.data.items.forEach(n => n.path = app.renderImage(n.images[0].path))
             this.setData({
               images: data.data.items
             })
           }
         })
     },
     getClassify() {
       const activeIndex = this.data.activeIndex

       // App.HttpService.getClassify({
       //     page: 1, 
       //     limit: 4, 
       // })
       this.classify.queryAsync({
         page: 1,
         limit: 4,
       })
         .then(res => {
           const data = res.data
           console.log(data)
           if (data.meta.code == 0) {
             this.setData({
               navList: data.data.items,
               'goods.params.type': data.data.items[activeIndex]._id
             })
             this.onPullDownRefresh()
           }
         })
     },
     getList() {
       const goods = this.data.goods
       const params = goods.params

       // App.HttpService.getGoods(params)
       this.goods.queryAsync(params)
         .then(res => {
           const data = res.data
           console.log(data)
           if (data.meta.code == 0) {
             data.data.items.forEach(n => n.thumb_url = App.renderImage(n.images[0] && n.images[0].path))
             goods.items = [...goods.items, ...data.data.items]
             goods.paginate = data.data.paginate
             goods.params.page = data.data.paginate.next
             goods.params.limit = data.data.paginate.perPage
             this.setData({
               goods: goods,
               'prompt.hidden': goods.items.length,
             })
           }
         })
     },
     onPullDownRefresh() {
       console.info('onPullDownRefresh')
       this.initData()
       this.getList()
     },
     onReachBottom() {
       console.info('onReachBottom')
       if (!this.data.goods.paginate.hasNext) return
       this.getList()
     },
     onTapTag(e) {
       const type = e.currentTarget.dataset.type
       const index = e.currentTarget.dataset.index
       const goods = {
         items: [],
         params: {
           page: 1,
           limit: 10,
           type: type,
         },
         paginate: {}
       }
       this.setData({
         activeIndex: index,
         goods: goods,
       })
       this.getList()
     },
})
