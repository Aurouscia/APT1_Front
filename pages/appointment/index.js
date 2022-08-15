Page({
  data:{
    pets:[],
    days:[],
    categories:[],
    services:[],
    schedules:[],

    aptData:[],
    aptDataOfDay:[],
    aptDataOfCat:[],

    lastCat:"",
    lastSrv:"",
    lastSch:"",
    note:"",
    testDisplay:"",

    errmsg:"",
    openId:""
  },
  Prepare:function(){
    //准备好宠物列表
    var app = getApp();
    this.PreparePet();
    //准备好日期列表
    this.setData({aptData:app.globalData.MasterData.Days});
    var days=[];
    this.data.aptData.forEach(day=>{
      var newDay={
        text:day.Text,
        text2:day.Text2,
        selected:false
      }
      days.push(newDay);
    });
    this.setData({days:days});
    this.setData({openId:app.globalData.MasterData.CInfo.OpenId})
  },
  PreparePet:function(){
    var app=getApp();
    var petList = [];
    app.globalData.MasterData.Pets.forEach(pet => {
      var newPet = {
        name: pet.Name,
        id: pet.ScId,
        selected: false
      }
      petList.push(newPet);
    });
    this.setData({ pets: petList });
  },
  onLoad:function(){
    var app = getApp();
    app.globalData.aptPrepareF = this.Prepare;
    app.globalData.aptPetPrepareF = this.PreparePet;
    if(app.globalData.MasterData.Pets==undefined){

    }
    else{
      this.Prepare();
    }
  },
  changePetSelect(e){
    var id=e.currentTarget.dataset.id;
    for(var i=0;i<this.data.pets.length;i++){
      if(this.data.pets[i].id==id){
        var selected= this.data.pets[i].selected;
        var setKey = 'pets['+i+'].selected';
        this.setData({[setKey]:!selected})
      }
    }
  },

  changeDaySelect(e){
    var text=e.currentTarget.dataset.text;
    for(var i=0;i<this.data.days.length;i++){
      var thisText = this.data.days[i].text;
      var setKey = 'days['+i+'].selected';
      if(thisText==text){
        this.setData({[setKey]:true});
      }
      else{
        this.setData({[setKey]:false});
      }
    }
    //重新渲染分类列表
    this.refreshCatList(text);
  },
  refreshCatList(dayText){
    var categories=[];
    var cats = this.data.aptData.find(x=>x.Text==dayText).Categories;
    var existLastCat = false;
    cats.forEach(cat=>{
      var s = false;
      if(cat.Text==this.data.lastCat){
        s=true;
        existLastCat=true;
      }
      var newCat={
        text:cat.Text,
        selected:s
      }
      categories.push(newCat);
    })
    this.setData({categories:categories});
    this.setData({aptDataOfDay:cats});
    if(existLastCat){
      this.refreshServiceList(this.data.lastCat);
    }
    else{
      this.setData({schedules:[]});
      this.setData({services:[]});
    }
  },
  changeCatSelect(e){
    var text=e.currentTarget.dataset.text;
    for(var i=0;i<this.data.categories.length;i++){
      var thisText = this.data.categories[i].text;
      var setKey = 'categories['+i+'].selected';
      if(thisText==text){
        this.setData({[setKey]:true});
        this.setData({"lastCat":text});
      }
      else{
        this.setData({[setKey]:false});
      }
    }
    //重新渲染员工列表
    this.refreshServiceList(text);
  },
  refreshServiceList(catText){
    var service=[];
    var srvs = this.data.aptDataOfDay.find(x=>x.Text==catText).Services;
    var existLastSrv = false;
    srvs.forEach(srv=>{
      var s = false;
      if(srv.Text==this.data.lastSrv){
        s=true;
        existLastSrv = true;
      }
      var newSrv={
        text:srv.Text,
        selected:s
      }
      service.push(newSrv);
    })
    this.setData({services:service});
    this.setData({aptDataOfCat:srvs});
    if(existLastSrv){
      this.refreshScheduleList(this.data.lastSrv);
    }
    else{
      this.setData({schedules:[]});
    }
  },
  changeSrvSelect(e){
    var text=e.currentTarget.dataset.text;
    for(var i=0;i<this.data.services.length;i++){
      var thisText = this.data.services[i].text;
      var setKey = 'services['+i+'].selected';
      if(thisText==text){
        this.setData({[setKey]:true});
        this.setData({"lastSrv":text});
      }
      else{
        this.setData({[setKey]:false});
      }
    }
    //重新渲染该员工安排列表
    this.refreshScheduleList(text);
  },
  refreshScheduleList(srvText){
    var schedules=[];
    var schs = this.data.aptDataOfCat.find(x=>x.Text==srvText).Schedules;
    schs.forEach(sch=>{
      var s = false;
      if(sch.Text==this.data.lastSch){
        s=true;
      }
      var newSch={
        text:sch.Text,
        leftSrv:sch.LeftServe,
        selected:s,
        id:sch.Id
      }
      schedules.push(newSch);
    })
    this.setData({schedules:schedules});
  },
  changeSchSelect(e){
    var text=e.currentTarget.dataset.text;
    for(var i=0;i<this.data.schedules.length;i++){
      var thisText = this.data.schedules[i].text;
      var setKey='schedules['+i+'].selected';
      if(thisText==text){
        this.setData({[setKey]:true});
        this.setData({"lastSch":text});
      }
      else{
        this.setData({[setKey]:false});
      }
    }
  },
  apt() {

    var that = this;
    wx.requestSubscribeMessage({
      tmplIds: ["tikZspKLGKuG7zMbjimq9fqQtkJPjxBwv0bx5aXnYJg"],
      success(res) {
        var schText = that.data.lastSch;
        var selectedSch = that.data.schedules.find(x => x.text == schText);
        var selectedPets = [];
        that.data.pets.forEach(pet => {
          if (pet.selected) {
            selectedPets.push(pet.id);
          }
        });
        if (selectedPets.length == 0) {
          that.setData({ errmsg: "您未选择宠物" })
          return;
        }
        if (selectedPets.length > selectedSch.leftSrv) {
          that.setData({ errmsg: "该时段只能服务" + selectedSch.leftSrv + "只宠物" })
          return;
        }
        that.setData({ errmsg: "正在提交，请等待" })

        var req = {
          openid: that.data.openId,
          schId: selectedSch.id,
          note: that.data.note ? that.data.note : "无备注",
          selectedPetIds: selectedPets
        }
        var app = getApp();
        var submitUrl = getApp().globalData.baseUrl + "GetData/Make";
        wx.request({
          url: submitUrl,
          data: req,
          method: "GET",
          success: function (res) {
            //console.log(res.data);
            var message = res.data.Message;
            var moreInfo = res.data.MoreInfo;
            var success = res.data.Success;
            if (success == 1) {
              app.globalData.MasterData = res.data.newData;
            }
            //console.log(app.globalData.MasterData);
            wx.redirectTo({
              url: '../appResult/appResult?message=' + message + "&moreInfo=" + moreInfo + "&success=" + success,
            })
          }
        })
      },
      fail(err) {
        console.log("订阅消息唤起失败 =====>", err)
      }
    });


  },
})