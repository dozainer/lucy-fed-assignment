import { render } from "react-dom";
import App from "./App";
import { start } from "./__mocks__/RickAndMortyApi.mock";

if (process.env.NODE_ENV === "development") {
  require("./__mocks__/@msw").activate();
  start();
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
