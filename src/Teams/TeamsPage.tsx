//import { DataGrid, GridRowsProp, GridColDef } from '@material-ui/data-grid';
import { Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import React, { useEffect, useState } from "react";
import TeamTable from "../common/components/TeamsTable";
import { Rank } from "../common/models/Rank";
import RankService from "../common/Services/RankService";
import "./TeamsPage.css";

//------------------Table---------------------------

const Teams = () => {
  const [allRanks, setAllRanks] = useState<Rank[]>([]);
  useEffect(() => {
    RankService.getAllTeamsRecentRanks().then((ranks) => {
      setAllRanks(ranks.sort((a, b) => b.rank - a.rank));
    });
  }, []);

  return (
    <div>
      <Typography variant="h3" style={{ marginLeft: "5rem" }}>
        Teams Page
      </Typography>
      <Paper
        style={{ marginLeft: "5rem", marginRight: "5rem", padding: "5rem" }}
      >
        <TeamTable Ranks={allRanks} />
      </Paper>
    </div>
  );
};

export default Teams;
