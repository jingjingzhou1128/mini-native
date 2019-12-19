const app = getApp()
const bmap = require('../../libs/bmap-wx.min.js')
const util = require('../../utils/util.js')

// pages/location/location.js
Page({

  /**
   * Page initial data
   */
  data: {
    // 地图配置
    map: {
      longitude: 0,
      latitude: 0,
      scale: 14,
      'showLocation': true,
      controls: [{
        id: 1,
        iconPath: '/assets/images/location-control.png',
        position: {
          left: 10,
          top: 270,
          width: 20,
          height: 20
        },
        clickable: true
      },
      {
        id: 2,
        iconPath: "/assets/images/location-marker.png",
        position: {
          left: app.globalData.systemInfo.safeArea.width / 2 - 15,
          top: 135,
          width: 30,
          height: 30
        }
      }]
      // markers: [{
      //   iconPath: "/assets/images/location-marker.png",
      //   id: 0,
      //   latitude: 23.099994,
      //   longitude: 113.324520,
      //   width: 30,
      //   height: 30
      // }]
    },
    // 当前选中的地址信息
    rgcData: {
      city: '',
      cityCode: '',
      uid: ''
    },
    // 推荐地址
    recomAddress: [],
    // 搜索框值
    searchValue: '',
    // 搜索推荐地址
    recomSearchAddress: []
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    console.log(options)
    this.BMap = new bmap.BMapWX({
      ak: 'zrEND0UqaVqhRQAaMn3KGHjluFo78GLQ'
    })
    let _this = this
    this.__searchChange = util.debounce(_this.onSearchChange.bind(this))
    if (Object.keys(options).length > 0) {
      let query = {}
      Object.keys(options).forEach(key => {
        query[key] = decodeURIComponent(options[key])
      })
      this.setData({
        'map.longitude': query.longitude,
        'map.latitude': query.latitude,
        'rgcData.uid': query.uid
      })
      this.regeocod({
        latitude: query.latitude,
        longitude: query.longitude
      })
    } else {
      wx.getLocation({
        success: function (res) {
          console.log(res)
          _this.setData({
            'map.longitude': res.longitude,
            'map.latitude': res.latitude
          })
          _this.regeocod({
            latitude: res.latitude,
            longitude: res.longitude
          })
        }
      })
    }
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {
    this.mapCtx = wx.createMapContext('map')
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

  // 定位到当前位置
  controltap (e) {
    this.mapCtx.moveToLocation()
  },

  regeocod (location) {
    let _this = this
    this.BMap.regeocoding({
      location: `${location.latitude},${location.longitude}`,
      fail: function (data) {
        console.log('fail', data)
        wx.showToast({
          title: data.errMsg || '解析地址失败',
          icon: 'none',
          duration: 2000
        })
        _this.setData({
          rgcData: {
            city: '',
            cityCode: '',
            uid: ''
          },
          recomAddress: []
        })
      },
      success: function (data) {
        console.log('success', data)
        if (data.originalData.status === 0) {
          _this.setData({
            'rgcData.city': data.originalData.result.addressComponent.city,
            'rgcData.cityCode': data.originalData.result.cityCode,
            recomAddress: data.originalData.result.pois
          })
        } else {
          wx.showToast({
            title: '解析地址失败',
            icon: 'none',
            duration: 2000
          })
          _this.setData({
            rgcData: {
              city: '',
              cityCode: '',
              uid: ''
            },
            recomAddress: []
          })
        }
      }
    })
  },

  // 地图视野变化时触发
  regionchange (obj) {
    let _this = this
    if (obj.type === 'end') {
      this.mapCtx.getCenterLocation({
        success: function (res) {
          console.log(res)
          _this.regeocod({
            latitude: res.latitude,
            longitude: res.longitude
          })
        }
      })
    }
  },

  toPayPage (uid) {
    let poi = this.data.recomAddress.filter(item => item.uid === uid)
    if (poi.length > 0) {
      // let queryString = util.getQueryToString({
      //   latitude: poi[0].point.y,
      //   longitude: poi[0].point.x,
      //   name: poi[0].name,
      //   uid: poi[0].uid,
      //   cityCode: this.data.rgcData.cityCode
      // })
      // wx.navigateTo({
      //   url: `../../pages/pay/pay?${queryString}`,
      // })
      app.globalData.address = {
        latitude: poi[0].point.y,
        longitude: poi[0].point.x,
        name: poi[0].name,
        uid: poi[0].uid,
        cityCode: this.data.rgcData.cityCode
      }
      wx.navigateBack()
    }
  },

  onRgcChange (e) {
    let uid = e.detail
    this.toPayPage(uid)
  },

  onPoiClick (e) {
    let uid = e.currentTarget.dataset.name
    this.toPayPage(uid)
  },

  onClickSearch (e) {
    let uid = e.currentTarget.dataset.name
    let poi = this.data.recomSearchAddress.filter(item => item.uid === uid)
    if (poi.length > 0) {
      // let queryString = util.getQueryToString({
      //   latitude: poi[0].location.lat,
      //   longitude: poi[0].location.lng,
      //   name: poi[0].name,
      //   uid: poi[0].uid,
      //   cityCode: this.data.rgcData.cityCode
      // })
      app.globalData.address = {
        latitude: poi[0].location.lat,
        longitude: poi[0].location.lng,
        name: poi[0].name,
        uid: poi[0].uid,
        cityCode: this.data.rgcData.cityCode
      }
      wx.navigateBack()
      // wx.navigateTo({
      //   url: `../../pages/pay/pay?${queryString}`,
      // })
    }
  },

  none () {},

  onSearch (e) {
    this.searchSuggest(e.detail)
  },

  searchSuggest (value) {
    let _this = this
    if (!value) {
      this.setData({
        recomSearchAddress: []
      })
      return
    }
    this.BMap.suggestion({
      query: value,
      region: this.data.rgcData.cityCode,
      city_limit: true,
      fail: function (data) {
        console.log('fail', data)
        wx.showToast({
          title: '搜索地址失败',
          icon: 'none',
          duration: 2000
        })
        _this.setData({
          recomSearchAddress: []
        })
      },
      success: function (data) {
        console.log('success', data)
        if (data.status === 0) {
          _this.setData({
            recomSearchAddress: data.result
          })
        } else {
          _this.setData({
            recomSearchAddress: []
          })
        }
      }
    })
  },

  onSearchChange (e) {
    console.log(e)
    this.setData({
      searchValue: e.detail
    })
    this.searchSuggest(e.detail)
  }
})