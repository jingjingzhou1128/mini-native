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
    recomList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    this.setData({
      recomList: []
    })
    console.log(this.data.searchValue)
  },
  /**
   * @description 搜索框输入值更改时触发
   */
  onChange (e) {
    this.setData({
      searchValue: e.detail
    })
    let recomList = []
    if (e.detail !== '') {
      recomList = this.customData.list
    }
    this.setData({
      recomList: recomList
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
      recomList: []
    })
    let value = e.currentTarget.dataset && e.currentTarget.dataset.value
    console.log(value)
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