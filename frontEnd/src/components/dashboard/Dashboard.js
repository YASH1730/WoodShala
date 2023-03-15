import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  YAxis,
  XAxis,
  Bar,
  Legend,
  Tooltip,
  PieChart,
  Pie,
} from "recharts";
import { Typography, Grid, Box } from "@mui/material";
import "../../assets/custom/css/dashboard.css";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import AutorenewOutlinedIcon from "@mui/icons-material/AutorenewOutlined";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import { DataGrid } from "@mui/x-data-grid";

const Dashboard = () => {
  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
    },
  ];

  const data01 = [
    {
      name: "Group A",
      value: 400,
    },
    {
      name: "Group B",
      value: 300,
    },
    {
      name: "Group C",
      value: 300,
    },
    {
      name: "Group D",
      value: 200,
    },
    {
      name: "Group E",
      value: 278,
    },
    {
      name: "Group F",
      value: 189,
    },
  ];
  const data02 = [
    {
      name: "Group A",
      value: 2400,
    },
    {
      name: "Group B",
      value: 4567,
    },
    {
      name: "Group C",
      value: 1398,
    },
    {
      name: "Group D",
      value: 9800,
    },
    {
      name: "Group E",
      value: 3908,
    },
    {
      name: "Group F",
      value: 4800,
    },
  ];

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "firstName",
      headerName: "First name",
      width: 150,
      editable: true,
    },
    {
      field: "lastName",
      headerName: "Last name",
      width: 150,
      editable: true,
    },
    {
      field: "age",
      headerName: "Age",

      width: 110,
      editable: true,
    },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
  ];

  const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
    { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  ];

  function DataGridView() {
    return (
      <div style={{ marginTop: '2%', height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}


          disableSelectionOnClick
        />
      </div>
    );
  }

  return (
    <Box sx={{ pl: 4, pr: 4 }}>
      {/* Dashboard Overview */}

      <Typography component={'span'} sx={{ display: "block" }} variant="h5">
        Dashboard Overview
      </Typography>

      <br></br>

      <Grid container className="overviewContainer" spacing={1}>
        <Grid
          item
          xs={12}
          md={3.8}
          sx={{ boxShadow: 2, backgroundColor: "#0694a2" }}
          className="overviewBoard"
        >
          <svg
            stroke="currentColor"
            fill="white"
            strokeWidth="0"
            version="1.1"
            viewBox="0 0 16 16"
            width="2em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M16 5l-8-4-8 4 8 4 8-4zM8 2.328l5.345 2.672-5.345 2.672-5.345-2.672 5.345-2.672zM14.398 7.199l1.602 0.801-8 4-8-4 1.602-0.801 6.398 3.199zM14.398 10.199l1.602 0.801-8 4-8-4 1.602-0.801 6.398 3.199z"></path>
          </svg>

          <Typography component={'span'} color="white" variant="h6">
            Today Order
          </Typography>

          <Typography component={'span'} color="white" variant="h3">
            $100
          </Typography>
        </Grid>

        <Grid
          item
          xs={12}
          md={3.8}
          sx={{ boxShadow: 2, backgroundColor: "#3f83f8" }}
          className="overviewBoard"
        >
          <svg
            stroke="white"
            fill="none"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            width="2em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          <Typography component={'span'} color="white" variant="h6">
            Today Order
          </Typography>

          <Typography component={'span'} color="white" variant="h3">
            $100
          </Typography>
        </Grid>

        <Grid
          item
          xs={12}
          md={3.8}
          sx={{ boxShadow: 2, backgroundColor: "#0e9f6e" }}
          className="overviewBoard"
        >
          <svg
            stroke="white"
            fill="white"
            strokeWidth="0"
            version="1.1"
            viewBox="0 0 16 16"
            width="2em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M14.5 2h-13c-0.825 0-1.5 0.675-1.5 1.5v9c0 0.825 0.675 1.5 1.5 1.5h13c0.825 0 1.5-0.675 1.5-1.5v-9c0-0.825-0.675-1.5-1.5-1.5zM1.5 3h13c0.271 0 0.5 0.229 0.5 0.5v1.5h-14v-1.5c0-0.271 0.229-0.5 0.5-0.5zM14.5 13h-13c-0.271 0-0.5-0.229-0.5-0.5v-4.5h14v4.5c0 0.271-0.229 0.5-0.5 0.5zM2 10h1v2h-1zM4 10h1v2h-1zM6 10h1v2h-1z"></path>
          </svg>
          <Typography component={'span'} color="white" variant="h6">
            Today Order
          </Typography>

          <Typography component={'span'} color="white" variant="h3">
            $100
          </Typography>
        </Grid>
      </Grid>

      <br></br>
      <br></br>

      <Grid container className="overviewContainer" spacing={1}>
        <Grid
          item
          xs={12}
          md={2.8}
          sx={{ boxShadow: 1 }}
          className="overviewBoardSec2"
        >
          <div class="sec2Icon item1">
            <ShoppingCartOutlinedIcon />
          </div>
          <div>
            <Typography component={'span'} align="center" variant="caption">
              Total Order
            </Typography>
            <Typography component={'span'} align="center" variant="h5">
              100
            </Typography>
          </div>
        </Grid>

        <Grid
          item
          xs={12}
          md={2.8}
          sx={{ boxShadow: 1 }}
          className="overviewBoardSec2"
        >
          <div class="sec2Icon item2">
            <AutorenewOutlinedIcon />
          </div>
          <div>
            <Typography component={'span'} align="center" variant="caption">
              Order Pending
            </Typography>
            <Typography component={'span'} align="center" variant="h5">
              37
            </Typography>
          </div>
        </Grid>

        <Grid
          item
          xs={12}
          md={2.8}
          sx={{ boxShadow: 1 }}
          className="overviewBoardSec2"
        >
          <div class="sec2Icon item3">
            <LocalShippingOutlinedIcon />
          </div>
          <div>
            <Typography component={'span'} align="center" variant="caption">
              Order Processing
            </Typography>
            <Typography component={'span'} align="center" variant="h5">
              400
            </Typography>
          </div>
        </Grid>

        <Grid
          item
          xs={12}
          md={2.8}
          sx={{ boxShadow: 1 }}
          className="overviewBoardSec2"
        >
          <div class="sec2Icon item4">
            <DoneOutlinedIcon />
          </div>
          <div>
            <Typography component={'span'} align="center" variant="caption">
              Order Delivered
            </Typography>
            <Typography component={'span'} align="center" variant="h5">
              200
            </Typography>
          </div>
        </Grid>
      </Grid>

      {/* Dashboard Overview Ends*/}

      <br></br>
      <br></br>

      {/* char view  */}
      {/* 
      <Grid container scaping={2} className="overviewContainer">
        <Grid item xs={12} md={5.8} sx={{ boxShadow: 2, borderRadius: 5 }}>
          <Typography component={'span'} p={2} variant="h6">
            {" "}
            Conversions This Year{" "}
          </Typography>
          <br></br>
          <ResponsiveContainer width="95%" height="80%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="uv" fill="#8884d8" />
              <Bar dataKey="pv" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </Grid>

        <Grid
          item
          p={2}
          xs={12}
          md={5.8}
          sx={{ boxShadow: 2, borderRadius: 5 }}
        >
          <Typography component={'span'} variant="h6"> Conversions This Year </Typography>
          <br></br>
          <ResponsiveContainer width="95%" height="85%">
            <PieChart className="chart">
              <Tooltip />
              <Legend />
              <Pie
                data={data01}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
              />
              <Pie
                data={data02}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#82ca9d"
                label
              />
            </PieChart>
          </ResponsiveContainer>
        </Grid>
      </Grid> */}
      <br></br>
      <br></br>

      {/* char view ends */}
      {/* data grid  */}

      <Grid container scaping={2} className="overviewContainer">
        <Grid item p={2} xs={12} sx={{ boxShadow: 2, borderRadius: 5 }}>
          <Typography component={'span'} variant="h6"> Recent Order </Typography>
          <br></br>
          <DataGridView/>
        </Grid>
      </Grid>

      {/* data grid ends  */}
    </Box>
  );
};

export default Dashboard;
