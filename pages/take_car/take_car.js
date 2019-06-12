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
        that.setData({
          gar_data: list
        })
      }
    }
  })
},


try_to: function () {
  console.log("dasdad")
},

})
