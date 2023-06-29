/**
 * DogCard Component
 * Renders a card displaying information about a dog breed.
 *
 * -----
 * Brownie Points
 * - Show loading indicator for the images as they being downloaded.
 * - Line 110
 */

import React, { useState, useEffect } from "react";

// Dog interface defining the shape of a dog object
interface DogCardProps {
  dog: {
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
  };
}

const DogCard: React.FC<DogCardProps> = ({ dog }) => {
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    // Load image and update state when image is loaded
    const image = new Image();
    image.onload = () => {
      setImageLoading(false);
    };
    image.src = dog.image.url;
  }, [dog.image.url]);

  const renderCard = () => {
    return (
      <div className="flex flex-col text-gray-700 bg-white hover:bg-blue-50 px-4 py-2 border mb-2">
        <div className="flex items-center">
          {imageLoading ? (
            <div className="w-16 h-16 bg-gray-200 rounded-full animate-pulse" /> // loading indicator
          ) : (
            <img
              src={dog.image.url}
              alt={dog.name}
              className="w-16 h-16 object-cover rounded-full"
            />
          )}
          <div>
            <h1 className="font-bold text-lg ml-2 text-gray-900">{dog.name}</h1>
            <p className="text-sm ml-2">{dog.breed_group}</p>
          </div>
        </div>
        <div className="mt-2">
          {dog.temperament && (
            <div className="flex flex-wrap">
              <span className="mr-1">&#128054;</span>
              {dog.temperament.split(",").map((bred, index) => (
                <small
                  key={index}
                  className="border pb-0 pt-1/2 px-2 bg-blue-100 font-bold rounded-full mr-1 mb-1"
                >
                  {bred.trim()}
                </small>
              ))}
            </div>
          )}
          <div className="mt-2">
            <p className="text-xs py-1/2">
              <span className="font-bold">Bred for: </span>
              {dog.bred_for}
            </p>
            <p className="text-xs py-1/2">
              <span className="font-bold">Height: </span>
              {dog.height.imperial} in
            </p>
            <p className="text-xs py-1/2">
              <span className="font-bold">Weight: </span>
              {dog.weight.imperial} lb
            </p>
            <p className="text-xs py-1/2">
              <span className="font-bold">Life Span: </span>
              {dog.life_span} years
            </p>
          </div>
        </div>
      </div>
    );
  };

  // Render the appropriate content based on the screen size
  return (
    <React.Fragment>
      {/* Render as a table row on desktop screens */}
      <tr className="hidden md:table-row bg-white hover:bg-blue-50 px-2 md:px-4 text-xs border w-full text-gray-900">
        <td className="pr-2 py-2 md:pl-8 pl-2">
          {imageLoading ? (
            <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse" />
          ) : (
            <img
              src={dog.image.url}
              alt={dog.name}
              className="w-12 h-12 object-cover rounded-full mr-4"
            />
          )}
        </td>
        <td className="pr-4 py-2">{dog.name}</td>
        <td className="pr-4 py-2">{dog.breed_group}</td>
        <td className="pr-4 py-2 overflow-x-hidden">{dog.bred_for}</td>
        <td>
          {dog.temperament && (
            <div className="flex flex-wrap py-2">
              {dog.temperament
                .split(",")
                // .slice(0, 2)
                .map((bred, index) => (
                  <small
                    key={index}
                    className="border pb-0 pt-1/2 px-1 text-gray-800 bg-blue-100 font-bold rounded-full mr-1 mb-1"
                  >
                    {bred.trim()}
                  </small>
                ))}
            </div>
          )}
        </td>
        <td className="pr-4 py-2">{dog.height.imperial}</td>
        <td className="pr-4 py-2">{dog.weight.imperial}</td>
        <td className="pr-4 py-2">{dog.life_span}</td>
      </tr>
      {/* Render as a card on mobile screens */}
      <tr className="md:hidden">
        <td colSpan={8}>{renderCard()}</td>
      </tr>
    </React.Fragment>
  );
};

export default DogCard;
