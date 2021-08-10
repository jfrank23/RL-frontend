import { Button } from "@material-ui/core";
import { useEffect, useState } from "react";
import { Player } from "../common/models/Player";
import PlayerService from "../common/Services/PlayerService";

interface exampleInputProps {
  input1: string;
}

const Example = ({ input1 }: exampleInputProps) => {
  const [stateExample, setStateExample] = useState(3);
  const [players, setPlayers] = useState<Player[]>([]);
  const [player, setPlayer] = useState<Player>();

  useEffect(() => {
    PlayerService.updatePlayer({
      id: 1,
      firstName: "Jordan",
      lastName: "Franklin",
    });
    PlayerService.getAllPlayers().then((players) => setPlayers(players));
    PlayerService.getPlayerById(1).then((player) => setPlayer(player));
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
