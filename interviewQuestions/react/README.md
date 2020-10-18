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
推荐阅读：深入理解React：diff 算法 https://blog.csdn.net/sinat_17775997/article/details/107151447
传统的diff 算法的事件复杂度O(n*3)
为了优化diff 算法， React提出了两个假设：
1.相同的组件，产生相同的dom结构
2.
针对上述两个假设， React针对性的提出了三个策略以对diff 算法进行优化：
1.
## 虚拟Dom是什么


## 事件监听机制， 合成事件机制

## hooks

推荐阅读：
十个案例学会 React Hookshttps://blog.csdn.net/sinat_17775997/article/details/89208701
React Hooks 使用详解 https://blog.csdn.net/sinat_17775997/article/details/89087266
自定义hooks： https://blog.csdn.net/sinat_17775997/article/details/96476696
React Hooks  VS 类组件 的好处：
1.代码可读性更强，原本同一块功能的代码逻辑被拆分在了不同的生命周期函数中，不利于维护和迭代，通过 React Hooks 可以将功能代码聚合，方便阅读维护。
2.组件树层级变浅. 在Class 中要复用组件的状态的话要通过HOC/render props 等方式实现，增加了组件树层数及渲染。而在 React Hooks 中，这些功能都可以通过自定义的 Hooks 来实现。

常用的Hooks
-1、useState
const [state, setState] = useState(initialState);
与在类中使用 setState 的异同点：
相同点：也是异步的，例如在 onClick 事件中，调用两次 setState，数据只改变一次。
不同点：类中的 setState 是合并，而函数组件中的 setState 是替换。

-2、useEffect: 异步请求，副作用的操作
第一个参数传递函数，可以用来做一些副作用比如异步请求，修改外部参数等行为，
第二个参数是个数组，如果数组中的值才会触发 useEffect 第一个参数中的函数。useEffect 中数组没有传值，代表不监听任何参数变化，即只有在组件初始化或销毁的时候才会触发，用来代替 componentDidMount 和 componentWillUnmount
返回值(如果有)则在组件销毁或者调用函数前调用。

-3、useContext:用来处理多层级传递数据
使用 useContext 可以解决 Consumer 多状态嵌套的问题

-4、useReducer, 是useState 的替代方案，当你涉及多个子值的复杂 state(状态) 逻辑时，useReducer 通常优于 useState。
与 useState 的区别：
1. 当 state 状态值结构比较复杂时，使用 useReducer 更有优势
2. 使用 useState 获取的 setState 方法更新数据时是异步的；而使用 useReducer 获取的 dispatch 方法更新数据是同步的。

-5、useCallback
## react 中使用了哪些设计模式
