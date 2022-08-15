// pages/appResult/appResult.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    message:"",
    moreInfo:"",
    success:0
  },

  onLoad(options) {
    if(options.success!=1){
      this.setData({
        message:"预约失败",
        moreInfo:"请联系客服",
        success:options.success
      })
    }
    else{
      this.setData({
        message:options.message,
        moreInfo:options.moreInfo,
        success:options.success
      })
    }
  },

  another:function(){
    wx.switchTab({
      url: '../appointment/index'
    })
  },

  showList:function(){
    wx.switchTab({
      url: '../personal/personal',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})