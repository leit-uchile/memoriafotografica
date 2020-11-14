import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import PhotoSelector from "../PhotoSelector";

it("renders without crashing", () => {
  render(
    <PhotoSelector
      useContainer={false}
      photos={[{ width: 200, height: 200, src: "/foo.jpg" }]}
      putAll={() => {}}
    />
  );
  expect(screen.getByText("Seleccionar todas"));
});

it("renders without crashing a container", () => {
  render(
    <PhotoSelector
      useContainer={true}
      photos={[{ width: 200, height: 200, src: "/foo.jpg" }]}
      putAll={() => {}}
    />
  );
  expect(screen.getByText("Seleccionar todas"));
});
