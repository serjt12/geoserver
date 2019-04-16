import actionTypes from '.'

export function loginSuccess(user) {
  return {
    type: actionTypes.LOGIN_USER_SUCCESS,
    user
  }
}
export function fetchToken() {
  const savedToken = localStorage.length > 0 && localStorage.getItem('token')
  return {
    type: actionTypes.FETCH_TOKEN,
    savedToken
  }
}
