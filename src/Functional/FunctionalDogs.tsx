import { DogCard } from "../Shared/DogCard";
import { Dog } from "../types";

export const FunctionalDogs = ({
  dogArray,
  isLoading,
}: {
  dogArray: Dog[];
  isLoading: boolean;
}) => {
  return (
    <>
      {dogArray.map((dog) => {
        return (
          <DogCard
            dog={dog}
            key={dog.id}
            onTrashIconClick={() => {
              // Remove Dog from array & DB
              alert("clicked trash");
            }}
            onHeartClick={() => {
              // Add Dog to Favs
              alert("clicked heart");
            }}
            onEmptyHeartClick={() => {
              // Remove Dog from Favs
              alert("clicked empty heart");
            }}
            // Needs to be updated when fetch call is happening

            isLoading={isLoading}
          />
        );
      })}
    </>
  );
};
