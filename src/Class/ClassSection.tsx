// you can use `ReactNode` to add a type to the children prop
import { Component, ReactNode } from "react";
import { Link } from "react-router-dom";
import { TSelectedTab } from "../types";

type Props = {
  totalCount: number;
  favouriteCount: number;
  children: ReactNode;
  activeFilter: TSelectedTab;
  setActiveFilter: (value: TSelectedTab) => void;
};

export class ClassSection extends Component<Props> {
  render() {
    const {
      favouriteCount,
      children,
      totalCount,
      activeFilter,
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
  }
}
