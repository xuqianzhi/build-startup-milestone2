import {
  Stack,
  Box,
  Autocomplete,
  TextField,
  Button
} from "@mui/material";
import { theme, ButtonPrimary } from "../Style.jsx";

const items = [
  "Apartment Interior",
  "Appliances",
  "Common Area",
  "Doors and locks",
  "Electrical and Lighting",
  "Pest Control",
  "Heating and Cooling",
  "Plumbing and Bath",
  "Misc",
];

export default function Maintenance() {
  return (
    <Stack
      sx={{
        width: "80vw",
        height: "80vh",
        direction: "column",
        alignItems: "center",
      }}
    >
      <Box width="80%" marginTop={2}>
        <Autocomplete
          options={items}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search maintenance item"
              InputProps={{
                ...params.InputProps,
                type: "search",
              }}
            />
          )}
        />
      </Box>

      <Box component="form" noValidate sx={{ mt: 3, width: '80%' }}>
        <TextField
          fullWidth
          variant="filled"
          label="Describe what happened"
          multiline
          rows={4}
        ></TextField>
      </Box>

      <ButtonPrimary sx={{mt: 3, width: "45%"}}>  
              Submit
      </ButtonPrimary>
    </Stack>
  );
}
