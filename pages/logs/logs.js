// logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: []
  },
  onShow(){
    let self = this;
    self.getTabBar().setData({ active : 1 })
  },
  onLoad() {
    let self = this;

    self.setData({
      logs : wx.getStorageSync('logs') || []
    })
    console.log('log.js onLoad');
  }
})
