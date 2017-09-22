import throttle from 'lodash/throttle';

const opt = {
  distance: window.innerHeight * 0.618,
  gapTime: 300,
  visibleHeight: 0,
  firstCheck: false,
  funcExpression: '',
  scrollTarget: null,
  scrollListener: null,
  disabled: false,
};

function getScrollEventTarget(element) {
  let currentNode = element;
  while (currentNode && currentNode.tagName !== 'HTML'
    && currentNode.tagName !== 'BODY' && currentNode.nodeType === 1) {
    const overflowY = document.defaultView.getComputedStyle(currentNode).overflowY;
    if (overflowY === 'scroll' || overflowY === 'auto') {
      return currentNode;
    }
    currentNode = currentNode.parentNode;
  }
  return window;
}

function getVisibleHeight(target) {
  // 可见区域的高度
  if (target === window) {
    return target.innerHeight;
  }
  return target.clientHeight;
}

function scroll(element) {
  const curDistance = element.el.getBoundingClientRect().bottom - opt.visibleHeight;
  if (curDistance < opt.distance && !opt.disabled) {
    element.vm[element.epr].call();
  }
}

function check(element) {
  return element;
  // if (opt.firstCheck) {
  //   // 执行一个函数……
  //   // element.vm[element.epr]();
  // }
}

// 无限加载
module.exports = {
  name: 'inf-scroll',
  bind(el, binding, vnode) {
    const element = {
      el,
      vm: vnode.context,
      epr: binding.expression,
    };

    opt.gapTime = el.getAttribute('gap-time') || opt.gapTime;
    opt.distance = el.getAttribute('distance') || opt.distance;
    opt.disabled = el.getAttribute('disabled') || opt.disabled;
    opt.firstCheck = el.getAttribute('first-check') || opt.firstCheck;

    if (!element.epr) {
      throw new Error('滚到底后要做什么呢？');
    } else if (!{}.hasOwnProperty.call(element.vm, element.epr)) {
      throw new Error('找不到所指定的method');
    } else {
      // 没有首次检查则直接执行函数
      if (!el.getAttribute('first-check')) {
        element.vm[element.epr].call();
      }

      element.vm.$on('hook:mounted', () => {
        element.vm.$nextTick(() => {
          check(element);
          opt.scrollTarget = getScrollEventTarget(el);
          opt.visibleHeight = getVisibleHeight(opt.scrollTarget) || opt.visibleHeight;
          opt.scrollListener = throttle(() => {
            scroll(element);
          }, opt.gapTime);
          opt.scrollTarget.addEventListener('scroll', opt.scrollListener);
        });
      });
    }
  },
  unbind() {
    opt.scrollTarget.removeEventListener('scroll', opt.scrollListener);
  },
};
