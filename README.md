## 轻量级的 Redux 封装
## Make Redux as simple as Vuex

[示例项目](https://github.com/qinjialei24/vuex-redux/tree/master/demo)

## 使用
>1. 目录结构(使用`modules`来拆分各个`reducer`，参照`vuex module`
>2. 不需要手动编写`action`
>3. 提供`namespace`，参照` vuex namespace`
>4. 内置 `immer`，以`mutable`方式去操作`state`

## 目录结构
- modules
  - todo.js
  - counter.js
- index.js

> modules / counter.js

```js
import { createModel } from "vuex-redux";

const model = {
  namespace: 'counter',
  state: {
    count: 10
  },
  reducer: {
    add(state, action) {
      state.count += 1
    },
    minus(state, action) {
      state.count--
    },
  }
}

export default createModel(model)
```
> modules / todo.js
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

>index.js
```js
import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import { setActionToStore, storeEnhancer } from "vuex-redux";

import todo from "./modules/todo";
import counter from "./modules/counter";

const loggerMiddleware = store => dispatch => action => {
  console.log("action", action)
  dispatch(action)
}

const reducerModules = {
  todo,
  counter,
}


const store = createStore(combineReducers(reducerModules), composeWithDevTools(
  applyMiddleware(loggerMiddleware),
  storeEnhancer
  // other store enhancers if any
));

setActionToStore(store, reducerModules)
export default store
```
> 组件这样使用
```js
// dispatch 支持两种使用方式
// 原生redux调用： dispatch({type:'add',payload:{}})
// 类似vuex调用： dispatch('add',payload)

// 调用 counter 的 add
dispatch(store.counter.add)////类似 vuex调用
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

## 对比传统的`redux`使用方式
>目录结构

- action.js
- reducer
  - todo.js
  - counter.js
- index.js
- CounterComponent.js

> action.js

```js
export const ADD = 'add'
export const MINUS = 'minus'
export const ADD_TODO = 'addTodo'
```

> reducer / todo.js

```js
import { ADD_TODO } from './action.js'

export function todoReducer(state = { todoList:[] }, action) {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todoList:state.todoList.push(action.payload)
      }
    default:
      return state
  }
}
```


> reducer / counter.js
```js
import { ADD, MINUS } from './action.js'
export function counterReducer(state = { count:0 }, action) {
  switch (action.type) {
    case ADD:
      return {
        ...state,
        count:state.count + 1
      }
    case MINUS:
       return {
        ...state,
        count:state.count - 1
      }
    default:
      return state
  }
}
```

>index.js
```js
import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import todo from "./reducer/todo.js";
import counter from "./reducer/counter.js";

const reducerModules = {
  todo,
  counter,
}

const loggerMiddleware = store => dispatch => action => {
  console.log('loggerMiddleware')
  dispatch(action)
}


const store = createStore(combineReducers(reducerModules), composeWithDevTools( // use redux-devtools
  applyMiddleware(loggerMiddleware),
  // other store enhancers if any
));

export default store
```











