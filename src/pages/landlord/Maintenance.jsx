import { Component } from "react";
import { Grid, List, ListItemText, Divider, Chip, Box } from "@mui/material";
import { db } from "../../firebase.js";
import {
  addDoc,
  collection,
  getDocs,
  getDoc,
  setDoc,
  doc,
} from "firebase/firestore";

// var data = [
//   {
//     title: "Plumbing and Bath",
//     description:
//       "Please help! My toilet water is brown, and the flush mechanism is not working! I even found a rat that came up in the tank in the process. " +
//       "Please help! My toilet water is brown, and the flush mechanism is not working! I even found a rat that came up in the tank in the process. ",
//     room: "20F",
//     date: "03/15/2022",
//     urgency: "high",
//   },
//   {
//     title: "Common Area",
//     description:
//       "The outer pane of my window is broken. Some leaves and grime have been sticking on to it. Can this please be fixed? ",
//     room: "21D",
//     date: "03/15/2022",
//     urgency: "medium",
//   },
//   {
//     title: "Apartment Interior",
//     description:
//       "There are some scratches on my table and chair.  Was wondering if I could get a replacement. ",
//     room: "3O",
//     date: "03/15/2022",
//     urgency: "low",
//   },
// ];

export default class Maintenance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    this.fetchRequest();
  }

  async fetchRequest() {
    let data = [];

    // helper function to fetch a firebase document data
    const fetchFirebseDoc = async (collecitonName, docId) => {
      const snapshot = await getDoc(doc(db, collecitonName, docId));
      return snapshot.data();
    };

    const requestSnapshot = await getDocs(collection(db, "request"));

    for (let i = 0; i < requestSnapshot.docs.length; i++) {
      const requestData = requestSnapshot.docs[i].data();
      const { tenantId, vendorId, maintenanceId, dateCreated, description } =
        requestData;
      const { buildingId, room } = await fetchFirebseDoc("tenant", tenantId);
      const building = await fetchFirebseDoc("building", buildingId);
      const { category, subCategory, urgency } = await fetchFirebseDoc(
        "maintenance",
        maintenanceId
      );
      console.log(subCategory);
      const request = {
        category: category,
        subCategory: subCategory,
        building: building,
        room: room,
        description: description,
        dateCreated: dateCreated.toDate().toString(),
        urgency: urgency,
      };
      data.push(request);
    }
    this.setState({ data: data });
  }

  render() {
    const data = this.state.data;
    const urgencyLevel = ["high", "medium", "low"];
    return (
      <List component="div">
        {data.map((request, idx) => {
          let {
            category,
            subCategory,
            building,
            room,
            description,
            dateCreated,
            urgency,
          } = request;
          const title = `${category}, ${subCategory}`;
          const tenantLocation = `${building.name}, ${room}`
          var buttonColor;
          switch (urgency) {
            case 0:
              buttonColor = "red";
              break;
            case 1:
              buttonColor = "orange";
              break;
            case 2:
              buttonColor = "green";
              break;
            default:
              buttonColor = "green";
          }
          return (
            <div key={`maintenance-${idx}`}>
              <Grid container sx={{ padding: "10px", width: "80vw" }}>
                <Grid item xs={8}>
                  <ListItemText
                    primary={ title + " at " + tenantLocation}
                    secondary={description}
                  ></ListItemText>
                  <ListItemText secondary={dateCreated}></ListItemText>
                </Grid>
                <Grid item xs={3}></Grid>
                <Grid item xs={1}>
                  <Chip
                    label={urgencyLevel[urgency]}
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
}
