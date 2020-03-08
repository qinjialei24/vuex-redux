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

