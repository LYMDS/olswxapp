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
  }
})