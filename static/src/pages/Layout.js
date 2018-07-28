import React, { Component } from 'react';
import {Route, Switch}from 'react-router-dom';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import NoMatch from "./NoMatch";
import Upload from './Upload';
import DashBoard from './Dashboard';

class Layout extends Component{
    render(){
        return(
            <div>
                <Header/>
                <Switch>
                    <Route exact path={"/"} component={Home}/>
                    <Route path={"/login"} component={Login}/>
                    <Route path={"/register"} component={Register}/>
                    <Route path={"/dashboard"} component={DashBoard}/>
                    <Route path={"/upload"} component={Upload} />
                    <Route component={NoMatch}/>
                </Switch>
                <Footer/>
            </div>
        );
    }

}

export default Layout;