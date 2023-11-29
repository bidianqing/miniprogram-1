// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {

  },
  onShow(){
    let self = this;
    self.getTabBar().setData({ active : 2 })
  }
})