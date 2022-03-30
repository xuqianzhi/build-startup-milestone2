import React, { Component } from "react";
import { AppBar, Toolbar, Typography, Grid } from "@mui/material";
// import { Button } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { theme, ButtonSecondary, ButtonPrimary } from "./Style.jsx";

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    const shouldShowSignIn = props.shouldShowSignIn;
    this.state = {
      shouldShowSignIn: shouldShowSignIn
    };
  }

  render() {
    const signInButtonDisplay = this.state.shouldShowSignIn ? 'inline-flex' : 'none';
    const homeButtonDisplay = !this.state.shouldShowSignIn ? 'inline-flex' : 'none';
    return (
      <ThemeProvider theme={theme}>
        <AppBar color="background" position="static">
          <Toolbar color="primary" variant="dense">
            {/* <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <img src={logo}><img/>
            </Typography> */}
            <Grid sx={{ flexGrow: 1 }}>
              <ButtonSecondary variant="contained" href="/" sx={{ display: homeButtonDisplay, width: '100px', height: '50px' }}>
                Home
              </ButtonSecondary>
            </Grid>
            <ButtonSecondary variant="contained" href="/signin/tenant" sx={{ display: signInButtonDisplay }}>
              Sign in
            </ButtonSecondary>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    );
  }
}
