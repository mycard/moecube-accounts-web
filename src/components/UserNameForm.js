import { Form, Input } from 'antd';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import SubmitButton from './SubmitButton';

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 15 },
};


class EmailForm extends React.Component {

  static contextTypes = {
    intl: PropTypes.object.isRequired,
  }
  onSubmit = (e) => {
    const { form, dispatch, data: { id } } = this.props;

    e && e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);

        const { username, password } = values;

        dispatch({ type: 'user/updateAccount', payload: { username, password, user_id: id } });
      }
    });
  };

  render() {

    const { form, dispatch, data, checkUsername, isUserNameExists } = this.props;
    const { getFieldDecorator } = form;
    const { id, username } = data;
    const { intl: { messages } } = this.context;

    const usernameProps = {
      fromItem: {
        label: messages.username,
        hasFeedback: true,
        validateStatus: checkUsername,
        help: isUserNameExists ? 'username exists' : '',
        ...formItemLayout
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
        ...formItemLayout
      },
      decorator: {
        rules: [
          { required: true, message: messages['Password length must be between 8 and 24 characters'], pattern: /^.{8,24}$/ },
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
            <Input {...usernameProps.input}/>,
          )}
        </FormItem>

        <FormItem {...passwordProps.fromItem}>
          {getFieldDecorator('password')(
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


function mapStateToProps(state, props) {
  const {
    user: { data },
    auth: { isUserNameExists, checkUsername },
  } = state;
  return {
    data,
    checkUsername,
    isUserNameExists,
  };
}

const WrapperEmailForm = Form.create()(EmailForm);

export default connect(mapStateToProps)(WrapperEmailForm);

