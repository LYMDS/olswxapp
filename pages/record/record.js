const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //first_click: [false, false, false, false, false, false, false, false],
    //state: [false, false, false, false, false, false, false, false]
    first_click: null,
    state: null
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
          //var status = [false, false, false, false, false, false, false, false];
          that.setData({
            bill: res.data.all,
            state: status,
            first_click: status,
          });
        }
      }
    })
  },


  show_or_hide: function(res){
    var that = this;
    // console.log(res);
    var num = parseInt(res.currentTarget.dataset.num);
    // console.log(num);

    var no_state = !that.data.state[num];
    var index = "first_click[" + num + "]";
    var index1 = "state[" + num + "]";
    that.setData({
      [index]: true,
      [index1]: no_state
    })  
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