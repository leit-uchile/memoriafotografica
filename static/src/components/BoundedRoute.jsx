import React from 'react';
import ErrorBoundary from './ErrorBoundary';
import {Route} from 'react-router-dom';

/*
  A Wrapper for Error Boundary on route
*/
const BoundedRoute = ({
  component: Component, ...rest
}) => (
  <ErrorBoundary>
    <Route {...rest} render={props => true ? <Component {...props}/> : <Component />} />
  </ErrorBoundary>
)

export default BoundedRoute;