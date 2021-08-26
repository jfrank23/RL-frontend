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
    },
    root: {
      "& .super-app-theme--header": {
        backgroundColor: theme.palette.success.dark,
        color: theme.palette.common.white,
      },
      "& .super-app-theme--cell": {
        backgroundColor: theme.palette.success.dark,
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
  })
);