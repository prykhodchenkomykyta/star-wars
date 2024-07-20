"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import HeroDetail from "../components/HeroDetail/HeroDetail";
import Modal from "../components/Modals/Modal";
import { getPeople } from "@/services/api";

const Home = () => {
  const [heroes, setHeroes] = useState([]);
  const [selectedHero, setSelectedHero] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc");
  const observer = useRef();
  const loadingRef = useRef(false);

  useEffect(() => {
    const fetchHeroes = async () => {
      if (loadingRef.current) return;
      loadingRef.current = true;
      try {
        const response = await getPeople(page);
        console.log(response);
        setHeroes((prevHeroes) => {
          const newHeroes = response.data.results.filter(
            (newHero) =>
              !prevHeroes.some((prevHero) => prevHero.url === newHero.url)
          );
          return [...prevHeroes, ...newHeroes];
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching heroes:", error);
        setLoading(false);
      } finally {
        loadingRef.current = false;
      }
    };
    fetchHeroes();
  }, [page]);

  const lastHeroElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading]
  );

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const filteredHeroes = heroes.filter((hero) => {
    if (filter === "all") return true;
    return hero.gender === filter;
  });

  const sortedHeroes = [...filteredHeroes].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.name.localeCompare(b.name);
    } else {
      return b.name.localeCompare(a.name);
    }
  });

  return (
    <div className="p-4 mx-auto">
      <div className="mb-4 flex items-center text-center">
        <label
          htmlFor="gender-filter"
          className="text-lg font-medium mb-2 pr-2"
        >
          Filter by Gender:
        </label>
        <select
          id="gender-filter"
          value={filter}
          onChange={handleFilterChange}
          className="bg-gray-900 p-2 border border-gray-300 rounded-lg mr-4"
        >
          <option value="all">All</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="hermaphrodite">Hermaphrodite</option>
          <option value="n/a">N/A</option>
        </select>

        <label
          htmlFor="sort-order"
          className="pr-2 mb-2 block text-lg font-medium"
        >
          Sort by Name:
        </label>
        <select
          id="sort-order"
          value={sortOrder}
          onChange={handleSortChange}
          className="bg-gray-900 p-2 border border-gray-300 rounded-lg"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      <ul className="space-y-8">
        {sortedHeroes.map((hero, index) => (
          <li
            key={hero.url}
            ref={index === sortedHeroes.length - 1 ? lastHeroElementRef : null}
            className="cursor-pointer border border-gray-700 rounded-lg shadow-lg p-4 transition-transform transform hover:scale-105 hover:bg-gray-800 hover:border-blue-500"
            onClick={() => setSelectedHero(hero)}
          >
            <h3 className="text-xl font-semibold mb-2">{hero.name}</h3>
            <p className="text-gray-400">{hero.gender}</p>
          </li>
        ))}
      </ul>
      {loading && (
        <div className="flex justify-center items-center h-screen w-screen">
          <div className="loader"></div>
        </div>
      )}
      {selectedHero && (
        <Modal onClose={() => setSelectedHero(null)}>
          <HeroDetail hero={selectedHero} />
        </Modal>
      )}
    </div>
  );
};

export default Home;
