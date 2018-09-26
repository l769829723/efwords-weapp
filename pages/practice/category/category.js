// pages/practice/category/category.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 0,
    tabs: [
      '等级',
      '单元'
    ],
    options: [],
    game: {
      level: 0,
      unit: 0,
      processed: 0,
      input: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      options: wx.getStorageSync('datasets').levels.map(function(e){
        let name = e.LevelName
        e.name = name
        return e
      })
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
  handleChange({ detail }) {
    this.setData({
      current: detail.key
    });
  },
  handleSelect: function (e) {
    if(this.data.game.level === 0){
      this.setData({
        'game.level': e.target.dataset.item.LevelNo,
      })
      this.setData({
        options: wx.getStorageSync('datasets').units.filter(e => e.LevelNo === this.data.game.level).map(function(e){
          let name = e.UnitName
          e.name = name
          return e
        }),
        current: this.data.current + 1
      })
    }else{
      this.setData({
        'game.unit': e.target.dataset.item.UnitNo,
        options: []
      })
      this.setData({
        tabs: [
          '第 ' + this.data.game.level + ' 级 - 第 ' + this.data.game.unit + ' 单元'
        ],
        current: 0,
        words: this.getShuffleOfWords(wx.getStorageSync('datasets').words.filter(e => e.LevelNo === this.data.game.level && e.UnitNo === this.data.game.unit))
      })
      this.setData({
        count: this.data.words.length
      })
      this.setGuessWord()
    }
  },
  getShuffleOfWords: function (arr) {
    arr.sort(seed => Math.random() > .5 ? 1 : -1)
    return arr
  },
  setGuessWord: function () {
    // 设置要填写的单词
    if(this.data.words.length){
      this.setData({
        'game.word': this.data.words[0]
      })
    }else{
      wx.hideToast()
      wx.showModal({
        title: '恭喜',
        content: '你已经完成了所有单词的默写练习。',
        showCancel: false,
        confirmText: '返回',
        confirmColor: '#E91E63',
        success: function () {
          wx.redirectTo({
            url: '/pages/practice/category/category',
          })
        }
      })
    }
  },
  handleCheck: function () {
    // 检查填写的单词是否正确
    if (this.data.game.input.trim().toLowerCase() === this.data.game.word.WordText.trim().toLowerCase()) {
      wx.showToast({
        title: '恭喜，答对了。',
      })
      this.setData({
        'game.input': '',
        'game.processed': this.data.game.processed + 1
      })
      this.setData({
        'game.persent': parseFloat((this.data.game.processed / this.data.count * 100).toFixed(1))
      })
      // console.log(this.data.game.processed.toString() + '|' + this.data.count.toString())
      this.data.words.shift()
      this.setGuessWord()
    }else{
      wx.showToast({
        title: '好像不对',
        icon: 'warn'
      })
    }
  },
  setWordInput: function (e) {
    this.setData({
      'game.input': e.detail.value
    })
  },
  handleRefreshWords: function () {
    this.setData({
      words: this.getShuffleOfWords(this.data.words)
    })
    this.setGuessWord()
  }
})