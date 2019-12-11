// components/goodsList/index.js
Component({
  properties: {
    goodsList: {
      type: Array,
      value: []
    }
  },
  data: {
    animationData: {},
    animationIndex: null
  },
  methods: {
    // 触发添加购物车
    handlerAddCat(e) {
      let animation = wx.createAnimation({
        duration: 1000,
        timingFunction: 'ease',
      })
      this.animation = animation
      animation.translate(100, 100).scale(0).step()
      this.setData({
        animationData: animation.export(),
        animationIndex: e.currentTarget.dataset.index
      })
      setTimeout(function () {
        animation.translate(0, 0).scale(1).step({
          duration: 0
        })
        this.setData({
          animationData: animation.export()
        })
      }.bind(this), 1000)
      this.triggerEvent('addcat', { index: e.currentTarget.dataset.index })
    }
  }
})