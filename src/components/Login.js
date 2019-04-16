import React, { useState } from 'react'
import { Form, Icon, Input, Button, Modal } from 'antd'
import { connect } from 'react-redux'
import { showModal } from '../store/actions'

const Login = ({ form, errorMessage, dispatch }) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { getFieldDecorator } = form
  console.log(errorMessage)
  const handleSubmit = (e) => {
    e.preventDefault()
    form.validateFields((err, values) => {
      if (!err) {
        setIsSubmitting(true)
        dispatch({
          type: 'LOGIN_USER',
          user: values
        })
      }
    });
  }
  const handleClose = () => {
    dispatch(showModal(''))
    setIsSubmitting(false)
  }
  return (
    <Form onSubmit={handleSubmit} className="login-form">
      <Form.Item>
        {getFieldDecorator('Email', {
          rules: [
            {
              required: true, message: 'Please input your email!'
            },
            {
              type: 'email', message: 'The input is not a valid E-mail!'
            }]
        })(
          <Input
            prefix={(
              <Icon
                type="user"
                style={{
                  color: 'rgba(0,0,0,.25)'
                }}
              />
            )}
            placeholder="Email"
          />
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('password', {
          rules: [{
            required: true, message: 'Please input your Password!'
          }]
        })(
          <Input
            prefix={(
              <Icon
                type="lock"
                style={{
                  color: 'rgba(0,0,0,.25)'
                }}
              />
            )}
            type="password"
            placeholder="Password"
          />
        )}
      </Form.Item>
      <Form.Item>
        <Button loading={isSubmitting} type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
      </Form.Item>
      <Modal
        onCancel={handleClose}
        footer={null}
        title="Please check your info"
        visible={errorMessage !== ''}
      >
        <p>{errorMessage}</p>
      </Modal>
    </Form>
  )
}
const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Login)

function mapStateToProps(state) {
  return {
    errorMessage: state.appReducer.msg
  }
}

export default connect(mapStateToProps)(WrappedNormalLoginForm)
