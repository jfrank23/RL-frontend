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
import PlayerSpecific from "./Players/PlayerSpecific";

import mainTheme from "./common/variables/theme";
import TeamSpecific from "./Teams/TeamSpecific";
import GameSpecific from "./Games/GamesSpecific";

export default function App() {
  return (
    <ThemeProvider theme={mainTheme}>
      <Router>
        <main>
          <MaterialMenu>
            <Route path="/" exact component={Home} />
            <Route path="/players" component={Players} />
            <Route path="/playerSpecific/:id" component={PlayerSpecific} />
            <Route path="/games" exact component={Games} />
            <Route path="/games/:id" component={GameSpecific} />
            <Route path="/teams" exact component={Teams} />
            <Route path="/teams/:id" component={TeamSpecific} />
            <Route path="/game_entry" component={GameEntry} />
            <Route path="/player_entry" component={PlayerEntry} />
          </MaterialMenu>
        </main>
      </Router>
    </ThemeProvider>
  );
}
