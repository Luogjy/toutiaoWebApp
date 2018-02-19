import jsonp from '../../../common/js/jsonp';

const baseUrl1 = 'http://is.snssdk.com/api/news/feed/v62/?iid=5034850950&device_id=6096495334&refer=1&count=20&aid=13';
const baseUrl2 = 'http://lf.snssdk.com/api/news/feed/v62/?iid=12507202490&device_id=37487219424&refer=1&count=20&aid=13';

export function getNewsList(channelId) {
  let n = Math.floor(10 * Math.random());
  let url;
  if (n % 2 === 0) {
    url = baseUrl1;
  } else {
    url = baseUrl2;
  }
  let time = Math.floor(new Date().getTime() / 1000);
  const data = {
    category: channelId,
    max_behot_time: time
  };
  const options = {
    // param: 'jsonpCallback'
  };
  return jsonp(url, data, options);
}
