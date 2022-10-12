## 什么是promise
    1 promise是一个构造函数，所以通过new Promise（）可以实例化出来一个Promise对象。
    2 new Promise（）时，接受一个函数作为参数，且这个函数，有两个参数，分别是resolve，reject，
    3 每个被实例化出来的promise实例，都有.then()和.catch()两个方法。且这两个方法的调用支持链式操作。
## 基本用法
    const promise = new Promise((resolve, reject) => {
	setTimeout(() => {
		if (/* 成功 */) {
			resolve(res)
		} else {
			reject(err)
		}
	}, 100)
})
## 接收返回的结果
    promise.then((res) => {
        console.log(res)
    }).catch((err) => {
        console.log(err)
    })
## .then()函数
    1.then()是添加在Promise的原型上的。即Promise.prototype.then(), 故所有Promise实例都存在.then()方法
    2 then()可以进行链式操作 即promise.then().then().then()，then的回调函数将会按照次序调用。
    3 第一个函数是在状态变为Resolved的时候才会执行(我们下文中统称为.then的resolve回调)，并且参数是Promise对象resolve(res)时的值。第二个函数是在状态变为Rejected的时候才会执行(我们下文统称为.then的reject回调)，后面我们会说哪几种情况下，状态会变成Rejected。
    4 Promise会存在值穿透的情况，当我们then()的两个参数不为函数时，会穿透到下一个then()里面，如果下一个then()参数也不是函数，则会继续向下穿透
    结论：每个.then函数都会返回默认返回一个resolved状态的Promise对象
    2 这个Promise对象默认resolve了then的resolve回调函数的返回值
## .catch（）函数
作用：
    用来指定发生错误时的回调函数，也就是捕获异步操作  发生的错误。
特点：
    1 .catch（）会指定一个参数作为错误发生时的回调，故catch（err）=>{}的参数会在Promise状态变更为rejected是被触发。
    2 .then(null, (err) => {})的第二个参数，也是在Promise状态变更为Rejected时被触发。
    3 代码抛出错误和reject（）函数执行都会让Promise对象的状态转变为Rejected，所以reject（）的本质，其实就是抛出一个错误。
结论：
    .catch()可以通过放到操作链的最底部而捕捉到任意地方（指的是Promise内）的错误。而then()的reject回调，只能捕捉到这个.then()执行之前的错误，当前执行的then的resolve回调内的错误无法捕捉到，后面再执行的代码所抛出的错误也无法捕捉到。并且.catch的写法，代码层面也更为清晰

    