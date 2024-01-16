import { useEffect, useState } from "react";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalSection } from "./FunctionalSection";
import { Dog } from "../types";
import { Requests } from "../api";

export function FunctionalApp() {
  const [favouriteCount, setFavouriteCount] = useState(0);
  const [dogArray, setDogArray] = useState<Dog[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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
      });
    setIsLoading(false);
  };

  const calculateFavouriteCount = (dogs: Dog[]) => {
    return dogs.filter((dog) => dog.isFavourite).length;
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
        favouriteCount={favouriteCount}
        totalCount={dogArray.length}
      >
        <FunctionalDogs dogArray={dogArray} isLoading={isLoading} />
        <FunctionalCreateDogForm />
      </FunctionalSection>
    </div>
  );
}
