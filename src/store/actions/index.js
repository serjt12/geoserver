const actionTypes = {
  LOGIN_USER: 'LOGIN_USER',
  LOGIN_USER_SUCCESS: 'LOGIN_USER_SUCCESS',
  SHOW_MODAL: 'SHOW_MODAL',
  FETCH_TOKEN: 'FETCH_TOKEN',
  GET_PROJECTS: 'GET_PROJECTS',
  USER_PROJECTS_SUCCESS: 'USER_PROJECTS_SUCCESS',
  REQUEST_ADD_PROJECT: 'REQUEST_ADD_PROJECT',
  ADD_PROJECT_SUCCESS: 'ADD_PROJECT_SUCCESS',
  REQUEST_DELETE_PROJECT: 'REQUEST_DELETE_PROJECT',
  DELETE_PROJECT_SUCCESS: 'DELETE_PROJECT_SUCCESS',
  GET_PROJECT_SITES: 'GET_PROJECT_SITES',
  PROJECT_SITES_SUCCESS: 'PROJECT_SITES_SUCCESS',
  REQUEST_ADD_SITE: 'REQUEST_ADD_SITE',
  ADD_SITE_SUCCESS: 'ADD_SITE_SUCCESS',
  REQUEST_DELETE_SITE: 'REQUEST_DELETE_SITE',
  DELETE_SITE_SUCCESS: 'DELETE_SITE_SUCCESS',
  // DELETE_SITE: 'DELETE_SITE',
}

export function showModal(msg) {
  return {
    type: actionTypes.SHOW_MODAL,
    msg
  }
}

export default actionTypes