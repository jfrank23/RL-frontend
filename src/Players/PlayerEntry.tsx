import {
  Button,
  createStyles,
  makeStyles,
  Paper,
  TextField,
  Theme,
  Typography,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Player } from "../common/models/Player";
import PlayerService from "../common/Services/PlayerService";

const playerEntryStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      marginLeft: "5rem",
      marginRight: "5rem",
      padding: "5rem",
    },
    inputSpacing: {
      marginBottom: theme.spacing(2),
    },
    warning: {
      color: "#fc9c0c",
    },

    pageName: {
      marginLeft: "5rem",
    },
  })
);

const PlayerEntry = () => {
  const history = useHistory();
  const classes = playerEntryStyles();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    PlayerService.getAllPlayers().then((players) => setPlayers(players));
  }, []);

  const showWarning = () => {
    const sameName = players.filter(
      (player) =>
        player.firstName.toLowerCase() === firstName.toLowerCase() &&
        player.lastName.toLowerCase() === lastName.toLowerCase()
    );
    if (sameName.length) {
      return true;
    }
    return false;
  };

  const isButtonDisabled = () => {
    if (firstName.length < 1 || firstName.length > 20) {
      return true;
    }
    if (lastName.length < 1 || lastName.length > 20) {
      return true;
    }
    return false;
  };

  const handleSubmit = async () => {
    await PlayerService.createPlayer({
      firstName: firstName,
      lastName: lastName,
    });
    return history.push("/players");
  };
  return (
    <div>
      <Typography variant="h3" className={classes.pageName}>
        Player Entry
      </Typography>

      <Paper className={classes.paper}>
        <div>
          <TextField
            id="outlined-number"
            label="First Name"
            className={classes.inputSpacing}
            value={firstName}
            onChange={(input) => setFirstName(input.target.value.trim())}
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
        </div>
        <div>
          <TextField
            id="outlined-number"
            label="Last Name"
            value={lastName}
            className={classes.inputSpacing}
            onChange={(input) => setLastName(input.target.value.trim())}
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
        </div>
        <div>
          <Typography color="error" hidden={!isButtonDisabled()}>
            Please make sure that first and last name is filled out and each
            field is less than 20 characters.
          </Typography>
          <Typography className={classes.warning} hidden={!showWarning()}>
            This name matches a name already in the database. You may still
            submit if you choose.
          </Typography>
          <Button
            disabled={isButtonDisabled()}
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
      </Paper>
    </div>
  );
};

export default PlayerEntry;
