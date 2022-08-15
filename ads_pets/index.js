// ads/ads.js
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
    imgUrls: [
      'https://yy.jowei19.com:442/swiperImgs/ads_pets_1.png',
      'https://yy.jowei19.com:442/swiperImgs/ads_pets_2.png',
      'https://yy.jowei19.com:442/swiperImgs/ads_pets_3.png'
    ],
    indicatorDots: true,  //是否显示面板指示点
    autoplay: true,      //是否自动切换
    interval: 3000,       //自动切换时间间隔
    duration: 1000,       //滑动动画时长
    inputShowed: false,
    inputVal: ""
  },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})
