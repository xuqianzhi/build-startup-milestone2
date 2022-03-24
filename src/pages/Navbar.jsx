import React, { Component } from "react";
import { AppBar, Toolbar, Typography, Grid } from "@mui/material";
// import { Button } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { theme, ButtonSecondary } from "./Style.jsx";
import Link from '@mui/material/Link';
import logo from '../logo.jpg';

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <AppBar color="background" position="static">
          <Toolbar color="primary" variant="dense">
            {/* <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <img src={logo}><img/>
            </Typography> */}
            <Grid  sx={{ flexGrow: 1 }}>
              <img style={{width: '100px', height: '100px'}} src={logo}></img>
            </Grid>
            <ButtonSecondary variant="contained" href="/signin/tenant">
              Sign in
            </ButtonSecondary>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    );
  }
}
