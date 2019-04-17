//app.js
var util = require('utils/util.js')
App({
  onLaunch: function () {
    //先去数据库配对时间是否超时
    var state = wx.getStorageSync("login_state")
    if (state == true){
      wx.request({
        url: this.globalData.serverURL + '/onLaunch',   //  https://lym.ngrok.xiaomiqiu.cn/onLaunch
        data: {
          user_num: wx.getStorageSync("user_num")
        },
        success: res => {
          if (res.statusCode == 200 && res.data["overtime"] === '1') {
            wx.removeStorageSync("user_num")
            wx.removeStorageSync("login_state")
          }
          else { console.log("保留本机缓存") }
        }
      })
    }
  },


  globalData: {
    userInfo: null,
    serverURL: "https://lym.ngrok.xiaomiqiu.cn"// https://lym.ngrok.xiaomiqiu.cn  http://qa9r3k.natappfree.cc
  },

  

})