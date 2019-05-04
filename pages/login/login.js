const app = getApp()
Page({
  data: {
    phone:"",
    code:"",
    time:"获取验证码",
    currentTime: 61,
    canIget:true,
    canIlogin:true
  },




  login: function () {
    wx.request({
      url: app.globalData.serverURL + '/login',//https://lym.ngrok.xiaomiqiu.cn/connect
      data: {
        phone: this.data.phone,
        code: this.data.code
      },
      success: res => {
        if (res.statusCode == 200 && res.data["check"] == '1' && res.data["overtime"] == "0") {
          var user_num = res.data["user_num"]
          //console.log(res.data["check"])
          //console.log(user_num)
          wx.setStorageSync("login_state", true)
          wx.setStorageSync("user_num", user_num)
          wx.redirectTo({
            url: '../mymap/mymap'
          })

        }
        else if (res.data["overtime"] == "1"){
          wx.showToast({
            title: '验证码已过期',
            duration:1000,
            icon:'loading'
          })
        }
        else if (res.data["check"] == '0'){
          wx.showToast({
            title: '验证码错误',
            duration: 1000,
            icon: 'loading'
          })
        }
      }
    });
  },

  getCode: function(){
    wx.request({
      url: app.globalData.serverURL + '/getCode',//https://lym.ngrok.xiaomiqiu.cn/connect
      data: {
        phone: this.data.phone,
      },
      success: res => {
        if (res.statusCode == 200) {
          console.log(res.data["code"])
          
        }
      }
    });

    var that = this;
    var currentTime = that.data.currentTime;
    var interval = setInterval(function () {
      currentTime--;
      that.setData({
        time: currentTime + '秒',
        canIget:true
      })
      if (currentTime <= 0) {
        clearInterval(interval)
        that.setData({
          time: '重新发送',
          currentTime: 61,
          canIget: false
        })
      }
    }, 1000)
  },

  input1: function(e){
    var input = e.detail.value
    if (input.length < 11) {
      console.log("把（获取验证码）按钮改为不可点击状态、灰颜色")
      this.setData({
        phone: input,
        canIget:true,
        canIlogin:true
      });
    } else if (input.length == 11) {
      console.log("把（获取验证码）按钮改为可点击状态、绿颜色")
      this.setData({
        phone: input,
        canIget:false
      })
    }
    
  },

  input2: function(e){
    var input = e.detail.value
    if (input.length < 6) {
      console.log("把（登陆）按钮改为不可点击状态、灰颜色")
      this.setData({
        code: input,
        canIlogin:true
      })
    } else if (input.length == 6 && this.data.phone.length == 11) {
      console.log("把（登陆）按钮改为可点击状态、绿颜色")
      this.setData({
        code: input,
        canIlogin: false
      })
    }
    
  },
    
})