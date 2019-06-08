import React from 'react';
import {Route, Redirect} from 'react-router-dom';

import {connect}  from 'react-redux';

function PrivateComponent({  component: Component, ...rest}){

  if(rest.isAuthenticated === null || rest.isAuthenticated === false){
    return <Redirect to="/login" />
  }

  return(
    <Route {...rest} render={props => true ? <Component {...props}/> : <Component />} />
    )
}

const mapStateToProps = state => {
  return {
      isAuthenticated: state.auth.isAuthenticated
  };
}

export default connect(mapStateToProps)(PrivateComponent);