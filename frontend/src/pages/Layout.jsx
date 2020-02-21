import React, { Fragment, lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";

import {
  Alert,
  Header,
  Footer,
  PrivateComponent,
  BoundedRoute,
  SuspenseFallback
} from "../components";
// Main application chunk
import Home from "./Home";
import LandingPage from "./LandingPage";
import Login from "./Login";
import Register from "./Register";
import NoMatch from "../components/Routes/NoMatch";
import PhotoDetails from "./PhotoView";
import Index from "./Miscellaneous";
import RequestPhoto from "./RequestPhoto";
import UploadPage from "./Upload";
// Separate chunks for users
const Dashboard = lazy(() => import("./Curador"));
const UserDashboard = lazy(() => import("./UserDashboard"));
const EditProfile = lazy(() => import("./UserDashboard/EditProfile"));
const UserPhotos = lazy(() => import("./UserDashboard/UserPhotos"));
const UserAlbums = lazy(() => import("./UserDashboard/UserAlbums"));

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
            <BoundedRoute path={"/photo/:id"} component={PhotoDetails} />
            <BoundedRoute path={"/misc"} component={Index} />
            <BoundedRoute path={"/register"} component={Register} />
            <BoundedRoute path={"/request-photo"} component={RequestPhoto} />
            <BoundedRoute path={"/upload"} component={UploadPage} />
            <Suspense
              fallback={
                <SuspenseFallback
                  message={"Cargando herramientas de usuario..."}
                />
              }
            >
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
              <PrivateComponent
                path={"/curador/dashboard"}
                component={Dashboard}
              />
            </Suspense>
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
    background: "linear-gradient(to bottom, #dee1e2 0%,#ffffff 25%)"
  },
  body: {
    minHeight: "70vh"
  }
};

export default Layout;
