import React from "react";
import renderer from "react-test-renderer";
import App from "../App";

test("renders App component correctly", () => {
    // Render the App component using react-test-renderer
    const tree = renderer.create(<App />).toJSON();
  
    // Assert that the rendered output matches the stored snapshot
    expect(tree).toMatchSnapshot();
  });
  