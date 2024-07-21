import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import HeroListItem from "@/components/HeroListItem/HeroListItem";

const mockHero = { url: "1", name: "Luke Skywalker", gender: "male" };
const onSelect = jest.fn();

describe("HeroListItem", () => {
  test("renders hero item", () => {
    render(<HeroListItem hero={mockHero} onSelect={onSelect} />);
    expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
    expect(screen.getByText("male")).toBeInTheDocument();
  });

  test("calls onSelect when clicked", () => {
    render(<HeroListItem hero={mockHero} onSelect={onSelect} />);
    fireEvent.click(screen.getByText("Luke Skywalker"));
    expect(onSelect).toHaveBeenCalled();
  });
});
