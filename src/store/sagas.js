import { all, put, takeLatest } from 'redux-saga/effects'
import axios from 'axios'
import actionTypes, {showModal} from './actions'
import { loginSuccess } from './actions/auth'
import {baseURL} from '../.env.development'
import { userProjectsSuccess, deleteProjectSuccess, addProjectSuccess, projectSitesSuccess, addSiteSuccess, deleteSiteSuccess } from './actions/projects'

// const baseURL = "http://181.143.87.202:5550"
function* loginRequestSaga({user}) {
  try {
    const res = yield axios.post( baseURL + '/users/login', {
      email: user.Email,
      password: user.password,
    })
    if (res.data.code === 200) {
      const user = res.data
      localStorage.setItem('token', user.token)
      yield put(loginSuccess(user))
    } else {
      const msg = res.data.message
      yield put(showModal(msg))
    }
    if(res.data.message) {
      yield put(showModal(res.data.message))
    }
  }
  catch (err) {
    yield put(showModal(err))
  }
}

function* alreadyLoginRequest({savedToken}) {
  try {
    const res = yield axios( baseURL + '/users/', {
      headers: {
        Authorization: 'Bearer ' + savedToken,
      }
    })
    if(savedToken) {
      const user = res.data.users && { valid: true, token: savedToken, user_id: res.data.users[0]._id }
      yield put(loginSuccess(user))
    }
  }
  catch(err) {
    yield put(showModal(err))
  }
}

export function* requestUserProjects({token}) {
  try {
    const res = yield axios( baseURL + '/projects/', {
      headers: {
        Authorization: 'Bearer ' + token,
      }
    })
    yield put(userProjectsSuccess(res.data.projects ? res.data.projects : []))
  }
  catch(err) {
    console.log(err)
  }
};

export function* requestAddProject({project, user_id, token}) {
  try {
    const res = yield axios.post( baseURL + '/users/' + user_id + '/projects', {
      name: project.name,
      description: project.description,
    },
    {
      headers: {
        Authorization: 'Bearer ' + token,
      }
    })
    yield put(addProjectSuccess(res.data.projects))
  }
  catch(err) {
    console.log(err)
  }
}

export function* requestDeleteProject({token, projectId}) {
  try {
    const res = yield axios.delete( baseURL + '/projects/' + projectId, {
      headers: {
        Authorization: 'Bearer ' + token,
      }
    })
    yield put(deleteProjectSuccess(res.data.projects[0]._id))
  }
  catch(err) {
    console.log(err)
  }
}

export function* requestProjectSites({token}) {
  try {
    const res = yield axios( baseURL + '/sites/', {
      headers: {
        Authorization: 'Bearer ' + token,
      }
    })
    yield put(projectSitesSuccess(res.data.sites ? res.data.sites : []))
  }
  catch(err) {
    console.log(err)
  }
}

export function* requestAddSite({site, projectID, token}) {
  try {
    const res = yield axios.post( baseURL + '/projects/' + projectID + '/sites/', { name: site.siteName, project_id: projectID },
      {
        headers: {
          Authorization: 'Bearer ' + token,
        }
      })
    yield put(addSiteSuccess(res.data.sites))
  }
  catch(err) {
    console.log(err)
  }
}

export function* requestDeleteSite({siteId, token}) {
  try {
    const res = yield axios.delete( baseURL + '/sites/' + siteId,
      {
        headers: {
          Authorization: 'Bearer ' + token,
        }
      })
    yield put(deleteSiteSuccess(res.data.sites[0]._id))
  }
  catch(err) {
    console.log(err)
  }
}

function * rootSaga () {
  yield all([
    takeLatest(actionTypes.LOGIN_USER, loginRequestSaga),
    takeLatest(actionTypes.FETCH_TOKEN, alreadyLoginRequest),
    takeLatest(actionTypes.GET_PROJECTS, requestUserProjects),
    takeLatest(actionTypes.REQUEST_ADD_PROJECT, requestAddProject),
    takeLatest(actionTypes.REQUEST_DELETE_PROJECT, requestDeleteProject),
    takeLatest(actionTypes.GET_PROJECT_SITES, requestProjectSites),
    takeLatest(actionTypes.REQUEST_ADD_SITE, requestAddSite),
    takeLatest(actionTypes.REQUEST_DELETE_SITE, requestDeleteSite)
  ])
}

export default rootSaga
