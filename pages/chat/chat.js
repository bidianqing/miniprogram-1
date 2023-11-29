// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    msg: '',
  },
  onShow(){
    let self = this;
  },
  send: function(e) {
    let self = this;
    app.sendMessage(111);
  }
})