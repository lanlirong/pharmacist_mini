// pages/drug/index.js
import { request } from '../../request/index.js';
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    show: false,
    params: {
      searchKey: '糖尿病',
      page: 1,
      size: 20,
      type: 0,
      way: 0,
    },
    consultList: [],
    bookList: [],
    select: {
      name: '下拉选择书籍：',
      value: '',
    },
    total: 0,
  },
  onRadioChange(event) {
    this.setData({
      'params.type': event.detail,
    });
  },
  onTabChange(event) {
    this.setData({
      'params.way': event.detail.name,
      'params.searchKey': '',
    });
    if (event.detail.name == 1) this.getBooks();
  },
  input(e) {
    var { searchKey, type, way } = this.data.params;
    this.setData({
      consultList: [],
      total: 0,
      params: {
        searchKey: e.detail,
        size: 20,
        page: 1,
        type,
        way,
      },
    });
    this.search();
  },
  onClose() {
    this.setData({ show: false });
  },
  onSelect(e) {
    console.log(e.detail);
    this.setData({ show: false, 'params.searchKey': e.detail.value });
    this.search();
  },
  showPopup() {
    this.setData({ show: true });
  },
  async search() {
    if (this.data.params.searchKey == '') {
      Toast('输入不能为空!');
      return;
    }
    const { total, current_page, data } = await request({
      url: '/consult/list',
      method: 'POST',
      data: this.data.params,
    });
    this.setData({
      consultList: [...this.data.consultList, ...data],
      total: total,
      'params.page': current_page,
    });
  },

  async getBooks() {
    const data = await request({
      url: '/consult/books',
      method: 'GET',
    });
    console.log(data);
    var temp = [];
    data.forEach((item) => {
      var tempItem = {};
      tempItem.name = item.B_name;
      tempItem.value = item.B_ISBN;
      temp.push(tempItem);
    });
    this.setData({
      bookList: [...temp],
    });
  },
  showDetail(e) {
    var id = e.currentTarget.dataset['index'];
    wx.navigateTo({
      url: `/pages/consult/detail/index?id=${id}`,
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
