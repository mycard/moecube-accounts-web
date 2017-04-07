import { Button, Form, Icon, Input, Spin, Steps } from 'antd';
import { connect } from 'dva';
import { Link } from 'dva/router';
import React, { PropTypes } from 'react';
import { FormattedMessage as Format } from 'react-intl';

const FormItem = Form.Item;
const Step = Steps.Step;


class Register extends React.Component {

  static contextTypes = {
    intl: PropTypes.object.isRequired,
  };

  onSubmitLogin = (e) => {
    const { form, dispatch } = this.props;

    if (e) {
      e.preventDefault();
    }
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);

        const { email, username, password } = values;

        dispatch({ type: 'auth/register', payload: { email, username, password } });
      }
    });
  };


  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback(this.context.intl.messages['Incorrect-password.2']);
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
    const {
      dispatch, form, checkEmail, checkUsername,
      isEmailExists, isUserNameExists, loading,
    } = this.props;
    const { getFieldDecorator } = form;
    const { intl: { messages } } = this.context;

    const emailProps = {
      hasFeedback: true,
      validateStatus: checkEmail,
      extra: isEmailExists ? messages.i_email_exists : '',
    };


    const emailInputProps = {
      onBlur: () => !form.getFieldError('email') && dispatch({ type: 'auth/checkEmail', payload: { ...form.getFieldsValue() } }),
      placeholder: messages.email,
    };

    const usernameProps = {
      hasFeedback: true,
      validateStatus: checkUsername,
      extra: isUserNameExists ? 'username exists' : '',
    };

    const usernameInputProps = {
      onBlur: () => !form.getFieldError('username') && dispatch({ type: 'auth/checkUsername', payload: { ...form.getFieldsValue() } }),
      placeholder: messages.username,
    };

    return (
      <div style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', height: '100%' }}>

        <Spin spinning={loading} delay={100}>
          <Steps size="large" current={0}>
            <Step title={messages['sign-up']} icon={<Icon type="solution"/>}/>
            <Step title={messages['verify-email']} icon={<Icon type="mail"/>}/>
          </Steps>

          <Form onSubmit={this.onSubmitLogin} className="login-form" style={{ marginTop: '24px' }}>
            <FormItem {...emailProps} >
              {getFieldDecorator('email', {
                rules: [{
                  required: true,
                  message: messages['Please-use-a-correct-E-Mail-address.'],
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
                  message: messages['You-can-not-use-this-username.'],
                  pattern: /^[A-Za-z0-9_\u4E00-\u9FD5\u3400-\u4DBF\u{20000}-\u{2A6DF}\u{2A700}-\u{2CEAF}\uF900–\uFAFF\u{2F800}-\u{2FA1D}\uAC00–\uD7AF\u3040-\u30FF\u31F0–\u31FF\u{1B000}–\u{1B0FF}\u3005]+$/u,
                }],
              }, {})(
                <Input {...usernameInputProps} />,
              )}
            </FormItem>

            <FormItem hasFeedback>
              {getFieldDecorator('password', {
                rules: [{
                  required: true,
                  message: messages['Password-length-must-be-between-8-and-24-characters.'],
                  pattern: /^.{8,24}$/,
                }],
              }, {
                validator: this.checkConfirm,
              })(
                <Input
                  prefix={<Icon type="lock" style={{ fontSize: 13 }}/>}
                  type="password"
                  placeholder={messages.password}
                />,
              )}
            </FormItem>

            <FormItem hasFeedback>
              {getFieldDecorator('confirm', {
                rules: [{
                  required: true,
                  message: messages['Password-length-must-be-between-8-and-24-characters.'],
                  pattern: /^.{8,24}$/,
                }, {
                  validator: this.checkPassword,
                }],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ fontSize: 13 }}/>}
                  type="password"
                  onBlur={this.handleConfirmBlur}
                  placeholder={messages['password-again']}
                />,
              )}
            </FormItem>

            <FormItem>
              <Button type="primary" htmlType="submit" className="login-form-button">
                <Format id={'sign-up'}/>
              </Button>
            </FormItem>

            <div>
              <Link to="/signin"><Format id={'sign-in'}/></Link>
            </div>
          </Form>
        </Spin>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {
    auth: {
      register, checkEmail, checkUsername, isEmailExists,
      isUserNameExists, isRegisterSubmit,
    },
  } = state;

  const loading = state.loading.global || false;

  return {
    loading,
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
