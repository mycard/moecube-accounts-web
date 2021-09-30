import { Form, Input } from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import SubmitButton from './SubmitButton';

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 15 },
};


class EmailForm extends React.Component {

  onSubmit = (e) => {
    const { form, dispatch, user: { id } } = this.props;

    if (e) {
      e.preventDefault();
    }
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);

        const { username, password } = values;

        dispatch({ type: 'user/updateAccount', payload: { username, password, user_id: id } });
      }
    });
  };

  render() {
    const { form, dispatch, user, checkUsername, isUserNameExists, messages } = this.props;
    const { getFieldDecorator } = form;
    const { id, username } = user;

    const usernameProps = {
      fromItem: {
        label: messages.username,
        hasFeedback: true,
        validateStatus: checkUsername,
        extra: isUserNameExists ? 'username exists' : '',
        ...formItemLayout,
      },
      decorator: {
        initialValue: username,
      },
      input: {
        placeholder: messages.username,
        onBlur: () => dispatch({ type: 'auth/checkUsername', payload: { ...form.getFieldsValue(), user_id: id } }),
      },
    };

    const passwordProps = {
      fromItem: {
        label: messages.password,
        ...formItemLayout,
      },
      decorator: {
        rules: [
          {
            required: true,
            message: messages['Password-length-must-be-between-8-and-24-characters.'],
            pattern: /^.{8,24}$/,
          },
        ],
      },
      input: {
        placeholder: messages.password,
        type: 'password',
      },
    };

    return (
      <Form onSubmit={this.onSubmit}>
        <FormItem {...usernameProps.fromItem}>
          {getFieldDecorator('username', { ...usernameProps.decorator })(
            <Input {...usernameProps.input} disabled />,
          )}
          {
            <div class="alert alert-warning" role="alert">修改用户名后战绩会清零、也会失去绑定的云卡组。建议提前备份卡组。改名在10月8日23：59关闭。并且需要点击切换用户按钮来重新登录，才可以进入游戏。</div>
          }

        </FormItem>

        <FormItem {...passwordProps.fromItem}>
          {getFieldDecorator('password', { ...passwordProps.decorator })(
            <Input {...passwordProps.input} />,
          )}
        </FormItem>

        <FormItem>
          <SubmitButton />
        </FormItem>
      </Form>
    );
  }
}


function mapStateToProps(state) {
  const {
    user: { user },
    auth: { isUserNameExists, checkUsername },
    common: { messages },
  } = state;
  return {
    user,
    messages,
    checkUsername,
    isUserNameExists,
  };
}

const WrapperEmailForm = Form.create()(EmailForm);

export default connect(mapStateToProps)(WrapperEmailForm);
