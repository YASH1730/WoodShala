import React, { useState, useEffect } from "react";
// import PropTypes from 'prop-types';
import {
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  MenuItem,
  Grid,
  Box,
  Button,
} from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";

import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { setAlert } from "../../../store/action/action";
import {
  getAbandonedOrder,
  changeOrderStatus,
  deleteOrder,
} from "../../../services/service";
import "../../../assets/custom/css/category.css";

import { DataGrid } from "@mui/x-data-grid";

export default function Order() {
  // context
  const dispatch = useDispatch();
  const [pageState, setPageState] = useState({
    data: [],
    isLoading: false,
    page: 1,
    limit: 10,
    total: 0,
    uuid: undefined,
    customer_name: undefined,
    customer_email: undefined,
    date: "",
    filter: false,
  });

  async function fetchData() {
    setPageState((lastState) => ({
      ...lastState,
      isLoading: true,
    }));
    getAbandonedOrder({
      page: pageState.page,
      limit: pageState.limit,
      total: pageState.total,
      uuid: pageState.uuid,
      customer_name: pageState.customer_name,
      customer_email: pageState.customer_email,
    })
      .then((data) => {
        setPageState((lastState) => ({
          ...lastState,
          data: data.data.data.map((row, index) => {
            return {
              id: index + 1,
              uuid: row.uuid,
              order_time: row.order_time,
              status: row.status,
              CID: row.CID,
              customer_name: row.customer_name,
              customer_email: row.customer_email,
              customer_mobile: row.customer_mobile,
              city: row.city,
              state: row.state,
              shipping: row.shipping,
              quantity: JSON.stringify(row.quantity),
              discount: row.discount,
              paid: parseInt((row.paid / row.total) * 100) + "%",
              total: row.total,
              note: row.note || "",
              action: row._id,
            };
          }),
          isLoading: false,
          total: data.data.total,
          filter: false,
        }));
      })
      .catch((err) => {});
  }

  useEffect(() => {
    fetchData();
  }, [pageState.page, pageState.limit, pageState.filter]);

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
      field: "uuid",
      headerName: "UUID",
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
      field: "city",
      headerName: "City",
      width: 100,
    },
    {
      field: "state",
      headerName: "State",
      width: 100,
    },
    {
      field: "shipping",
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
      field: "quantity",
      headerName: "Product $ Quantity",
      width: 200,
    },

    {
      field: "discount",
      headerName: "Discount",
      width: 80,
      align: "center",
    },

    {
      field: "paid",
      headerName: "Paid Amount",
      width: 80,
      align: "center",
    },
    {
      field: "total",
      headerName: "Total Amount",
      width: 80,
      align: "center",
    },
    {
      field: "note",
      headerName: "Note",
      width: 80,
      align: "center",
    },

    // {
    //   field: "action",
    //   headerName: "Actions",
    //   width: 200,
    //   renderCell: (params) => (
    //     <div className="categoryImage">
    //       {/* <IconButton
    //         onClick={() => {
    //           dispatch(setForm({
    //             state: true,
    //             formType: "update_order",
    //             payload: params,
    //             row: Row,
    //             setRow: setRows
    //           }));
    //         }}
    //         aria-label="delete"
    //       >
    //         <CreateIcon />
    //       </IconButton> */}
    //       {/* <IconButton onClick={() => {
    //         deleteOrder(params.formattedValue).then((res) => {
    //           setPageState(old => ({
    //             ...old, total: old.total - 1,
    //             data: old.data.filter((set) => {
    //               return set.action !== params.formattedValue;
    //             })
    //           }));

    //           dispatch(setAlert({
    //             open: true,
    //             variant: 'success',
    //             message: 'Order Deleted !!!'
    //           }))
    //         })
    //       }} aria-label="delete"  >
    //         <DeleteIcon />
    //       </IconButton> */}
    //     </div>
    //   ),
    // },
  ];

  const clearFilter = () => {
    return setPageState((old) => ({
      ...old,
      O: undefined,
      date: "",
      customer_name: undefined,
      customer_email: undefined,
      order_time: "",
      filter: !old.filter,
    }));
  };
  // status update
  const handleStatus = (e) => {
    setStatus({ ...status, [e.target.name]: e.target.value });

    //console.log(e.target.name);

    const FD = new FormData();

    FD.append("_id", e.target.name);
    FD.append("status", e.target.value);

    const res = changeOrderStatus(FD);

    res
      .then((data) => {
        console.log(data);
        dispatch(
          setAlert({
            open: true,
            variant: "success",
            message: " Order Status Updated Successfully !!!",
          })
        );
      })
      .catch((err) => {
        console.log(err);
        dispatch(
          setAlert({
            open: true,
            variant: "error",
            message: "Something Went Wrong !!!",
          })
        );
      });
  };

  const handleSearch = (e) => {
    return setPageState((old) => ({ ...old, [e.target.name]: e.target.value }));
  };

  //   setData({
  //     OID: '',
  //     CUS: '',
  //     CID: null,
  //     customer_email: '',
  //     customer_mobile: '',
  //     customer_name: '',
  //     shipping: '',
  //     product_array: [],
  //     quantity: [],
  //     subTotal: 0,
  //     discount: 0,
  //     total: 0,
  //     status: 'processing',
  //     city: '',
  //     state: '',
  //     paid: 0,
  //     note: ''
  //   })
  //   setActiveStep(0)
  //   setValue(0)
  // }

  // data grid for data view
  function DataGridView(columns, height) {
    return (
      <div style={{ height: height, width: "100%" }}>
        <DataGrid
          filterModel={{
            items: [
              {
                columnField: "order_time",
                operatorValue: "contains",
                value: `${pageState.date}`,
              },
            ],
          }}
          rows={pageState.data}
          rowCount={pageState.total}
          loading={pageState.isLoading}
          rowsPerPageOptions={[10, 30, 50, 70, 100]}
          pagination
          pageSize={pageState.limit}
          page={pageState.page - 1}
          limit={pageState.limit}
          paginationMode="server"
          onPageChange={(newPage) => {
            setPageState((old) => ({ ...old, page: newPage + 1 }));
          }}
          onPageSizeChange={(newPageSize) =>
            setPageState((old) => ({ ...old, limit: newPageSize }))
          }
          columns={columns}
        />
      </div>
    );
  }

  return (
    <Box sx={{ pl: 4, pr: 4 }}>
      <Typography component={"span"} sx={{ display: "block" }} variant="h5">
        Abandoned Orders
      </Typography>
      <br></br>

      {/* Section 1  */}

      <Grid
        container
        p={2}
        sx={{
          boxShadow: 1,
          borderRadius: 2,
          alignItems: "center !important",
          gap: "10px",
        }}
      >
        <Grid xs={12} md={2.5}>
          <TextField
            size="small"
            fullWidth
            id="demo-helper-text-aligned-no-helper"
            type="text"
            placeholder="ex xxx-xxx-xxx"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">UUID</InputAdornment>
              ),
            }}
            value={pageState.uuid || ""}
            name="uuid"
            onChange={handleSearch}
          />
        </Grid>
        <Grid xs={12} md={2.5}>
          <TextField
            size="small"
            fullWidth
            id="demo-helper-text-aligned-no-helper"
            type="text"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">Name</InputAdornment>
              ),
            }}
            value={pageState.customer_name || ""}
            name="customer_name"
            onChange={handleSearch}
          />
        </Grid>
        <Grid xs={12} md={2.5}>
          <TextField
            size="small"
            fullWidth
            // autoComplete={false}
            id="demo-helper-text-aligned-no-helper"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">Email</InputAdornment>
              ),
            }}
            value={pageState.customer_email || ""}
            name="customer_email"
            type="email"
            onChange={handleSearch}
          />
        </Grid>
        <Grid xs={12} md={2.5}>
          <TextField
            size="small"
            fullWidth
            // autoComplete={false}
            value={pageState.date}
            id="demo-helper-text-aligned-no-helper"
            type="date"
            name="date"
            onChange={handleSearch}
          />
        </Grid>

        <Grid
          xs={12}
          md={1.5}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: "5px",
          }}
        >
          <Button
            color="primary"
            fullWidth
            variant="contained"
            onClick={() => {
              setPageState((old) => ({ ...old, filter: !old.filter }));
            }}
          >
            <FilterAltIcon />
          </Button>
          <Button
            color="primary"
            fullWidth
            variant="outlined"
            onClick={clearFilter}
          >
            <FilterAltOffIcon />
          </Button>
        </Grid>
      </Grid>

      {/* Section 1 ends  */}
      <br></br>

      {/* data grid & create order  */}

      <Grid
        container
        scaping={2}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItem: "center",
        }}
      >
        <Grid
          item
          p={2}
          xs={12}
          sx={{ boxShadow: 1, borderRadius: 5, maxHeight: 500 }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography component={"span"} variant="h6">
              {" "}
              Order List{" "}
            </Typography>
            {/* <Button
              onClick={() => {
               dispatch({type : OpenBox,payload : { state: true, formType: "add_order" }});
              }}
              color="primary"
              variant="contained"
            >
              Show Custom Order
            </Button> */}
          </div>
          <></>
          <br></br>
          {DataGridView(columns, 400)}
        </Grid>
      </Grid>

      {/* data grid ends  */}
    </Box>
  );
}
