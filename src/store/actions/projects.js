import actionTypes from './'

export function userProjectsSuccess(projects) {
  return {
    type: actionTypes.USER_PROJECTS_SUCCESS,
    projects
  }
}

export function addProjectSuccess(newProject) {
  return {
    type: actionTypes.ADD_PROJECT_SUCCESS,
    newProject
  }
}

export function deleteProjectSuccess(deletedProjectId) {
  return {
    type: actionTypes.DELETE_PROJECT_SUCCESS,
    deletedProjectId
  }
}

export function projectSitesSuccess(sites) {
  return {
    type: actionTypes.PROJECT_SITES_SUCCESS,
    sites
  }
}

export function addSiteSuccess(newSite) {
  return {
    type: actionTypes.ADD_SITE_SUCCESS,
    newSite
  }
}

export function deleteSiteSuccess(deletedSiteId) {
  return {
    type: actionTypes.DELETE_SITE_SUCCESS,
    deletedSiteId
  }
}
