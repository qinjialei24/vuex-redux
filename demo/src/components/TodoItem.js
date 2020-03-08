import React from "react";
import store from "../store/index";


function TodoItem(props) {
  const { item, index } = props

  function deleteItem(index) {
    store.dispatch('todo/delete', index)
  }

  return (
    <div>
      <li>
        {item}
        <button onClick={_ => { deleteItem(index); }}>
          delete
        </button>
      </li>
    </div>

  )
}

export { TodoItem }