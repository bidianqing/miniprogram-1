// app.js
App({
  onLaunch() {
    let self = this;
    // 展示本地存储能力
    // const logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    wx.cloud.init({
      env: 'development'
    })
    self.globalData.db = wx.cloud.database({
      env: 'development-9gisgsae4eece201'
    })
    
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    
    self.start();

    wx.onSocketClose(function(){
      console.log('close');
      self.globalData.isConnected = 0;
      self.start();
    })

    wx.onSocketError(function(){
      console.log('error');
      self.globalData.isConnected = 0;
      self.start();
    })

    wx.onSocketMessage(function(message){
      var obj = JSON.parse(message.data.replace('',''));
      console.log(obj);
      // 根据方法名字，执行方法
      if(obj.target){
        self[obj.target](obj.arguments);
      }
    })
  },
  logout(arrayArg){
    let self = this;
    wx.closeSocket();
    self.globalData.logout = 1;
    console.log(arrayArg);
  },
  receiveOffLineMessage(arrayArg){
    let self = this;
    console.log(arrayArg);
  },
  receiveSingleMessage(arrayArg){
    let self = this;
    console.log(arrayArg);
    self.globalData.db.collection('tb_conversation').add({
      data:{
        fromUserId: arrayArg[0],
        content: arrayArg[1],
        sendTime: new Date()
      }
    })
  },
  start(){
    let self = this;
    console.log('WebSocket连接状态：' + self.globalData.isConnected);
    if(self.globalData.isConnected === 0 && self.globalData.logout === 0){
      wx.connectSocket({
        url: 'wss://bidianqing.natappvip.cc/chathub',
        header:{
          "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiMTExNzgyNTY2Mzg1MjY0MjMwNCIsIm5iZiI6MTY4NzQ0MzA4MCwiZXhwIjoxNjg5OTY5NjAwLCJpc3MiOiJjdXBpZGNvbWVvcmciLCJhdWQiOiJjY3VzZXIifQ.teYSQtgjX_Hhsw3V_4z_-mg82b5Xi3m4IuRNZS8SPaE",
          "Platform":"miniprogram"
        },
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
    logout: 0,
    db: null
  }
})
