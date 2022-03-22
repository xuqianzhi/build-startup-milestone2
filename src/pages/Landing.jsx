import React, { Component, useState } from "react";
import Navbar from "./Navbar.jsx";
import { Stack, Grid, Typography, Box } from "@mui/material";
import { theme, FeatureGrid, ButtonPrimary } from "./Style.jsx";
import { ThemeProvider } from "@mui/material/styles";
import PaidIcon from '@mui/icons-material/Paid';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import EngineeringIcon from '@mui/icons-material/Engineering';
import logo from '../logo.jpg';

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
    <Stack direction='column' alignItems='center'>

      <Icon sx={{ width: 100, height: 100, margin: '10px', color: "secondary.main" }}></Icon>

      <Typography variant="h5" padding={2} fontWeight="bold" textAlign='center'>
        {title}
      </Typography>

      <Typography variant="h5" padding={2} textAlign='center' margin='20px'>
        {content}
      </Typography>

      <ButtonPrimary>
        Learn More
      </ButtonPrimary>

    </Stack>
  )
}

export default class Landing extends Component {
  constructor(props) {
    super(props);
    this.windowWidth = window.screen.width;
    this.state = {};
  }

  render() {
    return (
      <div>
        <Navbar></Navbar>
        <ThemeProvider theme={theme}>
          {/* Top Board */}
          <Grid container sx={{ backgroundColor: "background.main", width: this.windowWidth, height: '500px' }}>
            <Grid container width='40%' direction='column' justifyContent='center' paddingLeft={4} >
              <Typography variant="h3" padding={1} fontWeight='bold'>
                Residential
              </Typography>

              <Typography variant="h5" padding={1} color='primary.main' fontWeight="bold">
                Main Features in Pickspace Residential Property Management Software
              </Typography>

              <Typography variant="h5" padding={1}>
                Main Features in Residential Management Software
              </Typography>
            </Grid>
            <Grid container width='60%' direction='column' justifyContent='center' alignItems='center'>
              <img width='400px' height='400px' src={logo}></img>
            </Grid>
          </Grid>

          {/* Feature Header */}
          <Grid container sx={{
            width: this.windowWidth, height: 'auto', direction: 'column',
            justifyContent: 'center', padding: '40px'
          }}>
            <Grid item>
              <Typography variant="h3" padding={1} textAlign='center' fontWeight='bold'>
                Features in Altex Virtual
              </Typography>
            </Grid>
          </Grid>

          {/* Feature Lists */}
          <Grid container sx={{
            width: this.windowWidth, height: 'auto', direction: 'column',
            justifyContent: 'center', padding: '40px', backgroundColor: 'background.main'
          }}>
            <FeatureGrid item xs={3.5}>
              <FeatureCard
                title='Collect Rent Payments'
                content='Process all your income payment automatically. Collect rent quickly!...'
                iconClass='PaidIcon'></FeatureCard>
            </FeatureGrid>

            <FeatureGrid item xs={3.5}>
              <FeatureCard
                title='Document
                Storage'
                content='Secure document storage makes every lease, document,...'
                iconClass='DocumentScannerIcon'></FeatureCard>
            </FeatureGrid>

            <FeatureGrid item xs={3.5}>
              <FeatureCard
                title='Maintenance Management'
                content='Powerful maintenance management tools eliminate paperwork,...'
                iconClass='EngineeringIcon'></FeatureCard>
            </FeatureGrid>

          </Grid>
        </ThemeProvider>
      </div>
    );
  }
}
