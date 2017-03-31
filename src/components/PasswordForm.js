import React from 'react';
import styles from './EmailForm.css';
import {connect} from 'react-redux'
import { Form, Input, Icon, Button } from 'antd'
const FormItem = Form.Item;
import SubmitButton from './SubmitButton'

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 15 },
}


class EmailForm extends React.Component {

  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('new_password')) {
      callback('两次密码输入不符');
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

  onSubmit = (e) => {
    const { form, dispatch, data: {id} } = this.props

    e && e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        
        const { new_password, password } = values

        dispatch({type: "user/updateAccount", payload: { new_password, password, user_id: id }})
      }
    });
  }

  render(){

    const {form } = this.props
    const {getFieldDecorator} = form

    const passwordProps = {
      fromItem: {
        label: "passwrod",        
        ...formItemLayout
      },
      decorator: {
        rules: [
          { required: true, message: '密码至少为8-24位', pattern: /^.{8,24}$/ },
          { validator: this.checkConfirm }
        ]
      },
      input: {
        placeholder: "password",
        type: 'password'
      }
    }

    const confirmProps = {
      fromItem: {
        label: "comfirm",        
        ...formItemLayout
      },
      decorator: {
        rules: [
          { required: true, message: '密码至少为8-24位', pattern: /^.{8,24}$/}, 
          { validator: this.checkPassword}
        ]
      },
      input: {
        placeholder: "confirm",
        type: 'password'
      }
    }
    
    return (
      <Form onSubmit={this.onSubmit}>          
        <FormItem {...passwordProps.fromItem} label="old password">
          {getFieldDecorator(`password`, {...passwordProps.decorator})(
            <Input {...passwordProps.input} />
          )}
        </FormItem>

        <FormItem {...passwordProps.fromItem} label="new password">
          {getFieldDecorator(`new_password`, {...passwordProps.decorator})(
            <Input {...passwordProps.input} />
          )}
        </FormItem>

        <FormItem {...confirmProps.fromItem}>
          {getFieldDecorator(`confirm`, {...confirmProps.decorator})(
            <Input {...confirmProps.input} />
          )}
        </FormItem>

        <FormItem>
          <SubmitButton />
        </FormItem>
      </Form>
    );
  }
}




function mapStateToProps(state, props) {
  const {
    user: {data}
  } = state
  return {
    data,
  };
}

const WrapperEmailForm = Form.create()(EmailForm)

export default connect(mapStateToProps)(WrapperEmailForm);

