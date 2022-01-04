import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";

import CharacterList from "../components/CharacterList";
import store from "../store/RickAndMortyStore";

beforeEach(async () => {
  render(<CharacterList store={store} />);
});

test("Each character should have an id", () => {
  if (store.characterData.model.length > 0) {
    expect(store.characterData.model[0]?.id).toBeDefined();
  }
});

test("Every card should show an avatar", async () => {
  const characters = await waitFor(() => screen.getAllByRole("listitem"));
  characters.forEach((character) => {
    const characterPicture = character.querySelector(
      ".list__headshot"
    ) as HTMLImageElement;
    expect(characterPicture?.src).toContain(".jpeg");
  });
});

test("You have to have Rick", async () => {
  const characters = await waitFor(() => screen.getAllByRole("listitem"));
  expect(characters[0].querySelector(".list__title")?.innerHTML).toBe(
    "Rick Sanchez"
  );
});

test("If it failed show the plumbus", async () => {
  const characters = await waitFor(() => screen.getAllByRole("listitem"));
  const characterPicture = characters[0].querySelector(
    ".list__headshot"
  ) as HTMLImageElement;
  const characterSpecies = characters[0].querySelector(".list__subtitle");
  expect(characterPicture?.src).toContain("plumbus.jpeg");
  expect(characterSpecies?.innerHTML).toBe("A plumbus");
});
