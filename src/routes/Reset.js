import { Button, Form, Icon, Input, Select, Spin } from 'antd';
import { connect } from 'dva';
import React from 'react';
const FormItem = Form.Item;
const Option = Select.Option;


class Reset extends React.Component {

  onSubmitReset = (e) => {
    const { form, dispatch, location: { query: { key, user_id } } } = this.props;

    e && e.preventDefault();
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
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <Spin spinning={isResetSubmit} delay={100}>
          <Form onSubmit={this.onSubmitReset} className="login-form">

            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              }, {
                validator: this.checkConfirm,
              })(
                <Input prefix={<Icon type="lock" style={{ fontSize: 13 }}/>} type="password" placeholder="Password"/>,
              )}
            </FormItem>

            <FormItem>
              {getFieldDecorator('confirm', {
                rules: [{
                  required: true, message: 'Please confirm your password!',
                }, {
                  validator: this.checkPassword,
                }],
              })(
                <Input type="password" onBlur={this.handleConfirmBlur} placeholder="Password Again"/>,
              )}
            </FormItem>

            <Button type="primary" htmlType="submit" className="login-form-button">
              Submit
            </Button>
          </Form>
        </Spin>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  const {
    auth: { isResetSubmit },
  } = state;
  return {
    isResetSubmit,
  };
}

const WrapperReset = Form.create()(Reset);

export default connect(mapStateToProps)(WrapperReset);
