// pages/drug/index.js
import { request } from '../../request/index.js';
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    palceText: '请输入疾病名称',
    params: {
      searchKey: '感',
      size: 20,
      page: 1,
      order: 'asc',
    },
    diseaseList: [],
    total: 0,
  },
  input() {
    var { searchKey, type } = this.data.params;
    this.setData({
      diseaseList: [],
      total: 0,
      params: {
        searchKey: searchKey,
        size: 20,
        page: 1,
        order: 'asc',
      },
    });
    this.search();
  },
  async search() {
    if (this.data.params.searchKey == '') {
      Toast('输入不能为空!');
      return;
    }
    const { total, current_page, data } = await request({
      url: '/disease/list',
      data: this.data.params,
    });
    data.forEach((item) => {
      item.constituents = item.constituents == null ? '---' : item.constituents;
    });
    this.setData({
      diseaseList: [...this.data.diseaseList, ...data],
      total: total,
      page: current_page,
    });
  },
  showDetail(e) {
    var id = e.currentTarget.dataset['index'];
    wx.navigateTo({
      url: `/pages/disease/detail/index?id=${id}`,
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
