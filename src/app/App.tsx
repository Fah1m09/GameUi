import { createTheme, Paper, ThemeProvider } from "@mui/material";
import { SnackbarProvider } from "notistack";
import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./../assets/scss/App.scss";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import MissingRoute from "./components/MissingRoute";
import PlayGame from "./components/PlayGame/PlayGame";
import SnackbarAction from "./components/SnackBarUtils/SnackBarAction";
import { SnackbarUtilsConfigurator } from "./components/SnackBarUtils/SnackBarUtils";
import Loader from "./features/Loader/Loader";
import HomePage from "./pagaes/home";

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

const App = () => {
  const [mode, setMode] = React.useState<"light" | "dark">("dark");

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "dark"));
      },
    }),
    []
  );

  const theme = React.useMemo(() => createTheme({}), [mode]);

  return (
    <SnackbarProvider
      action={(key) => <SnackbarAction id={key} />}
      maxSnack={3}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <SnackbarUtilsConfigurator />
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <Paper>
            <div className="use-bootstrap">
              <BrowserRouter basename="/">
                <Header theme={theme} colorMode={colorMode} />

                <Routes>
                  {/* map routes from menu constants */}
                  {/* <Route path="/" element={<Navigate to={menus[0].path} />} /> */}
                  <Route path="/" element={<HomePage />} />
                  <Route path="/game/:id" element={<PlayGame />} />
                  <Route path="*" element={<MissingRoute />} />
                </Routes>
                <Loader />
              </BrowserRouter>
              <Footer />
            </div>
          </Paper>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </SnackbarProvider>
  );
};

export default App;
