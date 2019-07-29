Page({
  data: {
    URL:""
  },
  onLoad(requery) {
    console.log("requery",requery)
    this.setData({
      URL:requery.url
    })
  },
   onmessage(e){
    console.log(e)
  }
});
