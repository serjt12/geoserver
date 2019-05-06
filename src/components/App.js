import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import '../styles/app.css'
import Login from './Login'
import {fetchToken} from '../store/actions/auth'
import Drawer from './Drawer/Drawer'
import MapComponent from './Map'

const App = (props) => {
  useEffect(() => {
    const savedToken = localStorage.length > 0 ? localStorage.getItem('token') : ''
    if (savedToken !== '') {
      props.dispatch(fetchToken(savedToken))
    }
  })
  return (
    <div className="app-container">
      {
        !props.valid 
          ? (
            <div className="login-wrap">
              <Login />
            </div>
          )
          : (
            <Fragment>
              <Drawer />
              <div className="map-container">
                <MapComponent />
              </div>
            </Fragment>
          )
    }
    </div>
  )
}

function mapStateToProps(state) {
  return {
    valid: state.auth.valid,
  }
}

export default connect(mapStateToProps)(App)
