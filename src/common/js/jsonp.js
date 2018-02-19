import originJSONP from 'jsonp'; // npm install jsonp
/**
 * 把jsonp封装成Promise
 * @param url 地址
 * @param data 参数
 * @param option 对应jsonp库的option （https://github.com/webmodules/jsonp）
 * @returns {Promise<any>}
 */
export default function jsonp(url, data, option) {
  url += (url.indexOf('?') < 0 ? '?' // 问号不存在就加个问号(因为说明这个url自己还没有任何参数)，否则加&
    : '&') + param(data);
  return new Promise((resolve/* 成功时调用 */, reject/* 失败时调用 */) => {
    // jsonp库的函数调用，参考 https://github.com/webmodules/jsonp
    originJSONP(url, option, (err, data) => {
      if (!err) {
        resolve(data);
      } else {
        reject(err);
      }
    });
  });
}

/**
 * 将data解析为url字符串
 * @param data
 * @returns {string}
 */
function param(data) {
  let url = '';
  for (let k in data) {
    let value = data[k] !== undefined ? data[k] : '';
    url += `&${k}=${value ? encodeURIComponent(value) : ''}`;
  }
  return url ? url.substring(1) : ''; // 从索引1 开始截取字符串到结尾
}
