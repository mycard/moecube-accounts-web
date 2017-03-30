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
        
        const { username, password } = values

        dispatch({type: "user/updateAccount", payload: { username, password, user_id: id }})
      }
    });
  }

  render(){

    const {form, dispatch, data, checkUsername, isUserNameExists} = this.props
    const {getFieldDecorator} = form
    const {id, username} = data

    const usernameProps = {
      fromItem: {
        label: "username",
        hasFeedback: true,
        validateStatus: checkUsername,
        help: isUserNameExists ? 'username exists' : '',
        ...formItemLayout
      },
      decorator: {
        initialValue: username                        
      },
      input: {
        placeholder: "username",
        onBlur: () => dispatch({type: 'auth/checkUsername', payload: { ...form.getFieldsValue(), user_id: id } }),
      }
    }

    const passwordProps = {
      fromItem: {
        label: "passwrod",        
        ...formItemLayout
      },
      decorator: {
        rules: [
          { required: true, message: '密码至少为8-24位', pattern: /^.{8,24}$/ },
        ]
      },
      input: {
        placeholder: "password",
        type: 'password'
      }
    }
    
    return (
      <Form onSubmit={this.onSubmit}>
        <FormItem {...usernameProps.fromItem}>
          {getFieldDecorator(`username`, {...usernameProps.decorator})(
            <Input {...usernameProps.input}/>
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
    auth: {isUserNameExists, checkUsername}
  } = state
  return {
    data,
    checkUsername,
    isUserNameExists
  };
}

const WrapperEmailForm = Form.create()(EmailForm)

export default connect(mapStateToProps)(WrapperEmailForm);

