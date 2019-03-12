import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import { Button, message } from 'antd'
import ModalForm from './ModalForm'
import '../../styles/drawer.css'

const RenderWithoutProjects = (props) => {
  const [showModal, setShowModal] = useState(false)

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
      message.success(`${values.name} Created Successfully!`)
      setShowModal(false)
    });
  }
  return (
    <Fragment>
      <div className="box">
        <Button  onClick={handleShowModal} type="primary">New Project</Button>
      </div>
      <ModalForm
        onCancel={handleCancel}
        visible={showModal}
        onCreate={handleCreateProject}
      />
    </Fragment>
  )
}


export default connect(state => state)(RenderWithoutProjects)
