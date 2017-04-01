import { Button, Form, Icon, Input, Select, Spin, Steps } from 'antd';
import { connect } from 'dva';
import { Link } from 'dva/router';
import React, { PropTypes } from 'react';
import { FormattedMessage as Format } from 'react-intl';

const FormItem = Form.Item;
const Option = Select.Option;
const Step = Steps.Step


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

  static contextTypes = {
    intl: PropTypes.object.isRequired,
  }

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
    const { loading } = this.props;
    const { intl: { messages } } = this.context;
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <Spin spinning={loading} delay={100}>
          <Form onSubmit={this.onSubmitLogin} className="login-form">

            <Steps size="large" current={0}>
              <Step title={messages['send-email']} icon={<Icon type="solution" />} />
              <Step title={messages['verify-email']} icon={<Icon type="mail" />} />
            </Steps>

            <FormItem style={{ marginTop: '28px'}}>
              {getFieldDecorator('email', {
                rules: [{ required: true, message: 'Please input your username or email!' }],
              })(
                <Input prefix={<Icon type="user" style={{ fontSize: 13 }}/>} placeholder={messages['email-address-or-username']} />,
              )}
            </FormItem>
            <Button type="primary" htmlType="submit" className="login-form-button">
              <Format id={'send-email'} />
            </Button>
            <div>
              <Link to="/signin"><Format id={'sign-in'} /></Link>
            </div>
          </Form>
        </Spin>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  const {
    auth: { isForgotSubmit },
  } = state;

  const loading = state.loading.global || false

  return {
    loading,
    isForgotSubmit,
  };
}

const WrapperLogin = Form.create()(Login);

export default connect(mapStateToProps)(WrapperLogin);
