import React, { useState, useEffect } from "react";
import {
  Typography,
  TextField,
  Grid,
  Button,
  IconButton, Switch,
  Box
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import AddIcon from "@mui/icons-material/Add";
import { OpenBox, Notify } from "../../store/Types";
import { Store } from "../../store/Context";
import { getHardware, changeHardwareStatus, deleteHardware } from '../../services/service'
import '../../assets/custom/css/category.css'

import {
  DataGrid,
} from '@mui/x-data-grid';





export default function Hardware() {

  const [search, setSearch] = useState("");
  const [check, setCheck] = useState()
  const { dispatch } = Store();
  const [pageSize, setPageSize] = useState(50);

  const [Row, setRows] = useState()
  // function for get  list

  useEffect(() => {
    getHardware()
      .then((data) => {
        setCheck(data.data.map((row, index) => {
          return row.fabric_status
        }))

        setRows(data.data.map((row, index) => {

          return ({
            id: index + 1,
            SKU: row.SKU,
            title: row.title,
            category_name: row.category_name,
            category_id: row.category_id,
            sub_category_name: row.sub_category_name,
            sub_category_id: row.sub_category_id,
            hardware_image: row.hardware_image,
            warehouse: row.warehouse,
            bangalore_stock: row.bangalore_stock,
            jodhpur_stock: row.jodhpur_stock,
            manufacturing_time: row.manufacturing_time,
            status: row.status,
            returnDays: row.returnDays,
            COD: row.COD,
            returnable: row.returnable,
            quantity: row.quantity,
            package_length: row.package_length,
            package_height: row.package_height,
            package_breadth: row.package_breadth,
            unit: row.unit,
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
      field: "SKU",
      headerName: "SKU",
      width: 200,
    },
    {
      field: 'hardware_image',
      align: 'center',
      headerName: 'Image',
      width: 200,
      renderCell: (params) => <div className="categoryImage" ><img src={params.formattedValue[0]} alt='Hardware' /></div>,
    },
    {
      field: "status",
      headerName: "Status",
      width: 200,
      renderCell: (params) => <Switch onChange={handleSwitch} name={`${params.row.action + ' ' + (params.row.id - 1)}`} checked={check[params.row.id - 1]}></Switch>,

    },
    {
      field: "category_name",
      headerName: "Category",
      width: 200,
    },
    {
      field: "sub_category_name",
      headerName: "Sub Category Name",
      width: 200,
    },

    {
      field: "action",
      headerName: "Actions",
      width: 200,
      renderCell: (params) =>
        <div className="fabricImage" >
          <IconButton onClick={() => {
            dispatch({
              type: OpenBox, payload: {
                state: true,
                formType: 'update_fabric',
                payload: params,
                row: Row,
                setRow: setRows
              }
            })
          }} aria-label="delete"  >
            <CreateIcon />
          </IconButton>
          <IconButton onClick={() => {
            deleteHardware(params.formattedValue).then((res) => {
              dispatch({
                type: Notify, payload: {
                  open: true,
                  variant: 'success',
                  message: 'Hardware Deleted !!!'
                }
              })
            })
          }} aria-label="delete"  >
            <DeleteIcon />
          </IconButton>

        </div>,
    }

  ];


  const handleSwitch = (e) => {
    const id = e.target.name.split(' ')

    const FD = new FormData()

    FD.append('_id', id[0])
    FD.append('fabric_status', e.target.checked)

    const res = changeHardwareStatus(FD);

    res.then((data) => {

      setCheck(check.map((row, index) => {
        // //console.log(parseInt(id[1]) === index)
        if (parseInt(id[1]) === index)
          return !row
        else
          return row
      }))
      dispatch({
        type: Notify, payload: {
          open: true,
          variant: 'success',
          message: "Fabric Status Updated Successfully !!!"

        }
      })
    })
      .catch((err) => {
        //console.log(err)
        dispatch({
          type: Notify, payload: {
            open: true,
            variant: 'error',
            message: "Something went wrong !!!"

          }
        })
      })




  }

  const handelSearch = (e) => {
    //console.log(e.target.value)
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
    <Box sx={{ pl: 4, pr: 4 }}>
      <Typography component={'span'} sx={{ display: "block" }} variant="h5">
        Hardware
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
            label="Search by hardware"
            type="text"
            onChange={handelSearch}
          />
        </Grid>


        <Grid xs={12} md={2.8}>
          <Button
            onClick={() => {
              dispatch({ type: OpenBox, payload: { state: true, formType: "hardware", row: Row, setRow: setRows } });
            }}
            sx={{ width: "100%" }}
            color="primary"
            startIcon={<AddIcon />}
            variant="contained"
          >
            Add Hardware
          </Button>
        </Grid>
      </Grid>

      {/* Section 1 ends  */}
      <br></br>
      {/* data grid  */}

      <Grid container scaping={2} className="overviewContainer">
        <Grid item p={2} xs={12} sx={{ boxShadow: 2, borderRadius: 5 }}>
          <div>
            <Typography component={'span'} variant="h6"> Hardware List </Typography>
          </div>
          <br></br>
          {DataGridView()}
        </Grid>
      </Grid>

      {/* data grid ends  */}
    </Box>
  );
}
