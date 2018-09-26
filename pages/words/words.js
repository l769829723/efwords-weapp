// pages/words/words.js
Page({
  data: {
    wordModal: false,
    wordModalActions: [
      {
        name: '关闭',
        color: '#E91E63',
      }
    ],
    words: []
  },
  onLoad (option) {
    var vm = this
    wx.getStorage({
      key: 'datasets',
      success: function(res) {
        var words = res.data.words.filter(e => e.LevelNo.toString() == option.level && e.UnitNo.toString() == option.unit).map(function(e){
          wx.request({
            url: 'https://ec.ef.com.cn/translator/Translating/TranslateByEtownDefId/?toolbar=notebook&translateCultureCode=cs&src=all&etowndef_id=' + e.EtownDefinition_id.toString(),
            success: function(res) {
              var processedData = vm.processWordData(res.data)
              e.Pronunciation = processedData.Pronunciation
              var temp_words = vm.data.words
              temp_words.push(e)
              vm.setData({
                words: temp_words
              })
            }
          })
          return e
        })
      }
    })
    // this.data.units.forEach(item => {
    //   if(option.level === item.level.toString()){
    //     if(option.unit === item.unit.toString()){
    //       vm.setData({
    //         words: item.words
    //       })
    //     }
    //   }
    // })
    // if(!this.data.words || !this.data.words.length){
    //   wx.showModal({
    //     title: '提示：',
    //     content: '这里目前还没有数据，请返回。',
    //     showCancel: false,
    //     confirmText: '返回首页',
    //     confirmColor: '#E91E63',
    //     success: function (res) {
    //       if (res.confirm) {
    //         wx.reLaunch({
    //           url: '/pages/levels/levels'
    //         })
    //       }
    //     }
    //   })
    // } else {
    //   wx.setStorage({
    //     key: "viewOption",
    //     data: option
    //   })
    // }
    wx.setStorage({
      key: "viewOption",
      data: option
    })
  },
  showDetail: function(event){
    // 打开模态框
    var word = event.currentTarget.dataset.word
    this.setData({
      wordModal: true,
      wordModalData: word
    })
  },
  closeModal: function(){
    // 关闭模态框
    this.setData({
      wordModal: false
    })
  },
  processWordData: function(res) {
    var word_data = {
      Pronunciation: ''
    }
    // 对接口返回的数据进行处理
    var pronunciation = res.match(/<span class="pronunciation">(\S+)<\/span>/g)
    if(pronunciation){
      pronunciation = pronunciation.map(e => e.match(/>\/(\S+)\/</)[1])
      word_data['Pronunciation'] = '英：[' + pronunciation[0] + '] 美：[' + pronunciation[1] + ']'
    }
  return word_data
  }
})