import { DogCard } from "../Shared/DogCard";
import { Dog } from "../types";

export const FunctionalDogs = ({
  dogArray,
  isLoading,
  updateDog,
  deleteDog,
}: {
  dogArray: Dog[];
  isLoading: boolean;
  updateDog: (id: number) => void;
  deleteDog: (id: number) => void;
}) => {
  return (
    <>
      {dogArray.map((dog) => {
        return (
          <DogCard
            dog={dog}
            key={dog.id}
            onTrashIconClick={() => {
              deleteDog(dog.id);
            }}
            onHeartClick={() => {
              updateDog(dog.id);
            }}
            onEmptyHeartClick={() => {
              updateDog(dog.id);
            }}
            isLoading={isLoading}
          />
        );
      })}
    </>
  );
};
