import React from 'react';
import ErroBoundary from './ErrorBoundary';
import {Route} from 'react-router-dom';

/*
  A Wrapper for Error Boundary on route
*/
const BoundedRoute = ({
  component: Component, ...rest
}) => (
  <ErroBoundary>
    <Route {...rest} render={props => true ? <Component {...props}/> : <Component />} />
  </ErroBoundary>
)

export default BoundedRoute;