import React from 'react';
import { connect } from 'dva';
import styles from './Index.less';
import Particles from 'react-particles-js'
import DocumentTitle from 'react-document-title'

function Index({ children, messages }) {
  return (
    <div style={{ height: "100%" }}>
      <DocumentTitle title={messages['title'] || 'Moe Cube'}>
        <Particles
          params={{
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
          }} 
          style={{
            position: "fixed"
          }}          
          />
      </DocumentTitle>      
      {children}      
    </div>
  );
}

function mapStateToProps(state) {
  const {
    common: {messages}
  } = state
  return {
    messages
  };
}

export default connect(mapStateToProps)(Index);
