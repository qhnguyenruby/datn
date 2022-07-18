import React from "react";
import { withHeaderHOC } from "../../components/Header/withHeaderHOC";
import { Grid } from "@mui/material";
import ProjectInfoItem from "./ProjectInfoItem/ProjectInfoItem";

const ProjectInfo = () => {
  return (
    <div>
      <Grid container style={{ minHeight: "100vh" }}>
        <Grid item xs={2}></Grid>
        <Grid item xs={8}>
          <ProjectInfoItem />
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
    </div>
  );
};

export default withHeaderHOC(ProjectInfo);
