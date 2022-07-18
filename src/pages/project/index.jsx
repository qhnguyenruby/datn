import { withHeaderHOC } from "../../components/Header/withHeaderHOC";
import HomeProject from "./HomeProject/HomeProject";
import { Grid } from "@mui/material";
import React from "react";

const Project = () => {
  return (
    <div>
      <Grid container style={{ minHeight: "100vh" }}>
        <Grid item xs={2}></Grid>
        <Grid item xs={8}>
          <HomeProject />
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
    </div>
  );
};

export default withHeaderHOC(Project);
