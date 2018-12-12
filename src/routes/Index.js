import { Dropdown, Icon, Layout, Menu } from 'antd';
import { connect } from 'dva';
import { Link } from 'dva/router';
import React from 'react';
import Particles from 'react-particles-js';
import DocumentTitle from 'react-document-title';
// import { FormattedMessage as Format } from 'react-intl';
import Format from '../components/Format';
import logo from '../assets/MoeCube.png';
import UserPanel from '../components/UserPanel';

const languageMap = {
  'zh-CN': '中文',
  'en-US': 'English',
};

const { Header, Footer } = Layout;
const particleConfig = {
  particles: {
    number: {
      value: 20,
      density: {
        enable: true,
        value_area: 1000,
      },
    },
    color: {
      value: '#888',
      opacity: 0.4,
    },
    shape: {
      type: 'circle',
      stroke: {
        width: 4,
        color: '#888',
        opacity: 0.4,
      },
      polygon: {
        nb_sides: 5,
      },
      image: {
        src: 'img/github.svg',
        width: 100,
        height: 100,
      },
    },
    opacity: {
      value: 0.5,
      random: false,
      anim: {
        enable: false,
        speed: 1,
        opacity_min: 0.1,
        sync: false,
      },
    },
    size: {
      value: 3,
      random: true,
      anim: {
        enable: false,
        speed: 1,
        size_min: 0.1,
        sync: false,
      },
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: '#888',
      opacity: 0.4,
      width: 1,
    },
    move: {
      enable: true,
      speed: 1,
      direction: 'none',
      random: false,
      straight: false,
      out_mode: 'out',
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200,
      },
    },
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: {
        enable: true,
        mode: 'grab',
        nb: 2,
      },
      onclick: {
        enable: true,
        mode: 'push',
      },
      resize: true,
    },
    modes: {
      grab: {
        distance: 400,
        line_linked: {
          opacity: 0.4,
        },
      },
      bubble: {
        distance: 400,
        size: 20,
        duration: 2,
        opacity: 8,
        speed: 1,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
      push: {
        particles_nb: 4,
      },
      remove: {
        particles_nb: 2,
      },
    },
  },
  retina_detect: true,
};

function Index({ children, messages, dispatch, client, language }) {
  const menu = (
    <Menu style={{ transform: 'translateX(-16px)' }}>
      {
        Object.keys(languageMap).map((lan, i) => {
          return (
            <Menu.Item key={i}>
              <a
                onClick={() => {
                  dispatch({ type: 'common/changeLanguage', payload: { language: lan } });
                }}
              >
                {languageMap[lan]}
              </a>
            </Menu.Item>
          );
        })
      }
    </Menu>
  );
  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: '100%' }}>
      <DocumentTitle title={messages.title || 'Moe Cube'}/>

      {client !== 'electron' &&
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <Link to="/" style={{ marginTop: '20px' }}>
          <img alt="logo" src={logo} style={{ width: '140px', height: '44px' }}/>
        </Link>

        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          style={{ lineHeight: '64px' }}
        >
          {/*<Menu.Item key="1">
            <Link to="/">
              <Format id="Home"/>
            </Link>
          </Menu.Item>*/}
           <Menu.Item key="2">
            <Link href="https://ygobbs.com/">
              <Format id="BBS"/>
            </Link>
          </Menu.Item>
           <Menu.Item key="3">
            <Link href="https://mycard.moe/ygopro/arena/index.html">
              <Format id="DATABASE"/>
            </Link>
          </Menu.Item>
        </Menu>

        <div style={{ position: 'absolute', right: '40px' }}>
          <UserPanel />
        </div>
      </Header>
      }

      <Particles
        params={particleConfig}
        style={{
          position: 'fixed',
        }}
      />
      {children}

      <Footer style={{ width: '100%', justifyContent: 'space-between', display: 'flex', zIndex: 100 }}>
        <div><Dropdown overlay={menu} trigger={['click']}>
          <a className="ant-dropdown-link changelanguage">
            {languageMap[language]} <Icon type="down" className="flag"/>
          </a>
        </Dropdown></div>
        <div>© MoeCube 2017 all right reserved.</div>
      </Footer>
    </div>
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

export default connect(mapStateToProps)(Index);
