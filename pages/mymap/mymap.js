// 引入SDK核心类
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');

// 实例化API核心类
var qqmapsdk = new QQMapWX({
  key: '7RHBZ-EUAKQ-DOS56-GAQYW-4IA4J-H2BYA' // 必填
});
//获取应用实例
const app = getApp()

Page({
  data: {
    latitude: 23.1078092709,
    longitude: 113.2813918591,
    markers: null,
  },

  onLoad:function(){
    var stu = wx.getStorageSync("login_state")
    var user = wx.getStorageSync("user_num")
    if (stu == null || stu == false || user == null) {
      wx.redirectTo({
        url: '../login/login'
      })
    }
    else { console.log("在index页面加载时登录成功") }

    var that = this
    wx.request({
      url: app.globalData.serverURL + '/map_init',
      data: {
        //后期做密钥算法
      },
      success: function(res) {
        var info =  res.data['garage_info']
        console.log(info)
        var list = []
        for ( let i=0 ; i < info.length ; i+=1){
          var a = {
            iconPath: '../../img/4.png',
            id: i,
            latitude: info[i].latitude,
            longitude: info[i].longitude,
            width: 20,
            height: 38,
            name: info[i].garage_name,
            address:info[i].address,
            callout: {
              content: info[i].garage_name + '/空位:' + info[i].empty,
              display: 'BYCLICK',
              textAlign: 'center',
              padding: 1,
              fontSize: 10,
            }
          };list.push(a)
        }
        that.setData({
          markers:list
        })
        
      }
    });

  },

  map_init :function(e){
    var x = this.data.markers[e.markerId].latitude
    var y = this.data.markers[e.markerId].longitude
    var garage_name = this.data.markers[e.markerId].name
    var addr = this.data.markers[e.markerId].address
    wx.openLocation({
      latitude: x,
      longitude: y,
      scale: 14,
      name: garage_name, //打开后显示的地址名称
      address: addr,
    })
    
  },

  go_control: function(e){
    console.log(e.controlId)
  },

  scan_code: function(){
    var that = this;
    wx.scanCode({
      onlyFromCamera: true,
      scanType: ['barCode', 'qrCode'],
      success: function(res) {
        const code = res.path.slice(res.path.indexOf('=')+1)
        console.log(code)
        app.globalData.garage_code = code
        wx.navigateTo({
          url: '../take_car/take_car',
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    });
  },

  user_side:function(){
    var that = this
    wx.getLocation({
      type:'gcj02',
      success: function(res) {
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })
      },
    })
  },


  to_personal: function(){
    wx.navigateTo({
      url: '../bill/bill',
    })
  },
  to_except: function(){
    wx.navigateTo({
      url: '../user_exc/user_exc',
    })
  },
  to_tip: function(){
    wx.navigateTo({
      url: '../tip/tip',
    })
  }


  })