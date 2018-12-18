import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider} from 'react-redux';
import { createStore, combineReducers } from 'redux';
import coverImageReducer from './reducers/coverimage-reducer';
import tabReducer from './reducers/tab-reducer';
import dialogReducer from './reducers/dialog-reducer';
import commentReducer from './reducers/commentReducer';
import componentReducer from './reducers/component-reducer';
import sckeyReducer from './reducers/sckeyReducer';
import logininputReducer from './reducers/logininputReducer';
import registerReducer from './reducers/registerReducer';
import registerpbinputReducer from './reducers/registerpbinputReducer';
import registerconfinputReducer from './reducers/registerconfinputReducer';
const rootReducer = combineReducers({
    coverImage: coverImageReducer,
    tab: tabReducer,
    dialog: dialogReducer,
    comment: commentReducer,
    component: componentReducer,
    sckey: sckeyReducer,
    logininput: logininputReducer,
    register: registerReducer,
    registerpbinput: registerpbinputReducer,
    registerconfinput: registerconfinputReducer,
  })

// Create store with reducers

const store = createStore(rootReducer)
ReactDOM.render(<Provider store={store}>
    <App/>
    </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
