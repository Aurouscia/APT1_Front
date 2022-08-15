// pages/pets/create.js
Page({
  data: {
    petName:"",
    spc:0,
    sex:1,
    str:0,
    var:"",
    errmsg:""
  },
  inputName:function(e){
    this.setData({petName:e.detail.value})
  },
  inputVar:function(e){
    this.setData({var:e.detail.value})
  },
  changeSpcSelect:function(e){
    this.setData({spc:e.currentTarget.dataset.value});
  },
  changeSexSelect:function(e){
    this.setData({sex:e.currentTarget.dataset.value});
  },
  changeStrSelect:function(e){
    this.setData({str:e.currentTarget.dataset.value});
  },
  createPet(){
    if(this.data.petName == ""){
      this.setData({"errmsg":"宠物名称未填"});
      return;
    }
    if(this.data.var==""){
      this.setData({"errmsg":"宠物品种未填"});
      return;
    }
    this.setData({"errmsg":"请稍等"});
    var createUrl = getApp().globalData.baseUrl+'GetData/CreatePet';
    var app = getApp();
    var requestData = {
      name:this.data.petName,
      sex:this.data.sex,
      str:this.data.str,
      spc:this.data.spc,
      var:this.data.var,
      openid:getApp().globalData.MasterData.CInfo.OpenId
    };
    console.log(requestData);
    wx.request({
      url: createUrl,
      data:requestData,
      method:"GET",
      success:function(res){
        getApp().globalData.MasterData.Pets=res.data;
        if(app.globalData.petPrepareF!=undefined){
          app.globalData.petPrepareF();
        }
        if(app.globalData.aptPetPrepareF!=undefined){
          app.globalData.aptPetPrepareF();
        }
        wx.switchTab({
          url: '../pets/pets',
        })
      }
    })
  },


  onLoad(options) {

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