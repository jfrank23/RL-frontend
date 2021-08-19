import { createTheme } from "@material-ui/core";

const mainTheme = createTheme({
  palette: {
    primary: {
      main: "#39b54a",
    },
    secondary: {
      main: "#ffffff",
    },
    error: {
      main: "#ff0000",
    },
  },
  typography: {
    fontFamily: "sans-serif",
    fontSize: 20,
  },
});
export default mainTheme;
