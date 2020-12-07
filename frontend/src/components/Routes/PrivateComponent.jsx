import React from "react";
import { Route, Redirect } from "react-router-dom";
import { site_misc } from "../../actions";
import { connect } from "react-redux";
import { selectUserIsAuthenticated,} from "../../reducers";

const PrivateComponent = ({ component: Component, setLoginSuccessRoute, ...rest }) => {

  if ((rest.isAuthenticated === null || rest.isAuthenticated === false) && rest.location.pathname.includes(rest.path)) {
    console.log("Doing redirect on private route: ",rest.location,rest.match,rest.path)
    setLoginSuccessRoute(rest.location.pathname);
    return <Redirect push to={"/login"} />;
  }

  return <Route {...rest} render={props => <Component {...props} />} />;
};

const mapStateToProps = state => ({
  isAuthenticated: selectUserIsAuthenticated(state)
});

const mapActionToProps = dispatch => ({
  setLoginSuccessRoute: route => dispatch(site_misc.addLoginRoute(route))
});

export default connect(mapStateToProps, mapActionToProps)(PrivateComponent);
