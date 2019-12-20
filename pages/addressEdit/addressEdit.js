const app = getApp()
const util = require('../../utils/util.js')
// pages/addressEdit/addressEdit.js
Page({

  /**
   * Page initial data
   */
  data: {
    address: {
      userName: '',
      userGender: '',
      phone: '',
      tag: '',
      addrDet: '',
      isDefault: false,
      latitude: 0,
      longitude: 0,
      name: '',
      uid: '',
      // cityCode: '',
    },
    tags: [
      {
        label: '家',
        value: 'home'
      },
      {
        label: '公司',
        value: 'company'
      },
      {
        label: '学校',
        value: 'school'
      }
    ]
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    console.log('load')
    if (options.id) {
      let addressList = app.globalData.addressList || []
      let address = addressList.filter(item => item.uid === options.id)
      if (address.length === 0) return
      this.setData({
        address: address[0]
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
    if (app.globalData.address) {
      this.setData({
        // 'address.cityCode': app.globalData.address.cityCode,
        'address.latitude': app.globalData.address.latitude,
        'address.longitude': app.globalData.address.longitude,
        'address.name': app.globalData.address.name,
        'address.uid': app.globalData.address.uid
      })
      delete app.globalData.address
    }
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

  changeTag (e) {
    this.setData({
      'address.tag': e.currentTarget.dataset.value
    })
  },

  changeUsername (e) {
    this.setData({
      'address.userName': e.detail
    })
  },

  changeUsergender (e) {
    this.setData({
      'address.userGender': e.detail
    })
  },

  changePhone (e) {
    this.setData({
      'address.phone': e.detail
    })
  },

  chooseLocation () {
    if (!this.data.address.uid) {
      wx.navigateTo({
        url: '../../pages/location/location',
      })
      return
    }
    let queryString = util.getQueryToString({
      longitude: this.data.address.longitude,
      latitude: this.data.address.latitude,
      uid: this.data.address.uid,
      // cityCode: this.data.address.cityCode,
    })
    wx.navigateTo({
      url: `../../pages/location/location?${queryString}`,
    })
  },

  changeAddrDet (e) {
    this.setData({
      'address.addrDet': e.detail
    })
  },

  changeIsDefault (e) {
    this.setData({
      'address.isDefault': e.detail
    })
  },

  saveAddress () {
    let _this = this
    let addressList = app.globalData.addressList || []
    if (_this.data.address) {
      addressList = addressList.map(item => {
        item.isDefault = false
        return item
      })
    }
    let index = addressList.findIndex(item => item.uid === _this.data.address.uid)
    if (index >= 0) {
      addressList[index] = Object.assign({}, _this.data.address)
    } else {
      addressList.push(Object.assign({}, _this.data.address))
    }
    app.globalData.addressList = addressList
    app.globalData.selectedAddress = this.data.address.uid
    // if (addressList.filter(item => item.uid === _this.data.address.uid).length > 0) {
    //   app.globalData.addressList = addressList.map(item => {
    //     if (item.uid === _this.data.address.uid) {
    //       item = Object.assign({}, _this.data.address)
    //     }
    //     return item
    //   })
    // } else {
    //   app.globalData.addressList.push(Object.assign({}, _this.data.address))
    // }
    wx.navigateBack()
  }
})