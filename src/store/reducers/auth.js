import actionTypes from '../actions'

export const InitialState = {
  valid: false,
  token: '',
  user_id: '',
}
function Auth (state = InitialState, action) {
  switch (action.type) {
  case actionTypes.LOGIN_USER_SUCCESS:
      var { valid, token, user_id } = action.user
      return {
        ...state,
        ...{ valid, token, user_id }
      }
  default:
    return state
  }
}

export default Auth
