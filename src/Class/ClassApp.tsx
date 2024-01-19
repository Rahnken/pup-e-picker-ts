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

  dogData: DogData = {
    favouriteDogs: [],
    unfavouriteDogs: [],
    totalDogCount: 0,
  };

  fetchDogs = () => {
    this.setState({ isLoading: true });
    Requests.getAllDogs()
      .then((result) => {
        if (result) {
          this.setState({ dogArray: result });
          this.dogData = this.calculateDogData();
        }
      })
      .catch((error) => {
        console.error("Failed to fetch dogs:", error);
        this.setState({ dogArray: [] }); // Set to an empty array in case of error
      })
      .finally(() => {
        this.setState({
          isLoading: false,
        });
      });
  };

  createDog = (dog: Omit<Dog, "id">) => {
    Requests.postDog(dog).then(this.fetchDogs);
    this.setState({ activeFilter: "none" });
  };

  updateDog = (id: number) => {
    const foundDog = this.state.dogArray.find((dog: Dog) => dog.id === id);
    if (foundDog) {
      foundDog.isFavourite = !foundDog.isFavourite;
      Requests.updateDog(foundDog.id, foundDog).then(this.fetchDogs);
    }
  };
  deleteDog = (id: number) => {
    const remainingDogs = this.state.dogArray.filter(
      (dog: Dog) => dog.id !== id
    );
    this.setState({ dogArray: remainingDogs, isLoading: true });
    Requests.deleteDog(id).then(this.fetchDogs);
  };

  setActiveFilter = (value: TSelectedTab) => {
    this.setState({ activeFilter: value });
  };

  componentDidMount() {
    this.fetchDogs();
  }

  calculateDogData() {
    return {
      favouriteDogs: this.state.dogArray.filter((dog) => dog.isFavourite),
      unfavouriteDogs: this.state.dogArray.filter((dog) => !dog.isFavourite),
      totalDogCount: this.state.dogArray.length,
    };
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
    const { isLoading, activeFilter } = this.state;
    const { favouriteDogs, totalDogCount } = this.dogData;
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
              dogArray={this.dogsToDisplay(this.dogData, activeFilter)}
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
