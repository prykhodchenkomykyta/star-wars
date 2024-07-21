import { useEffect, useState, useRef } from "react";
import { getPeople } from "@/services/api";

// Custom hook to manage fetching and state of heroes data
const useHeroes = (page) => {
  // State to store the list of heroes
  const [heroes, setHeroes] = useState([]);
  // State to manage loading state
  const [loading, setLoading] = useState(true);
  // Ref to track whether a fetch request is currently in progress
  const loadingRef = useRef(false);

  useEffect(() => {
    // Function to fetch heroes data from the API
    const fetchHeroes = async () => {
      // If a request is already in progress, return early
      if (loadingRef.current) return;
      // Set the ref to true indicating a request is in progress
      loadingRef.current = true;

      try {
        // Fetch heroes data for the given page
        const response = await getPeople(page);
        setHeroes((prevHeroes) => {
          // Filter out heroes that are already in the state
          const newHeroes = response.data.results.filter(
            (newHero) =>
              !prevHeroes.some((prevHero) => prevHero.url === newHero.url)
          );
          // Append new heroes to the existing heroes state
          return [...prevHeroes, ...newHeroes];
        });
        // Set loading to false after data is fetched
        setLoading(false);
      } catch (error) {
        // Log error if the fetch fails
        console.error("Error fetching heroes:", error);
        setLoading(false); // Set loading to false if an error occurs
      } finally {
        // Set the ref back to false indicating that the request is complete
        loadingRef.current = false;
      }
    };

    // Call the fetchHeroes function
    fetchHeroes();
  }, [page]); // Dependency array to refetch data when the page changes

  // Return the current heroes list and loading state
  return { heroes, loading };
};

export default useHeroes;
