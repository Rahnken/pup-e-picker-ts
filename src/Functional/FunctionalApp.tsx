import { useEffect, useState } from "react";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalSection } from "./FunctionalSection";
import { Dog, TFilterValues } from "../types";
import { Requests } from "../api";

export function FunctionalApp() {
  const [favouriteCount, setFavouriteCount] = useState(0);
  const [dogArray, setDogArray] = useState<Dog[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [unfilteredTotal, setUnfilteredTotal] = useState(0);
  const [shouldShowForm, setShouldShowForm] = useState(false);
  const [activeFilter, setActiveFilter] = useState<TFilterValues>("none");

  const fetchDogs = () => {
    setIsLoading(true);
    Requests.getAllDogs()
      .then((result) => {
        setDogArray(result as Dog[]);
        setFavouriteCount(calculateFavouriteCount(result as Dog[]));
      })

      .catch((error) => {
        console.error("Failed to fetch dogs", error);
        setDogArray([]);
      })
      .finally(() => {
        setIsLoading(false);

        setShouldShowForm(false);
        setActiveFilter("none");
      });
  };
  const createDog = (dog: Omit<Dog, "id">) => {
    Requests.postDog(dog).then(fetchDogs);
  };

  const updateDog = (id: number) => {
    const foundDog = dogArray.find((dog: Dog) => dog.id === id);
    foundDog!.isFavourite = !foundDog!.isFavourite;
    Requests.updateDog(foundDog!.id, foundDog!).then(fetchDogs);
  };
  const deleteDog = (id: number) => {
    const remainingDogs = dogArray.filter((dog: Dog) => dog.id !== id);

    Requests.deleteDog(id).then(() => {
      fetchDogs;
      setDogArray(remainingDogs);
    });
  };
  // These might be abstractable but I'm doing it this way for readability
  // ---
  const filterFavDogs = () => {
    setIsLoading(true);
    Requests.getAllDogs()
      .then((result) => result.filter((dog) => dog.isFavourite))
      .then((data) => {
        setDogArray(data);
      })
      .finally(() => setIsLoading(false));
  };
  const filterUnFavDogs = () => {
    setIsLoading(true);
    Requests.getAllDogs()
      .then((result) => result.filter((dog) => !dog.isFavourite))
      .then((data) => {
        setDogArray(data);
      })
      .finally(() => setIsLoading(false));
  };

  // --- ^^

  const calculateFavouriteCount = (dogs: Dog[]) => {
    return dogs.filter((dog) => dog.isFavourite).length;
  };

  useEffect(() => {
    fetchDogs();
  }, []);

  useEffect(() => {
    setUnfilteredTotal(dogArray.length);
  }, [dogArray]);

  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <FunctionalSection
        favouriteCount={favouriteCount}
        totalCount={unfilteredTotal}
        filterFavourites={filterFavDogs}
        filterUnfavourited={filterUnFavDogs}
        resetDogArray={fetchDogs}
        setShowForm={setShouldShowForm}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      >
        {shouldShowForm ? (
          <FunctionalCreateDogForm createDog={createDog} />
        ) : (
          <FunctionalDogs
            dogArray={dogArray}
            isLoading={isLoading}
            updateDog={updateDog}
            deleteDog={deleteDog}
          />
        )}
      </FunctionalSection>
    </div>
  );
}
