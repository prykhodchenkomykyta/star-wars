import React, { useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import HeroListItem from "@/components/HeroListItem/HeroListItem";

const HeroList = ({ heroes, loading, setPage, onSelect }) => {
  // Callback function to handle scroll events
  const handleScroll = useCallback(() => {
    // Exit if loading to prevent unnecessary page increments
    if (loading) return;

    // Get the total height of the document, the scroll position, and the window height
    const scrollableHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;

    // Check if the user has scrolled near the bottom of the page
    if (windowHeight + scrollTop >= scrollableHeight - 100) {
      // Increment the page number to load more content
      setPage((prevPage) => prevPage + 1);
    }
  }, [loading, setPage]); // Dependencies for the callback

  useEffect(() => {
    // Add scroll event listener when the component mounts
    window.addEventListener("scroll", handleScroll);

    // Clean up the scroll event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]); // Dependencies for the effect

  return (
    <ul className="space-y-8">
      {heroes.map((hero, index) => (
        <HeroListItem
          key={hero.url}
          hero={hero}
          onSelect={() => onSelect(hero)} // Pass selected hero to the parent component
        />
      ))}
    </ul>
  );
};

// Define expected prop types and their requirements
HeroList.propTypes = {
  heroes: PropTypes.array.isRequired, // Array of hero objects
  loading: PropTypes.bool.isRequired, // Boolean to indicate loading state
  setPage: PropTypes.func.isRequired, // Function to update the page number
  onSelect: PropTypes.func.isRequired, // Function to handle hero selection
};

export default HeroList;
