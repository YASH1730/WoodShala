import React, { useState, useContext, useEffect } from "react";
import {
  Typography,
  TextField,
  Grid,
  InputAdornment,
  IconButton,
  Button,
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from "@mui/icons-material/Create";
import AddIcon from "@mui/icons-material/Add";
import { OpenBox, Notify } from "../../App";
import { listCustomer, deleteCustomer  } from "../../services/service";
import "../../assets/custom/css/category.css";

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

export default function Customer() {
  const [search, setSearch] = useState({
    email: undefined,
    CID: undefined,
    date : ''
    
  });

  const SideBox = useContext(OpenBox);
  const despatchAlert = useContext(Notify);

  const [Row, setRows] = useState([]);

  useEffect(() => {
    listCustomer()
      .then((data) => {
        let final = [];


        data.data.map((row) => {
          if (search.CID !== undefined) {
            if (row.CID === `CID-${search.CID}`) final.push(row);
          } else if (search.email !== undefined) {
            if (row.email === search.email) final.push(row);
          } else final.push(row);
        });

        console.log(final)


        setRows(
          final.map((row, index) => {
            return {
              id: index + 1,
              CID : row.CID ,
              register_time : row.register_time ,
              profile_image : row.profile_image ,
              username : row.username ,
              mobile : row.mobile ,
              email : row.email ,
              password : row.password ,
              city : row.city ,
              state : row.state ,
              shipping : row.shipping ,
              action: row._id,
            };
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, [search]);

  const [status, setStatus] = useState({});


  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 50,
    },
    {
      field: 'profile_image',
      align: 'center',
      headerName: 'Image',
      width: 200,
      renderCell: (params) => <div className="categoryImage" >{params.formattedValue !== "undefined" ? <img src={params.formattedValue} alt='profile_image' /> : "Image Not Give"}</div>,
    },
    {
      field: "CID",
      headerName: "Customer ID",
      width: 350,
    },
    {
      field: "username",
      headerName: "Customer Name",
      width: 150,
      align: "center",
    },
    {
      field: "email",
      headerName: "Customer Email",
      width: 250,
      align: "center",
    },
    {
      field: "shipping",
      headerName: "Shipping Address",
      width: 200,
    },
    {
      field: "register_time",
      headerName: "Registration Date",
      width: 200,
      align: "center",
    },
    // {
    //   field: "pincode",
    //   headerName: "Pincode",
    //   width: 100,
    // },

    {
      field: "city",
      headerName: "City",
      width: 100,
      align: "center",
    },
    {
      field: "state",
      headerName: "State",
      width: 100,
      align: "center",
    },
    // {
    //   field: "landmark",
    //   headerName: "Landmark",
    //   width: 100,
    //   align: "center",
    // },

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
                formType: "update_customer",
                payload: params,
              });
            }}
            aria-label="update"
          >
            <CreateIcon />
          </IconButton>
          <IconButton onClick={() => { deleteCustomer(params.formattedValue).then((res)=>{
          despatchAlert.setNote({
            open : true,
            variant : 'success',
            message : 'Customer Deleted !!!'
          })
        }) }} aria-label="delete"  >
          <DeleteIcon />
        </IconButton>
        
        </div>
      ),
    },
  ];

  // const handleStatus = (e) => {
  //   setStatus({ ...status, [e.target.name]: e.target.value });

  //   console.log(e.target.name);

  //   const FD = new FormData();

  //   FD.append("_id", e.target.name);
  //   FD.append("status", e.target.value);

  //   const res = changeCustomerStatus(FD);

  //   res
  //     .then((data) => {
  //       console.log(data);
  //       despatchAlert.setNote({
  //         open: true,
  //         variant: "success",
  //         message: " Customer Status Updated Successfully !!!",
  //       });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       despatchAlert.setNote({
  //         open: true,
  //         variant: "error",
  //         message: "Something Went Wrong !!!",
  //       });
  //     });
  // };

  const handelSearch = (e) => {
    setSearch({
      ...search,
      [e.target.name]: e.target.value || undefined,
    });
  };

  function DataGridView() {
    return (
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          filterModel={{
            items: [
              {
                columnField: "order_time",
                operatorValue: "contains",
                value: `${search.date}`,
              },
            ],
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

  return (
    <>
      <Typography sx={{ display: "block" }} variant="h5">
        Customer
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
            autoComplete={false}
            id="demo-helper-text-aligned-no-helper"
            type="text"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">CID</InputAdornment>
              ),
            }}
            value={search.CID}
            name="CID"
            onChange={handelSearch}
          />
        </Grid>
        <Grid xs={12} md={4}>
          <TextField
            fullWidth
            autoComplete={false}
            id="demo-helper-text-aligned-no-helper"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">Email</InputAdornment>
              ),
            }}
            value={search.email}
            name="email"
            type="email"
            onChange={handelSearch}
          />
        </Grid>
        <Grid xs={12} md={4}>
          <TextField
            fullWidth
            autoComplete={false}
            id="demo-helper-text-aligned-no-helper"
            type="date"
            name="date"
            onChange={handelSearch}
          />
        </Grid>
        

      </Grid>

      {/* Section 1 ends  */}
      <br></br>

      {/* data grid  */}

      <Grid container scaping={2} className="overviewContainer">
        <Grid item p={2} xs={12} sx={{ boxShadow: 2, borderRadius: 5 }}>
        <div style= {
            {
              display  : 'flex',
              justifyContent : 'space-between',
            }
          } >

          <Typography variant="h6"> Customer List </Typography>
          <Button
            onClick={() => {
              SideBox.setOpen({ state: true, formType: "add_customer" });
            }}
            color="primary"
            variant="contained"
          >
            <AddIcon />
           
          </Button>
          </div>
          <br></br>
          {DataGridView()}
        </Grid>
      </Grid>

      {/* data grid ends  */}
    </>
  );
}
