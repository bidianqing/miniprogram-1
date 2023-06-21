// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    // const logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })

    let self = this;
    self.start();

    wx.onSocketClose(function(){
      console.log('close');
      self.globalData.isConnected = 0;
      self.start();
    })



  },
  start(){
    let self = this;
    console.log('WebSocket连接状态：' + self.globalData.isConnected);
    if(self.globalData.isConnected === 0){
      wx.connectSocket({
        url: 'wss://bidianqing.natappvip.cc/chathub',
        success: function(){
          console.log('connectSocket调用成功');
        }
      })
    }

    wx.onSocketOpen(function(){
      console.log('握手');
      self.globalData.isConnected = 1;
      wx.sendSocketMessage({
        data: '{"protocol":"json","version":1}'
      })
    })
  },
  globalData: {
    userInfo: null,
    isConnected: 0,
  }
})
