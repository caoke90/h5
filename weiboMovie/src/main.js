/**
 * 主入口文件
 */
import Vue from 'vue';
import 'es6-promise/auto';
// import router from './router';
// Vuex Store 配置
// Marvel基本组件
import Marvel from './marvel';
import Bus from './marvel/bus';
import ajax from './config/ajax';
Vue.use(Marvel);
Vue.use(ajax);

Vue.use(require('./filters'));

//获取公共参数config和changeCity
Bus.movieConfig = {
	v: "7.9.0",
	a_n: "MovieSDK",
	from_type: "html",
};
Bus.$on("movieConfig", function(params) {
	Object.assign(Bus.movieConfig, params)
});


const u = window.navigator.userAgent;
if(u.indexOf('Android') > -1) {
	Bus.browser = "weibo";

	function connectWebViewJavascriptBridge(callback) {
		if(window.WebViewJavascriptBridge) {
			callback(WebViewJavascriptBridge);
		} else {
			document.addEventListener(
				'WebViewJavascriptBridgeReady',
				function() {
					callback(WebViewJavascriptBridge)
				},
				false
			);
		}
	}

	connectWebViewJavascriptBridge(function(bridge) {
		bridge.init(function(message, responseCallback) {
			var data = {
				'Javascript Responds': 'Wee!'
			};
			responseCallback(data);
		});

		bridge.callHandler("movieConfig", {}, function(params) {
			if(typeof params == "string") {
				Bus.$emit("movieConfig", JSON.parse(params))
			} else {
				Bus.$emit("movieConfig", params)
			}
		});
		bridge.registerHandler("changeCity", function(params, responseCallback) {
			if(typeof params == "string") {
				Bus.$emit("changeCity", JSON.parse(params))
			} else {
				Bus.$emit("changeCity", params)
			}
		});

		Bus.$on("movieActionLog", function(params) {
			bridge.callHandler("movieActionLog", params, function(params, success, code) {
				if(success) {
					// alert("log日志发送成功！");
				}
			});
		})
	})
} else if(u.match(/(ip[honead]+)(?:.*os\s([\w]+)*\slike\smac|;\sopera)/i) && u.match(/Weibo\s*\((.*?)\)/i)) {
	Bus.browser = "weibo";

	function bridgeReady() {
		WeiboJSBridge.invoke("movieConfig", {}, function(params, success, code) {
			if(success) {
				if(typeof params == "string") {
					Bus.$emit("movieConfig", JSON.parse(params))
				} else {
					Bus.$emit("movieConfig", params)
				}
			}
		});
		WeiboJSBridge.on('changeCity', function(params) {
			if(typeof params == "string") {
				Bus.$emit("changeCity", JSON.parse(params))
			} else {
				Bus.$emit("changeCity", params)
			}
		});

		Bus.$on("movieActionLog", function(params) {
			WeiboJSBridge.invoke("movieActionLog", params, function(params, success, code) {
				if(success) {
					// alert("log日志发送成功！");
				}
			});
		})
	}

	if(window.WeiboJSBridge) {
		bridgeReady();
	} else {
		document.addEventListener('WeiboJSBridgeReady', function() {
			bridgeReady();
		});
	}
}

/* eslint no-unused-vars: 0 */
const app = new Vue({
	// router,
	name: 'App',
	components: {
		"router-view": require("./views/main")
	},
	created() {

		// 解决键盘弹出后挡表单的问题
		window.addEventListener('resize', function() {
			if(
				document.activeElement.tagName === 'INPUT' ||
				document.activeElement.tagName === 'TEXTAREA'
			) {
				window.setTimeout(function() {
					if('scrollIntoView' in document.activeElement) {
						document.activeElement.scrollIntoView();
					} else {
						document.activeElement.scrollIntoViewIfNeeded();
					}
				}, 0);
			}
		});
	}
}).$mount('#app');
