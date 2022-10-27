import React, { useState, useEffect } from "react";
import {
  Typography,
  TextField,
  Grid,
  Button,
  IconButton,Box
} from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import AddIcon from "@mui/icons-material/Add";
import { getBlogHome, deleteBLog } from "../../services/service";
import "../../assets/custom/css/category.css";
import DeleteIcon from '@mui/icons-material/Delete';
import { OpenBox, Notify } from "../../store/Types";
import { Store } from "../../store/Context";


import {
  DataGrid,
// gridPageCountSelector,
  // gridPageSelector,
  // useGridApiContext,
  // useGridSelector,
} from '@mui/x-data-grid';
// import Pagination from '@mui/material/Pagination';


// function CustomPagination() {
//   const apiRef = useGridApiContext();
//   const page = useGridSelector(apiRef, gridPageSelector);
//   const pageCount = useGridSelector(apiRef, gridPageCountSelector);

//   return (
//     <Pagination
//       color="primary"
//       count={pageCount}
//       page={page + 1}
//       onChange={(event, value) => apiRef.current.setPage(value - 1)}
//     />
//   );
// }


export default function Knob() {
  const [search, setSearch] = useState("");


  const { dispatch } = Store();
  const [pageSize, setPageSize] = useState(50);



  const [Row, setRows] = useState();
  // function for get  list

  useEffect(() => {
    getBlogHome()
      .then((data) => {
        //console.log(data);

        setRows(
          data.data.map((row,index) => {
            return {
              id: index+1,
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
        //console.log(err);
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
              dispatch({type : OpenBox , payload :{
                state: true,
                formType: "update_blog",
                payload: params,
                row : Row,
                setRow : setRows 
              }});
            }}
          >
            <CreateIcon />
          </IconButton>
          <IconButton onClick={() => { deleteBLog(params.formattedValue._id).then((res)=>{
            console.log(res)
            if (res.status !==203)
            {
              setRows(Row.filter((set)=>{
                return  set.action._id !== params.formattedValue._id  ;
              }))
              dispatch({type : Notify, payload :{
                open : true,
                variant : 'success',
                message : res.data.message
              }})
            }
            else {
              dispatch({type : Notify, payload :{
                open : true,
                variant : 'error',
                message : res.data.message
              }})

            }

            
         
        }) }} aria-label="delete"  >
          <DeleteIcon />
        </IconButton>
        
        </div>
      ),
    },
  ];

  

  const handelSearch = (e) => {
    //console.log(e.target.value);
    setSearch(e.target.value);
  };

  function DataGridView() {
    return (
      <div style={{ marginTop : '2%', height: 400, width: "100%" }}>
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
          
          
          disableSelectionOnClick
        pagination
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[25,50, 100]}
        />
      </div>
    );
  }

  return (
    <Box  sx = {{pl:4,pr:4}}>
      <Typography component={'span'} sx={{ display: "block" }} variant="h5">
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
            // autoComplete={false}
            id="demo-helper-text-aligned-no-helper"
            label="Search by blog title"
            type="text"
            onChange={handelSearch}
          />
        </Grid>

        <Grid xs={12} md={2.8}>
          <Button
            onClick={() => {
              dispatch({type: OpenBox, payload : { state: true, formType: "addBlog",
              row : Row,
              setRow : setRows  }});
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
          <Typography component={'span'} variant="h6"> Blog List</Typography>
          <br></br>
          {DataGridView()}
        </Grid>
      </Grid>

      {/* data grid ends  */}
    </Box>
  );
}
