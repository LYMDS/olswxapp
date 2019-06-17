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
            code: info[i].garage_code,
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
    that.side();

  },

  


  show_garage: function(e){
    var that = this
    var x = that.data.markers[e.markerId].latitude;
    var y = that.data.markers[e.markerId].longitude;
    var garage_name = that.data.markers[e.markerId].name;
    var addr = that.data.markers[e.markerId].address;
    var code = that.data.markers[e.markerId].code;
    app.globalData.x = x;
    app.globalData.y = y;
    app.globalData.garage_name = garage_name;
    app.globalData.addr = addr;
    const to_side = String(that.data.markers[e.markerId].latitude) + ',' + String(that.data.markers[e.markerId].longitude);
    var from_side = that.side()
    console.log(to_side)
    console.log(from_side)
    qqmapsdk.calculateDistance({
      //mode: 'driving',//可选值：'driving'（驾车）、'walking'（步行），不填默认：'walking',可不填
      //from参数不填默认当前地址
      //获取表单提交的经纬度并设置from和to参数（示例为string格式）
      from: from_side,
      to: to_side, //终点坐标
      success: function (res) {
        console.log(res.result.elements[0].distance);
        const less_distance = 60     //至少距离车库60米
        if (res.result.elements[0].distance <= less_distance) {
          app.globalData.distance = true;
        } else {
          app.globalData.distance = false;
        };
        app.globalData.garage_code = code;
        wx.navigateTo({
          url: '../take_car/take_car',
        });
      },
      fail: function (error) {
        console.error(error);
      },
      complete: function (res) {
        console.log(res);
      }
    });
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
        //检查扫码距离
        const from_side = that.side();
        console.log(from_side);
        var which = 0;
        while(that.data.markers[which].code != code){which++}
        const to_side = String(that.data.markers[which].latitude) + ',' + String(that.data.markers[which].longitude);
        console.log(to_side, that.data.markers[which].code);
        qqmapsdk.calculateDistance({
          //mode: 'driving',//可选值：'driving'（驾车）、'walking'（步行），不填默认：'walking',可不填
          //from参数不填默认当前地址
          //获取表单提交的经纬度并设置from和to参数（示例为string格式）
          from: from_side,
          to: to_side, //终点坐标
          success: function (res) {
            console.log(res.result.elements[0].distance);
            const less_distance = 60     //至少距离车库60米
            if (res.result.elements[0].distance <= less_distance){
              app.globalData.distance = true;
            }else{
              app.globalData.distance = false;
            };
            app.globalData.garage_code = code;
            wx.navigateTo({
              url: '../take_car/take_car',
            });
          },
          fail: function (error) {
            console.error(error);
          },
          complete: function (res) {
            console.log(res);
          }
        });
        
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

  side: function () {
    var that = this
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        that.setData({
          latitude0: res.latitude,
          longitude0: res.longitude
        })

      },
    })
    return String(that.data.latitude0) + ',' + String(that.data.longitude0)
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