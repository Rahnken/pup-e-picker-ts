// you can use `ReactNode` to add a type to the children prop
import { Component, ReactNode } from "react";
import { Link } from "react-router-dom";
import { TFilterValues } from "../types";

type Props = {
  totalCount: number;
  favouriteCount: number;
  children: ReactNode;
  filterFavourites: () => void;
  filterUnfavourited: () => void;
  resetDogArray: () => void;
  setShowForm: () => void;
  activeFilter: TFilterValues;
  setActiveFilter: (value: TFilterValues) => void;
};

export class ClassSection extends Component<Props> {
  render() {
    const {
      favouriteCount,
      children,
      totalCount,
      activeFilter,
      filterFavourites,
      filterUnfavourited,
      resetDogArray,
      setActiveFilter,
    } = this.props;
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
                activeFilter === "favourite" ? "active" : ""
              }`}
              onClick={() => {
                // this is how we filter all the things I think , going to have to check
                if (activeFilter !== "favourite") {
                  filterFavourites();
                  setActiveFilter("favourite");
                } else {
                  setActiveFilter("none");
                  resetDogArray();
                }
              }}
            >
              Favourited ( {favouriteCount} )
            </div>

            {/* This should display the unfavorited count */}
            <div
              className={`selector ${
                activeFilter === "unfavourite" ? "active" : ""
              }`}
              onClick={() => {
                if (activeFilter !== "unfavourite") {
                  filterUnfavourited();
                  setActiveFilter("unfavourite");
                } else {
                  setActiveFilter("none");
                  resetDogArray();
                }
              }}
            >
              unfavorited ( {totalCount - favouriteCount} )
            </div>
            <div
              className={`selector ${activeFilter === "form" ? "active" : ""}`}
              onClick={() => {
                if (activeFilter !== "form") {
                  setActiveFilter("form");
                  this.props.setShowForm();
                } else {
                  setActiveFilter("none");
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
