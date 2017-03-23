import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router'
import styles from './Login.less';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;


const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

class Login extends React.Component {


  onSubmitLogin = (e) => {
    const { form, dispatch, isSubmit, params: { id }} = this.props

    e && e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        
        const {email, username, nickname, password, confirm} = values


        dispatch({type: "auth/register", payload: {email, username, nickname, password, password2: confirm, submit: isSubmit}})
      }
    });
  }

  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }

  checkConfirm = (rule, value, callback) => {
    const form = this.props.form;
    if (value) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  checkUsername = (rule, value, callback) => {
    const { form, dispatch } = this.props

    callback();
  }

  checkEmail= (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }   
  }

  render() {
    const { getFieldDecorator, dispatch } = this.props.form;
    return (
      <div style={{ display: 'flex', justifyContent:'center', alignItems: 'center', height: '100%'}}>
        <Form onSubmit={this.onSubmitLogin} className="login-form">
          <FormItem hasFeedback  >
            {getFieldDecorator('email', {
              rules: [{ required: true, message: 'Please input your email!' }],
            }, {
              validator: this.checkEmail
            })(
              <Input  placeholder="Email" />
            )}
          </FormItem>

          <FormItem hasFeedback >
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input your username!' }],
            }, {
              validator: this.checkUsername
            })(
              <Input  placeholder="Username" />
            )}
          </FormItem>

          <FormItem hasFeedback >
            {getFieldDecorator('nickname', {
              rules: [{ required: true, message: 'Please input your nickname!' }],
            })(
              <Input  placeholder="nickname[optional]" />
            )}
          </FormItem>

          <FormItem hasFeedback >
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            }, {
              validator: this.checkConfirm
            })(
              <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
            )}
          </FormItem>

          <FormItem hasFeedback >
            {getFieldDecorator('confirm', {
              rules: [{
                required: true, message: 'Please confirm your password!',
              }, {
                validator: this.checkPassword,
              }],
            })(
              <Input type="password" onBlur={this.handleConfirmBlur} placeholder="Password Again" />
            )}
          </FormItem>
            
          <Button type="primary" htmlType="submit" className="login-form-button">
            Register
          </Button>
          Or <Link to="/login">Sign in!</Link>
        </Form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {
    auth: { isSubmit, register }
  } = state
  return {
    isSubmit,
    register
  };
}

const WrapperLogin = Form.create()(Login)

export default connect(mapStateToProps)(WrapperLogin);
