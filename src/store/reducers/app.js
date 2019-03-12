import actionTypes from '../actions'

export const InitialState = {
  msg: ''
}
function App (state = InitialState, action) {
  switch (action.type) {
  case actionTypes.SHOW_MODAL:
    var { msg } = action
    return {
      ...state,
      msg
    }
  default:
    return state
  }
}

export default App
