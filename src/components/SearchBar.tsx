/**
 * SearchBar Component
 * Search bar for filtering data by name.
 */

import React from "react";

import { SearchIcon, ClearIcon } from "../assets/Icons";

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (searchText: string) => void;
  onClearSearch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  onSearchChange,
  onClearSearch
}) => {
  const handleClearClick = () => {
    onClearSearch();
  };

  return (
    <div className="px-0 md:px-4 flex-grow">
      <div className="relative text-gray-500 tooltip">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <SearchIcon />
        </div>
        <input
          type="text"
          className="transition-all ease-in-out block w-full p-2 pl-10 text-sm text-gray-800 border border-gray-300 rounded-full bg-white focus:ring-blue-500 focus:border-blue-500"
          style={{ paddingRight: searchTerm ? "2rem" : "1rem" }}
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {searchTerm && (
          <button
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
            onClick={handleClearClick}
          >
            <ClearIcon />
          </button>
        )}
        <span className="tooltiptext">
          API triggered after the user stops typing for 1s. &#9757;
        </span>
      </div>
    </div>
  );
};

export default SearchBar;
