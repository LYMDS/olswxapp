//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    money:0,
    will_charge: null,
    display: false,
    color: [
      ['rgb(163, 163, 163)', '#fff', 'rgb(163, 163, 163)'],
      ['rgb(163, 163, 163)', '#fff', 'rgb(163, 163, 163)'],
      ['rgb(163, 163, 163)', '#fff', 'rgb(163, 163, 163)'],
      ['rgb(163, 163, 163)', '#fff', 'rgb(163, 163, 163)'],
      ['rgb(163, 163, 163)', '#fff', 'rgb(163, 163, 163)'],
      ['rgb(163, 163, 163)', '#fff', 'rgb(163, 163, 163)']//基本样式 or 初始化样式
    ],
  },

  onLoad: function(){
    //查询用户余额接口
    var that = this;
    wx.request({
      url: app.globalData.serverURL + '/balance_over',
      data: {
        user_num: wx.getStorageSync("user_num")
      },
      success: res => {
        that.setData({
          money: res.data['money']
        })
      }
    });
  },

  choose: function(res){
    var that = this;
    console.log(res.currentTarget.dataset.value);
    const choose = res.currentTarget.dataset.value;
    switch (choose) {
      case '30': that.setData({
        color: [
          ['rgb(41, 163, 224)', 'rgb(238, 247, 254)', 'rgb(41, 163, 224)'],
          ['rgb(163, 163, 163)', '#fff', 'rgb(163, 163, 163)'],
          ['rgb(163, 163, 163)', '#fff', 'rgb(163, 163, 163)'],
          ['rgb(163, 163, 163)', '#fff', 'rgb(163, 163, 163)'],
          ['rgb(163, 163, 163)', '#fff', 'rgb(163, 163, 163)'],
          ['rgb(163, 163, 163)', '#fff', 'rgb(163, 163, 163)']
        ],
        display: false,
        will_charge: 30,
      }); break;
      case '50': that.setData({
        color: [
          ['rgb(163, 163, 163)', '#fff', 'rgb(163, 163, 163)'],
          ['rgb(41, 163, 224)', 'rgb(238, 247, 254)', 'rgb(41, 163, 224)'],
          ['rgb(163, 163, 163)', '#fff', 'rgb(163, 163, 163)'],
          ['rgb(163, 163, 163)', '#fff', 'rgb(163, 163, 163)'],
          ['rgb(163, 163, 163)', '#fff', 'rgb(163, 163, 163)'],
          ['rgb(163, 163, 163)', '#fff', 'rgb(163, 163, 163)']
        ],
        display: false,
        will_charge: 50,
      }); break;
      case '100': that.setData({
        color: [
          ['rgb(163, 163, 163)', '#fff', 'rgb(163, 163, 163)'],
          ['rgb(163, 163, 163)', '#fff', 'rgb(163, 163, 163)'],
          ['rgb(41, 163, 224)', 'rgb(238, 247, 254)', 'rgb(41, 163, 224)'],
          ['rgb(163, 163, 163)', '#fff', 'rgb(163, 163, 163)'],
          ['rgb(163, 163, 163)', '#fff', 'rgb(163, 163, 163)'],
          ['rgb(163, 163, 163)', '#fff', 'rgb(163, 163, 163)']
        ],
        display: false,
        will_charge: 100,
      }); break;
      case '200': that.setData({
        color: [
          ['rgb(163, 163, 163)', '#fff', 'rgb(163, 163, 163)'],
          ['rgb(163, 163, 163)', '#fff', 'rgb(163, 163, 163)'],
          ['rgb(163, 163, 163)', '#fff', 'rgb(163, 163, 163)'],
          ['rgb(41, 163, 224)', 'rgb(238, 247, 254)', 'rgb(41, 163, 224)'],
          ['rgb(163, 163, 163)', '#fff', 'rgb(163, 163, 163)'],
          ['rgb(163, 163, 163)', '#fff', 'rgb(163, 163, 163)']
        ],
        display: false,
        will_charge: 200,
      });  break;
      case '300': that.setData({
        color: [
          ['rgb(163, 163, 163)', '#fff', 'rgb(163, 163, 163)'],
          ['rgb(163, 163, 163)', '#fff', 'rgb(163, 163, 163)'],
          ['rgb(163, 163, 163)', '#fff', 'rgb(163, 163, 163)'],
          ['rgb(163, 163, 163)', '#fff', 'rgb(163, 163, 163)'],
          ['rgb(41, 163, 224)', 'rgb(238, 247, 254)', 'rgb(41, 163, 224)'],
          ['rgb(163, 163, 163)', '#fff', 'rgb(163, 163, 163)']
        ],
        display: false,
        will_charge: 300,
      }); break;
      case 'set': that.setData({
        color: [
          ['rgb(163, 163, 163)', '#fff', 'rgb(163, 163, 163)'],
          ['rgb(163, 163, 163)', '#fff', 'rgb(163, 163, 163)'],
          ['rgb(163, 163, 163)', '#fff', 'rgb(163, 163, 163)'],
          ['rgb(163, 163, 163)', '#fff', 'rgb(163, 163, 163)'],
          ['rgb(163, 163, 163)', '#fff', 'rgb(163, 163, 163)'],
          ['rgb(41, 163, 224)', 'rgb(238, 247, 254)', 'rgb(41, 163, 224)']
        ],
        display: true,
      });break;
    };
  },

  input: function(res){
    this.setData({
      will_charge : parseInt(res.detail.value)
      })
  },


charge: function(){
  var that = this;
  const charge = that.data.will_charge;
  const less = 10;
  console.log(charge);
  if (charge < less && charge != null ){
    wx.showToast({
      title: '金额至少10元',
      duration: 800,
      icon: 'loading'
    })
  }
  else if ( charge == null ){
    wx.showToast({
      title: '请选择金额',
      duration: 800,
      icon: 'loading'
    })
  }
  else if (charge != null && charge >= less){
    //充值的相关操作
    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求,请求到服务器，携带用户号，交易类型以及code
          console.log(res.code);
          console.log(res);
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  }
}



    
  

})
