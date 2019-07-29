App({
  onLaunch(options) {
    // 第一次打开
    // options.query == {number:1}
    // console.info('App onLaunch');
  },
  onShow(options) {
    // 从后台被 scheme 重新打开
    // options.query == {number:1}
  },
  CityNum:2,   //城市代号
  CityName:"武汉",
  api_v:"2.0.0"
});
