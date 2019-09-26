import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { Provider} from 'react-redux';

import './css/App.css';
import './css/animate.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Layout from "./pages/Layout";
import store from "./store";

const App = () => 
  <Provider store={store}>
    <Router>
      <Layout/>
    </Router>
  </Provider>

export default App;
