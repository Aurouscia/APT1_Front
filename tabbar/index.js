// tabbar/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    selected: 1,
    color: "#999999",
    selectedColor: "#EE3D42",
    listTab: [
      {
        pagePath: "../pets/pets",
        text: "宠物",
        iconPath: "./static/pet_B.png",
        selectedIconPath: "./static/pet_A.png"
      },
      {
        pagePath: "../appointment/index",
        text: "预约",
        iconPath: "./static/app_B.png",
        selectedIconPath: "./static/app_A.png"
      },
      {
        pagePath: "../personal/personal",
        text: "我的",
        iconPath: "./static/per_B.png",
        selectedIconPath: "./static/per_A.png"
      }
    ]
  },
  /**
   * 组件的方法列表
   */
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset;
      const url = data.path;
      wx.switchTab({
        url: url,
      });
    }
  }
})
