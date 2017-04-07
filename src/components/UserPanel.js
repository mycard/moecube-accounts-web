import { Dropdown, Menu } from 'antd';
import { connect } from 'dva';
import { Link } from 'dva/router';
import React from 'react';
import { FormattedMessage as Format } from 'react-intl';

const defaultAvatar = require('../../public/default_avatar.jpg');

function UserPanel({ dispatch, user, token }) {
  const { avatar } = user;
  const menu = (
    <Menu trigger={['click']}>
      <Menu.Item>
        {
          token ? <Link to="/profiles"><Format id="User-Center"/></Link> : <Link to="/signin"><Format id="sign-in"/></Link>
        }
      </Menu.Item>

      <Menu.Divider/>
      {
        token &&
        <Menu.Item >
          <div
            onClick={() => {
              dispatch({ type: 'auth/signOut' });
            }}
          >
            <Format id="sign-out"/>
          </div>
        </Menu.Item>
      }
    </Menu>
  );

  return (
    <Dropdown overlay={menu} placement="bottomCenter">
      <div className="ant-dropdown-link" style={{ display: 'flex', alignItems: 'center' }}>
        <img
          alt="avatar" src={avatar || defaultAvatar}
          style={{ borderRadius: '45px',
            height: '45px',
            weight: '45px',
            border: '2px solid rgba(255,255,255,0.2' }} />
      </div>
    </Dropdown>
  );
}

function mapStateToProps(state) {
  const {
    common: { messages, client, language },
    user: { user, token },
  } = state;
  return {
    token,
    user,
    language,
    messages,
    client,
  };
}

export default connect(mapStateToProps)(UserPanel);
