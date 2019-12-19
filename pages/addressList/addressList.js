const app = getApp()
// const transData = require('../../utils/transData.js')
// pages/addressList/addressList.js
Page({

  /**
   * Page initial data
   */
  data: {
    addressList: [],
    selectedAddress: ''
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    if (options.id) {
      this.setData({
        selectedAddress: options.id
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
    this.setData({
      addressList: app.globalData.addressList
    })
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

  // 编辑地址
  editAddress (e) {
    wx.navigateTo({
      url: `../../pages/addressEdit/addressEdit?id=${e.currentTarget.dataset.id}`,
    })
  },

  onAddressClick (e) {
    app.globalData.selectedAddress = e.currentTarget.dataset.id
    wx.navigateBack()
  },

  onSelectedChange (e) {
    app.globalData.selectedAddress = e.detail
    wx.navigateBack()
  },

  // 新增地址
  addAddress () {
    wx.navigateTo({
      url: '../../pages/addressEdit/addressEdit',
    })
  }
})