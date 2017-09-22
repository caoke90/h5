/**
 * 返回给定的字符长度。
 * 链接按短连接处理。
 * @param str
 */

function _stringBitLength(str) {
  /* eslint no-control-regex: 0 */
  if (!str) return 0;
  const b = str.match(/[^\x00-\xff]/g);
  return str.length + (b ? b.length : 0);
}

module.exports = (str, _limit) => {
  /* eslint max-len: 0 */
  const limit = _limit || 140;
  const innerLimit = 41;
  const outerLimit = 20;
  let stringTemp = str.replace(/(^\s*)|(\s*$)/g, '');
  stringTemp = stringTemp.replace(/(\n+)/g, '\n'); // 大于一个的换行符，替换成一个。
  const linkArr = str.match(/http(s*):\/\/[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)+([-A-Z0-9a-z_$.+!*()/,:;@&=?~#%]*)*/gi) || [];
  let shortLinkLength = 0;
  for (let i = 0, j = linkArr.length; i < j; i++) {
    const linkBitLength = _stringBitLength(linkArr[i]);
    if (!/^(http:\/\/t\.cn)/.test(linkArr[i])) {
      if (/^(http(s*):\/\/)+(t\.sina\.com\.cn|t\.sina\.cn)/.test(linkArr[i]) ||
        /^(http(s*):\/\/)+(weibo\.com|weibo\.cn)/.test(linkArr[i])) {
        if (linkBitLength <= innerLimit) {
          shortLinkLength += linkBitLength;
        } else {
          shortLinkLength += linkBitLength <= limit ? outerLimit : linkBitLength - limit + outerLimit;
        }
      } else {
        shortLinkLength += linkBitLength <= limit ? outerLimit : linkBitLength - limit + outerLimit;
      }
      stringTemp = stringTemp.replace(linkArr[i], '');
    }
  }
  return Math.ceil((shortLinkLength + _stringBitLength(stringTemp)) / 2);
};
