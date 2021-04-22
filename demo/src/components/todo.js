import React from 'react';
import { TodoItem } from "./TodoItem";
import store from "../store";
import {connect} from "react-redux";

const Todo = (props) => {
  const { inputValue, inputChange, addItem, list,add } = props
    console.log('Todo render')

  return (
    <div>
        <h1>todo list</h1>
      <input value={inputValue} onChange={inputChange} />
      <button onClick={() => {
          addItem(inputValue)
          add()
      }}> 添加</button>
      <ul>
        {list.map((item, index) => {
          return <TodoItem key={index} index={index} item={item}/>
        })
        }
      </ul>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
    return {
        list: state.todo.list,
        inputValue: state.todo.inputValue,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        add(payload) {
            dispatch(store.counter.add)
        },
        addItem(data) {
            dispatch(store.todo.add)
        },
        inputChange(data){
            dispatch(store.todo.changeInput, data.target.value)
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Todo)



