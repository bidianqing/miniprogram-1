// logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: []
  },
  onLoad() {
    let self = this;

    self.setData({
      logs : wx.getStorageSync('logs') || []
    })
    console.log('log.js onLoad');
  }
})
