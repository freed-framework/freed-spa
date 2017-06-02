大致的工作流程
1. App.jsx
2. 调用 actions/*.js
3. actions 调用 fetch(axios.js) 发送数据请求

***
**切记不要在 constructor 或者 组件的任何位置setState，state全部在reducer初始化**
***

<pre>
Store的数据修改，本质上是通过Reducer来完成的。
Store只提供get方法（即getState），不提供set方法，所以数据的修改一定是通过dispatch(action)来完成，即：action -> reducers -> store
Store除了存储数据之外，还有着消息发布/订阅（pub/sub）的功能，也正是因为这个功能，它才能够同时连接着Actions和Views。
dispatch方法 对应着 pub
subscribe方法 对应着 sub
</pre>

<code>
    import {increase, descrease} from 'it is the path';
    
    const mapDispatchToProps = (dispatch) => bindActionCreators({
      increase,
      decrease
    }, dispatch);
    
    @connect(state => state, mapDispatchToProps)
</code>

**可以用 ES7 的方式简化为**

<code>
    @connect(
        state => state, 
        dispatch => bindActionCreators({increase, decrease}, dispatch)
    )
</code>


**nginx 配制, BrowserHistory**
<code>
    location / {
       try_files $uri /index.html;
    }
</code>


Redux三大原则：

1、单一数据源，这个应用的state被存储在一棵object tree中，并且这个object tree只存在于唯一的Store中。

2、state是只读的，唯一改变state的方法就是触发action，action是一个用于描述已发生事件的普通对象。

3、使用纯函数来执行修改，为了描述action如何改变state tree，需要编写reducer。

Redux数据流的管理：

1、action:把数据传递到Store，唯一数据来源。

2、reducer:action只描述有事情发生，reducer指明如何更新state，即设计state结构和action处理。

3、Store:把action和reducer联系到一起，负责维持、获取和更新state。

4、生命周期：数据流严格且单向

调用Store.dispatch(action)->Store调用传入的reducer函数，Store会把两个参数传入reducer:当前的state树和action->根reducer将多个子reducer输出合并成一个单一的state树->Store保存了根reducer，并返回完整的state树。