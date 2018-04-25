/**
 * @class LoginForm
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Link, withRouter } from 'react-router-dom'

import {
  Button,
  Checkbox,
  Divider,
  Form,
  Icon,
  Input
} from 'antd'

const FormItem = Form.Item

import authGitHub from 'lib/auth-github'

import styles from './styles.module.css'

@withRouter
@Form.create()
export default class LoginForm extends Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
  }

  state = {
    loading: false
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { loading } = this.state

    return (
      <Form
        className={styles.loginForm}
        onSubmit={this._onSubmit}
      >
        <Button
          className={styles.submit}
          icon='github'
          onClick={this._onClickGitHub}
        >
          Login with GitHub
        </Button>

        <Divider />

        <FormItem>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Please input your email.' }]
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
            rules: [{ required: true, message: 'Please input your password.' }]
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

          <Link
            className={styles.forgot}
            to='/forgot-password'
          >
            Forgot password
          </Link>

          <Button
            type='primary'
            htmlType='submit'
            className={styles.submit}
            loading={loading}
          >
            Log in
          </Button>

          Or <Link to='/signup'>register now!</Link>
        </FormItem>
      </Form>
    )
  }

  _onSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        this.setState({
          loading: true
        })
      }
    })
  }

  _onClickGitHub = (e) => {
    e.preventDefault()
    authGitHub({ location: this.props.location })
  }
}
