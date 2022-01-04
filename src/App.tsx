import "./styles.css";
import CharacterList from "./components/CharacterList";
import store from "./store/RickAndMortyStore";

import { start } from "./__mocks__/RickAndMortyApi.mock";
import { activate, deactivate } from "./__mocks__/@msw";

function fail(e: React.MouseEvent) {
  activate();
  start();
  store.getCharactersAsync();
}

function unfail(e: React.MouseEvent) {
  deactivate();
  store.getCharactersAsync();
}

window.onbeforeunload = function () {
  deactivate();
};

export default function App() {
  return (
    <div className="App">
      <h1>Greetings CodeSandbox</h1>
      <h3>We come in peace!</h3>

      <button className="fail" onClick={(e) => fail(e)}>
        Fail miserably
      </button>
      <button onClick={(e) => unfail(e)}>Restore mankind</button>
      <p></p>

      <CharacterList store={store} />
    </div>
  );
}
