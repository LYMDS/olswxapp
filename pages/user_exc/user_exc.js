const app = getApp()
var util = require('../../utils/util.js')
Page({
  data: {
    path: [],
    garage_code: "",
    type: "",
    report: "",
    gar_num: "",
  },


  type: function(res){
    const which = res.currentTarget.dataset.value;
    switch(which){
      case '1#': this.setData({type: which}); break;
      case '2#': this.setData({type: which}); break;
      case '3#': this.setData({type: which}); break;
    };
  },

  sendform: function () {
    //设置提示拦截
    console.log()
    var that = this
    var nowtime = util.formatTime(new Date())
    console.log(nowtime)
    wx.request({
      url: app.globalData.serverURL + '/exception',
      data: {
        user_num: wx.getStorageSync('user_num'),
        garage_code: that.data.garage_code,
        type: that.data.type,
        report: that.data.report,
        date_time: nowtime
      },
      success: function (res) {
        if (res.statusCode == 200 && res.data['exist']) {
          console.log('库机异常表提交成功！')
          var nowtime = res.data['nowtime']
          console.log(nowtime)
          var path = that.data.path
          for (let i = 0; i < path.length && path.length > 0; i++) {  //使用for循环基本是并发的
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
              }
            })

          };
          console.log('所有图片发送完毕')


        }
      }
    });
  },


  choose: function () {
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
        while (len < 6) {
          old.push(tempFilePaths[i])
          i += 1
          len += 1
          if (i == add_len) {
            break
          }
        }
        that.setData({
          path: old
        })
      }
    })
  },

  del: function (e) {
    const id = parseInt(e.target.id)
    var old = this.data.path
    console.log(e)
    old.splice(id, 1)
    this.setData({
      path: old
    })
  },

  input1:function(e){
    var input = e.detail.value
    this.setData({ garage_code:input })
  },
  input2:function(e){
    var input = e.detail.value
    this.setData({ report:input })
  },
  
  scan_code: function () {
    var that = this;
    wx.scanCode({
      onlyFromCamera: true,
      scanType: ['barCode', 'qrCode'],
      success: function (res) {
        const code = res.path.slice(res.path.indexOf('=') + 1)
        that.setData({
          garage_code: code,
          gar_num: code
        })
        //处理res数据即可
      },
      fail: function (res) { },
      complete: function (res) { },
    });
  },



})