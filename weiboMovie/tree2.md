###文件生成树

$tree2 -c -i dist,node_modules,test -s

```html
├── build #配置
│   ├── build.js
│   ├── check-versions.js
│   ├── dev-client.js
│   ├── dev-server.js
│   ├── ftp.js
│   ├── utils.js
│   ├── vue-loader.conf.js
│   ├── webpack.base.conf.js
│   ├── webpack.dev.conf.js
│   └── webpack.prod.conf.js
├── config #配置
│   ├── dev.env.js
│   ├── index.js
│   └── prod.env.js
├── dist #发布目录
├── index.html #入口模版
├── node_modules
├── package-lock.json
├── package.json
├── README.md
├── src
│   ├── assets #相关的静态资源
│   │   ├── emoticon
│   │   │   └── emoji.json
│   │   ├── fonts
│   │   │   ├── icomoon.eot
│   │   │   ├── icomoon.svg
│   │   │   ├── icomoon.ttf
│   │   │   └── icomoon.woff
│   │   └── img
│   │       ├── androidMobile.png
│   │       ├── bg.png
│   │       ├── bubble1.svg
│   │       ├── bubble2.svg
│   │       ├── close.png
│   │       ├── compose_topic_default.png
│   │       ├── delete.png
│   │       ├── fingerprint.png
│   │       ├── jump.svg
│   │       ├── linkopen.png
│   │       ├── logo.svg
│   │       ├── openWeiboBg.png
│   │       ├── shang.svg
│   │       ├── slogn.svg
│   │       └── weibologo.png
│   ├── components #业务组件库
│   │   ├── common
│   │   │   ├── empty-failed.vue
│   │   │   ├── weibo-icon.vue
│   │   │   └── weibo-verified.vue
│   │   └── feed
│   │       ├── empty.vue
│   │       ├── page-article.vue
│   │       ├── page-bigpic.vue
│   │       ├── page-hongbao.vue
│   │       ├── page-video-inset.vue
│   │       ├── page-video.vue
│   │       ├── page-webpage.vue
│   │       ├── pages.vue
│   │       ├── pop-video.vue
│   │       ├── weibo-media.vue
│   │       └── weibo.vue
│   ├── filters #过滤器
│   │   ├── fromNow.js
│   │   ├── index.js
│   │   ├── star.js
│   │   └── wordsCount.js
│   ├── main.js #入口js文件
│   ├── marvel #公用组件库
│   │   ├── bus.js #通信
│   │   ├── components #组件
│   │   │   ├── actionsheet.vue #底部弹层-modal
│   │   │   ├── btn.vue
│   │   │   ├── loadmore.vue
│   │   │   ├── modal.vue #4个弹层
│   │   │   ├── msgbox.vue #中间弹层-modal
│   │   │   ├── nextpage.vue
│   │   │   ├── pagemore.vue
│   │   │   ├── pswp #图片放大查看样式
│   │   │   │   ├── default-skin
│   │   │   │   │   ├── default-skin.css
│   │   │   │   │   ├── default-skin.png
│   │   │   │   │   ├── default-skin.svg
│   │   │   │   │   └── preloader.gif
│   │   │   │   └── photoswipe.css
│   │   │   ├── pswp.vue #图片放大查看-modal
│   │   │   ├── slider.vue
│   │   │   ├── switch.vue
│   │   │   ├── toast.vue #顶部弹层-modal
│   │   │   └── topbar.vue
│   │   ├── directives #指令
│   │   │   ├── inf-scroll.js
│   │   │   └── mvlink.js
│   │   ├── index.js
│   │   └── vue-touch.js
│   ├── mixin #混合组件
│   │   ├── actionLogMixin.js
│   │   ├── cacheMixin.js
│   │   ├── moreMixin.js
│   │   ├── unilinkMixin.js
│   │   └── unreadMixin.js
│   ├── router #路由
│   │   └── index.js
│   ├── scss #sass工具
│   │   ├── _sassCore.scss
│   │   ├── _var.scss
│   │   ├── checkin.scss
│   │   ├── compose.scss
│   │   ├── emoticon.scss
│   │   └── weixinStatus.scss
│   ├── utils #工具
│   │   ├── dataURItoBlob.js
│   │   ├── emojiSupport.js
│   │   ├── fullscreenApi.js
│   │   ├── LRU.js
│   │   ├── openWeiboApp.js
│   │   ├── storage.js
│   │   └── ua.js
│   ├── views #页面
│   │   ├── Main.vue #主页面
│   │   └── test.vue #测试页面
│   └── vuex #状态器
│       └── store.js 
├── static
├── test #脚本测试目录和mock数据存放目录
└── webpack-assets.json
```
