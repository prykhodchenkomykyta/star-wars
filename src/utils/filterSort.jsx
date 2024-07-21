import React from "react";

const FilterSort = ({ filter, sortOrder, onFilterChange, onSortChange }) => (
  <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center text-center sm:text-left">
    <div className="flex sm:flex-row items-center mb-4 sm:mb-0">
      <label
        htmlFor="gender-filter"
        className="text-lg font-medium mb-0 pl-2 pr-2"
      >
        Filter by Gender:
      </label>
      <select
        id="gender-filter"
        value={filter}
        onChange={onFilterChange}
        className="bg-gray-900 p-2 border border-gray-300 rounded-lg mt-2 sm:mt-0"
      >
        <option value="all">All</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="hermaphrodite">Hermaphrodite</option>
        <option value="n/a">N/A</option>
      </select>
    </div>

    <div className="flex sm:flex-row items-center">
      <label
        htmlFor="sort-order"
        className="text-lg font-medium mb-2 mb-0 pr-2 pl-2"
      >
        Sort by Name:
      </label>
      <select
        id="sort-order"
        value={sortOrder}
        onChange={onSortChange}
        className="bg-gray-900 p-2 border border-gray-300 rounded-lg mt-2 sm:mt-0"
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  </div>
);

export default FilterSort;
