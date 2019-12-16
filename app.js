//app.js
App({
  onLaunch: function () {
    let systemInfo = wx.getSystemInfoSync()
    this.globalData.systemInfo = systemInfo
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // 检查登录态是否过期
    // wx.checkSession({
    //   success: res => {
    //     console.log(res)
    //   },
    //   fail: error => {
    //     console.log(error)
    //   }
    // })

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        // 设置购物车中商品数量
        let _this = this
        setTimeout(function () {
          let goodsList = _this.getUserCatInfo()
          _this.globalData.catData.goodsList = goodsList
          wx.setTabBarBadge({
            index: 2,
            text: goodsList.length.toString()
          })
        }, 1000)
      }
    })

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  onShow: function () {},
  onHide: function () {},
  onError: function () {},
  onPageNotFound: function () {
    wx.redirectTo({
      url: 'pages/404/404',
    })
  },
  // 获取用户购物车列表信息
  getUserCatInfo() {
    let goodsList = []
    for (let i = 0; i < 10; i++) {
      goodsList.push({
        id: i.toString(),
        src: '../../assets/images/fruit.png',
        title: `湾仔码头三鲜水饺300g${i}`,
        desc: '瞧这一个个白小胖 可爱诱人',
        price: 33.9,
        catNumb: 1,
        isCheck: true
      })
    }
    return goodsList
  },
  globalData: {
    userInfo: null,
    systemInfo: null,
    catData: {
      goodsList: []
    }
  }
})