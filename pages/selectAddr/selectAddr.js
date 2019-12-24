const app = getApp()
const bmap = require('../../libs/bmap-wx.min.js')
// pages/selectAddr/selectAddr.js
Page({

  /**
   * Page initial data
   */
  data: {
    sendAddr: null,
    currentAddr: null,
    locationStatus: 0,
    myAddrs: [],
    nearAddrs: []
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.BMap = new bmap.BMapWX({
      ak: 'zrEND0UqaVqhRQAaMn3KGHjluFo78GLQ'
    })
    this.getNearAddr()
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
    this.setData({
      myAddrs: addressList
    })
    let defaultAddr = addressList.filter(item => item.isDefault)
    if (defaultAddr.length > 0) {
      this.setData({
        sendAddr: defaultAddr[0],
        locationStatus: 1
      })
    } else {
      this.location()
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

  getNearAddr () {
    let _this = this
    this.setData({
      locationStatus: 0
    })
    wx.getLocation({
      success: function (res) {
        _this.BMap.regeocoding({
          location: `${res.latitude},${res.longitude}`,
          fail: function (data) {
            _this.setData({
              locationStatus: 2
            })
          },
          success: function (data) {
            if (data.originalData.status === 0) {
              console.log(data)
              _this.setData({
                currentAddr: {
                  name: data.wxMarkerData[0].address,
                  latitude: data.wxMarkerData[0].latitude,
                  longitude: data.wxMarkerData[0].longitude
                },
                nearAddrs: data.originalData.result.pois,
                locationStatus: 1
              })
            }
          }
        })
      },
      fail: function (error) {
        _this.setData({
          locationStatus: 2
        })
      }
    })
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
              console.log(data)
              _this.setData({
                sendAddr: {
                  name: data.wxMarkerData[0].address,
                  latitude: data.wxMarkerData[0].latitude,
                  longitude: data.wxMarkerData[0].longitude
                }
              })
            }
          }
        })
      },
      fail: function (error) {}
    })
  },

  reLocation() {
    this.getNearAddr()
  },

  selectAddr (e) {
    // if (!e.currentTarget.dataset.id) {
    //   app.globalData.selectedAddress = e.currentTarget.dataset.id
    // }
    wx.navigateBack()
  }
})