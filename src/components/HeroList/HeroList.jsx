import React, { useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import HeroListItem from "@/components/HeroListItem/HeroListItem";

const HeroList = ({ heroes, loading, setPage, onSelect }) => {
  const handleScroll = useCallback(() => {
    if (loading) return;

    const scrollableHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;

    if (windowHeight + scrollTop >= scrollableHeight - 100) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [loading, setPage]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <ul className="space-y-8">
      {heroes.map((hero, index) => (
        <HeroListItem
          key={hero.url}
          hero={hero}
          onSelect={() => onSelect(hero)}
        />
      ))}
    </ul>
  );
};

HeroList.propTypes = {
  heroes: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  setPage: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default HeroList;
