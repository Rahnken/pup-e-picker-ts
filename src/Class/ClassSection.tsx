// you can use `ReactNode` to add a type to the children prop
import { Component, ReactNode } from "react";
import { Link } from "react-router-dom";

type Props = {
  totalCount: number;
  favouriteCount: number;
  children: ReactNode;
  filterFavourites: () => void;
  filterUnfavourited: () => void;
  resetDogArray: () => void;
  setShowForm: () => void;
};
type State = {
  isActiveFilter: "favourite" | "unfavourite" | "form" | "all";
};
export class ClassSection extends Component<Props, State> {
  state: State = {
    isActiveFilter: "all",
  };
  render() {
    const {
      favouriteCount,
      children,
      totalCount,
      filterFavourites,
      filterUnfavourited,
      resetDogArray,
    } = this.props;
    const { isActiveFilter } = this.state;
    return (
      <section id="main-section">
        <div className="container-header">
          <div className="container-label">Dogs: </div>

          <Link to={"/functional"} className="btn">
            Change to Functional
          </Link>

          <div className="selectors">
            {/* This should display the favorited count */}
            <div
              className={`selector ${
                isActiveFilter === "favourite" ? "active" : ""
              }`}
              onClick={() => {
                // this is how we filter all the things I think , going to have to check
                if (isActiveFilter !== "favourite") {
                  filterFavourites();
                  this.setState({ isActiveFilter: "favourite" });
                } else {
                  this.setState({ isActiveFilter: "all" });
                  resetDogArray();
                }
              }}
            >
              Favourited ( {favouriteCount} )
            </div>

            {/* This should display the unfavorited count */}
            <div
              className={`selector ${
                isActiveFilter === "unfavourite" ? "active" : ""
              }`}
              onClick={() => {
                if (isActiveFilter !== "unfavourite") {
                  filterUnfavourited();
                  this.setState({ isActiveFilter: "unfavourite" });
                } else {
                  this.setState({ isActiveFilter: "all" });
                  resetDogArray();
                }
              }}
            >
              unfavorited ( {totalCount - favouriteCount} )
            </div>
            <div
              className={`selector ${
                isActiveFilter === "form" ? "active" : ""
              }`}
              onClick={() => {
                if (isActiveFilter !== "form") {
                  this.setState({ isActiveFilter: "form" });
                  this.props.setShowForm();
                } else {
                  this.setState({ isActiveFilter: "all" });
                  resetDogArray();
                }
              }}
            >
              create dog
            </div>
          </div>
        </div>
        <div className="content-container">{children}</div>
      </section>
    );
  }
}
