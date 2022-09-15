import React, { useState, useContext, useEffect } from "react";
import {
  Typography,
  TextField,
  Grid,
  InputAdornment,
  IconButton,
  MenuItem,
  Button,
  Stepper,
  StepLabel, Autocomplete,
  Step,
  Box,
  Select,
  Checkbox,
  ListItemText,
  InputLabel,
  Modal,
  Backdrop,
  Fade
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

import { customerCatalog, getPresentSKUs, getLastOrder, addOrder } from '../../services/service'

// icons 
// import SearchIcon from '@mui/icons-material/Search';

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

// modal css
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 2,
};

export default function Order() {

  // states 
  const [search, setSearch] = useState({
    customer_email: undefined,
    OID: undefined,
    date: '',
    customer: '',

  });
  const [Row, setRows] = useState([]);
  const [productRow, setproductRows] = useState([]);

  const [catalogs, setCatalogs] = useState({
    customer: [],
    products: []
  })

  // state for data 
  const [data, setData] = useState({
    OID : '',
    CID : null,
    customer_email: '',
    customer_mobile: '',
    customer_name: '',
    shipping: '',
    product_array: [],
    quantity: [],
    subTotal : 0,
    discount : 0,
    total : 0,
    status : 'processing',
    city : '',
    state : '',
    paid : 0
  })

  //  State for stepper
  const [activeStep, setActiveStep] = useState(0);


  // context
  const SideBox = useContext(OpenBox);
  const despatchAlert = useContext(Notify);


  // stepper button
  const handleNextStep = () => {
    setActiveStep(activeStep + 1);
  };

  // stepper button
  const handleBackStep = () => {
    setActiveStep(activeStep - 1);
  };

  // step label
  const steps = ['Select Customer', 'Select Product', 'Receipt'];


  // catalog reload 
  useEffect(() => {

    getOID()

    
    customerCatalog()
    .then( async (cus) => {
      console.log(cus)

      getPresentSKUs().then((res) => {
        console.log(res)
        setCatalogs({
          ...catalogs,
         customer: cus.data,
          products: res.data
        })
      });
    })

  


  }, [])


  // order filter
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
              OID : row.OID,
              order_time : row.order_time,
              status : row.status,
              CID : row.CID,
              customer_name : row.customer_name,
              customer_email : row.customer_email,
              customer_mobile : row.customer_mobile,
              city : row.city,
              state : row.state,
              shipping : row.shipping,
              quantity : row.quantity,
              discount : row.discount,
              paid:
                parseInt((row.paid / row.total) * 100) + "%",
              total : row.total,
              action: row._id,
            };
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, [search]);

  // for product data row 
  useEffect(() => {

    const rows = catalogs.products.filter((row) => { console.log(data.product_array.includes(row.SKU)); return data.product_array.includes(row.SKU) && row })
    console.log(data.product_array)
    console.log(rows)


    setproductRows(rows.map((dataOBJ, index) => {

        setData({ ...data, quantity: { ...data.quantity, [dataOBJ.SKU]: 1 }})

        return {
          id: index + 1,
          SKU: dataOBJ.SKU,
          product_title: dataOBJ.product_title,
          product_image: dataOBJ.featured_image,
          dimension: dataOBJ.length_main + 'X' + dataOBJ.breadth + 'X' + dataOBJ.height,
          MRP: dataOBJ.MRP,
          qty: data.quantity[dataOBJ.SKU] ? data.quantity[dataOBJ.SKU] : 1,
          selling_price: dataOBJ.selling_price,
          discount_limit: dataOBJ.discount_limit,
          range: dataOBJ.range,
        }
      }))

  }, [data.product_array])


  // for calculating subtotal
  const calSubtotal = ()=>{
    
    let val = 0;
    productRow.map((row)=>{
      return val += row.selling_price * data.quantity[row.SKU]
    })
      return val
  }

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

// create order  col
  const product_columns = [
    {
      field: "id",
      headerName: "ID",
      width: 20
    },
    {
      field: "qty",
      renderHeader: () => <strong>{"Quantity"}</strong>,
      width: 80,
      renderCell: (params) => (
        <Grid container className="qtyButtons">
          <Grid item xs={12}>
            <TextField
              value={data.quantity[params.row.SKU]}
              type='Number'
              size="small"
              onChange={(e) => setData({ ...data, quantity: { ...data.quantity, [params.row.SKU]: parseInt(e.target.value) } })}
            />

          </Grid>
        </Grid>
      ),
    },
    {
      field: "SKU",
      headerName: "SKU",
      width: 100
    },
    {
      field: 'product_image',
      align: 'center',
      headerName: 'Image',
      width: 200,
      renderCell: (params) => <div className="categoryImage" >{params.formattedValue !== "undefined" ? <img src={params.formattedValue} alt='category' /> : "Image Not Give"}</div>,
    },
    {
      field: "product_title",
      headerName: "Product Title",
      width: 200,
    },

    {
      field: "MRP",
      headerName: "MRP",
      width: 200,
    },

    {
      field: "selling_price",
      headerName: "Selling price",
      width: 200,
    },
    {
      field: "dimension",
      headerName: "Dimension",
      width: 200,
    },
   


  ];

// status update 
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

  // get OID
    // function for generating product OID ID

    const getOID = () => {
      getLastOrder()
        .then((res) => {
          if (res.data.length > 0) {
            let index = parseInt(res.data[0].OID.split("-")[1]) + 1;
  
            setData({...data,OID : `OID-0${index}`});
          } else {
            setData({...data,OID : "OID-01001"});

          }
        })
        .catch((err) => {
          // console.log(err);
        });
    };

  const handelSearch = (e) => {
    setSearch({
      ...search,
      [e.target.name]: e.target.value || undefined,
    });
  };

  // data grid for data view
  function DataGridView(Row, columns, height) {
    return (
      <div style={{ height: height, width: "100%" }}>
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

  // for handling the form data

  const handelData = (e) => {
    if (e.target.name !== 'discount')
    setData({ ...data, [e.target.name]: e.target.value })
    else{
    setData({ ...data, [e.target.name]: e.target.value,subTotal : calSubtotal() , total : data.subTotal-(calSubtotal()/100*e.target.value) })
    }

  }

  // this function will the all customer detail respective to the search 
  const handleAutoFillCustomer = (e) => {

    const number = parseInt(e.split(' - ')[1])

    const row = catalogs.customer.filter((row) => { return row.mobile === number && row })[0]
    // console.log(row, number)

    setData({
      ...data,
      customer_email: row.email,
      customer_mobile: row.mobile,
      customer_name: row.username,
      shipping: row.shipping,
      city: row.city,
      state: row.state,
      CID: row.CID,

    })

  }

  // custom modal
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  // custom product submit
  const handleCustomProduct = (e)=>{
    e.preventDefault();

    console.log('i am in ')
    console.log(productRow)

    setData({ ...data, quantity: { ...data.quantity, [e.target.SKU.value]: e.target.quantity.value } })

    setproductRows(
      [...productRow,{ id : productRow.length+1,
      SKU : e.target.SKU.value, 
      product_title : e.target.product_title.value, 
      dimension : e.target.dimension.value, 
      MRP : e.target.MRP.value, 
      qty : e.target.quantity.value, 
      selling_price : e.target.MRP.value - ((e.target.MRP.value/100)*e.target.discount.value), 
      discount_limit : e.target.discount.value, 
      }])

      handleClose();
  }


  
// custom product model
  function CustomProduct() {

    return (
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <Grid container >
                <Grid item xs={12} sx = {{mb : 2}}><Typography id="transition-modal-title" variant="h6" component="h2">
                  Create Product
                </Typography></Grid>
                <Grid item xs={12} sx = {{pb : 2}}>
                  <form enctype="multipart/form-data"
                    method="get" onSubmit = {handleCustomProduct}>
                   <TextField size = 'small' sx = {{mb : 2}} fullWidth
                    name = 'SKU'
                    type = 'text'
                    label = 'Custom SKU'
                    variant = 'outlined'
                    />
                   <TextField size = 'small' sx = {{mb : 2}} fullWidth
                    name = 'product_title'
                    type = 'text'
                    label = 'Title'
                    variant = 'outlined'
                    />
                   
                   <TextField size = 'small' sx = {{mb : 2}} fullWidth
                    name = 'dimension'
                    type = 'text'
                    label = 'Dimension ex :- lxbxh'
                    variant = 'outlined'
                    />
                    <TextField size = 'small' sx = {{mb : 2}} fullWidth
                    name = 'quantity'
                    type = 'number'
                    label = 'Quantity'
                    variant = 'outlined'
                    />
                    <TextField size = 'small' sx = {{mb : 2}} fullWidth
                    name = 'MRP'
                    type = 'number'
                    label = 'MRP'
                    variant = 'outlined'
                    />
                    <TextField size = 'small' sx = {{mb : 2}} fullWidth
                    name = 'discount'
                    type = 'number'
                    label = 'Discount'
                    variant = 'outlined'
                    />
                    <Button size = 'small' fullWidth variant = 'contained' type = 'submit'>Add</Button>
                  </form>
                </Grid>
              </Grid>
            </Box>
          </Fade>
        </Modal>
      </div>
    );
  }

  function handleSubmit(){
   const res =  addOrder(data)
    res
      .then((data) => {
        if (data.status !== 200) {

          despatchAlert.setNote({
            open: true,
            variant: "error",
            message: data.data.message || "Something Went Wrong !!!",
          });
        } else {
          despatchAlert.setNote({
            open: true,
            variant: "success",
            message: data.data.message,
          });
        }
      })
      .catch((err) => {
        despatchAlert.setNote({
          open: true,
          variant: "error",
          message: "Something Went Wrong !!!",
        });
      });
  }

  return (
    <>
      <Typography sx={{ display: "block" }} variant="h5">
        Order
      </Typography>
      {CustomProduct()}

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


      </Grid>

      {/* Section 1 ends  */}
      <br></br>

      {/* data grid & create order  */}

      <Grid container scaping={2} sx={{
        display: 'flex', justifyContent: 'space-between', alignItem: 'center'
      }}>
        <Grid item p={2} xs={12} md={6} sx={{ boxShadow: 1, borderRadius: 5, maxHeight: 500 }}>
          <div style={
            {
              display: 'flex',
              justifyContent: 'space-between',
            }
          } >

            <Typography variant="h6"> Order List </Typography>
            <Button
              onClick={() => {
                SideBox.setOpen({ state: true, formType: "add_order" });
              }}
              color="primary"
              variant="contained"
            >
              <AddIcon />

            </Button>
          </div>
          <></>
          <br></br>
          {DataGridView(Row, columns, 400)}
        </Grid>

        {/* create order  */}
        <Grid item p={2} xs={12} md={5.9} sx={{ boxShadow: 1, borderRadius: 5 }}>
          <Typography variant="h6"> Create Order </Typography>

          <Grid container className='orderSteps' sx={{ boxShadow: 1, borderRadius: 5, mt: 2, p: 2, }}>
            <Grid item xs={12}  >
              <form method = 'post' on submit = {handleSubmit} >
              <Stepper
                className="stepper"
                activeStep={activeStep}
              >
                {
                  steps.map((step, index) => { return <Step key={index}><StepLabel>{step}</StepLabel></Step> })
                }
              </Stepper>

              {/* // Select Customer */}

              {activeStep === 0 &&
                <Box sx={{
                  p: 2.5,
                }}>

                  <Autocomplete
                    id="free-solo-demo"
                    freeSolo
                    onChange={(event, val) => handleAutoFillCustomer(val)}
                    options={catalogs.customer.map((option) => option.username + ' - ' + option.mobile)}
                    renderInput={(params) => <TextField {...params}
                      name='customer'
                      size={'small'}
                      label="Select Customer..."
                    />
                    }
                  />
                  <br></br>

                  <TextField sx={{ pb: 2 }}
                    size="small"
                    fullWidth
                    required
                    id="outlined-select"
                    name="customer_name"
                    value={data.customer_name || ''}
                    onChange={handelData}
                    label="Customer Name"
                    type="text"
                  />

                  <TextField sx={{ pb: 2 }}
                    size="small"
                    fullWidth
                    required
                    id="outlined-select"
                    value={data.customer_email || ''}
                    onChange={handelData}
                    name="customer_email"
                    label="Customer Email"
                    type="email"
                  />

                  <TextField sx={{ pb: 2 }}
                    size="small"
                    fullWidth
                    required
                    id="outlined-select"
                    name="customer_mobile"
                    value={data.customer_mobile || ''}
                    onChange={handelData}
                    label="Contact Number"
                    type="number"
                  />

                  <TextField sx={{ pb: 2 }}
                    size="small"
                    fullWidth
                    required
                    id="outlined-select"
                    name="city"
                    value={data.city || ''}
                    onChange={handelData}
                    label="City"
                    type="text"
                  />

                  <TextField sx={{ pb: 2 }}
                    size="small"
                    fullWidth
                    required
                    id="outlined-select"
                    name="state"
                    value={data.state || ''}
                    onChange={handelData}
                    label="State"
                    type="text"
                  />


                  <TextField
                    size="small"
                    fullWidth
                    required
                    id="outlined-select"
                    name="shipping"
                    value={data.shipping || ''}
                    onChange={handelData}
                    label="Shipping"
                    type="text"
                  />


                </Box>
              }
              {/* // Select Customer ends */}

              {/* // Select product */}
              {activeStep === 1 && <Box sx={{
                p: 2.5,
              }}>
                <InputLabel sx={{ mb: 2 }} id="demo-multiple-checkbox-label">
                  Select Product
                </InputLabel>
                <Select
                  multiple
                  sx={{ mb: 2 }}
                  fullWidth
                  value={data.product_array}
                  size='small'
                  name="product_array"
                  onChange={handelData}
                  renderValue={(selected) => selected.join(", ")}
                >
                  {catalogs.products.map((option) => (
                    <MenuItem key={option._id} value={option.SKU}>
                      <Checkbox
                        checked={
                          data.product_array.indexOf(option.SKU) > -1
                        }
                      />
                      <ListItemText primary={option.SKU} />
                    </MenuItem>
                  ))}
                </Select>
                <div style={
                  {
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '10px'
                  }
                } >
                  <InputLabel sx={{ mb: 1 }} id="demo-multiple-checkbox-label">
                    Product List
                  </InputLabel>
                  <Button size='small' onClick={() => setOpen(true)} variant={'outlined'}>Custom Product </Button>
                </div>
                {/* <br></br> */}


                {DataGridView(productRow, product_columns, 300)}


              </Box>
              }
              {/* // Select products ends */}

              {/* // Preview receipt */}
              {activeStep === 2 && <Box sx={{
                p: 2.5,
              }}>
                
                <Grid container >
                  <Grid item xs= {12}>
                  <TextField fullWidth sx = {{mb :2}} size = 'small' disabled label = 'OID' value = {data.OID} ></TextField>
                  </Grid>
                 
                  <Grid item xs= {12}>
                  <TextField fullWidth sx = {{mb :2}} size = 'small'  disabled label = 'CID' value = {data.CID} ></TextField>
                  </Grid>
                 
                  <Grid item xs= {12}>
                  <TextField fullWidth sx = {{mb :2}} size = 'small'  disabled label = 'Subtotal' value = {calSubtotal()} ></TextField>
                  </Grid>

                  <Grid item xs = {12}>
                  <TextField fullWidth sx = {{mb :2}} label = 'Discount' type = 'number' size = 'small' value = {data.discount} name = 'discount' onChange= {handelData}/> 
                  </Grid>

                  <Grid item xs = {12}>
                  <TextField fullWidth sx = {{mb :2}} label = 'Paid' type = 'number' size = 'small' value = {data.paid} name = 'paid' onChange= {handelData}/> 
                  </Grid>

                  <Grid item xs = {12}>
                  <TextField disabled fullWidth label = 'Total' type = 'number' size = 'small' value = {data.total !== 0 ? data.total : calSubtotal()} /> 
                  </Grid>
                  
                </Grid>
              </Box>
              }
              {/* // Preview receipt ends */}

              {/* // controlled button */}
              <Box sx={{ display: 'flex', p: 2, pb: 0, justifyContent: 'space-between', alignItem: 'center' }}>
                <Button
                  variant="outlined"
                  size="small"
                  disabled={activeStep === 0}
                  onClick={handleBackStep}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  onClick={activeStep === 2 ? handleSubmit : handleNextStep}

                >
                  {activeStep === 2 ? 'Save' : 'Continue'}
                </Button>
              </Box>
              </form>
            </Grid>
          </Grid>

        </Grid>
      </Grid>

      {/* data grid ends  */}
    </>
  );
}
