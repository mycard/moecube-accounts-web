import React from 'react';
import { connect } from 'dva';
import styles from './Index.less';
import Particles from 'react-particles-js'
import DocumentTitle from 'react-document-title'
import { Layout, Button, Menu } from 'antd';
import { Link } from 'dva/router'
import logo from '../assets/MoeCube.png'
const { Header, Footer, Sider, Content } = Layout;


const particleConfig = {
  'particles': {
    'number': {
      'value': 20,
      'density': {
        'enable': true,
        'value_area': 1000
      }
    },
    'color': {
      'value': '#888',
      'opacity': 0.4
    },
    'shape': {
      'type': 'circle',
      'stroke': {
        'width': 4,
        'color': '#888',
        'opacity': 0.4
      },
      'polygon': {
        'nb_sides': 5
      },
      'image': {
        'src': 'img/github.svg',
        'width': 100,
        'height': 100
      }
    },
    'opacity': {
      'value': 0.5,
      'random': false,
      'anim': {
        'enable': false,
        'speed': 1,
        'opacity_min': 0.1,
        'sync': false
      }
    },
    'size': {
      'value': 3,
      'random': true,
      'anim': {
        'enable': false,
        'speed': 1,
        'size_min': 0.1,
        'sync': false
      }
    },
    'line_linked': {
      'enable': true,
      'distance': 150,
      'color': '#888',
      'opacity': 0.4,
      'width': 1
    },
    'move': {
      'enable': true,
      'speed': 1,
      'direction': 'none',
      'random': false,
      'straight': false,
      'out_mode': 'out',
      'bounce': false,
      'attract': {
        'enable': false,
        'rotateX': 600,
        'rotateY': 1200
      }
    }
  },
  'interactivity': {
    'detect_on': 'canvas',
    'events': {
      'onhover': {
        'enable': true,
        'mode': 'grab',
        'nb': 2
      },
      'onclick': {
        'enable': true,
        'mode': 'push'
      },
      'resize': true
    },
    'modes': {
      'grab': {
        'distance': 400,
        'line_linked': {
          'opacity': 0.4
        }
      },
      'bubble': {
        'distance': 400,
        'size': 20,
        'duration': 2,
        'opacity': 8,
        'speed': 1
      },
      'repulse': {
        'distance': 200,
        'duration': 0.4
      },
      'push': {
        'particles_nb': 4
      },
      'remove': {
        'particles_nb': 2
      }
    }
  },
  'retina_detect': true
}

function Index({ dispatch, children, messages }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column',  flex: 1, height: '100vh' }}>
      <DocumentTitle title={messages['title'] || 'Moe Cube'} />                                                       

      <Header style={{ display: 'flex', alignItems: 'center'}}>
        <Link to="/" style={{ marginTop: '20px'}}>
          <img src={logo} style={{ width: '140px', height: '44px'}}/>   
        </Link>
            
          <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          style={{ lineHeight: '64px' }}>
          <Menu.Item key="1">
            <Link to="/">  
              Home              
            </Link>
          </Menu.Item>
        </Menu>  
      </Header>

      <Particles
        params={particleConfig}
        style={{
          position: "fixed"
        }}
      />
      {children}        

      <Footer style={{ flex:1, width: '100%', bottom: 0, left: 0, display: 'flex', justifyContent: 'flex-end', flexDirection: 'column' }}>
        <div>© MoeCube 2017 all right reserved.</div>
      </Footer>
    </div>
  );
}

function mapStateToProps(state) {
  const {
    common: { messages }
  } = state
  return {
    messages
  };
}

export default connect(mapStateToProps)(Index);
