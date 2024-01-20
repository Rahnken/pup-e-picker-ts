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
            <div
              className={`selector ${
                activeFilter === "favourite" ? "active" : ""
              }`}
              onClick={() => {
                activeFilter !== "favourite"
                  ? setActiveFilter("favourite")
                  : setActiveFilter("none");
              }}
            >
              Favourited ( {favouriteCount} )
            </div>
            <div
              className={`selector ${
                activeFilter === "unfavourite" ? "active" : ""
              }`}
              onClick={() => {
                activeFilter !== "unfavourite"
                  ? setActiveFilter("unfavourite")
                  : setActiveFilter("none");
              }}
            >
              unfavorited ( {totalCount - favouriteCount} )
            </div>
            <div
              className={`selector ${activeFilter === "form" ? "active" : ""}`}
              onClick={() => {
                activeFilter !== "form"
                  ? setActiveFilter("form")
                  : setActiveFilter("none");
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
