/**
 * App
 * -------------------------------------------------------------------------------------------------
 * Implementation Details - DONE
 * 1. User input should be debounced for 1 sec - line 105
 *    (system must wait for 1 sec after user stops typing before calling the search api)
 *
 * 2. The list of dogs must be sortable by
 *    Name, Height, Lifespan - Component SortOptions called on - line 154
 *
 * ------------------------------------------------------------------------------------------------
 * Brownie Points - DONE
 * i) Write your own debounce function with unit tests - utils/debounce.tsx and tests debounce.tests.ts
 * ii) Show loading indicator for the images as they being downloaded. - components/DogCard.tsx line 110
 * iii) Find and handle an error in the response data format. -
 *      If the response data is not an array, an error is thrown with the message
 *      "Invalid response data format." The error is then caught in the catch block,
 *      and appropriate actions can be taken
 */

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Header from "./components/Header";
import Loading from "./components/Loading";
import DogTable from "./components/DogTable";

const notFound = require("./assets/404.gif");
const responseError = require("./assets/response-error.gif");

interface Dog {
  id: number;
  name: string;
  height: {
    imperial: string;
    metric: string;
  };
  weight: {
    imperial: string;
    metric: string;
  };
  life_span: string;
  image: {
    url: string;
  };
  bred_for: string;
  breed_group: string;
  temperament: string;
}

const App: React.FC = () => {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [loading, setLoading] = useState(true);
  const fetchedDogs = useRef<Dog[]>([]);
  const [, setInitialLoad] = useState(true);
  const [fetchError, setFetchError] = useState(false); // State for the fetch error status
  const debouncedSearch = useRef<ReturnType<typeof setTimeout>>(); // Reference to the debounced search timeout

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Dog[]>(
          "https://api.thedogapi.com/v1/breeds",
          {
            headers: {
              "x-api-key": process.env.DOG_API_KEY
            }
          }
        );
        fetchedDogs.current = response.data;
        setDogs(response.data);
        setLoading(false);
        setInitialLoad(false);

        // Handle the case when response.data is not an array
        if (!Array.isArray(response.data)) {
          setFetchError(true);
        }
      } catch (error) {
        console.log("Error:", error);
        setLoading(false);
        setInitialLoad(false);
        setFetchError(true);
      }
    };

    fetchData();

    return () => {
      clearTimeout(debouncedSearch.current);
    };
  }, []);

  const sortDogs = (dogsToSort: Dog[], option: string, direction: string) => {
    let sortedDogs: Dog[] = [...dogsToSort];

    switch (option) {
      case "name":
        sortedDogs.sort((a, b) => {
          const nameA = a.name.toLowerCase();
          const nameB = b.name.toLowerCase();

          if (direction === "asc") {
            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
          } else if (direction === "desc") {
            if (nameA > nameB) return -1;
            if (nameA < nameB) return 1;
          }

          return 0;
        });
        break;
      case "height":
        sortedDogs.sort((a, b) => {
          const heightA = parseInt(a.height.imperial, 10);
          const heightB = parseInt(b.height.imperial, 10);

          if (direction === "asc") {
            return heightA - heightB;
          } else if (direction === "desc") {
            return heightB - heightA;
          }

          return 0;
        });
        break;
      case "lifespan":
        sortedDogs.sort((a, b) => {
          const lifespanA = parseInt(a.life_span, 10);
          const lifespanB = parseInt(b.life_span, 10);

          if (direction === "asc") {
            return lifespanA - lifespanB;
          } else if (direction === "desc") {
            return lifespanB - lifespanA;
          }

          return 0;
        });
        break;
      default:
        break;
    }

    setDogs(sortedDogs);
  };

  const handleSearch = (searchText: string) => {
    setSearchTerm(searchText);
    setSortOption("name");
    setSortDirection("asc");
    setLoading(true);

    if (debouncedSearch.current) {
      clearTimeout(debouncedSearch.current);
    }

    debouncedSearch.current = setTimeout(() => {
      const filteredDogs = fetchedDogs.current.filter((dog) =>
        dog.name.toLowerCase().includes(searchText.toLowerCase())
      );
      sortDogs(filteredDogs, sortOption, sortDirection); // Sort the filtered dogs based on the options
      setLoading(false);
    }, 1000); // 1 second delay
  };

  useEffect(() => {
    // sort fetched dogs initially
    sortDogs(fetchedDogs.current, sortOption, sortDirection);

    return () => {
      clearTimeout(debouncedSearch.current);
    };
  }, [sortDirection, sortOption]);

  const handleSortOptionChange = (option: string) => {
    if (option === sortOption) {
      // Toggle the sort direction if clicking on the same option
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // Set the sort direction to ascending when clicking on a different option
      setSortDirection("asc");
    }
    setSortOption(option);
    sortDogs(dogs, option, sortDirection); // Sort the dogs based on the updated options
  };

  const handleSortDirectionChange = (direction: string) => {
    setSortDirection(direction);
    sortDogs(dogs, sortOption, direction);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setSortOption("name");
    setSortDirection("asc");
    setDogs(fetchedDogs.current);
  };

  const filteredDogs = dogs.filter((dog) =>
    dog.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mx-auto">
      <Header
        searchTerm={searchTerm}
        sortOption={sortOption}
        sortDirection={sortDirection}
        onSearchChange={handleSearch}
        onSortOptionChange={handleSortOptionChange}
        onSortDirectionChange={handleSortDirectionChange}
        onClearSearch={handleClearSearch}
      />
      {loading ? (
        <div className="flex justify-center items-center mt-10">
          <Loading />
        </div>
      ) : fetchError ? (
        <div className="flex flex-col justify-center items-center mt-10">
          <img alt="404" style={{ width: 96 }} src={String(responseError)} />
          <small className="mt-4 text-red-700">
            Oops! The response data is not in the expected format.
          </small>
        </div>
      ) : dogs.length === 0 ? (
        <div className="flex flex-col justify-center items-center mt-10">
          <img alt="404" style={{ width: 96 }} src={String(notFound)} />
          <small className="mt-4">
            Bark! No luck. Try another search term.
          </small>
        </div>
      ) : (
        <DogTable dogs={filteredDogs} />
      )}
    </div>
  );
};

export default App;
