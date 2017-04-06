import { Button, Form, Icon, Input, Spin } from 'antd';
import { connect } from 'dva';
import React, { PropTypes } from 'react';
import { FormattedMessage as Format } from 'react-intl';

const FormItem = Form.Item;

class Reset extends React.Component {

  static contextTypes = {
    intl: PropTypes.object.isRequired,
  };

  onSubmitReset = (e) => {
    const { form, dispatch, location: { query: { key, user_id } } } = this.props;

    if (e) {
      e.preventDefault();
    }
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);

        const { password } = values;
        console.log(this.props);
        dispatch({ type: 'auth/reset', payload: { password, key, user_id } });
      }
    });
  };

  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
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
    const { getFieldDecorator } = this.props.form;
    const { isResetSubmit = false } = this.props;
    const { intl: { messages } } = this.context;

    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <Spin spinning={isResetSubmit} delay={100}>
          <Form onSubmit={this.onSubmitReset} className="login-form">
            <FormItem>
              <h1><Format id="reset-password2"/></h1>
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: messages['Password can not be blank'] }],
              }, {
                validator: this.checkConfirm,
              })(
                <Input
                  prefix={<Icon type="lock" style={{ fontSize: 13 }}/>} type="password"
                  placeholder={messages.password}
                />,
              )}
            </FormItem>

            <FormItem>
              {getFieldDecorator('confirm', {
                rules: [{
                  required: true, message: messages['Incorrect-password.2'],
                }, {
                  validator: this.checkPassword,
                }],
              })(
                <Input type="password" onBlur={this.handleConfirmBlur} placeholder={messages['password-again']}/>,
              )}
            </FormItem>

            <Button type="primary" htmlType="submit" className="login-form-button">
              <Format id="reset-password2"/>
            </Button>
          </Form>
        </Spin>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {
    auth: { isResetSubmit },
  } = state;
  return {
    isResetSubmit,
  };
}

const WrapperReset = Form.create()(Reset);

export default connect(mapStateToProps)(WrapperReset);
