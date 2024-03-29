import React, { useState, useEffect } from "react";
import {
  Typography,
  TextField,
  Grid,
  Button,
  IconButton, Switch
} from "@mui/material";
// import DeleteIcon from '@mui/icons-material/Delete';
import question from "../../../assets/img/question.svg";

import DiscountIcon from '@mui/icons-material/Discount';
import CreateIcon from '@mui/icons-material/Create';
import AddIcon from "@mui/icons-material/Add";
import { categoryList, statusCategory } from '../../../services/service'
import '../../../assets/custom/css/category.css'
import { useDispatch } from 'react-redux'
import { setAlert, setForm } from '../../../store/action/action'

import {
  DataGrid
} from '@mui/x-data-grid';


export default function Category() {


  const dispatch = useDispatch();

  const [pageSize, setPageSize] = useState(50);


  const [check, setCheck] = useState([])

  const [search, setSearch] = useState("");


  const [Row, setRows] = useState([])

  useEffect(() => {
    categoryList()
      .then((data) => {

        setCheck(data.data.map((row, index) => {
          return row.category_status
        }))

        setRows(data.data.map((row, index) => {

          return ({
            id: index + 1,
            category_image: row.category_image,
            category_name: row.category_name,
            category_status: row.category_status,
            seo_title: row.seo_title,
            seo_description: row.seo_description,
            seo_keyword: row.seo_keyword,
            product_description: row.product_description,
            discount_limit: row.discount_limit,
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
      field: 'category_image',
      align: 'center',
      headerName: 'Image',
      width: 200,
      renderCell: (params) => <div className="categoryImage" >{<img src={params.formattedValue !== 'undefined' ? params.formattedValue : question} alt='category' />}</div>,
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
      renderCell: (params) => <Switch onChange={handleSwitch} name={`${params.row.action + ' ' + (params.row.id - 1)}`} checked={check[params.row.id - 1]}></Switch>,

    },
    {
      field: "discount_limit",
      headerName: "Discount Limit (%)",
      width: 150,
      align : 'center',
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
              formType: 'update_category',
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
        </IconButton> */}

        </div>,
    }

  ];


  const handleSwitch = (e) => {
    // //console.log(e.target.name)
    // //console.log(check)

    const id = e.target.name.split(' ')
    const FD = new FormData()

    FD.append('_id', id[0])
    FD.append('category_status', e.target.checked)

    const res = statusCategory(FD);

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
        message: "Category Status Updated Successfully !!!"

      }))
    })
      .catch((err) => {
        //console.log(err)
        dispatch(setAlert({
          open: true,
          variant: 'error',
          message: "May be duplicate found !!!"

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
            items: [{ columnField: 'category_name', operatorValue: 'contains', value: `${search}` }],
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
        Category
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
        <Grid xs={12} md={3.7}>
          <TextField
            fullWidth
            // autoComplete={false}
            size = 'small'
            id="demo-helper-text-aligned-no-helper"
            label="Search by category type"
            type="text"
            onChange={handelSearch}
          />
        </Grid>
        <Grid xs={12} md={3.7}>
          <TextField
            fullWidth
            // autoComplete={false}
            size = 'small'
            id="demo-helper-text-aligned-no-helper"
            label="Search by discount limit"
            type="number"
            onChange={handelSearch}
          />
        </Grid>

{/* // button */}

        <Grid xs={12} md={2}>
          <Button
            onClick={() => {
              dispatch(setForm({ state: true, formType: "category", row: Row, setRow: setRows, setCheck }));
            }}
            sx={{ width: "100%" }}
            color="primary"
            startIcon={<AddIcon />}
            variant="contained"
          >
            Add Category
          </Button>
        </Grid>
        <Grid xs={12} md={2}>
          <Button
            onClick={() => {
              dispatch(setForm({ state: true, formType: "discount_category", row: Row, setRow: setRows, setCheck }));
            }}
            sx={{ width: "100%" }}
            color="primary"
            startIcon={<DiscountIcon />}
            variant="contained"
          >
            Apply Discount
          </Button>
        </Grid>
      </Grid>

      {/* Section 1 ends  */}
      <br></br>
      {/* data grid  */}

      <Grid container scaping={2} className="overviewContainer">
        <Grid item p={2} xs={12} sx={{ boxShadow: 2, borderRadius: 5 }}>
          <Typography component={'span'} variant="h6"> Category List </Typography>
          <DataGridView/>
        </Grid>
      </Grid>

      {/* data grid ends  */}
    </>
  );
}
