import { composeMocks, rest } from "msw";
import characterFixture from "../__fixtures__/RickAndMortyCharacter.json";
import locationFixture from "../__fixtures__/RickAndMortyLocation.json";

const STATUS_OK = 200;
const STATUS_BLOWN = 503;

process.env.API_STATUS = process.env.API_STATUS || `${STATUS_OK}`;

const mock = (statusCode = process.env.API_STATUS || 200) => {
  const { start, stop } = composeMocks(
    rest.get(
      "https://rickandmortyapi.com/api/character",
      (req, res, { json, status }) => {
        return res(status(+statusCode, "teapot"), json(characterFixture));
      }
    ),
    rest.get(
      "https://rickandmortyapi.com/api/location/:id",
      (req, res, { json, status }) => {
        return res(status(+statusCode, "teapot"), json(locationFixture));
      }
    )
  );
  return { start, stop };
};

const okApi = mock();
const blownApi = mock(STATUS_BLOWN);

const start = okApi.start;
const fail = blownApi.start;

export { start, fail };
