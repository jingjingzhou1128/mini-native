const app = getApp()
const bmap = require('../../libs/bmap-wx.min.js')

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
      province: '',
      city: '',
      district: '',
      longitude: 0,
      latitude: 0,
      uid: ''
    },
    // 推荐地址
    recomAddress: []
    // polyline: [{
    //   points: [{
    //     longitude: 113.3245211,
    //     latitude: 23.10229
    //   }, {
    //     longitude: 113.324520,
    //     latitude: 23.21229
    //   }],
    //   color: "#FF0000DD",
    //   width: 2,
    //   dottedLine: true
    // }]
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    let _this = this
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
        // _this.BMap = new bmap.BMapWX({
        //   ak: 'zrEND0UqaVqhRQAaMn3KGHjluFo78GLQ',
        //   location: `${res.latitude},${res.longitude}`
        // })
        // _this.BMap.regeocoding({
        //   fail: function (data) {
        //     console.log('fail', data)
        //   },
        //   success: _this.regeocodSuccess
        // })
      }
    })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {
    this.mapCtx = wx.createMapContext('map')
    // this.mapCtx.moveToLocation()
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
    // this.mapCtx.getCenterLocation({
    //   success: function (res) {
    //     console.log(res)
    //   }
    // })
  },

  regeocod (location) {
    let _this = this
    _this.BMap = new bmap.BMapWX({
      ak: 'zrEND0UqaVqhRQAaMn3KGHjluFo78GLQ',
      location: `${location.latitude},${location.longitude}`
    })
    this.BMap.regeocoding({
      fail: function (data) {
        console.log('fail', data)
      },
      success: function (data) {
        console.log('success', data)
        _this.setData({
          'rgcData.province': data.originalData.result.addressComponent.province,
          'rgcData.city': data.originalData.result.addressComponent.city,
          'rgcData.district': data.originalData.result.addressComponent.district,
          recomAddress: data.originalData.result.pois
        })
        if (data.originalData.result.pois.length > 0) {
          _this.setData({
            'rgcData.longitude': data.originalData.result.pois[0].x,
            'rgcData.latitude': data.originalData.result.pois[0].y,
            'rgcData.uid': data.originalData.result.pois[0].uid
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

  onRgcChange (e) {
    let uid = e.detail
    let poi = this.data.recomAddress.filter(item => item.uid === uid)
    if (poi.length > 0) {
      this.setData({
        'rgcData.longitude': poi[0].point.x,
        'rgcData.latitude': poi[0].point.y,
        'rgcData.uid': poi[0].uid,
      })
    }
  },

  onPoiClick (e) {
    let uid = e.currentTarget.dataset.name
    let poi = this.data.recomAddress.filter(item => item.uid === uid)
    if (poi.length > 0) {
      this.setData({
        'rgcData.longitude': poi[0].point.x,
        'rgcData.latitude': poi[0].point.y,
        'rgcData.uid': poi[0].uid,
      })
    }
  },

  none () {}
})