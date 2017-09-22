import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const Main =require('../views/Main');

const routes = [
  {
    path: '*',
    component: Main
  }];


function scrollBehavior(to, from, savedPosition) {
  if (savedPosition) {
    return savedPosition;
  }
  return { x: 0, y: 0 };
}
export default new Router({
  mode: 'history',
  scrollBehavior,
  routes,
});
