import React from "react";
import Snowman from "./Snowman";
import { render, fireEvent, getByRole, queryByRole } from "@testing-library/react";

it("renders Snowman without crashing", function () {
  render(<Snowman />);
});

it("snapshot test of DOM at start", function () {
  const { asFragment } = render(<Snowman words={["apple"]}/>);
  expect(asFragment()).toMatchSnapshot();
})

it("snowman image changes to img1 on incorrect guess", function() {
  const { getByText, getByRole } = render(<Snowman words={["apple"]}/>);
  // incorrect ltr chosen
  const button = getByText("v");

  fireEvent.click(button);

  const img = getByRole('img');
  expect(img).toHaveAttribute("src", "1.png");
})

it("snowman image should stay as img0 on correct guess", function() {
  const { getByText, getByRole } = render(<Snowman words={["apple"]}/>);
  // incorrect ltr chosen
  const button = getByText("a");

  fireEvent.click(button);

  const img = getByRole('img');
  expect(img).toHaveAttribute("src", "0.png");
})

it("ensures guesses are limited by max number of guesses", function() {
  const { getByText, asFragment } = render(<Snowman words={["apple"]} maxWrong={6}/>);
  // incorrect ltr chosen
  const button1 = getByText("b");
  const button2 = getByText("c");
  const button3 = getByText("d");
  const button4 = getByText("f");
  const button5 = getByText("g");
  const button6 = getByText("h");

  fireEvent.click(button1);
  fireEvent.click(button2);
  fireEvent.click(button3);
  fireEvent.click(button4);
  fireEvent.click(button5);
  fireEvent.click(button6);

  expect(asFragment()).toMatchSnapshot();

  expect(getByText("Ran out of guesses")).toBeInTheDocument();
})

it("ensures game resets on reset button click", function() {
  const { getByText, queryByText } = render(<Snowman words={["apple"]} maxWrong={6}/>);
  // incorrect ltr chosen
  const ltrButton = getByText("b");
  const button1 = getByText("RESET GAME");


  fireEvent.click(ltrButton);
  expect(getByText("Number wrong: 1")).toBeInTheDocument();
  expect(queryByText("Number wrong: 0")).not.toBeInTheDocument(); 
  fireEvent.click(button1);
  expect(getByText("Number wrong: 0")).toBeInTheDocument();
  expect(queryByText("Number wrong: 1")).not.toBeInTheDocument();

})

