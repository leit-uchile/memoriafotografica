import React, { Component } from 'react';
import {Route, Switch}from 'react-router-dom';
import {Container} from 'reactstrap';


import Header from '../components/Header';
import Footer from '../components/Footer';
import Home from './Home';
import Login from './Login';
import Register from './Register/Register';
import NoMatch from "./NoMatch";
import Upload from './Upload/Upload';
import PhotoDetails from "./PhotoView/PhotoDetail";
import PrivateComponent from '../components/PrivateComponent';
import Dashboard from './Curador/Dashboard'
import LandingPage from './LandingPage';

class Layout extends Component{
    render(){
        return(
            <div>
                <Header/>
                <Container fluid  style={{minHeight:'80vh'}}>
                    <Switch>
                        <Route exact path={"/"} component={LandingPage}/>
                        <Route path={"/gallery"} component={Home}/>
                        <Route path={"/login"} component={Login}/>
                        <Route path={"/register"} component={Register}/>
                        <Route path={"/upload"}component={Upload} />
                        <Route path={"/photo/:id"}component={PhotoDetails}/>
                        <Route path={"/curador/dashboard"} component={Dashboard} />
                        <Route component={NoMatch}/>
                    </Switch>
                </Container>
                <Footer/>
            </div>
        );
   }

}
export default Layout;
