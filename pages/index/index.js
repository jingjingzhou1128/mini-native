//index.js
//获取应用实例
const app = getApp()
import { debounce } from '../../utils/util.js'

Page({
  data: {
    // motto: 'Hello World',
    // userInfo: {},
    // hasUserInfo: false,
    // canIUse: wx.canIUse('button.open-type.getUserInfo'),
    swiperIndex: 1,
    currentSwiper: 0,
    swiper: [
      {
        src: '../../assets/images/swiper-1.jpg'
      },
      {
        src: '../../assets/images/swiper-1.jpg'
      },
      {
        src: '../../assets/images/swiper-1.jpg'
      }
    ],
    classifyList: [
      {
        src: '../../assets/images/fruit.png',
        name: '时令水果'
      },
      {
        src: '../../assets/images/fruit.png',
        name: '新鲜蔬菜'
      },
      {
        src: '../../assets/images/fruit.png',
        name: '肉蛋'
      },
      {
        src: '../../assets/images/fruit.png',
        name: '水产海鲜'
      },
      {
        src: '../../assets/images/fruit.png',
        name: '安心乳品'
      },
      {
        src: '../../assets/images/fruit.png',
        name: '酒饮零食'
      },
      {
        src: '../../assets/images/fruit.png',
        name: '优鲜超市'
      },
      {
        src: '../../assets/images/fruit.png',
        name: '优鲜菜场'
      },
      {
        src: '../../assets/images/fruit.png',
        name: '0元领'
      },
      {
        src: '../../assets/images/fruit.png',
        name: '速食粮油'
      },
      {
        src: '../../assets/images/fruit.png',
        name: '时令水果'
      },
      {
        src: '../../assets/images/fruit.png',
        name: '新鲜蔬菜'
      },
      {
        src: '../../assets/images/fruit.png',
        name: '肉蛋'
      },
      {
        src: '../../assets/images/fruit.png',
        name: '水产海鲜'
      },
      {
        src: '../../assets/images/fruit.png',
        name: '安心乳品'
      },
      {
        src: '../../assets/images/fruit.png',
        name: '酒饮零食'
      },
      {
        src: '../../assets/images/fruit.png',
        name: '优鲜超市'
      },
      {
        src: '../../assets/images/fruit.png',
        name: '优鲜菜场'
      },
      {
        src: '../../assets/images/fruit.png',
        name: '0元领'
      },
      {
        src: '../../assets/images/fruit.png',
        name: '速食粮油'
      }
    ]
  },
  swiperChanged: function (e) {
    this.setData({
      swiperIndex: e.detail.current + 1
    })
  },
  onLoad: function () {
    this.setData({
      currentSwiper: 0,
      swiperIndex: 1
    })
  },
  //事件处理函数
  changeMove: debounce((e) => {
    console.log((-e.detail.x/300)*100)
  })
  // bindViewTap: function() {
  //   wx.navigateTo({
  //     url: '../logs/logs'
  //   })
  // },
  // onLoad: function () {
  //   if (app.globalData.userInfo) {
  //     this.setData({
  //       userInfo: app.globalData.userInfo,
  //       hasUserInfo: true
  //     })
  //   } else if (this.data.canIUse){
  //     // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
  //     // 所以此处加入 callback 以防止这种情况
  //     app.userInfoReadyCallback = res => {
  //       this.setData({
  //         userInfo: res.userInfo,
  //         hasUserInfo: true
  //       })
  //     }
  //   } else {
  //     // 在没有 open-type=getUserInfo 版本的兼容处理
  //     wx.getUserInfo({
  //       success: res => {
  //         app.globalData.userInfo = res.userInfo
  //         this.setData({
  //           userInfo: res.userInfo,
  //           hasUserInfo: true
  //         })
  //       }
  //     })
  //   }
  // },
  // getUserInfo: function(e) {
  //   console.log(e)
  //   app.globalData.userInfo = e.detail.userInfo
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true
  //   })
  // },
})
