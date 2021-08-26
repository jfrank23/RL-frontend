import { Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import React, { useEffect, useState } from "react";
import { Game } from "../common/models/Game";
import GameService from "../common/Services/GameService";
import { CustomGameTable } from "../common/components/CustomGameTable";

const Games = () => {
  const [allGames, setAllGames] = useState<Game[]>([]);

  useEffect(() => {
    GameService.getAllGames().then((games) => {
      setAllGames(games);
    });
  }, [allGames]);

  return (
    <div>
      <Typography variant="h3" style={{ marginLeft: "5rem" }}>
        Games Page
      </Typography>
      <Paper
        style={{ marginLeft: "5rem", marginRight: "5rem", padding: "5rem" }}
      >
        <CustomGameTable 
          game={allGames.sort(
            (a, b) => new Date(b.gameTime).getTime() - new Date(a.gameTime).getTime()
          )} 
        />
      </Paper>
    </div>
  );
};

export default Games;
