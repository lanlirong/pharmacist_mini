// pages/drug/detail/index.js
import { request } from '../../../request/index.js';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    detail: {},
  },

  /**
   * 组件的初始数据
   */
  data: {},
  onLoad: function (options) {
    this.setData({ id: options.id });
    this.getDetail();
  },
  async getDetail() {
    const data = await request({
      url: '/science/one',
      data: { id: this.data.id },
    });

    this.setData({
      detail: data,
    });
  },
});
