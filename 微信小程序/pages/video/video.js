// pages/video/video.js
import request from '../../utils/request'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        videoGroupList:[],
        navId:'',
        videoList:[],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        // 获取导航栏数据
        this.getVideoGroupListData();
    },
    async getVideoGroupListData(){
        let videoGroupListData = await request('/video/group/list')
        this.setData({
            videoGroupList:videoGroupListData.data.slice(0,13),
            navId:videoGroupListData.data[0].id
        })
        this.getVideoList(this.data.navId)
    },
    // 获取视频列表数据
    async getVideoList(navId){
        if(!navId){
            return ;
        }
        let videoListData=await request('/video/group',{id:navId});
        // wx.hideloading()
        let index = 0;
        let videoList=videoListData.datas&&videoListData.datas.map(item=>{ 
            item.id = index++;
            return item;})
            this.setData({
                videoList,
                isTriggered: false // 关闭下拉刷新
              })
    },
    // 切换导航回调
    changeNav(event){
        // let navId = event.currentTarget.id; // 通过id向event传参的时候如果传的是number会自动转换成string
        let navId = event.currentTarget.dataset.id;
        this.setData({
          navId: navId
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