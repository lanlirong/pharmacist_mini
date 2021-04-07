// pages/drug/detail/index.js
import { request } from '../../../request/index.js';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    detailList: [],
    mainActiveIndex: 0,
    items: [],
    select: {},
  },
  onLoad: function (options) {
    this.setData({ name: options.name });
    this.getDetail();
  },
  async getDetail() {
    const data = await request({
      url: '/interaction/one',
      data: { name: this.data.name },
    });
    let items = [];
    data.forEach((item) => {
      // 侧边栏数据
      let temp = {};
      temp.text = item.interaction;
      temp.id = item.id;
      items.push(temp);
      // 参考文献列表
      item.references = [
        item.reference1,
        item.reference2,
        item.reference3,
        item.reference4,
        item.reference5,
      ];
      item.references = item.references.filter((item) => {
        return item !== '';
      });
      // placeHolder
      if (!item.name) item.name = '---';
      if (!item.interaction) item.interaction = '---';
      if (!item.result) item.result = '---';
      if (!item.suggest) item.suggest = '---';
      if (!item.evidence) item.evidence = '---';
      if (!item.level) item.level = '---';
    });
    this.setData({
      items: items,
      detailList: data,
      select: data[0],
    });
  },
  onClickNav({ detail = {} }) {
    let index = detail.index || 0;
    this.setData({
      select: this.data.detailList[index],
    });
  },
});
