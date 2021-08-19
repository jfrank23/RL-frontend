import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const gameEntryStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexWrap: "wrap",
    },
    gameTypeInput: {
      width: 200,
      marginBottom: theme.spacing(2),
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
    gameTimeSpacing: {
      marginTop: theme.spacing(4),
    },
    sectionHeading: {
      marginBottom: theme.spacing(4),
    },
    pageName: {
      marginLeft: "5rem",
    },
  })
);
