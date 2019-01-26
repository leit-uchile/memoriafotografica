import React, { Component } from 'react';
import { Router } from "react-router-dom";
import { Provider, connect } from 'react-redux';
import history from './history'


import Layout from "./pages/Layout";
import store from "./store";

class App extends Component {

  render() {
    return (
        <Provider store={store}>
            <Router history={history}>
                <Layout/>
            </Router>
        </Provider>
    );
  }
}

export default App;
