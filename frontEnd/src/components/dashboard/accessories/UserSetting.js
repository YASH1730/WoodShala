import React, { useState, useEffect } from "react";
import {
  Typography,
  TextField,
  Grid,
  Button,
  IconButton, Switch, Box
} from "@mui/material";
// import DeleteIcon from '@mui/icons-material/Delete';
import question from "../../../assets/img/question.svg";

import DiscountIcon from '@mui/icons-material/Discount';
import CreateIcon from '@mui/icons-material/Create';
import AddIcon from "@mui/icons-material/Add";
import {  statusCategory, listUser } from '../../../services/service'
import '../../../assets/custom/css/category.css'
import { useDispatch } from 'react-redux'
import { setAlert, setForm } from '../../../store/action/action'

import {
  DataGrid
} from '@mui/x-data-grid';


export default function UserSetting() {


  const dispatch = useDispatch();

  const [pageSize, setPageSize] = useState(50);


  const [check, setCheck] = useState([])

  const [search, setSearch] = useState("");


  const [Row, setRows] = useState([])

  useEffect(() => {
  fetchUser()
  }, []);

  async function fetchUser(){
    try{
      let res = await listUser()
      if(res)  {
        setRows(res.data.map((row, index) => {
          return ({
            id: index + 1,
            user_name : row.user_name,
            email : row.email,
            mobile : row.mobile,
            role : row.role,
            access : row.access.length > 0 ?  row.access : ["No Permissions Alloted"], 
            action: row
          })
        }))
      }
    }
    catch(err){
      console.log(err)
    }
  }


  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 50
    },
    {
      field: 'user_name',
      headerName: 'Name',
      width: 200,
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
    },
    {
      field: "mobile",
      headerName: "Mobile Number",
      width: 150,
    },
    {
      field: "role",
      headerName: "Role",
      width: 150,
      align : 'center',
    },
    {
      field: "access",
      headerName: "Permission",
      width: 300,
      align : 'center',
      renderCell :  (params)=>
      <Box p = {1} pl = {2}  component = {'ul'} sx= {{display : 'flex', 
      flexDirection : 'row', overflowX : 'scroll',
       listStyle : 'auto', gap : '2rem'  }}>
        {params.formattedValue.map((row)=><li>{row}</li>)}
      </Box>
    },
    {
      field: "action",
      headerName: "Actions",
      width: 100,
      renderCell: (params) =>
        <div className="categoryImage" >
          <IconButton onClick={() => {
            dispatch(setForm({
              state: true,
              formType: 'update_user',
              payload: params,
              row: Row,
              setRow: setRows,
            }))
          }} aria-label="delete"  >
            <CreateIcon />
          </IconButton>

        </div>,
    }

  ];



  const handelSearch = (e) => {
    //console.log(e.target.value)
    setSearch(e.target.value)
  }


  function DataGridView() {
    return (
      <div style={{ marginTop: '2%', height: 400, width: "100%" }}>
        <DataGrid
          filterModel={{
            items: [{ columnField: 'user_name', operatorValue: 'contains', value: `${search}` }],
          }}
          rows={Row}
          columns={columns}
          disableSelectionOnClick
          pagination
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[25, 50, 100]}

        />
      </div>
    );
  }


  return (
    <>
      <Typography component={'span'} sx={{ display: "block" }} variant="h5">
        User Setting
      </Typography>

      <br></br>

      {/* Section 1  */}

      <Grid
        container
        p={2}
        sx={{
          boxShadow: 1,
          borderRadius: 2,
          justifyContent: "center !important",
          alignItems: "center !important",
          gap: "15px",
        }}
      >
        <Grid xs={12} md={9.8}>
          <TextField
            fullWidth
            size = 'small'
            id="demo-helper-text-aligned-no-helper"
            label="Search by name"
            type="text"
            onChange={handelSearch}
          />
        </Grid>
       
{/* // button */}

        <Grid xs={12} md={2}>
          <Button
            onClick={() => {
              dispatch(setForm({ state: true, formType: "add_user", row: Row, setRow: setRows, setCheck }));
            }}
            sx={{ width: "100%" }}
            color="primary"
            startIcon={<AddIcon />}
            variant="contained"
          >
            Add User
          </Button>
        </Grid>
      </Grid>

      {/* Section 1 ends  */}
      <br></br>
      {/* data grid  */}

      <Grid container scaping={2} className="overviewContainer">
        <Grid item p={2} xs={12} sx={{ boxShadow: 2, borderRadius: 5 }}>
          <Typography component={'span'} variant="h6"> User List </Typography>
          <DataGridView/>
        </Grid>
      </Grid>

      {/* data grid ends  */}
    </>
  );
}
