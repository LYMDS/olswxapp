// 引入SDK核心类
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
var qqmapsdk;
const app = getApp();
Page({
  data: {

  },
	// 点击按钮触发方法
	mapNavigation: function (e) {
    console.log(e.target.dataset.addr);
    var addr = e.target.dataset.addr;
    var that = this;
    // 使用 JavaScript SDK 获取目的地经纬度
    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      key: '7RHBZ-EUAKQ-DOS56-GAQYW-4IA4J-H2BYA'
    });
    qqmapsdk.geocoder({
      address: addr,
      success: function (res) {
        console.log(res);
        var local = res.result.location;
        that.setData({
          latitude: local.lat,
          longitude: local.lng
        })
      }
    })
    // 使用微信内置地图查看位置
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        wx.openLocation({
          latitude: 25.1556916162,
          longitude: 116.7250505686,
          scale: 28,
          name: "asdsadsad", //打开后显示的地址名称
        })
      }
    })
  },
})
