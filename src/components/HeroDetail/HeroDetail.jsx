"use client";

import { useEffect, useState } from "react";
import ReactFlow, { Background, Controls } from "react-flow-renderer";
import { getFilm, getStarship } from "@/services/api";

const HeroDetail = ({ hero }) => {
  const [films, setFilms] = useState([]);
  const [starships, setStarships] = useState([]);
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  const onLoad = (reactFlowInstance) => reactFlowInstance.fitView();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const filmPromises = hero.films.map((filmId) => getFilm(filmId));
        const starshipPromises = hero.starships.map((starshipId) =>
          getStarship(starshipId)
        );

        const filmResponses = await Promise.all(filmPromises);
        const starshipResponses = await Promise.all(starshipPromises);

        setFilms(filmResponses.map((response) => response.data));
        setStarships(starshipResponses.map((response) => response.data));
      } catch (error) {
        console.error("Error fetching hero details:", error);
      }
    };

    fetchDetails();
  }, [hero]);

  useEffect(() => {
    if (!hero) return;

    const heroNode = {
      id: hero.id.toString(),
      data: { label: hero.name },
      position: { x: 250, y: 0 },
    };

    const filmNodes = films.map((film, index) => ({
      id: `film-${film.id}`,
      data: { label: `Film: ${film.title}` },
      position: { x: 250, y: (index + 1) * 100 },
    }));

    const starshipNodes = starships.map((starship, index) => ({
      id: `starship-${starship.id}`,
      data: { label: `Starship: ${starship.name}` },
      position: { x: 500, y: (index + 1) * 100 },
    }));

    const filmEdges = films.map((film) => ({
      id: `edge-${hero.id}-film-${film.id}`,
      source: hero.id.toString(),
      target: `film-${film.id}`,
    }));

    const starshipEdges = starships.flatMap((starship) =>
      starship.films.map((filmId) => ({
        id: `edge-${filmId}-starship-${starship.id}`,
        source: `film-${filmId}`,
        target: `starship-${starship.id}`,
      }))
    );

    const uniqueNodes = [heroNode, ...filmNodes, ...starshipNodes].filter(
      (value, index, self) => index === self.findIndex((t) => t.id === value.id)
    );

    const uniqueEdges = [...filmEdges, ...starshipEdges].filter(
      (value, index, self) => index === self.findIndex((t) => t.id === value.id)
    );

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
