import { ThemeProvider } from "@material-ui/core";
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Home/HomePage";
import "./index.css";
import MaterialMenu from "./Menu/Menu";
import PlayersPage from "./Players/PlayersPage";
import mainTheme from "./common/variables/theme";

export default function App() {
  return (
    <ThemeProvider theme={mainTheme}>
      <Router>
        <main>
          <MaterialMenu>
            <Route path="/" exact component={Home} />
            <Route path="/players" component={PlayersPage} />
            <Route path="/games" component={PlayersPage} />
            <Route path="/teams" component={PlayersPage} />
          </MaterialMenu>
        </main>
      </Router>
    </ThemeProvider>
  );
}
