import request from '../../utils/request'

// pages/personal/personal.js
let moveY=0;
let startY=0;
let moveDistence = 0;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        coverTransform:'traslateY(0)',
        userInfo:{},
        recentPlayList:{},
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad:function(options) {
       let userInfo= wx.getStorageSync('userInfo');
       console.log(userInfo)
       if(userInfo){
           this.setData({
               userInfo:JSON.parse(userInfo)
           })
           this.getUserRecentPlayList(this.data.userInfo.userId)
       }
    },
    async getUserRecentPlayList(userId){
        let recentPlayListData = await request('/user/record', {uid: userId, type: 0});
        let index = 0;
        let recentPlayList = recentPlayListData.allData.splice(0, 10).map(item => {
          item.id = index++;
          return item;
        })
        this.setData({
          recentPlayList
        })
      },
    handleTouchStart(event){
        startY = event.touches[0].clientY;
    },
    handleTouchMove(event){
        moveY = event.touches[0].clientY;
        moveDistence = moveY - startY;
        if(moveDistence<0){
            return;
        }
        if(moveDistence>=80){
             moveDistence=80;
        }
        this.setData({
            coverTransform:`traslateY(${moveDistence}rpx)`
        })
    },
    handleTouchEnd(){
        this.setData({
            coverTransform:`tralateY(0rpx)`
        })
    },
    toLogin(){
        wx.navigateTo({
            url:'/pages/login/login'
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})