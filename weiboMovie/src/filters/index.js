import Vue from 'vue';
function install() {
  Vue.filter('fromNow', require('./fromNow'));
  Vue.filter('star', require('./star'));
}

module.exports = install;
