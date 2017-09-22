module.exports = (function () {
  const fullScreenApi = {
    supportsFullScreen: false,
    isFullScreen: function () {
      return false;
    },
    requestFullScreen: function () {
    },
    cancelFullScreen: function () {
    },
    fullScreenEventName: '',
    prefix: ''
  };
  const browserPrefixes = 'webkit moz o ms khtml'.split(' ');
  // check for native support
  if (typeof document.cancelFullScreen !== 'undefined') {
    fullScreenApi.supportsFullScreen = true;
  } else if (typeof (Element.webkitEnterFullscreen) !== 'undefined') {
    fullScreenApi.supportsFullScreen = true;
  } else {
    // check for fullscreen support by vendor prefix
    let i = 0;
    let il;
    for (il = browserPrefixes.length; i < il; i++) {
      fullScreenApi.prefix = browserPrefixes[i];
      if (typeof document[fullScreenApi.prefix + 'CancelFullScreen'] !== 'undefined') {
        fullScreenApi.supportsFullScreen = true;
        break;
      }
    }
  }
  // update methods to do something useful
  // if (fullScreenApi.supportsFullScreen) {
  fullScreenApi.fullScreenEventName = fullScreenApi.prefix + 'fullscreenchange';
  fullScreenApi.isFullScreen = function () {
    switch (this.prefix) {
      case '':
        return document.fullScreen;
      case 'webkit':
        return document.webkitIsFullScreen;
      default:
        return document[this.prefix + 'FullScreen'];
    }
  };
  fullScreenApi.requestFullScreen = function (el) {
    if (typeof (Element.webkitEnterFullscreen) !== 'undefined') {
      return Element.webkitEnterFullscreen();
    }
    return (this.prefix === '') ? el.requestFullScreen() :
      el[this.prefix + 'RequestFullScreen']();
  };
  fullScreenApi.cancelFullScreen = function () {
    return (this.prefix === '') ? document.cancelFullScreen() :
      document[this.prefix + 'CancelFullScreen']();
  };
  return fullScreenApi;
}());
