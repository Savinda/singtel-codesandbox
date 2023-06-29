/**
 * DogTable Component
 * Renders a table displaying information about a list of dog breeds.
 */

import React from "react";
import DogCard from "./DogCard";

// DogTableProps interface for the component props
interface DogTableProps {
  dogs: Dog[];
}

// Dog interface defining the shape of a dog object
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

// DogTable component
const DogTable: React.FC<DogTableProps> = ({ dogs }) => {
  // Function to format the life span string
  const formatLifeSpan = (lifeSpan: string): string =>
    lifeSpan.replace(" years", "");

  return (
    <div className="container mx-auto overflow-x-auto px-2 md:px-4 md:px-0 py-2">
      <table className="w-full  text-xs text-left table-auto md:table-fixed">
        <thead className="md:h-12 text-normal">
          <tr className="hidden md:table-row text-gray-700">
            <th></th>
            <th>Name</th>
            <th>Breed</th>
            <th>Bred for</th>
            <th>Temperament</th>
            <th>Height (in)</th>
            <th>Weight (lb)</th>
            <th>Life Span (y)</th>
          </tr>
        </thead>
        <tbody>
          {dogs.map((dog) => (
            <DogCard
              key={dog.id}
              dog={{
                ...dog,
                life_span: formatLifeSpan(dog.life_span) // Format the life span string - remove years
              }}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DogTable;
