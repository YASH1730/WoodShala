import React, { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  MenuItem,
  Typography,
  TextField,
  InputLabel,
  Select,
  Grid,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { DataGrid } from "@mui/x-data-grid";

import { listLogs } from "../../../services/service";

export default function OurStaff() {
  const [row, setRows] = useState([]);

  const columns = [
    { field: "id", name: "ID", width: 90 },
    {
      field: "email",
      headerName: "Email",
      width: 200,
      editable: true,
    },
    {
      field: "role",
      headerName: "Role",
      width: 200,
      editable: true,
    },
    {
      field: "city",
      headerName: "City",
      type: "number",
      width: 100,
      editable: true,
    },
    {
      field: "ip",
      headerName: "IP address",
      type: "number",
      width: 200,
      editable: true,
    },
    {
      field: "logTime",
      headerName: "Login Time",
      type: "number",
      width: 200,
      editable: true,
    },
    {
      field: "longitude",
      headerName: "Longitude",
      type: "number",
      width: 150,
      editable: true,
    },
    {
      field: "latitude",
      headerName: "Latitude",
      type: "number",
      width: 150,
      editable: true,
    },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    let response = await listLogs();

    setRows(
      response.data.map((row, index) => {
        return {
          id: index + 1,
          email: row.email,
          role: row.role,
          ip: row.ip,
          longitude: row.location.longitude,
          latitude: row.location.latitude,
          city: row.city,
          logTime: row.logTime,
        };
      })
    );
  }

  function DataGridView() {
    return (
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid rows={row} columns={columns} disableSelectionOnClick />
      </div>
    );
  }

  return (
    <>
      <Typography component={"span"} sx={{ display: "block" }} variant="h5">
        Security Logs
      </Typography>

      <br></br>

      {/* Section 1  */}
      {/* 
      <Grid container p={3} sx={{
        boxShadow: 1, borderRadius: 2, justifyContent: 'center !important', alignItems: 'center !important'
        , gap: '15px'
      }}>

        <Grid item xs={12} md={4.8} >
          <TextField fullWidth // autoComplete = {false}  
            id="demo-helper-text-aligned-no-helper" label="Search by name/email/phone" type='text' />
        </Grid>



        <Grid item xs={12} md={2} >
          <Button sx={{ width: '100%' }} color='primary' startIcon={<AddIcon />} variant='contained' >Add Staff</Button>
        </Grid>
      </Grid> */}

      {/* Section 1 ends  */}
      {/* <br></br> */}
      {/* data grid  */}

      <Grid container scaping={2} className="overviewContainer">
        <Grid item p={2} xs={12} sx={{ boxShadow: 2, borderRadius: 5 }}>
          <Typography component={"span"} variant="h6">
            {" "}
            Security Logs{" "}
          </Typography>
          <br></br>
          <br></br>
          {DataGridView()}
        </Grid>
      </Grid>

      {/* data grid ends  */}
    </>
  );
}
