// pages/index/index.js
import utils from '../../utils/index';
Page({
  /**
   * 组件的初始数据
   */
  data: {
    imgUrl: 'http://49.235.220.14:3303/logo.png',
    tempImgUrl: '',
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // utils.setImgCache(this.data.imgUrl);
  },
});
