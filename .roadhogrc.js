
let publicPath = 'https://cdn01.moecube.com/accounts/'

const API_ROOT = {
  test: 'http://192.168.1.9:3000',
  dev: 'http://114.215.243.95:8082',
  prod: 'https://api.moeube.com/accounts'
}

let defineConf = {
  apiRoot: API_ROOT[process.env["ENV"]],
}

export default {
  "entry": "src/index.js",
  publicPath,
  define: {...defineConf},
  "env": {
    "development": {
      "extraBabelPlugins": [
        "dva-hmr",
        "transform-runtime",
        ["import", { "libraryName": "antd", "style": "css" }]
      ]
    },
    "production": {
      "extraBabelPlugins": [
        "transform-runtime",
        ["import", { "libraryName": "antd", "style": "css" }]
      ]
    }
  }
}
