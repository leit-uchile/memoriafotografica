import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link } from "react-router-dom";

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import Layout from "./pages/Layout";

const app = document.getElementById('root');

ReactDOM.render(
    <BrowserRouter>
        <Layout />
    </BrowserRouter>
, app);

registerServiceWorker();
