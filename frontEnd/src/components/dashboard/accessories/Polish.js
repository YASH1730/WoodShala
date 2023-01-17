import React, { useState, useEffect } from "react";
import {
  Typography,
  TextField,
  Grid,
  Button,
  IconButton, Switch
} from "@mui/material";
// import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import AddIcon from "@mui/icons-material/Add";

import { getPolish, changePolishStatus } from '../../../services/service'
import '../../../assets/custom/css/category.css'

// Redux
import { useDispatch } from 'react-redux'
import { setAlert, setForm } from '../../../store/action/action'

import {
  DataGrid,
} from '@mui/x-data-grid';





export default function Polish() {

  const [search, setSearch] = useState("");
  const [check, setCheck] = useState([])
  const [pageSize, setPageSize] = useState(50);

  const dispatch = useDispatch();

  const [Row, setRows] = useState([])
  // function for get cetegory list

  useEffect(() => {
    getPolish()
      .then((data) => {
        setCheck(data.data.map((row, index) => {
          return row.polish_status
        }))

        setRows(data.data.map((row, index) => {

          return ({
            id: index + 1,
            polish_name: row.polish_name,
            polish_type: row.polish_type,
            polish_finish: row.polish_finish,
            level: row.level,
            lock: row.lock,
            price: row.price,
            action: row
          })
        }))
      })
      .catch((err) => {
        //console.log(err)
      })
  }, []);


  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 100
    },
    {
      field: "polish_name",
      headerName: "Polish Name",
      width: 200,
    },
    {
      field: "polish_type",
      headerName: "Type",
      width: 150,
    },
    {
      field: "polish_finish",
      headerName: "Finishing",
      width: 150,
    },
    {
      field: "price",
      headerName: "Price",
      type: 'number',
      width: 100,
    },
    {
      field: "lock",
      headerName: "Lock",
      width: 100,
    },
    // {
    //   field: "polish_status",
    //   headerName: "Polish Status",
    //   width: 200,
    //   renderCell: (params) => <Switch onChange={handleSwitch} name={`${params.row.action + ' ' + (params.row.id - 1)}`} checked={check[params.row.id - 1]}></Switch>,


    // },
    {
      field: "action",
      headerName: "Actions",
      width: 200,
      renderCell: (params) =>
        <div className="categoryImage" >
          <IconButton onClick={() => {
            dispatch(setForm({
              state: true,
              formType: 'update_polish',
              payload: params,
              row: Row,
              setRow: setRows,
            }))
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


  const handleSwitch = (e) => {
    const id = e.target.name.split(' ')

    const FD = new FormData()

    FD.append('_id', id[0])
    FD.append('polish_status', e.target.checked)

    const res = changePolishStatus(FD);

    res.then((data) => {
      setCheck(check.map((row, index) => {
        // //console.log(parseInt(id[1]) === index)
        if (parseInt(id[1]) === index)
          return !row
        else
          return row
      }))
      dispatch(setAlert({
        open: true,
        variant: 'success',
        message: " Polish Status Updated Successfully !!!"

      }))
    })
      .catch((err) => {
        //console.log(err)
        dispatch(setAlert({
          open: true,
          variant: 'error',
          message: "Something Went Wrong !!!"

        }))
      })




  }

  const handelSearch = (e) => {
    //console.log(e.target.value)
    setSearch(e.target.value)
  }


  function DataGridView() {
    return (
      <div style={{ marginTop: '2%', height: 400, width: "100%" }}>
        <DataGrid
          filterModel={{
            items: [{ columnField: 'polish_name', operatorValue: 'contains', value: `${search}` }],
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
        Polish
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
            // autoComplete={false}
            id="demo-helper-text-aligned-no-helper"
            label="Search by polish name"
            type="text"
            onChange={handelSearch}
          />
        </Grid>


        <Grid xs={12} md={2.8}>
          <Button
            onClick={() => {
              dispatch(setForm({ state: true, formType: "addPolish", row: Row, setRow: setRows }));
            }}
            sx={{ width: "100%" }}
            color="primary"
            startIcon={<AddIcon />}
            variant="contained"
          >
            Add Polish
          </Button>
        </Grid>
      </Grid>

      {/* Section 1 ends  */}
      <br></br>

      {/* data grid  */}

      <Grid container scaping={2} className="overviewContainer">
        <Grid item p={2} xs={12} sx={{ boxShadow: 2, borderRadius: 5 }}>
          <Typography component={'span'} variant="h6"> Polish List </Typography>
          <br></br>
          {DataGridView()}
        </Grid>
      </Grid>

      {/* data grid ends  */}
    </>
  );
}
