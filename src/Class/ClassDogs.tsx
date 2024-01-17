import { DogCard } from "../Shared/DogCard";
import { Component } from "react";
import { Dog } from "../types";
import { Requests } from "../api";

// Right now these dogs are constant, but in reality we should be getting these from our server

type Props = {
  dogArray: Dog[];
  isLoading: boolean;
  updateDog: (id: number) => void;
  deleteDog: (id: number) => void;
};
export class ClassDogs extends Component<Props> {
  render() {
    const { dogArray, isLoading, updateDog, deleteDog } = this.props;
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
              // Needs to be updated when fetch call is happening

              isLoading={isLoading}
            />
          );
        })}
      </>
    );
  }
}
