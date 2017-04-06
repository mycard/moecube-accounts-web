
let publicPath = 'https://cdn01.moecube.com/accounts/'
let defineConf = {
  apiRoot: process.env["BUILD"] == 'development' ? 'http://114.215.243.95:8082' : 'https://api.moeube.com/accounts'
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
