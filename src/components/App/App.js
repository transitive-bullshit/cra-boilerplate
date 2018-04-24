/**
 * @class App
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  Form,
  Icon,
  Input,
  Button,
  Checkbox
} from 'antd'

const FormItem = Form.Item

import styles from './styles.module.css'

@Form.create()
export default class App extends Component {
  static propTypes = {
    form: PropTypes.object.isRequired
  }

  render() {
    const { getFieldDecorator } = this.props.form

    return (
      <Form onSubmit={this._onSubmit} className={styles.loginForm}>
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' }]
          })(
            <Input
              prefix={
                <Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />
              }
              placeholder='Username'
            />
          )}
        </FormItem>

        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }]
          })(
            <Input
              prefix={
                <Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />
              }
              type='password'
              placeholder='Password'
            />
          )}
        </FormItem>

        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true
          })(
            <Checkbox>Remember me</Checkbox>
          )}

          <a className={styles.forgot} href=''>Forgot password</a>

          <Button type='primary' htmlType='submit' className={styles.submit}>
            Log in
          </Button>

          Or <a href=''>register now!</a>
        </FormItem>
      </Form>
    )
  }

  _onSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
      }
    })
  }
}
