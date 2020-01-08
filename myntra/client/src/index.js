import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import {PersistGate} from "redux-persist/integration/react";
import {store, persistor} from './redux/store';
import App from './App';
import './index.css';

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <PersistGate persistor={persistor}>
                <App/>
            </PersistGate>
        </Router>
    </Provider>, 
    document.getElementById('root'));

