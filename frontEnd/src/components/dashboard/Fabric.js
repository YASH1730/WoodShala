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
import { OpenBox, Notify } from "../../App";
import { getFabric , changeFabricStatus } from '../../services/service'
import '../../assets/custom/css/category.css'

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




export default function Fabric() {

  const [fabric, setfabric] = useState("");
  const [search, setSearch] = useState("");

  const SideBox = useContext(OpenBox);
  const despatchAlert = useContext(Notify);


  const [Row, setRows] = useState()
  // function for get cetegory list

  useEffect(() => {
    getFabric()
      .then((data) => {
        console.log(data)

        setRows(data.data.map((row,index) => {

          return ({
            id: index + 1 ,
            fabric_image: row.fabric_image,
            fabric_name: row.fabric_name,
            fabric_status: row.fabric_status,
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
      field: 'fabric_image',
      align: 'center',
      headerName: 'Image',
      width: 200,
      renderCell: (params) => <div className="categoryImage" ><img src={params.formattedValue} alt='fabric' /></div>,
    },
    {
      field: "fabric_name",
      headerName: "Fabric Name",
      width: 200,
    },
    {
      field: "fabric_status",
      headerName: "Fabric Status",
      width: 200,
      renderCell: (params) => <Switch onChange ={handleSwitch} name = {params.row.action}   checked = {params.formattedValue}></Switch> ,

    },
    {
      field: "action",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => 
      <div className="fabricImage" >
        <IconButton onClick={() => { 
          SideBox.setOpen({
            state : true,
            formType : 'update_fabric',
            payload : params
          }) 
        }} aria-label="delete"  >
          <CreateIcon />
        </IconButton>
        {/* <IconButton onClick={() => { deletefabric(params.formattedValue).then((res)=>{
          despatchAlert.setNote({
            open : true,
            variant : 'success',
            message : 'fabric Deleted !!!'
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
    FD.append('fabric_status',e.target.checked)

    const res = changeFabricStatus(FD);

    res.then((data)=>{
      console.log(data)
      despatchAlert.setNote({
        open : true,
        variant : 'success',
        message : "Fabric Status Updated Successfully !!!"
  
      })
    })
    .catch((err)=>{
      console.log(err)
      despatchAlert.setNote({
        open : true,
        variant : 'error',
        message : "Something went wrong !!!"
  
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
            items: [{ columnField: 'fabric_name', operatorValue: 'contains', value: `${search}` }],
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

  const handleChangeCat = (event) => {
    setfabric(event.target.value);
  };

  return (
    <>
      <Typography sx={{ display: "block" }} variant="h5">
        Fabric
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
            label="Search by fabric type"
            type="text"
            onChange={handelSearch}
          />
        </Grid>


        <Grid xs={12} md={2.8}>
          <Button
            onClick={() => {
              SideBox.setOpen({ state: true, formType: "fabric" });
            }}
            sx={{ width: "100%" }}
            color="primary"
            startIcon={<AddIcon />}
            variant="contained"
          >
            Add Fabric
          </Button>
        </Grid>
      </Grid>

      {/* Section 1 ends  */}
      <br></br>
      {/* data grid  */}

      <Grid container scaping={2} className="overviewContainer">
        <Grid item p={2} xs={12} sx={{ boxShadow: 2, borderRadius: 5 }}>
          <Typography variant="h6"> Fabric List </Typography>
          <br></br>
          {DataGridView()}
        </Grid>
      </Grid>

      {/* data grid ends  */}
    </>
  );
}
