// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchValue: '',
    historyList: [
      {
        name: '鲜活大闸蟹',
        value: '1',
        isHot: false
      },
      {
        name: '基围虾',
        value: '2',
        isHot: false
      },
      {
        name: '爱媛果冻橙',
        value: '3',
        isHot: false
      }
    ],
    hotList: [
      {
        name: '鲜活大闸蟹',
        value: '1',
        isHot: true
      },
      {
        name: '鸡翅中',
        value: '2',
        isHot: false
      },
      {
        name: '西红柿',
        value: '3',
        isHot: false
      },
      {
        name: '基围虾',
        value: '3',
        isHot: false
      },
      {
        name: '爱媛果冻橙',
        value: '3',
        isHot: false
      }
    ],
    searching: false,
    recomList: [],
    isSearching: false,
    goodsList: [],
    defaultSearchValue: '',
    isLoading: true,
    recomGoodsList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      defaultSearchValue: '白鹤草莓 19.9元'
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * @description 搜索
   */
  onSearch (e) {
    if (!this.data.defaultSearchValue && !this.data.searchValue) return
    let searchValue = this.data.searchValue || this.data.defaultSearchValue 
    this.setData({
      recomList: [],
      isSearching: true,
      searchValue: searchValue,
      isLoading: true
    })
    let _this = this
    setTimeout(function () {
      let goodsList = _this.getGoodsList()
      if (_this.data.searchValue === 'empty') {
        _this.setData({
          isLoading: false,
          recomGoodsList: goodsList
        })
      } else {
        _this.setData({
          goodsList: goodsList,
          isLoading: false
        })
      }
    }, 2000)
  },
  /**
   * @description 搜索框输入值更改时触发
   */
  onChange (e) {
    this.setData({
      searchValue: e.detail
    })
    let recomList = []
    if (e.detail) {
      recomList = this.customData.list
    }
    this.setData({
      recomList: recomList
    })
  },
  /**
   * @description 搜索框聚焦时触发
   */
  onFocus (e) {
    this.setData({
      isSearching: false,
      goodsList: []
    })
  },
  /**
   * @description 搜索框清空时触发
   */
  onClear () {
    this.setData({
      isSearching: false,
      goodsList: []
    })
  },
  /**
   * @description 删除历史记录
   */
  deleteHistory () {
    this.setData({
      historyList: []
    })
  },
  /**
   * @description 点击热门搜索或者历史搜索
   */
  quickSearch (e) {
    this.setData({
      recomList: [],
      isSearching: true,
      searchValue: e.currentTarget.dataset && e.currentTarget.dataset.value,
      isLoading: true
    })
    let _this = this
    setTimeout(function () {
      let goodsList = _this.getGoodsList()
      _this.setData({
        goodsList: goodsList,
        isLoading: false
      })
    }, 2000)
  },

  /**
   * @description 获取商品列表信息
   */
  getGoodsList () {
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
    return goodsList
  },
  // 添加商品到购物车
  addCat: function (e) {
    let index = e.detail.index
    this.setData({
      [`goodsList[${index}].catNumb`]: this.data.goodsList[index].catNumb + 1
    })
  },
  // 添加推荐商品到购物车
  addRecomCat: function (e) {
    let index = e.detail.index
    this.setData({
      [`recomGoodsList[${index}].catNumb`]: this.data.recomGoodsList[index].catNumb + 1
    })
  },

  /**
   * @description 自定义数据
   */
  customData: {
    list: [
      {
        name: '鲜活大闸蟹',
        value: '1'
      },
      {
        name: '鸡翅中',
        value: '2'
      },
      {
        name: '西红柿',
        value: '3'
      },
      {
        name: '基围虾',
        value: '4'
      },
      {
        name: '爱媛果冻橙',
        value: '5'
      }
    ]
  }
})