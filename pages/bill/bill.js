Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  to_wallet: function(){
    wx.navigateTo({
      url: '../charge/charge',
    })
  },

  to_login:function(){
    wx.navigateTo({
      url: '../login/login',
    })
  },

  to_mybill:function(){
    wx.navigateTo({
      url: '../record/record',
    })
  }
})