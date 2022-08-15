// pages/pets/pets.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    petsDisplays:[],
  },
  createPet:function(){
    wx.navigateTo({
      url: '../create/create',
    })
  },
  editPet:function(e){
    wx.navigateTo({
      url: '../edit/edit?id='+e.currentTarget.dataset.id,
    })
  },
  removePet:function(e){
    var page = this;
    wx.showModal({
      title: '确认删除',
      content: '不可恢复',
      success (res) {
        if (res.confirm) {
          var id=e.currentTarget.dataset.id;
          var removeUri = getApp().globalData.baseUrl+"getdata/removePet?id="+id;
          var app = getApp();
          var prepareF = page.Prepare;
          wx.request({
            url: removeUri,
            success:function(res){
              app.globalData.MasterData.Pets = res.data;
              prepareF();
              if(app.globalData.aptPrepareF){
                app.globalData.aptPrepareF();
              }
            }
          })
        } else if (res.cancel) {
          
        }
      }
    })
  },

  onLoad(options) {
    var app=getApp();
    app.globalData.petPrepareF = this.Prepare;
    if(app.globalData.MasterData.Pets==undefined){
      
    }
    else{
      this.Prepare();
    }
  },
  Prepare:function(){
    var app = getApp();
    if(app.globalData.MasterData){
      var petList = [];
      app.globalData.MasterData.Pets.forEach(pet => {
        var newPet={
          name:pet.Name,
          id:pet.ScId,
          var:pet.Info.Var
        }
        petList.push(newPet);
      });
      this.setData({petsDisplays:petList});
    }
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