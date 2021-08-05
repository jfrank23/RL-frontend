import { ThemeProvider } from "@material-ui/core";
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Home/HomePage";
import "./index.css";
import Players from "./Players/PlayersPage";
import mainTheme from "./variables/theme";

export default function App() {
  return (
    <Router>
      <ThemeProvider theme={mainTheme}>
        <main>
          <nav>
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/players">Players</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
            </ul>
          </nav>

          <Route path="/" exact component={Home} />
          <Route path="/players" component={Players} />
        </main>
      </ThemeProvider>
    </Router>
  );
}
