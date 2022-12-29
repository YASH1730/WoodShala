import React, { useState, useEffect } from "react";
// import PropTypes from 'prop-types';
import {
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  MenuItem,
  Grid,
  Box
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from "@mui/icons-material/Create";
// import AddIcon from "@mui/icons-material/Add";
import {useDispatch} from 'react-redux'
import { setAlert, setForm } from "../../../store/action/action";
import { getOrder, changeOrderStatus, deleteOrder } from "../../../services/service";
import "../../../assets/custom/css/category.css";
// import { useDropzone } from "react-dropzone";

import {
  DataGrid,
  // gridPageCountSelector,
  // gridPageSelector,
  // useGridApiContext,
  // useGridSelector,
} from "@mui/x-data-grid";
// import Pagination from "@mui/material/Pagination";

// import { customerCatalog, getPresentSKUs, getLastOrder, addOrder, getLastCp, addCustomProduct } from '../../services/service'
import { useConfirm } from "material-ui-confirm";
// import { Editor } from "@tinymce/tinymce-react";

// style for drop box in custom
// const thumbsContainer = {
//   display: "flex",
//   flexDirection: "row",
//   flexWrap: "wrap",
//   marginTop: 16,
// };

// const thumb = {
//   display: "inline-flex",
//   borderRadius: 2,
//   border: "1px solid #eaeaea",
//   marginBottom: 8,
//   marginRight: 8,
//   width: 100,
//   height: 100,
//   padding: 4,
//   boxSizing: "border-box",
// };

// const thumbInner = {
//   display: "flex",
//   minWidth: 0,
//   overflow: "hidden",
// };

// const img = {
//   display: "block",
//   width: "auto",
//   height: "100%",
// };

// style for drop box in custom ends



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

// modal css
// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 400,
//   maxHeight: 500,
//   overflow: 'scroll',
//   bgcolor: 'background.paper',
//   boxShadow: 24,
//   p: 2,
// };

// function TabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`vertical-tabpanel-${index}`}
//       aria-labelledby={`vertical-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box sx={{ p: 3 }}>
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.number.isRequired,
//   value: PropTypes.number.isRequired,
// };

// function a11yProps(index) {
//   return {
//     id: `vertical-tab-${index}`,
//     'aria-controls': `vertical-tabpanel-${index}`,
//   };
// }

export default function Order() {

  // const editorRef = useRef();
  // const [value, setValue] = useState(0);


  // confirm box 

  // const confirm = useConfirm();

  // confirmBox 
  // const confirmBox = (e) => {
  //   e.preventDefault();

  //   confirm({ description: `Data will listed in Database !!!` })
  //     .then(() => handleSubmit(e))
  //     .catch((err) => { console.log("Operation cancelled.") });
  // }


  // states 
  const [search, setSearch] = useState({
    customer_email: undefined,
    OID: undefined,
    date: '',
    customer: '',

  });
  // multiple images
  // const [files, setFiles] = useState([]);

  const [Row, setRows] = useState([]);
  // const [productRow, setProductRows] = useState([]);
  // const [pageSize, setPageSize] = useState(50);

  // const [catalogs, setCatalogs] = useState({
  //   customer: [],
  //   products: [],
  //   address : [],
  // })

  // state for data 
  const [data, setData] = useState({
    OID: '',
    CUS: '',
    CID: null,
    customer_email: '',
    customer_mobile: '',
    customer_name: '',
    shipping: '',
    billing: '',
    product_array: [],
    quantity: [],
    subTotal: 0,
    discount: 0,
    total: 0,
    status: 'processing',
    city: '',
    state: '',
    paid: 0,
    note: ''
  })

  //  State for stepper
  // const [activeStep, setActiveStep] = useState(0);

  // // tab 
  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };

  // context
  const dispatch = useDispatch();
  const [pageSize, setPageSize] = useState(50);


  // // stepper button
  // const handleNextStep = () => {
  //   setActiveStep(activeStep + 1);
  // };

  // // stepper button
  // const handleBackStep = () => {
  //   setActiveStep(activeStep - 1);
  // };

  // // step label
  // const steps = ['Select Customer', 'Select Product', 'Receipt'];


  // catalog reload 
  // useEffect(() => {

  //   customerCatalog()
  //     .then(async (cus) => {
  //       //console.log(cus)

  //       getPresentSKUs().then((res) => {
  //         //console.log(res)
  //         setCatalogs({
  //           ...catalogs,
  //           customer: cus.data,
  //           products: res.data
  //         })
  //         getOID()

  //       });
  //     })



  // }, [])


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
              paid:
                parseInt((row.paid / row.total) * 100) + "%",
              total: row.total,
              note: row.note || '',
              action: row._id,
            };
          })
        );
      })
      .catch((err) => {
        //console.log(err);
      });
  }, [search]);

  // for product data row 
  // useEffect(() => {

  //   const rows = catalogs.products.filter((row) => { return data.product_array.includes(row.SKU) && row })

  //   setProductRows(rows.map((dataOBJ, index) => {

  //     setData({ ...data, quantity: { ...data.quantity, [dataOBJ.SKU]: 1 } })

  //     return {
  //       id: index + 1,
  //       SKU: dataOBJ.SKU,
  //       product_title: dataOBJ.product_title,
  //       product_image: dataOBJ.featured_image,
  //       dimension: dataOBJ.length_main + 'X' + dataOBJ.breadth + 'X' + dataOBJ.height,
  //       MRP: dataOBJ.MRP,
  //       qty: data.quantity[dataOBJ.SKU] ? data.quantity[dataOBJ.SKU] : 1,
  //       selling_price: dataOBJ.selling_price,
  //       discount_limit: dataOBJ.discount_limit,
  //       range: dataOBJ.range,
  //     }
  //   }))

  // }, [data.product_array])


  // // for image drop 
  // function ProductsPreviews(props) {
  //   const { getRootProps, getInputProps } = useDropzone({
  //     accept: "image/*",
  //     multiple: true,
  //     onDrop: (acceptedFiles) => {
  //       setFiles(
  //         acceptedFiles.map((file) =>
  //           Object.assign(file, {
  //             preview: URL.createObjectURL(file),
  //           })
  //         )
  //       );
  //     },
  //   });

  //   const thumbs = files.map((file) => (
  //     <div style={thumb} key={file.name}>
  //       <div style={thumbInner}>
  //         <img
  //           src={file.preview}
  //           style={img}
  //           alt="Images"
  //           // Revoke data uri after image is loaded
  //           onLoad={() => {
  //             URL.revokeObjectURL(file.preview);
  //           }}
  //         />
  //       </div>
  //     </div>
  //   ));

  //   useEffect(() => {
  //     // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
  //     return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  //   }, []);

  //   return (
  //     <section className="container dorpContainer">
  //       <div {...getRootProps({ className: "dropzone" })}>
  //         <input {...getInputProps()} />
  //         <p>{props.text}</p>
  //       </div>
  //       <aside style={thumbsContainer}>{thumbs}</aside>
  //     </section>
  //   );
  // }

  // // for calculating subtotal
  // const calSubtotal = () => {

  //   let val = 0;
  //   productRow.map((row) => {
  //     return val += row.selling_price * data.quantity[row.SKU]
  //   })
  //   return val
  // }


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
          <IconButton
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
          </IconButton>
          <IconButton onClick={() => { deleteOrder(params.formattedValue).then((res)=>{
           setRows(Row.filter((set)=>{
            return  set.action !== params.formattedValue  ;
          }))
          dispatch(setForm( {
            open : true,
            variant : 'success',
            message : 'Order Deleted !!!'
          }))
        }) }} aria-label="delete"  >
          <DeleteIcon />
        </IconButton>
        
        </div>
      ),
    },
  ];

  // // create order  col
  // const product_columns = [
  //   {
  //     field: "id",
  //     headerName: "ID",
  //     width: 20
  //   },
  //   {
  //     field: "qty",
  //     renderHeader: () => <strong>{"Quantity"}</strong>,
  //     width: 80,
  //     renderCell: (params) => (
  //       <Grid container className="qtyButtons">
  //         <Grid item xs={12}>
  //           <TextField
  //             value={data.quantity[params.row.SKU]}
  //             type='Number'
  //             size="small"
  //             onChange={(e) => setData({ ...data, quantity: { ...data.quantity, [params.row.SKU]: parseInt(e.target.value) } })}
  //           />

  //         </Grid>
  //       </Grid>
  //     ),
  //   },
  //   {
  //     field: "SKU",
  //     headerName: "SKU",
  //     width: 100
  //   },
  //   {
  //     field: 'product_image',
  //     align: 'center',
  //     headerName: 'Image',
  //     width: 200,
  //     renderCell: (params) => <div className="categoryImage" >{params.formattedValue !== "undefined" ? <img src={params.formattedValue} alt='category' /> : "Image Not Give"}</div>,
  //   },
  //   {
  //     field: "product_title",
  //     headerName: "Product Title",
  //     width: 200,
  //   },

  //   {
  //     field: "MRP",
  //     headerName: "MRP",
  //     width: 200,
  //   },

  //   {
  //     field: "selling_price",
  //     headerName: "Selling price",
  //     width: 200,
  //   },
  //   {
  //     field: "dimension",
  //     headerName: "Dimension",
  //     width: 200,
  //   },



  // ];

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
        dispatch(setAlert({
            open: true,
            variant: "success",
            message: " Order Status Updated Successfully !!!",
          }
        ));
      })
      .catch((err) => {
        console.log(err);
        dispatch(setAlert({
            open: true,
            variant: "error",
            message: "Something Went Wrong !!!",
        }));
      });
  };

  // const getOID = () => {
  //   getLastOrder()
  //     .then((res) => {
  //       if (res.data.length > 0) {
  //         let index = parseInt(res.data[0].OID.split("-")[1]) + 1;

  //         setData({ ...data, OID: `O-0${index}` });
  //       } else {
  //         setData({ ...data, OID: "O-01001" });

  //       }
  //     })
  //     .catch((err) => {
  //       // //console.log(err);
  //     });
  // };

  const handelSearch = (e) => {
    setSearch({
      ...search,
      [e.target.name]: e.target.value || undefined,
    });
  };

  // const resetValue = () => {
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

  // const handelData = (e) => {
  //   console.log(e.target.name)
  //   if(e.target.name === 'shipping')
  //   {
  //     const row = catalogs.address.filter((data)=>{ return data.shipping === e.target.value})
  //     console.log(row)
  //     setData({ ...data, [e.target.name]: e.target.value, city : row[0].city, state : row[0].state })

  //   }

  //   else if (e.target.name !== 'discount')
  //     setData({ ...data, [e.target.name]: e.target.value })
  //   else {
  //     setData({ ...data, [e.target.name]: e.target.value, subTotal: calSubtotal(), total: data.subTotal - (calSubtotal() / 100 * e.target.value) })
  //   }

  // }

  // // this function will the all customer detail respective to the search 
  // const handleAutoFillCustomer = (e) => {

  //   const number = parseInt(e.split(' - ')[1])

  //   const row = catalogs.customer.filter((row) => { return row.mobile === number && row })[0]

  //   setCatalogs({
  //     ...catalogs,
  //     address : row.address
  //   })

  //   setData({
  //     ...data,
  //     customer_email: row.email,
  //     customer_mobile: row.mobile,
  //     customer_name: row.username,
  //     city: row.city,
  //     state: row.state,
  //     CID: row.CID,

  //   })

  // }

  // // custom modal
  // const [open, setOpen] = useState(false);
  // const handleClose = () => setOpen(false);

  // // custom product id 
  // const getCUS = async () => {
  //   await getLastCp()
  //     .then((res) => {
  //       if (res.data.length > 0) {
  //         let index = parseInt(res.data[0].CUS.split("-")[1]) + 1;

  //         setData({ ...data, CUS: `CUS-0${index}` });
  //       } else {
  //         setData({ ...data, CUS: "CUS-01001" });

  //       }
  //     })
  //     .catch((err) => {
  //       // //console.log(err);
  //     });
  // }

  // // custom product submit
  // const handleCustomProduct = async (e) => {
  //   e.preventDefault();

  //   const FD = new FormData();

  //   files.map((element) => {
  //     return FD.append("product_image", element);
  //   });


  //   FD.append('CUS', e.target.CUS.value)
  //   FD.append('product_title', e.target.product_title.value)
  //   FD.append('length', e.target.length.value)
  //   FD.append('height', e.target.height.value)
  //   FD.append('breadth', e.target.breadth.value)
  //   FD.append('selling_price', e.target.selling_price.value)
  //   FD.append('MRP', e.target.MRP.value)
  //   FD.append('discount', e.target.discount.value)
  //   FD.append('polish_time', e.target.polish_time.value)



  //   await addCustomProduct(FD)

  //   setData({ ...data, quantity: { ...data.quantity, [e.target.CUS.value]: e.target.quantity.value } })

  //   setProductRows(
  //     [...productRow, {
  //       id: productRow.length + 1,
  //       SKU: e.target.CUS.value,
  //       product_title: e.target.product_title.value,
  //       dimension: e.target.length.value + 'x' + e.target.breadth.value + 'x' + e.target.height.value,
  //       MRP: e.target.MRP.value,
  //       qty: e.target.quantity.value,
  //       selling_price: e.target.MRP.value - ((e.target.MRP.value / 100) * e.target.discount.value),
  //       discount_limit: e.target.discount.value,
  //     }])

  //   handleClose();
  // }



  // // custom product model
  // function CustomProduct() {

  //   useEffect(() => {
  //     getCUS();

  //   }, [open])

  //   return (
  //     <div>
  //       <Modal
  //         aria-labelledby="transition-modal-title"
  //         aria-describedby="transition-modal-description"
  //         open={open}
  //         onClose={handleClose}
  //         closeAfterTransition
  //         BackdropComponent={Backdrop}
  //         BackdropProps={{
  //           timeout: 500,
  //         }}
  //       >
  //         <Fade in={open}>
  //           <Box sx={style}>
  //             <Grid container >
  //               <Grid item xs={12} sx={{ mb: 2 }}><Typography component={'span'} id="transition-modal-title" variant="h6" >
  //                 Create Product
  //               </Typography></Grid>
  //               <Grid item xs={12} sx={{ pb: 2 }}>
  //                 <form enctype="multipart/form-data"
  //                   method="get" onSubmit={handleCustomProduct}>
  //                   {/* <FormLabel id="demo-radio-buttons-group-label">
  //                             Product Images
  //                           </FormLabel> */}
  //                   <ProductsPreviews
  //                     text={"Please Drag and Drop the product images"}
  //                   ></ProductsPreviews>

  //                   <TextField size='small' sx={{ mb: 2 }} fullWidth
  //                     name='CUS'
  //                     disabled
  //                     value={data.CUS}
  //                     type='text'
  //                     label='Custom SKU'
  //                     variant='outlined'
  //                   />
  //                   <TextField size='small' sx={{ mb: 2 }} fullWidth
  //                     name='product_title'
  //                     type='text'
  //                     label='Title'
  //                     variant='outlined'
  //                   />

  //                   <TextField size='small' sx={{ mb: 2 }} fullWidth
  //                     name='length'
  //                     type='text'
  //                     label='Length'
  //                     variant='outlined'
  //                   />

  //                   <TextField size='small' sx={{ mb: 2 }} fullWidth
  //                     name='breadth'
  //                     type='text'
  //                     label='Breadth'
  //                     variant='outlined'
  //                   />

  //                   <TextField size='small' sx={{ mb: 2 }} fullWidth
  //                     name='height'
  //                     type='text'
  //                     label='Height'
  //                     variant='outlined'
  //                   />
  //                   <TextField size='small' sx={{ mb: 2 }} fullWidth
  //                     name='quantity'
  //                     type='number'
  //                     label='Quantity'
  //                     variant='outlined'
  //                   />
  //                   <TextField size='small' sx={{ mb: 2 }} fullWidth
  //                     name='selling_price'
  //                     type='number'
  //                     label='Selling Price'
  //                     variant='outlined'
  //                   />
  //                   <TextField size='small' sx={{ mb: 2 }} fullWidth
  //                     name='MRP'
  //                     type='number'
  //                     label='MRP'
  //                     variant='outlined'
  //                   />
  //                   <TextField size='small' sx={{ mb: 2 }} fullWidth
  //                     name='discount'
  //                     type='number'
  //                     label='Discount'
  //                     variant='outlined'
  //                   />

  //                   <TextField size='small' sx={{ mb: 2 }} fullWidth
  //                     name='polish_time'
  //                     type='number'
  //                     label='Polish Time'
  //                     variant='outlined'
  //                     helperText='Polish time in days...'
  //                   />
  //                   <Button size='small' fullWidth variant='contained' type='submit'>Add</Button>
  //                 </form>
  //               </Grid>
  //             </Grid>
  //           </Box>
  //         </Fade>
  //       </Modal>
  //     </div>
  //   );
  // }

  // function handleSubmit() {

  //   /// for adding the note 

  //   setData({ ...data, note: editorRef.current.getContent() ? editorRef.current.getContent() : '' })

  //   console.log(data.note)

  //   const res = addOrder(data)

  //   res
  //     .then((data) => {
  //       if (data.status !== 200) {
  //         setData({
  //           OID: '',
  //           CUS: '',
  //           CID: null,
  //           customer_email: '',
  //           customer_mobile: '',
  //           customer_name: '',
  //           shipping: '',
  //           product_array: [],
  //           quantity: [],
  //           subTotal: 0,
  //           discount: 0,
  //           total: 0,
  //           status: 'processing',
  //           city: '',
  //           state: '',
  //           paid: 0,
  //           note: ''
  //         })
  //         dispatch({
  //           type: Notify, payload: {
  //             open: true,
  //             variant: "error",
  //             message: data.data.message || "Something Went Wrong !!!",
  //           }
  //         });

  //       } else {
  //         setRows([...Row, {
  //           id: Row.length + 1,
  //           OID: data.data.response.OID,
  //           order_time: data.data.response.order_time,
  //           status: data.data.response.status,
  //           CID: data.data.response.CID,
  //           customer_name: data.data.response.customer_name,
  //           customer_email: data.data.response.customer_email,
  //           customer_mobile: data.data.response.customer_mobile,
  //           city: data.data.response.city,
  //           state: data.data.response.state,
  //           shipping: data.data.response.shipping,
  //           quantity: data.data.response.quantity,
  //           discount: data.data.response.discount,
  //           paid: data.data.response.paid,
  //           total: data.data.response.total,
  //           note: data.data.response.note,
  //           action: data.data.response
  //         }])
  //         dispatch({
  //           type: Notify, payload: {
  //             open: true,
  //             variant: "success",
  //             message: data.data.message,
  //           }
  //         });
  //         resetValue();

  //       }
  //     })
  //     .catch((err) => {
  //       dispatch({
  //         type: Notify, payload: {
  //           open: true,
  //           variant: "error",
  //           message: "Something Went Wrong !!!",
  //         }
  //       });
  //     });
  // }

  return (
    <Box sx={{ pl: 4, pr: 4 }}>
      <Typography component={'span'} sx={{ display: "block" }} variant="h5">
        Order
      </Typography>
      {/* {CustomProduct()} */}

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
            // autoComplete={false}
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
            // autoComplete={false}
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
            // autoComplete={false}
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
        <Grid item p={2} xs={12} sx={{ boxShadow: 1, borderRadius: 5, maxHeight: 500 }}>
          <div style={
            {
              display: 'flex',
              justifyContent: 'space-between',
            }
          } >

            <Typography component={'span'} variant="h6"> Order List </Typography>
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
          {DataGridView(Row, columns, 400)}
        </Grid>

      
      </Grid>

      {/* data grid ends  */}
    </Box>
  );
}