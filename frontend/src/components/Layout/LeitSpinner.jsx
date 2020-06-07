import React from "react";
import { Spinner } from "reactstrap";

const LeitSpinner = ({ remSize = "6rem" }) => (
  <Spinner
    style={{ width: remSize, height: remSize }}
    className="leit-spinner"
  />
);

export default LeitSpinner;
