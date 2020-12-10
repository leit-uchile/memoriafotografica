import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import PhotoEditor from "../PhotoEditor";

it("renders without crashing", () => {
  render(
    <PhotoEditor
      photos={[{ width: 200, height: 200, src: "/foo.jpg" }]}
      selectAll={() => {}}
    />
  );
});
