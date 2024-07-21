import React, { forwardRef } from "react";
import PropTypes from "prop-types";

// Define HeroListItem component using forwardRef to allow ref forwarding
const HeroListItem = forwardRef(({ hero, onSelect }, ref) => (
  <li
    ref={ref} // Attach the ref to the <li> element for external access
    className="cursor-pointer border border-gray-700 rounded-lg shadow-lg p-4 transition-transform transform hover:scale-105 hover:bg-gray-800 hover:border-blue-500"
    onClick={onSelect} // Call onSelect function when the item is clicked
  >
    <h3 className="text-xl font-semibold mb-2">{hero.name}</h3>{" "}
    {/* Display the hero's name */}
    <p className="text-gray-400">{hero.gender}</p>{" "}
    {/* Display the hero's gender */}
  </li>
));

// Assign display name for the component, useful for debugging
HeroListItem.displayName = "HeroListItem";

// Define the expected prop types for the component
HeroListItem.propTypes = {
  hero: PropTypes.object.isRequired, // The hero object is required
  onSelect: PropTypes.func.isRequired, // The onSelect function is required
};

export default HeroListItem;
