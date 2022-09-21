import React, { useState, useEffect } from "react";
import {
  Typography,
  TextField,
  Grid,
  Button,
  IconButton,
  MenuItem,
  Switch,
  InputAdornment,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import { OpenBox, Notify } from "../../store/Types";
import {Store } from "../../store/Context";
import {
  getDraft,
  categoryList,
  deleteProduct,
  getSubCatagories,
  updateProduct,
  updateBulk

} from "../../services/service";

import {
  DataGrid,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import Pagination from "@mui/material/Pagination";

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

export default function Policy() {

const {dispatch} = Store(); 
  // states

  const [Row, setRows] = useState([]);
  const [categoryCatalog, setCategoryCatalog] = useState([]);
  const [subCategoryCatalog, setSubCategoryCatalog] = useState([]);
  const [changeData, setChangeData] = useState({
    category: undefined,
    sub_category_name: undefined,
    SKU: '',
    COD: false,
    Returnable: false
  })
  const [selectedSKU, setSelection] = useState([]);

  useEffect(() => {
    categoryList()
      .then((response) => {
        setCategoryCatalog(response.data);
      })
    getSubCatagories()
      .then((response) => {
        setSubCategoryCatalog(response.data);
      })
    getDraft()
      .then((data) => {
        let final = []

        data.data.map((row) => {

          if (changeData.sub_category_name !== undefined) {
            if (row.sub_category_name === changeData.sub_category_name)
              final.push(row)
          }
          else if (changeData.category !== undefined) {
            if (row.category_name === changeData.category)
              final.push(row)
          }
          else final.push(row)
        })

        setRows(
          final.map((row, index) => {
            return {
              id: index + 1,
              SKU: row.SKU,
              status : row.status ? "Activated" : "Deactivated",
              product_title: row.product_title,
              category_name: row.category_name,
              sub_category_name: row.sub_category_name,
              COD: row.COD,
              returnable: row.returnable,
              returnDays: row.returnDays,
              action: row,
            };

          })
        );

      })
      .catch((err) => {
        //console.log(err);
      });
  }, [changeData]);

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
   
    { field: "SKU", headerName: "SKU", width: 100 },
    {
      field: "status",
      headerName: "Status",
      width: 200,

    },
   {
      field: "product_title",
      headerName: "Product Title",
      width: 150,
    },
    {
      field: "category_name",
      headerName: "Category Name",
      width: 150,
    },
    {
      field: "sub_category_name",
      headerName: "Sub Category Name",
      type: "number",
      width: 110,
    },
    {
      field: "COD",
      headerName: "COD",
      width: 100,
      renderCell: (params) => <Switch onChange={handleSwitch} name={params.field + " " + params.row.action._id} checked={params.formattedValue}></Switch>,

    },
    {
      field: "returnable",
      headerName: "Returnable",
      width: 100,
      renderCell: (params) => <Switch onChange={handleSwitch} name={params.field + " " + params.row.action._id} checked={params.formattedValue}></Switch>,

    },
    {
      field: "returnDays",
      headerName: "Return Days",
      width: 160,
    },
    {
      field: "action",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <div>
          <IconButton
            onClick={() => {
              //console.log(params);
             dispatch({type : OpenBox,payload : {
                state: true,
                formType: "update_product",
                payload: params,
              }});
            }}
            aria-label="update"
          >
            <CreateIcon />
          </IconButton>

          <IconButton
            onClick={() => {
              deleteProduct(params.formattedValue._id).then((res) => {
                dispatch({type : Notify,payload : {
                  open: true,
                  variant: "success",
                  message: "Product deleted successfully !!!",
                }});
              });
            }}
            aria-label="delete"
          >
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
  ];



  const handleSwitch = (e) => {
    let value = e.target.name.split(" ")

    const FD = new FormData()

    FD.append('_id', value[1])
    FD.append(value[0], e.target.checked)

    const res = updateProduct(FD);

    res.then((data) => {
      //console.log(data)
      dispatch({type : Notify,payload : {
        open: true,
        variant: 'success',
        message: "Status Updated Successfully !!!"

      } })
    })
      .catch((err) => {
        //console.log(err)
        dispatch({type : Notify,payload : {
          open: true,
          variant: 'error',
          message: "Something went wrong !!!"

        } })
      })
  }

  function DataGridView() {
    return (
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={Row}
          columns={columns}
          checkboxSelection
          pageSize={5}
          rowsPerPageOptions={[5]}
          value={changeData.SKU || ''}
          filterModel={{
            items: [
              {
                columnField: "SKU",
                operatorValue: "contains",
                value: `${changeData.SKU}`,
              },
            ],
          }}
          components={{
            Pagination: CustomPagination,
          }}
          onSelectionModelChange={(ids) => {
            const selectedIDs = new Set(ids);
            const selectedRows = Row.filter((row) =>
              selectedIDs.has(row.id),
            );
  
            setSelection(selectedRows);
          }}
        />
      </div>
    );
  }

  const handleSearch = (e) => {
    //console.log(e.target.name)
    setChangeData({
      ...changeData, [e.target.name]: e.target.value
    })
  };


  
  const handelSubmit = (e) => {
    e.preventDefault();

    const FD = new FormData();

    if (e.target.COD.value !== '') FD.append('COD', e.target.COD.value)
    if (e.target.returnable.value !== '') FD.append('returnable', e.target.returnable.value)
    FD.append('SKUs',JSON.stringify(selectedSKU))

    // //console.log(e.target.COD.value,
    //   e.target.returnable.value,
    //   selectedSKU)

    const res = updateBulk(FD);

    res.then((data) => {
      //console.log(data)
      dispatch({type : Notify,payload : {
        open: true,
        variant: 'success',
        message: "Status Updated Successfully !!!"

      } })
    })
      .catch((err) => {
        //console.log(err)
        dispatch({type : Notify,payload : {
          open: true,
          variant: 'error',
          message: "Something went wrong !!!"

        }})
      })
  }



  return (
    <>
      <Typography component={'span'} sx={{ display: "block" }} variant="h5">
        Policy
      </Typography>

      <br></br>

      {/* Section 1  */}
      <Grid
        container
        p={3}
        sx={{
          boxShadow: 1,
          borderRadius: 2,
          justifyContent: " space-evenly !important",
          alignItems: "center !important",
          gap: "15px",
        }}
      >
        <Grid xs={12} md={3.3}>
          <TextField
            fullWidth
            // autoComplete={false}
            id="demo-helper-text-aligned-no-helper"
            label="Search by SKU"
            type="text"
            name='SKU'
            value={changeData.SKU}
            onChange={handleSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  WS-
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid xs={12} md={4}>

          <TextField
            fullWidth
            id="outlined-select"
            select
            name="category"
            label="Category Filter"
            multiple
            value={changeData.category}
            onChange={handleSearch}
          >
            {categoryCatalog.map(
              (option) =>
                <MenuItem
                  key={option.value}
                  value={option.category_name}
                >
                  {option.category_name}
                </MenuItem>
            )}
            <MenuItem key={"none"} value={undefined}>
              {"None"}
            </MenuItem>
          </TextField>
        </Grid>
        <Grid xs={12} md={4}>

          <TextField
            fullWidth
            id="outlined-select"
            select
            name="sub_category_name"
            label="Sub Category Filter"
            multiple
            value={changeData.sub_category_name}
            onChange={handleSearch}
          >
            {subCategoryCatalog.map(
              (option) =>
                option.category_name === changeData.category && (<MenuItem
                  key={option.value}
                  value={option.sub_category_name}
                >
                  {option.sub_category_name}
                </MenuItem>)
            )}
            <MenuItem key={"none"} value={undefined}>
              {"None"}
            </MenuItem>
          </TextField>
        </Grid>
        {/* 
        <Grid xs={12} md={3.3}>
          <Button
            sx={{ width: "100%" }}
            color="primary"
            startIcon={<AddIcon />}
            variant="contained"
            onClick={() => {
             dispatch({type : OpenBox,payload : { state: true, formType: "product" });
            }}
          >
            Add Product
          </Button>
        </Grid> */}
      </Grid>
      {/* Section 1 ends  */}

      <br></br>
      {/* data grid  */}

      <Grid container scaping={2} className="overviewContainer">
        <Grid item p={2} xs={12} sx={{ boxShadow: 2, borderRadius: 5 }}>
          <Typography component={'span'} variant="h6"> Product List </Typography>
          <br></br>
          {DataGridView()}
        </Grid>
      </Grid>


      {/* data grid ends  */}

      <br></br>



      {/* Operation Section  */}
      <Grid
        container
        p={3}
        sx={{
          boxShadow: 1,
          borderRadius: 2,
          justifyContent: " space-evenly !important",
          alignItems: "center !important",
          gap: "15px",
        }}
      >

          { selectedSKU.length > 0 && <Grid xs={12} >
          <form onSubmit={handelSubmit} encType="multipart/form-data"
            method="post">
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">
                COD
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="COD"
              >
                <FormControlLabel
                  value={true}
                  control={<Radio size = {'small'} />}
                  label="Yes"
                />
                <FormControlLabel
                  value={false}
                  control={<Radio size = {'small'} />}
                  label="No"
                />
                <FormControlLabel
                  value={''}
                  control={<Radio size = {'small'} />}
                  label="None"
                />
              </RadioGroup>

              
            <FormLabel id="demo-radio-buttons-group-label">
                Returnable
              </FormLabel>

              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="returnable"
              >
                <FormControlLabel
                  value={true}
                  control={<Radio size = {'small'} />}
                  label="Yes"
                />
                <FormControlLabel
                  value={false}
                  control={<Radio size = {'small'} />}
                  label="No"
                />
                 <FormControlLabel
                  value={''}
                  control={<Radio size = {'small'} />}
                  label="None"
                />
              </RadioGroup>
            </FormControl>
            <br></br>
            <Button  type='submit' variant='contained' size = {'small'} >Apply Changes</Button>
           
          </form>

        </Grid>}
      </Grid>
      {/* Operation Section Ends */}
     
    </>
  );
}
