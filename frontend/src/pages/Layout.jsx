import React, { Fragment, lazy } from "react";
import { Route, Switch } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import "../components/Routes/transitions.css";

import {
  Alert,
  Header,
  Footer,
  PrivateComponent,
  BoundedRoute,
  LazyRoutedComponent,
} from "../components";
// Main application chunk
import Home from "./Home";
import LandingPage from "./Landing";
import NewsPage from "./News/NewsPage";
import Login from "./Login";
import Register from "./Register";
import EmailConfirmation from "./Register/EmailConfirmation";
import NoMatch from "../components/Routes/NoMatch";
import PhotoDetails from "./PhotoView";
import Index from "./Miscellaneous";
import RequestPhoto from "./RequestPhoto";
import UploadPage from "./Upload";
import AllCollections from "./Collections";
import RequestPhotoToast from "./RequestPhoto/RequestPhotoToast";
import RecoverAccount from "./Other/RecoverAccount";
import RecoverAccountConfirmation from "./Other/RecoverAccountConfirmation";
import CompleteRegistration from "./Register/CompleteRegistration";


// Separate chunks for users
const lazyComponents = [
  {
    component: lazy(() => import("./Curador")),
    path: "/curador/dashboard",
    route: PrivateComponent,
    message: "Cargando herramientas de curador...",
  },
  {
    component: lazy(() => import("./User")),
    path: "/user/dashboard",
    route: PrivateComponent,
    message: "Cargando herramientas de usuario...",
  },
  {
    component: lazy(() => import("./User")),
    path: "/user/",
    route: BoundedRoute,
    message: "Cargando usuario...",
  },

];

const Empty = (props) => {
  return <div></div>;
};

/**
 * Layout
 *
 * Composes the components together to display a page.
 * Contains all the major routes available
 *
 * Addons:
 * - React Transition Group: animate route changes using CSS3
 * - React ErrorBoundaries: display an error page instead of crashing
 * - AOS at application level: div animations with AOS listeners
 * - React Animate (not currently on use): uses CSS3
 * - React Lazy component loading (Chunk separation)
 */
const Layout = () => {
  return (
    <Fragment>
      <div style={styles.background}>
        <Header />
        <div style={styles.body}>
          <Alert />
          <RequestPhotoToast />
          {/* This Route allows us to add transition animations
            at the cost of mounting everytime the location changes */}
          <Route
            render={({ location }) => (
              <TransitionGroup>
                <CSSTransition
                  key={location.key}
                  classNames="page"
                  timeout={300}
                  unmountOnExit
                >
                  <Switch location={location}>
                    <BoundedRoute exact path={"/"} component={LandingPage} />
                    <BoundedRoute path={"/news"} component={NewsPage} />
                    <BoundedRoute path={"/gallery"} component={Home} />
                    <BoundedRoute path={"/collections"} component={AllCollections} />
                    <BoundedRoute path={"/login"} component={Login} />
                    <BoundedRoute path={"/recoveruser/confirm"} component={RecoverAccountConfirmation} />
                    <BoundedRoute path={"/recoveruser"} component={RecoverAccount} />
                    <BoundedRoute path={"/misc"} component={Index} />
                    <BoundedRoute path={"/register"} component={Register} />
                    <BoundedRoute path={"/complete_guest_registration"} component={CompleteRegistration} />
                    {/* The next route allows to keep the real component mounted
                      with a persistent state; see outside transition */}
                    <BoundedRoute path={"/photo/:id/"} component={Empty} />
                    <BoundedRoute
                      path={"/confirm"}
                      component={EmailConfirmation}
                    />
                    <BoundedRoute
                      path={"/request-photo"}
                      component={RequestPhoto}
                    />
                    <BoundedRoute path={"/upload"} component={UploadPage} />
                    {lazyComponents.map((el) => (
                      <el.route
                        key={"lazy" + el.path}
                        path={el.path}
                        component={(props) => (
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
                </CSSTransition>
              </TransitionGroup>
            )}
          />
          {/* These are the persistent routes that do not unmount on id change*/}
          <BoundedRoute path={"/photo/:id/"} component={PhotoDetails} />
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

const styles = {
  background: {},
  body: {
    minHeight: "75vh",
  },
};

export default Layout;
