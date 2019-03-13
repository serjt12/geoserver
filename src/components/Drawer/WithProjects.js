import React, { Fragment, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Button, Form, Select, Icon, Row, Col, Input, Divider, Radio, Upload, message, Tabs, Popconfirm } from 'antd'
import ModalForm from './ModalForm'
import '../../styles/drawer.css'

const RenderProjectSites = ({projects: {projectSites}, dispatch, auth: {token},  projectID}) => {
  const handleDeleteSite = (siteId) => {
    dispatch({ type: 'REQUEST_DELETE_SITE', siteId, token})
  }
  return projectSites ? projectSites.map(site => site.project_id === projectID &&
    <li key={site._id}>
      <Radio>{site.name}</Radio>
      <Popconfirm
        title={`Are you sure delete ${site.name}?`}
        onConfirm={() => handleDeleteSite(site._id)}
        onCancel={() => message.error('Canceled site operation')}
        okText="Yes"
        cancelText="No">
        <Icon type="close" />
      </Popconfirm>
    </li>) : null
}
const KriginForm = () => {
  return <p>KRIGIN</p>
}
const IDWForm = () => {
  return <p>IDW</p>
}
const Option = Select.Option
const Dragger = Upload.Dragger
const TabPane = Tabs.TabPane
const RenderWithProjects = (props) => {
  const [showSites, setShowSites] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [showLayers, setShowLayers] = useState(false)
  const [showRGB, setShowRGB] = useState(false)
  const [showSpatial, setShowSpatial] = useState(false)
  const [projectID, setProjectID] = useState(props.projects.userProjects[props.projects.userProjects.length - 1]._id)
  const [defaultProject, setDefaultProject] = useState(props.projects.userProjects[props.projects.userProjects.length - 1].name)
  const [showDescription, setShowDescription] = useState(false)
  const getFieldDecorator = props.form.getFieldDecorator
  const sitesBtnDisabled = props.form.getFieldValue('siteName')
  const {userProjects} = props.projects
  const description = props.projects.userProjects.filter(project =>  project._id === projectID)[0] !== undefined ? props.projects.userProjects.filter(project =>  project._id === projectID)[0].description : ''
  const uploadConfig = {
    name: 'file',
    multiple: true,
    action: '//jsonplaceholder.typicode.com/posts/',
    onChange(info) {
      const status = info.file.status;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  useEffect(() => {
    const { userProjects } = props.projects
    let projectIndex = userProjects.findIndex(project => projectID === project._id)
    const projectsLength = userProjects.length

    if(projectIndex === -1) {
      projectIndex = projectsLength - 1
      setProjectID(userProjects[projectIndex]._id)
      setDefaultProject(userProjects[projectIndex].name)
    } else {
      setProjectID(userProjects[projectsLength - 1]._id)
      setDefaultProject(userProjects[projectsLength - 1].name)
    }
  }, [props.projects.userProjects.length])
  const handleShowSites = () => {
    setShowSites(!showSites)
  }
  const handleShowLayers = () => {
    setShowLayers(!showLayers)
  }
  const handleShowRGB = () => {
    setShowRGB(!showRGB)
  }
  const handleShowSpatial = () => {
    setShowSpatial(!showSpatial)
  }
  const projectChange = (value) => {
    setProjectID(value)
  }
  const handleDelete = (projectId) => {
    const { dispatch, auth: {token} } = props
    dispatch({ type: 'REQUEST_DELETE_PROJECT', projectId, token})
    message.success('Project Erased Successfully!')
  }

  const handleShowModal = () => {
    setShowModal(true)
  }

  const handleCancel = () => {
    setShowModal(false)
  }
  const handleCreateProject = (e, {form}) => {
    const { dispatch, auth: {user_id, token} } = props
    e.preventDefault()
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      form.resetFields();
      dispatch({ type: 'REQUEST_ADD_PROJECT', project: values, user_id, token })
      setShowModal(false)
      message.success(`${values.name} Created Successfully!`)
    });
  }
  const handleAddSite = () => {
    const {form, dispatch, auth: {token}} = props
    form.validateFields((err, site) => {
      if (err) {
        return;
      }
      form.resetFields();
      dispatch({ type: 'REQUEST_ADD_SITE', site, projectID, token})
      message.success(`${site.siteName} Created Successfully!`)
    })
  }
  const callbackRGB = (key) => {
    console.log(key);
  }
  const callbackSpatial = (key) => {
    console.log(key);
  }
  const handleDescription = () => {
    setShowDescription(!showDescription)
  }
  return (
    <Fragment>
      <div className="box">
        <strong>You have {userProjects.length} { userProjects.length !== 1 ? 'projects' : 'project'}</strong>
        <Select
          defaultValue={defaultProject}
          key={defaultProject}
          onChange={projectChange}
          size={'large'}
        >
          {userProjects.map(project => <Option key={project._id}>{project.name}
            <Popconfirm
              title={`Are you sure to delete ${project.name}?`}
              onConfirm={() => handleDelete(project._id)}
              onCancel={() => message.error('Canceled project operation')}
              okText="Yes"
              cancelText="No">
              <span className="close"><Icon type="close" /></span>
            </Popconfirm>
          </Option>)
            .reverse()}
        </Select>
        <Button onClick={handleShowModal} type="primary">New</Button>
        {
          description === '' ? null : <p className="description-title" onClick={handleDescription}>Project Description</p>
        }
        {
          showDescription ? <p className="description-content">{description}</p> : null
        }
        <ModalForm
          onCancel={handleCancel}
          visible={showModal}
          onCreate={handleCreateProject}
        />
      </div>
      <div className="box">
        <strong onClick={handleShowSites}>{ !showSites ? <Icon className="fade-out" type="caret-right" /> : <Icon type="caret-down" />}Sites</strong>
        { showSites ?
          <Form>
            <Form.Item>
              <Row gutter={0}>
                <ul>
                  <RenderProjectSites {...props} projectID={projectID}/>
                </ul>
                <Col span={12}>
                  {getFieldDecorator('siteName', {
                    rules: [{ required: true, message: 'Add a site' }],
                  })(
                    <Input />
                  )}
                </Col>
                <Col span={12}>
                  <Button disabled={!sitesBtnDisabled} onClick={handleAddSite}>Add Site</Button>
                </Col>
              </Row>
            </Form.Item>
          </Form> : null
        }
      </div>
      <div className="box">
        <strong onClick={handleShowLayers}>{ !showLayers ? <Icon className="fade-out" type="caret-right" /> : <Icon type="caret-down" />}Layers</strong>
        { showLayers &&
          <Dragger {...uploadConfig}>
            <p className="ant-upload-drag-icon">
              <Icon type="inbox" />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
          </Dragger>
        }
      </div>
      <Divider />
      <div className="box">
        <strong onClick={handleShowRGB}>{ !showRGB ? <Icon className="fade-out" type="caret-right" /> : <Icon type="caret-down" />}RGB Analysis</strong>
        { showRGB &&
          <Tabs defaultActiveKey="1" onChange={callbackRGB}>
            <TabPane tab="Detect Vegetation" key="1"><Button>Select ROI</Button></TabPane>
            <TabPane tab="Plant Count" key="2">Content of Plant Count</TabPane>
          </Tabs>
        }
      </div>
      <div className="box">
        <strong onClick={handleShowSpatial}>{ !showSpatial ? <Icon className="fade-out" type="caret-right" /> : <Icon type="caret-down" />}Spatial Analysis</strong>
        { showSpatial &&
          <Tabs defaultActiveKey="1" onChange={callbackSpatial}>
            <TabPane tab="Krigin" key="1">
              <KriginForm />
            </TabPane>
            <TabPane tab="IDW" key="2">
              <IDWForm />
            </TabPane>
          </Tabs>
        }
      </div>
    </Fragment>
  )
}
const sitesForm = Form.create({ name: 'sites_form' })(RenderWithProjects)

export default connect(state => state)(sitesForm)
