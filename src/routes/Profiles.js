import { Button, Form, Icon, Input, Spin, Tabs } from 'antd';
import { connect } from 'dva';
import React from 'react';
import EmailForm from '../components/EmailForm';
import PasswordForm from '../components/PasswordForm';
import UserNameForm from '../components/UserNameForm';
import styles from './Profiles.less';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;


const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 15 },
};

class Profiles extends React.Component {

  onUpdateSubmit = (e) => {
    const { form, dispatch, data: { id } } = this.props;

    e && e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);

        const { username, nickname, password } = values;

        dispatch({type: "user/updateProfile", payload: { username, name, password, user_id: id }})
      }
    });
  };

  render() {
    const { dispatch, form, data, isUpdateSubmit=false, checkUsername, isUserNameExists } = this.props
    const { getFieldDecorator } = form;    
    const { username, name, id } = data

    const nameProps = {
      fromItem: {
        label: "name",
        ...formItemLayout
      },
      decorator: {
        initialValue: name                        
      },
      input: {
        placeholder: "name",
      }
    }

    return (
      <Spin spinning={isUpdateSubmit} delay={500}>
        <Tabs defaultActiveKey="1" className="app-detail-nav">
          <TabPane tab={<span><Icon type="setting" /> 基本信息 </span>} key="1">
            <Form onSubmit={this.onUpdateSubmit}>

              <FormItem {...nameProps.fromItem}>
                {getFieldDecorator(`name`, {...nameProps.decorator})(
                  <Input {...nameProps.input}/>
                )}
              </FormItem>

              <FormItem>
                <div className={styles.wrapSubmit}>
                  <Button type="primary" htmlType="submit" size="large">提交</Button>
                </div>
              </FormItem>
            </Form>
          </TabPane>

          <TabPane tab={<span><Icon type="setting" /> 账户信息 </span>} key="2">

            <Tabs type="card" className="app-detail-nav">
              <TabPane tab={'修改用户名'} key={0}>
                <UserNameForm />
              </TabPane>

              <TabPane tab={'修改邮箱'} key={1}>
                <EmailForm />
              </TabPane>

              <TabPane tab={'修改密码'} key={2}>
                <PasswordForm />
              </TabPane>
            </Tabs>

          </TabPane>
        </Tabs>
      </Spin>
    );
  }
}

function mapStateToProps(state) {
  const {
    user: { data, isUpdateSubmit },
    auth: { checkUsername, isEmailExists, isUserNameExists, },
  } = state;
  return {
    data,
    checkUsername,
    isEmailExists,
    isUserNameExists,
    isUpdateSubmit,
  };
}

const WrapperProfiles = Form.create()(Profiles);

export default connect(mapStateToProps)(WrapperProfiles);
