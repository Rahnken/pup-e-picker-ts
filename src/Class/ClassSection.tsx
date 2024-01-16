// you can use `ReactNode` to add a type to the children prop
import { Component, ReactNode } from "react";
import { Link } from "react-router-dom";

type Props = {
  totalCount: number;
  favouriteCount: number;
  children: ReactNode;
};
export class ClassSection extends Component<Props> {
  render() {
    const { favouriteCount, children, totalCount } = this.props;
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
              className={`selector`}
              onClick={() => {
                // this is how we filter all the things I think , going to have to check
              }}
            >
              Favourited ( {favouriteCount} )
            </div>

            {/* This should display the unfavorited count */}
            <div className={`selector`} onClick={() => {}}>
              unfavorited ( {totalCount - favouriteCount} )
            </div>
            <div className={`selector active`} onClick={() => {}}>
              create dog
            </div>
          </div>
        </div>
        <div className="content-container">{children}</div>
      </section>
    );
  }
}
