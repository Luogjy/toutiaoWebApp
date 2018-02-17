import storage from 'good-storage';

const KEY_CHANNEL = 'channel';

/**
 * 更新新闻频道
 * @param channel 数组
 */
export function updateChannel(channel) {
  storage.set(KEY_CHANNEL, channel);
}

export function saveChannel() {
  console.log('缓存');
  let arr = storage.get(KEY_CHANNEL, []);
  console.log(arr.length);
  if (!arr.length) {
    storage.set(KEY_CHANNEL,
      [
        {
          id: ' ',
          name: '推荐',
          isEnable: 1
        },
        {
          id: 'news_hot',
          name: '热点',
          isEnable: 1
        },
        {
          id: 'video',
          name: '视频',
          isEnable: 1
        },
        {
          id: 'news_society',
          name: '社会',
          isEnable: 1
        },
        {
          id: 'news_entertainment',
          name: '娱乐',
          isEnable: 1
        },
        {
          id: 'news_tech',
          name: '科技',
          isEnable: 1
        },
        {
          id: 'question_and_answer',
          name: '问答',
          isEnable: 1
        },
        {
          id: 'news_car',
          name: '汽车',
          isEnable: 1
        },
        {
          id: 'news_finance',
          name: '财经',
          isEnable: 0
        },
        {
          id: 'news_military',
          name: '军事',
          isEnable: 0
        },
        {
          id: 'news_sports',
          name: '体育',
          isEnable: 0
        },
        {
          id: 'essay_joke',
          name: '段子',
          isEnable: 0
        },
        {
          id: 'news_world',
          name: '国际',
          isEnable: 0
        },
        {
          id: 'news_health',
          name: '健康',
          isEnable: 0
        },
        {
          id: 'news_house',
          name: '房产',
          isEnable: 0
        },
        {
          id: 'news_baby',
          name: '育儿',
          isEnable: 0
        },
        {
          id: 'digital',
          name: '数码',
          isEnable: 0
        },
        {
          id: 'news_food',
          name: '美食',
          isEnable: 0
        },
        {
          id: 'news_regimen',
          name: '养生',
          isEnable: 0
        },
        {
          id: 'movie',
          name: '电影',
          isEnable: 0
        },
        {
          id: 'cellphone',
          name: '手机',
          isEnable: 0
        },
        {
          id: 'news_edu',
          name: '教育',
          isEnable: 0
        },
        {
          id: 'news_travel',
          name: '旅游',
          isEnable: 0
        },
        {
          id: '宠物',
          name: '宠物',
          isEnable: 0
        },
        {
          id: 'news_culture',
          name: '文化',
          isEnable: 0
        },
        {
          id: 'news_story',
          name: '故事',
          isEnable: 0
        },
        {
          id: 'news_game',
          name: '游戏',
          isEnable: 0
        },
        {
          id: 'stock',
          name: '股票',
          isEnable: 0
        },
        {
          id: 'news_comic',
          name: '动漫',
          isEnable: 0
        },
        {
          id: 'emotion',
          name: '情感',
          isEnable: 0
        },
        {
          id: 'boutique',
          name: '精选',
          isEnable: 0
        },
        {
          id: 'news_astrology',
          name: '星座',
          isEnable: 0
        },
        {
          id: 'news_home',
          name: '家居',
          isEnable: 0
        },
        {
          id: 'news_agriculture',
          name: '三农',
          isEnable: 0
        },
        {
          id: 'pregnancy',
          name: '孕产',
          isEnable: 0
        },
        {
          id: 'news_collect',
          name: '收藏',
          isEnable: 0
        },
        {
          id: 'news_fashion',
          name: '时尚',
          isEnable: 0
        },
        {
          id: 'news_history',
          name: '历史',
          isEnable: 0
        },
        {
          id: 'funny',
          name: '搞笑',
          isEnable: 0
        },
        {
          id: 'rumor',
          name: '辟谣',
          isEnable: 0
        },
        {
          id: '中国新唱将',
          name: '中国新唱将',
          isEnable: 0
        },
        {
          id: '彩票',
          name: '彩票',
          isEnable: 0
        },
        {
          id: '快乐男声',
          name: '快乐男声',
          isEnable: 0
        },
        {
          id: 'positive',
          name: '正能量',
          isEnable: 0
        },
        {
          id: 'government',
          name: '政务',
          isEnable: 0
        },
        {
          id: 'news_discovery',
          name: '探索',
          isEnable: 0
        }

      ]);
  }
}

export function getChannel() {
  return storage.get(KEY_CHANNEL, []);
}

export function getEnableChannel() {
  let arr = getChannel();
  return arr.filter((item) => {
    return item.isEnable;
  });
}
