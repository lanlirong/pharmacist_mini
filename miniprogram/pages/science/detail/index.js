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
    const res = await request({
      url: '/science/one',
      data: { id: this.data.id },
    });
    if (res.content) {
      res.content = res.content.replace(
        /\<img/g,
        '<img style="width:100%;height:auto;display: block;"'
      );
      res.content = res.content.replace(
        /\<blockquote class="ql-align-justify"/g,
        '<blockquote class="ql-align-justify blockquote"'
      );
      res.content = res.content.replace(
        /\<h2 class="ql-align-justify"/g,
        '<h2 class="ql-align-justify h2"'
      );
      res.content = res.content.replace(/\<h2/g, '<h2 class="h2"');
      res.content = res.content.replace(/\<ol/g, '<ol class="ol"');
      res.content = res.content.replace(/\<ul/g, '<ul class="ul"');
      this.setData({
        detail: res,
      });
    }
  },
});
