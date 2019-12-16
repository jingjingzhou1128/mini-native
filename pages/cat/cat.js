// pages/cat/cat.js
Page({

  /**
   * Page initial data
   */
  data: {
    // 商品列表
    goodsList: [],
    // 选中商品值
    // selectedGoods: [],
    // 是否选中所有
    allSelected: false,
    // 勾选商品总价格
    selectedPrice: 0,
    // 已勾选的商品数
    selectedNumb: 0,
    // 推荐商品列表
    recomList: [],
    // 是否吸顶
    isSticky: false
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.getGoodsList()
    this.selectOrCancelAll(true)
    this.setSelectedNumb()
    this.setSelectPrice()
    this.getRecomList()
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

  /**
   * 监听页面滚动事件
   */
  onPageScroll: function (obj) {
    this.setData({
      isSticky: obj.scrollTop >= 40
    })
  },
  /**
   * @description 获取推荐商品列表信息
   */
  getRecomList() {
    let goodsList = []
    for (let i = 0; i < 10; i++) {
      goodsList.push({
        src: '../../assets/images/fruit.png',
        title: '湾仔码头三鲜水饺300g',
        desc: '瞧这一个个白小胖 可爱诱人',
        price: 33.9,
        catNumb: 0
      })
    }
    this.setData({
      recomList: goodsList
    })
  },
  // 获取商品列表信息
  getGoodsList() {
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
    this.setData({
      goodsList: [...this.data.goodsList, ...goodsList]
    })
  },
  // 选中或取消选择所有商品
  selectOrCancelAll (value) {
    let goodsList = this.data.goodsList
    goodsList.map(item => {
      item.isCheck = value
      return item
    })
    this.setData({
      allSelected: value,
      goodsList
    })
  },
  // 设置已勾选的商品数
  setSelectedNumb () {
    this.setData({
      selectedNumb: this.data.goodsList.filter(item => item.isCheck).length
    })
  },
  // 设置已勾选商品总值
  setSelectPrice () {
    let value = this.data.goodsList.reduce(function (total, currentValue) {
      if (!currentValue.isCheck) return total
      return total + currentValue.catNumb * currentValue.price
    }, 0)
    // console.log(parseFloat(value.toFixed(2)))
    this.setData({
      selectedPrice: value * 100
    })
  },
  // // 取消全选
  // cancelSelectAll () {
  //   this.setData({
  //     selectedGoods: [],
  //     allSelected: false
  //   })
  // },
  // 选中商品值变化触发事件
  // handlerSelectChange (e) {
  //   this.setData({
  //     selectedGoods: e.detail,
  //     allSelected: e.detail.length < this.data.goodsList.length ? false : true
  //   })
  // },
  // 点击单个checkbox
  handlerTapCheck (e) {},
  // 单个checkbox值改变时
  handlerCheckChange (e) {
    let id = e.currentTarget.dataset.id
    let index = this.data.goodsList.findIndex(item => item.id === id)
    if (index < 0) return
    this.setData({
      [`goodsList[${index}].isCheck`]: e.detail
    })
    this.setSelectAll()
    this.setSelectedNumb()
    this.setSelectPrice()
  },
  // 根据商品勾选情况设置全选值
  setSelectAll () {
    let isAll = this.data.goodsList.every(item => item.isCheck)
    this.setData({
      allSelected: isAll
    })
  },
  // 减少购物车
  handlerReduceCat(e) {
    let index = e.currentTarget.dataset.index
    if (this.data.goodsList[index].catNumb <= 0) return
    if (this.data.goodsList[index].catNumb === 1) {
      let _this = this
      wx.showModal({
        title: '提示',
        content: '您确定删除该商品吗？',
        success(res) {
          if (res.confirm) {
            _this.deleteGoods(e.currentTarget.dataset.id)
          } else if (res.cancel) {
            console.log('cancel')
          }
        }
      })
      return
    }
    this.setData({
      [`goodsList[${index}].catNumb`]: this.data.goodsList[index].catNumb - 1
    })
    this.setSelectPrice()
  },
  // 添加购物车
  handlerAddCat(e) {
    let index = e.currentTarget.dataset.index
    this.setData({
      [`goodsList[${index}].catNumb`]: this.data.goodsList[index].catNumb + 1
    })
    this.setSelectPrice()
  },
  // 选中所有值更改触发
  handlerAllChange (e) {
    // if (e.detail) {
    //   this.selectAll()
    // } else {
    //   this.cancelSelectAll()
    // }
    this.selectOrCancelAll(e.detail)
    this.setSelectedNumb()
    this.setSelectPrice()
    // let goodsList = this.data.goodsList
    // goodsList.map(item => {
    //   item.isCheck = e.detail
    //   return item
    // })
    // this.setData({
    //   allSelected: e.detail,
    //   goodsList
    // })
  },
  // 长按商品项
  handlerLongTap (e) {
    let _this = this
    wx.showModal({
      title: '提示',
      content: '您确定删除该商品吗？',
      success(res) {
        if (res.confirm) {
          _this.deleteGoods(e.currentTarget.dataset.id)
        } else if (res.cancel) {
          console.log('cancel')
        }
      }
    })
  },
  // 删除商品
  deleteGoods (id) {
    let goodsList = this.data.goodsList
    let index = goodsList.findIndex(item => item.id === id)
    if (index < 0) return
    goodsList.splice(index, 1)
    this.setData({
      goodsList: goodsList,
    })
    // let selectedGoods = this.data.selectedGoods
    // let selectedIndex = selectedGoods.findIndex(value => value === id)
    // if (selectedIndex > -1) {
    //   selectedGoods.splice(selectedIndex, 1)
    //   this.setData({
    //     selectedGoods: selectedGoods
    //   })
    // }
    this.setSelectAll()
    this.setSelectedNumb()
    this.setSelectPrice()
    // this.setData({
    //   allSelected: selectedGoods.length < goodsList.length ? false : true
    // })
  },
  // 提交订单
  sumitOrder() {},
  // 添加推荐商品到购物车
  addRecomCat (e) {
    let index = e.detail.index
    this.setData({
      [`recomList[${index}].catNumb`]: this.data.recomList[index].catNumb + 1
    })
  },
  // 空方法
  none () {}
})