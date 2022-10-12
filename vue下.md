# vue下

## 全局事件总线 消息的订阅与发布

### 3全局事件总线

- -种可以在任意组件间通信的方式，本质上就是一个对象，它必须满足以下条件

	- 1.所有的组件对象都必须能看见他
	- 2.这个对象必须能够使用$on $emit $off 方法去绑定、触发和解绑事件

- 使用步骤

	- 定义全局事件总线

		- 

	- 使用全局总线

		- a.接收数据: A组件想接收数据，则在A组件中给$bus 绑定自定义事件,事件的回调留在A组件自身this.$bus.$on('xxx',this.demo)
		- b.提供数据this.$bus.$emit('xxx',data)
		- 最好在befoDestroy钩子中，用$off()去解绑当前组件所用到的事件this.$bus.$off( 事件名)

### 消息订阅与发布

- 使用步骤

	- 1，安装pubsub：npm i pubsub-js
	- 2.引入：import pubsub from ‘pubsub-js’
	- 3.接受数据：A组件想接受数据，则在A组件中订阅消息，订阅的回调留在A组件自身
	- 4提供数据：pubsub.publish（‘xxx’，data）
	- 5最好beforeDestroy钩子中，使用pubsub.unsubscribe(pid)取消订阅
	- 
	- 

## $nextTick过渡与动画

### $nextTick

- this . $nextTick(回调函数)在下- -次DOM更新结束后执行其指定的回调什么时候用:当改变数据后，要基于更新后的新DOM进行某些操作时,要在nextTick 所指定的回调函数中执行

### 过渡与动画

### Vue封装的过度与动画:在插入、更新或移除DOM元素时,在合适的时候给元素添加样式类名

### 写法

### 准备好样式

- 

### 2.使佣<transition> 包裹要过度的元素,并配置name属性，此时需要将上面样式名的v换为name

### 3.要让页面一开始就显示动画，要添加appear

- 

### 4.备注:若有多个元索需要过度，则需要使用<transition-group> ，每个元素都要指定key值

- 

### 5.第三方动画库animate.css

- 

### 


## Vue中的Ajax配置代理 slot插槽

### Vue脚手架配置代理

- 下载axios库 npm install axios

	- 

- 方法一

	- 在vue.config.js中添加如下配置

		- 
		- 说明

			- 1.优点:配置简单,请求资源时直接发给前端(8080) 即可
			- 2.缺点:不能配置多个代理，不能灵活的控制请求是否走代理
			- 3.工作方式:若按照上述配置代理，当请求了前端不存在的资源时，才会将请求会转发给服务器(优先匹配前端资源)

- 方法二

	- 编写vue.config.js配置具体代理规则

		- 说明.

			- 1.优点:可以配置多个代理，可以灵活的控制请求是否走代理
			- 2.缺点:配置略微繁琐，请求资源时必须加前缀

		- 
		- 

### slot插槽

### <slot>插槽:让父组件可以向子组件指定位置插入html 结构,也是一种组件间通信的方式,盱父组件===>子组件

### 1.分类:默认插槽、貼插槽、作用域插槽

### 2.使用肪式

- a.默认插槽

	- 

- b.具名插槽

	- 父组件指明放入子组件的哪个插槽slot=" footer" ,如果是template 可以写成v-slot: footer
	- 

- c.作用域插槽

	- scope于父组件往子组件插槽放的html 结构接收子组件的数据
	- 理解:数据在组件的自身，但根据数据生成的结构需要组件的使用者来决定( games 数据在Category 组件中，但使用数据所遍历出来的结构由App组件决定)
	- 

## Vuex

### 概念

- 专门在vue中实现集中式状态（数据）管理的一个vue插件，对vue应用中多个组件的共享状态进行集中式的管理，也是一种组件间通讯的方式，且适用于任意组件间通讯

### 什么时候使用

- 1多个杜建依赖用一状态
- 2来自不同组件的行为需要变更同一状态

### 工作原理图

- 

### 案例

- 
- 

### 搭建vuex环境

- 1.下载安装
- 2.创建src/store/index.js改文件用于创建vuex中最为核心的store

	- 

- 在src/mian.js中创建vm时传入store配置顶

	- 

### 使用vuex编写

- 1.初始化数据state，配置actions、mutations ,操作文件store.js
- 2.组件中读取vuex中的数据$store.state. 数据
- 3.组件中修改vuex中的数据$store . dispatch( ' action中的方法名'，数据)或$store. commit( 'mutations中的方法名',数据)若没有网络请求或其他业务逻辑，组件中也可越过actions ，即不写dispatch ，直接编写commit
- 
- 

### getters配置顶

- 概念

	- 当state中的数据需要经过加工后再使用时，可以使用getters加工，相当与全局计算属性

- 在store.js中追加getters配置

	- 

### 四个map方法的使用

- mapstate方法：用于帮助映射state中的数据为计算属性

	- 

- mapgertters方法：用于帮助映射getters中的数据为计算属性

	- 

- mapactions方法：用于帮助生成与action是对话的方法，即包含$store.dispatch(xxx)的函数

	- 

- mapmutations方法：用于帮助生成与mutation是对话的方法，即包含$store.commit(xxx)的函数

	- 

- 注意

	- mapactions与mapmutations使用时，若需要传递参数需要：在模块绑定事件时传递好参数，否则参数是事件对象

		- 

### 模块化＋命名空间

- 1.目的：让代码更好的维护，让多种数据分类更加明确
- 2.修改store.js

	- 
	- 为了解决不同模块命名冲突的问题,将不同模块的namespaced: true之后在不同页面中引入getteractionsmutations时，需要加上所属的模块名

- 3.开启命名空间后，组件中读取state数据

	- 

- 4.开启命名空间后，组件中读取getters数据

	- 

- 5.开启命名空间后，组件中调用dispatch

	- 

- 6.开启命名空间后，组件中调用commit

	- 

