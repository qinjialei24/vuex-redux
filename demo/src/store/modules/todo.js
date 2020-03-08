import { createModel } from "vuex-redux";

const model = {
  namespace: 'todo',
  state: {
    inputValue: '123',
    list: []
  },
  reducer: {
    add(state, action) {
      state.list.push(action.data)
    },
    delete(state, action) {
      state.list.splice(action.data, 1)
    },
    changeInput(state, action) {
      state.inputValue = action.data
    },
  },
}

export default createModel(model)