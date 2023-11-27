// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {}
  },
  onLoad() {
    console.log('index.js onLoad');
  },
  send: function(e) {
    app.sendMessage();
  }
})
