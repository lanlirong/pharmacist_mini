// pages/index/index.js
import { request } from '../../request/index.js';
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
Page({
  /**
   * 组件的初始数据
   */
  data: {
    hotList: [],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.search();
  },
  async search() {
    const res = await request({
      url: '/science/hotList',
      method: 'GET',
    });

    if (res) {
      this.setData({
        hotList: [...res],
      });
    }
  },
  showDetail(e) {
    var id = e.currentTarget.dataset['index'];
    wx.navigateTo({
      url: `/pages/science/detail/index?id=${id}`,
    });
  },
});
