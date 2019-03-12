import actionTypes from '../actions'

export const InitialState = {
  userProjects: [],
  projectSites: [],
}
function Projects (state = InitialState, action) {
  switch (action.type) {
  case actionTypes.USER_PROJECTS_SUCCESS:
    var { projects } = action
    return {
      ...state,
      userProjects: projects
    }
    case actionTypes.ADD_PROJECT_SUCCESS:
    var { newProject } = action
    return {
      ...state,
      userProjects: [ ...state.userProjects, newProject]
    }
  case actionTypes.DELETE_PROJECT_SUCCESS:
    var { deletedProjectId } = action;
    return {
      ...state,
      userProjects: state.userProjects.filter(project => project._id !== deletedProjectId)
    }
  case actionTypes.PROJECT_SITES_SUCCESS:
    var { sites } = action
    return {
      ...state,
      projectSites: sites
    }
  case actionTypes.ADD_SITE_SUCCESS:
    var { newSite } = action
    return {
      ...state,
      projectSites: [ ...state.projectSites, newSite]
    }
  case actionTypes.DELETE_SITE_SUCCESS:
  var { deletedSiteId } = action
  return {
    ...state,
    projectSites: state.projectSites.filter(site => site._id !== deletedSiteId)
  }
  default:
    return state
  }
}

export default Projects
