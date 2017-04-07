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

        const { new_password, password } = values;

        dispatch({ type: 'user/updateAccount', payload: { new_password, password, user_id: id } });
      }
    });
  };

  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    const { intl: { messages } } = this.context;
    if (value && value !== form.getFieldValue('new_password')) {
      callback(messages['Incorrect-password.2']);
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
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const { intl: { messages } } = this.context;

    const passwordProps = {
      fromItem: {
        label: messages['old-password'],
        ...formItemLayout,
      },
      decorator: {
        rules: [
          {
            required: true,
            message: messages['Password-length-must-be-between-8-and-24-characters.'],
            pattern: /^.{8,24}$/,
          },
          { validator: this.checkConfirm },
        ],
      },
      input: {
        placeholder: messages['old-password'],
        type: 'password',
      },
      input2: {
        placeholder: messages['new-password'],
        type: 'password',
      },
    };

    const confirmProps = {
      fromItem: {
        label: messages['password-again'],
        ...formItemLayout,
      },
      decorator: {
        rules: [
          {
            required: true,
            message: messages['Password-length-must-be-between-8-and-24-characters.'],
            pattern: /^.{8,24}$/,
          },
          { validator: this.checkPassword },
        ],
      },
      input: {
        placeholder: messages['password-again'],
        type: 'password',
      },
    };

    return (
      <Form onSubmit={this.onSubmit}>
        <FormItem {...passwordProps.fromItem} label={messages['old-password']}>
          {getFieldDecorator('password')(
            <Input {...passwordProps.input} />,
          )}
        </FormItem>

        <FormItem {...passwordProps.fromItem} label={messages['new-password']}>
          {getFieldDecorator('new_password', { ...passwordProps.decorator })(
            <Input {...passwordProps.input2} />,
          )}
        </FormItem>

        <FormItem {...confirmProps.fromItem}>
          {getFieldDecorator('confirm', { ...confirmProps.decorator })(
            <Input {...confirmProps.input} />,
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
  } = state;
  return {
    user,
  };
}

const WrapperEmailForm = Form.create()(EmailForm);

export default connect(mapStateToProps)(WrapperEmailForm);

