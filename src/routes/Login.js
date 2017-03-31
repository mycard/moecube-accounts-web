import { Button, Checkbox, Form, Icon, Input, Spin } from 'antd';
import { connect } from 'dva';
import { Link } from 'dva/router';
import React, { PropTypes } from 'react';
import { FormattedMessage as Format } from 'react-intl';
import './Login.less';

const FormItem = Form.Item;


class Login extends React.Component {

  static contextTypes = {
    intl: PropTypes.object.isRequired,
  }

  onSubmitLogin = (e) => {
    const { form, dispatch } = this.props;
    if (e) {
      e.preventDefault();
    }

    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const { account, password } = values;
        dispatch({ type: 'auth/login', payload: { account, password } });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { isLoginSubmit = false } = this.props;
    const { intl: { messages } } = this.context;

    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <Spin spinning={isLoginSubmit} delay={500}>
          <Form onSubmit={this.onSubmitLogin} className="login-form">
            <FormItem>
              {getFieldDecorator('account', {
                rules: [{ required: true, message: messages['Please input your account!'] }],
              })(
                <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder={messages['email-address-or-username']} />,
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: messages['Please input your Password!'] }],
              })(
                <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder={messages.password} />,
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(
                <Checkbox><Format id={'remember-me'} /></Checkbox>,
              )}
              <Link to="/forgot" className="login-form-forgot"><Format id={'forgot-password'} /></Link>
              <Button type="primary" htmlType="submit" className="login-form-button">
                <Format id={'login'} />
              </Button>
              Or <Link to="/register"><Format id={'register-now'} /></Link>
            </FormItem>
          </Form>
        </Spin>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {
    common: { language },
    auth: { isLoginSubmit },
  } = state;
  return {
    language,
    isLoginSubmit,
  };
}

const WrapperLogin = Form.create()(Login);

export default connect(mapStateToProps)(WrapperLogin);
