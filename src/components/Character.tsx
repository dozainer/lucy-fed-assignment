import * as React from "react";
import { Character as ICharacter, Location } from "../@RickAndMorty";
import plumbus from "../services/RickAndMortyService";

const plumbusAsAvatar = "plumbus.jpeg";
const plumbusAsSpecies = "A plumbus";

class Character extends React.Component<
  { character: ICharacter },
  { episode: string; origin: Location; location: Location }
> {
  _isMounted = false;

  constructor(props: { character: ICharacter }) {
    super(props);

    this.state = {
      episode: "",
      origin: (this.character.origin as unknown) as Location,
      location: (this.character.location as unknown) as Location
    };
  }

  character = this.props.character;

  componentDidMount = () => {
    this._isMounted = true;
    const service = new plumbus();

    if (this.character.episode) {
      service
        .getDetails(this.character.episode[0])
        .then(
          (episode) =>
            this._isMounted && this.setState({ episode: episode?.name })
        );
    }

    if (this.character.origin?.url) {
      service
        .getDetails(this.character.origin.url)
        .then((origin) => this._isMounted && this.setState({ origin }));
    }

    if (this.character.location?.url) {
      service
        .getDetails(this.character.location.url)
        .then((location) => this._isMounted && this.setState({ location }));
    }
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <div className="list__card" role="listitem">
        <div className="list__frame">
          <img
            className="list__headshot"
            src={this.character.image || plumbusAsAvatar}
            alt={this.character.name}
          />
        </div>

        <div className="list__details">
          <div>
            <span className="list__title">{this.character.name}</span>
            <span className="list__subtitle">
              {this.character.image || this.character.species
                ? this.character.species
                : plumbusAsSpecies}
            </span>

            {/* episode */}
            <span className="list__subtitle--special">
              {this.state.episode}
            </span>
          </div>
          <div>
            <span className="list__subtitle--alt">
              O: {this.state.origin?.name || "N/A"}
              &nbsp;&lt;{this.state.origin?.dimension || "unknown"}&gt; |{" "}
              {this.state.origin?.residents?.length || 0}
            </span>

            <span className="list__subtitle--alt">
              @: {this.state.location?.name || "N/A"}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default Character;
