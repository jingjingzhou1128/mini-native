//index.js
//获取应用实例
const app = getApp()
// const createRecycleContext = require('../../components/miniprogram-recycle-view/index.js')
const bmap = require('../../libs/bmap-wx.min.js')

Page({
  data: {
    // motto: 'Hello World',
    // userInfo: {},
    // hasUserInfo: false,
    // canIUse: wx.canIUse('button.open-type.getUserInfo'),
    // 当前所在滑块index
    swiperIndex: 1,
    // 滑块项
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
    // 总分类列表
    classifyList: [
      {
        src: '../../assets/images/fruit.png',
        name: '时令水果',
        value: '1'
      },
      {
        src: '../../assets/images/fruit.png',
        name: '新鲜蔬菜',
        value: '1'
      },
      {
        src: '../../assets/images/fruit.png',
        name: '肉蛋',
        value: '1'
      },
      {
        src: '../../assets/images/fruit.png',
        name: '水产海鲜',
        value: '1'
      },
      {
        src: '../../assets/images/fruit.png',
        name: '安心乳品',
        value: '1'
      },
      {
        src: '../../assets/images/fruit.png',
        name: '酒饮零食',
        value: '1'
      },
      {
        src: '../../assets/images/fruit.png',
        name: '优鲜超市',
        value: '1'
      },
      {
        src: '../../assets/images/fruit.png',
        name: '优鲜菜场',
        value: '1'
      },
      {
        src: '../../assets/images/fruit.png',
        name: '0元领',
        value: '1'
      },
      {
        src: '../../assets/images/fruit.png',
        name: '速食粮油',
        value: '1'
      },
      {
        src: '../../assets/images/fruit.png',
        name: '时令水果',
        value: '2'
      },
      {
        src: '../../assets/images/fruit.png',
        name: '新鲜蔬菜',
        value: '2'
      },
      {
        src: '../../assets/images/fruit.png',
        name: '肉蛋',
        value: '2'
      },
      {
        src: '../../assets/images/fruit.png',
        name: '水产海鲜',
        value: '2'
      },
      {
        src: '../../assets/images/fruit.png',
        name: '安心乳品',
        value: '2'
      },
      {
        src: '../../assets/images/fruit.png',
        name: '酒饮零食',
        value: '2'
      },
      {
        src: '../../assets/images/fruit.png',
        name: '优鲜超市',
        value: '2'
      },
      {
        src: '../../assets/images/fruit.png',
        name: '优鲜菜场',
        value: '2'
      },
      {
        src: '../../assets/images/fruit.png',
        name: '0元领',
        value: '2'
      },
      {
        src: '../../assets/images/fruit.png',
        name: '速食粮油',
        value: '2'
      }
    ],
    // 商品分类列表
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
    // 当前选中的商品分类
    goodsSelected: '1',
    // 商品分类移动进度
    moveProgress: 0,
    // 商品列表
    goodsList: [],
    // 是否已加载当前分类下的所有商品
    loadFinish: false,
    // 商品分类距离页面顶部距离
    stickyTop: 0,
    // 商品分类是否吸顶
    isSticky: false,
    // 商品是否在加载中
    isLoading: false,
    // 窗口可用高度
    windowHeight: 0,
    // showAuthor: true
    // 当前送至地址
    location: null,
    // 是否显示送至地址提示
    showLocationTip: false
  },
  // 监听页面加载回调函数
  onLoad: function () {
    this.getGoodsList()
    this.BMap = new bmap.BMapWX({
      ak: 'zrEND0UqaVqhRQAaMn3KGHjluFo78GLQ'
    })
    this.getSendLocation()
  },
  // 监听页面初次渲染完成回调函数
  onReady: function () {
    this.getMoveProgress(0)
    this.initStickyTop()
    this.getScreenHeight()
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
  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {
    this.getSendLocation()
    setTimeout(function () {
      wx.stopPullDownRefresh()
    }, 2000)
  },
  // // 点击tab时触发
  // onTabItemTap (tab) {
  //   wx.setTabBarBadge({
  //     index: 2,
  //     text: (++app.globalData.catData.sum).toString()
  //   })
  // },
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
        price: 33.9,
        catNumb: 0
      })
    }
    this.setData({
      goodsList: [...this.data.goodsList, ...goodsList]
    })
  },
  // 获取屏幕可用高度
  getScreenHeight () {
    // let systemInfo = wx.getSystemInfoSync()
    this.setData({
      windowHeight: app.globalData.systemInfo.windowHeight
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
    if (this.data.isSticky) {
      wx.pageScrollTo({
        scrollTop: this.data.stickyTop,
      })
    }
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
  // 添加到购物车
  addCat: function (e) {
    let index = e.detail.index
    this.setData({
      [`goodsList[${index}].catNumb`]: this.data.goodsList[index].catNumb + 1
    })
  },
  // 跳转到分类
  toClassify: function (e) {
    let value = e.currentTarget.dataset.value
    app.globalData.classifyValue = value
    wx.switchTab({
      url: '../../pages/classify/classify',
    })
  },

  getSendLocation () {
    this.setData({
      showLocationTip: true
    })
    let addressList = app.globalData.addressList || []
    let defaultAddress = addressList.filter(item => item.isDefault)
    if (defaultAddress.length > 0) {
      this.setData({
        location: defaultAddress[0]
      })
      setTimeout(() => {
        this.setData({
          showLocationTip: false
        })
      }, 5000)
    } else {
      this.location()
    }
  },

  location() {
    let _this = this
    wx.getLocation({
      success: function (res) {
        _this.BMap.regeocoding({
          location: `${res.latitude},${res.longitude}`,
          fail: function (data) {},
          success: function (data) {
            if (data.originalData.status === 0) {
              _this.setData({
                location: {
                  name: data.originalData.result.formatted_address
                }
              })
              setTimeout(function () {
                _this.setData({
                  showLocationTip: false
                })
              }, 5000)
            } else {}
          }
        })
      },
      fail: function (error) {}
    })
  },
  // getUserInfo (e) {
  //   console.log(e)
  // },
  // onAuthorClose (e) {
  //   this.setData({
  //     showAuthor: false
  //   })
  // },
  // 自由数据
  customData: {
    // 商品分类移动定时器索引
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
