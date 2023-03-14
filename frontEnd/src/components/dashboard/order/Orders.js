import React, { useState, useMemo, useEffect } from "react";
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
  Fade,
  Modal,
  Backdrop,
  Tooltip,
  Divider,
} from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";

import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { setAlert } from "../../../store/action/action";
import {
  getOrder,
  changeOrderStatus,
  deleteOrder,
  getOrderDetails,
} from "../../../services/service";
import "../../../assets/custom/css/category.css";

import { DataGrid } from "@mui/x-data-grid";
// import {  RemoveRedEyeIcon } from "@mui/icons-material";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Stack } from "@mui/system";
// modal css
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  maxHeight: 500,
  overflowY: 'scroll',
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
};

const detailsObj = {
  personal: [
    'CID', 'customer_name', 'customer_email', 'customer_mobile', 'city'
    , 'state', 'shipping', 'billing', 'GST', 'has_GST', 'classification', 'customer_type'
  ],
  order: [
    'O',
    'sales_person',
    'status',
    'sale_channel',
    'order_time',
    'note'

  ],
  customizations: [
    'SKU',
    'cusPolish',
    'design',
    'polish_images',
    'design_images',
    'polish_note',
    'design_note'
  ],
  product: [
    'quantity'
  ],
  payment: [
    'paid',
    'total',
    'pay_method_remaining',
    'pay_method_advance',
    'pay_method_advance',
  ],
  fulfillment: [
    'fulfilled',
    'courier_company',
    'inventory_location',
    'AWB',
    'pic_before_dispatch',
  ]
}

export default function Order() {
  // context
  const dispatch = useDispatch();
  const [pageState, setPageState] = useState({
    data: [],
    isLoading: false,
    page: 1,
    limit: 10,
    total: 0,
    O: undefined,
    customer_name: undefined,
    customer_email: undefined,
    date: "",
    filter: false,
  });

  const [preview, setPreview] = useState({ open: false, _id: undefined })

  async function fetchData() {
    setPageState((lastState) => ({
      ...lastState,
      isLoading: true,
    }));
    getOrder({
      page: pageState.page,
      limit: pageState.limit,
      total: pageState.total,
      O: pageState.O,
      customer_name: pageState.customer_name,
      customer_email: pageState.customer_email,
    })
      .then((data) => {
        setPageState((lastState) => ({
          ...lastState,
          data: data.data.data.map((row, index) => {
            return {
              id: index + 1,
              O: row.O,
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
              paid: row.paid,
              total: row.total,
              note: row.note || "",
              action: row._id
            };
          }),
          isLoading: false,
          total: data.data.total,
          filter: false,
        }));
      })
      .catch((err) => { });
  }

  useMemo(() => {
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
          fullWidth
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
      field: "O",
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

    {
      field: "action",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <div className="categoryImage">
          <Tooltip title='preview'>

            <IconButton
              onClick={() => {
                setPreview(old => ({ open: true, _id: params.formattedValue }))
              }}
              aria-label="delete"
            >
              <RemoveRedEyeIcon />
            </IconButton>
          </Tooltip>

          {/* <IconButton
            onClick={() => {
              dispatch(setForm({
                state: true,
                formType: "update_order",
                payload: params,
                row: Row,
                setRow: setRows
              }));
            }}
            aria-label="delete"
          >
            <CreateIcon />
          </IconButton> */}
          {/* <IconButton onClick={() => {
            deleteOrder(params.formattedValue).then((res) => {
              setPageState(old => ({
                ...old, total: old.total - 1,
                data: old.data.filter((set) => {
                  return set.action !== params.formattedValue;
                })
              }));

              dispatch(setAlert({
                open: true,
                variant: 'success',
                message: 'Order Deleted !!!'
              }))
            })
          }} aria-label="delete"  >
            <DeleteIcon />
          </IconButton> */}
        </div>
      ),
    },
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
        Order
      </Typography>
      <br></br>

      {/* Section 1  */}

      <Preview preview={preview} setPreview={setPreview} />

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
            placeholder="ex O-01001"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">O</InputAdornment>
              ),
            }}
            value={pageState.O || ""}
            name="O"
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


function Preview({ preview, setPreview }) {

  let [data, setData] = useState({ order: {}, custom: {} })

  useEffect(() => {
    if(preview._id)
      getData();
  }, [preview.open])

  async function getData() {
    let res = await getOrderDetails(preview._id)
    if (res.status === 200) {
      setData({ order: res.data.data, custom: res.data.custom_product })
    }
  }

  return (<>
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={preview.open}
      onClose={() => setPreview(old => ({ ...old, open: false }))}
      closeAfterTransition
      BackdropComponent={Backdrop}
    >
      <Fade in={preview.open}>
        <Box sx={style}>
          {data && <Grid container sx={{ gap: '1rem' }}>
            <Grid item xs={12} sx={{ textAlign: 'center' }}>
              <Typography variant='h6'>Order Preview</Typography>
            </Grid>
            {/* // Customer Information */}
            <Grid item xs={12}>
              <Typography variant='body1'>Customer Details</Typography>
              <Stack>
                {detailsObj['personal'].map((field, index) => <><Box className='previewBox' key={index}>
                  <Typography variant='body2' >{field}</Typography>
                  <Typography variant='body2' >{data.order[field]}</Typography>
                </Box>
                  <Divider />
                </>
                )}
              </Stack>
            </Grid>
            {/* // Order Information */}
            <Grid item xs={12}>
              <Typography variant='body1'>Order Details</Typography>
              <Stack>
                {detailsObj['order'].map((field, index) => <><Box className='previewBox' key={index}>
                  <Typography variant='body2' >{field}</Typography>
                  <Typography variant='body2' >{data.order[field]}</Typography>
                </Box>
                  <Divider />
                </>
                )}
              </Stack>
            </Grid>
            {/* // Fulfillment Information */}
            <Grid item xs={12}>
              <Typography variant='body1'>Fulfillment Details</Typography>
              <Stack>
                {detailsObj['fulfillment'].map((field, index) => <><Box className='previewBox' key={index}>
                  <Typography variant='body2' >{field}</Typography>
                  <Typography variant='body2' >{data.order[field]}</Typography>
                </Box>
                  <Divider />
                </>
                )}
              </Stack>
            </Grid>
            {/* // SKUs Information */}
            <Grid item xs={12}>
              <Typography variant='body1'>SKU Details</Typography>
              <Stack>
                {data.order['quantity'] && Object.keys(data.order['quantity']).map((field, index) => <><Box className='previewBox' key={index}>
                  <Typography variant='body2' >{field}</Typography>
                  <Typography variant='body2' >{data.order['quantity'][field]}</Typography>
                </Box>
                  <Divider />
                </>
                )}
              </Stack>
            </Grid>
            {/* // Customization  */}
            <Grid item xs={12}>
              <Typography variant='body1'>Customization Details</Typography>
              <Stack>
                {data.order['customizations'] && data.order['customizations'].map((field, index) => <>
                  {detailsObj.customizations.map((sub, index) =>
                    <Box className='previewBox' key={index}>
                      <Typography variant='caption' >{sub}</Typography>
                      {sub === 'polish_images' || sub === 'design_images' ?
                        field[sub].length > 0 && field[sub].map((img, index) => <img width='50px' src={img} alt={index} ></img>)
                        :
                        <Typography variant='caption' >{field[sub]}</Typography>
                      }
                    </Box>
                  )}
                  <Divider />
                </>
                )}
              </Stack>
            </Grid>
            {/* // Payment Information */}
            <Grid item xs={12}>
              <Typography variant='body1'>Payment Details</Typography>
              <Stack>
                {detailsObj['payment'].map((field, index) => <><Box className='previewBox' key={index}>
                  <Typography variant='body2' >{field}</Typography>
                  <Typography variant='body2' >{data.order[field]}</Typography>
                </Box>
                  <Divider />
                </>
                )}
              </Stack>
            </Grid>
          </Grid>}
        </Box>
      </Fade>
    </Modal>
  </>)
}