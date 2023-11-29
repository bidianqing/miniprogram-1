// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {}
  },
  onShow(){
    let self = this;
    self.getTabBar().setData({ active : 0 })
  },
  onLoad() {
    console.log('index.js onLoad');
  },
  send: function(e) {
    app.sendMessage();
  }
})
