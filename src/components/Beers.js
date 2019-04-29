import React from "react";
import { connect } from "react-redux";
import BeersList from "./BeersList";
import { search } from "../actions/beersActions";

export const Beers = ({ data, status, search }) => {
  return (
    <>
      <div className="App-inputs">
        <input
          type="text"
          placeholder="Search beers"
          onChange={e => search(e.target.value)}
        />

        {status === "pending" && (
          <span className="App-spinner">
            <img src={"/ajax-loader.gif"} alt="" />
          </span>
        )}
      </div>
      {status === "success" && (
        <div className="App-content">
          <BeersList beers={data} />
        </div>
      )}
    </>
  );
};

export default connect(
  state => state.beers,
  { search }
)(Beers);
