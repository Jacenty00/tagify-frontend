import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';

import { App as AdminApp } from './components/admin/App';
import { App as GuestApp } from './components/guest/App';
import { App as UserApp } from './components/user/App';
import BackendToken from './utils/BackendAPI';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#dcedc8",
      light: "#fffffb",
      dark: "#aabb97",
      contrastText: "#000000",
    },
    secondary: {
      main: "#d9c8ed",
      light: "#fffbff",
      dark: "#a797bb",
      contrastText: "#000000",
    },
  },
  typography: {
    fontFamily: `"Raleway", sans-serif`,
    fontSize: 17,
    fontWeightLight: 200,
    fontWeightRegular: 300,
    fontWeightMedium: 300,
  },
});

function App() {
  return (
    <div style={{ overflowX: "hidden" }}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Switch>
            <Route path="/admin" component={AdminApp} />
            <Route path="/welcome" component={GuestApp} />
            <Route path="/login" component={GuestApp} />
            <Route path="/*" component={UserApp} />
            <Route path="*" component={() => "404 NOT FOUND"} />
          </Switch>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
