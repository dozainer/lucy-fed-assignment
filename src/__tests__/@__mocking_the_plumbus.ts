// require("../__mocks__/@msw").activate();
import { activate, deactivate } from "../__mocks__/@msw";
import { start } from "../__mocks__/RickAndMortyApi.mock";

beforeAll(async () => {
  /* using this opportunity to mock the rick and morty api */
  /**/
  console.info("Trying to mock a plumbus");

  activate();
  start();
});

afterAll(() => {
  deactivate();
});
