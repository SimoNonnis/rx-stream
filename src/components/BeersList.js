import React from "react";

const BeersList = ({ beers }) => (
  <ul className="List">
    {beers.map(beer => {
      return (
        <li key={beer.id} className="List-item">
          <figure className="List-item-img">
            <img src={beer.image_url} alt="" />
          </figure>
          <div className="List-item-info">
            <p>{beer.name}</p>
            <ul>
              <li>
                <small>ABV: {beer.abv}</small>
              </li>
              <li>
                <small>
                  Volume: {beer.volume.unit} {beer.volume.unit}
                </small>
              </li>
            </ul>
          </div>
        </li>
      );
    })}
  </ul>
);

export default BeersList;
