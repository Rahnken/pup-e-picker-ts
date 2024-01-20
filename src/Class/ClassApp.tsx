import { Component } from "react";
import { ClassSection } from "./ClassSection";
import { ClassDogs } from "./ClassDogs";
import { ClassCreateDogForm } from "./ClassCreateDogForm";
import { Dog, DogData, TSelectedTab } from "../types";
import { Requests } from "../api";

type State = {
  dogArray: Dog[];
  isLoading: boolean;
  activeFilter: TSelectedTab;
};

export class ClassApp extends Component<Record<string, never>, State> {
  state: State = {
    dogArray: [],
    isLoading: false,
    activeFilter: "none",
  };

  fetchDogs = () => {
    this.setState({ isLoading: true });
    Requests.getAllDogs()
      .then((result) => this.setState({ dogArray: result }))
      .catch((error) => console.error("Failed to fetch dogs:", error))
      .finally(() => this.setState({ isLoading: false }));
  };

  createDog = (dog: Omit<Dog, "id">) => {
    this.setState({ isLoading: true });
    Requests.postDog(dog)
      .then(this.fetchDogs)
      .finally(() => this.setState({ activeFilter: "none", isLoading: false }));
  };

  updateDog = (id: number) => {
    this.setState({ isLoading: true });
    const foundDog = this.state.dogArray.find((dog: Dog) => dog.id === id);
    if (foundDog) {
      Requests.updateDog(foundDog.id, !foundDog.isFavourite)
        .then(this.fetchDogs)
        .finally(() => this.setState({ isLoading: false }));
    }
  };
  deleteDog = (id: number) => {
    this.setState({ isLoading: true });
    Requests.deleteDog(id)
      .then(this.fetchDogs)
      .finally(() => this.setState({ isLoading: false }));
  };

  setActiveFilter = (value: TSelectedTab) => {
    this.setState({ activeFilter: value });
  };

  componentDidMount() {
    this.fetchDogs();
  }

  dogsToDisplay = (dogData: DogData, activeTab: TSelectedTab) => {
    switch (activeTab) {
      case "favourite":
        return dogData.favouriteDogs;
      case "unfavourite":
        return dogData.unfavouriteDogs;
      default:
        return this.state.dogArray;
    }
  };

  render() {
    const { isLoading, activeFilter, dogArray } = this.state;
    const dogData: DogData = {
      favouriteDogs: dogArray.filter((dog) => dog.isFavourite),
      unfavouriteDogs: dogArray.filter((dog) => !dog.isFavourite),
      totalDogCount: dogArray.length,
    };
    const { favouriteDogs, totalDogCount } = dogData;
    return (
      <div className="App" style={{ backgroundColor: "goldenrod" }}>
        <header>
          <h1>pup-e-picker (Class Version)</h1>
        </header>
        <ClassSection
          favouriteCount={favouriteDogs.length}
          totalCount={totalDogCount}
          activeFilter={activeFilter}
          setActiveFilter={this.setActiveFilter}
        >
          {activeFilter === "form" ? (
            <ClassCreateDogForm createDog={this.createDog} />
          ) : (
            <ClassDogs
              dogArray={this.dogsToDisplay(dogData, activeFilter)}
              isLoading={isLoading}
              updateDog={this.updateDog}
              deleteDog={this.deleteDog}
            />
          )}
        </ClassSection>
      </div>
    );
  }
}
