
import { combineReducers } from 'redux'
import appReducer from './app'
import auth from './auth'
import projects from './projects'
const reducers = combineReducers({
  appReducer,
  auth,
  projects
})

export default reducers
