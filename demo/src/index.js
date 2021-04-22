import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from "./store";
import Todo from "./components/todo";
import Counter from "./components/counter";

function App() {
  return (
    <Provider store={store}>
       <div>
        <Todo/>
        <hr />
        <Counter/>
      </div>
    </Provider>

  )

}

ReactDOM.render(<App />, document.getElementById('root'));


