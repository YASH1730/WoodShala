import React, { useState, useContext, useEffect } from "react";
import {
  Typography,
  TextField,
  Grid,
  Button,
  IconButton,
} from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import AddIcon from "@mui/icons-material/Add";
import { DataGrid } from "@mui/x-data-grid";
import { OpenBox, Notify } from "../../App";
import { getBlogHome, deleteBLog } from "../../services/service";
import "../../assets/custom/css/category.css";
import DeleteIcon from '@mui/icons-material/Delete';

export default function Knob() {
  const [search, setSearch] = useState("");

  const SideBox = useContext(OpenBox);
  const despatchAlert = useContext(Notify);

  const [Row, setRows] = useState();
  // function for get cetegory list

  useEffect(() => {
    getBlogHome()
      .then((data) => {
        console.log(data);

        setRows(
          data.data.map((row) => {
            return {
              id: row._id,
              title: row.title,
              seo_title : row.seo_title,
              seo_description : row.seo_description,
              image: row.card_image,
              action: row,
            };
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 100,
    },
    {
      field: "title",
      headerName: "Blog Title",
      width: 200,
    },
    {
      field: "seo_title",
      headerName: "SEO Title",
      width: 200,
    },
    {
      field: "seo_description",
      headerName: "SEO Description",
      width: 200,
    },
    {
      field: "image",
      headerName: "Blog Image",
      width: 160,
      align : 'center',
      renderCell: (params) => <div className="categoryImage" ><img src={params.formattedValue} alt='featured' /></div>,

    },
    {
      field: "action",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <div className="categoryImage">
          <IconButton
            onClick={() => {
              SideBox.setOpen({
                state: true,
                formType: "update_blog",
                payload: params,
              });
            }}
            aria-label="delete"
          >
            <CreateIcon />
          </IconButton>
          <IconButton onClick={() => { deleteBLog(params.id).then((res)=>{
            console.log(res)
          despatchAlert.setNote({
            open : true,
            variant : 'success',
            message : 'Blog Deleted !!!'
          })
        }) }} aria-label="delete"  >
          <DeleteIcon />
        </IconButton>
        
        </div>
      ),
    },
  ];

  

  const handelSearch = (e) => {
    console.log(e.target.value);
    setSearch(e.target.value);
  };

  function DataGridView() {
    return (
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          filterModel={{
            items: [
              {
                columnField: "title",
                operatorValue: "contains",
                value: `${search}`,
              },
            ],
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

  return (
    <>
      <Typography sx={{ display: "block" }} variant="h5">
        Blog
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
            label="Search by blog title"
            type="text"
            onChange={handelSearch}
          />
        </Grid>

        <Grid xs={12} md={2.8}>
          <Button
            onClick={() => {
              SideBox.setOpen({ state: true, formType: "addBlog" });
            }}
            sx={{ width: "100%" }}
            color="primary"
            startIcon={<AddIcon />}
            variant="contained"
          >
            Add Blog
          </Button>
        </Grid>
      </Grid>

      {/* Section 1 ends  */}
      <br></br>

      {/* data grid  */}

      <Grid container scaping={2} className="overviewContainer">
        <Grid item p={2} xs={12} sx={{ boxShadow: 2, borderRadius: 5 }}>
          <Typography variant="h6"> Door List</Typography>
          <br></br>
          {DataGridView()}
        </Grid>
      </Grid>

      {/* data grid ends  */}
    </>
  );
}
