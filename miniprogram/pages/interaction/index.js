// pages/drug/index.js
import { request } from '../../request/index.js';
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    params: {
      searchKey: '阿利',
    },
    interactionList: [],
  },
  input(e) {
    this.setData({
      interactionList: [],
      params: {
        searchKey: e.detail,
      },
    });
    this.search();
  },
  async search() {
    if (this.data.params.searchKey == '') {
      Toast('输入不能为空!');
      return;
    }
    const data = await request({
      url: '/interaction/list',
      data: this.data.params,
    });
    this.setData({
      interactionList: [...this.data.interactionList, ...data],
      // total: this.data.interactionList.length,
    });
  },
  showDetail(e) {
    var name = e.currentTarget.dataset['index'];
    wx.navigateTo({
      url: `/pages/interaction/detail/index?name=${name}`,
    });
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    wx.showToast({ title: '没有更多数据' });
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
