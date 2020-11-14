import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import CropPhoto from "../CropPhoto";

it("renders without crashing", () => {
  render(
    <CropPhoto
      isOpen={true}
      src=""
      handleToggle={() => {}}
      saveAvatar={() => {}}
    />
  );
  expect(screen.getByText("Cortar"));
  expect(screen.getByText("Rotar"));
  expect(screen.getByText("Descartar"));
});
