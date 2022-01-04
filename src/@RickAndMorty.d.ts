interface CharacterLocation {
  name: string;
  url: string;
}

export interface Character {
  id: number;
  image: string;
  name: string;
  species: string;
  origin: CharacterLocation;
  location: CharacterLocation;
  episode: string[];
}

export interface Location {
  name: string;
  dimension: string;
  residents: Character[];
}

export interface IStore {
  characterData: {
    model: Character[];
  };
  getCharactersAsync: Function;
}

export interface ICharacterList {
  store: IStore;
}
