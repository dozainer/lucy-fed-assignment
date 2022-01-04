import * as React from "react";
import { observer, inject } from "mobx-react";
import { ICharacterList, Character as ICharacter } from "../@RickAndMorty";

import Character from "./Character";

const plumbingHash = (character: ICharacter) =>
  `${character.id}-${character.species}`;

class CharacterList extends React.Component<ICharacterList> {
  componentDidMount() {
    if (!this.props.store.characterData.model.length) {
      this.props.store.getCharactersAsync();
    }
  }

  rollDice(id: number) {
    const random = Math.floor(Math.random() * 19) + 0;
    const character = this.props.store.characterData.model[random];
    const alreadyDead =
      this.props.store.characterData.model.find(
        (character) => character.id === id
      )?.species === "Spirit";

    if (alreadyDead) return;

    character.image = "";
    character.species = "Spirit";
    character.location = {
      name: "Heaven",
      url: ""
    };
  }

  render() {
    return (
      <div className="list" role="list">
        {this.props.store.characterData.model.length ? (
          this.props.store.characterData.model.map((character) => (
            <div
              key={plumbingHash(character)}
              onClick={() => this.rollDice(character.id)}
            >
              <Character character={character} />
            </div>
          ))
        ) : (
          <p>Something went horribly wrong</p>
        )}
      </div>
    );
  }
}

export default inject("store")(observer(CharacterList));
