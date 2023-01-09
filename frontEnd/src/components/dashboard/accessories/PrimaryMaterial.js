import React, { useState, useMemo } from "react";
import {
  Typography,
  TextField,
  Grid,
  Button,
  IconButton, Switch
} from "@mui/material";
import CreateIcon from '@mui/icons-material/Create';
import AddIcon from "@mui/icons-material/Add";
import { useDispatch } from 'react-redux'
import { setAlert, setForm } from "../../../store/action/action";
import { getPrimaryMaterial, changePrimaryMaterialStatus } from '../../../services/service'
import '../../../assets/custom/css/category.css'
import question from "../../../assets/img/question.svg";

import {
  DataGrid,
  // gridPageCountSelector,
  // gridPageSelector,
  // useGridApiContext,
  // useGridSelector,
} from '@mui/x-data-grid';
// import Pagination from '@mui/material/Pagination';




export default function PrimaryMaterial() {

  const [search, setSearch] = useState("");
  const [check, setCheck] = useState([])

  const dispatch = useDispatch();
  const [pageSize, setPageSize] = useState(50);

  const [Row, setRows] = useState([])
  // function for get category list

  useMemo(() => {
    getPrimaryMaterial()
      .then((data) => {
        setCheck(data.data.map((row, index) => {
          return row.primaryMaterial_status
        }))

        setRows(data.data.map((row, index) => {

          return ({
            id: index + 1,
            primaryMaterial_name: row.primaryMaterial_name,
            primaryMaterial_image: row.primaryMaterial_image,
            primaryMaterial_description: row.primaryMaterial_description,
            primaryMaterial_status: row.primaryMaterial_status,
            action: row._id
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
      field: "primaryMaterial_name",
      headerName: "Material Name",
      width: 200,

    },
    {
      field: "primaryMaterial_image",
      headerName: "Material Image",
      width: 200,
      renderCell: (params) => <div className="categoryImage" >{<img src={params.formattedValue !== undefined ? params.formattedValue : question} alt='category' />}</div>,

    },
    {
      field: "primaryMaterial_description",
      headerName: "Material Description",
      width: 200,

    },
    {
      field: "primaryMaterial_status",
      headerName: "Material Status",
      width: 200,
      renderCell: (params) => <Switch onChange={handleSwitch} name={`${params.row.action + ' ' + (params.row.id - 1)}`} checked={check[params.row.id - 1]}></Switch>,


    },
    {
      field: "action",
      headerName: "Actions",
      width: 200,
      renderCell: (params) =>
        <div className="categoryImage" >
          <IconButton onClick={() => {
            dispatch(setForm({
              state: true,
              formType: 'update_PrimaryMaterial',
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
    FD.append('primaryMaterial_status', e.target.checked)

    const res = changePrimaryMaterialStatus(FD);

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
        message: " Material Status Updated Successfully !!!"

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
            items: [{ columnField: 'primaryMaterial_name', operatorValue: 'contains', value: `${search}` }],
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
        Material
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
            label="Search by material name"
            type="text"
            onChange={handelSearch}
          />
        </Grid>


        <Grid xs={12} md={2.8}>
          <Button
            onClick={() => {
              dispatch(setForm({ state: true, formType: "primaryMaterial", row: Row, setRow: setRows, setCheck }));
            }}
            sx={{ width: "100%" }}
            color="primary"
            startIcon={<AddIcon />}
            variant="contained"
          >
            Add Material
          </Button>
        </Grid>
      </Grid>

      {/* Section 1 ends  */}
      <br></br>

      {/* data grid  */}

      <Grid container scaping={2} className="overviewContainer">
        <Grid item p={2} xs={12} sx={{ boxShadow: 2, borderRadius: 5 }}>
          <Typography component={'span'} variant="h6"> Material List </Typography>
          <br></br>
          {DataGridView()}
        </Grid>
      </Grid>

      {/* data grid ends  */}
    </>
  );
}
