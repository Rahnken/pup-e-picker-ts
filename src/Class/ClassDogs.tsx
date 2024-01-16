import { DogCard } from "../Shared/DogCard";
import { Component } from "react";
import { Dog } from "../types";

// Right now these dogs are constant, but in reality we should be getting these from our server

type Props = {
  dogArray: Dog[];
  isLoading: boolean;
};
export class ClassDogs extends Component<Props> {
  render() {
    const { dogArray, isLoading } = this.props;
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
  }
}
