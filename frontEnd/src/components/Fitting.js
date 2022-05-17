import React, { useState, useContext, useEffect } from "react";
import {
  Typography,
  TextField,
  Grid,
  Button,
  IconButton,Switch
} from "@mui/material";
// import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import AddIcon from "@mui/icons-material/Add";
import { DataGrid } from "@mui/x-data-grid";
import { OpenBox, Notify } from "../App";
import { getFitting,changeFittingStatus } from '../services/service'
import '../assets/custom/css/category.css'



export default function Fitting() {

  const [search, setSearch] = useState("");

  const SideBox = useContext(OpenBox);
  const despatchAlert = useContext(Notify);


  const [Row, setRows] = useState()
  // function for get cetegory list

  useEffect(() => {
    getFitting()
      .then((data) => {
        console.log(data)

        setRows(data.data.map((row) => {

          return ({
            id: row._id,
            fitting_name: row.fitting_name,
            fitting_status: row.fitting_status,
            action: row._id
          })
        }))
      })
      .catch((err) => {
        console.log(err)
      })
  }, []);


  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 100
    },
    {
      field: "fitting_name",
      headerName: "Fitting Name",
      width: 200,
    },
    {
      field: "fitting_status",
      headerName: "Fitting Status",
      width: 200,
      renderCell: (params) => <Switch onChange ={handleSwitch} name = {params.id}   checked = {params.formattedValue}></Switch> ,

    },
    {
      field: "action",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => 
      <div className="categoryImage" >
        <IconButton onClick={() => { 
          SideBox.setOpen({
            state : true,
            formType : 'update_fitting',
            payload : params
          }) 
        }} aria-label="delete"  >
          <CreateIcon />
        </IconButton>
        {/* <IconButton onClick={() => { deleteCategory(params.formattedValue).then((res)=>{
          despatchAlert.setNote({
            open : true,
            variant : 'success',
            message : 'Category Deleted !!!'
          })
        }) }} aria-label="delete"  >
          <DeleteIcon />
        </IconButton>
         */}
      </div>,
    }

  ];


  const handleSwitch = (e)=>{
    console.log(e.target.name)

    const FD = new FormData()

    FD.append('_id',e.target.name)
    FD.append('fitting_status',e.target.checked)

    const res = changeFittingStatus(FD);

    res.then((data)=>{
      console.log(data)
      despatchAlert.setNote({
        open : true,
        variant : 'success',
        message : " Fitting Status Updated Successfully !!!"
  
      })
    })
    .catch((err)=>{
      console.log(err)
      despatchAlert.setNote({
        open : true,
        variant : 'error',
        message : "Somthing Went Worang !!!"
  
      })
    })

    
  

  } 

  const handelSearch = (e)=>{
    console.log(e.target.value)
    setSearch(e.target.value)
  }


  function DataGridView() {
    return (
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          filterModel={{
            items: [{ columnField: 'category_name', operatorValue: 'contains', value: `${search}` }],
          }}
          rows={Row}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
        />
      </div>
    );
  }


  return (
    <>
      <Typography sx={{ display: "block" }} variant="h5">
      Fitting
      </Typography>

      <br></br>

      {/* Section 1  */}

      <Grid
        container
        p={3}
        sx={{
          boxShadow: 1,
          borderRadius: 2,
          justifyContent: "center !important",
          alignItems: "center !important",
          gap: "15px",
        }}
      >
        <Grid xs={12} md={8}>
          <TextField
            fullWidth
            autoComplete={false}
            id="demo-helper-text-aligned-no-helper"
            label="Search by category type"
            type="text"
            onChange={handelSearch}
          />
        </Grid>


        <Grid xs={12} md={3}>
          <Button
            onClick={() => {
              SideBox.setOpen({ state: true, formType: "addFitting" });
            }}
            sx={{ width: "100%" }}
            color="primary"
            startIcon={<AddIcon />}
            variant="contained"
          >
            Add Fitting
          </Button>
        </Grid>
      </Grid>

      {/* Section 1 ends  */}
      <br></br>

      {/* data grid  */}

      <Grid container scaping={2} className="overviewContainer">
        <Grid item p={2} xs={12} sx={{ boxShadow: 2, borderRadius: 5 }}>
          <Typography variant="h6"> Fitting List  </Typography>
          <br></br>
          {DataGridView()}
        </Grid>
      </Grid>

      {/* data grid ends  */}
    </>
  );
}
