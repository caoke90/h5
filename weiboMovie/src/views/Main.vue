<template>
  <div class="main-wrap">
     <!--vuex示例代码 -->
    <template v-if="list_cur && list_cur.length > 0">
      <mv-loadmore :top-method="pull_refresh">
        <div class="pannelwrap"
             :style="{'padding-top': to_rem(padding_top), 'padding-bottom': to_rem(padding_bottom)}"
             ref="cont">

          <div v-for="item in list_cur" class="wb-item-wrap" :mid="item.feed_id" :key="item.feed_id">
            <div class="wb-item">
              <weibo :item="item" :showTriangle="show_triangle"></weibo>
            </div>
          </div>
        </div>
        <div v-if="re_do" @click="load_more(feed_url + '&max_id=' + max_id, '1')" class="m-tips m-tips-tp cursor">网络异常,请稍后点击重试~</div>

        <div class="loading" v-show="is_loading&&!re_do">loading......</div>
        <div class="temporary" ref="hei">
          <!-- 用来临时计算减掉高度的div -->
          <div v-for="item in diff_items" class="wb-item-wrap">
            <div class="wb-item">
              <weibo :item="item" :showTriangle="show_triangle" hidImg="1"></weibo>
            </div>
          </div>
        </div>
      </mv-loadmore>
    </template>
    <template v-else>
      <div v-if="net_error.flag">
        <no-data :msg="net_error"></no-data>
      </div>
      <div v-if="!net_error.flag && no_data.flag">
        <no-data :msg="no_data"></no-data>
      </div>
      <div v-if="!net_error.flag && !no_data.flag" v-for="item in emptydata"  class="wb-item-wrap">
        <div class="wb-item">
        <weibo :item="item"></weibo>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
  require("../assets/css/card9.css");
  /* eslint quote-props: 0 */
  import Bus from '../marvel/bus';
  import storage from '../utils/storage';


  export default{
    data() {
      return {
        emptydata:[
          {
            "card_type": "homepage_banner",
            "title": "",
            "list": []
          },
          {
            "card_type": "homepage_hot",
            "title": "正在热映",
            "list": [
              {
                "name": "……",
                "score": "……",
                "poster_url": "",
                "button_type": "buy",
                "text": "……",
                "button": {
                  "title": "……",
                },
              },
              {
                "name": "……",
                "score": "……",
                "poster_url": "",
                "button_type": "buy",
                "text": "……",
                "button": {
                  "title": "……",
                },
              },
              {
                "name": "……",
                "score": "……",
                "poster_url": "",
                "button_type": "buy",
                "text": "……",
                "button": {
                  "title": "……",
                },
              },
              {
                "name": "……",
                "score": "……",
                "poster_url": "",
                "button_type": "buy",
                "text": "……",
                "button": {
                  "title": "……",
                },
              }
            ]
          },
          {
            "title": "预告片速递",
            "card_type": "homepage_title"
          },
          {

            "card_type": "homepage_video",
            "user": {
              "id": 1623886424,
              "name": "...",
              "avatar_large": "",
              "verified": true,
              "verified_type": 1,
              "verified_type_ext": 0,
              "mbtype": 1,
              "mbrank": 4,
              "verified_tmp": 3
            },
            "card_info": {
              "big_card": {
                "text": "",
                "object": {
                  "stream": {
                    "duration": "...",
                  },
                  "image": {
                    "url": ""
                  },
                },
                "object_type": "video",
                "play_count": "..."
              },
              "html": "...............",
             },
          },
        ],
        feed_url: 'movieapp/homepage/weibo?',
        first_scroll: 0,
        is_scrolling: false,
        is_loading: false,
        is_request: false,
        no_finish_save: false,
        list_all: [],
        list_cur: [],
        since: '',
        max: '',
        padding_top: 0,
        padding_bottom: 0,
        since_id: '',
        max_id: '',
        // 当前显示列表一直保持10条数据
        count: 20,
        last_scrolltop: 0,
        diff_items: [],
        feed_id: 5000,
        show_triangle: false,
        no_data: {
          flag: false,
          msg: '暂无数据',
        },
        net_error: {
          flag: false,
          msg: '网络异常,请稍后刷新重试~',
        },
        re_do: false
      };
    },
    // mixins: [require('../mixin/cacheMixin.js')],
    components: {
      'mv-loadmore': require('@/marvel/components/loadmore.vue'),
      'weibo': require('../components/cards/homepage.vue'),
//      'empty': require('../components/feed/empty.vue'),
      'no-data': require('../components/common/empty-failed.vue')
    },
    watch: {
      'list_all'() {
        if (this.is_loading === true) {
          this.scrolling();
        }
      },
    },
    beforeRouteLeave(to, from, next) {
      // 导航离开该组件的对应路由时调用
      /* console.log(to);
       console.log(from);*/
      this.save_storage('vue-router');
      this.is_scrolling = false;
      this.is_loading = false;
      this.is_request = false;
      window.onscroll = null;
      Bus.$off('changeCity');
      Bus.$off('H5_Refrash');
      next();
    },
    mounted: function () {
      const self = this;
      const performance = window.performance
        || window.webkitPerformance
        || window.msPerformance
        || window.mozPerformance;
      const isBack = !performance || (performance && performance.navigation.type === 2);
      Bus.$on('changeCity', (params) => {
        Object.assign(Bus.movieConfig,params)
//        alert("changeCity:"+JSON.stringify(params))
        this.switch_groups();

      });
      Bus.$on('H5_Refrash', () => {
        this.pull_refresh();
      });

      if (storage.hasData('h5_feed_data')
        && storage.hasData('h5_curscroll')
        && storage.getData('h5_last_time')
        && new Date().getTime() - storage.getData('h5_last_time') <= 1000 * 60 * 60 * 3
        && (storage.getData('h5_jump_type') === 'change-href' && isBack
          || storage.getData('h5_jump_type') === 'vue-router')) {
        const datas = storage.getData('h5_feed_data');
        const curscroll = storage.getData('h5_curscroll');
        for (const prop in datas) {
          if ({}.hasOwnProperty.call(datas, prop)) {
            this[prop] = datas[prop];
          }
        }
        self.$nextTick(() => {
          self.is_scrolling = false;
          self.is_request = false;
          self.is_loading = false;
          document.body.scrollTop = curscroll;
          window.onscroll = self.scrolling;
        });
      } else {
        // 首屏数据为了快速展示,不插入临时计算dom,直接渲染,然后再计算高度,绑定事件
        this.clear_storage();
        if(Bus.browser&&!Bus.movieConfig.uid){
          Bus.$on("movieConfig",()=>{
            this.init_first_data();
          })
        }else{
          this.init_first_data();
        }



      }
      window.onbeforeunload = function () {
        self.save_storage('change-href');
        self.is_scrolling = false;
        self.is_request = false;
        self.is_loading = false;
        window.onscroll = null;
        Bus.$off('changeCity');
        Bus.$off('H5_Refrash');
      };
      window.onunload = function () {
        self.save_storage('change-href');
        self.is_scrolling = false;
        self.is_request = false;
        self.is_loading = false;
        window.onscroll = null;
        Bus.$off('changeCity');
        Bus.$off('H5_Refrash');
      };


    },
    methods: {

      switch_groups: function () {
        this.feed_url = 'movieapp/homepage/weibo?';
        this.no_data.flag = false;
        this.net_error.flag = false;
        this.re_do = false;
        this.list_all = [];
        this.list_cur = [];
        this.padding_top = 0;
        this.padding_bottom = 0;
        this.last_scrolltop = 0;
        document.body.scrollTop = 0;
        window.onscroll = null;
        this.clear_storage();
        this.init_first_data();
      },
      clear_storage: function () {
        // window.onscroll = null;
        storage.removeData('h5_feed_data');
        storage.removeData('h5_curscroll');
        storage.removeData('h5_jump_type');
        storage.removeData('h5_last_time');
      },
      save_storage: function (type) {
        if (this.list_all.length > 0) {
          // window.onscroll = null;
          storage.setData('h5_feed_data', this.$data);
          storage.setData('h5_curscroll', document.body.scrollTop);
          storage.setData('h5_jump_type', type);
          storage.setData('h5_last_time', new Date().getTime());
        }
      },
      init_first_data: function () {
        const url = "movieapp/homepage/top";
        if (this.is_request === true) {
          return;
        }
        this.is_request = true;
        const self = this;
        this.$http.get(url, { timeout: 1000 * 30 }).then(function (rst) {
          self.is_request = false;
          if (rst.data && rst.data.status==1) {
            if (rst.data.data.list && rst.data.data.list.length > 0) {
              const dataList = rst.data.data.list;
              self.since_id = rst.data.since_id;
              self.max_id = rst.data.data.max_id;
              //是否需要优化
              dataList.forEach(function (item,i) {
                item.curIndex=i;
              })

              self.list_cur = dataList;

              setTimeout(function () {
                const items = self.$refs.cont.children;
                let i;
                let hei;
                let feed_id;
                for (i = 0; i < items.length; i++) {
                  // hei = Math.round(items[i].offsetHeight);
                  hei = items[i].offsetHeight;
                  feed_id = self.feed_id++;
                  Object.assign(dataList[i], { hei: hei, feed_id: feed_id });
                }
                self.list_all = dataList;
                const clientH = document.documentElement.clientHeight || window.innerHeight;
                const len = self.list_cur.length;
                self.since = self.list_cur[0].feed_id;
                self.max = self.list_cur[len - 1].feed_id;
                // console.log('---------' + self.max);
                self.first_scroll = self.$refs.cont.offsetHeight * 0.5 - clientH / 2;
                window.onscroll = self.scrolling;

              }, 0);
              self.no_data.flag = false;
            } else {
              self.no_data.flag = true;
            }
          } else {
            self.net_error.flag = true;
          }
          self.$nextTick(function () {
            Bus.$emit('mvLoadEnd');
          });
        }, function () {
          Bus.$emit('mvLoadEnd');
          self.net_error.flag = true;
          Bus.$emit('mvToast', {
            type: 'error',
            text: '网络异常,稍后请刷新重试~'
          });
        });
      },
      pull_refresh: function () {
        // 目前无法准确判断下拉刷新断层问题,暂时先清掉数据,后续持续优化
        document.body.scrollTop = 0;
        this.padding_top = 0;
        this.padding_bottom = 0;
        this.last_scrolltop = 0;
        this.clear_storage();
        this.init_first_data();
        /* const self = this;
         document.body.scrollTop = 0;
         this.padding_top = 0;
         this.padding_bottom = 0;
         this.last_scrolltop = 0;
         if (this.is_request === true) {
         return;
         }
         this.is_request = true;
         const url = this.feed_url + '&since_id=' + this.since_id;
         this.$http.get(url, {}, {}).then(function (rst) {
         this.is_request = false;
         Bus.$emit('mvLoadEnd');
         if (rst.data && rst.data.ok && rst.data.dataList.length > 0) {
         console.log('下拉刷新的max_id=' + rst.data.max_id);
         console.log('last since_id=' + self.since_id);
         if (rst.data.max_id === self.since_id) {
         alert('没有断层');
         self.since_id = rst.data.since_id;
         /!* console.log('new length' + rst.data.dataList.length + 'sinceid=' + this.since_id);
         let t;
         const lens = this.list_all.length;
         for (t = 0; t < lens; t++) {
         console.log(this.list_all[t].id);
         }*!/
         self.save_height(rst.data, 'start');
         setTimeout(function () {
         self.list_cur = self.list_all.slice(0, self.count);
         self.since = self.list_cur[0].id;
         self.max = self.list_cur[self.list_cur.length - 1].id;
         console.log(self.max);
         }, 0);
         } else {
         alert('断层了。。。');
         }
         }
         });*/
      },
      refresh: function () {
        document.body.scrollTop = 0;
        setTimeout(function () {
          Bus.$emit('mvLoadStart');
        }, 250);
      },
      load_more: function (url, showToast) {
        if (this.is_request === true) {
          return;
        }
        const self = this;
        this.is_request = true;
        this.$http.get(url, { timeout: 1000 * 30 }).then(function (rst) {
          if (rst.data && rst.data.status==1 && rst.data.data.list.length > 0) {
            self.max_id = rst.data.data.max_id;
            self.save_height(rst.data);
            self.re_do = false;
          } else {
            if (showToast) {
              Bus.$emit('mvToast', {
                type: 'error',
                text: rst.data.msg || '网络异常,请稍后再试~',
              });
            }
            self.is_request = false;
            self.re_do = true;
          }
        }, function () {
          if (showToast) {
            Bus.$emit('mvToast', {
              type: 'error',
              text: '网络异常,请稍后再试~'
            });
          }
          self.is_request = false;
          self.re_do = true;
        });
      },
      save_height: function (data, direction) {
        const dataList = data.data.list;
        let items;
        let i;
        let hei;
        let feed_id;
        const len = dataList.length;
        const self = this;
        self.diff_items = dataList;
        setTimeout(function () {
          if (self.$refs.hei.children.length === len) {
            self.no_finish_save = false;
            items = self.$refs.hei.children;
            for (i = 0; i < len; i++) {
              // hei = Math.round(items[i].offsetHeight);
              hei = items[i].offsetHeight;
              feed_id = self.feed_id++;
              // console.log(feed_id);
              Object.assign(dataList[i], { hei: hei, feed_id: feed_id });
            }
            self.set_list_all(data, direction);
            self.diff_items = [];
          } else {
            self.no_finish_save = true;
          }
        }, 0);
      },
      set_list_all: function (data, direction) {
        const self = this;
        // this.since_id = data.since_id;
        // this.max_id = data.max_id;
        self.is_request = false;
        const list = data.data.list;
        if (direction === 'start') {
          this.list_all = list.concat(this.list_all);
        } else {
          // 默认end 数据加在结尾
          this.list_all = this.list_all.concat(list);
        }
        /* if (this.list_cur.length === 0) {
         // 初始数据列表
         this.list_cur = this.list_all;
         const len = this.list_cur.length;
         this.since = this.list_cur[0].id;
         this.max = this.list_cur[len - 1].id;
         setTimeout(function () {
         self.first_scroll = self.get_item_H('start', parseInt(self.count * 0.5, 10));
         }, 0);
         // 初始直接请求2屏数据
         // this.load_more(this.feed_url + '&max_id=' + this.max_id);
         window.onscroll = this.scrolling;
         }*/
      },
      get_item_H: function (direction, N) {
        const items = this.$refs.cont.children;
        const len = items.length;
        const n = N || len;
        let i;
        let hei = 0;
        // 从头取N条数据的高度
        if (direction === 'start') {
          for (i = 0; i < n; i++) {
            // hei += Math.round(items[i].offsetHeight);
            hei += items[i].offsetHeight;
          }
        } else {
          for (i = len - 1; i >= len - n; i--) {
            // hei += Math.round(items[i].offsetHeight);
            hei += items[i].offsetHeight;
          }
        }

        return hei;
        /* console.log(this.$refs.cont.offsetHeight);
         console.log(this.$refs.cont.children[0].offsetHeight);*/
      },
      get_wb_hei: function (items) {
        let i;
        let hei = 0;
        for (i = 0; i < items.length; i++) {
          // hei += Math.round(items[i].hei);
          hei += items[i].hei;
        }
        return hei;
      },
      get_scroll_items: function (scrollDis, cursor) {
        /* eslint camelcase: 0*/
        // 后期这部分操作可以用worker去做
        let i;
        let j;
        const len = this.list_all.length;
        let idx = '';
        let arr_all_top = [];
        let arr_all_bottom = [];
        let arr = [];
        let diffArr = [];
        let n_top = 0;
        let n_bottom = 0;
        let dis_top = 0;
        let dis_bottom = 0;
        // 找到检索的起始位置
        for (i = 0; i < len; i++) {
          if ((cursor === 'since' && this.since === this.list_all[i].feed_id) ||
            (cursor === 'max' && this.max === this.list_all[i].feed_id)) {
            idx = i;
            break;
          }
        }
        /* if (len - idx <= 10) {
         // 坐标位置往后仅仅剩下不足20条数据,则继续储备数据{
         this.load_more(this.feed_url + '&max_id=' + this.max_id);
         }*/
        // 检测scrollDis的距离是从since开始的多少条微博的高度
        if (cursor === 'max') {
          const idx_since = idx + 1 - this.list_cur.length;
          for (i = idx_since; i < len; i++) {
            if (dis_top + this.list_all[i].hei <= scrollDis) {
              // list_cur顶部第一条开始计算,总共滚动了n_top条微博高度;
              // 向下滚时上面需要减掉的微博条数
              dis_top += this.list_all[i].hei;
              n_top++;
            } else {
              break;
            }
          }
          for (j = idx + 1; j < len; j++) {
            if (dis_bottom + this.list_all[j].hei <= scrollDis) {
              // 从max后面的一条开始计算,总共滚动了n_bottom条微博高度;
              // 向下滚时下面需要增加的微博条数
              dis_bottom += this.list_all[j].hei;
              n_bottom++;
            } else {
              /* if (dis_bottom + this.list_all[j].hei !== scrollDis) {
               n_bottom++;
               }*/
              break;
            }
          }
          // 循环结束了,dis_bottom + this.list_all[j].hei 仍然小于scrollDis,说明list_all里的微博不够 return ''
          if (this.list_all[j] && dis_bottom + this.list_all[j].hei >= scrollDis
            && this.list_all[idx + 1 + n_bottom]) {
            // 避免直接拖动滚动条,滚动高度过高,直接截取倒数this.count条
            // arr 下面需要增加的微博列表
            // difArr 上面需要减掉的微博列表(用来计算上面paddingtop撑起高度)
            arr_all_bottom = this.list_all.slice(idx + 1, idx + 1 + n_bottom);
            arr = this.list_all.slice(n_bottom > this.count ?
              idx + 1 + n_bottom - this.count : idx + 1, idx + 1 + n_bottom);
            arr_all_top = this.list_all.slice(idx_since, idx_since + n_top);
            diffArr = n_top > this.list_cur.length ? this.list_cur :
              this.list_all.slice(idx_since, idx_since + n_top);
            /* scrollWbHei = this.get_wb_hei(arr);
             padTop = dis - scrollWbHei;*/
            return {
              /* n_top: n_top,
               n_bottom: n_bottom,
               dis_top: dis_top,
               dis_bottom: dis_bottom,*/
              add_wb_list: arr,
              wb_list_top: arr_all_top,
              wb_list_bottom: arr_all_bottom,
              diff_wb_list: diffArr,
            };
          }
        }
        // 检查scrollDis的距离是从max往前的多少条微博的高度
        if (cursor === 'since' && this.list_all[idx - 1]) {
          const idx_max = idx - 1 + this.list_cur.length;
          for (i = idx_max; i >= 0; i--) {
            if (dis_bottom + this.list_all[i].hei <= scrollDis) {
              // 从max那条开始算,总共滚动了n_bottom条微博高度;
              // 向上滚时下面需要减掉的微博条数
              dis_bottom += this.list_all[i].hei;
              n_bottom++;
            } else {
              break;
            }
          }
          for (j = idx - 1; j >= 0; j--) {
            if (dis_top + this.list_all[j].hei <= scrollDis) {
              // 从since的前一条开始算,总共滚动了n_top条微博高度;
              // 向上滚时下面需要减掉的微博条数
              dis_top += this.list_all[j].hei;
              n_top++;
            } else {
              /* if (dis_top + this.list_all[j].hei !== scrollDis) {
               n_top++;
               }*/
              break;
            }
          }
          // if (this.list_all[j] && dis_top + this.list_all[j].hei >= scrollDis) {
          // 避免直接拖动滚动条,滚动高度过高,直接截取this.count条
          // arr 上面需要增加的微博列表
          // diffArr 下面需要减掉的微博列表(计算下面paddingbottom需要撑起高度)
          const start = Math.max(idx - n_top, 0);
          arr_all_top = this.list_all.slice(start, idx);
          arr_all_bottom = this.list_all.slice(Math.max(idx_max + 1 - n_bottom, 0), idx_max + 1);
          if (idx - n_top <= 0) {
            arr = this.list_all.slice(0, this.count);
            diffArr = this.list_cur;
          } else {
            arr = this.list_all.slice(start, n_top > this.count ? start + this.count : idx);
            diffArr = n_bottom > this.list_cur.length ? this.list_cur :
              this.list_all.slice(Math.max(idx_max + 1 - n_bottom, 0), idx_max + 1);
          }
          return {
            /* n_top: n_top,
             n_bottom: n_bottom,
             dis_top: dis_top,
             dis_bottom: dis_bottom,*/
            add_wb_list: arr,
            wb_list_top: arr_all_top,
            wb_list_bottom: arr_all_bottom,
            diff_wb_list: diffArr,
          };
          // }
        }
        return '';
      },
      to_rem: function (hei) {
        // return (hei / 16) + 'rem';
        return Math.ceil(hei) + 'px';
      },
      scrolling: function () {
        const self = this;
        if (self.is_scrolling === true) {
          return;
        }
        self.is_scrolling = true;
        setTimeout(function () {
          self.is_scrolling = false;
          const curScrollTop = document.body.scrollTop;
          if (self.padding_top === 0 && curScrollTop < self.first_scroll) {
            return;
          }
          const scrollDis = curScrollTop - self.first_scroll - self.last_scrolltop;
          if (scrollDis > 0 && curScrollTop - self.last_scrolltop > 0) {
            /* alert(scrollDis + ' ' + curScrollTop + ' ' + self.last_scrolltop
             + ' ' + self.is_scrolling + ' ' + self.is_request);*/
            // 向下滚动
            if (Math.abs(scrollDis) >= self.get_item_H('start', 1)) {
              // 滚动高度超出1条微博
              const scrollInfo = self.get_scroll_items(scrollDis, 'max');
              if (typeof scrollInfo === 'object') {
                if (scrollInfo.wb_list_top.length > 0 && scrollInfo.wb_list_bottom.length > 0) {
                  self.padding_top += self.get_wb_hei(scrollInfo.wb_list_top);
                  if (self.padding_bottom > self.get_wb_hei(scrollInfo.wb_list_bottom)) {
                    self.padding_bottom -= self.get_wb_hei(scrollInfo.wb_list_bottom);
                  } else {
                    self.padding_bottom = 0;
                  }
                  const newlist = self.list_cur.slice(scrollInfo.diff_wb_list.length);
                  self.list_cur = newlist.concat(scrollInfo.add_wb_list);
                  self.max = self.list_cur[self.list_cur.length - 1].feed_id;
                  // console.log('++++++++++' + self.max);
                  self.since = self.list_cur[0].feed_id;
                  // self.last_scrolltop += scrollInfo.dis;
                  self.last_scrolltop += self.get_wb_hei(scrollInfo.wb_list_top);
                  self.is_loading = false;
                }
              } else {
                self.load_more(self.feed_url + 'max_id=' + self.max_id);
                self.is_loading = true;
              }
            }
          } else if (scrollDis < 0 && curScrollTop - (self.last_scrolltop + self.first_scroll) < 0) {
            // 向上滚动
            if (Math.abs(scrollDis) >= self.get_item_H('end', 1)) {
              const scrollUpInfo = self.get_scroll_items(Math.abs(scrollDis), 'since');
              if (typeof scrollUpInfo === 'object') {
                if (scrollUpInfo.wb_list_top.length > 0 && scrollUpInfo.wb_list_bottom.length > 0) {
                  self.padding_bottom += self.get_wb_hei(scrollUpInfo.wb_list_bottom);
                  if (self.padding_top > self.get_wb_hei(scrollUpInfo.wb_list_top)) {
                    self.padding_top -= self.get_wb_hei(scrollUpInfo.wb_list_top);
                  } else {
                    self.padding_top = 0;
                  }
                  const len = self.list_cur.length;
                  const newlist1 = self.list_cur.slice(0, len - scrollUpInfo.diff_wb_list.length);
                  self.list_cur = scrollUpInfo.add_wb_list.concat(newlist1);
                  self.max = self.list_cur[self.list_cur.length - 1].feed_id;
                  // console.log('+++++++++++++' + self.max);
                  self.since = self.list_cur[0].feed_id;
                  if (curScrollTop === 0) {
                    self.last_scrolltop = 0;
                  } else {
                    self.last_scrolltop -= self.get_wb_hei(scrollUpInfo.wb_list_top);
                  }
                }
              }
            }
          }
        }, 100);
      },
    }
  };

</script>

<style rel="stylesheet/scss" type="text/css" lang="scss" scoped>
  .main-wrap {
    margin: 0rem 0 0 0;
  }

  .pannelwrap {
    width:100%;
    overflow: hidden;
    margin-bottom: 1rem;
  }

  .loading {
    color: #aaa;
    font-size: 1rem;
    text-align: center;
    line-height: 5rem;
  }

  .temporary {
    opacity: 0;
    position: absolute;
    top:0;
    left:0;
    z-index: -99;
    width:100%;
    overflow: hidden;
  }

  /*.wrapitem {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    overflow: hidden;
  }*/
  .wb-item-wrap {
    overflow: hidden;
  }

  .wb-item-wrap .card9.card {
    margin: 0;
  }

  .wb-item-wrap .wb-item {
    /*padding-bottom: 0.5625rem;*/
  }
  .cursor{
    cursor: pointer;
  }
  .icon_refresh {
    position: fixed;
    bottom: 3rem;
    right: 1rem;
    width: 3rem;
    height: 3rem;
    background-color: rgba(133, 136, 141, 0.5);
    border-radius: 5px;
    z-index: 9;
    /* box-shadow: 1px 1px 5px rgba(0,0,0,.3) inset; */
    background-image: url(../assets/img/refrash.png);
    background-size: 70%;
    background-repeat: no-repeat;
    background-position: 50% 50%;
  }
  .wb-item{
    margin-bottom: 0.5625rem;
  }
</style>

