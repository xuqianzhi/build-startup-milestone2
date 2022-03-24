import { createTheme } from "@mui/material/styles";
import { Button, Grid } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#414DBB",
    },
    secondary: {
      main: "#21C166",
    },
    background: {
      main: "#F2EFE7",
    },
  },
});

const ButtonSecondary = styled(Button)(({ theme }) => ({
  color: "white",
  margin: 8,
  width: "140px",
  height: "60px",
  borderRadius: "45px",
  background: theme.palette.secondary.main,
  "&:hover": {
    background: theme.palette.primary.main,
  },
  textTransform: "none",
  fontSize: "17px",
}));

const ButtonPrimary = styled(Button)(({ theme }) => ({
  color: "white",
  margin: 8,
  width: "180px",
  height: "60px",
  borderRadius: "45px",
  background: theme.palette.primary.main,
  "&:hover": {
    background: theme.palette.secondary.main,
  },
  textTransform: "none",
  fontSize: "17px",
}));

const FeatureGrid = styled(Grid)(({ theme }) => ({
  margin: "15px",
  padding: "10px",
  backgroundColor: "white",
  height: "auto",
  borderRadius: "17px",
}));

export { theme, ButtonSecondary, ButtonPrimary, FeatureGrid };
