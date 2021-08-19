import DateFnsUtils from "@date-io/date-fns";
import {
  Button,
  createStyles,
  Divider,
  FormControl,
  InputLabel,
  makeStyles,
  Paper,
  Select,
  TextField,
  Theme,
  Typography,
} from "@material-ui/core";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Game } from "../common/models/Game";
import { Player } from "../common/models/Player";
import { Stat } from "../common/models/Stat";
import GameService from "../common/Services/GameService";
import PlayerService from "../common/Services/PlayerService";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexWrap: "wrap",
    },
    textField: {
      width: 200,
    },
    paper: {
      marginLeft: "5rem",
      marginRight: "5rem",
      padding: "5rem",
    },
    divider: {
      margin: "3rem 0rem",
    },
    playerInput: {
      width: "25ch",
    },
    statInput: {
      width: "10ch",
      marginLeft: theme.spacing(1),
    },
    playerSpacing: {
      margin: "1rem 0rem",
      display: "flex",
    },
    scoreInput: {
      width: "20ch",
    },
    scoreSpacing: {
      marginLeft: theme.spacing(4),
    },
  })
);
const range = [[], [0], [0, 1], [0, 1, 2], [0, 1, 2, 3]];
const GameEntry = () => {
  const classes = useStyles();
  const history = useHistory();
  const [selectedDate, handleDateChange] = useState<Date | null>(new Date());
  const [allPlayers, setAllPlayers] = useState<Player[]>([]);
  const [gameType, setGameType] = useState(1);
  const [playersInGame, setPlayersInGame] = useState<Player[]>([]);
  const [statsInGame, setStatsInGame] = useState<Stat[]>([]);
  const [blueScore, setBlueScore] = useState(0);
  const [redScore, setRedScore] = useState(0);

  useEffect(() => {
    PlayerService.getAllPlayers().then((players) => {
      setAllPlayers(players);
    });
  }, []);

  const handleGameType = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    setGameType(Number(event.target.value));
    setPlayersInGame([]);
    setStatsInGame([]);
  };

  const handleStatUpdate = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>,
    category: keyof Stat,
    index: number
  ) => {
    const stat = Number(event.target.value);
    let copyOfStatsInGame = [...statsInGame];
    copyOfStatsInGame[index][category] = stat;
    setStatsInGame(copyOfStatsInGame);
  };

  const handlePlayerUpdate = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>,
    index: number
  ) => {
    const id = Number(event.target.value);
    const player = allPlayers.find((player) => player.id === id);
    if (player) {
      let copyOfPlayersInGames = [...playersInGame];
      copyOfPlayersInGames[index] = player;
      setPlayersInGame(copyOfPlayersInGames);
      let copyOfStatsInGame = [...statsInGame];
      copyOfStatsInGame[index] = {
        playerId: id,
        goals: 0,
        assists: 0,
        saves: 0,
        shots: 0,
      };
      setStatsInGame(copyOfStatsInGame);
    }
  };

  const handleSubmit = async () => {
    let game: Game = {
      blueScore: blueScore,
      redScore: redScore,
      gameTime: selectedDate || new Date(),
      blueTeam: { team: playersInGame.slice(0, gameType) },
      redTeam: { team: playersInGame.slice(gameType) },
      stats: statsInGame,
    };
    await GameService.createGame(game);
    return history.push("/games");
  };

  return (
    <div>
      <h1>Game Entry Page</h1>
      <Paper className={classes.paper}>
        <div>
          <div>
            <TextField
              id="outlined-number"
              label="Blue Score"
              type="number"
              value={blueScore}
              onChange={(input) => setBlueScore(Number(input.target.value))}
              className={classes.scoreInput}
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{ inputProps: { max: 100, min: 0 } }}
              variant="outlined"
            />
            <TextField
              id="outlined-number"
              label="Orange Score"
              type="number"
              value={redScore}
              onChange={(input) => setRedScore(Number(input.target.value))}
              className={clsx(classes.scoreInput, classes.scoreSpacing)}
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{ inputProps: { max: 100, min: 0 } }}
              variant="outlined"
            />
          </div>
          <div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DateTimePicker
                inputVariant="outlined"
                label="Game Time"
                value={selectedDate}
                onChange={(date) => handleDateChange(date)}
                minDate={new Date()}
              />
            </MuiPickersUtilsProvider>
          </div>
          <Divider className={classes.divider} />
        </div>
        <div>
          <FormControl variant="outlined" className={classes.textField}>
            <InputLabel htmlFor="outlined-age-native-simple">
              Team Type
            </InputLabel>
            <Select
              native
              value={gameType}
              onChange={handleGameType}
              label="Game Type"
              inputProps={{
                name: "teams",
                id: "outlined-age-native-simple",
              }}
            >
              <option value={1}>1v1</option>
              <option value={2}>2v2</option>
              <option value={3}>3v3</option>
              <option value={4}>4v4</option>
            </Select>
          </FormControl>
        </div>
        <div>
          <Typography>Blue Team</Typography>
          {range[gameType].map((index) => {
            return (
              <div className={classes.playerSpacing}>
                <FormControl variant="outlined" className={classes.playerInput}>
                  <InputLabel htmlFor="outlined-age-native-simple">
                    Player
                  </InputLabel>
                  <Select
                    native
                    label="Player"
                    defaultValue={""}
                    value={playersInGame[index]?.id || ""}
                    onChange={(input) => handlePlayerUpdate(input, index)}
                    inputProps={{
                      name: "Player",
                      id: "outlined-age-native-simple",
                    }}
                  >
                    <option value={""} disabled></option>
                    {allPlayers.map((player) => {
                      return (
                        <option
                          value={player.id}
                          hidden={playersInGame
                            .map((pInGame) => pInGame?.id)
                            .includes(player.id)}
                        >
                          {player.firstName} {player.lastName}
                        </option>
                      );
                    })}
                  </Select>
                </FormControl>
                <div hidden={!playersInGame[index]}>
                  <TextField
                    id="outlined-number"
                    label="Goals"
                    type="number"
                    value={statsInGame[index]?.goals || 0}
                    onChange={(input) =>
                      handleStatUpdate(input, "goals", index)
                    }
                    className={classes.statInput}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{ inputProps: { max: 100, min: 0 } }}
                    variant="outlined"
                  />
                  <TextField
                    className={classes.statInput}
                    id="outlined-number"
                    label="Assists"
                    type="number"
                    value={statsInGame[index]?.assists || 0}
                    onChange={(input) =>
                      handleStatUpdate(input, "assists", index)
                    }
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{ inputProps: { max: 100, min: 0 } }}
                    variant="outlined"
                  />
                  <TextField
                    className={classes.statInput}
                    id="outlined-number"
                    label="Saves"
                    type="number"
                    value={statsInGame[index]?.saves || 0}
                    onChange={(input) =>
                      handleStatUpdate(input, "saves", index)
                    }
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{ inputProps: { max: 100, min: 0 } }}
                    variant="outlined"
                  />
                  <TextField
                    className={classes.statInput}
                    id="outlined-number"
                    label="Shots"
                    onChange={(input) =>
                      handleStatUpdate(input, "shots", index)
                    }
                    type="number"
                    value={statsInGame[index]?.shots || 0}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{ inputProps: { max: 100, min: 0 } }}
                    variant="outlined"
                  />
                </div>
              </div>
            );
          })}
        </div>
        <div>
          <Typography>Orange Team</Typography>
          {range[gameType].map((index) => {
            const trueIndex = index + gameType;
            return (
              <div className={classes.playerSpacing}>
                <FormControl variant="outlined" className={classes.playerInput}>
                  <InputLabel htmlFor="outlined-age-native-simple">
                    Player
                  </InputLabel>
                  <Select
                    native
                    label="Player"
                    defaultValue={""}
                    value={playersInGame[trueIndex]?.id || ""}
                    onChange={(input) => handlePlayerUpdate(input, trueIndex)}
                    inputProps={{
                      name: "Player",
                      id: "outlined-age-native-simple",
                    }}
                  >
                    <option value={""} disabled></option>
                    {allPlayers.map((player) => {
                      return (
                        <option
                          value={player.id}
                          hidden={playersInGame
                            .map((pInGame) => pInGame?.id)
                            .includes(player.id)}
                        >
                          {player.firstName} {player.lastName}
                        </option>
                      );
                    })}
                  </Select>
                </FormControl>
                <div hidden={!playersInGame[trueIndex]}>
                  <TextField
                    id="outlined-number"
                    label="Goals"
                    type="number"
                    value={statsInGame[trueIndex]?.goals || 0}
                    onChange={(input) =>
                      handleStatUpdate(input, "goals", trueIndex)
                    }
                    className={classes.statInput}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{ inputProps: { max: 100, min: 0 } }}
                    variant="outlined"
                  />
                  <TextField
                    className={classes.statInput}
                    id="outlined-number"
                    label="Assists"
                    type="number"
                    value={statsInGame[trueIndex]?.assists || 0}
                    onChange={(input) =>
                      handleStatUpdate(input, "assists", trueIndex)
                    }
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{ inputProps: { max: 100, min: 0 } }}
                    variant="outlined"
                  />
                  <TextField
                    className={classes.statInput}
                    id="outlined-number"
                    label="Saves"
                    type="number"
                    value={statsInGame[trueIndex]?.saves || 0}
                    onChange={(input) =>
                      handleStatUpdate(input, "saves", trueIndex)
                    }
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{ inputProps: { max: 100, min: 0 } }}
                    variant="outlined"
                  />
                  <TextField
                    className={classes.statInput}
                    id="outlined-number"
                    label="Shots"
                    onChange={(input) =>
                      handleStatUpdate(input, "shots", trueIndex)
                    }
                    type="number"
                    value={statsInGame[trueIndex]?.shots || 0}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{ inputProps: { max: 100, min: 0 } }}
                    variant="outlined"
                  />
                </div>
              </div>
            );
          })}
        </div>
        <Divider className={classes.divider} />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Paper>
    </div>
  );
};

export default GameEntry;
