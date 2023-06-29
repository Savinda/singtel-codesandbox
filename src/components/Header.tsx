/**
 * Header component
 * Header section of the application.
 * It includes a search bar and sort options.
 */
import React from "react";
import SearchBar from "./SearchBar";
import SortOptions from "./SortOptions";
const logo = require("../assets/logo.png");

interface HeaderProps {
  searchTerm: string;
  sortOption: string;
  sortDirection: string;
  onSearchChange: (searchText: string) => void;
  onSortOptionChange: (option: string) => void;
  onSortDirectionChange: (direction: string) => void;
  onClearSearch: () => void;
}

const Header: React.FC<HeaderProps> = ({
  searchTerm,
  sortOption,
  sortDirection,
  onSearchChange,
  onSortOptionChange,
  onSortDirectionChange,
  onClearSearch
}) => {
  const isDefaultFiltersChanged =
    sortOption !== "name" || sortDirection !== "asc" || searchTerm !== "";

  return (
    <nav className="bg-white sticky top-0 w-full z-20">
      <div className="px-4 md:px-12 py-4 md:py-0 flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="md:flex items-center w-full">
          <img
            className="hidden md:block"
            alt="logo"
            style={{ width: 48 }}
            src={String(logo)}
          />
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={onSearchChange}
            onClearSearch={onClearSearch}
          />
        </div>

        <SortOptions
          sortOption={sortOption}
          sortDirection={sortDirection}
          onSortOptionChange={onSortOptionChange}
          onSortDirectionChange={onSortDirectionChange}
          onClearSearch={onClearSearch}
          searchTerm={searchTerm}
        />
      </div>
    </nav>
  );
};

export default Header;
