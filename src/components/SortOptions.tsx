/**
 * SortOptions Component
 * Sort options for sorting data.
 *
 * Implementation
 * * The list of dogs must be sortable by?
 * Name
 * Height
 * Lifespan
 */

import React, { ReactNode } from "react";

import {
  SortIcon,
  AscendingIcon,
  DescendingIcon,
  ClearIcon
} from "../assets/Icons";

interface SortOptionsProps {
  searchTerm: string;
  sortOption: string;
  sortDirection: string;
  onSortOptionChange: (option: string) => void;
  onSortDirectionChange: (direction: string) => void;
  onClearSearch: () => void;
}

interface RadioButtonProps {
  value: string;
  checked: boolean;
  onChange: () => void;
  label: ReactNode;
}

const RadioButton: React.FC<RadioButtonProps> = ({
  value,
  checked,
  onChange,
  label
}) => (
  <div
    className={`flex items-center px-4 border mr-2 ${
      checked ? "bg-blue-400" : "bg-white border-gray-300"
    } rounded-full`}
  >
    <input
      type="radio"
      value={value}
      name="bordered-radio"
      id={`${value}_radio`}
      checked={checked}
      onChange={onChange}
      className="hidden"
    />
    <label
      htmlFor={`${value}_radio`}
      className={`w-full py-2 text-sm cursor-pointer ${
        checked ? "text-white" : "text-gray-600"
      }`}
    >
      {label}
    </label>
  </div>
);

const SortOptions: React.FC<SortOptionsProps> = ({
  searchTerm,
  sortOption,
  sortDirection,
  onSortOptionChange,
  onSortDirectionChange,
  onClearSearch
}) => {
  const handleOptionChange = (option: string) => {
    onSortOptionChange(option);
  };

  const handleDirectionChange = (direction: string) => {
    onSortDirectionChange(direction);
  };

  const isDefaultFiltersChanged =
    sortOption !== "name" || sortDirection !== "asc" || searchTerm !== "";

  return (
    <div className="flex pt-4 md:py-4 sort-options sticky bg-white">
      <span className="px-0 pr-4 md:px-4 mt-2 text-sm text-gray-400">
        <SortIcon />
      </span>

      <div className="flex items-center tooltip">
        <RadioButton
          value="name"
          checked={sortOption === "name"}
          onChange={() => handleOptionChange("name")}
          label="Name"
        />

        <RadioButton
          value="height"
          checked={sortOption === "height"}
          onChange={() => handleOptionChange("height")}
          label="Height"
        />

        <RadioButton
          value="lifespan"
          checked={sortOption === "lifespan"}
          onChange={() => handleOptionChange("lifespan")}
          label="Lifespan"
        />
        <span className="tooltiptext">
          Sort list of dogs by Name, Height or Lifespan &#9757;
        </span>
      </div>
      <div className="fixed z-19 bottom-0 right-0 pr-32 md:pr-0 pb-10 mt-3 md:mt-auto md:pl-8 md:relative md:pb-0 md:right-auto md:bottom-auto">
        <div className="flex md:items-center ml-4 order-by tooltip">
          <RadioButton
            value="asc"
            checked={sortDirection === "asc"}
            onChange={() => handleDirectionChange("asc")}
            label={<AscendingIcon />}
          />
          <RadioButton
            value="desc"
            checked={sortDirection === "desc"}
            onChange={() => handleDirectionChange("desc")}
            label={<DescendingIcon />}
          />
          <span className="tooltiptext">
            Sort items{" "}
            <span className="hidden md:block">
              {" "}
              Ascending/ Descending &#9757;
            </span>
          </span>
          {isDefaultFiltersChanged && (
            <button
              className="ml-2 md:ml-4 bg-red-500 text-white py-2 px-2 rounded-full text-sm border border-red-300"
              onClick={onClearSearch}
            >
              <ClearIcon />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SortOptions;
