//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    history: {
      show: false
    }
  },
  onLoad: function () {
    var vm = this;
    wx.getStorage({
      key: 'datasets',
      success: function(res) {
        vm.setLevelAndUnits(
          res.data
        )
      }
    })
  },
  onShow: function () {
    var vm = this;
    wx.getStorage({
      key: 'viewOption',
      success: function(res) {
        vm.setData({
          history: {
            show: true,
            level: res.data.level,
            unit: res.data.unit
          }
        })
      },
    })
  },
  // getLevelsAndUnits: function () {
  //   var vm = this;
  //   wx.request({
  //     url: 'http://host805152710.s834.pppf.com.cn/levels.php',
  //     method: 'GET',
  //     success: function (res) {
  //       var raw_data = res.data
  //       var processed_data = []
  //       raw_data.forEach(function(e){
  //         var units = e.Units.map(function(e){
  //           return e.UnitName
  //         })
  //         e.descript = units.join('、')
  //         processed_data.push(e)
  //       })
  //       wx.setStorage({
  //         key: 'levelsAndUnits',
  //         data: JSON.stringify(res.data),
  //       })
  //       vm.setLevelAndUnits(res.data)
  //       vm.closeLoading()
  //     },
  //     fail: function() {
  //       vm.closeLoading()
  //       wx.showModal({
  //         title: '错误：',
  //         content: '请检查你的网络设置，并重启小程序。',
  //         showCancel: false,
  //         confirmText: '我明白了',
  //         confirmColor: '#E91E63',
  //         success: function (res) {
  //           if (res.confirm) {
  //             wx.reLaunch({
  //               url: '/pages/levels/levels'
  //             })
  //           }
  //         }
  //       })
  //     }
  //   })
  // },
  setLevelAndUnits: function (values) {
    var levels = values.levels.map(function(e){
      var units = values.units.filter(u => u.LevelNo == e.LevelNo).map(u => u.UnitName)
      e.descript = ''.concat(units)
      return e
    })
    this.setData({
      levelsAndUnits: levels
    })
  },
  closeLoading: function() {
    wx.hideLoading();
  }
})
