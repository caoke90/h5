function fixZero(num) {
  return num < 10 ? ('0' + num) : num;
}

function fromNow(timeStr) {
  const time = new Date(timeStr);
  if (isNaN(time.getTime()) || (typeof timeStr === 'string' && (timeStr.indexOf('-') !== -1 || timeStr.indexOf('.') !== -1))) {
    return timeStr;
  }
  const now = new Date();
  const diff = (now - time) / 1000;
  if (diff < 86400) {
    if (time.getDate() === now.getDate()) {
      // 今天
      if (diff < 60) {
        return '刚刚';
      }
      if (diff < 3600) {
        return (diff / 60).toFixed() + '分钟前';
      }
      return (diff / 3600).toFixed() + '小时前';
    }
    // 昨天
    return `昨天 ${fixZero(time.getHours())}:${fixZero(time.getMinutes())}`;
  } else if (time.getFullYear() === now.getFullYear()) {
    // 今年内
    return `${time.getMonth() + 1}-${time.getDate()} \
               ${fixZero(time.getHours())}:${fixZero(time.getMinutes())}`;
  }
  return `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}`;
}

module.exports = fromNow;
