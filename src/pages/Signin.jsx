import React, { Component, useState } from "react";
import { Grid, Typography, Box } from "@mui/material";
import { theme, ButtonPrimary } from "./Style.jsx";
import { ThemeProvider } from "@mui/material/styles";
import { signIn } from "../Firebase.js"

import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Container from "@mui/material/Container";

const handleSubmit = (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  signIn(data.get("email"), data.get("password"));
  // console.log({
  //   email: data.get("email"),
  //   password: data.get("password"),
  // });
};

export default class Signin extends Component {
  constructor(props) {
    super(props);
    this.userType = props.userType;
    this.state = {};
  }

  render() {
    const userType = this.userType;
    const alternativeSigninHref =
      this.userType == "tenant" ? "/signin/landlord" : "/signin/tenant";
    const alternativeSigninText =
      this.userType == "tenant" ? "Sign in as landlord" : "Sign in as tenant";

    return (
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in as {userType}
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <ButtonPrimary
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, width: "100%" }}
              >
                Sign In
              </ButtonPrimary>
              <Grid container>
                <Grid item xs>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
                <Grid item>
                  <Link href={alternativeSigninHref} variant="body2">
                    {alternativeSigninText}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    );
  }
}
