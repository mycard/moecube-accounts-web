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

class Reset extends React.Component {

  onSubmitReset = (e) => {
    const { form, dispatch, location: { query: { key, user_id  }}} = this.props

    e && e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        
        const {password} = values
        console.log(this.props)
        dispatch({type: "auth/reset", payload: { password, key, user_id}})
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

  render() {
    const { getFieldDecorator, dispatch } = this.props.form;
    return (
      <div style={{ display: 'flex', justifyContent:'center', alignItems: 'center', height: '100%'}}>
        <Form onSubmit={this.onSubmitReset} className="login-form">

          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            }, {
              validator: this.checkConfirm
            })(
              <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
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
              <Input type="password" onBlur={this.handleConfirmBlur} placeholder="Password Again" />
            )}
          </FormItem>
            
          <Button type="primary" htmlType="submit" className="login-form-button">
            Submit
          </Button>
        </Form>
      </div>
    )
  }
}

function mapStateToProps(state, props) {
  return {};
}

const WrapperReset = Form.create()(Reset)

export default connect(mapStateToProps)(WrapperReset);
