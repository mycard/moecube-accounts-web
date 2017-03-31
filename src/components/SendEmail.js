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

  onSubmit = (e) => {
    const { form, dispatch, data: {id} } = this.props

    e && e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        
        const { email, password } = values

        dispatch({type: "user/updateEmail", payload: { email, password, user_id: id }})
      }
    });
  }

  render(){

    const {form, dispatch, data, checkEmail, isEmailExists} = this.props
    const {getFieldDecorator} = form
    const {id, email} = data

    const emailProps = {
      fromItem: {
        label: "email",
        hasFeedback: true,
        validateStatus: checkEmail,
        help: isEmailExists ? 'email exists' : '',
        ...formItemLayout
      },
      decorator: {
        initialValue: email                        
      },
      input: {
        placeholder: "email"
      }
    }

    const passwordProps = {
      fromItem: {
        label: "passwrod",        
        ...formItemLayout
      },
      decorator: {
        rules: [
          { required: true, message: '密码至少为8-24位', pattern: /^.{8,24}$/ }
        ]
      },
      input: {
        placeholder: "password",
        type: 'password'
      }
    }
    
    return (
      <Form onSubmit={this.onSubmit}>
        <FormItem {...emailProps.fromItem}>
          {getFieldDecorator(`email`, {...emailProps.decorator})(
            <Input 
              {...emailProps.input} 
              onBlur = {() => dispatch({type: 'auth/checkEmail', payload: { ...form.getFieldsValue(), id} })}/>
          )}
        </FormItem>

        <FormItem {...passwordProps.fromItem}>
          {getFieldDecorator(`password`, {...passwordProps.decorator})(
            <Input {...passwordProps.input} />
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
    user: {data},
    auth: {isEmailExists, checkEmail}
  } = state
  return {
    data,
    checkEmail,
    isEmailExists
  };
}

const WrapperEmailForm = Form.create()(EmailForm)

export default connect(mapStateToProps)(WrapperEmailForm);

