import { observable, runInAction, decorate } from "mobx";
import plumbus from "../services/RickAndMortyService";
import { IStore } from "../@RickAndMorty";

export class RickAndMortyStore {
  constructor(base?: string) {
    this.api = new plumbus(base);
  }

  api;

  characterData = {
    model: []
  };

  status = "initial";

  getCharactersAsync = async () => {
    try {
      const data = await this.api.getAll("character");
      runInAction(() => {
        this.characterData.model = data;
      });
    } catch (error) {
      runInAction(() => {
        this.status = "error";
      });
    }
  };
}

decorate(RickAndMortyStore, {
  characterData: observable,
  status: observable
});

export default new RickAndMortyStore() as IStore;
