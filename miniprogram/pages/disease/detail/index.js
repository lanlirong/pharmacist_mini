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
      url: '/disease/one',
      data: { id: this.data.id },
    });
    if (!data.name) data.name = '---';
    if (!data.contagion) data.contagion = '---';
    if (!data.complication) data.complication = '---';
    if (!data.treatWay) data.treatWay = '---';
    if (!data.cycle) data.cycle = '---';
    if (!data.rate) data.rate = '---';
    if (!data.introduction) data.introduction = '---';
    if (data.drug) data.drug = data.drug.split(',');

    this.setData({
      detail: data,
    });
  },
});
