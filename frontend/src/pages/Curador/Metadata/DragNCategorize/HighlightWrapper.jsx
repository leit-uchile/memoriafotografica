import React from "react";

const HighLight = ({ isOver, children }) => {
  const className = isOver ? " drag-highlight-region" : "";

  return <div className={`drag-meta${className}`}>{children}</div>;
};

export default HighLight;
