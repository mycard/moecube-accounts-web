import { Dropdown, Menu } from 'antd';
import { connect } from 'dva';
import { Link } from 'dva/router';
import React from 'react';
// import { FormattedMessage as Format } from 'react-intl';
import Format from '../components/Format'

const defaultAvatar = require('../../public/default_avatar.jpg');

function UserPanel({ dispatch, user }) {
  const { avatar } = user;
  const menu = (
    <Menu trigger={['click']}>
      <Menu.Item>
        {
          user.active ? <Link to="/profiles"><Format id="User-Center"/></Link> : <Link to="/signin"><Format id="sign-in"/></Link>
        }
      </Menu.Item>

      <Menu.Divider/>
      
      {
        !user.active &&
        <Menu.Item >
          <Link to="/signup"><Format id="register"/></Link>
        </Menu.Item>
      }


      {
        user.active &&
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
            height: '40px',
            weight: '40px',
            boxSizing: 'content-box',
            border: '2px solid rgba(255,255,255,0.3' }} />
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
