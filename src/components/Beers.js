import React from "react";
import { connect } from "react-redux";
import BeersList from "./BeersList";
import { fetchData } from "../actions/beersActions";

export const Beers = ({ data, status, fetchData }) => {
  return (
    <>
      <div className="App-inputs">
        <button
          type="button"
          onClick={fetchData}
          disabled={status === "pending"}
        >
          Fetch Beers!
        </button>
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
  { fetchData }
)(Beers);
