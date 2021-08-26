import { ThemeProvider } from "@material-ui/core";
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Home/HomePage";
import "./index.css";
import MaterialMenu from "./Menu/Menu";

import Players from "./Players/PlayersPage";
import Teams from "./Teams/TeamsPage";
import Games from "./Games/GamesPage";
import GameEntry from "./Games/GameEntry";
import PlayerEntry from "./Players/PlayerEntry";
import TeamGenerator from "./Teams/TeamGenerator";

import mainTheme from "./common/variables/theme";

export default function App() {
  return (
    <ThemeProvider theme={mainTheme}>
      <Router>
        <main>
          <MaterialMenu>
            <Route path="/" exact component={Home} />
            <Route path="/players" component={Players} />
            <Route path="/games" component={Games} />
            <Route path="/teams" component={Teams} />
            <Route path="/game_entry" component={GameEntry} />
            <Route path="/player_entry" component={PlayerEntry} />
            <Route path="/team_generator" component={TeamGenerator} />
          </MaterialMenu>
        </main>
      </Router>
    </ThemeProvider>
  );
}
