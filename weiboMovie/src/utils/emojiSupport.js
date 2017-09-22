/**
 * yuanyue.wei 2016.12
 * 用于判断一个字符是不是emoji
 * return Boolean
 */

const getTextFeature = (text, color) => {
  try {
    const canvas = document.createElement('canvas');
    canvas.width = 2;
    canvas.height = 2;

    const ctx = canvas.getContext('2d');
    ctx.textBaseline = 'top';
    ctx.font = '100px -no-font-family-here-';
    ctx.fillStyle = color;
    ctx.scale(0.01, 0.01);
    ctx.fillText(text, 0, 0);

    const feature = ctx.getImageData(0, 0, 2, 2).data;
    const arr = [];
    for (let i = 0; i < feature.length; i++) {
      arr[i] = feature[i];
    }

    return arr.reduce((a, b) => (a + b), 0) > 0 ? arr.toString() : false;
  } catch (e) {
    return false;
  }
};

const distribute = (text, mode) => {
  const feature = getTextFeature(text, '#000');
  return mode ? (feature && feature === getTextFeature(text, '#FFF'))
    : feature;
};

export default function (text) {
  const mode = distribute('😁');
  return distribute(text, mode);
}
