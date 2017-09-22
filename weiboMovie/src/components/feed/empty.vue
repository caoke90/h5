<template>
  <div class="wb-item-wrap">
    <div class="wb-item">
      <div class="card m-panel card9 f-weibo">
        <div class="card-wrap">
          <header class="weibo-top m-box">
            <div class="m-avatar-box">
              <a href="javascript:;" class="m-img-box anim-load"> </a>
            </div>
            <div class="m-box-dir m-box-col">
              <div class="m-text-box">
                <h4 class="m-text-cut f-r">
                  <!--<span class="time empty-bg width-min inline-block anim-load"></span>-->
                </h4>
                <h3 class="m-text-cut empty-bg width-min inline-block anim-load"></h3>
              </div>
            </div>
          </header>
          <article class="weibo-main">
            <div class="weibo-og">
              <p class="empty-bg txt-margin anim-load"></p>
              <p class="empty-bg txt-margin anim-load"></p>
              <p class="empty-bg txt-margin anim-load"></p>
              <p class="empty-bg txt-margin anim-load"></p>
              <p class="empty-bg txt-margin anim-load"></p>
            </div>
          </article>
          <footer class="f-footer-ctrl">
            <div class="m-diy-btn"><i class="m-font m-font-forward"></i><h4>转发</h4></div>
            <div class="m-diy-btn"><i class="m-font m-font-comment"></i><h4>评论</h4></div>
            <div class="m-diy-btn"><i class="m-icon m-icon-like"></i><h4>赞</h4></div>
            <aside><i class="f-more">...</i></aside>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>
<style rel="stylesheet/scss" type="text/css" lang="scss">
  .wb-item-wrap .card9.card{
    margin: 0;
  }
  .f-weibo .m-img-box{
    background-color: #e6e6e6;
  }
  .empty-bg{
    width: 100%;

    height: 0.375rem;
  }
  .inline-block{
    display: inline-block;
  }
  .txt-margin{
    margin: 0 0 1rem 0;
  }
  .width-min{
    width: 4.375rem;
  }
  .anim-load{
    animation: load 0.5s ease-out;
    -moz-animation: load 0.5s ease-out;	/* Firefox */
    -webkit-animation: load 0.5s ease-out;	/* Safari 和 Chrome */
    -o-animation: load 0.5s ease-out;	/* Opera */
  }
  @keyframes load
  {
    0%   {background-color: #ffffff; }
    100% {background-color: #e6e6e6;}
  }
  @-moz-keyframes load /* Firefox */
  {
    0%   {background-color: #ffffff; }
    100% {background-color: #e6e6e6;}
  }

  @-webkit-keyframes load /* Safari 和 Chrome */
  {
    0%   {background-color: #ffffff; }
    100% {background-color: #e6e6e6;}
  }
  .f-more{
    letter-spacing: 0.1rem;
  }
  .f-weibo .f-card-title{
    margin: -1rem -1rem 0.5rem -1rem;
    padding: 0 1rem;
    border-width: 0;
  }
  .f-weibo .m-avatar-box .m-img-box .m-icon{
    font-size:14px;
  }
  .iosx3 .card9 .f-card-title{
    border-width: 0;
  }
  .iosx2 .card9 .f-card-title{
    border-width: 0;
  }
  .f-weibo.card9{
    border-bottom: 1px solid #e6e6e6;
  }
  .iosx3 .f-weibo.card9{
    border-bottom: 0.35714px solid #e6e6e6;
  }
  .iosx2 .f-weibo.card9{
    border-bottom: 0.5px solid #e6e6e6;
  }
  .f-weibo.card9 > .card-wrap{
    margin-left: 1rem;
    margin-right: 1rem;
  }
  .f-weibo.card9.m-panel{
    border-top-width: 0px;
  }
  .f-weibo.card .card-wrap .f-col-wrap{
    padding: 0 0.9375rem;
  }
  .f-weibo.card9 .weibo-main .weibo-text{
    word-break: break-all;
    text-align: justify;
  }
  .f-weibo.card9 .m-box-col{
    min-width: 0;
  }
  .f-weibo.card9 .weibo-top {
    padding: 0 0 0 0.25rem;
  }
  .f-weibo.card9 .weibo-top .m-box-col .m-icon{
    margin-left:3px;
  }
  .f-weibo.card9 .weibo-main .weibo-og {
    padding: 0.75rem 0 0.75rem 0.25rem;
  }
  .f-weibo.card9 .weibo-main .media-b{
    margin: 0.625rem 0rem -0.375rem
  }
  .f-weibo.card9 .weibo-main .media-b .m-auto-list {
    margin: 0 0 -0.25rem;
  }
  .f-weibo .m-avatar-box .m-img-box{
    width: 1.625rem;
    height: 1.625rem;
    /*margin-right: 0.5rem;*/
  }
  .f-weibo .m-avatar-box .m-img-box img{
    width: 1.625rem;
    height: 1.625rem;
    margin-right: 0.5rem;
  }
  .f-weibo .weibo-top .m-text-box{
    margin: 0.15rem 0 0.15rem 0.5rem;
  }
  .f-weibo .f-r{
    float: right;
  }
  .f-weibo .weibo-main .weibo-og {
    font-size: 0.9375rem;
  }
  .f-weibo .weibo-rp .weibo-text{
    font-size: 0.9375rem;
  }
  .f-weibo .f-bg-img{
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .f-footer-ctrl {
    border-top-width: 0px;
    height: 1.1rem;
    padding: 0.5rem 0 0.75rem 0.25rem;
  }
  .f-footer-ctrl .m-diy-btn {
    color: #939393;
    height: 100%;
    width: 5rem;
    float: left;
  }
  .f-footer-ctrl .m-diy-btn .m-icon{
    font-size:16px;
  }
  .f-footer-ctrl aside{
    float: right;
    color: #939393;
  }
  .f-footer-ctrl .m-font {
    font-size: 1rem;
    vertical-align: middle;
  }
  .f-footer-ctrl .m-diy-btn h4 {
    font-size: 0.8125rem;
    display: inline-block;
    margin-top: 0;
    margin-left: 0.25rem;
  }
</style>

