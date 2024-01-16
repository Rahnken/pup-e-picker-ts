import { Component } from "react";
import { ClassSection } from "./ClassSection";
import { ClassDogs } from "./ClassDogs";
import { ClassCreateDogForm } from "./ClassCreateDogForm";
import { Dog } from "../types";
import { Requests } from "../api";

type State = {
  favouriteCount: number;
  dogArray: Dog[];
  isLoading: boolean;
};

export class ClassApp extends Component<Record<string, never>, State> {
  state: State = {
    favouriteCount: 0,
    dogArray: [],
    isLoading: false,
  };

  fetchDogs = () => {
    this.setState({ isLoading: true });
    Requests.getAllDogs()
      .then((result) => {
        if (result)
          this.setState({ dogArray: result }, () =>
            this.calculateFavouriteCount(result)
          );
      })
      .catch((error) => {
        console.error("Failed to fetch dogs:", error);
        this.setState({ dogArray: [] }); // Set to an empty array in case of error
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  calculateFavouriteCount(allDogs: Dog[]): void {
    const favouritedDogs = allDogs.filter((dog) => dog.isFavourite);
    this.setState({ favouriteCount: favouritedDogs.length });
  }

  componentDidMount() {
    this.fetchDogs();
  }

  render() {
    const { favouriteCount, dogArray, isLoading } = this.state;
    return (
      <div className="App" style={{ backgroundColor: "goldenrod" }}>
        <header>
          <h1>pup-e-picker (Class Version)</h1>
        </header>
        <ClassSection
          favouriteCount={favouriteCount}
          totalCount={dogArray.length}
        >
          <ClassDogs dogArray={dogArray} isLoading={isLoading} />
          <ClassCreateDogForm />
        </ClassSection>
      </div>
    );
  }
}
