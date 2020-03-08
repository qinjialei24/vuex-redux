import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import  Todo from "./containers/todo.js";
import Counter from "./containers/counter.js";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
       <div>
        <Todo></Todo>
        <hr />
        <Counter></Counter>
      </div>
    </Provider>

  )

}

ReactDOM.render(<App />, document.getElementById('root'));


