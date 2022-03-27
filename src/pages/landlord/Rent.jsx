import { Grid, List, ListItemText, Divider, Chip, Box } from "@mui/material";
import { fontSize } from "@mui/system";

var data = [
  {
    month: "March",
    apt: "21D",
    paid: false,
  },
  {
    month: "March",
    apt: "3O",
    paid: true,
  },
  {
    month: "February",
    apt: "3O",
    paid: true,
  },
  {
    month: "February",
    apt: "21D",
    paid: true,
  },
];

export default function Rent() {
  return (
      <List component="div">
        {data.map((request, idx) => {
          let { month, apt, paid } = request;
          const buttonColor = paid ? "green" : "red";
          const status = paid ? "paid" : "unpaid";
          return (
            <div key={`maintenance-${idx}`}>
              <Grid container sx={{ padding: "10px", width: '80vw' }} >
                <Grid item xs={8}>
                  <ListItemText
                    primary={`${month} Rent`}
                    secondary={apt}
                  ></ListItemText>
                </Grid>
                <Grid item xs={3}></Grid>
                <Grid item xs={1}>
                  <Chip
                    label={status}
                    sx={{ backgroundColor: buttonColor, width: "100%" }}
                  />
                </Grid>
              </Grid>
              <Divider></Divider>
            </div>
          );
        })}
      </List>
  );
}
