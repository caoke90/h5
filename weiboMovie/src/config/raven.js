import Raven from 'raven-js';
import RavenVue from 'raven-js/plugins/vue';

const config = window.config;
const dsn = 'https://c9ddac5577d049f9ab005e5294551125@sentry.weibo.cn/3';
const option = {
  release: 'dev',
  whitelistUrls: ['h5.sinaimg.cn']
};

window.Raven = Raven;
const ua = navigator.userAgent;

let match;
if (config.env === 'prod') {
  option.release = config.version;
  option.shouldSendCallback = function () {
    return (
      /(micromessenger|weibo|qq|alipay)/.test(
        navigator.userAgent.toLowerCase()
      ) || Math.random() * 100 <= 10
    );
  };
} else {
  option.whitelistUrls.push('js.intra.weibo.cn');
}

module.exports.install = function (Vue) {
  Raven.config(dsn, option).addPlugin(RavenVue, Vue).install();
  if (config.uid) {
    Raven.setUser({
      id: config.uid
    });
  }
  /* eslint no-cond-assign:0 */
  if ((match = ua.match(/weibo__([0-9.]+)/i))) {
    Raven.setTagsContext({
      Weibo: match[1]
    });
  } else if ((match = ua.match(/MicroMessenger\/([\S]+)/i))) {
    Raven.setTagsContext({
      WeChat: match[1]
    });
  } else if ((match = ua.match(/QQ\/([\S]+)/i))) {
    Raven.setTagsContext({
      Alipay: match[1]
    });
  }
};
