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
  const [favStatusChanged, setFavStatusChanged] = useState(false);

  const fetchDogs = () => {
    setIsLoading(true);
    Requests.getAllDogs()
      .then((result) => {
        const dogs = result as Dog[];
        setDogArray(dogs);
        setFavouriteCount(calculateFavouriteCount(dogs));
        setUnfilteredTotal(dogs.length);
      })
      .catch((error) => {
        console.error("Failed to fetch dogs", error);
        setDogArray([]);
        setUnfilteredTotal(0);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const createDog = (dog: Omit<Dog, "id">) => {
    Requests.postDog(dog).then(fetchDogs);
    setShouldShowForm(false);
    setActiveFilter("none");
  };

  const updateDog = (id: number) => {
    const foundDog = dogArray.find((dog: Dog) => dog.id === id);
    if (foundDog) {
      foundDog.isFavourite = !foundDog.isFavourite;
      Requests.updateDog(foundDog.id, foundDog).then(() => {
        setFavStatusChanged(true);
      });
    }
  };
  const deleteDog = (id: number) => {
    const remainingDogs = dogArray.filter((dog: Dog) => dog.id !== id);

    Requests.deleteDog(id).then(() => {
      fetchDogs();
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
    fetchDogs();
    setFavStatusChanged(false);
  }, [favStatusChanged]);

  useEffect(() => {
    // Apply filter only when activeFilter changes and the dogs are already fetched
    if (activeFilter === "favourite") {
      filterFavDogs();
    } else if (activeFilter === "unfavourite") {
      filterUnFavDogs();
    }
  }, [activeFilter, dogArray.length]);

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
