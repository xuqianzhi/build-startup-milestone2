import React, { Component, useState } from "react";
import Navbar from "./Navbar.jsx";
import { Stack, Grid, Typography, Box } from "@mui/material";
import { theme, FeatureGrid, ButtonPrimary } from "./Style.jsx";
import { ThemeProvider } from "@mui/material/styles";
import PaidIcon from "@mui/icons-material/Paid";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import EngineeringIcon from "@mui/icons-material/Engineering";
import DomainAddIcon from "@mui/icons-material/DomainAdd";
import logo from '../logo.jpg';

export default class Landing extends Component {
  constructor(props) {
    super(props);
    this.windowWidth = window.screen.width;
    this.state = {};
  }

  render() {
    return (
      <div>
        <Navbar shouldShowSignIn={true} ></Navbar>
        <ThemeProvider theme={theme}>
          {/* Top Board */}
          <Grid
            container
            sx={{
              backgroundColor: "background.main",
              width: this.windowWidth,
              height: "500px",
            }}
          >
            <Grid
              container
              width="40%"
              direction="column"
              justifyContent="center"
              paddingLeft="120px"
            >
              <Typography variant="h3" padding={1} fontWeight="bold">
                Welcome to Homey!
              </Typography>

              <Typography
                variant="h5"
                padding={1}
                color="primary.main"
                fontWeight="bold"
              >
                See what is new in your community
              </Typography>

              {/* <Typography variant="h5" padding={1}>
                See what is new in your community
              </Typography> */}
            </Grid>
            {/* <Grid container width='60%' direction='column' justifyContent='center' alignItems='center'>
              <img width='400px' height='400px' src={logo}></img>
            </Grid> */}
            <Grid
              container
              width="60%"
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <img src={logo} style={{width: '250px', height: '300px'}}></img>
              {/* <DomainAddIcon
                sx={{ width: "400px", height: "400px", color: "primary.main" }}
              ></DomainAddIcon> */}
            </Grid>
          </Grid>

          {/* Feature Header */}
          <Grid
            container
            sx={{
              width: this.windowWidth,
              height: "auto",
              direction: "column",
              justifyContent: "center",
              padding: "40px",
            }}
          >
            <Grid item>
              <Typography
                variant="h5"
                padding={1}
                textAlign="center"
                fontWeight="bold"
              >
                Homey's simple, unified property management platform is there to help you be at your best.
              </Typography>
            </Grid>
          </Grid>

          {/* Feature Lists */}
          <Grid
            container
            sx={{
              width: this.windowWidth,
              height: "auto",
              direction: "column",
              justifyContent: "center",
              padding: "40px",
              backgroundColor: "background.main",
            }}
          >
            <FeatureGrid item xs={3.5}>
              <FeatureCard
                title="Collect Rent Payments"
                content="Process all your income payment automatically. Collect rent quickly!..."
                iconClass="PaidIcon"
              ></FeatureCard>
            </FeatureGrid>

            <FeatureGrid item xs={3.5}>
              <FeatureCard
                title="Store Documents"
                content="Secure document storage makes every lease, document,..."
                iconClass="DocumentScannerIcon"
              ></FeatureCard>
            </FeatureGrid>

            <FeatureGrid item xs={3.5}>
              <FeatureCard
                title="Manage Maintenance"
                content="Powerful maintenance management tools eliminate paperwork,..."
                iconClass="EngineeringIcon"
              ></FeatureCard>
            </FeatureGrid>
          </Grid>
        </ThemeProvider>
      </div>
    );
  }
}

const FeatureCard = ({ title, content, iconClass }) => {
  var Icon;
  if (iconClass == "PaidIcon") {
    Icon = PaidIcon;
  } else if (iconClass == "DocumentScannerIcon") {
    Icon = DocumentScannerIcon;
  } else if (iconClass == "EngineeringIcon") {
    Icon = EngineeringIcon;
  } else {
    Icon = Grid;
  }

  return (
    <Stack direction="column" alignItems="center">
      <Icon
        sx={{
          width: 100,
          height: 100,
          margin: "10px",
          color: "secondary.main",
        }}
      ></Icon>

      <Typography variant="h5" padding={2} fontWeight="bold" textAlign="center">
        {title}
      </Typography>

      <Typography variant="h5" padding={2} textAlign="center" margin="20px">
        {content}
      </Typography>

      <ButtonPrimary>Learn More</ButtonPrimary>
    </Stack>
  );
};
