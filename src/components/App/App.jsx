import React from "react";
import Router from "../Router";
import { ThemeProvider } from "../Theme";

/**
 * Renders the main App component.
 *
 * @returns {JSX.Element} The rendered App component.
 */
function App() {
  return (
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  );
}

export default App;
