
let publicPath = 'https://cdn01.moecube.com/accounts/'
let defineConf = {
  apiRoot: process.env["API_ROOT"]
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
