import React, { Component, useState } from "react";
import { theme, ButtonPrimary } from "./Style.jsx";
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { FormControlLabel, FormControl, RadioGroup, Radio, FormLabel } from '@mui/material';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';

const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
        email: data.get('email'),
        password: data.get('password'),
    });
};

export default class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="firstName"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        name="lastName"
                                        autoComplete="family-name"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl>
                                        <FormLabel id="signup-radio-buttons-group-label">Signing up as:</FormLabel>
                                        <RadioGroup
                                            aria-labelledby="signup-radio-buttons-group-label"
                                            defaultValue="Tenant"
                                            name="signup-radio-buttons-group"
                                        >
                                            <FormControlLabel value="tenant" control={<Radio />} label="Tenant" />
                                            <FormControlLabel value="landlord" control={<Radio />} label="Landlord" />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <ButtonPrimary
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2, width: '100%' }}
                            >
                                Sign Up
                            </ButtonPrimary>
                            <Grid container justifyContent="flex-end">
                                <Grid item xs>
                                    <Link href="/signin/tenant" variant="body2">
                                        Sign in as tenant
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="/signin/landlord" variant="body2">
                                        Sign in as landlord
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