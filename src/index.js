import { message } from 'antd';
import dva from 'dva';
import createLoading from 'dva-loading';
import { browserHistory } from 'dva/router';
import ReactDOM from 'react-dom';

import './index.less';

// 1. Initialize
const app = dva({
  onError: (error) => {
    message.destroy();
    message.error(error.message);
  },
  history: browserHistory,
});

app.use(createLoading());


app.model(require('./models/user'));

app.model(require('./models/upload'));

app.model(require('./models/auth'));

app.model(require('./models/common'));


// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example'));

// 4. Router
app.router(require('./router'));

// 5. Start
const App = app.start();

ReactDOM.render(
  <App/>,
  document.getElementById('root'),
);

