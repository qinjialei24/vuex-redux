---
presentation:

 theme: white.css
 progress: true
 height: 1000

---


<!-- slide -->
# 从0实现 Redux 
<!-- slide -->
## Redux 的核心概念
- `发布订阅模式`
- `(state,action) => newState`
  - `导致状态的变更必须是一个纯函数`
<!-- slide -->
## 发布订阅模式
```js
import React from "react";
import store from "../store/index";

class Count extends React.Component {
  constructor() {
    super()
    this.state = store.getState().count
    store.subscribe(() => {//订阅
      this.setState(store.getState().count)
    })
  }
  add = () => { store.dispatch({ type: 'add' }) }//发布
  minus = () => { store.dispatch({ type: 'minus' }) }
  render() {
    return (
      <div>
        <h1>当前count的值是：</h1>
        <h2>{this.state.count}</h2>
        <button onClick={this.add}>+</button>
        <button onClick={this.minus}>-</button>
      </div>
    )
  }
}
export default Count
```
<!-- slide -->

### `(state,action) => newState`
```js
const initialState = {
  count: 0
}

function countReducer(state = initialState, action) {
  switch (action.type) {
    case 'add':
      return {
        ...state,
        count: state.count + 1
      }

    case 'minus':
      return {
        ...state,
        count: state.count - 1
      }

    default:
      return state
  }
}

export default countReducer
```

<!-- slide -->
## Redux 的工作流程
![](https://pic4.zhimg.com/v2-1111b098e354c2214f137017c92449df_b.webp)

<!-- slide -->
基于发布订阅实现一个最简单的状态管理
```js
let state = {
  count: 1
};
let listeners = [];

function subscribe(listener) {
   listeners.push(listener);
}

function changeCount(count) {
  state.count = count;
  listeners.forEach(listen=>{
    listen()
  })
}

subscribe(()=>{
  console.log(state)
})

changeCount(2)
```
<!-- slide -->
# Redux 的问题
<!-- slide -->
## immutable 写起来太繁琐
> 比如当一个对象层次较深时
```js
const initialState = {
  a: { b: {  c: { count: 0 } } }
}

function countReducer(state = initialState, action) {
  switch (action.type) {
    case 'add':
      return {
        ...state,
        a: {
          ...state.a,
          b: {
            ...state.a.b,
            c: {
              ...state.a.b.c,
              count: state.a.b.c.count + 1
            }
          }
        }
      }
```
<!-- slide -->
# 太难了

<!-- slide -->
## 引入 immer 改善开发体验

```js
import produce from "immer"
const initialState = {
  a: {
    b: {
      c: {
        count: 0
      }
    }
  }
}

const newState = product(initialState, nextData => {
    nextData.a.b.c.count +=1 
});
```


<!-- slide -->
- 全局单一 store 的理念导致产生了一颗巨大的状态树，状态树的任意节点更新，将导致所有组件触发更新，即使该组件不依赖该状态

```js
const state ={
  a:{
    count:0,
    b:{
      c:{
        count:1
      }
    }
  }
}
```

- `组件A依赖state.a.b.c`
- `组件B修改了state.a`
- `解决方式：immer + shouldComponentUpdate`

<!-- slide -->
- ## 模板代码太多，比如需要定义各种烦人的 action、actionCreator
- ## action 和 reducer 分离，导致需要频繁切换文件，开发体验差
<!-- slide -->
### 为了解决这些问题，我造了个小轮子
<!-- slide -->
## vuex-redux
>`npm i vuex-redux`
<!-- slide -->
## 看下效果
<!-- slide -->
### 定义 `Reducer`，`NO ACTION`
```js
import { createModel } from "vuex-redux";

const model = {
  namespace: 'todo',
  state: {
    todoList: []
  },
  reducer: {
    addTodo(state, action) {
      state.todoList.push(action.data)
    },
    delete(state, action) {
      state.todoList.splice(action.data, 1)
    },
  },
}
export default createModel(model)
```
<!-- slide -->
## 组件使用
```js
// dispatch 支持两种使用方式
// 原生redux调用： dispatch({type:'add',payload:{}})
// 类似vuex调用： dispatch('add',payload)

// 调用 counter 的 add
dispatch(store.counter.add)//类似 vuex调用

dispatch({ //原生redux调用
  type:store.counter.add,
})

// 调用 todo 的 delete
dispatch(store.counter.add,{})//类似 vuex调用

dispatch({//原生redux调用
  type:store.counter.delete,
  payload:{}
})

```
<!-- slide -->
## 谢谢
