// 引入SDK核心类
const app = getApp();
Page({
  data: {
    choose_car: "",
    //[i.parking_num, i.exist_car, i.charge_state, i.lock_state, i.car_id]  
    // gar_data: [
    //   [[11, true, 2, false, '粤A52626'], [12, true, 1, false, 'asdsa'], [13, true, 1, false, 'asdsa']],
    //   [[9, true, 2, false, 'asdsa'], [10, true, 1, false, 'asdsa'],0],
    //   [[7, true, 1, false, 'asdsa'], [8, true, 1, false, 'asdsa'],0],
    //   [[5, true, 2, false, 'asdsa'], [6, true, 1, false, 'asdsa'],0],
    //   [[3, true, 1, false, 'asdsa'], [4, true, 1, false, 'asdsa'],0],
    //   [[1, true, 1, false, 'asdsa'], [2, true, 1, false, 'asdsa'],0],
    //   [0,[1, true, 1, false, 'asdsa'], [2, true, 1, false, 'asdsa']],
    // ],
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
          console.log(list)
          that.setData({
            gar_data: list,
            distance: app.globalData.distance
          })
        }
      }
    });
  },

  onShow: function () {
    var that = this;
    var heartbeetfull = setInterval(function () {
      wx.request({
        url: app.globalData.serverURL + '/garage_msg/',
        data: {
          garage_code: app.globalData.garage_code
        },
        success: res => {
          if (res.statusCode == 200) {
            const list = res.data["gar_msg"];
            console.log(list)
            that.setData({
              gar_data: list,
              heartbeettimer: heartbeetfull
            })
          }
        }
      });
    }, 3000);
    
  },

  onHide: function () {
    clearInterval(this.data.heartbeettimer);
  },
  onUnload: function () {
    clearInterval(this.data.heartbeettimer);
  },


  choice: function (res) {

    var that = this;
    console.log(res);
    console.log(res.currentTarget.dataset.num);
    that.data.gar_data
    if (res.currentTarget.dataset.num) { }
    this.setData({
      choose_car: res.currentTarget.dataset.num
    })
  },
  go_map: function () {
    var x = app.globalData.x
    var y = app.globalData.y
    var garage_name = app.globalData.garage_name
    var addr = app.globalData.addr
    wx.openLocation({
      latitude: x,
      longitude: y,
      scale: 14,
      name: garage_name, //打开后显示的地址名称
      address: addr,
    })
  },
})
