import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";

import {
  Alert,
  Header,
  Footer,
  PrivateComponent,
  BoundedRoute
} from "../components";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register/Register";
import NoMatch from "./NoMatch";
import UploadPage from "./Upload/UploadPage";
import PhotoDetails from "./PhotoView/PhotoDetails";
import RequestPhoto from "./RequestPhoto";
import Dashboard from "./Curador/Dashboard";
import LandingPage from "./LandingPage";
import UserDashboard from "./UserDashboard/UserDashboard";
import EditProfile from "./UserDashboard/EditProfile";
import UserPhotos from "./UserDashboard/UserPhotos";
import UserAlbums from "./UserDashboard/UserAlbums";
import Index from "./Miscellaneous/Index";

const Layout = () => {
  return (
    <Fragment>
      <div style={styles.background}>
        <Header />
        <div style={styles.body}>
          <Alert />
          <Switch>
            <Route exact path={"/"} component={LandingPage} />
            <BoundedRoute path={"/gallery"} component={Home} />
            <BoundedRoute path={"/login"} component={Login} />
            <BoundedRoute path={"/register"} component={Register} />
            <BoundedRoute path={"/upload"} component={UploadPage} />
            <BoundedRoute path={"/photo/:id"} component={PhotoDetails} />
            <BoundedRoute path={"/misc"} component={Index} />
            <PrivateComponent
              path={"/request-photo"}
              component={RequestPhoto}
            />
            <PrivateComponent
              path={"/curador/dashboard"}
              component={Dashboard}
            />
            <PrivateComponent
              path={"/user/dashboard"}
              component={UserDashboard}
            />
            <PrivateComponent
              path={"/user/editProfile"}
              component={EditProfile}
            />
            <PrivateComponent path={"/user/photos"} component={UserPhotos} />
            <PrivateComponent path={"/user/albums"} component={UserAlbums} />
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
