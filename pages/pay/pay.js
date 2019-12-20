// const util = require('../../utils/util.js')
const app = getApp()
let isInitSelfShow = true
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
    // console.log(options)
    // if (Object.keys(options).length > 0) {
    //   let query = {}
    //   Object.keys(options).forEach(key => {
    //     query[key] = decodeURIComponent(options[key])
    //   })
    //   this.setData({
    //     address: query
    //   })
    // }
    if (isInitSelfShow) return
    let addressList = app.globalData.addressList || []
    this.setData({
      address: addressList.filter(item => item.isDefault)[0] || null
    })
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
    let addressList = app.globalData.addressList || []
    if (isInitSelfShow) {
      this.setData({
        address: addressList.filter(item => item.isDefault)[0] || null
      })
    } else if (app.globalData.selectedAddress) {
      this.setData({
        address: addressList.filter(item => item.uid === app.globalData.selectedAddress)[0] || null
      })
      delete app.globalData.selectedAddress
    }
    // if (app.globalData.address) {
    //   this.setData({
    //     address: app.globalData.address
    //   })
    //   app.globalData.address = null
    //   console.log(this.data.address)
    // }
  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {
    isInitSelfShow = false
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
    // let queryString = util.getQueryToString(this.data.address)
    let id = this.data.address && this.data.address.uid || ''
    wx.navigateTo({
      url: `../../pages/addressList/addressList?id=${id}`,
    })
  }
})