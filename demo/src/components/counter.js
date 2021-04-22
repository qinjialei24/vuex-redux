import React from "react";
import store from "../store";
import {connect} from "react-redux";

function Counter(props) {
    console.log('Counter render')

    return (
    <div>
        <h1>计数器</h1>
        <button onClick={() => { props.add(111) }}>+</button>
        <button onClick={props.minus}>-</button>
      <h3>counter value is:</h3>
        <h4>{props.count}</h4>
        <hr />

    </div>
  )
}

const mapStateToProps = (state, ownProps) => ({
    count: state.counter.count +111
})

const mapDispatchToProps = dispatch => ({
    add(payload) {
        dispatch(store.counter.add)
    },
    minus() {
        dispatch(store.counter.minus)
    },
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Counter)


