import { useState } from "react";
import { dogPictures } from "../dog-pictures";
import { Dog } from "../types";

// use this as your default selected image
const defaultSelectedImage = dogPictures.BlueHeeler;

export const FunctionalCreateDogForm = ({
  createDog,
}: {
  createDog: (dog: Omit<Dog, "id">) => void;
}) => {
  const [nameInput, setNameInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [pictureURL, setPictureURL] = useState(defaultSelectedImage);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isValidDog = () => {
    return nameInput.length > 2 && descriptionInput.length > 15;
  };

  const resetForm = () => {
    setNameInput("");
    setDescriptionInput("");
    setPictureURL(defaultSelectedImage);
    setIsSubmitting(false);
  };

  return (
    <form
      action=""
      id="create-dog-form"
      onSubmit={(e) => {
        e.preventDefault();
        setIsSubmitting(true);
        if (isValidDog()) {
          const submitDog: Omit<Dog, "id"> = {
            name: nameInput,
            description: descriptionInput,
            image: pictureURL,
            isFavourite: false,
          };
          createDog(submitDog);
        }
        resetForm();
      }}
    >
      <h4>Create a New Dog</h4>
      <label htmlFor="name">Dog Name</label>
      <input
        type="text"
        disabled={isSubmitting}
        value={nameInput}
        onChange={(e) => {
          setNameInput(e.target.value);
        }}
      />
      <label htmlFor="description">Dog Description</label>
      <textarea
        name="description"
        value={descriptionInput}
        onChange={(e) => {
          setDescriptionInput(e.target.value);
        }}
        id=""
        cols={80}
        rows={10}
        disabled={isSubmitting}
      ></textarea>
      <label htmlFor="picture">Select an Image</label>
      <select
        id=""
        onChange={(e) => {
          setPictureURL(e.target.value);
        }}
      >
        {Object.entries(dogPictures).map(([label, pictureValue]) => {
          return (
            <option value={pictureValue} key={pictureValue}>
              {label}
            </option>
          );
        })}
      </select>
      <input
        type="submit"
        value={"Submit"}
        disabled={isValidDog() && !isSubmitting}
      />
    </form>
  );
};
