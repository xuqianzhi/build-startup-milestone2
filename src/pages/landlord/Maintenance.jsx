import { Grid, List, ListItemText, Divider, Chip, Box } from "@mui/material";
import { fontSize } from "@mui/system";

var data = [
  {
    title: "Plumbing and Bath",
    description:
      "Please help! My toilet water is brown, and the flush mechanism is not working! I even found a rat that came up in the tank in the process. " +
      "Please help! My toilet water is brown, and the flush mechanism is not working! I even found a rat that came up in the tank in the process. ",
    apt: "20F",
    date: "03/15/2022",
    urgency: "high",
  },
  {
    title: "Common Area",
    description:
      "The outer pane of my window is broken. Some leaves and grime have been sticking on to it. Can this please be fixed? ",
    apt: "21D",
    date: "03/15/2022",
    urgency: "medium",
  },
  {
    title: "Apartment Interior",
    description:
      "There are some scratches on my table and chair.  Was wondering if I could get a replacement. ",
    apt: "3O",
    date: "03/15/2022",
    urgency: "low",
  },
];

export default function Maintenance() {
  return (
      <List component="div">
        {data.map((request, idx) => {
          let { title, description, apt, date, urgency } = request;
          var buttonColor;
          switch (urgency) {
            case "high":
              buttonColor = "red";
              break;
            case "medium":
              buttonColor = "orange";
              break;
            case "low":
              buttonColor = "green";
              break;
            default:
              buttonColor = "green";
          }
          return (
            <div key={`maintenance-${idx}`}>
              <Grid container sx={{ padding: "10px", width: '80vw' }} >
                <Grid item xs={8}>
                  <ListItemText
                    primary={title + " at " + apt}
                    secondary={description}
                  ></ListItemText>
                  <ListItemText secondary={date}></ListItemText>
                </Grid>
                <Grid item xs={3}></Grid>
                <Grid item xs={1}>
                  <Chip
                    label={urgency}
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
