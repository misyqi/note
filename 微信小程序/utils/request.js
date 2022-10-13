//发送ajax请求
/*
1.封装功能函数
   1，功能点明确
   2，函数内部应该保留固定代码
   3，将动态的数据抽取成形参，由使用者根据自身的情况动态的传入实参
2，封装功能组件
   1，功能点明确
   2，组件内部保留静态的代码
   3，将动态的数据抽取成props参数，又使用者根据自身情况以标签的形式传入props数据
   */
  import config from './config'
  export default (url,data,method='GET')=>{
      return new Promise((resolve,reject)=>{
        wx.request({
            url : config.host + url ,
            data,
            method,
            header:{
                cookie:wx.setStorageSync('cookies')?wx.setStorageSync('cookies').find(item=>item.indexof('MUSIC_U')!==-1):''
            },
            success:(res)=>{
                // console.log("请求成功",data.isLogin)
                // if(data.isLogin){
                //     // 将用户的cooki存入本地
                //     wx.setStorage({
                //         key:'cookies',
                //         data:res.cookies
                //     })
                // }
                resolve(res.data)
            },
        fail: (err) =>{
                console.log("请求失败",err)
                reject(err)
            }
          })
      })
  } 