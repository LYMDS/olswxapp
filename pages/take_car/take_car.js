// 引入SDK核心类
const app = getApp();
Page({
  data: {
    choose_car: "",
    gar_data: [],
  },

  onLoad: function(){
    var that = this;
    wx.request({
      url: app.globalData.serverURL + '/garage_msg/',
      data: {
        garage_code: app.globalData.garage_code
      },
      success: res => {
        if (res.statusCode == 200) {
          const list = res.data["gar_msg"];
          console.log(list)
          that.setData({
            gar_data: list,
            distance: app.globalData.distance
          })
        }
      }
    });

  },
  choice: function(res){
    var that = this;
    console.log(res);
    console.log(res.currentTarget.dataset.num);
    that.data.gar_data
    if (res.currentTarget.dataset.num){}
    this.setData({
      choose_car: res.currentTarget.dataset.num
    })
  },
  go_map: function () {
    var x = app.globalData.x
    var y = app.globalData.y
    var garage_name = app.globalData.garage_name
    var addr = app.globalData.addr
    wx.openLocation({
      latitude: x,
      longitude: y,
      scale: 14,
      name: garage_name, //打开后显示的地址名称
      address: addr,
    })
  },
})
