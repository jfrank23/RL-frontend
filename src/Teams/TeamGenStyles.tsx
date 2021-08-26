import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const teamGenStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      marginLeft: "5rem",
      marginRight: "5rem",
      padding: "5rem",
    },
    title:{
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },                              
    teams:{
      display: "inline-block",
      marginLeft: "1rem",
      marginRight: "1rem",
      padding: "1rem",
      width: "50%",
    }
  })
);