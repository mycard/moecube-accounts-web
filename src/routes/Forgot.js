import { Button, Form, Icon, Input, Select, Spin } from 'antd';
import { connect } from 'dva';
import { Link } from 'dva/router';
import React from 'react';
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
    const { form, dispatch, params: { id } } = this.props;

    e && e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);

        const { email } = values;

        dispatch({ type: 'auth/forgot', payload: { account: email } });
      }
    });
  };

  render() {
    const { getFieldDecorator, dispatch } = this.props.form;
    const { isForgotSubmit = false } = this.props;

    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <Spin spinning={isForgotSubmit} delay={500}>
          <Form onSubmit={this.onSubmitLogin} className="login-form">
            <FormItem>
              {getFieldDecorator('email', {
                rules: [{ required: true, message: 'Please input your username or email!' }],
              })(
                <Input prefix={<Icon type="user" style={{ fontSize: 13 }}/>} placeholder="username or email"/>,
              )}
            </FormItem>

            <Button type="primary" htmlType="submit" className="login-form-button">
              Send
            </Button>
            Or <Link to="/login">Sign In</Link>
          </Form>
        </Spin>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {
    auth: { isForgotSubmit },
  } = state;
  return {
    isForgotSubmit,
  };
}

const WrapperLogin = Form.create()(Login);

export default connect(mapStateToProps)(WrapperLogin);
