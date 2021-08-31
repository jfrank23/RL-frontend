import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const teamGenStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    teams: {
      display: "inline-block",
      marginLeft: "1rem",
      marginRight: "1rem",
      padding: "1rem",
      width: "95%",
    },
    root: {
      "& .super-app-theme--header": {
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.common.white,
      },
      "& .super-app-theme--cell": {
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.common.white,
      },
      "& .MuiDataGrid-iconSeparator": {
        display: "none",
      },
      "& .MuiDataGrid-columnHeader, .MuiDataGrid-cell": {
        borderRight: `1px solid ${
          theme.palette.type === "light" ? "#f0f0f0" : "#303030"
        }`,
      },
      "& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell": {
        borderBottom: `1px solid ${
          theme.palette.type === "light" ? "#f0f0f0" : "#303030"
        }`,
      },
    },
    grid: {
      flexGrow: 1,
    },
    paper_right: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
      marginLeft: "1rem",
      marginRight: "5rem",
    },
    paper_left: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
      marginLeft: "5rem",
      marginRight: "1rem",
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
      marginLeft: "5rem",
      marginRight: "5rem",
    },
    pageName: {
      marginLeft: "5rem",
    },
  })
);
