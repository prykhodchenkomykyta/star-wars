"use client";

import { useEffect, useState } from "react";
import ReactFlow, { Background, Controls } from "react-flow-renderer";
import { getFilm, getStarship } from "@/services/api";

const HeroDetail = ({ hero }) => {
  // State to store films and starships related to the hero
  const [films, setFilms] = useState([]);
  const [starships, setStarships] = useState([]);

  // State for React Flow nodes and edges
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  // Function to fit the view when the React Flow instance is loaded
  const onLoad = (reactFlowInstance) => reactFlowInstance.fitView();

  useEffect(() => {
    // Fetch film and starship details based on hero's data
    const fetchDetails = async () => {
      try {
        // Create promises for fetching film and starship data
        const filmPromises = hero.films.map((filmId) => getFilm(filmId));
        const starshipPromises = hero.starships.map((starshipId) =>
          getStarship(starshipId)
        );

        // Await all promises to resolve
        const filmResponses = await Promise.all(filmPromises);
        const starshipResponses = await Promise.all(starshipPromises);

        // Update state with the fetched data
        setFilms(filmResponses.map((response) => response.data));
        setStarships(starshipResponses.map((response) => response.data));
      } catch (error) {
        console.error("Error fetching hero details:", error);
      }
    };

    // Fetch details when the hero prop changes
    fetchDetails();
  }, [hero]);

  useEffect(() => {
    // Update nodes and edges for the React Flow diagram
    if (!hero) return;

    // Create a node for the hero
    const heroNode = {
      id: hero.id.toString(),
      data: { label: hero.name },
      position: { x: 250, y: 0 },
    };

    // Create nodes for each film
    const filmNodes = films.map((film, index) => ({
      id: `film-${film.id}`,
      data: { label: `Film: ${film.title}` },
      position: { x: 250, y: (index + 1) * 100 },
    }));

    // Create nodes for each starship
    const starshipNodes = starships.map((starship, index) => ({
      id: `starship-${starship.id}`,
      data: { label: `Starship: ${starship.name}` },
      position: { x: 500, y: (index + 1) * 100 },
    }));

    // Create edges from hero to films
    const filmEdges = films.map((film) => ({
      id: `edge-${hero.id}-film-${film.id}`,
      source: hero.id.toString(),
      target: `film-${film.id}`,
    }));

    // Create edges from films to starships
    const starshipEdges = starships.flatMap((starship) =>
      starship.films.map((filmId) => ({
        id: `edge-${filmId}-starship-${starship.id}`,
        source: `film-${filmId}`,
        target: `starship-${starship.id}`,
      }))
    );

    // Ensure unique nodes and edges
    const uniqueNodes = [heroNode, ...filmNodes, ...starshipNodes].filter(
      (value, index, self) => index === self.findIndex((t) => t.id === value.id)
    );

    const uniqueEdges = [...filmEdges, ...starshipEdges].filter(
      (value, index, self) => index === self.findIndex((t) => t.id === value.id)
    );

    // Update state with unique nodes and edges
    setNodes(uniqueNodes);
    setEdges(uniqueEdges);
  }, [films, starships, hero]);

  return (
    <div className="flex flex-col items-center space-y-4 p-4">
      <div className="h-96 w-full">
        <ReactFlow nodes={nodes} edges={edges} onLoad={onLoad} fitView>
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
};

export default HeroDetail;
