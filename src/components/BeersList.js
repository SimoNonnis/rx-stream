import React from "react";
import { connect } from "react-redux";

const BeerList = ({ data, loading }) => (
  <div>
    {loading ? (
      <p>Please wait...</p>
    ) : (
      <div>
        <p>Got {data.length} beer(s)</p>
      </div>
    )}
  </div>
);

export default connect(state => state.beers)(BeerList);
