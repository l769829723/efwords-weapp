// pages/unit/unit.js
Page({
  data: {
    level: null
  },
  onLoad (option) {
    var vm = this;
    this.setData({
      level: option.level
    })
    wx.getStorage({
      key: 'datasets',
      success: function(res) {
        var units = res.data.units.filter(e => e.LevelNo == option.level).map(function(e){
          e.descript = e.UnitName + '相关的话题'
          return e
        })
        vm.setData({
          units: units
        })
      },
    })
  }
})