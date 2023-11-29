// index.js
// 获取应用实例
const app = getApp()
import Notify from '@vant/weapp/notify/notify';

Page({
  data: {

  },
  onShow(){
    let self = this;
    self.getTabBar().setData({ active : 2 })
    wx.vibrateLong();
    Notify({ type: 'success', message: '通知内容' });
  }
})