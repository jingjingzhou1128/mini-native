const app = getApp()

// pages/classify/classify.js
Page({

  /**
   * Page initial data
   */
  data: {
    // 激活菜单
    activeMenu: '0',
    classifyList: [
      {
        name: '全部',
        value: '0'
      },
      {
        name: '时令水果',
        value: '1'
      },
      {
        name: '新鲜蔬菜',
        value: '2'
      },
      {
        name: '肉蛋熟食',
        value: '3'
      },
      {
        name: '海鲜水产',
        value: '4'
      },
      {
        name: '优鲜超市',
        value: '5'
      }
    ],
    // 激活的tab
    activeSubClassify: 'all',
    subClassifyList: [
      {
        name: '全部',
        value: 'all'
      },
      {
        name: '热销爆款',
        value: '1'
      },
      {
        name: '本周上新',
        value: '2'
      },
      {
        name: '绿叶鲜菜',
        value: '3'
      },
      {
        name: '番茄类',
        value: '4'
      },
      {
        name: '番茄类1',
        value: '5'
      },
      {
        name: '番茄类2',
        value: '6'
      },
      {
        name: '番茄类3',
        value: '7'
      },
      {
        name: '番茄类4',
        value: '8'
      }
    ],
    // 商品列表
    goodsList: [],
    // 是否已加载当前分类下的所有商品
    loadStatus: 0,
    // 子分类是否吸附于顶部
    isSticky: false,
    // 是否显示所有子分类遮罩层
    showOverlay: false
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.getGoodsList()
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {
    console.log('ready')
  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {
    console.log('show')
    this.setData({
      activeMenu: app.globalData.classifyValue || this.data.activeMenu
    })
    delete app.globalData.classifyValue
  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {
    console.log('hide')
  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {
    console.log('unload')
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

  // 点击侧边栏菜单
  onTapMenu (e) {
    let menu = e.currentTarget.dataset.menu
    this.setData({
      activeMenu: menu,
      goodsList: [],
      loadStatus: 0
    })
    let _this = this
    setTimeout(function () {
      _this.getGoodsList()
    }, 2000)
  },
  // 点击子分类
  onTapClassify (e) {
    let classify = e.currentTarget.dataset.classify
    this.setData({
      activeSubClassify: classify,
      goodsList: [],
      loadStatus: 0
    })
    let _this = this
    setTimeout(function () {
      _this.getGoodsList()
    }, 2000)
  },
  // 获取商品列表信息
  getGoodsList() {
    let goodsLength = this.data.goodsList.length
    if (goodsLength >= 100) {
      this.setData({
        loadStatus: 2 // 所有数据已加载完
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
      goodsList: [...this.data.goodsList, ...goodsList],
      loadStatus: 1 // 本次数据加载完成
    })
  },
  // 处理商品滚动到底部触发事件
  handlerScrolltolower () {
    if (this.data.loadStatus === 0 || this.data.loadStatus === 2) return
    this.setData({
      loadStatus: 0 // 本次数据正在加载
    })
    let _this = this
    setTimeout(function () {
      _this.getGoodsList()
    }, 2000)
  },
  // 商品列表滚动触发
  handlerScroll (e) {
    if ((e.detail.scrollTop >= 100 && this.data.isSticky) || (e.detail.scrollTop < 100 && !this.data.isSticky)) return
    this.setData({
      isSticky: e.detail.scrollTop >= 100
    })
  },
  // 打开所有分类遮罩层
  openOverlay () {
    this.setData({
      showOverlay: true
    })
  },
  // 关闭所有分类遮罩层
  closeOverlay () {
    this.setData({
      showOverlay: false
    })
  },
  // 减少购物车
  handlerReduceCat (e) {
    let index = e.currentTarget.dataset.index
    if (this.data.goodsList[index].catNumb <= 0) return
    this.setData({
      [`goodsList[${index}].catNumb`]: this.data.goodsList[index].catNumb - 1
    })
    // wx.setTabBarBadge({
    //   index: 2,
    //   text: (--app.globalData.catData.sum).toString()
    // })
  },
  // 添加购物车
  handlerAddCat (e) {
    let index = e.currentTarget.dataset.index
    this.setData({
      [`goodsList[${index}].catNumb`]: this.data.goodsList[index].catNumb + 1,
    })
    // wx.setTabBarBadge({
    //   index: 2,
    //   text: (++app.globalData.catData.sum).toString()
    // })
  }
})