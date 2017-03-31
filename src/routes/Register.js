import { Button, Form, Icon, Input, Select, Spin } from 'antd';
import { connect } from 'dva';
import { Link } from 'dva/router';
import React, { PropTypes } from 'react';
import { FormattedMessage as Format } from 'react-intl';
const FormItem = Form.Item;
const Option = Select.Option;


class Register extends React.Component {

  static contextTypes = {
    intl: PropTypes.object.isRequired,
  }

  onSubmitLogin = (e) => {
    const { form, dispatch, params: { id } } = this.props;

    e && e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);

        const { email, username, nickname, password, confirm } = values;

        dispatch({ type: 'auth/register', payload: { email, username, nickname, password } });
      }
    });
  };


  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback(this.context.intl.messages['Incorrect password.2']);
    } else {
      callback();
    }
  };

  checkConfirm = (rule, value, callback) => {
    const form = this.props.form;
    if (value) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  render() {
    const { dispatch, register, form, checkEmail, checkUsername, isEmailExists, isUserNameExists, isRegisterSubmit, } = this.props;
    const { getFieldDecorator, } = form;
    const { email = {}, username = {}, password = {} } = register;
    const { intl: { messages } } = this.context;

    const emailProps = {
      hasFeedback: true,
      validateStatus: checkEmail,
      help: isEmailExists ? 'email exists' : '',
    };

    const emailInputProps = {
      onBlur: () => dispatch({ type: 'auth/checkEmail', payload: { ...form.getFieldsValue() } }),
      placeholder: messages.email,
    };

    const usernameProps = {
      hasFeedback: true,
      validateStatus: checkUsername,
      help: isUserNameExists ? 'username exists' : '',
    };

    const usernameInputProps = {
      onBlur: () => dispatch({ type: 'auth/checkUsername', payload: { ...form.getFieldsValue() } }),
      placeholder: messages.username,
    };

    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <Spin spinning={isRegisterSubmit} delay={500}>
          <Form onSubmit={this.onSubmitLogin} className="login-form">
            <FormItem {...emailProps}  >
              {getFieldDecorator('email', {
                rules: [{
                  required: true,
                  message: messages['Please use a correct E-Mail address.'],
                  pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
                }],
              }, {})(
                <Input {...emailInputProps} />,
              )}
            </FormItem>

            <FormItem {...usernameProps}>
              {getFieldDecorator('username', {
                rules: [{
                  required: true,
                  message: messages['You can not use this username.'],
                  pattern: /^[A-Za-z0-9_\u4E00-\u9FD5\u3400-\u4DBF\u{20000}-\u{2A6DF}\u{2A700}-\u{2CEAF}\uF900–\uFAFF\u{2F800}-\u{2FA1D}\uAC00–\uD7AF\u3040-\u30FF\u31F0–\u31FF\u{1B000}–\u{1B0FF}\u3005]+$/u,
                }],
              }, {})(
                <Input {...usernameInputProps}/>,
              )}
            </FormItem>

            <FormItem >
              {getFieldDecorator('nickname', {})(
                <Input placeholder={messages.nickname} />,
              )}
            </FormItem>

            <FormItem hasFeedback>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '密码至少为8-24位', pattern: /^.{8,24}$/ }],
              }, {
                validator: this.checkConfirm,
              })(
                <Input
                  prefix={<Icon type="lock" style={{ fontSize: 13 }}/>}
                  type="password"
                  placeholder={messages.password}/>,
              )}
            </FormItem>

            <FormItem hasFeedback>
              {getFieldDecorator('confirm', {
                rules: [{
                  required: true, message: '密码至少为8-24位', pattern: /^.{8,24}$/,
                }, {
                  validator: this.checkPassword,
                }],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ fontSize: 13 }}/>}
                  type="password"
                  onBlur={this.handleConfirmBlur}
                  placeholder={messages['password-again']}/>,
              )}
            </FormItem>

            <Button type="primary" htmlType="submit" className="login-form-button">
              <Format id={'sign-up'} />
            </Button>
            Or <Link to="/login"><Format id={'sign-in'} /></Link>
          </Form>
        </Spin>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {
    auth: { register, checkEmail, checkUsername, isEmailExists, isUserNameExists, isRegisterSubmit },
  } = state;
  return {
    register,
    checkEmail,
    checkUsername,
    isEmailExists,
    isUserNameExists,
    isRegisterSubmit,
  };
}

const WrapperRegister = Form.create()(Register);

export default connect(mapStateToProps)(WrapperRegister);
