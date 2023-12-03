// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    msg: '',
    messages: []
  },
  onShow(){
    let self = this;
  },
  send: function(e) {
    let self = this;
    app.sendMessage(self.data.msg);
    var msgList = self.data.messages.push({
      "id": new Date().getTime(),
      "text": self.data.msg
    });
    self.setData({ messages: self.data.messages, msg: '' })
  }
})