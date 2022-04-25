import { Component } from "react";
import { Box, Grid, List, ListItemText, Divider, Chip, ThemeProvider, Typography } from "@mui/material";
import { db } from "../../firebase.js";
import { theme } from "../Style.jsx";
import {
  collection,
  getDocs,
  getDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { ButtonPrimary } from "../Style.jsx";
import { CloseRounded } from "@mui/icons-material";
import { height } from "@mui/system";

export default class Maintenance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openRequest: [],
      closedRequest: []
    };
  }

  componentDidMount() {
    this.fetchRequest();
  }

  async fetchRequest() {
    // const openRequest = [
    //   {
    //     category: "category",
    //     subCategory: "subCategory",
    //     building: {
    //       name: "building name",
    //     },
    //     room: "room",
    //     description: "description",
    //     dateCreated: new Date().toString(),
    //     urgency: 0,
    //     requestId: "testId"
    //   },
    //   {
    //     category: "category",
    //     subCategory: "subCategory",
    //     building: {
    //       name: "building name",
    //     },
    //     room: "room",
    //     description: "description",
    //     dateCreated: new Date().toString(),
    //     urgency: 0,
    //     requestId: "testId"
    //   },

    // ];

    // const closedRequest = [
    //   {
    //     category: "category",
    //     subCategory: "subCategory",
    //     building: {
    //       name: "building name",
    //     },
    //     room: "room",
    //     description: "description",
    //     dateCreated: new Date().toString(),
    //     urgency: 0,
    //     requestId: "testId"
    //   },
    //   {
    //     category: "category",
    //     subCategory: "subCategory",
    //     building: {
    //       name: "building name",
    //     },
    //     room: "room",
    //     description: "description",
    //     dateCreated: new Date().toString(),
    //     urgency: 0,
    //     requestId: "testId"
    //   },
    // ];

    const openRequest = [];
    const closedRequest = [];
    // helper function to fetch a firebase document data
    const fetchFirebseDoc = async (collecitonName, docId) => {
      const snapshot = await getDoc(doc(db, collecitonName, docId));
      return snapshot.data();
    };

    const { buildings } = await fetchFirebseDoc("landlord", window.localStorage.getItem("signInId"));
    const buildingSet = new Set(buildings);

    const requestSnapshot = await getDocs(collection(db, "request"));

    for (let i = 0; i < requestSnapshot.docs.length; i++) {
      const requestId = requestSnapshot.docs[i].id;
      const requestData = requestSnapshot.docs[i].data();
      const { tenantId, vendorId, maintenanceId, dateCreated, description, isCompleted } =
        requestData;
      const { buildingId, room } = await fetchFirebseDoc("tenant", tenantId);
      if (!buildingSet.has(buildingId)) {
        continue;
      }
      const building = await fetchFirebseDoc("building", buildingId);
      const { category, subCategory, urgency } = await fetchFirebseDoc(
        "maintenance",
        maintenanceId
      );
      const request = {
        category: category,
        subCategory: subCategory,
        building: building,
        room: room,
        description: description,
        dateCreated: dateCreated.toDate().toString(),
        urgency: urgency,
        requestId: requestId,
      };
      isCompleted ? closedRequest.push(request) : openRequest.push(request);
    }

    this.setState({ closedRequest: closedRequest, openRequest: openRequest });
  }

  async markRequestResolved(requestId) {
    console.log(requestId);
    const requestDocRef = doc(db, "request", requestId);
    try {
      await updateDoc(requestDocRef, {
        isCompleted: true
      })
      alert("Successfully mark request resolved");
      window.location.reload();
    } catch (err) {
      alert(`Failed to mark request resolved: ${err}`);
    }
  }

  render() {
    const { closedRequest, openRequest } = this.state;
    const urgencyLevel = ["high", "med", "low"];
    return (
      <ThemeProvider theme={theme}>
        {/* Section for open request */}
        <Typography component="div" variant="h4" padding={'10px'}
          marginTop={'20px'} color={theme.palette.primary.main} >Open requests</Typography>
        <List component="div">
          {openRequest.map((request, idx) => {
            let {
              category,
              subCategory,
              building,
              room,
              description,
              dateCreated,
              urgency,
              requestId,
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
                      primary={title + " at " + tenantLocation}
                      secondary={description}
                    ></ListItemText>
                    <ListItemText secondary={dateCreated}></ListItemText>
                  </Grid>
                  <Grid item xs={2}></Grid>
                  <Grid item xs={2}>
                    <Chip
                      label={urgencyLevel[urgency]}
                      sx={{ backgroundColor: buttonColor, width: "50%", marginRight: '50px' }}
                    />
                  </Grid>
                </Grid>
                <ButtonPrimary onClick={() => { this.markRequestResolved(requestId) }} sx={{ height: '30px', width: '150px', marginBottom: '20px' }} > Mark Resolved </ButtonPrimary>
                <Divider></Divider>
              </div>
            );
          })}
        </List>

        {/* Section for closed request */}
        <Typography component="div" variant="h4" padding={'10px'}
          marginTop={'30px'} color={theme.palette.secondary.main} >Closed requests</Typography>
        <List component="div">
          {closedRequest.map((request, idx) => {
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
                      primary={title + " at " + tenantLocation}
                      secondary={description}
                    ></ListItemText>
                    <ListItemText secondary={dateCreated}></ListItemText>
                  </Grid>
                  <Grid item xs={2}></Grid>
                  <Grid item xs={2}>
                    <Chip
                      label={urgencyLevel[urgency]}
                      sx={{ backgroundColor: buttonColor, width: "50%" }}
                    />
                  </Grid>
                </Grid>
                <Divider></Divider>
              </div>
            );
          })}
        </List>
      </ThemeProvider>
    );
  }
}
