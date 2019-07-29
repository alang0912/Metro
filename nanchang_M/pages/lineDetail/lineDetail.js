var app = getApp();
Page({
  data: {
    ID:'',
    Direct:0,
    LineDetail:{},
    Stations:[]
  },
  onLoad(query) {
    // console.log(query.id)
    this.setData({
      ID: query.id
    })
    var currentCityData = my.getStorageSync({ key: 'currentCity' }).data;
    if(currentCityData!=undefined){
      my.setNavigationBar({
        title:app.CityName+"地铁",
        backgroundColor: currentCityData.titleBarColor
      });
    }
  },
  onShow() {
    my.showLoading();
    this.requestLineDetail();
    var currentCityData = my.getStorageSync({ key: 'currentCity' }).data;
    if(currentCityData!=undefined){
      my.setNavigationBar({
        title:app.CityName+"地铁",
        backgroundColor: currentCityData.titleBarColor
      });
    }
  },

  changeForward:function(){
    this.setData({
      Direct:0
    })
    this.requestLineDetail();
  },

  changeReverse:function(){
    this.setData({
      Direct:1
    })
    this.requestLineDetail();
  },

  requestLineDetail:function(){
    var self = this;
    var id = this.data.ID;
    var direct = this.data.Direct;
    my.request({
      url: 'https://docker.jndesign.top/api/subway/detail?id='+ id + "&direct=" + direct,
      method: 'GET',
      data: {},
      dataType: 'json',
      success: function(res) {
        // console.log(res, 'success');
        self.setData({
          LineDetail:res.data.data.line,
          Stations:res.data.data.stations
        })
      },
      fail: function(res) {
        self.RecvError(res);
        // console.log(res, 'fail');
      },
      complete: function(res) {
        my.hideLoading();
        // console.log(res, 'complete');
      }
    });
  }
});
