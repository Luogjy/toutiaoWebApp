export function formatTime(time) {
  let now = Math.floor(new Date().getTime() / 1000);
  let between = (now - time) / 60;
  if (between <= 1) { // 如果在当前时间以前一分钟内
    return '刚刚';
  } else if (between <= 60) {
    return Math.floor(between) + '分钟前';
  } else if (between <= 60 * 24) {
    return Math.floor(between / 60) + '小时前';
  } else if (between <= 60 * 24 * 2) {
    return Math.floor(between / (60 * 24)) + '天前';
  } else {
    return formatMillisecondUntilDay(time * 1000);
  }
}

/**
 * 把毫秒格式化为yyyy-MM-dd HH:mm:ss
 * @param millisecond {number}
 * @returns {string}
 */
export function formatMillisecondUntilSec(millisecond) {
  let {year, month, day, hour, min, sec} = parseMillisecond(millisecond);
  return year + '-' + padStart(month) + '-' + padStart(day) + ' ' + padStart(hour) + ':' + padStart(min) + ':' + padStart(sec);
}

/**
 * 把毫秒格式化为yyyy-MM-dd
 * @param millisecond {number}
 * @returns {string}
 */
export function formatMillisecondUntilDay(millisecond) {
  let {year, month, day} = parseMillisecond(millisecond);
  return year + '-' + padStart(month) + '-' + padStart(day);
}

function parseMillisecond(millisecond) {
  const date = new Date(millisecond);
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    hour: date.getHours(),
    min: date.getMinutes(),
    sec: date.getSeconds()
  };
}

// 10以内补0
export function padStart(num) {
  if (parseInt(num) < 10) {
    num = '0' + num;
  }
  return num;
}
