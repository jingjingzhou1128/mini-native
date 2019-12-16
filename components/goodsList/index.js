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
    // animationData: {},
    // animationIndex: null,
    point: {
      x: 0,
      y: 0,
      scale: 1,
      opacity: 0
    },
    pointImg: ''
  },
  methods: {
    // 生成抛物线坐标轨迹
    bezier: function (points, times) {
      // 0、以3个控制点为例，点A,B,C,AB上设置点D,BC上设置点E,DE连线上设置点F,则最终的贝塞尔曲线是点F的坐标轨迹。
      // 1、计算相邻控制点间距。
      // 2、根据完成时间,计算每次执行时D在AB方向上移动的距离，E在BC方向上移动的距离。
      // 3、时间每递增100ms，则D,E在指定方向上发生位移, F在DE上的位移则可通过AD/AB = DF/DE得出。
      // 4、根据DE的正余弦值和DE的值计算出F的坐标。
      // 邻控制AB点间距
      var bezier_points = [];
      var points_D = [];
      var points_E = [];
      const DIST_AB = Math.sqrt(Math.pow(points[1]['x'] - points[0]['x'], 2) + Math.pow(points[1]['y'] - points[0]['y'], 2));
      // 邻控制BC点间距
      const DIST_BC = Math.sqrt(Math.pow(points[2]['x'] - points[1]['x'], 2) + Math.pow(points[2]['y'] - points[1]['y'], 2));
      // D每次在AB方向上移动的距离
      const EACH_MOVE_AD = DIST_AB / times;
      // E每次在BC方向上移动的距离 
      const EACH_MOVE_BE = DIST_BC / times;
      // 点AB的正切
      const TAN_AB = (points[1]['y'] - points[0]['y']) / (points[1]['x'] - points[0]['x']);
      // 点BC的正切
      const TAN_BC = (points[2]['y'] - points[1]['y']) / (points[2]['x'] - points[1]['x']);
      // 点AB的弧度值
      const RADIUS_AB = Math.atan(TAN_AB);
      // 点BC的弧度值
      const RADIUS_BC = Math.atan(TAN_BC);
      // 每次执行
      for (var i = 1; i <= times; i++) {
        // AD的距离
        var dist_AD = EACH_MOVE_AD * i;
        // BE的距离
        var dist_BE = EACH_MOVE_BE * i;
        // D点的坐标
        var point_D = {};
        point_D['x'] = dist_AD * Math.cos(RADIUS_AB) + points[0]['x'];
        point_D['y'] = dist_AD * Math.sin(RADIUS_AB) + points[0]['y'];
        points_D.push(point_D);
        // E点的坐标
        var point_E = {};
        point_E['x'] = dist_BE * Math.cos(RADIUS_BC) + points[1]['x'];
        point_E['y'] = dist_BE * Math.sin(RADIUS_BC) + points[1]['y'];
        points_E.push(point_E);
        // 此时线段DE的正切值
        var tan_DE = (point_E['y'] - point_D['y']) / (point_E['x'] - point_D['x']);
        // tan_DE的弧度值
        var radius_DE = Math.atan(tan_DE);
        // 地市DE的间距
        var dist_DE = Math.sqrt(Math.pow((point_E['x'] - point_D['x']), 2) + Math.pow((point_E['y'] - point_D['y']), 2));
        // 此时DF的距离
        var dist_DF = (dist_AD / DIST_AB) * dist_DE;
        // 此时DF点的坐标
        var point_F = {};
        point_F['x'] = dist_DF * Math.cos(radius_DE) + point_D['x'];
        point_F['y'] = dist_DF * Math.sin(radius_DE) + point_D['y'];
        bezier_points.push(point_F);
      }
      return bezier_points
    },
    // 添加购物车动画
    startAnimation: function (startPoint, points) {
      var index = 0,
        _this = this,
        bezier_points = points
      this.setData({
        'point.opacity': 1,
        'point.scale': 1,
        'point.x': startPoint.x - 50,
        'point.y': startPoint.y - 50
      })
      this.timer = setInterval(function () {
        if (index > (bezier_points.length - 1)) {
          _this.setData({
            point: {
              x: 0,
              y: 0,
              opacity: 0,
              scale: 0
            },
            pointImg: ''
          })
          clearInterval(_this.timer)
          _this.timer = null
          return
        }
        _this.setData({
          'point.x': bezier_points[index]['x'] - 50,
          'point.y': bezier_points[index]['y'] - 50,
          'point.scale': 1 - (1 / bezier_points.length * (index - 1))
        })
        index++
      }, 33)
    },
    // 触发添加购物车
    handlerAddCat(e) {
      if (this.timer) return
      this.triggerEvent('addcat', { index: e.currentTarget.dataset.index })
      // wx.setTabBarBadge({
      //   index: 2,
      //   text: (++app.globalData.catData.sum).toString()
      // })
      if (!this.properties.catAnimation) return
      this.setData({
        pointImg: e.currentTarget.dataset.img
      })
      let systemInfo = app.globalData.systemInfo
      let catPoint = {
        x: (systemInfo.windowWidth / 8) * 5,
        y: systemInfo.windowHeight
      },
        goodsPoint = {},
        middlePoint = {}
      let _this = this
      const query = wx.createSelectorQuery().in(this)
      query.select(`.goods${e.currentTarget.dataset.index}`).boundingClientRect()
      query.exec(function (res) {
        goodsPoint.x = res[0].left + res[0].width / 2
        goodsPoint.y = res[0].top + res[0].height / 2
        middlePoint.y = goodsPoint.y - 150
        let points
        if (goodsPoint.x > catPoint.x) {
          middlePoint.x = (goodsPoint.x - catPoint.x) / 2 + catPoint.x
          points = _this.bezier([catPoint, middlePoint, goodsPoint], 30)
          points.reverse()
        } else {
          middlePoint.x = (catPoint.x - goodsPoint.x) / 2 + goodsPoint.x
          points = _this.bezier([goodsPoint, middlePoint, catPoint], 30)
        }
        _this.startAnimation(goodsPoint, points)
      })

      // if (!this.properties.catAnimation) return
      // let systemInfo = app.globalData.systemInfo
      // let animation = wx.createAnimation()
      // this.animation = animation
      // const query = wx.createSelectorQuery().in(this)
      // let _this = this
      // query.select(`.goods${e.currentTarget.dataset.index}`).boundingClientRect()
      // query.exec(function (res) {
      //   let y = systemInfo.windowHeight - res[0].top
      //   let x = (systemInfo.windowWidth / 8) * 5 - res[0].left - (res[0].width / 2)
      //   animation.opacity(1).step({
      //     duration: 1,
      //     timingFunction: 'step-start'
      //   })
      //   animation.translate(x, y).scale(0).step({
      //     duration: 1000,
      //     timingFunction: 'ease-in'
      //   })
      //   _this.setData({
      //     animationData: animation.export(),
      //     animationIndex: e.currentTarget.dataset.index
      //   })
      //   setTimeout(function () {
      //     animation.translate(0, 0).scale(1).opacity(0).step({
      //       duration: 0
      //     })
      //     _this.setData({
      //       animationData: animation.export()
      //     })
      //   }.bind(_this), 1000)
      // })
    }
  }
})