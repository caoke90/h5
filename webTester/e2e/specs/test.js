// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage
var arr=[ { path: '/',
  domain: '.weibo.cn',
  name: 'SUB',
  httpOnly: true,
  expiry: 1533299379,
  hCode: 82464,
  secure: false,
  value: '_2A250h2d-DeRhGeNJ4lsS9SfJwj-IHXVXiAk2rDV6PUJbkdANLVPEkW0ZEq28Kvr5HWWmrMJTXeITo5HSJQ..',
  class: 'org.openqa.selenium.Cookie' },
  { path: '/',
    domain: '.weibo.cn',
    name: '_T_WM',
    httpOnly: true,
    expiry: 1504355374,
    hCode: 90331008,
    secure: false,
    value: '360af03afb8d0695fcc811c41012fb98',
    class: 'org.openqa.selenium.Cookie' },
  { path: '/',
    domain: '.weibo.cn',
    name: 'SSOLoginState',
    httpOnly: false,
    hCode: -744169993,
    secure: false,
    value: '1501763374',
    class: 'org.openqa.selenium.Cookie' },
  { path: '/',
    domain: '.weibo.cn',
    name: 'M_WEIBOCN_PARAMS',
    httpOnly: true,
    expiry: 1501763980,
    hCode: -696829372,
    secure: false,
    value: 'luicode%3D20000174%26uicode%3D20000174%26featurecode%3D20000320%26fid%3Dhotword',
    class: 'org.openqa.selenium.Cookie' },
  { path: '/',
    domain: '.weibo.cn',
    name: 'SCF',
    httpOnly: true,
    expiry: 1817123379,
    hCode: 81910,
    secure: false,
    value: 'ArMoRs0OWkT4xskiwJdZ5WzQCoHyUMEPGmOqvtpq8LkARzsM8mNzEUjN7-FGKgAFjhTUWX4v54t0dH3HMtTDiYQ.',
    class: 'org.openqa.selenium.Cookie' },
  { path: '/',
    domain: '.weibo.cn',
    name: 'SUHB',
    httpOnly: false,
    expiry: 1533299379,
    hCode: 2556636,
    secure: false,
    value: '0V5lCN6GTMD6on',
    class: 'org.openqa.selenium.Cookie' } ]

var obj={
  'qq':function (browser) {
    browser.url("https://qzone.qq.com/")
    browser.pause(3000)

    browser.frame(0,function (d) {
      console.log(d)
    })
    browser.pause(1000)
    browser.click('#img_out_914890674')
    browser.pause(1000)
    browser.click("#\\24 1_substitutor_content")
  },
  //登录测试
  'url login': function (browser) {

    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    browser.url("https://m.weibo.cn/")
    browser.pause(2000)

    browser.click("body > div > div > a.btn.btnWhite")
    browser.pause(2000)
    browser.setValue("#loginName","15101175662")
    browser.setValue("#loginPassword","907167")

    browser.click("#loginAction")


    browser.waitForElementVisible('body', 500)
    browser.waitForElementVisible('#box', 500)
    browser.waitForElementVisible('.card9', 500)
    browser.end()

  }
}

module.exports = obj;
