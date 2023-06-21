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
    wx.onSocketMessage(function(message){
      var obj = JSON.parse(message.data.replace('',''));
      console.log(obj);
      // 根据方法名字，执行方法
      if(obj.target){
        self[obj.target](obj.arguments);
      }
    })
    
  },
  receiveMessage(arg){
    let self = this;
    console.log(arg[0]);
    self.data.logs.push({ message:arg[0]});
    self.setData({
      logs : self.data.logs
    })
  }
})
