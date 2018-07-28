import React, { Component } from 'react';
import { BrowserRouter } from "react-router-dom";
import { Provider, connect } from 'react-redux';

import Layout from "./pages/Layout";
import store from "./store";

class App extends Component {

  render() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Layout/>
            </BrowserRouter>
        </Provider>
    );
  }
}

export default App;
