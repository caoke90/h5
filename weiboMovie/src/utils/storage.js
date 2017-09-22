/* eslint no-useless-escape: 0*/
/* eslint one-var: 0*/
module.exports = (function () {
  const storage = {
    setData: function (name, data, isSession) {
      const method = isSession ? 'sessionStorage' : 'localStorage';
      const item = typeof data === 'object' ? JSON.stringify(data) : data;
      try {
        if (window[method]) {
          window[method][name] = item;
        }
      } catch (e) {
        console.log(e);
      }
    },
    getData: function (name, isSession) {
      const method = isSession ? 'sessionStorage' : 'localStorage';
      if (this.hasData(name, isSession)) {
        try {
          return JSON.parse(window[method][name]);
        } catch (e) {
          // ..
        }
        return window[method][name];
      }
      return null;
    },
    hasData: function (name, isSession) {
      const method = isSession ? 'sessionStorage' : 'localStorage';
      try {
        if (window[method] && window[method][name]) {
          return true;
        }
      } catch (e) {
        console.log(e);
      }
      return false;
    },
    removeData: function (name, isSession) {
      const method = isSession ? 'sessionStorage' : 'localStorage';
      try {
        if (window[method] && window[method][name]) {
          window[method].removeItem(name);
        }
      } catch (e) {
        console.log(e);
      }
    },
    clearData: function (isSession) {
      const method = isSession ? 'sessionStorage' : 'localStorage';
      try {
        if (window[method]) {
          window[method].clear();
        }
      } catch (e) {
        console.log(e);
      }
    },
    addItem: function (name, data, pos, isSession) {
      const method = isSession ? 'sessionStorage' : 'localStorage';
      try {
        if (window[method]) {
          let queue;
          if (!this.hasData(name, isSession)) {
            queue = [];
          } else {
            queue = this.getData(name, isSession);
          }
          if (pos && pos === 'start') {
            queue.unshift(data);
          } else {
            queue.push(data);
          }
          this.setData(name, queue, isSession);
        }
      } catch (e) {
        console.log(e);
      }
    },
    getItem: function (name, idx, isSession) {
      const queue = this.getData(name, isSession);
      if (queue && queue[idx]) {
        return queue[idx];
      }
      return null;
    },
    getCookie: function (c_name) {
      /* eslint camelcase: 0 */
      let c_start;
      let c_end;
      if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + '=');
        if (c_start !== -1) {
          c_start = c_start + c_name.length + 1;
          c_end = document.cookie.indexOf('=', c_start);
          if (c_end === -1) {
            c_end = document.cookie.length;
          }
          return decodeURIComponent(document.cookie.substring(c_start, c_end));
        }
      }
      return null;
    },
    setCookie: function (name, value, Days) {
      const exp = new Date();
      exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
      document.cookie = name + '=' + escape(value) +
        ';domain=.weibo.cn;expires=' + exp.toGMTString();
    },
    clearCookie: function (name) {
      this.setCookie(name, '', -1);
    },
  };
  return storage;
}());
