let publicPath = 'https://cdn01.moecube.com/accounts/';

const API_ROOT = {
  development: 'https://api.moecube.com/accounts',
  test: 'http://114.215.243.95:8082',
  production: 'https://api.moecube.com/accounts'
};

let defineConf = {
  apiRoot: API_ROOT[process.env['ENV']],
};

export default {
  'entry': 'src/index.js',
  publicPath,
  define: { ...defineConf },
  'env': {
    'development': {
      'extraBabelPlugins': [
        'dva-hmr',
        'transform-runtime',
        'babel-plugin-transform-decorators-legacy',
        ['import', { 'libraryName': 'antd', 'style': 'css' }]
      ]
    },
    'production': {
      'extraBabelPlugins': [
        'babel-plugin-transform-decorators-legacy',
        'transform-runtime',
        ['import', { 'libraryName': 'antd', 'style': 'css' }]
      ]
    }
  }
};
