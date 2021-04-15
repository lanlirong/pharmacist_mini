// pages/index/index.js
import { request } from '../../request/index.js';
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
Page({
  /**
   * 组件的初始数据
   */
  data: {
    hotList: [],
    searchKey: '根痛平胶囊',
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
  onChange(e) {
    this.setData({
      searchKey: e.detail,
    });
  },
  async simpleSearch() {
    if (this.data.searchKey == '') {
      Toast.fail('输入不能为空!');
      return;
    }
    const data = await request({
      url: '/simpleSearch/list',
      method: 'POST',
      data: { searchKey: this.data.searchKey },
    });

    console.log(data);
    if (data.drug && data.disease) {
      Toast.fail('结果包含多种，请至各种类查询页详细搜索！');
    } else if (data.drug) {
      // this.$router.push('/drug/search?searchkey=' + this.searchKey);
      wx.navigateTo({
        url: `/pages/drug/index?searchkey=${this.data.searchKey}`,
      });
    } else if (data.disease) {
      // this.$router.push('/disease/detail?id=' + );
      wx.navigateTo({
        url: `/pages/disease/detail/index?id=${data.disease}`,
      });
    } else {
      Toast.fail('快捷查询没有找到，请至各种类查询页详细搜索！');
    }
  },
});
