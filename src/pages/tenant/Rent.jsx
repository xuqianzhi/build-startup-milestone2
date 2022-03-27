import { Stack, Box, Paper } from "@mui/material";
import { theme, ButtonPrimary } from "../Style.jsx";
import RentDue from "./RentDue.jsx";

export default function Rent() {
  return (
    <Stack
      sx={{
        width: "80vw",
        height: "80vh",
        direction: "column",
        alignItems: "center",
      }}
    >
      <Box md={4} lg={3} width='70%'>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: 240,
          }}
        >
          <RentDue />
        </Paper>
      </Box>
      <ButtonPrimary sx={{ mt: 3, width: "45%" }}>Pay Rent</ButtonPrimary>
    </Stack>
  );
}
