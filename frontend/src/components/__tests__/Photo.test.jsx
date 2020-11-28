import React from "react";
import "@testing-library/jest-dom";
import { renderWithRouter, screen } from "../../test-utils";
import Photo from "../Photo";

it("renders without crashing", () => {
  renderWithRouter(
    <Photo
      height="400px"
      width="400px"
      useLink={false}
      redirectUrl=""
      hover={false}
    />
  );
});
