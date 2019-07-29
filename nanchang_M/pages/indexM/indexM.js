var app = getApp();

Page({
  data: {
    Linelist:[],
    Map:"",
    TitleColor:"",    //导航栏颜色
    TitleBarImg:''    ////导航栏图片
  },
  onLoad() {
    this.getLinelist();
  },
  onShow() {
    // my.showLoading();
    // this.getLinelist();
    var currentCityData = my.getStorageSync({ key: 'currentCity' }).data;
    if(currentCityData!=undefined){
      my.setNavigationBar({
        backgroundColor: currentCityData.titleBarColor
      });
    }
  },

  getLinelist:function(){
    this.setData({
      Linelist:[],
      Map:''
    })
    var citynum = app.CityNum;
    var API = app.api_v;
    var self = this;
    my.request({
      url: 'https://docker.jndesign.top/api/subway/list?city=' + citynum + '&api_v=' + API,
      method: 'GET',
      data: {},
      dataType: 'json',
      success: function(res) {
        console.log(res, 'success');
        self.setData({
          Linelist:res.data.data.lines,
          Map:res.data.data.map,
          TitleBarImg:res.data.data.titleBarImg,
        });
        my.setNavigationBar({
          backgroundColor: res.data.data.titleBarColor,
        });
        my.setStorageSync({
          key: 'currentCity',
          data: {
            cityName: '武汉',
            cityNum: 2,
            titleBarColor: res.data.data.titleBarColor,
          }
        });
      },
      fail: function(res) {
        // self.RecvError(res);
        console.log(res, 'fail');
      },
      complete: function(res) {
        my.hideLoading();
        // console.log(res, 'complete');
      }
    });
  },

  //获取当前位置
  getLocation:function(){
    my.getLocation({
      success(res) {
        my.hideLoading();
        console.log(res)
        /* that对象为Page可以设置数据刷新界面
        that.setData({
          hasLocation: true,
          location: formatLocation(res.longitude, res.latitude)
        })
        */
        my.openLocation({
          longitude: res.longitude,
          latitude: res.latitude,
          name: app.CityName+'地铁',
          address: '我的位置',
        });
      },
      fail() {
        my.hideLoading();
        my.alert({ title: '定位失败' });
      },
    })
  },

  searchLine:function(){
    my.navigateTo({
      url: '/pages/searchM/searchM'
    })
  },

  previewImage:function(){
    var arr = [];
    arr.push(this.data.Map);
    my.previewImage({
      current: 0, // 当前显示图片的 http 链接
      urls: arr,
      sucess(res){
        console.log("成功",res)
      },
      fail(res){
        console.log("失败",res)
      },
    });
  },

  goToLineImage:function(){
    my.navigateTo({
      url: '/pages/lineImage/lineImage?imageurl=' + this.data.Map
    })
  },

  goToDetail:function(e){
    // console.log(e.target.dataset.id)
    var id = e.target.dataset.id;
    my.navigateTo({
      url: '/pages/lineDetail/lineDetail?id=' + id
    })
  },

  goToAD:function(e){
    console.log(e.target.dataset.link)
    var url = e.target.dataset.link;
    my.navigateTo({
      url: '/pages/web-view/web-view?url=' + url
    })
  }
});
