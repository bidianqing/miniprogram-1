// logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    filterOptions:{
      gender: ''
    },
    cascaderValue: '',
    cascaderTitle: '',
    hometownText: '',
    hometownValue: '',
    locationText: '',
    locationValue: '',
    cascaderAreaData:[
      {
        text: '河北省',
        value: '330000',
        children: [
          {
            text: '石家庄市',
            value: '130100',
            children: null
          },
          {
            text: '唐山市',
            value: '130200',
            children: null
          }
        ],
      }
    ],
    filterIsShow: false,
    areaIsShow: false,
    areaTarget: ''
  },
  onGenderChange(e){
    let self = this;
    self.setData({ 'filterOptions.gender': e.detail });
  },
  chat(){
    wx.navigateTo({
      url: '/pages/chat/chat',
    })
  },
  onShow(){
    let self = this;
    self.getTabBar().setData({ active : 1 })
  },
  showFilterPopup() {
    this.setData({ filterIsShow: true });
  },
  closeFilterPopup() {
    this.setData({ filterIsShow: false });
    console.log(this.data.filterOptions);
  },
  closeAreaPopup(){
    this.setData({ areaIsShow: false, areaTarget : '' });
  },
  openHometownArea(){
    let self = this;
    self.setData({ areaIsShow: true, areaTarget: 'hometown', cascaderTitle: '请选择家乡', cascaderValue: self.data.hometownValue });
  },
  openLocationArea(){
    let self = this;
    self.setData({ areaIsShow: true, areaTarget: 'location', cascaderTitle: '请选择目前所在地', cascaderValue: self.data.locationValue });
  },
  areaFinish(e){
    let self = this;
    console.log(e);
    const { selectedOptions, value } = e.detail;
    const text = selectedOptions
        .map((option) => option.text || option.name)
        .join('/');

    if(self.data.areaTarget == 'hometown'){
      self.setData({
        hometownText: text,
        hometownValue: value
      });
    } else if(self.data.areaTarget == 'location'){
      self.setData({
        locationText: text,
        locationValue: value
      });
    }
    
    self.closeAreaPopup();
  },
  onLoad() {
    let self = this;
  }
})
