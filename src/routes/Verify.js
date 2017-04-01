import React from 'react';
import { connect } from 'dva';
import styles from './Verify.css';
import { Form, Input, Steps, Icon, Spin, Alert, Tag } from 'antd';
import { routerRedux } from 'dva/router'
const FormItem = Form.Item;
import SubmitButton from '../components/SubmitButton'

const Step = Steps.Step

class Verify extends React.Component {

  state = {
    isChangeEmail: false
  }

  onSubmit = (e) => {
    const { form, dispatch, input: { password }, user: { id }} = this.props;

    e && e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);

        const { email } = values

        dispatch({ type: 'user/updateEmail', payload: { email, password, user_id: id } });
      }
    });
  };

  onReSend = (e) => {
    const { dispatch, input: { password }, user: { id, email }} = this.props;

    e && e.preventDefault();

    dispatch({ type: 'user/updateEmail', payload: { email, password, user_id: id } });
  };

  render() {
    const { form, dispatch, user, checkEmail, isEmailExists, loading, input } = this.props
    const { getFieldDecorator } = form;
    const { id, email } = user;

    const emailProps = {
      fromItem: {
        label: "修改邮箱",
        hasFeedback: true,
        validateStatus: checkEmail,
        help: isEmailExists ? 'email exists' : '',
      },
      decorator: {
        initialValue: email
      },
      input: {
        placeholder: "email"
      }
    }
    

    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>

        <Spin spinning={loading} delay={100}>
          <Steps size="large" current={1}>
            <Step title="Register" icon={<Icon type="solution" />} />
            <Step title="Verify Email" icon={<Icon type="mail" />} />
          </Steps>

          {id && input["password"]  ? 
          <Alert
            style={{ marginTop: '24px' }}
            message={
              <div>
                <span style={{marginRight: '10px'}}>验证邮件已发送，请查收~</span>
                <Tag color="blue" onClick={this.onReSend}>重发</Tag>                
                <Tag color="orange" onClick={() => this.setState({ isChangeEmail: true })}>
                  修改邮箱
                </Tag>
              </div>
            }
            type="warning"
            showIcon
          />
          : 
          <Alert
            style={{ marginTop: '24px' }}
            message={
              <div>
                <span style={{marginRight: '10px'}}>您尚未登录，请先登录</span>
                <Tag color="blue" onClick={ () => dispatch(routerRedux.replace("/signin"))}>登录</Tag>                
              </div>
            }
            type="warning"
            showIcon
          />
          }

          {
            this.state.isChangeEmail && 
            <Form onSubmit={this.onSubmit} className="login-form" style={{ marginTop: '24px' }}>
              <FormItem {...emailProps.fromItem}>
                {getFieldDecorator('email', { ...emailProps.decorator })(
                  <Input
                    {...emailProps.input}
                    onBlur={() => dispatch({ type: 'auth/checkEmail', payload: { ...form.getFieldsValue(), id } })} />
                )}
              </FormItem>

              <FormItem>
                <SubmitButton disabled={isEmailExists} />
              </FormItem>
            </Form>
          }
          
        </Spin>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  const {
    user: { user } ,
    auth: { input, isEmailExists, checkEmail }
  } = state

  const loading = state.loading.global || false

  return {
    input,
    user,
    loading,    
    checkEmail,
    isEmailExists,
  };
}

const WrapperVerify = Form.create()(Verify);

export default connect(mapStateToProps)(WrapperVerify);
