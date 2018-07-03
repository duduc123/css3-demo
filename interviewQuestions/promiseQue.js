function test(resolve, reject){
    var timeout = Math.random() * 2;
    setTimeout(function(){
        if(timeout < 1){
            resolve('200 OK');
        }else {
            reject('timeout in ' + timeout);
        }
    },timeout * 1000);
}
var p1 = new Promise(test);
var p2 = p1.then(function (result){
    console.log('sucess: '+result);
})
var p3 = p2.catch(function (reason){
    console.log(reason)
})

//  Promise对象可以串联起来，所以上述代码可以简化为
new Promise(test).then(function(result){
    console.log('success');
}).catch(function(reason){
    console.log('failed');
})

// 串行任务执行，使用Promise 执行
job1.then(job2).then(job3).catch(handleError);
// 并行 任务 执行
var p1 = new Promise(function(resolve, reject){
    setTimeout(resolve, 500, 'P1');//'P1'为函数参数
})
var p2 = new Promise(function(resolve, reject){
    setTimeout(resolve, 600, 'P2');
})
Promise.all([p1, p2]).then(function(results){
    // Array: ['P1', 'P2']
})
// 先执行完就结束
Promise.race([p1, p2]).then(function(result){
    // 'P1'
})


/**
 * 使用promise 实现红绿灯颜色的跳转
 * 绿灯执行三秒后
 * 黄灯执行四秒后
 * 红灯执行五秒
 * */
function timeout(timer){
    return function(){
        return new Promise(function(resolve, reject){
            setTimeout(resolve, timer)
        });
    }
}
var green = timeout(3000);
var yellow = timeout(4000);
var red  = timeout(5000);
var traffic = document.getElementById("traffic");
(function restart(){
    traffic.className = 'green';
    green().then(function(){
        traffic.classNAme = 'yellow';
        return yellow();
    }).then(function(){
        traffic.className = 'red';
        return red();
    }).then(function(){
        restart()
    })
})();


<ul id="traffic" class="">
    <li id="green"></li>
    <li id="yellow"></li>
    <li id="red"></li>
    </ul>


ul {
    position: absolute;
    width: 200px;
    height: 200px;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
}

/*画3个圆代表红绿灯*/

ul >li {
    width: 40px;
    height: 40px;
    border-radius:50%;
    opacity: 0.2;
    display: inline-block;
}

/*执行时改变透明度*/

ul.red >#red,
ul.green >#green,
ul.yellow >#yellow{
    opacity: 1.0;
}

/*红绿灯的三个颜色*/

#red {background: red;}

  #yellow {background: yellow;}

  #green {background: green;}


