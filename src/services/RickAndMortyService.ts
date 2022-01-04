import { API_BASE } from "../config/env";

class RickAndMortyService {
  apiBase;

  constructor(base = API_BASE) {
    this.apiBase = base;
  }

  getAll = async (url: string) => {
    const options = {
      method: "GET"
    };
    const request = new Request(`${this.apiBase}/${url}`, options);
    const response = await fetch(request);
    if (!response || !response.ok) {
      return [];
    }
    return (await response.json()).results;
  };

  getById = async (url: string, id: number) => {
    const options = {
      method: "GET"
    };
    const request = new Request(`${this.apiBase}/${url}/${id}`, options);
    const response = await fetch(request);

    return (await response.json()).results;
  };

  getDetails = async (url: string) => {
    const options = {
      method: "GET"
    };
    const request = new Request(`${url}`, options);
    const response = await fetch(request);

    return await response.json();
  };
}

export default RickAndMortyService;
