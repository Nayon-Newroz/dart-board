import logo from "./logo.svg";
import "./App.css";
import Board from "./Board";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Slide from "@mui/material/Slide";
import { SnackbarProvider } from "notistack";
const theme = createTheme({
  palette: {
    primary: {
      // main: "#353b48",
      main: "#1A5276",
      contrastText: "#fff",
    },
    success: {
      main: "#48C9B0",
      contrastText: "#fff",
    },
    info: {
      main: "#273c75",
      contrastText: "#fff",
    },
    error: {
      main: "#F91351",
      contrastText: "#fff",
    },
  },
  // typography: {
  //   h1: {
  //     [createTheme().breakpoints.down("xl")]: {
  //       fontSize: "4rem",
  //     },
  //   },
  //   h4: {
  //     [createTheme().breakpoints.down("xl")]: {
  //       fontSize: "1.75rem",
  //     },
  //   },
  // },
});
function App() {
  return (
    <div style={{ maxWidth: "600px", margin: "auto" }}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider
          maxSnack={1}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          TransitionComponent={Slide}
        >
          <Board />
        </SnackbarProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
