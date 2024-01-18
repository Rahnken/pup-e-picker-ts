import { Component } from "react";
import { ClassSection } from "./ClassSection";
import { ClassDogs } from "./ClassDogs";
import { ClassCreateDogForm } from "./ClassCreateDogForm";
import { Dog, TFilterValues } from "../types";
import { Requests } from "../api";

type State = {
  favouriteCount: number;
  dogArray: Dog[];
  isLoading: boolean;
  unfilteredTotal: number;
  shouldShowForm: boolean;
  isActiveFilter: TFilterValues;
};

export class ClassApp extends Component<Record<string, never>, State> {
  state: State = {
    favouriteCount: 0,
    dogArray: [],
    isLoading: false,
    unfilteredTotal: 0,
    shouldShowForm: false,
    isActiveFilter: "none",
  };

  fetchDogs = () => {
    this.setState({ isLoading: true });
    Requests.getAllDogs()
      .then((result) => {
        if (result)
          this.setState(
            { dogArray: result, unfilteredTotal: result.length },
            () => this.calculateFavouriteCount(result)
          );
      })
      .catch((error) => {
        console.error("Failed to fetch dogs:", error);
        this.setState({ dogArray: [] }); // Set to an empty array in case of error
      })
      .finally(() => {
        this.setState({
          isLoading: false,
          shouldShowForm: false,
          isActiveFilter: "none",
        });
      });
  };

  createDog = (dog: Omit<Dog, "id">) => {
    Requests.postDog(dog).then(this.fetchDogs);
  };

  calculateFavouriteCount(allDogs: Dog[]): void {
    const favouritedDogs = allDogs.filter((dog) => dog.isFavourite);
    this.setState({ favouriteCount: favouritedDogs.length });
  }

  filterFavDogs = () => {
    this.setState({ isLoading: true });
    Requests.getAllDogs()
      .then((result) => result.filter((dog) => dog.isFavourite))
      .then((data) => this.setState({ dogArray: data, isLoading: false }));
  };
  filterUnFavDogs = () => {
    this.setState({ isLoading: true });
    Requests.getAllDogs()
      .then((result) => result.filter((dog) => !dog.isFavourite))
      .then((data) => this.setState({ dogArray: data, isLoading: false }));
  };
  resetDogArray = () => {
    this.fetchDogs();
  };
  updateDog = (id: number) => {
    const foundDog = this.state.dogArray.find((dog: Dog) => dog.id === id);
    foundDog!.isFavourite = !foundDog!.isFavourite;
    Requests.updateDog(foundDog!.id, foundDog!).then(this.fetchDogs);
  };
  deleteDog = (id: number) => {
    const remainingDogs = this.state.dogArray.filter(
      (dog: Dog) => dog.id !== id
    );
    this.setState({ dogArray: remainingDogs, isLoading: true });
    Requests.deleteDog(id).then(this.fetchDogs);
  };
  setShowForm = () => {
    this.setState({
      shouldShowForm: true,
    });
  };
  setActiveFilter = (value: TFilterValues) => {
    this.setState({ isActiveFilter: value });
  };

  componentDidMount() {
    this.fetchDogs();
  }

  render() {
    const {
      favouriteCount,
      dogArray,
      isLoading,
      unfilteredTotal,
      shouldShowForm,
      isActiveFilter,
    } = this.state;
    return (
      <div className="App" style={{ backgroundColor: "goldenrod" }}>
        <header>
          <h1>pup-e-picker (Class Version)</h1>
        </header>
        <ClassSection
          favouriteCount={favouriteCount}
          totalCount={unfilteredTotal}
          filterFavourites={this.filterFavDogs}
          filterUnfavourited={this.filterUnFavDogs}
          resetDogArray={this.resetDogArray}
          setShowForm={this.setShowForm}
          isActiveFilter={isActiveFilter}
          setActiveFilter={this.setActiveFilter}
        >
          {!shouldShowForm ? (
            <ClassDogs
              dogArray={dogArray}
              isLoading={isLoading}
              updateDog={this.updateDog}
              deleteDog={this.deleteDog}
            />
          ) : (
            <ClassCreateDogForm createDog={this.createDog} />
          )}
        </ClassSection>
      </div>
    );
  }
}
