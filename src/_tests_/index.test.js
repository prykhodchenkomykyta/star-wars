import { render, screen, fireEvent } from "@testing-library/react";
import Home from "../pages/index";

test("renders hero list and loads more on button click", async () => {
  render(<Home />);
  expect(screen.getByText(/Load More/i)).toBeInTheDocument();
  fireEvent.click(screen.getByText(/Load More/i));
  expect(await screen.findByText(/Luke Skywalker/i)).toBeInTheDocument();
});
