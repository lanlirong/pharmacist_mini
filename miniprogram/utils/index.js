/*获取当前页url*/
const getCurrentPageUrl = () => {
  let pages = getCurrentPages(); //获取加载的页面
  let currentPage = pages[pages.length - 1]; //获取当前页面的对象
  let url = currentPage.route; //当前页面url
  return url;
};
/*获取当前页参数*/
const getCurrentPageParam = () => {
  let pages = getCurrentPages(); //获取加载的页面
  let currentPage = pages[pages.length - 1]; //获取当前页面的对象
  let options = currentPage.options; //如果要获取url中所带的参数可以查看options
  return options;
};
/* 缓存图片*/
const setImgCache = (url) => {
  wx.downloadFile({
    url: url,
    success: function (res) {
      if (res.statusCode === 200) {
        console.log('图片下载成功' + res.tempFilePath);
        const fs = wx.getFileSystemManager();
        fs.saveFile({
          tempFilePath: res.tempFilePath, // 传入一个临时文件路径
          success(res) {
            console.log('图片缓存成功', res.savedFilePath); // res.savedFilePath 为一个本地缓存文件路径
            wx.setStorageSync('image_cache', res.savedFilePath);
          },
        });
      } else {
        console.log('响应失败', res.statusCode);
      }
    },
    fail: function (error) {
      console.log(error);
    },
  });
};

module.exports = {
  getCurrentPageUrl,
  getCurrentPageParam,
  setImgCache,
};
/*使用
import utils from '../../../utils/util'

let url=utils.getCurrentPageUrl()
let options=utils.getCurrentPageParam()
*/
