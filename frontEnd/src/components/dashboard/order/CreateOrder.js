import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import {
  Typography,
  TextField,
  TextareaAutosize,
  Grid,
  MenuItem,
  Button,
  Stepper,
  StepLabel,
  Autocomplete,
  Step,
  Box,
  Select,
  Checkbox,
  ListItemText,
  InputLabel,
  Modal,
  Backdrop,
  Fade,
  Tabs,
  Tab,
  FormLabel,
} from "@mui/material";
// import DeleteIcon from '@mui/icons-material/Delete';
// import CreateIcon from "@mui/icons-material/Create";
// import AddIcon from "@mui/icons-material/Add";
// import { customOrderList} from "../../services/service";
import "../../../assets/custom/css/category.css";
import { useDropzone } from "react-dropzone";
import { useDispatch } from "react-redux";
import { setAlert } from "../../../store/action/action";

import {
  DataGrid,
  // gridPageCountSelector,
  // gridPageSelector,
  // useGridApiContext,
  // useGridSelector,
} from "@mui/x-data-grid";
// import Pagination from "@mui/material/Pagination";

import {
  customerCatalog,
  getPresentSKUs,
  getLastOrder,
  addOrder,
  getLastCp,
  addCustomProduct,
  getArticlesId,
  addDraft,
  getDraftID,
} from "../../../services/service";
import { useConfirm } from "material-ui-confirm";
import { Editor } from "@tinymce/tinymce-react";

// style for drop box in custom
const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};

// modal css
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  maxHeight: 500,
  overflow: "scroll",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function CreateOrder() {
  const editorRef = useRef();
  const [value, setValue] = useState(0);
  const [productRow, setProductRows] = useState([]);

  const [SKU, setSKU] = useState("");

  // confirm box

  const confirm = useConfirm();

  // confirmBox
  const confirmBox = (e) => {
    e.preventDefault();

    confirm({ description: `Data will listed in Database !!!` })
      .then(() => handleSubmit(e))
      .catch((err) => {
        console.log("Operation cancelled.");
      });
  };

  // multiple images
  const [files, setFiles] = useState([]);

  const [catalogs, setCatalogs] = useState({
    customer: [],
    product: [],
    address: [],
    channel: [
      {
        key: "3rd Party Vendor",
        value: "3rd Party Vendor",
      },
      {
        key: "Amazon",
        value: "Amazon",
      },
      {
        key: "Bengaluru Showroom",
        value: "Bengaluru Showroom",
      },
      {
        key: "Etsy",
        value: "Etsy",
      },
      {
        key: "Flipkart",
        value: "Flipkart",
      },
      {
        key: "Jodhpur Showroom",
        value: "Jodhpur Showroom",
      },
      {
        key: "JioMart",
        value: "JioMart",
      },
      {
        key: "Meesho",
        value: "Meesho",
      },
      {
        key: "Online",
        value: "Online",
      },
      {
        key: "Others",
        value: "Others",
      },
    ],
  });

  // for dynamic product SKUs
  const handleSearch = async (e) => {
    const delayDebounceFn = setTimeout(() => {
      getPresentSKUs(e.target.value).then((res) => {
        console.log(res.data);
        setCatalogs((old) => ({ ...old, product: res.data }));
      }, 1000);
      return () => clearTimeout(delayDebounceFn);
    });
  };

  // state for data
  const [data, setData] = useState({
    O: "",
    CUS: "",
    CID: null,
    customer_email: "",
    customer_mobile: "",
    customer_name: "",
    shipping: "",
    billing: "",
    product_array: [],
    quantity: [],
    subTotal: 0,
    discount: 0,
    total: 0,
    status: "processing",
    city: "",
    state: "",
    paid: 0,
    note: "",
    custom_order: true,
    sale_channel: "Online",
    PO: "",
  });

  //  State for stepper
  const [activeStep, setActiveStep] = useState(0);

  // tab
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // context
  const dispatch = useDispatch();
  const [pageSize, setPageSize] = useState(50);

  // stepper button
  const handleNextStep = () => {
    setActiveStep(activeStep + 1);
  };

  // stepper button
  const handleBackStep = () => {
    setActiveStep(activeStep - 1);
  };

  // step label
  const steps = ["Select Customer", "Select Product", "Receipt"];

  // catalog reload
  useEffect(() => {
    customerCatalog().then(async (cus) => {
      setCatalogs({
        ...catalogs,
        customer: cus.data,
      });
      getDID();
    });
  }, []);

  // order filter
  // useEffect(() => {
  //     customOrderList()
  //         .then((data) => {
  //             let final = [];

  //             data.data.map((row) => {
  //                 if (search.O !== undefined) {
  //                     if (row.O === `O-${search.O}`) final.push(row);
  //                 } else if (search.customer_email !== undefined) {
  //                     if (row.customer_email === search.customer_email) final.push(row);
  //                 } else final.push(row);
  //             });

  //             setRows(
  //                 final.map((row, index) => {
  //                     return {
  //                         id: index + 1,
  //                         O: row.O,
  //                         order_time: row.order_time,
  //                         status: row.status,
  //                         CID: row.CID,
  //                         customer_name: row.customer_name,
  //                         customer_email: row.customer_email,
  //                         customer_mobile: row.customer_mobile,
  //                         city: row.city,
  //                         state: row.state,
  //                         shipping: row.shipping,
  //                         quantity: JSON.stringify(row.quantity),
  //                         discount: row.discount,
  //                         paid:
  //                             parseInt((row.paid / row.total) * 100) + "%",
  //                         total: row.total,
  //                         note: row.note || '',
  //                         action: row._id,
  //                     };
  //                 })
  //             );
  //         })
  //         .catch((err) => {
  //             //console.log(err);
  //         });
  // }, [search]);

  // for product data row
  useEffect(() => {
    const rows = catalogs.product.filter((row) => {
      return data.product_array.includes(row.SKU) && row;
    });

    setProductRows(
      rows.map((dataOBJ, index) => {
        setData({ ...data, quantity: { ...data.quantity, [dataOBJ.SKU]: 1 } });

        return {
          id: index + 1,
          SKU: dataOBJ.SKU,
          product_title: dataOBJ.product_title,
          product_image: dataOBJ.featured_image,
          dimension:
            dataOBJ.length_main + "X" + dataOBJ.breadth + "X" + dataOBJ.height,
          MRP: dataOBJ.MRP,
          qty: data.quantity[dataOBJ.SKU] ? data.quantity[dataOBJ.SKU] : 1,
          selling_price: dataOBJ.selling_price,
          discount_limit: dataOBJ.discount_limit,
          range: dataOBJ.range,
        };
      })
    );
  }, [data.product_array]);

  // for image drop
  function ProductsPreviews(props) {
    const { getRootProps, getInputProps } = useDropzone({
      accept: "image/*",
      multiple: true,
      onDrop: (acceptedFiles) => {
        setFiles(
          acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          )
        );
      },
    });

    const thumbs = files.map((file) => (
      <div style={thumb} key={file.name}>
        <div style={thumbInner}>
          <img
            src={file.preview}
            style={img}
            alt="Images"
            // Revoke data uri after image is loaded
            onLoad={() => {
              URL.revokeObjectURL(file.preview);
            }}
          />
        </div>
      </div>
    ));

    useEffect(() => {
      // Make sure to revoke the data uris to avO memory leaks, will run on unmount
      return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
    }, []);

    return (
      <section className="container dorpContainer">
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <p>{props.text}</p>
        </div>
        <aside style={thumbsContainer}>{thumbs}</aside>
      </section>
    );
  }

  // for calculating subtotal
  const calSubtotal = () => {
    let val = 0;
    productRow.map((row) => {
      return (val += row.selling_price * data.quantity[row.SKU]);
    });
    return val;
  };

  // create order  col
  const product_columns = [
    {
      field: "id",
      headerName: "ID",
      width: 20,
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
              type="Number"
              size="small"
              onChange={(e) =>
                setData({
                  ...data,
                  quantity: {
                    ...data.quantity,
                    [params.row.SKU]: parseInt(e.target.value),
                  },
                })
              }
            />
          </Grid>
        </Grid>
      ),
    },
    {
      field: "SKU",
      headerName: "SKU",
      width: 100,
    },
    {
      field: "product_image",
      align: "center",
      headerName: "Image",
      width: 200,
      renderCell: (params) => (
        <div className="categoryImage">
          {params.formattedValue !== "undefined" ? (
            <img src={params.formattedValue} alt="category" />
          ) : (
            "Image Not Give"
          )}
        </div>
      ),
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

  const resetValue = () => {
    setData({
      O: "",
      CUS: "",
      CID: null,
      customer_email: "",
      customer_mobile: "",
      customer_name: "",
      shipping: "",
      product_array: [],
      quantity: [],
      subTotal: 0,
      discount: 0,
      total: 0,
      status: "processing",
      city: "",
      state: "",
      paid: 0,
      note: "",
      sale_channel: "Online",
    });
    setActiveStep(0);
    setValue(0);
  };

  // data grid for data view
  function DataGridView(Row, columns, height) {
    return (
      <div style={{ height: height, width: "100%" }}>
        <DataGrid
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

  // for handling the form data

  const handelData = (e) => {
    console.log(e.target.name);
    if (e.target.name === "shipping" && catalogs.address.length > 0) {
      const row = catalogs.address.filter((data) => {
        return data.address === e.target.value;
      });
      console.log(row);
      setData({
        ...data,
        [e.target.name]: e.target.value,
        city: row[0].city,
        state: row[0].state,
      });
    } else if (e.target.name !== "discount")
      setData({ ...data, [e.target.name]: e.target.value });
    else {
      setData({
        ...data,
        [e.target.name]: e.target.value,
        subTotal: calSubtotal(),
        total: data.subTotal - (calSubtotal() / 100) * e.target.value,
      });
    }
  };

  // this function will the all customer detail respective to the search
  const handleAutoFillCustomer = (e) => {
    const number = parseInt(e.split(" - ")[1]);

    const row = catalogs.customer.filter((row) => {
      return row.mobile === number && row;
    })[0];

    setCatalogs({
      ...catalogs,
      address: row.address,
    });

    setData({
      ...data,
      customer_email: row.email,
      customer_mobile: row.mobile,
      customer_name: row.username,
      city: row.city,
      state: row.state,
      CID: row.CID,
    });
  };

  // custom modal
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setFiles([]);
    setOpen(false);
  };

  // customer id
  const getCUS = async () => {
    await getLastCp()
      .then((res) => {
        if (res.data.length > 0) {
          let index = parseInt(res.data[0].CUS.split("-")[1]) + 1;

          setData({ ...data, CUS: `CUS-0${index}` });
        } else {
          setData({ ...data, CUS: "CUS-01001" });
        }
      })
      .catch((err) => {
        // //console.log(err);
      });
  };

  // DID
  const getDID = () => {
    getDraftID()
      .then((res) => {
        if (res.data.length > 0) {
          let index = parseInt(res.data[0].DID.split("-")[1]) + 1;

          setSKU(`DID-0${index}`);
        } else {
          setSKU("DID-01001");
        }
      })
      .catch((err) => {
        // //console.log(err);
      });
  };

  // custom product submit
  const handleCustomProduct = async (e) => {
    e.preventDefault();

    const FD = new FormData();

    files.map((element) => {
      return FD.append("product_image", element);
    });

    FD.append("CUS", e.target.CUS.value);
    FD.append("product_title", e.target.product_title.value);
    FD.append("length", e.target.length.value);
    FD.append("height", e.target.height.value);
    FD.append("breadth", e.target.breadth.value);
    FD.append("selling_price", e.target.selling_price.value);
    FD.append("MRP", e.target.MRP.value);
    FD.append("discount", e.target.discount.value);
    FD.append("polish_time", e.target.polish_time.value);
    FD.append("note", e.target.note.value);

    let response = await addCustomProduct(FD);

    setData({
      ...data,
      quantity: {
        ...data.quantity,
        [e.target.CUS.value]: e.target.quantity.value,
      },
    });
    console.log(response);
    setProductRows([
      ...productRow,
      {
        id: productRow.length + 1,
        SKU: response.data.data.CUS,
        product_title: response.data.data.product_title,
        product_image:
          response.data.data.product_image.length > 0
            ? response.data.data.product_image[0]
            : "",
        dimension:
          response.data.data.length +
          "x" +
          response.data.data.breadth +
          "x" +
          response.data.data.height,
        MRP: response.data.data.MRP,
        qty: response.data.data.quantity,
        selling_price:
          response.data.data.MRP -
          (response.data.data.MRP / 100) * response.data.data.discount,
        discount_limit: response.data.data.discount,
      },
    ]);

    setFiles([]);

    handleClose();
  };

  // custom product model
  function CustomProduct() {
    useEffect(() => {
      getCUS();
    }, [open]);

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
              <Grid container>
                <Grid item xs={12} sx={{ mb: 2 }}>
                  <Typography
                    component={"span"}
                    id="transition-modal-title"
                    variant="h6"
                  >
                    Create Product
                  </Typography>
                </Grid>
                <Grid item xs={12} sx={{ pb: 2 }}>
                  <form
                    enctype="multipart/form-data"
                    method="get"
                    onSubmit={handleCustomProduct}
                  >
                    {/* <FormLabel id="demo-radio-buttons-group-label">
                              Product Images
                            </FormLabel> */}
                    <ProductsPreviews
                      text={"Please Drag and Drop the product images"}
                    ></ProductsPreviews>

                    <TextField
                      size="small"
                      sx={{ mb: 2 }}
                      fullWidth
                      name="CUS"
                      disabled
                      value={data.CUS}
                      type="text"
                      label="Custom SKU"
                      variant="outlined"
                    />
                    <TextField
                      size="small"
                      sx={{ mb: 2 }}
                      fullWidth
                      name="product_title"
                      type="text"
                      label="Title"
                      variant="outlined"
                    />

                    <TextField
                      size="small"
                      sx={{ mb: 2 }}
                      fullWidth
                      name="length"
                      type="text"
                      label="Length"
                      variant="outlined"
                    />

                    <TextField
                      size="small"
                      sx={{ mb: 2 }}
                      fullWidth
                      name="breadth"
                      type="text"
                      label="Breadth"
                      variant="outlined"
                    />

                    <TextField
                      size="small"
                      sx={{ mb: 2 }}
                      fullWidth
                      name="height"
                      type="text"
                      label="Height"
                      variant="outlined"
                    />
                    <TextField
                      size="small"
                      sx={{ mb: 2 }}
                      fullWidth
                      name="quantity"
                      type="number"
                      label="Quantity"
                      variant="outlined"
                    />
                    <TextField
                      size="small"
                      sx={{ mb: 2 }}
                      fullWidth
                      name="selling_price"
                      type="number"
                      label="Selling Price"
                      variant="outlined"
                    />
                    <TextField
                      size="small"
                      sx={{ mb: 2 }}
                      fullWidth
                      name="MRP"
                      type="number"
                      label="MRP"
                      variant="outlined"
                    />
                    <TextField
                      size="small"
                      sx={{ mb: 2 }}
                      fullWidth
                      name="discount"
                      type="number"
                      label="Discount"
                      variant="outlined"
                    />

                    <TextField
                      size="small"
                      sx={{ mb: 1 }}
                      fullWidth
                      name="polish_time"
                      type="number"
                      label="Polish Time"
                      variant="outlined"
                      helperText="Polish time in days..."
                    />

                    <TextField
                      size="small"
                      sx={{ mb: 2 }}
                      fullWidth
                      name="note"
                      type="text"
                      label="Note"
                      variant="outlined"
                    />
                    <Button
                      size="small"
                      fullWidth
                      variant="contained"
                      type="submit"
                    >
                      Add
                    </Button>
                  </form>
                </Grid>
              </Grid>
            </Box>
          </Fade>
        </Modal>
      </div>
    );
  }

  async function handleSubmit(e) {
    /// for adding the note

    setData({
      ...data,
      DID: SKU,
      AID: "Not Assigned " + SKU,
      type: "Order",
      operation: "createOrder",
      note: editorRef.current.getContent()
        ? editorRef.current.getContent()
        : "",
    });

    console.log(data);

    const res = await addDraft({
      ...data,
      DID: SKU,
      AID: "Not Assigned " + SKU,
      type: "Order",
      operation: "createOrder",
    });

    try {
      if (res.status !== 200) {
        setData({
          O: "",
          CUS: "",
          CID: null,
          customer_email: "",
          customer_mobile: "",
          customer_name: "",
          shipping: "",
          product_array: [],
          quantity: [],
          subTotal: 0,
          discount: 0,
          total: 0,
          status: "processing",
          city: "",
          state: "",
          paid: 0,
          note: "",
          sale_channel: "Online",
          PO: "",
        });
        dispatch(
          setAlert({
            open: true,
            variant: "error",
            message: res.data.message || "Something Went Wrong !!!",
          })
        );
      } else {
        dispatch(
          setAlert({
            open: true,
            variant: "success",
            message: res.data.message,
          })
        );
        resetValue();
      }
    } catch (err) {
      console.log(err);
      dispatch(
        setAlert({
          open: true,
          variant: "error",
          message: "Something Went Wrong !!!",
        })
      );
    }
  }

  return (
    <Box sx={{ pl: 4, pr: 4 }}>
      <Typography component={"span"} sx={{ display: "block" }} variant="h5">
        Create Order
      </Typography>
      {CustomProduct()}

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
        {/* create order  */}
        <Grid item p={1} xs={12} sx={{ mt: 3 }}>
          {/* <Typography component={'span'} variant="h6"> Create Order </Typography> */}

          <Grid
            container
            className="orderSteps"
            sx={{ boxShadow: 1, borderRadius: 5, mt: 2, p: 2 }}
          >
            <Grid item xs={12}>
              <form method="post" onSubmit={handleSubmit}>
                <Stepper className="stepper" activeStep={activeStep}>
                  {steps.map((step, index) => {
                    return (
                      <Step key={index}>
                        <StepLabel>{step}</StepLabel>
                      </Step>
                    );
                  })}
                </Stepper>

                {/* // Select Customer */}

                {activeStep === 0 && (
                  <Box
                    sx={{
                      pt: 2,
                      flexGrow: 1,
                      bgcolor: "background.paper",
                      display: "flex",
                    }}
                  >
                    <Tabs
                      orientation="vertical"
                      variant="scrollable"
                      value={value}
                      onChange={handleChange}
                      aria-label="Vertical tabs example"
                      sx={{ borderRight: 1, borderColor: "divider" }}
                    >
                      <Tab label="Guest" {...a11yProps(0)} />
                      <Tab label="Existing Customer" {...a11yProps(1)} />
                    </Tabs>

                    {/* // guest customer  */}

                    <TabPanel value={value} index={0}>
                      <Box
                        sx={{
                          p: 2,
                          pt: 0,
                        }}
                      >
                        <Typography component={"span"} variant="h5">
                          Guest
                          <Typography
                            component={"span"}
                            sx={{ display: "block !important" }}
                            variant="caption"
                          >
                            Add guest details and necessary information from
                            here
                          </Typography>
                        </Typography>
                        <TextField
                          sx={{ mt: 2, pb: 2 }}
                          size="small"
                          fullWidth
                          //required
                          id="outlined-select"
                          name="customer_name"
                          value={data.customer_name || ""}
                          onChange={handelData}
                          label="Customer Name"
                          type="text"
                        />

                        <TextField
                          sx={{ pb: 2 }}
                          size="small"
                          fullWidth
                          //required
                          id="outlined-select"
                          value={data.customer_email || ""}
                          onChange={handelData}
                          name="customer_email"
                          label="Customer Email"
                          type="email"
                        />

                        <TextField
                          sx={{ pb: 2 }}
                          size="small"
                          fullWidth
                          //required
                          id="outlined-select"
                          name="customer_mobile"
                          value={data.customer_mobile || ""}
                          onChange={handelData}
                          label="Contact Number"
                          type="number"
                        />

                        <TextField
                          sx={{ pb: 2 }}
                          size="small"
                          fullWidth
                          //required
                          id="outlined-select"
                          name="city"
                          value={data.city || ""}
                          onChange={handelData}
                          label="City"
                          type="text"
                        />

                        <TextField
                          sx={{ pb: 2 }}
                          size="small"
                          fullWidth
                          //required
                          id="outlined-select"
                          name="state"
                          value={data.state || ""}
                          onChange={handelData}
                          label="State"
                          type="text"
                        />

                        <FormLabel id="demo-radio-buttons-group-label">
                          Shipping Address
                        </FormLabel>
                        <TextareaAutosize
                          minRows={4}
                          placeholder="Shipping Address..."
                          style={{ marginTop: "10px", width: "100%" }}
                          size="small"
                          fullWidth
                          //required
                          id="outlined-select"
                          name="shipping"
                          value={data.shipping || ""}
                          onChange={handelData}
                          label="Shipping"
                          type="text"
                        />
                        <FormLabel id="demo-radio-buttons-group-label">
                          Billing Address
                        </FormLabel>
                        <TextareaAutosize
                          minRows={4}
                          placeholder="Billing Address..."
                          style={{ marginTop: "10px", width: "100%" }}
                          size="small"
                          fullWidth
                          //required
                          id="outlined-select"
                          name="billing"
                          value={data.billing || ""}
                          onChange={handelData}
                          label="Shipping"
                          type="text"
                        />
                      </Box>
                    </TabPanel>

                    {/* // existing customer  */}

                    <TabPanel value={value} index={1}>
                      <Box
                        sx={{
                          p: 2,
                          pt: 1,
                        }}
                      >
                        <Typography component={"span"} variant="h5">
                          Existing Customer
                          <Typography
                            component={"span"}
                            sx={{ display: "block !important" }}
                            variant="caption"
                          >
                            Search for existing customer details and necessary
                            information from here
                          </Typography>
                        </Typography>

                        <Autocomplete
                          id="free-solo-demo"
                          freeSolo
                          sx={{ mt: 1 }}
                          onChange={(event, val) => handleAutoFillCustomer(val)}
                          options={catalogs.customer.map(
                            (option) => option.username + " - " + option.mobile
                          )}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              name="customer"
                              size={"small"}
                              label="Select Customer..."
                            />
                          )}
                        />
                        <br></br>

                        <TextField
                          sx={{ pb: 2 }}
                          size="small"
                          fullWidth
                          //required
                          id="outlined-select"
                          name="customer_name"
                          value={data.customer_name || ""}
                          onChange={handelData}
                          label="Customer Name"
                          type="text"
                        />

                        <TextField
                          sx={{ pb: 2 }}
                          size="small"
                          fullWidth
                          //required
                          id="outlined-select"
                          value={data.customer_email || ""}
                          onChange={handelData}
                          name="customer_email"
                          label="Customer Email"
                          type="email"
                        />

                        <TextField
                          sx={{ pb: 2 }}
                          size="small"
                          fullWidth
                          //required
                          id="outlined-select"
                          name="customer_mobile"
                          value={data.customer_mobile || ""}
                          onChange={handelData}
                          label="Contact Number"
                          type="number"
                        />

                        <TextField
                          sx={{ pb: 2 }}
                          size="small"
                          fullWidth
                          //required
                          id="outlined-select"
                          name="city"
                          value={data.city || ""}
                          onChange={handelData}
                          label="City"
                          type="text"
                        />

                        <TextField
                          sx={{ pb: 2 }}
                          size="small"
                          fullWidth
                          //required
                          id="outlined-select"
                          name="state"
                          value={data.state || ""}
                          onChange={handelData}
                          label="State"
                          type="text"
                        />

                        {catalogs.address.length > 0 ? (
                          <TextField
                            sx={{ mb: 2 }}
                            fullWidth
                            size="small"
                            id="outlined-select"
                            select
                            onChange={handelData}
                            name="shipping"
                            label="Select Shipping..."
                            value={data.shipping || ""}
                            multiple
                          >
                            {catalogs.address.map((option) => (
                              <MenuItem
                                key={option.address}
                                value={option.address}
                              >
                                {option.address}
                              </MenuItem>
                            ))}
                            <MenuItem key={"none"} value={undefined}>
                              {"None"}
                            </MenuItem>
                          </TextField>
                        ) : (
                          <>
                            {" "}
                            <FormLabel id="demo-radio-buttons-group-label">
                              Shipping Address
                            </FormLabel>
                            <TextareaAutosize
                              minRows={4}
                              placeholder="Shipping Address..."
                              style={{ marginTop: "10px", width: "100%" }}
                              size="small"
                              fullWidth
                              //required
                              id="outlined-select"
                              name="shipping"
                              value={data.shipping || ""}
                              onChange={handelData}
                              label="Shipping"
                              type="text"
                            />
                          </>
                        )}

                        <FormLabel id="demo-radio-buttons-group-label">
                          Billing Address
                        </FormLabel>
                        <TextareaAutosize
                          minRows={4}
                          placeholder="Billing Address..."
                          style={{ marginTop: "10px", width: "100%" }}
                          size="small"
                          fullWidth
                          //required
                          id="outlined-select"
                          name="billing"
                          value={data.billing || ""}
                          onChange={handelData}
                          label="Shipping"
                          type="text"
                        />
                      </Box>
                    </TabPanel>
                  </Box>
                )}
                {/* // Select Customer ends */}

                {/* // Select product */}
                {activeStep === 1 && (
                  <Box
                    sx={{
                      p: 2.5,
                    }}
                  >
                    <InputLabel
                      sx={{ mb: 2 }}
                      id="demo-multiple-checkbox-label"
                    >
                      Select Product
                    </InputLabel>

                    <Autocomplete
                      sx={{ mb: 2 }}
                      disablePortal
                      size="small"
                      fullWidth
                      multiple
                      autoHighlight
                      id="combo-box-demo"
                      options={catalogs.product.map((row) => {
                        return row.SKU;
                      })}
                      renderInput={(params) => (
                        <TextField
                          onKeyUpCapture={handleSearch}
                          value={data.product_array || ""}
                          {...params}
                          label="Product SKU"
                        />
                      )}
                      onChange={(e, newMember) =>
                        setData((old) => ({ ...old, product_array: newMember }))
                      }
                    />
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "10px",
                      }}
                    >
                      <InputLabel
                        sx={{ mb: 1 }}
                        id="demo-multiple-checkbox-label"
                      >
                        Product List
                      </InputLabel>
                      <Button
                        size="small"
                        onClick={() => setOpen(true)}
                        variant={"outlined"}
                      >
                        Custom Product{" "}
                      </Button>
                    </div>
                    {/* <br></br> */}

                    {DataGridView(productRow, product_columns, 300)}
                  </Box>
                )}
                {/* // Select products ends */}

                {/* // Preview receipt */}
                {activeStep === 2 && (
                  <Box
                    sx={{
                      p: 2.5,
                    }}
                  >
                    <TextField
                      sx={{ mb: 2 }}
                      size="small"
                      fullWidth
                      id="outlined-select"
                      type="text"
                      name="PO"
                      label="PO"
                      value={data.PO || ""}
                      onChange={handelData}
                    />
                    <TextField
                      sx={{ mb: 2 }}
                      size="small"
                      fullWidth
                      id="outlined-select"
                      select
                      name="sale_channel"
                      label="Sale Channel"
                      multiple
                      value={data.sale_channel || "Online"}
                      onChange={handelData}
                      helperText="Please select your Back Style."
                    >
                      {catalogs.channel.map((option) => (
                        <MenuItem key={option.key} value={option.value}>
                          {option.value}
                        </MenuItem>
                      ))}
                    </TextField>

                    <Grid container>
                      <Grid item xs={12}>
                        <Editor
                          apiKey="nrxcqobhboeugucjonpg61xo1m65hn8qjxwayuhvqfjzb6j4"
                          initialValue="<p>Note</p>"
                          onInit={(event, editor) =>
                            (editorRef.current = editor)
                          }
                          init={{
                            height: 400,
                            menubar: true,
                            plugins: "image code",
                          }}
                        />
                      </Grid>

                      <br></br>

                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          sx={{ mb: 2 }}
                          size="small"
                          name="O"
                          disabled
                          label="O"
                          value={data.O}
                        ></TextField>
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          sx={{ mb: 2 }}
                          size="small"
                          disabled
                          label="CID"
                          value={data.CID}
                        ></TextField>
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          sx={{ mb: 2 }}
                          size="small"
                          disabled
                          label="Subtotal"
                          value={calSubtotal()}
                        ></TextField>
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          sx={{ mb: 2 }}
                          label="Discount"
                          type="number"
                          size="small"
                          value={data.discount}
                          name="discount"
                          onChange={handelData}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          sx={{ mb: 2 }}
                          label="Paid"
                          type="number"
                          size="small"
                          value={data.paid}
                          name="paid"
                          onChange={handelData}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          disabled
                          fullWidth
                          label="Total"
                          type="number"
                          size="small"
                          value={data.total !== 0 ? data.total : calSubtotal()}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                )}
                {/* // Preview receipt ends */}

                {/* // controlled button */}
                <Box
                  sx={{
                    display: "flex",
                    p: 2,
                    pb: 0,
                    justifyContent: "space-between",
                    alignItem: "center",
                  }}
                >
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
                    onClick={activeStep === 2 ? confirmBox : handleNextStep}
                  >
                    {activeStep === 2 ? "Save Order" : "Continue"}
                  </Button>
                </Box>
              </form>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* data grid ends  */}
    </Box>
  );
}
