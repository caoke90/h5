function tpl(cls) {
  return `<i class="m-font m-font-star m-star-${cls}"></i>`;
}

function star(value) {
  if (!value) {
    return null;
  }
  let _v = value.replace(/\[星星]/g, tpl('full'));
  _v = _v.replace(/\[半星]/g, tpl('half'));
  _v = _v.replace(/\[空星]/g, tpl('null'));
  _v = _v.replace(/iconimg iconimg-xs/g, 'url-icon');
  return _v;
}
module.exports = star;
