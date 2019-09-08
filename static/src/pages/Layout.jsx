import React, { Component, Fragment } from "react";
import { Route, Switch } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register/Register";
import NoMatch from "./NoMatch";
import Upload from "./Upload/Upload";
import PhotoDetails from "./PhotoView/PhotoDetail";
import Dashboard from "./Curador/Dashboard";
import LandingPage from "./LandingPage";
import UserDashboard from "./UserDashboard/UserDashboard";
import EditProfile from "./UserDashboard/EditProfile";
// Utils
import PrivateComponent from "../components/PrivateComponent";
import ErrorBoundary from "../components/ErrorBoundary";
import BoundedRoute from '../components/BoundedRoute';


const Layout = () => {
  return (
    <Fragment>
      <div style={styles.background}>
        <Header />
        <div style={styles.body}>
          <Switch>
            <Route exact path={"/"} component={LandingPage} />
            <BoundedRoute path={"/gallery"} component={Home} />
            <BoundedRoute path={"/login"} component={Login} />
            <BoundedRoute path={"/register"} component={Register} />
            <BoundedRoute path={"/upload"} component={Upload} />
            <BoundedRoute path={"/photo/:id"} component={PhotoDetails}/>
            <PrivateComponent path={"/curador/dashboard"} component={Dashboard} />
            <PrivateComponent path={"/user/dashboard"} component={UserDashboard} />
            <PrivateComponent path={"/user/edit"} component={EditProfile} />
            <Route component={NoMatch} />
          </Switch>
        </div>  
      </div>
      <Footer />
    </Fragment>
  );
};

const styles = {
  background: {
    backgroundColor: "#dee1e2",
    background: "linear-gradient(to bottom, #dee1e2 0%,#ffffff 25%)",
    background: "-moz-linear-gradient(top, #dee1e2 0%, #ffffff 25%)",
    background: "-webkit-linear-gradient(top, #dee1e2 0%,#ffffff 25%)"
  },
  body: {
    minHeight: "70vh"
  }
};

export default Layout;
