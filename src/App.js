import React from "react";
import { connect } from "react-redux";

import BeersList from "./components/BeersList";

const App = () => <BeersList />;

export default connect(state => state.app)(App);
