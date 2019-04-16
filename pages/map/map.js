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
    motto: 'https',
    result: '无数据',
    formula: 'none',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    latitude: 25.1556916162,
    longitude: 116.7250505686,
    phone: '15217451050',
  },
  
  //在Page({})中使用下列代码
  //事件触发，调用接口
  formSubmit(e) {
    var _this = this;
    //调用距离计算接口
    qqmapsdk.calculateDistance({
      //mode: 'driving',//可选值：'driving'（驾车）、'walking'（步行），不填默认：'walking',可不填
      //from参数不填默认当前地址
      //获取表单提交的经纬度并设置from和to参数（示例为string格式）
      from: e.detail.value.start || '', //若起点有数据则采用起点坐标，若为空默认当前地址
      to: e.detail.value.dest, //终点坐标
      success: function (res) {//成功后的回调
        console.log(res);
        var res = res.result;
        var dis = [];
        for (var i = 0; i < res.elements.length; i++) {
          dis.push(res.elements[i].distance); //将返回数据存入dis数组，
        }
        _this.setData({ //设置并更新distance数据
          distance: dis
        });
      },
      fail: function (error) {
        console.error(error);
      },
      complete: function (res) {
        console.log(res);
      }
    });
  }
  
  })