import React from "react";
import { connect } from "react-redux";
import BeersList from "./BeersList";
import { search, cancel } from "../actions/beersActions";
import { setConfig } from "../actions/configActions";

export const Beers = ({ beers, perPage, search, cancel, setConfig }) => {
  const { data, status, messages } = beers;

  return (
    <>
      <div className="App-inputs">
        <select
          name="per-page"
          defaultValue={perPage}
          onChange={e => setConfig(e.target.value)}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(value => (
            <option key={value} value={value}>
              {value} results
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Search beers"
          onChange={e => search(e.target.value)}
        />

        {status === "pending" && (
          <>
            <button type="button" onClick={cancel}>
              Cancel
            </button>
            <span className="App-spinner">
              <img src={"/ajax-loader.gif"} alt="" />
            </span>
          </>
        )}
      </div>
      {status === "success" && (
        <div className="App-content">
          <BeersList beers={data} />
        </div>
      )}

      {status === "failure" && (
        <div className="App-content">
          <p>Oops! {messages[0].text}</p>
        </div>
      )}
    </>
  );
};

export default connect(
  state => ({
    beers: state.beers,
    perPage: state.config.perPage
  }),
  { search, cancel, setConfig }
)(Beers);
