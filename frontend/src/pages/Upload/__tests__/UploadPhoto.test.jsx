import React from "react";
import "@testing-library/jest-dom";
import { renderWithRouter, screen } from "../../../test/test-utils";
import UploadPhoto from "../Steps/UploadPhotov3"

it.skip("renders default step", () => {
    renderWithRouter(<UploadPhoto />)
})
