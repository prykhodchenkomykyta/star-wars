import React from "react";

const FilterSort = ({ filter, sortOrder, onFilterChange, onSortChange }) => (
  <div className="mb-4 flex items-center text-center">
    <label htmlFor="gender-filter" className="text-lg font-medium mb-2 pr-2">
      Filter by Gender:
    </label>
    <select
      id="gender-filter"
      value={filter}
      onChange={onFilterChange}
      className="bg-gray-900 p-2 border border-gray-300 rounded-lg mr-4"
    >
      <option value="all">All</option>
      <option value="male">Male</option>
      <option value="female">Female</option>
      <option value="hermaphrodite">Hermaphrodite</option>
      <option value="n/a">N/A</option>
    </select>

    <label htmlFor="sort-order" className="pr-2 mb-2 block text-lg font-medium">
      Sort by Name:
    </label>
    <select
      id="sort-order"
      value={sortOrder}
      onChange={onSortChange}
      className="bg-gray-900 p-2 border border-gray-300 rounded-lg"
    >
      <option value="asc">Ascending</option>
      <option value="desc">Descending</option>
    </select>
  </div>
);

export default FilterSort;
