let qcloud = require('../../vendor/wafer2-client-sdk/index')
let config = require('../../config')
let util = require('../../utils/util.js')

const app = getApp();

function get(subUrl, successBack) {
  //util.showBusy('正在请求');
  qcloud.request({
    login: true,
    url: app.appData.baseUrl + subUrl,
    success: (res) => {
      // util.showSuccess('请求成功完成');
      successBack(res.data.data)
    },
    fail(error) {
      util.showModel('请求失败', error);
      console.log('request fail', error);
    },
  });
}