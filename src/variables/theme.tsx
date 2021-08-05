import { createMuiTheme } from "@material-ui/core";

const mainTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#39b54a",
    },
    secondary: {
      main: "#ffffff",
    },
  },
  typography: {
    fontFamily: "Open Sans",
  },
});
export default mainTheme;
