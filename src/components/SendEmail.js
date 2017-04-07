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
  };

  onSubmit = (e) => {
    const { form, dispatch, user: { id } } = this.props;
    if (e) {
      e.preventDefault();
    }
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);

        const { email, password } = values;

        dispatch({ type: 'user/updateEmail', payload: { email, password, user_id: id } });
      }
    });
  };

  render() {
    const { form, dispatch, user, checkEmail, isEmailExists } = this.props;
    const { getFieldDecorator } = form;
    const { id, email } = user;
    const { intl: { messages } } = this.context;

    const emailProps = {
      fromItem: {
        label: messages.email,
        hasFeedback: true,
        validateStatus: checkEmail,
        help: isEmailExists ? 'email exists' : '',
        ...formItemLayout,
      },
      decorator: {
        initialValue: email,
      },
      input: {
        placeholder: messages.email,
      },
    };


    return (
      <Form onSubmit={this.onSubmit}>
        <FormItem {...emailProps.fromItem}>
          {getFieldDecorator('email', { ...emailProps.decorator })(
            <Input
              {...emailProps.input}
              onBlur={() => dispatch({ type: 'auth/checkEmail', payload: { ...form.getFieldsValue(), user_id: id } })}
            />,
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
    auth: { isEmailExists, checkEmail, isSendEmailActive },
  } = state;
  return {
    user,
    checkEmail,
    isEmailExists,
    isSendEmailActive,
  };
}

const WrapperEmailForm = Form.create()(EmailForm);

export default connect(mapStateToProps)(WrapperEmailForm);

