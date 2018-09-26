// pages/index/index.js
import datasets from '../../utils/database'
Page({
  data: {
  },
  handleClick: function () {
    wx.redirectTo({
      url: '/pages/levels/levels'
    })
  },
  handlePractice: function () {
    wx.navigateTo({
      url: '/pages/practice/category/category'
    })
  },
  onLoad: function() {
    wx.getStorage({
      key: 'datasets',
      fail: function() {
        wx.setStorage({
          key: 'datasets',
          data: JSON.parse(datasets),
        })
      },
    })
  }
})