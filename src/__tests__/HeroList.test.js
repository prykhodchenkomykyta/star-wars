import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import HeroList from "@/components/HeroList/HeroList";
import "@testing-library/jest-dom";

const mockHeroes = [
  { url: "1", name: "Luke Skywalker", gender: "male" },
  { url: "2", name: "Leia Organa", gender: "female" },
];

const setPage = jest.fn();
const onSelect = jest.fn();

describe("HeroList", () => {
  test("renders list of heroes", () => {
    render(
      <HeroList
        heroes={mockHeroes}
        loading={false}
        setPage={setPage}
        onSelect={onSelect}
      />
    );
    expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
    expect(screen.getByText("Leia Organa")).toBeInTheDocument();
  });

  test("calls onSelect when a hero is clicked", () => {
    render(
      <HeroList
        heroes={mockHeroes}
        loading={false}
        setPage={setPage}
        onSelect={onSelect}
      />
    );
    fireEvent.click(screen.getByText("Luke Skywalker"));
    expect(onSelect).toHaveBeenCalledWith(mockHeroes[0]);
  });
});
