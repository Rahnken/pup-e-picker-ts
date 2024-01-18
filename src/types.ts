// Add your own custom types in here
export type Dog = {
  id: number;
  image: string;
  description: string;
  isFavourite: boolean;
  name: string;
};

export type TFilterValues = "favourite" | "unfavourite" | "form" | "none";
