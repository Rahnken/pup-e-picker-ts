import { Component } from "react";
import { dogPictures } from "../dog-pictures";
import { Dog } from "../types";

type TFormProp = {
  createDog: (dog: Omit<Dog, "id">) => void;
};
type State = {
  name: string;
  description: string;
  pictureUrl: string;
  isSubmitting: boolean;
};
const defaultSelectedImage = dogPictures.BlueHeeler;

export class ClassCreateDogForm extends Component<TFormProp, State> {
  state: State = {
    name: "",
    description: "",
    pictureUrl: defaultSelectedImage,
    isSubmitting: false,
  };

  isValidDog() {
    const { name, description } = this.state;
    return name.length > 2 && description.length > 15;
  }
  resetForm = () => {
    this.setState({
      name: "",
      description: "",
      pictureUrl: defaultSelectedImage,
      isSubmitting: false,
    });
  };

  render() {
    return (
      <form
        action=""
        id="create-dog-form"
        onSubmit={(e) => {
          e.preventDefault();
          if (this.isValidDog()) {
            this.setState({ isSubmitting: true });
            const { name, description, pictureUrl } = this.state;
            this.props.createDog({
              name: name,
              description: description,
              image: pictureUrl,
              isFavourite: false,
            });
          }
          this.resetForm();
        }}
      >
        <h4>Create a New Dog</h4>
        <label htmlFor="name">Dog Name</label>
        <input
          type="text"
          onChange={(e) => {
            this.setState({ name: e.target.value });
          }}
          disabled={false}
        />
        <label htmlFor="description">Dog Description</label>
        <textarea
          name="description"
          id=""
          cols={80}
          rows={10}
          onChange={(e) => {
            this.setState({ description: e.target.value });
          }}
          disabled={false}
        />
        <label htmlFor="picture">Select an Image</label>
        <select
          onChange={(e) => {
            this.setState({ pictureUrl: e.target.value });
          }}
          disabled={false}
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
          value="Submit"
          disabled={!this.isValidDog() && !this.state.isSubmitting}
        />
      </form>
    );
  }
}
