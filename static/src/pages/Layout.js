import React, { Component } from 'react';
import {Route, Switch}from 'react-router-dom';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Home from './Home';
import Login from './Login';
import App from "../App";
import NoMatch from "./NoMatch";

class Layout extends Component{
    render(){
        return(
            <div className='jumbotron container'>
                <Header/>
                <Switch>
                    <Route exact path={"/"} component={Home}/>
                    <Route path={"/app"} component={App}/>
                    <Route path={"/login"} component={Login}/>
                    <Route component={NoMatch}/>
                </Switch>
                <Footer/>
            </div>
        );
    }

}

export default Layout;