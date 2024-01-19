// Add your own custom types in here
export type Dog = {
  id: number;
  image: string;
  description: string;
  isFavourite: boolean;
  name: string;
};

export type TSelectedTab = "favourite" | "unfavourite" | "form" | "none";

export type DogData = {
  favouriteDogs: Dog[];
  unfavouriteDogs: Dog[];
  totalDogCount: number;
};
