// app.js
App({
  onLaunch() {
    console.log('执行onLaunch方法')
    let self = this;
    
    self.start();

    wx.onSocketClose(function(){
      console.log('onSocketClose');
      self.globalData.isConnected = 0;
      self.start();
    })

    wx.onSocketError(function(errMsg){
      console.log('onSocketError');
      console.log(errMsg);
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
  receiveMessage(message){
    let self = this;
    console.log('receiveMessage方法被调用，入参：' + message);
  },
  start(){
    let self = this;
    console.log('WebSocket连接状态：' + self.globalData.isConnected);
    if(self.globalData.isConnected === 0){
      wx.connectSocket({
        url: 'wss://bidianqing.cn/chathub',
        success: function(){
          console.log('connectSocket调用成功');
        }
      })
    }

    wx.onSocketOpen(function(){
      console.log('开始握手');
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
