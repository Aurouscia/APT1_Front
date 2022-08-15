// pages/personal/personal.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    openId:"",
    userAvatarUrl:"",
    userName:"",
    cardType:"",
    leftTimes:0,
    tel:"",
    isStaff:false,

    CInfo:{},
    Apts:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var app=getApp();
    app.globalData.personalPrepareF = this.Prepare;
    if(app.globalData.MasterData.CInfo==undefined){

    }
    else{
      this.Prepare();
    }
  },
  Prepare:function(){
    var app = getApp();
    //准备好日期列表
    this.setData({CInfo:app.globalData.MasterData.CInfo});
    this.setData({cardType:this.data.CInfo.CardType});
    this.setData({leftTimes:this.data.CInfo.LeftTimes});
    this.setData({Apts:app.globalData.MasterData.Apts});
    this.setData({openId:this.data.CInfo.OpenId});
    
    this.setData({userAvatarUrl:this.getAvatar(app.globalData.MasterData.UserAvatar)});
    this.setData({userName:app.globalData.MasterData.UserName});
    this.setData({tel:this.data.CInfo.Tel})
    this.setData({isStaff:app.globalData.MasterData.isStaff})
  },
  getPhoneNumber(){
    wx.navigateTo({
      url: '../inputTel/index',
    })
  },
  complete:function(e){
    var aptId = e.target.dataset.id;
    var app = getApp();
    var that = this;
    wx.showModal({
      title: '确认该订单已完成？',
      content: '',
      success (res) {
        var cptUrl = app.globalData.baseUrl+"GetData/Complete";
        if (res.confirm) {
          var openid = app.globalData.MasterData.CInfo.OpenId;
          wx.request({
            url: cptUrl,
            data:{
              openid:openid,
              aptId:aptId
            },
            method:"GET",
            success:function(res){
              app.globalData.MasterData = res.data;
              that.Prepare();
            }
          })
        } else if (res.cancel) {

        }
      }
    });
  },
  onChooseAvatar(e) {
    console.log(e);
    const { avatarUrl } = e.detail 
    this.setData({
      avatarUrl,
    })
  },
  getAvatar(type){
    var openid = getApp().globalData.MasterData.CInfo.OpenId;
    var res = getApp().globalData.baseUrl+"userAvatars/"+openid;
    if(type=="png"){
      return res+".png";
    }
    if(type=="jpg"){
      return res+".jpg";
    }
    return defaultAvatarUrl;
  },
  onShow() {
    var app=getApp();
    if(app.globalData.MasterData.CInfo==undefined){

    }
    else{
      this.Prepare();
    }
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