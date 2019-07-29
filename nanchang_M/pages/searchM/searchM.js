var app = getApp();

Page({
  data: {
    Searchlist: [{name:"aa"}],
    // CityNum: 1,   //城市代号
    InputValue:''
  },

  onLoad() {
    var currentCityData = my.getStorageSync({ key: 'currentCity' }).data;
    if(currentCityData!=undefined){
      my.setNavigationBar({
        title:app.CityName+"地铁",
        backgroundColor: currentCityData.titleBarColor
      });
    }
  },

  onShow(){
    var currentCityData = my.getStorageSync({ key: 'currentCity' }).data;
    if(currentCityData!=undefined){
      my.setNavigationBar({
        title:app.CityName+"地铁",
        backgroundColor: currentCityData.titleBarColor
      });
    }
  },

  getSearchResult:function(){   
    var citynum = app.CityNum;
    var keyword = this.data.InputValue;
    var self = this;
    my.request({
      url: 'https://docker.jndesign.top/api/subway/search?city=' + citynum + '&keyword=' + encodeURI(keyword),
      method: 'GET',
      data: {},
      dataType: 'json',
      success: function(res) {
        console.log(res, 'success');
        self.setData({
          Searchlist:res.data.data,
        })       
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

  getInputval:function(e){
    my.showLoading();
    // console.log(e.detail.value,"getInputval")
    this.setData({
      InputValue:e.detail.value
    })
    this.getSearchResult();
  },

  GotoIndex:function(){
    my.navigateBack({
      url: '/pages/indexM/indexM'
    })
  },
  gotoDetail:function(e){
    // console.log(e.target.dataset.id)
    var id = e.target.dataset.id;
    my.navigateTo({
      url: '/pages/lineDetail/lineDetail?id=' + id
    })
  }
});
