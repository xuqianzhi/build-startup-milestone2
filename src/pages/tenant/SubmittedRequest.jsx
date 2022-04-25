import { Component } from "react";
import { collection, query, where, getDocs, getDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { Typography, Div, List, Grid, ListItemText, Chip, Divider } from "@mui/material";
import { theme } from "../Style";


const fetchFirebseDoc = async (collecitonName, docId) => {
    const snapshot = await getDoc(doc(db, collecitonName, docId));
    return snapshot.data();
};

export default class SubmittedRequest extends Component {

    constructor() {
        super();
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        this.fetchRequest();
    }

    async fetchRequest() {
        const userId = window.localStorage.getItem("signInId");

        const q = query(collection(db, "request"), where("tenantId", "==", userId));
        const querySnapshot = await getDocs(q);
        const data = [];
        for (let i = 0; i < querySnapshot.docs.length; i++) {
            const requestId = querySnapshot.docs[i].id;
            const {
                maintenanceId,
                isCompleted,
                description,
                dateCreated
            } = querySnapshot.docs[i].data();
            const { category, subCategory } = await fetchFirebseDoc(
                "maintenance",
                maintenanceId
            );
            const request = {
                category: category,
                subCategory: subCategory,
                description: description,
                dateCreated: dateCreated.toDate().toString(),
                isCompleted: isCompleted
            };
            data.push(request);
        };
        this.setState({ data: data });
    }
    render() {
        const data = this.state.data;
        return (
            <div>
                <Typography variant="h4" padding={'30px'} color={theme.palette.primary.main} >Submitted Requests</Typography>
                <List component="div">
                    {data.map((request, idx) => {
                        let {
                            category,
                            subCategory,
                            description,
                            dateCreated,
                            isCompleted
                        } = request;
                        const title = `${category}, ${subCategory}`;
                        const chipColor = isCompleted ? "green" : "orange";
                        const chipLabel = isCompleted ? "closed" : "open";
                        return (
                            <div key={`request-${idx}`}>
                                <Grid container sx={{ padding: "10px", width: "80vw", marginLeft: "20px" }}>
                                    <Grid item xs={8}>
                                        <ListItemText
                                            primary={title}
                                            secondary={description}
                                        ></ListItemText>
                                        <ListItemText secondary={dateCreated}></ListItemText>
                                    </Grid>
                                    <Grid item xs={2}></Grid>
                                    <Grid item xs={2}>
                                        <Chip
                                            label={chipLabel}
                                            sx={{ backgroundColor: chipColor, width: "50%", marginRight: '50px' }}
                                        />
                                    </Grid>
                                </Grid>
                                <Divider ></Divider>
                            </div>
                        );
                    })}
                </List>
            </div>

        )
    }
}