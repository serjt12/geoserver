import React, { useState, useEffect } from 'react';
import { Drawer, Button } from 'antd';
import {connect} from 'react-redux';
import RenderWithProjects from './WithProjects'
import RenderWithoutProjects from './WithoutProjects'
import '../../styles/drawer.css'

function DrawerComponent(props) {
  const [visible, setVisible] = useState(false);
  const { projects: { userProjects }} = props
  useEffect(() => {
    const { dispatch, auth: {token}} = props
    dispatch({ type: 'GET_PROJECTS', token})
    dispatch({ type: 'GET_PROJECT_SITES', token})
  }, [])
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
