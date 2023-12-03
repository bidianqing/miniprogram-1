// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    msg: '',
    messages: [{"id":22,"text":"sdf"}]
  },
  onShow(){
    let self = this;
  },
  send: function(e) {
    let self = this;
    app.sendMessage(self.data.msg);
    var msgList = self.data.messages;
    msgList.push({
      "id": new Date().getTime(),
      "text": self.data.msg
    });
    self.setData({ messages: msgList })
  }
})