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
import PrivateComponent from "../components/PrivateComponent";
import Dashboard from "./Curador/Dashboard";
import LandingPage from "./LandingPage";
import UserDashboard from "./UserDashboard/UserDashboard";

const Layout = () => {
  return (
    <Fragment>
      <div style={styles.background}>
        <Header />
        <div style={styles.body}>
          <Switch>
            <Route exact path={"/"} component={LandingPage} />
            <Route path={"/gallery"} component={Home} />
            <Route path={"/login"} component={Login} />
            <Route path={"/register"} component={Register} />
            <Route path={"/upload"} component={Upload} />
            <Route path={"/photo/:id"} component={PhotoDetails} />
            <Route path={"/curador/dashboard"} component={Dashboard} />
            <Route path={"/user/dashboard"} component={UserDashboard} />
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
