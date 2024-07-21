import React, { forwardRef } from "react";
import PropTypes from "prop-types";

const HeroListItem = forwardRef(({ hero, onSelect }, ref) => (
  <li
    ref={ref}
    className="cursor-pointer border border-gray-700 rounded-lg shadow-lg p-4 transition-transform transform hover:scale-105 hover:bg-gray-800 hover:border-blue-500"
    onClick={onSelect}
  >
    <h3 className="text-xl font-semibold mb-2">{hero.name}</h3>
    <p className="text-gray-400">{hero.gender}</p>
  </li>
));

HeroListItem.displayName = "HeroListItem";

HeroListItem.propTypes = {
  hero: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default HeroListItem;
