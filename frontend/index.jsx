import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import List from './components/List.jsx';
import Room from './components/Room.jsx';
import configureStore from './redux';
import './style/main.scss';
import './style/style.css';
import React from "react";
import { render } from 'react-dom';

const store = configureStore({});

const component = (
    <Provider store={ store }>
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={List}/>
                <Route path="/room" component={Room}/>
            </Switch>
        </BrowserRouter>
    </Provider>
);

render(component, document.getElementById('app'));