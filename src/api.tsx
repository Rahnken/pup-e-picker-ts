import { Dog } from "./types";

export const baseUrl = "http://localhost:3000";

export const Requests = {
  // should return a promise with all dogs in the database
  getAllDogs: (): Promise<Dog[]> => {
    return fetch(`${baseUrl}/dogs`, {
      method: "GET",
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((data) => data as Dog[])
      .catch((error) => {
        console.error("error", error);
        return [];
      });
  },
  // should create a dog in the database from a partial dog object
  // and return a promise with the result
  postDog: (dog: Omit<Dog, "id">) => {
    return fetch(`${baseUrl}/dogs`, {
      method: "POST",
      redirect: "follow",
      body: JSON.stringify(dog),
      headers: {
        "CONTENT-TYPE": "application/json",
      },
    })
      .then((response) => response.json())
      .catch((error) => console.error(error));
  },

  // should delete a dog from the database
  deleteDog: () => {},

  updateDog: () => {},

  // Just a dummy function for use in the playground
  dummyFunction: () => {},
};
