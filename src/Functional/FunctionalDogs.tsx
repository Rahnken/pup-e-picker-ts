import { DogCard } from "../Shared/DogCard";
import { dogPictures } from "../dog-pictures";
import { Dog } from "../types";

// Right now these dogs are constant, but in reality we should be getting these from our server
export const FunctionalDogs = ({
  dogArray,
  isLoading,
}: {
  dogArray: Dog[];
  isLoading: boolean;
}) => {
  return (
    //  the "<> </>"" are called react fragments, it's like adding all the html inside
    // without adding an actual html element
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
