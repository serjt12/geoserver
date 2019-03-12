import React from 'react'
import {  Form, Modal, Input, Button } from 'antd'

const ModalForm = (props) => {
  const {
    visible, onCancel, onCreate
  } = props;
  const { getFieldDecorator } = props.form;
  const handleOnSubmit = (e) => {
    onCreate(e, props)
  }
  return (
    <Modal
      visible={visible}
      title="Create a new project"
      okText="Create"
      onCancel={onCancel}
      footer={null}
    >
      <Form layout="vertical" onSubmit={handleOnSubmit}>
        <Form.Item label="Name">
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Please input the name of your project!' }],
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item label="Description">
          {getFieldDecorator('description')(<Input type="textarea" />)}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Create</Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
const ProjectCreateForm = Form.create({ name: 'project_form_in_modal' })(ModalForm)

export default ProjectCreateForm
