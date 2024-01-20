import { Dog } from "./types";

export const BASE_URL = "http://localhost:3000";

export const Requests = {
  // should return a promise with all dogs in the database
  getAllDogs: (): Promise<Dog[]> => {
    return fetch(`${BASE_URL}/dogs`, {
      method: "GET",
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((data) => data);
  },
  // should create a dog in the database from a partial dog object
  // and return a promise with the result
  postDog: (dog: Omit<Dog, "id">) => {
    return fetch(`${BASE_URL}/dogs`, {
      method: "POST",
      redirect: "follow",
      body: JSON.stringify(dog),
      headers: {
        "CONTENT-TYPE": "application/json",
      },
    }).then((response) => {
      if (!response.ok) throw Error("Unable to Create Dog");
      return response.json();
    });
  },

  // should delete a dog from the database
  deleteDog: (id: number) => {
    return fetch(`${BASE_URL}/dogs/${id}`, {
      method: "DELETE",
      redirect: "follow",
    }).then((response) => {
      if (!response.ok) throw Error("Unable to Delete Dog");
      return response.json();
    });
  },

  updateDog: (id: number, isFavourite: boolean) => {
    return fetch(`${BASE_URL}/dogs/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ isFavourite: isFavourite }),
      headers: {
        "CONTENT-TYPE": "application/json",
      },
    }).then((response) => {
      if (!response.ok) throw Error("Unable to Update Dogs");
      return response.json();
    });
  },

  // Just a dummy function for use in the playground
  dummyFunction: () => {},
};
