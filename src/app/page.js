"use client";

import { useState } from "react";
import HeroDetail from "@/components/HeroDetail/HeroDetail";
import Modal from "@/components/Modals/Modal";
import HeroList from "@/components/HeroList/HeroList";
import FilterSort from "../utils/filterSort";
import useHeroes from "../hooks/useHeroes";

const Home = () => {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedHero, setSelectedHero] = useState(null);
  const { heroes, loading } = useHeroes(page);

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
      <div>
        {!loading && (
          <div>
            <FilterSort
              filter={filter}
              sortOrder={sortOrder}
              onFilterChange={handleFilterChange}
              onSortChange={handleSortChange}
            />
            <HeroList
              heroes={sortedHeroes}
              loading={loading}
              setPage={setPage}
              onSelect={setSelectedHero}
            />
          </div>
        )}
        {loading && (
          <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
            <div className="loader"></div>
          </div>
        )}
        {selectedHero && (
          <Modal onClose={() => setSelectedHero(null)}>
            <HeroDetail hero={selectedHero} />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default Home;
