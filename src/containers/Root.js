import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '../redux/configureStore';

const store = configureStore();

export default class Root extends React.Component {
    render() {
        return (
            <Provider store={store} >
                <div>
                    Root
                </div>
            </Provider>
        )
    }
}