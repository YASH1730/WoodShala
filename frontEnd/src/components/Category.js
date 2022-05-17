import React, { useState, useContext, useEffect } from "react";
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
  IconButton,Switch
} from "@mui/material";
// import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import AddIcon from "@mui/icons-material/Add";
import { DataGrid } from "@mui/x-data-grid";
import { OpenBox, Notify } from "../App";
import { categoryList, deleteCategory, statusCategory } from '../services/service'
import '../assets/custom/css/category.css'
export default function Category() {

  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");

  const SideBox = useContext(OpenBox);
  const despatchAlert = useContext(Notify);


  const [Row, setRows] = useState()
  // function for get cetegory list

  useEffect(() => {
    categoryList()
      .then((data) => {
        console.log(data)

        setRows(data.data.map((row) => {

          return ({
            id: row._id,
            category_image: row.category_image,
            category_name: row.category_name,
            category_status: row.category_status,
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
      field: 'category_image',
      align: 'center',
      headerName: 'Image',
      width: 200,
      renderCell: (params) => <div className="categoryImage" ><img src={params.formattedValue} alt='category' /></div>,
    },
    {
      field: "category_name",
      headerName: "Category Name",
      width: 200,
    },
    {
      field: "category_status",
      headerName: "Category Status",
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
            formType : 'update_category',
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
        </IconButton> */}
        
      </div>,
    }

  ];


  const handleSwitch = (e)=>{
    console.log(e.target.name)

    const FD = new FormData()

    FD.append('_id',e.target.name)
    FD.append('category_status',e.target.checked)

    const res = statusCategory(FD);

    res.then((data)=>{
      console.log(data)
      despatchAlert.setNote({
        open : true,
        variant : 'success',
        message : "Category Status Updated Successfully !!!"
  
      })
    })
    .catch((err)=>{
      console.log(err)
      despatchAlert.setNote({
        open : true,
        variant : 'error',
        message : "May be duplicate found !!!"
  
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

  const handleChangeCat = (event) => {
    setCategory(event.target.value);
  };

  return (
    <>
      <Typography sx={{ display: "block" }} variant="h5">
        Category
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
              SideBox.setOpen({ state: true, formType: "category" });
            }}
            sx={{ width: "100%" }}
            color="primary"
            startIcon={<AddIcon />}
            variant="contained"
          >
            Add Category
          </Button>
        </Grid>
      </Grid>

      {/* Section 1 ends  */}
      <br></br>
      {/* data grid  */}

      <Grid container scaping={2} className="overviewContainer">
        <Grid item p={2} xs={12} sx={{ boxShadow: 2, borderRadius: 5 }}>
          <Typography variant="h6"> Category List </Typography>
          <br></br>
          {DataGridView()}
        </Grid>
      </Grid>

      {/* data grid ends  */}
    </>
  );
}
