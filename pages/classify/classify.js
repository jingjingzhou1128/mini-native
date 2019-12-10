// pages/classify/classify.js
Page({

  /**
   * Page initial data
   */
  data: {
    // 激活菜单
    activeMenu: '时令水果',
    classifyList: [
      {
        name: '时令水果'
      },
      {
        name: '新鲜蔬菜'
      },
      {
        name: '肉蛋熟食'
      },
      {
        name: '海鲜水产'
      },
      {
        name: '优鲜超市'
      }
    ],
    // 激活的tab
    activeSubClassify: '全部',
    subClassifyList: [
      {
        name: '全部'
      },
      {
        name: '热销爆款'
      },
      {
        name: '本周上新'
      },
      {
        name: '绿叶鲜菜'
      },
      {
        name: '番茄类'
      },
      {
        name: '番茄类1'
      },
      {
        name: '番茄类2'
      },
      {
        name: '番茄类3'
      },
      {
        name: '番茄类4'
      }
    ]
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

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

  // 点击侧边栏菜单
  onTapMenu (e) {
    let menu = e.currentTarget.dataset.menu
    this.setData({
      activeMenu: menu
    })
  }
})