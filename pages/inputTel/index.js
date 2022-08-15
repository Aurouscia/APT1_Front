// pages/inputTel/index.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tel:"",
    avatarUrl: defaultAvatarUrl,
    userName:"",
    errmsg:""
  },
  onChooseAvatar(e) {
    const { avatarUrl } = e.detail;
    var that = this;
    this.setData({
      avatarUrl,
    });
    var openid = getApp().globalData.MasterData.CInfo.OpenId;
    var uploadUrl = getApp().globalData.baseUrl+"GetData/UploadAvatar?openid="+openid;
    wx.uploadFile({
      filePath: avatarUrl,
      name: 'avatarImg',
      url: uploadUrl,
      success:function(res){
        //console.log(res);
        that.setData({errmsg:"已经上传"})
      },
      fail:function(res){
        that.setData({errmsg:JSON.stringify(res)});
      }
    })
  },
  inputTel:function(e){
    this.setData({"tel":e.detail.value});
  },
  inputName:function(e){
    this.setData({"userName":e.detail.value});
  },
  submitTel:function(){
    var app = getApp();
    if(this.data.userName==""){
      this.setData({"errmsg":"昵称未填"})
      return;
    }
    var openid = getApp().globalData.MasterData.CInfo.OpenId;
    var telUrl = getApp().globalData.baseUrl+"GetData/EditTel?openid="+openid+"&tel="+this.data.tel+"&userName="+this.data.userName;
    console.log(telUrl);
    wx.request({
      url: telUrl,
      success:function(res){
        app.globalData.MasterData = res.data;
        console.log(res.data);
        wx.switchTab({
          url: '../personal/personal',
        })
      }
    })
  },
})