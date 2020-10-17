## React 面试题整理
https://mp.weixin.qq.com/s?__biz=Mzg2NDAzMjE5NQ==&mid=2247484667&idx=1&sn=dcaea6836c604100f9811c8c7f98a147&utm_source=tuicool&utm_medium=referral
## setState 是同步的还是异步的
detail：https://mp.weixin.qq.com/s?__biz=Mzg2NDAzMjE5NQ==&mid=2247483989&idx=1&sn=d78f889c6e1d7d57058c9c232b1a620e&chksm=ce6ec6f9f9194fef681c79ee869bf58d5413132c73496710b2eb32c859a2249a895c2ce8a7cd&scene=21#wechat_redirect
在 React 的生命周期和合成事件中， React 仍然处于他的更新机制中，这时无论调用多少次 setState ，都会不会立即执行更新，而是将要更新的·存入 _pendingStateQueue ，将要更新的组件存入 dirtyComponent 
当上一次更新机制执行完毕，以生命周期为例，所有组件，即最顶层组件 didmount 后会将批处理标志设置为 false 。这时将取出 dirtyComponent 中的组件以及 _pendingStateQueue 中的 state 进行更新。这样就可以确保组件不会被重新渲染多次。
所以，如上面的代码，当我们在执行 setState 后立即去获取 state ，这时是获取不到更新后的 state 的，因为处于 React 的批处理机制中， state 被暂存起来，待批处理机制完成之后，统一进行更新。
所以。 setState 本身并不是异步的，而是 React 的批处理机制给人一种异步的假象。

在异步代码和原生事件中，当我们在异步代码中调用 setState 时，根据 JavaScript 的异步机制，会将异步代码先暂存，等所有同步代码执行完毕后在执行，这时 React 的批处理机制已经走完，处理标志设被设置为 false ，这时再调用 setState 即可立即执行更新，拿到更新后的结果。

在原生事件中调用 setState 并不会出发 React 的批处理机制，所以立即能拿到最新结果。

最佳实践
1.setState 的第二个参数接收一个函数，该函数会在 React 的批处理机制完成之后调用，所以你想在调用 setState 后立即获取更新后的值，请在该回调函数中获取。
2.React 会对多次连续的 setState 进行合并，如果你想立即使用上次 setState 后的结果进行下一次 setState ，可以让 setState 接收一个函数而不是一个对象。这个函数用上一个 state 作为第一个参数，将此次更新被应用时的 props 做为第二个参数


## React如何实现自己的事件机制？事件监听机制， 合成事件机制
推荐阅读： https://mp.weixin.qq.com/s?__biz=Mzg2NDAzMjE5NQ==&mid=2247484039&idx=1&sn=1f657356676d4809633f30668acb50d2&chksm=ce6ec62bf9194f3d8a4eb382bd01c56231908a1b08fb9c2c9783f96df6650ee808fe18343032&scene=21#wechat_redirect
React 事件并没有绑定在真实的 Dom 节点上，而是通过事件代理，在最外层的 document 上对事件进行统一分发。
1.组件挂载、更新时
2.事件初始化
3.触发事件时


## react diff 算法

## 虚拟Dom是什么


## 事件监听机制， 合成事件机制

## hooks

## react 中使用了哪些设计模式
