import React, { useState, useEffect } from "react";
import {
  Typography,
  TextField,
  Grid,
  Button,
  IconButton, Switch
} from "@mui/material";
import CreateIcon from '@mui/icons-material/Create';
import AddIcon from "@mui/icons-material/Add";
import { setForm, setAlert } from "../../../store/action/action";
import { useDispatch } from 'react-redux'
import { getSubCatagories, changeSubSatatus, deleteCategory } from '../../../services/service'
import question from "../../../assets/img/question.svg";

import {
  DataGrid,
} from '@mui/x-data-grid';



export default function SubCategory() {

  const [search, setSearch] = useState("");
  const [check, setCheck] = useState([])

  const dispatch = useDispatch();
  const [pageSize, setPageSize] = useState(50);


  const [Row, setRows] = useState([])
  // function for get cetegory list

  useEffect(() => {
    getSubCatagories()
      .then((data) => {
        setCheck(data.data.map((row, index) => {
          return row.sub_category_status
        }))

        setRows(data.data.map((row, index) => {

          return ({
            id: index + 1,
            category_id: row.category_id,
            category_name: row.category_name,
            sub_category_name: row.sub_category_name,
            sub_category_status: row.sub_category_status,
            seo_title: row.seo_title,
            seo_description: row.seo_description,
            seo_keyword: row.seo_keyword,
            sub_category_image: row.sub_category_image,
            product_description: row.product_description,

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
      field: 'sub_category_image',
      align: 'center',
      headerName: 'Image',
      width: 200,
      renderCell: (params) => <div className="categoryImage" >{<img src={params.formattedValue !== undefined ? params.formattedValue : question} alt='category' />}</div>,
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
              formType: 'update_Subcategory',
              payload: params,
              row: Row,
              setRow: setRows,
            }))
          }} aria-label="delete"  >
            <CreateIcon />
          </IconButton>
          {/* <IconButton onClick={() => {
            deleteCategory(params.formattedValue).then((res) => {

            })
          }} aria-label="delete"  >
            <DeleteIcon />
          </IconButton> */}

        </div>,
    }

  ];


  const handleSwitch = (e) => {
    const id = e.target.name.split(' ')

    const FD = new FormData()

    FD.append('_id', id[0])
    FD.append('sub_category_status', e.target.checked)

    const res = changeSubSatatus(FD);

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
        message: " Sub Category Status Updated Successfully !!!"
      }))
    })
      .catch((err) => {
        console.log(err)
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
            // autoComplete={false}
            id="demo-helper-text-aligned-no-helper"
            label="Search by category type"
            type="text"
            onChange={handelSearch}
          />
        </Grid>


        <Grid xs={12} md={2.8}>
          <Button
            onClick={() => {
              dispatch(setForm({ state: true, formType: "subcategory", row: Row, setRow: setRows, setCheck: setCheck }));
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
          <Typography component={'span'} variant="h6"> Sub Category </Typography>
          <br></br>
          {DataGridView()}
        </Grid>
      </Grid>

      {/* data grid ends  */}
    </>
  );
}
