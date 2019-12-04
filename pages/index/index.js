//index.js
//获取应用实例
const app = getApp()
const createRecycleContext = require('../../components/miniprogram-recycle-view/index.js')

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
    ],
    goodsClassList: [
      {
        name: '推荐',
        type: '猜你喜欢',
        classify: '1'
      },
      {
        name: '推销爆款',
        type: '必买榜单',
        classify: '2'
      },
      {
        name: '一件包邮',
        type: '一件包邮',
        classify: '3'
      },
      {
        name: '0元菜场',
        type: '免费领菜',
        classify: '4'
      },
      {
        name: '火锅',
        type: '一站购齐',
        classify: '5'
      },
      {
        name: '营养早餐',
        type: '提前准备好',
        classify: '6'
      },
      {
        name: '大闸蟹',
        type: '时令好货',
        classify: '7'
      }
    ],
    goodsSelected: '1',
    moveProgress: 0,
    moveTimer: null,
    goodsList: [],
    loadFinish: false,
    stickyTop: 0,
    isSticky: false,
    isLoading: false
  },
  // 监听页面加载回调函数
  onLoad: function () {
    this.setData({
      currentSwiper: 0,
      swiperIndex: 1
    })
    this.getGoodsList()
  },
  // 监听页面初次渲染完成回调函数
  onReady: function () {
    this.getMoveProgress(0)
    this.initStickyTop()
  },
  // 监听页面上拉触底事件触发函数
  onReachBottom: function () {
    if (this.data.isLoading) return
    this.getGoodsList()
  },
  // 页面滚动触发的事件
  onPageScroll (obj) {
    this.setData({
      isSticky: (obj.scrollTop + 44) > this.data.stickyTop
    })
  },
  // 初始化商品分类距离顶部距离
  initStickyTop () {
    let query = wx.createSelectorQuery()
    query.select('#goodsMenu').boundingClientRect(res => {
      this.setData({
        stickyTop: res.top
      })
    }).exec()
  },
  // 获取商品列表信息
  getGoodsList () {
    let goodsLength = this.data.goodsList.length
    if (goodsLength >= 100) {
      this.setData({
        loadFinish: true
      })
      return
    }
    let goodsList = []
    for (let i = 0; i < 10; i++) {
      goodsList.push({
        src: '../../assets/images/fruit.png',
        title: '湾仔码头三鲜水饺300g',
        desc: '瞧这一个个白小胖 可爱诱人',
        price: 33.9
      })
    }
    this.setData({
      goodsList: [...this.data.goodsList, ...goodsList]
    })
  },
  // 获取移动进度
  getMoveProgress: function (offsetX) {
    let query = this.createSelectorQuery()
    let _this = this
    query.select('#classifyMoveWrap').boundingClientRect(rect => {
      let wrapWidth = rect.width
      let moveWidth = rect.width * 2
      let moveProgress = 0
      if (moveWidth <= 0) {
        moveProgress = 0
      } else if (offsetX === 0) {
        moveProgress = Math.round((wrapWidth / moveWidth) * 100)
      } else {
        moveProgress = Math.round(((-offsetX + wrapWidth) / moveWidth) * 100)
      }
      _this.setData({
        moveProgress: moveProgress
      })
    }).exec()
  },
  // swiper 滑动事件处理
  handlerSwiper: function (e) {
    this.setData({
      swiperIndex: e.detail.current + 1
    })
  },
  // move 移动事件处理
  handlerMove: function (e) {
    if (this.customData.moveTimer) {
      clearTimeout(this.customData.moveTimer)
    }
    let timer = null
    this.customData.moveTimer = setTimeout(() => {
      this.getMoveProgress(e.detail.x)
    }, 500)
  },
  // 切换商品类别过滤事件处理
  handlerFilterGoods: function (e) {
    this.setData({
      goodsSelected: e.currentTarget.dataset.classify,
      isLoading: true,
      goodsList: []
    })
    let _this = this
    setTimeout(() => {
      _this.getGoodsList()
      this.setData({
        isLoading: false
      })
    }, 2000)
  },
  // 自由数据
  customData: {
    moveTimer: null
  }
  
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
