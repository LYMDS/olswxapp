const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: app.globalData.serverURL+'/information',
      data: {
        user_num: 1
      },
      success: res => {
        if (res.statusCode == 200) {
          var bill = res.data.all
          console.log(res);
          for (let i = 0; i < bill.length; i++) {
            bill[i][0] = bill[i][0].replace("T", " ");
            bill[i][0] = bill[i][0].slice(0,bill[i][0].lastIndexOf(":"));
          };

          var status = new Array(bill.length).fill(false);
          that.setData({
            bill: res.data.all,
            state: status,
            first_click: status
          });
        }
      }
    })
  },


  show_or_hide: function(res){
    var that = this;
    // console.log(res);
    const num = parseInt(res.currentTarget.dataset.num);
    // console.log(num);

    var list_state = that.data.state;
    var first_state = that.data.first_click;
    if (!first_state[num]) {
      first_state[num] = true;
      that.setData({
        first_click: first_state
      });
    }
    if (list_state[num]) {
      list_state[num] = false;
      that.setData({
        state: list_state
      });
    } else {
      list_state[num] = true;
      that.setData({
        state: list_state
      });
    }

    

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})