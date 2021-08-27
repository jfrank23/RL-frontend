import { createTheme } from "@material-ui/core";

const mainTheme = createTheme({
  palette: {
    primary: {
      main: "#0c88fc",
      dark: "#0859a5",
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
