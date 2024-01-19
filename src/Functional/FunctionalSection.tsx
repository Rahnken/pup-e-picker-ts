// you can use this type for react children if you so choose
import { Dispatch, ReactNode, SetStateAction } from "react";
import { Link } from "react-router-dom";
import { TSelectedTab } from "../types";

export const FunctionalSection = ({
  activeFilter,
  setActiveFilter,
  totalCount,
  favouriteCount,
  children,
}: {
  activeFilter: TSelectedTab;
  setActiveFilter: Dispatch<SetStateAction<TSelectedTab>>;
  totalCount: number;
  favouriteCount: number;
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
                setActiveFilter("favourite");
              } else {
                setActiveFilter("none");
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
                setActiveFilter("unfavourite");
              } else {
                setActiveFilter("none");
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
              } else {
                setActiveFilter("none");
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
