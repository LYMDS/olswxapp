//index.js
//获取应用实例
const app = getApp()
var util = require('../../utils/util.js')

Page({
  data: {
    motto: 'https',
    result : '无数据',
    formula: 'none',
    userInfo: {},
    path:[],
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    latitude: 25.1556916162, 
    longitude: 116.7250505686,
    phone:'15217451050',
    bill :[],
  },


  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },


  onLoad: function () {
    var stu = wx.getStorageSync("login_state")
    var user = wx.getStorageSync("user_num")
    if (stu == null || stu == false || user == null) {
      wx.redirectTo({
        url: '../login/login'
      })
    }
    else{console.log("在index页面加载时登录成功")}
    
  },


  tryfun:function(){
    console.log('adla;sdkad')
    this.setData({
      latitude: 24.1556916162, 
      longitude: 115.7250505686,
    })
  },


  choose:function(){
    var that = this
    wx.chooseImage({
      count: 6,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        const add_len = tempFilePaths.length
        var old = that.data.path
        var len = old.length
        var i = 0
        while (len<6){
          old.push(tempFilePaths[i])
          i+=1
          len+=1
          if (i == add_len){
            break
          }

        }
        that.setData({
          path: old
        })
      }
    })
  },

  del:function(e){
    const id = parseInt(e.target.id)
    var old = this.data.path
    console.log(e)
    old.splice(id,1)
    this.setData({
      path:old
    })
  },


  calculate : function(){
    console.log("我被点了一下")
    console.log('开始连接服务器！')
    wx.request({
      url: 'https://lym.ngrok.xiaomiqiu.cn/connect',//https://lym.ngrok.xiaomiqiu.cn/connect
        data: {
          formula: this.data.formula,
          phone: this.data.phone,
          },
          success: res => {
            if (res.statusCode == 200) {
              console.log("连接成功")

              this.setData({
                result: res.data["name"]
              })
              wx.getLocation({//获取用户位置

                success: function (res) {
                  console.log(res)
                  console.log(res.longitude)
                  console.log(res.latitude)
                  console.log(res.accuracy)
                  console.log("----------------------------")
                },
              })
            }
          }
        })
      },

  sendform:function(){
    var that = this
    var nowtime = util.formatTime(new Date())
    console.log(nowtime)
    wx.request({
      url: app.globalData.serverURL + '/exception',
      data: {
        user_num : wx.getStorageSync('user_num'),
        garage_code : 'gds100001',
        type : '1*3*4*',
        report : '有人告诉你，库机出问题了',
        date_time:nowtime
      },
      success: function(res) {
        if (res.statusCode == 200 && res.data['exist']) {
          console.log('库机异常表提交成功！')
          var nowtime=res.data['nowtime']
          console.log(nowtime)
          var path = that.data.path
          for (let i = 0; i < path.length && path.length > 0 ; i++) {  //使用for循环基本是并发的
            wx.uploadFile({
              url: app.globalData.serverURL + '/except_upload/',
              filePath: that.data.path[i],
              name: 'file',
              formData: {
                datetime: nowtime,
                user_num: wx.getStorageSync('user_num'),
                img_num: i
              },
              success: res => {
                console.log(i);  //返回的i值是散点型的，
                var turn = JSON.parse(res.data);
                console.log(turn["state"])
                console.log(res.data.trim())

              }
            })

          };
          console.log('所有图片发送完毕')
            
          
        }
      }
    });
  },


  get_bill: function(){
    var that = this;
    wx.request({
      url: app.globalData.serverURL+'/information',//https://lym.ngrok.xiaomiqiu.cn/connect
      data: {
        user_num: 1
      },
      success: res => {
        if (res.statusCode == 200) {
          var bill = res.data.all
          console.log(res)
          for ( let i=0 ; i<bill.length ; i++ ){
            bill[i][0] = bill[i][0].replace("T", " ")
          };
          that.setData({
            bill: res.data.all
          })
          
        }
      }
    })
  },

  gar_msg:function(){
    wx.request({
      url: app.globalData.serverURL + '/garage_msg/',
      data: {
        garage_code: 'gds100001'
      },
      success: res => {
        if (res.statusCode == 200) {
          console.log(res)
        }
      }
    })
  },

  test: function(){
    wx.redirectTo({
      url: '../login/login'
    })
    /*
    wx.scanCode({//微信扫码功能
      onlyFromCamera: false,//是否支持相册扫码
      scanType: [],
      success: function(res) {
        console.log(res.result)
        console.log(res.scanType)
        console.log(res.charSet)//utf-8
        console.log(res.path)
      },
      fail: function(res) {},
      complete: function(res) {},
    })*/
  },


  get_img: function(){
    wx.downloadFile({
      url: app.globalData.serverURL + '/show_img/',
      success:function(res){
        console.log(res.tempFilePath)
      }
    })
  },
    


  

})
