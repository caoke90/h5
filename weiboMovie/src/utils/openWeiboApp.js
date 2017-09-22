module.exports = (function () {
  /* eslint one-var: 0 */
  /* eslint max-len: 0 */
  const ua = navigator.userAgent.toLowerCase();
  const noIntentTest = /aliapp|360 aphone|redmi note|weibo|windvane|ucbrowser|baidubrowser|oppobrowser|miuibrowser|mqqbrowser|huaweiknt-al20|h60-l01|wkbrowser/.test(ua);
  const hasIntentTest = /chrome|samsung/.test(ua);
  const isAndroid = /android|adr/.test(ua) && !(/windows phone/.test(ua));
  const isIos = navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  let canIntent = !noIntentTest && hasIntentTest && isAndroid;
  let locked = false;
  let startTime;
  let timeout;

  if (ua.indexOf('m353') > -1 && !noIntentTest) {
    canIntent = false;
  }
  if (ua.indexOf('WeSecure')) {
    canIntent = false;
  }

  const opts = {
      scheme: 'sinaweibo://gotohome',
      /* downloadurl:可选 */
      url: 'http://m.weibo.cn/feature/download/index',
      /* 未安装微博客户端是否去下载页开关:可选 */
      isDownload: true,
      /* 用于统计扩展参数:可选 */
      h5pos: null,
      /* 呼起失败超时时间 */
      opentime: 1500,
      /* 呼起失败callback */
      callback: null,
      /* 用于开发调试, 可以传入用于显示信息的dom */
      log: null
    },
    gotoDownload = function () {
      const endTime = Date.now();
      if (!startTime || endTime - startTime < opts.opentime + 200) {
        if (opts.isDownload) {
          window.location = opts.url;
        } else if (opts.callback) {
          opts.callback();
        }
      }
    },
    customClickEvent = function () {
      let clickEvt;
      if (window.CustomEvent) {
        clickEvt = new window.CustomEvent('click', {
          canBubble: true,
          cancelable: true
        });
      } else {
        clickEvt = document.createEvent('Event');
        clickEvt.initEvent('click', true, true);
      }
      return clickEvt;
    },
    link = function (url, isIntent) {
      let openIntentLink = document.getElementById('openIntentLink');
      if (!openIntentLink) {
        openIntentLink = document.createElement('a');
        openIntentLink.id = 'openIntentLink';
        openIntentLink.style.display = 'none';
        document.body.appendChild(openIntentLink);
      }
      openIntentLink.href = url;
      if (opts.log && opts.log.outerHTML) {
        if (isIntent) {
          console.log('Intent方式呼起, url: ' + url);
          opts.log.innerHTML = 'Intent方式呼起, url: ' + url;
        } else {
          console.log('link方式呼起, url: ' + url);
          opts.log.innerHTML = 'link方式呼起, url: ' + url;
        }
      }
      // 执行click
      openIntentLink.dispatchEvent(customClickEvent());
    },
    iframe = function (url) {
      const ifr = document.createElement('iframe');
      ifr.src = url;
      ifr.style.display = 'none';
      if (opts.log && opts.log.outerHTML) {
        console.log('iframe方式呼起, url: ' + url);
        opts.log.innerHTML = 'iframe方式呼起, url: ' + url;
      }
      document.body.appendChild(ifr);
    },
    getUnilink = function (scheme, h5pos) {
      if (!scheme) {
        return '';
      }
      const s = scheme;
      let url = 'http://weibo.cn/appurl?scheme=';
      let ext = h5pos ? 'h5pos:' + h5pos : '';
      const reg = /^.+(?:[&?]extparam=)(.*?)(?:&|$)/;
      // 检查scheme是是否带有extparam参数
      const result = s.match(reg);
      if (result && result[1]) {
        ext = ext ? ext + '|' + result[1] : 'h5pos:' + result[1];
      }
      if (ext) {
        url += encodeURIComponent(s + '&extparam=' + encodeURIComponent(ext));
      } else {
        url += encodeURIComponent(s);
      }
      return url;
    },
    open = function () {
      // 唤起锁定，避免重复唤起
      if (locked) {
        return;
      }
      locked = true;
      startTime = Date.now();
      if (!canIntent) {
        const iosVer = ua.match(/os (\d+)_\d[_\d]* like Mac OS X/i);
        if (ua.indexOf('qq/') > -1 || isIos && ua.indexOf('qqbrowser') > -1
          || (ua.indexOf('safari') > -1 && iosVer && iosVer[1] >= 9)) {
          // qq: 只能用link方式呼起...T_T
          link(opts.scheme);
        } else {
          // 不支持intent的非qq浏览器: iframe尝试呼起
          iframe(opts.scheme);
        }
        // 延迟跳转到下载页
        if (opts.url) {
          timeout = setTimeout(function () {
            gotoDownload();
          }, opts.opentime);
          window.onblur = function () {
            clearTimeout(timeout);
          };
        }
      } else {
        // android支持intent方式时: intent呼起客户端
        let intentUrl;
        let protocol = 'sinaweibo';
        if (opts.scheme) {
          protocol = opts.scheme.substring(0, opts.scheme.indexOf('://'));
        }
        if (opts.isDownload) {
          intentUrl = opts.scheme.replace(protocol, 'intent')
            + '#Intent;scheme=' + protocol + ';S.browser_fallback_url='
            + encodeURIComponent(opts.url) + ';end';
        } else {
          intentUrl = opts.scheme.replace(protocol, 'intent')
            + '#Intent;scheme=' + protocol + ';end';
        }
        link(intentUrl, 1);
      }
      // 唤起加锁，避免短时间内被重复唤起.
      setTimeout(function () {
        locked = false;
      }, opts.opentime + 1000);
    },
    start = function (option) {
      if (option) {
        Object.assign(opts, option);
      }
      open();
    };
  return {
    start: start,
    getUnilink: getUnilink,
  };
}());
