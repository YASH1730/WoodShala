import React, { useState, useEffect } from "react";
import {
  Typography,
  TextField,
  Grid,
  Button,
  IconButton,Switch
} from "@mui/material";
import CreateIcon from '@mui/icons-material/Create';
import AddIcon from "@mui/icons-material/Add";
import { OpenBox, Notify } from "../../store/Types";
import {Store } from "../../store/Context";
import { getSubCatagories, changeSubSatatus } from '../../services/service'


import {
  DataGrid,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
} from '@mui/x-data-grid';
import Pagination from '@mui/material/Pagination';

function CustomPagination() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <Pagination
      color="primary"
      count={pageCount}
      page={page + 1}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
  );
}



export default function SubCategory() {

  const [search, setSearch] = useState("");

const {dispatch} = Store(); 

  const [Row, setRows] = useState()
  // function for get cetegory list

  useEffect(() => {
    getSubCatagories()
      .then((data) => {
        console.log(data)

        setRows(data.data.map((row,index) => {

          return ({
            id: index+1,
            category_id : row.category_id,
            category_name : row.category_name,
            sub_category_name: row.sub_category_name,
            sub_category_status: row.sub_category_status,
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
      field: 'category_name',
      align: 'center',
      headerName: 'Parent Category Name',
      width: 200
    },
    {
      field: "sub_category_name",
      headerName: "Sub Category Name",
      width: 200,
    },
    {
      field: "sub_category_status",
      headerName: "Sub Category Status",
      width: 200,
      renderCell: (params) => <Switch onChange ={handleSwitch} name = {params.row.action}   checked = {params.formattedValue}></Switch> ,


    },
    {
      field: "action",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => 
      <div className="categoryImage" >
        <IconButton onClick={() => { 
         dispatch({type : OpenBox,payload : {
            state : true,
            formType : 'update_Subcategory',
            payload : params
          }}) 
        }} aria-label="delete"  >
          <CreateIcon />
        </IconButton>
        {/* <IconButton onClick={() => { deleteCategory(params.formattedValue).then((res)=>{
          dispatch({type : Notify,payload : {
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
    FD.append('sub_category_status',e.target.checked)

    const res = changeSubSatatus(FD);

    res.then((data)=>{
      console.log(data)
      dispatch({type : Notify,payload : {
        open : true,
        variant : 'success',
        message : " Sub Category Status Updated Successfully !!!"
  
      }})
    })
    .catch((err)=>{
      console.log(err)
      dispatch({type : Notify,payload : {
        open : true,
        variant : 'error',
        message : "May be duplicate found !!!"
  
      }   })
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
          components={{
            Pagination: CustomPagination,
          }}
        />
      </div>
    );
  }

 

  return (
    <>
      <Typography sx={{ display: "block" }} variant="h5">
        Sub Category
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
        <Grid xs={12} md={9}>
          <TextField
            fullWidth
            autoComplete={false}
            id="demo-helper-text-aligned-no-helper"
            label="Search by category type"
            type="text"
            onChange={handelSearch}
          />
        </Grid>


        <Grid xs={12} md={2.8}>
          <Button
            onClick={() => {
             dispatch({type : OpenBox,payload : { state: true, formType: "subcategory" }});
            }}
            sx={{ width: "100%" }}
            color="primary"
            startIcon={<AddIcon />}
            variant="contained"
          >
            Sub Category
          </Button>
        </Grid>
      </Grid>

      {/* Section 1 ends  */}
      <br></br>
      {/* data grid  */}

      <Grid container scaping={2} className="overviewContainer">
        <Grid item p={2} xs={12} sx={{ boxShadow: 2, borderRadius: 5 }}>
          <Typography variant="h6"> Recent Order </Typography>
          <br></br>
          {DataGridView()}
        </Grid>
      </Grid>

      {/* data grid ends  */}
    </>
  );
}
