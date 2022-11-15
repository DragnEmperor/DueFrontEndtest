import React from "react";
import { Paper, Grid, withStyles } from '@material-ui/core';
import PageTitle from "../../components/PageTitle/PageTitle";
import './style.css';
import UserTable from "./table/UserTable"

const styles = theme => ({
    paper: {
        padding: theme.spacing(0),
    },
    paperTable: {
        padding: theme.spacing(0),
    }
})

const Duebin = ({ classes, ...props }) => {
    return (
        <React.Fragment>
            <PageTitle title="Due List Bin" />
            <Grid container spacing={4}>
                <Grid item xs={12} >
                    <Paper className={classes.paper}>
                        <UserTable />
                    </Paper>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}


export default (withStyles(styles)(Duebin));