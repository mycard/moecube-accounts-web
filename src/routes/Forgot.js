import { Button, Form, Icon, Input, Spin, Steps } from 'antd';
import { connect } from 'dva';
import { Link } from 'dva/router';
import React, { PropTypes } from 'react';
import { FormattedMessage as Format } from 'react-intl';

const FormItem = Form.Item;
const Step = Steps.Step;

class Login extends React.Component {

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

        const { email } = values;

        dispatch({ type: 'auth/forgot', payload: { account: email } });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { loading } = this.props;
    const { intl: { messages } } = this.context;
    return (
      <div style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <Spin spinning={loading} delay={100}>
          <Form onSubmit={this.onSubmitLogin} className="login-form">

            <Steps size="large" current={0}>
              <Step title={messages['send-email']} icon={<Icon type="solution"/>}/>
              <Step title={messages['verify-email']} icon={<Icon type="mail"/>}/>
            </Steps>

            <FormItem style={{ marginTop: '28px' }}>
              {getFieldDecorator('email', {
                rules: [{ required: true, message: 'Please input your username or email!' }],
              })(
                <Input
                  prefix={<Icon type="user" style={{ fontSize: 13 }}/>}
                  placeholder={messages['email-address-or-username']}
                />,
              )}
            </FormItem>

            <FormItem>
              <Button type="primary" htmlType="submit" className="login-form-button">
                <Format id={'send-email'}/>
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
    auth: { isForgotSubmit },
  } = state;

  const loading = state.loading.global || false;

  return {
    loading,
    isForgotSubmit,
  };
}

const WrapperLogin = Form.create()(Login);

export default connect(mapStateToProps)(WrapperLogin);
