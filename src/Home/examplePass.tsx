import { Button } from "@material-ui/core";
import { useEffect, useState } from "react";
import { Game } from "../common/models/Game";
import { Player } from "../common/models/Player";
import GameService from "../common/Services/GameService";
import PlayerService from "../common/Services/PlayerService";
import TeamService from "../common/Services/TeamService";

interface exampleInputProps {
  input1: string;
}

const Example = ({ input1 }: exampleInputProps) => {
  const [stateExample, setStateExample] = useState(3);
  const [players, setPlayers] = useState<Player[]>([]);
  const [player, setPlayer] = useState<Player>();
  const [games, setGames] = useState<Game>();

  useEffect(() => {
    PlayerService.getAllPlayers().then((players) => setPlayers(players));
    PlayerService.getPlayerById(1).then((player) => setPlayer(player));
    TeamService.getAllTeams();
    GameService.getGamesById(18).then((games) => setGames(games));
    setStateExample(10);
  }, []);
  return (
    <div>
      <Button variant="contained" color="secondary">
        Joe {input1}
      </Button>
      <div>{player?.firstName}</div>
      {players.map((player) => {
        return (
          <p key={player.id}>
            {player.firstName} {player.lastName}
          </p>
        );
      })}
      <p>{stateExample}</p>
    </div>
  );
};

export default Example;
