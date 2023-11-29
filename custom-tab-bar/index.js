Component({
    data: {
      active: 0,
      list:[
        {
          "url": "/pages/index/index",
          "icon": "chat-o",
          "text": "消息"
        },
        {
          "url": "/pages/logs/logs",
          "icon": "search",
          "text": "发现"
        },
        {
          "url": "/pages/my/my",
          "icon": "contact-o",
          "text": "我的"
        }
      ]
    },
    methods:{
        onChange(event) {
          let self = this;
          wx.switchTab({
            url: self.data.list[event.detail].url
          })
        }
    }
});
  