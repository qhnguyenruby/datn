import { Button, Grid } from "@mui/material";
import * as _ from "lodash";
import React, { useEffect, useState } from "react";
import { CirclePicker } from "react-color";
import { useParams } from "react-router-dom";
import "./GeneralInfo.scss";

const GeneralInfo = ({ handleInfo, editGeneInfo }) => {
  const params = useParams();
  const { editProjectId } = params;
  const isAddMore = !editProjectId;
  const [project, setProject] = useState([]);
  const [client, setClient] = useState("");
  const [name, setName] = useState("");
  const [color, setColor] = useState("#f44336");
  const [tableColorActive, setTableColorActive] = useState(false);
  const handleBlurColor = () => {
    setTimeout(() => {
      setTableColorActive(false);
    }, 150);
  };
  useEffect(() => {
    if (!_.isEmpty(editGeneInfo)) {
      const { projectName, client, color } = editGeneInfo;
      setName(projectName);
      setColor(color);
      setClient(client);
      setProject({
        name: projectName,
        client: client,
        color: color,
      });
    }
  }, [editGeneInfo, editProjectId]);
  useEffect(() => {
    const handleInfo = (project) => project;
  }, []);
  handleInfo(project);
  const setNameProject = (event) => {
    setName(event.target.value);
  };
  useEffect(() => {
    setProject({
      name: name,
      client: client,
      color: color,
    });
  }, [name, client, color]);

  return (
    <div>
      {isAddMore ? (
        <h1 className="new-project-title">Create new project</h1>
      ) : (
        <h1 className="new-project-title">Edit project</h1>
      )}
      <div className="new-project-general-info">
        <div className="new-project-general-info-title">
          <h3 className="new-project-general-info-title-name">
            General information
          </h3>
        </div>
        <Grid container className="new-project-general-info-body">
          <Grid item xs={3}>
            <h4 className="new-project-general-info-body-title ">Project</h4>
          </Grid>
          <Grid item xs={9}>
            <div className="new-project-general-info-body-input">
              <div className="new-project-general-info-body-input-pro">
                <input
                  className="new-project-general-info-body-input-pro-name"
                  id="input-with-name-project"
                  placeholder="Name project"
                  value={name}
                  onChange={(event) => setNameProject(event)}
                  style={{}}
                />
              </div>

              <input
                className="new-project-general-info-body-input-client"
                id="input-with-name-client"
                placeholder="Client"
                value={client}
                onChange={(event) => setClient(event.target.value)}
                style={{}}
              />
            </div>
          </Grid>
        </Grid>
        <Grid container className="new-project-general-info-colors">
          <Grid item xs={3}>
            <h4 className="new-project-general-info-colors-title ">
              Background color
            </h4>
          </Grid>
          <Grid item xs={9}>
            <div className="new-project-general-info-colors-pro">
              <div className="new-project-general-info-colors-pro-choose ">
                <Button
                  className="new-project-general-info-colors-pro-choose-btn "
                  variant="text"
                  sx={{ color: "black" }}
                  onBlur={handleBlurColor}
                  onFocus={() => setTableColorActive(true)}
                >
                  Choose color...
                </Button>
                <p className="new-project-general-info-colors-pro-choose-text ">
                  Each project will have a specific color that will help you
                  team member recognize super easily.
                </p>
              </div>
              <Button
                className="new-project-general-info-colors-pro-show "
                style={{ backgroundColor: color }}
                onBlur={handleBlurColor}
                onFocus={() => setTableColorActive(true)}
              ></Button>

              {tableColorActive && (
                <div className="new-project-general-info-colors-pro-color  ">
                  <CirclePicker
                    color={color}
                    onChangeComplete={(color) => {
                      setColor(color.hex);
                    }}
                  />
                </div>
              )}
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default GeneralInfo;
