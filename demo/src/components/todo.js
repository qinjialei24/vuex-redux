import React from 'react';
import { TodoItem } from "./TodoItem";

const Todo = (props) => {
  const { inputValue, inputChange, addItem, list } = props

  return (
    <div>
      <input value={inputValue} onChange={inputChange} />
      <button onClick={() => { addItem(inputValue) }}> 添加</button>
      <ul>
        {list.map((item, index) => {
          return <TodoItem key={index} index={index} item={item}></TodoItem>
        })
        }
      </ul>
    </div>
  )
}

export default Todo

