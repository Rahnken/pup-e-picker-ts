import { useEffect, useState } from "react";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalSection } from "./FunctionalSection";
import { Dog, DogData, TSelectedTab } from "../types";
import { Requests } from "../api";

export function FunctionalApp() {
  const [dogArray, setDogArray] = useState<Dog[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState<TSelectedTab>("none");

  const dogData: DogData = {
    favouriteDogs: dogArray.filter((dog) => dog.isFavourite),
    unfavouriteDogs: dogArray.filter((dog) => !dog.isFavourite),
    totalDogCount: dogArray.length,
  };

  const fetchDogs = () => {
    setIsLoading(true);
    Requests.getAllDogs()
      .then((result) => {
        const dogs = result as Dog[];
        setDogArray(dogs);
      })
      .catch((error) => {
        console.error("Failed to fetch dogs", error);
        setDogArray([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const createDog = (dog: Omit<Dog, "id">) => {
    Requests.postDog(dog).then(fetchDogs);
    setSelectedTab("none");
  };
  const updateDog = (id: number) => {
    const foundDog = dogArray.find((dog: Dog) => dog.id === id);
    if (foundDog) {
      foundDog.isFavourite = !foundDog.isFavourite;
      Requests.updateDog(foundDog.id, foundDog).then(fetchDogs);
    }
  };
  const deleteDog = (id: number) => {
    const remainingDogs = dogArray.filter((dog: Dog) => dog.id !== id);
    Requests.deleteDog(id).then(() => {
      fetchDogs();
      setDogArray(remainingDogs);
    });
  };

  const dogsToDisplay = (dogData: DogData, activeTab: TSelectedTab) => {
    switch (activeTab) {
      case "favourite":
        return dogData.favouriteDogs;
      case "unfavourite":
        return dogData.unfavouriteDogs;
      default:
        return dogArray;
    }
  };

  useEffect(() => {
    fetchDogs();
  }, []);

  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <FunctionalSection
        activeFilter={selectedTab}
        setActiveFilter={setSelectedTab}
        totalCount={dogArray.length}
        favouriteCount={dogData.favouriteDogs.length}
      >
        {selectedTab === "form" ? (
          <FunctionalCreateDogForm createDog={createDog} />
        ) : (
          <FunctionalDogs
            dogArray={dogsToDisplay(dogData, selectedTab)}
            isLoading={isLoading}
            updateDog={updateDog}
            deleteDog={deleteDog}
          />
        )}
      </FunctionalSection>
    </div>
  );
}
