import React from "react";

function Counter(props) {
  return (
    <div>
      <h3>counter value is:</h3>
      <hr />
      <button onClick={() => { props.add(111) }}>+</button>
      <button onClick={props.minus}>-</button>
      <h4>{props.count}</h4>
    </div>
  )
}



export default Counter