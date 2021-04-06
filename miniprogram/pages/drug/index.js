// pages/drug/index.js
import { request } from '../../request/index.js';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    actions: [
      {
        name: '药品名',
        value: 0,
      },
      {
        name: '商品名',
        value: 1,
      },
      {
        name: '商品条形码',
        value: 2,
      },
      {
        name: '主要成分',
        value: 3,
      },
      {
        name: '主治疾病',
        value: 4,
      },
    ],
    show: false,
    select: {
      value: 0,
      label: '药品名',
    },
    palceText: '请输入药品名，例如三七',
    params: {
      searchKey: '三七',
      type: 0,
      size: 20,
      drug_type: [],
      manufacturer: [],
      nature_class: [],
      use_class: [],
      page: 1,
      order: 'asc',
      orderType: '',
    },
    drugList: [],
    total: 0,
  },
  onChange(event) {
    const { picker, value, index } = event.detail;
    const palceTexts = [
      '请输入药品名，例如三七',
      '请输入药物商品名，例如安立派',
      '请输入十三位条形码，例如6934497200398',
      '请输入药品包含的主要成分，例如人参',
      '请输入疾病名称，例如高血压',
    ];
    this.setData({
      show: false,
      select: {
        value: index,
        label: value,
      },
      palceText: palceTexts[index],
      'params.type': index,
    });
  },
  onClose() {
    this.setData({ show: false });
  },
  showPopup() {
    this.setData({ show: true });
  },
  onSelect(event) {
    const { name, value } = event.detail;
    const palceTexts = [
      '请输入药品名，例如三七',
      '请输入药物商品名，例如安立派',
      '请输入十三位条形码，例如6934497200398',
      '请输入药品包含的主要成分，例如人参',
      '请输入疾病名称，例如高血压',
    ];
    this.setData({
      show: false,
      select: {
        value: value,
        label: name,
      },
      palceText: palceTexts[value],
      'params.type': value,
    });
  },
  async search() {
    const { total, current_page, data } = await request({
      url: '/drug/list',
      method: 'POST',
      data: this.data.params,
    });
    data.forEach((item) => {
      item.constituents = item.constituents == null ? '---' : item.constituents;
    });
    this.setData({
      drugList: [...this.data.drugList, ...data],
      total: total,
      page: current_page,
    });
  },
  showDetail(e) {
    console.log(e.currentTarget.dataset['index']);
    var id = e.currentTarget.dataset['index'];
    wx.navigateTo({
      url: `/pages/drug/detail/index?id=${id}`,
    });
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.params.page * this.data.params.size >= this.data.total) {
      // 没有下一页数据
      wx.showToast({ title: '没有下一页数据' });
    } else {
      // 还有下一页数据
      var num = this.data.params.page;
      this.setData({ 'params.page': num + 1 });
      clearTimeout(this.TimeId);
      this.TimeId = setTimeout(() => {
        this.search();
      }, 500);
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
  // 上拉触底
  // onReachBottom: function () {
  //   wx.showToast({ title: '底部到啦' });
  // },
});
