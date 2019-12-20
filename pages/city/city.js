const app = getApp()
const bmap = require('../../libs/bmap-wx.min.js')
// pages/city/city.js
Page({

  /**
   * Page initial data
   */
  data: {
    scrollTop: 0,
    cityList: [
      {
        index: 'A',
        children: [
          {
            label: '阿克苏地区',
            value: 85
          },
          {
            label: '阿勒泰地区',
            value: 96
          },
          {
            label: '阿里地区',
            value: 103
          },
          {
            label: '阿坝藏族羌族自治州',
            value: 185
          },
          {
            label: '阿拉善盟',
            value: 230
          },
          {
            label: '阿拉尔市',
            value: 731
          },
          {
            label: '安庆市',
            value: 130
          },
          {
            label: '安顺市',
            value: 263
          },
          {
            label: '安阳市',
            value: 267
          },
          {
            label: '安康市',
            value: 324
          },
          {
            label: '鞍山市',
            value: 320
          }
        ]
      },
      {
        index: 'B',
        children: [
          {
            label: '白银市',
            value: 35
          },
          {
            label: '白城市',
            value: 51
          },
          {
            label: '白山市',
            value: 57
          },
          {
            label: '白沙黎族自治县',
            value: 2359
          },
          {
            label: '百色市',
            value: 203
          },
          {
            label: '保山市',
            value: 112
          },
          {
            label: '保定市',
            value: 307
          },
          {
            label: '保亭黎族苗族自治县',
            value: 1217
          },
          {
            label: '北京市',
            value: 131
          }
        ]
      },
      {
        index: 'N',
        children: [
          {
            label: '南平市',
            value: 133
          },
          {
            label: '南通市',
            value: 161
          },
          {
            label: '南昌市',
            value: 163
          },
          {
            label: '南宁市',
            value: 261
          },
          {
            label: '南京市',
            value: 315
          }
        ]
      },
      {
        index: 'W',
        children: [
          {
            label: '无锡市',
            value: 317
          }
        ]
      }
    ],
    currentCity: '',
    // 获取当前定位状态，0：正在定位；1：成功；2：失败
    locationStatus: 0
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.BMap = new bmap.BMapWX({
      ak: 'zrEND0UqaVqhRQAaMn3KGHjluFo78GLQ'
    })
    this.location()
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

  onPageScroll (event) {
    this.setData({
      scrollTop: event.scrollTop
    })
  },

  location () {
    this.setData({
      locationStatus: 0
    })
    let _this = this
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
              _this.setData({
                currentCity: data.originalData.result.cityCode,
                locationStatus: 1
              })
            } else {
              _this.setData({
                locationStatus: 2
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

  selectIndex (e) {
    console.log(e)
  },

  selectCity (e) {
    app.globalData.cityCode = e.currentTarget.dataset.code
    wx.navigateBack()
  },

  selectCurrent (e) {
    if (!this.data.currentCity) return
    app.globalData.cityCode = this.data.currentCity
    wx.navigateBack()
  },

  reLocation () {
    this.location()
  }
})