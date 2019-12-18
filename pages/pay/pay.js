const util = require('../../utils/util.js')
// pages/pay/pay.js
Page({

  /**
   * Page initial data
   */
  data: {
    address: null
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    console.log(options)
    if (Object.keys(options).length > 0) {
      let query = {}
      Object.keys(options).forEach(key => {
        query[key] = decodeURIComponent(options[key])
      })
      this.setData({
        address: query
      })
    }
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

  onTapLocation () {
    let queryString = util.getQueryToString(this.data.address)
    wx.navigateTo({
      url: `../../pages/location/location?${queryString}`,
    })
  }
})