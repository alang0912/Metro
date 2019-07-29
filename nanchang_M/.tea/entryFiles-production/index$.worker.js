if(!self.__appxInited) {
self.__appxInited = 1;


require('./config$');
require('./importScripts$');

var AFAppX = self.AFAppX;
self.getCurrentPages = AFAppX.getCurrentPages;
self.getApp = AFAppX.getApp;
self.Page = AFAppX.Page;
self.App = AFAppX.App;
self.my = AFAppX.bridge || AFAppX.abridge;
self.abridge = self.my;
self.Component = AFAppX.WorkerComponent || function(){};
self.$global = AFAppX.$global;


function success() {
require('../../app');
require('../../pages/indexM/indexM');
require('../../pages/searchM/searchM');
require('../../pages/lineImage/lineImage');
require('../../pages/lineDetail/lineDetail');
require('../../pages/web-view/web-view');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
}