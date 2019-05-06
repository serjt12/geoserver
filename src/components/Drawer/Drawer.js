import React, { useState, useEffect } from 'react';
import { Drawer, Button } from 'antd';
import {connect} from 'react-redux';
import RenderWithProjects from './WithProjects'
import RenderWithoutProjects from './WithoutProjects'
import '../../styles/drawer.css'

function DrawerComponent(props) {
  const [visible, setVisible] = useState(false);
  const { projects: { userProjects, projectSites, currentProjectID }} = props
  useEffect(() => {
  console.log('props: ', props);
    const { dispatch, auth: {token} } = props
    if (userProjects.length === 0) {
      dispatch({ type: 'GET_PROJECTS', token})
    }
    if (projectSites.length === 0) {
      dispatch({ type: 'GET_PROJECT_SITES', token, currentProjectID })
    }

  }, [currentProjectID])
  return (
    <div className="drawer-container">
      <Button type="primary" onClick={() => setVisible(true)}>
        Open
      </Button>
      <Drawer
        width={'25vw'}
        title="Geoserver"
        placement="left"
        closable={false}
        onClose={() => setVisible(false)}
        visible={visible}
      >
        { (userProjects !== null && userProjects.length < 1 ) ? <RenderWithoutProjects /> : <RenderWithProjects /> }
      </Drawer>
    </div>
  );
}

export default connect(state => state)(DrawerComponent);
