import React, { Suspense } from "react";
import SuspenseFallback from "../SuspenseFallback";

/**
 * Allows for Code Separation 
 */
const LazyRoutedComponent = ({ component: Component, message, ...rest }) => (
  <Suspense
    fallback={
      <SuspenseFallback message={message} />
    }
  >
    <Component {...rest} />
  </Suspense>
);

export default LazyRoutedComponent;
