import React from "react";
import "@testing-library/jest-dom";
import { renderWithRouter, screen, waitFor } from "../../../test/test-utils";
import LandingPage from "../LandingPage"


it("renders without crashing", () => {
    renderWithRouter(<LandingPage />);
    expect(screen.getByText("Noticias recientes"))
    expect(screen.getByText("Ver galeria"))
    expect(screen.getByText("¿Quieres participar?"))
})

it("displays albums", async () => {
    renderWithRouter(<LandingPage />);
    await waitFor(() => expect(screen.getByText("collection title")))
})

it("displays news", async () => {
    renderWithRouter(<LandingPage />);
    await waitFor(() => expect(screen.getAllByText("headline")))
})

// Testing for react-gallery has problems
it.skip("displays photos", async () => {
    renderWithRouter(<LandingPage />);
    await waitFor(() => expect(screen.getAllByAltText("photo title")))
})