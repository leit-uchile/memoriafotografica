import React, { Component } from 'react';
import {Route, Switch}from 'react-router-dom';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Home from './Home';
import Login from './Login';
import Register from './Register/Register';
import NoMatch from "./NoMatch";
import Upload from './Upload';
import PhotoDetail from "./PhotoView/PhotoDetail";
import PrivateComponent from '../components/PrivateComponent';
import TestComponent from './TestComponent'

class Layout extends Component{
    render(){
        return(
            <div>
                <Header/>
                <div class="container-fluid">
                <Switch>
                    <Route exact path={"/"} component={Home}/>
                    <Route path={"/login"} component={Login}/>
                    <Route path={"/register"} component={Register}/>
                    <Route path={"/upload"}component={Upload} />
                    <Route path={"/photo"}component={PhotoDetail}/>
                    <Route path={"/test/:id"} component={TestComponent}/>
                    <Route component={NoMatch}/>
                </Switch>
                </div>
                <Footer/>
            </div>
        );
    }

}
export default Layout;