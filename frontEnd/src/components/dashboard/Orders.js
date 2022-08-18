import React, { useState, useContext, useEffect } from "react";
import {
  Typography,
  TextField,
  Grid,
  InputAdornment,
  IconButton,
  MenuItem,
} from "@mui/material";
// import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from "@mui/icons-material/Create";
import AddIcon from "@mui/icons-material/Add";
import { OpenBox, Notify } from "../../App";
import { getOrder, changeOrderStatus } from "../../services/service";
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

export default function Order() {
  const [search, setSearch] = useState({
    customer_email: undefined,
    OID: undefined,
    date : ''
    
  });

  const SideBox = useContext(OpenBox);
  const despatchAlert = useContext(Notify);

  const [Row, setRows] = useState([]);

  useEffect(() => {
    getOrder()
      .then((data) => {
        let final = [];

        data.data.map((row) => {
          if (search.OID !== undefined) {
            if (row.OID === `OID-${search.OID}`) final.push(row);
          } else if (search.customer_email !== undefined) {
            if (row.customer_email === search.customer_email) final.push(row);
          } else final.push(row);
        });

        setRows(
          final.map((row, index) => {
            return {
              id: index + 1,
              OID: row.OID,
              CID: row.CID,
              customer_name: row.customer_name,
              customer_email: row.customer_email,
              shipping_address: row.shipping_address,
              order_time: row.order_time,
              products: row.products,
              status: row.status,
              paid_amount:
                parseInt((row.paid_amount / row.total_amount) * 100) + "%",
              total_amount: row.total_amount,
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

  const statusCatalog = [
    {
      key: "processing",
      value: "processing",
      color: "blue",
    },
    {
      key: "completed",
      value: "completed",
      color: "green",
    },
    {
      key: "cancel",
      value: "cancel",
      color: "red",
    },
  ];

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 50,
    },
    {
      field: "status",
      editable: true,
      headerName: "Status",
      width: 150,
      renderCell: (params) => (
        <TextField
          fullWidth
          size="small"
          id="outlined-select"
          sx={{
            background:
              params.formattedValue === "completed"
                ? "#52ffc9"
                : params.formattedValue === "cancel"
                ? "#fdabab"
                : params.formattedValue === "processing"
                ? "#b9abfd"
                : "",
          }}
          value={status[params.row.action] || params.formattedValue}
          select
          name={params.row.action}
          multiple
          onChange={handleStatus}
        >
          {statusCatalog.map((option) => (
            <MenuItem key={option.key} value={option.value}>
              {option.value}
            </MenuItem>
          ))}
        </TextField>
      ),
    },
    {
      field: "OID",
      headerName: "Order ID",
      width: 100,
    },
    {
      field: "CID",
      headerName: "Customer ID",
      width: 100,
    },
    {
      field: "customer_name",
      headerName: "Customer Name",
      width: 150,
      align: "center",
    },
    {
      field: "customer_email",
      headerName: "Customer Email",
      width: 250,
      align: "center",
    },
    {
      field: "shipping_address",
      headerName: "Shipping Address",
      width: 200,
    },
    {
      field: "order_time",
      headerName: "Order Time/Date",
      width: 200,
      align: "center",
    },
    {
      field: "products",
      headerName: "Product's SKUs",
      width: 200,
    },

    {
      field: "paid_amount",
      headerName: "Paid Amount",
      width: 80,
      align: "center",
    },
    {
      field: "total_amount",
      headerName: "Total Amount",
      width: 80,
      align: "center",
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
                formType: "update_order",
                payload: params,
              });
            }}
            aria-label="delete"
          >
            <CreateIcon />
          </IconButton>
          {/* <IconButton onClick={() => { deleteCategory(params.formattedValue).then((res)=>{
          despatchAlert.setNote({
            open : true,
            variant : 'success',
            message : 'Category Deleted !!!'
          })
        }) }} aria-label="delete"  >
          <DeleteIcon />
        </IconButton>
         */}
        </div>
      ),
    },
  ];

  const handleStatus = (e) => {
    setStatus({ ...status, [e.target.name]: e.target.value });

    console.log(e.target.name);

    const FD = new FormData();

    FD.append("_id", e.target.name);
    FD.append("status", e.target.value);

    const res = changeOrderStatus(FD);

    res
      .then((data) => {
        console.log(data);
        despatchAlert.setNote({
          open: true,
          variant: "success",
          message: " Order Status Updated Successfully !!!",
        });
      })
      .catch((err) => {
        console.log(err);
        despatchAlert.setNote({
          open: true,
          variant: "error",
          message: "Something Went Wrong !!!",
        });
      });
  };

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
        Order
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
                <InputAdornment position="start">OID</InputAdornment>
              ),
            }}
            value={search.OID}
            name="OID"
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
            value={search.customer_email}
            name="customer_email"
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
        

        {/* <Grid xs={12} md={2.8}>
          <Button
            onClick={() => {
              SideBox.setOpen({ state: true, formType: "addOrder" });
            }}
            sx={{ width: "100%" }}
            color="primary"
            startIcon={<AddIcon />}
            variant="contained"
          >
            Add Order
          </Button>
        </Grid> */}
      </Grid>

      {/* Section 1 ends  */}
      <br></br>

      {/* data grid  */}

      <Grid container scaping={2} className="overviewContainer">
        <Grid item p={2} xs={12} sx={{ boxShadow: 2, borderRadius: 5 }}>
          <Typography variant="h6"> Order List </Typography>
          <br></br>
          {DataGridView()}
        </Grid>
      </Grid>

      {/* data grid ends  */}
    </>
  );
}
