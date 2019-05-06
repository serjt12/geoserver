import actionTypes from '.'

export function loginSuccess(user) {
  return {
    type: actionTypes.LOGIN_USER_SUCCESS,
    user
  }
}
export function fetchToken(savedToken) {
  return {
    type: actionTypes.FETCH_TOKEN,
    savedToken
  }
}
