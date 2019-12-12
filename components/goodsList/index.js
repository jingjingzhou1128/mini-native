// components/goodsList/index.js
const app = getApp()

Component({
  properties: {
    goodsList: {
      type: Array,
      value: []
    },
    catAnimation: {
      type: Boolean,
      value: false
    }
  },
  data: {
    animationData: {},
    animationIndex: null
  },
  methods: {
    // 触发添加购物车
    handlerAddCat(e) {
      this.triggerEvent('addcat', { index: e.currentTarget.dataset.index })
      if (!this.properties.catAnimation) return
      let systemInfo = app.globalData.systemInfo
      let animation = wx.createAnimation()
      this.animation = animation
      const query = wx.createSelectorQuery().in(this)
      let _this = this
      query.select(`.goods${e.currentTarget.dataset.index}`).boundingClientRect()
      query.exec(function (res) {
        let y = systemInfo.windowHeight - res[0].top
        let x = (systemInfo.windowWidth / 8) * 5 - res[0].left - (res[0].width / 2)
        animation.opacity(1).step({
          duration: 1,
          timingFunction: 'step-start'
        })
        animation.translate(x, y).scale(0).step({
          duration: 1000,
          timingFunction: 'ease-in'
        })
        _this.setData({
          animationData: animation.export(),
          animationIndex: e.currentTarget.dataset.index
        })
        setTimeout(function () {
          animation.translate(0, 0).scale(1).opacity(0).step({
            duration: 0
          })
          _this.setData({
            animationData: animation.export()
          })
        }.bind(_this), 1000)
      })
    }
  }
})