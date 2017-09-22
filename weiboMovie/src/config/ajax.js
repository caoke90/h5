import axios from 'axios';
import qs from 'qs';

// Vuex Store 配置
import Bus from './../marvel/bus';

function cleanRequest(req) {
  for (const i in req) {
    /* eslint guard-for-in: 0 */
    if (req[i] !== 0 && !req[i]) {
      delete req[i];
    }
  }
}
const isOnline = Boolean(window.location.hostname === 'movie.weibo.com');

axios.defaults.withCredentials = true;
axios.defaults.xsrfCookieName = null;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

module.exports.install = function (Vue) {
  axios.defaults.baseURL="";
  if(isOnline){
    axios.defaults.baseURL = location.protocol + '//movie.weibo.com';
  }
  Vue.prototype.$http = axios;
  Vue.http = axios;

  axios.interceptors.request.use(
    function (request) {
      request.method="post";
      const params = request.params;

      if (params) {
        cleanRequest(params);
      }

      if (request.data) {
        request.data=qs.stringify(Object.assign(request.data,Bus.movieConfig))
        cleanRequest(request.data);
      }else{
        request.data=qs.stringify(Bus.movieConfig)
      }


      return request;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  axios.interceptors.response.use(
    function (response) {
      if (response.status >= 400) {
        let msg = '';
        if (response.body && response.body.msg) {
          msg = response.body.msg;
        } else {
          msg = '接口请求失败';
          if (response.status) {
            msg += `(${response.status})`;
          }
        }
        window.mvToast.calls({
          type: 'error',
          text: msg
        });

        return response;
      }
      const data = response.data;
      if (data) {
        if (data.status === -100 && data.url) {
          window.location.href = data.url;
        }
        if (data.status === 0) {
          switch (data.error_type) {
            case 'alert': {
              Bus.$emit('mvMsgbox', {
                type: 'alert',
                text: data.msg
              });
              break;
            }
            case 'confirm': {
              if (!data.btn) {
                data.btn = {};
              }
              Bus.$emit('mvMsgbox', {
                type: 'confirm',
                title: data.title || '',
                text: data.msg,
                style: {
                  color: data.btn.color || 'orange'
                },
                btnText: data.btn.text || '',
                btnCallback: function () {
                  if (data.btn.url) {
                    window.location.href = data.btn.url;
                  }
                }
              });
              break;
            }

            default:
            // 暂不处理
          }
        }
      }
      return response;
    },
    function (error) {
      // Do something with response error
      return Promise.reject(error);
    }
  );
};
