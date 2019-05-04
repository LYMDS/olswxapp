//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    money: 10

  },


  change_num:function(res){
    console.log(res)
    const num = res.currentTarget.dataset.num
    this.setData({
      money: num
    })
      
    
  }

})
