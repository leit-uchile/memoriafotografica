import React from "react";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "../../../test/test-utils";
import ContactUs from "../ContactUs";

it("renders without crashing", () => {
    render(<ContactUs />)
    expect(screen.getByText("Contáctenos"))
})

it.skip("should let me pass the recaptcha", async () => {
    
})