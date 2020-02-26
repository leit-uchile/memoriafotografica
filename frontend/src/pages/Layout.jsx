import React, { Fragment, lazy } from "react";
import { Route, Switch } from "react-router-dom";

import {
  Alert,
  Header,
  Footer,
  PrivateComponent,
  BoundedRoute,
  LazyRoutedComponent
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
const lazyComponents = [
  {
    component: lazy(() => import("./Curador")),
    path: "/curador/dashboard",
    route: PrivateComponent,
    message: "Cargando herramientas de curador..."
  },
  {
    component: lazy(() => import("./User")),
    path: "/user/",
    route: BoundedRoute,
    message: "Cargando herramientas de usuario..."
  }
];

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
            {lazyComponents.map(el => (
              <el.route
                path={el.path}
                component={props => (
                  <LazyRoutedComponent
                    component={el.component}
                    message={el.message}
                    {...props}
                  />
                )}
              />
            ))}
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
    minHeight: "75vh"
  }
};

export default Layout;
