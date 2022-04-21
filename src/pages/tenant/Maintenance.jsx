import { Component } from "react";
import {
  Stack,
  Box,
  Autocomplete,
  TextField,
  Typography,
} from "@mui/material";
import { theme, ButtonPrimary } from "../Style.jsx";
import { db } from '../../firebase.js';
import { addDoc, collection, getDocs, setDoc } from "firebase/firestore";

// const maintenanceItems = {
//   "Apartment Interior": ["ceiling", "counter top", "drawer", "paint", "paneling", "pest control", "shelving", "wallpaper"],
//   "Appliance": ["cloth dryer", "cloth wash", "cook top", "dishwasher", "disposal", "freezer", "microwave", "refrigerator"],
//   "Doors and Locks": ["exterior door", "lock", "patio door"],
//   "Electrical and Lighting": ["electrical box", "exterior lighting", "lightbulbs", "power", "switches"],
//   "Heating and Cooling": ["air conditioner", "fireplace", "heater", "humidity", "thermostat", "water chiller"],
//   "Plumbing and Bath": ["bathroom", "hot water heater", "leak", "mirror", "shower", "sink", "toilet", "tub"],
//   "Other": ["other"]
// }

export default class Maintenance extends Component {

  constructor(props) {
    super(props);
    this.subCategoryToId = {};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      isSubmitting: false,
      shouldDisplayError: false,
      maintenanceItems: {},
      categorySelected: "",
      subCategorySelected: "",
      description: "",
    }
  }

  componentDidMount() {
    this.fetchMaintenanceItem();
  }

  async fetchMaintenanceItem() {
    const maintenanceItems = {};
    const subCategoryToId = this.subCategoryToId;

    const maintenanceSnapshot = await getDocs(collection(db, "maintenance"));
    maintenanceSnapshot.forEach((doc) => {
      const data = doc.data();
      const category = data.category;
      const subCategory = data.subCategory;
      const id = doc.id;
      if (!(category in maintenanceItems)) {
        maintenanceItems[category] = [];
      }
      maintenanceItems[category].push(subCategory);
      subCategoryToId[subCategory] = id;

    });
    this.setState({ maintenanceItems: maintenanceItems });
  }

  async handleSubmit() {
    const { subCategorySelected, description } = this.state;
    const maintenanceId = this.subCategoryToId[subCategorySelected];
    const tenantId = window.localStorage.getItem("signInId");

    if (!(maintenanceId && tenantId)) {
      this.setState({ shouldDisplayError: true });
      return;
    }
    this.setState({isSubmitting: true});
    const request = {
      tenantId: tenantId,
      vendorId: null,
      maintenanceId: maintenanceId,
      description: description,
      dateCreated: new Date(),
      preferTimeWeekday: [0, 1, 2],
      preferTimeWeekend: [3, 4, 5],
      scheduledTime: null,
    }
    const docRef = await addDoc(collection(db, "request"), request);
    const docId = docRef.id;
    if (docId) {
      console.log("Successfully created request document: ", docId);
      alert("Successfully submitted maintenance request!");
    } else {
      console.log("Failed to create request document: ", docId);
      alert("Failed to submit request, please try again!");
    }
    this.setState({isSubmitting: false});
    window.location.reload();
  }

  render() {
    const { categorySelected, maintenanceItems, shouldDisplayError, isSubmitting } = this.state;
    const subCategoryToId = this.subCategoryToId;
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
            onChange={(_, selectedValue) => (this.setState({ categorySelected: selectedValue }))}
            options={Object.keys(maintenanceItems)}
            renderInput={(params) => (
              <TextField
                {...params}
                onChange={(e) => (this.setState({ categorySelected: e.target.value }))}
                label="Category"
                InputProps={{
                  ...params.InputProps,
                  type: "search",
                }}
              />
            )}
          />
        </Box>

        <Box width="80%" marginTop={2}>
          <Autocomplete
            options={categorySelected in maintenanceItems ? maintenanceItems[categorySelected] : []}
            onChange={(_, selectedValue) => (this.setState({ subCategorySelected: selectedValue }))}
            renderInput={(params) => (
              <TextField
                {...params}
                onChange={(e) => (this.setState({ subCategorySelected: e.target.value }))}
                label="Maintenance Item"
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
            onChange={(e) => (this.setState({ description: e.target.value }))}
            fullWidth
            variant="filled"
            label="Describe what happened"
            multiline
            rows={4}
          ></TextField>
        </Box>

        <Box sx={{ mt: 3, width: '80%' }} display={shouldDisplayError ? 'inline-flex' : 'none'} >
          <Typography color={'red'} > Sign in error or maintenance item not selected </Typography>
        </Box>

        <ButtonPrimary sx={{ mt: 3, width: "45%" }} onClick={this.handleSubmit} disabled={isSubmitting ? true : false} >
          Submit
        </ButtonPrimary>
      </Stack>
    );
  }

}
