import { connect } from 'react-redux'
import Counter from "../components/counter";
import store from "../store/index";


const getData = dispatch => {
  setTimeout(() => {
    dispatch(store.counter.add)
  }, 1000);
}

const mapStateToProps = (state, ownProps) => ({
  count: state.counter.count
})

const mapDispatchToProps = dispatch => ({
  add(payload) {
    // dispatch({
    //   type: store.counter.add
    // })
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
