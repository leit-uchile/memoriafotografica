import React from 'react';
import { Router } from "react-router-dom";
import { Provider} from 'react-redux';
import history from './history'

import './App.css';
import './css/animate.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Layout from "./pages/Layout";
import store from "./store";

const App = () => 
  <Provider store={store}>
    <Router history={history}>
      <Layout/>
    </Router>
  </Provider>

export default App;
