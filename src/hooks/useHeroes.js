import { useEffect, useState, useRef } from "react";
import { getPeople } from "@/services/api";

const useHeroes = (page) => {
  const [heroes, setHeroes] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadingRef = useRef(false);

  useEffect(() => {
    const fetchHeroes = async () => {
      if (loadingRef.current) return;
      loadingRef.current = true;
      try {
        const response = await getPeople(page);
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

  return { heroes, loading };
};

export default useHeroes;
