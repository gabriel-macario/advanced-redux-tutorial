import React from 'react';
import { Provider } from 'react-redux';
import AsyncApp from './AsyncApp';
import configureStore from '../redux/configureStore';

const store = configureStore();

export default class Root extends React.Component {
    render() {
        return (
            <Provider store={store} >
                <AsyncApp />
            </Provider>
        )
    }
}