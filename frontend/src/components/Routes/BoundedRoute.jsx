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
    <Route {...rest} render={props => <Component {...props}/>} />
  </ErrorBoundary>
)

export default BoundedRoute;