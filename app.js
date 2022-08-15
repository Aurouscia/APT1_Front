// app.js
App({
  onShow() {
    var page = this;
    wx.login({
      success: function (res) {
        var InitUrl = getApp().globalData.baseUrl + 'GetData/Init';

        var app = getApp();
        var code = res.code;
        var userAvatar = "";
        var userNickName = "";
        wx.getUserInfo({
          success: function (res) {
            userAvatar = res.userInfo.avatarUrl;
            getApp().globalData.avatarUrl = userAvatar;
            userNickName = res.userInfo.nickName;
            getApp().globalData.userName = userNickName;
            wx.request({
              url: InitUrl,
              data: {
                code: code,
                userAvatar: userAvatar,
                userName: userNickName
              },
              success: function (res) {
                console.log(res.data)
                getApp().globalData.MasterData=res.data;
                if(app.globalData.aptPrepareF!=undefined){
                  app.globalData.aptPrepareF();
                }
                if(app.globalData.petPrepareF!=undefined){
                  app.globalData.petPrepareF();
                }
                if(app.globalData.personalPrepareF!=undefined){
                  app.globalData.personalPrepareF();
                }
              }
            })
          }
        })
      }
    })
  },
  globalData: {
    avatarUrl: "",
    baseUrl: "https://yy.jowei19.com:442/",
    selectedTab: 1,
    MasterData:{},
    userName:"",

    aptPrepareF:undefined,
    petPrepareF:undefined,
    personalPrepareF:undefined,

    aptPetPrepareF:undefined
  }
})
