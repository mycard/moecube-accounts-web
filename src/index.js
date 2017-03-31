import { message } from 'antd';
import dva from 'dva';
import { browserHistory } from 'dva/router';
import ReactDOM from 'react-dom';
import createLoading from 'dva-loading'
import { addLocaleData, IntlProvider } from 'react-intl';
import en from 'react-intl/locale-data/en';
import zh from 'react-intl/locale-data/zh';
import localeData from '../i18n.json';
import './index.less';

import { IntlProvider, addLocaleData } from 'react-intl';

// 1. Initialize
const app = dva({
  onError: (error, dispatch) => {
    message.destroy();
    message.error(error.message);
  },
  history: browserHistory,
});

app.use(createLoading())


app.model(require('./models/user'));

app.model(require('./models/auth'));

app.model(require('./models/haha'));

// app.model(require("./models/login"));

app.model(require('./models/common'));


// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example'));

// 4. Router
app.router(require('./router'));

// 5. Start



addLocaleData([...en, ...zh]);
/*eslint-disable */
let language = navigator.language || (navigator.languages && navigator.languages[0]) || navigator.userLanguage;
/*eslint-enable */
const languageWithoutRegionCode = language.toLowerCase().split(/[_-]+/)[0];

const messages = localeData[languageWithoutRegionCode] || localeData[language] || localeData.zh;

if(localStorage.getItem('locale')){
  language = JSON.parse(localStorage.getItem('locale'))
}

const App = app.start();
ReactDOM.render(
  <IntlProvider locale={language} messages={messages}>
    <App/>
  </IntlProvider>,
  document.getElementById('root'),
);


console.log(language);
