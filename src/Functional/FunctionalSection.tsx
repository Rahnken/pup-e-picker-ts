// you can use this type for react children if you so choose
import { Dispatch, ReactNode, SetStateAction } from "react";
import { Link } from "react-router-dom";
import { TFilterValues } from "../types";

export const FunctionalSection = ({
  favouriteCount,
  totalCount,
  filterFavourites,
  filterUnfavourited,
  resetDogArray,
  setShowForm,
  activeFilter,
  setActiveFilter,

  children,
}: {
  favouriteCount: number;
  totalCount: number;
  resetDogArray: () => void;
  filterFavourites: () => void;
  filterUnfavourited: () => void;
  activeFilter: TFilterValues;
  setShowForm: Dispatch<SetStateAction<boolean>>;
  setActiveFilter: Dispatch<SetStateAction<TFilterValues>>;
  children: ReactNode;
}) => {
  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">Dogs: </div>
        <Link to={"/class"} className="btn">
          Change to Class
        </Link>
        <div className="selectors">
          {/* This should display the favorited count */}
          <div
            className={`selector ${
              activeFilter === "favourite" ? "active" : ""
            }`}
            onClick={() => {
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
                setShowForm(true);
              } else {
                setActiveFilter("none");
                resetDogArray;
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
};
