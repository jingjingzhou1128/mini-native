// pages/goodsDetail/index.js
Page({

  /**
   * Page initial data
   */
  data: {
    // 状态栏高度
    statusBarHeight: 0,
    // 顶部导航栏透明度
    navbarOpacity: 0,
    // 当前激活导航项
    activeMenu: 'goods',
    // 当前所在滑块index
    swiperIndex: 1,
    // 滑块项
    swiper: [
      {
        src: '../../assets/images/fruit.png'
      },
      {
        src: '../../assets/images/fruit.png'
      },
      {
        src: '../../assets/images/fruit.png'
      }
    ],
    // 推荐列表
    recomList: [
      {
        src: '../../assets/images/fruit.png',
        title: '湾仔码头三鲜水饺300g',
        desc: '瞧这一个个白小胖 可爱诱人',
        price: 33.9,
        catNumb: 1
      },
      {
        src: '../../assets/images/fruit.png',
        title: '湾仔码头三鲜水饺300g',
        desc: '瞧这一个个白小胖 可爱诱人',
        price: 33.9,
        catNumb: 1
      },
      {
        src: '../../assets/images/fruit.png',
        title: '湾仔码头三鲜水饺300g',
        desc: '瞧这一个个白小胖 可爱诱人',
        price: 33.9,
        catNumb: 1
      },
      {
        src: '../../assets/images/fruit.png',
        title: '湾仔码头三鲜水饺300g',
        desc: '瞧这一个个白小胖 可爱诱人',
        price: 33.9,
        catNumb: 1
      },
      {
        src: '../../assets/images/fruit.png',
        title: '湾仔码头三鲜水饺300g',
        desc: '瞧这一个个白小胖 可爱诱人',
        price: 33.9,
        catNumb: 1
      },
      {
        src: '../../assets/images/fruit.png',
        title: '湾仔码头三鲜水饺300g',
        desc: '瞧这一个个白小胖 可爱诱人',
        price: 33.9,
        catNumb: 1
      },
      {
        src: '../../assets/images/fruit.png',
        title: '湾仔码头三鲜水饺300g',
        desc: '瞧这一个个白小胖 可爱诱人',
        price: 33.9,
        catNumb: 1
      },
      {
        src: '../../assets/images/fruit.png',
        title: '湾仔码头三鲜水饺300g',
        desc: '瞧这一个个白小胖 可爱诱人',
        price: 33.9,
        catNumb: 1
      },
      {
        src: '../../assets/images/fruit.png',
        title: '湾仔码头三鲜水饺300g',
        desc: '瞧这一个个白小胖 可爱诱人',
        price: 33.9,
        catNumb: 1
      },
      {
        src: '../../assets/images/fruit.png',
        title: '湾仔码头三鲜水饺300g',
        desc: '瞧这一个个白小胖 可爱诱人',
        price: 33.9,
        catNumb: 1
      },
      {
        src: '../../assets/images/fruit.png',
        title: '湾仔码头三鲜水饺300g',
        desc: '瞧这一个个白小胖 可爱诱人',
        price: 33.9,
        catNumb: 1
      },
      {
        src: '../../assets/images/fruit.png',
        title: '湾仔码头三鲜水饺300g',
        desc: '瞧这一个个白小胖 可爱诱人',
        price: 33.9,
        catNumb: 1
      },
      {
        src: '../../assets/images/fruit.png',
        title: '湾仔码头三鲜水饺300g',
        desc: '瞧这一个个白小胖 可爱诱人',
        price: 33.9,
        catNumb: 1
      },
      {
        src: '../../assets/images/fruit.png',
        title: '湾仔码头三鲜水饺300g',
        desc: '瞧这一个个白小胖 可爱诱人',
        price: 33.9,
        catNumb: 1
      },
      {
        src: '../../assets/images/fruit.png',
        title: '湾仔码头三鲜水饺300g',
        desc: '瞧这一个个白小胖 可爱诱人',
        price: 33.9,
        catNumb: 1
      },
      {
        src: '../../assets/images/fruit.png',
        title: '湾仔码头三鲜水饺300g',
        desc: '瞧这一个个白小胖 可爱诱人',
        price: 33.9,
        catNumb: 1
      },
      {
        src: '../../assets/images/fruit.png',
        title: '湾仔码头三鲜水饺300g',
        desc: '瞧这一个个白小胖 可爱诱人',
        price: 33.9,
        catNumb: 1
      },
      {
        src: '../../assets/images/fruit.png',
        title: '湾仔码头三鲜水饺300g',
        desc: '瞧这一个个白小胖 可爱诱人',
        price: 33.9,
        catNumb: 1
      },
      {
        src: '../../assets/images/fruit.png',
        title: '湾仔码头三鲜水饺300g',
        desc: '瞧这一个个白小胖 可爱诱人',
        price: 33.9,
        catNumb: 0
      },
      {
        src: '../../assets/images/fruit.png',
        title: '湾仔码头三鲜水饺300g',
        desc: '瞧这一个个白小胖 可爱诱人',
        price: 33.9,
        catNumb: 0
      }
    ],
    // 推荐商品移动进度
    moveProgress: 0,
    // 导航锚点距离顶部距离
    targetTop: {
      goods: 0,
      recom: 0,
      detail: 0
    },
    // 优惠详情上拉框
    discountDialogFlag: false
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    const { statusBarHeight } = wx.getSystemInfoSync();
    this.setData({ statusBarHeight });
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {
    this.getMoveProgress(0)
    this.getTargetTop()
  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  },
  
  /**
   * @description 监听页面滚动事件
   */
  onPageScroll: function (obj) {
    let opacity
    let activeTarget
    // 设置导航栏透明度
    if (obj.scrollTop >= 300) {
      opacity = 1
    } else {
      opacity = obj.scrollTop / 300
    }
    // 设置导航栏激活锚点
    let scrollTop = obj.scrollTop + this.data.statusBarHeight + 50
    if (scrollTop >= this.data.targetTop.detail) {
      activeTarget = 'detail'
    } else if (scrollTop >= this.data.targetTop.recom) {
      activeTarget = 'recom'
    } else {
      activeTarget = 'goods'
    }
    this.setData({
      navbarOpacity: opacity,
      activeMenu: activeTarget
    })
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
  // 获取移动进度
  getMoveProgress: function (offsetX) {
    let query = this.createSelectorQuery()
    let _this = this
    query.select('#recomMoveWrap').boundingClientRect(rect => {
      let wrapWidth = rect.width
      let moveWidth = 130 * _this.data.recomList.length - 5
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
  // 获取导航锚点距离顶部距离
  getTargetTop: function () {
    let query = this.createSelectorQuery()
    let _this = this
    query.select('#goodsTarget').boundingClientRect()
    query.select('#recomTarget').boundingClientRect()
    query.select('#detailTarget').boundingClientRect()
    query.exec(res => {
      _this.setData({
        'targetTop.goods': res[0].top,
        'targetTop.recom': res[1].top,
        'targetTop.detail': res[2].top
      })
    })
  },
  // 打开优惠详情上拉框
  openDiscountDialog: function () {
    this.setData({
      discountDialogFlag: true
    })
  },
  // 关闭优惠详情上拉框
  closeDiscountDialog: function () {
    this.setData({
      discountDialogFlag: false
    })
  },
  // 返回上一页
  toBack: function () {
    wx.navigateBack()
  },
  // 返回主页
  toHome: function () {
    wx.switchTab({
      url: '../../pages/index/index'
    })
  },
  // 定位到目标target
  toTarget (e) {
    let menu = e.currentTarget.dataset.menu
    wx.pageScrollTo({
      scrollTop: this.data.targetTop[menu],
      duration: 300
    })
  },
  // 添加购物车
  handlerAddCat(e) {
    let index = e.currentTarget.dataset.index
    this.setData({
      [`recomList[${index}].catNumb`]: this.data.recomList[index].catNumb + 1
    })
  },
  // 自由数据
  customData: {
    // 商品分类移动定时器索引
    moveTimer: null
  }
})