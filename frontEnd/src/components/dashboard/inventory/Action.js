import React, { useState, useEffect, useMemo } from "react";
import {
  Typography,
  TextField,
  Grid,
  Button,
  MenuItem,
  Divider,
  IconButton,
  Modal,
  Backdrop,
  Fade,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import { useDispatch } from "react-redux";
import { setAlert } from "../../../store/action/action";
import {
  getDraft,
  getLastHardware,
  getLastProduct,
  deleteDraft,
  getProductDetails,
  getHardwareDetails,
  dropDraft,
  getMetaDraft,
  getCategoryDetails,
  getSubCategoryDetails,
  getMaterialDetails,
  getPolishDetails,
  getBlog,
  getLastOrder,
  getBannerDetails,
} from "../../../services/service";

import {
  DataGrid,
  // gridPageCountSelector,
  // gridPageSelector,
  // useGridApiContext,
  // useGridSelector,
} from "@mui/x-data-grid";
// import Pagination from "@mui/material/Pagination";

import "../../../assets/custom/css/action.css";

// icon
import PendingIcon from "@mui/icons-material/Pending";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PlaylistAddCheckCircleIcon from "@mui/icons-material/PlaylistAddCheckCircle";

export default function Action() {
  // useContext

  const dispatch = useDispatch();

  const [display, setDisplay] = useState({});
  // const [search, setSearch] = useState("");
  const [Row, setRows] = useState([]);
  const [SKU, setSKU] = useState("");
  const [meta, setMeta] = useState({
    total: 0,
    pending: 0,
    resolved: 0,
  });

  // page state to controlling the pagination on server side
  const [pageState, setPageState] = useState({
    data: [],
    isLoading: false,
    page: 1,
    limit: 10,
    total: 0,
    title: "",
    category: undefined,
    SKU: undefined,
    subCategory: undefined,
    filter: false,
  });

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50vw",
    height: "content-fit",
    bgcolor: "background.paper",
    boxShadow: 24,
    padding: "1%",
  };

  useMemo(() => {
    getMetaDraft().then((data) => {
      console.log(data);
      setMeta({ ...data.data });
    });
    fetchData();
  }, [pageState.page, pageState.limit, pageState.filter]);

  function fetchData() {
    setPageState((lastState) => ({
      ...lastState,
      isLoading: true,
    }));
    getDraft({
      page: pageState.page,
      limit: pageState.limit,
      total: pageState.total,
    })
      .then((data) => {
        setPageState((lastState) => ({
          ...lastState,
          data: data.data.data.map((row, index) => {
            return {
              id: index + 1,
              DID: row.DID,
              AID: row.AID,
              type: row.type,
              operation: row.operation,
              message: row.message,
              status: row.draftStatus,
              action: row,
            };
          }),
          isLoading: false,
          total: data.data.total,
          filter: false,
        }));
      })
      .catch((err) => {});
  }

  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    {
      field: "DID",
      headerName: "DID (Draft Id)",
      width: 150,
      align: "center",
    },
    {
      field: "AID",
      headerName: "AID (Article Id)",
      width: 200,
      align: "center",
    },
    {
      field: "type",
      headerName: "Type",
      width: 100,
    },
    {
      field: "operation",
      headerName: "Operation",
      width: 100,
    },
    {
      field: "message",
      headerName: "Message (Action Information)",
      width: 400,
      renderCell: (params) => (
        <Typography variant="button">{params.formattedValue}</Typography>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      width: 100,
      renderCell: (params) => (
        <Typography variant="button">{params.formattedValue}</Typography>
      ),
    },
    {
      field: "action",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => (
        <div>
          <IconButton
            disabled={params.formattedValue.draftStatus === "Approved" && true}
            onClick={() => {
              console.log(params);
              setDisplay({
                data: params.formattedValue.payload,
                DID: params.formattedValue.DID,
                type: params.formattedValue.type,
                status: true,
                draftStatus: params.formattedValue.draftStatus,
                operation: params.formattedValue.operation,
              });
            }}
            aria-label="update"
          >
            <CreateIcon />
          </IconButton>

          <IconButton
            disabled={params.formattedValue.draftStatus === "Approved" && true}
            onClick={async () => {
              let response = await deleteDraft(params.formattedValue._id);
              if (response) {
                setPageState((old) => ({
                  ...old,
                  data: pageState.data.filter((set) => {
                    return set.action._id !== params.formattedValue._id;
                  }),
                }));
                dispatch(
                  setAlert({
                    open: true,
                    variant: "success",
                    message: "Notification deleted successfully !!!",
                  })
                );
              }
            }}
            aria-label="delete"
          >
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  const Status = [
    {
      key: "Pending",
      value: "Pending",
    },
    {
      key: "Approved",
      value: "Approved",
    },
    {
      key: "Hold",
      value: "Hold",
    },
  ];

  // function for generating product  ID

  const getSKU = () => {
    getLastProduct()
      .then((res) => {
        if (res.data.length > 0) {
          let index = parseInt(res.data[0].SKU.split("-")[1]) + 1;

          setSKU(`P-0${index}`);
        } else {
          setSKU("P-01001");
        }
      })
      .catch((err) => {
        // //console.log(err);
      });
  };

  // function for generating hardware  ID

  const getHKU = async () => {
    try {
      let res = await getLastHardware();
      if (res) {
        if (res.data.length > 0) {
          let index = parseInt(res.data[0].SKU.split("-")[1]) + 1;

          setSKU(`H-0${index}`);
        } else {
          setSKU("H-01001");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  async function getO() {
    await getLastOrder()
      .then((res) => {
        console.log(res);
        if (res.data.length > 0) {
          let index = parseInt(res.data[0].O.split("-")[1]) + 1;
          setSKU(`O-0${index}`);
          // return `O-0${index}`
        } else {
          setSKU("O-01001");
          // return 'O-01001'
        }
      })
      .catch((err) => {
        // //console.log(err);
      });
  }

  const handleClose = () => setDisplay({ status: false });

  // Permission Box
  function SpringModal() {
    // final response function
    async function sendResponse(data) {
      let response = await dropDraft(data);
      if (response.status === 200) {
        console.log(display.data.DID);
        setPageState((old) => ({
          ...old,
          data: [
            ...old.data.map((item) => {
              if (item.DID === display.data.DID) {
                item.status = "Approved";
                item.AID =
                  display.data.SKU ||
                  display.data.uuid ||
                  display.data.O ||
                  display.data.CID ||
                  display.data.AID ||
                  display.data._id;
              }
              return item;
            }),
          ],
        }));
        setMeta((old) => ({
          ...old,
          resolved: old.resolved + 1,
          pending: old.pending - 1,
        }));
        dispatch(
          setAlert({
            open: true,
            variant: "success",
            message: response.data.message,
          })
        );
        setDisplay({ status: false });
      } else {
        dispatch(
          setAlert({
            open: true,
            variant: "error",
            message: "Something Went Wrong !!!",
          })
        );
        setDisplay({ status: false });
      }
    }

    // final approval and submission of the product
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (e.target.action.value === "Approved") {
        // console.log(typeof (display.operation))
        switch (display.operation) {
          case "insertProduct":
            display.data.draftStatus = e.target.action.value;
            display.data.status = true;
            display.data.SKU = SKU;
            display.data.AID = SKU;
            // console.log(display.data);
            sendResponse(display.data);
            break;
          case "updateProduct":
            display.data.draftStatus = e.target.action.value;
            display.data.status = true;
            sendResponse(display.data);
            break;
          case "insertHardware":
            display.data.draftStatus = e.target.action.value;
            display.data.status = true;
            display.data.SKU = SKU;
            display.data.AID = SKU;

            sendResponse(display.data);
            break;
          case "updateHardware":
            display.data.draftStatus = e.target.action.value;
            display.data.status = true;
            sendResponse(display.data);
            break;
          case "deleteHardware":
            display.data.operation = display.operation;
            display.data.DID = display.DID;
            display.data.draftStatus = e.target.action.value;
            display.data.status = true;
            sendResponse(display.data);
            break;
          case "deleteCustomer":
            display.data.operation = display.operation;
            display.data.DID = display.DID;
            display.data.draftStatus = e.target.action.value;
            display.data.status = true;
            sendResponse(display.data);
            break;
          case "insertCategory":
            display.data.draftStatus = e.target.action.value;
            display.data.status = true;
            display.data.SKU = SKU;
            display.data.AID = SKU;
            console.log(display.data);
            sendResponse(display.data);
            break;
          case "updateCategory":
            display.data.draftStatus = e.target.action.value;
            display.data.status = true;
            sendResponse(display.data);
            break;
          case "insertSubCategory":
            display.data.draftStatus = e.target.action.value;
            display.data.status = true;
            display.data.SKU = SKU;
            display.data.AID = SKU;
            console.log(display.data);
            sendResponse(display.data);
            break;
          case "updateSubCategory":
            display.data.draftStatus = e.target.action.value;
            display.data.status = true;
            sendResponse(display.data);
            break;
          case "deleteBlog":
            display.data.operation = display.operation;
            display.data.DID = display.DID;
            display.data.draftStatus = e.target.action.value;
            display.data.status = true;
            sendResponse(display.data);
            break;
          case "insertMaterial":
            display.data.draftStatus = e.target.action.value;
            display.data.status = true;
            display.data.SKU = SKU;
            display.data.AID = SKU;
            sendResponse(display.data);
            break;
          case "updateMaterial":
            display.data.draftStatus = e.target.action.value;
            display.data.status = true;
            sendResponse(display.data);
            break;
          case "insertPolish":
            display.data.draftStatus = e.target.action.value;
            display.data.status = true;
            sendResponse(display.data);
            break;
          case "updatePolish":
            display.data.draftStatus = e.target.action.value;
            display.data.status = true;
            sendResponse(display.data);
            break;
          case "insertBlog":
            display.data.draftStatus = e.target.action.value;
            display.data.status = true;
            sendResponse(display.data);
            break;
          case "updateBlog":
            display.data.draftStatus = e.target.action.value;
            display.data.status = true;
            sendResponse(display.data);
            break;
          case "createOrder":
            display.data.draftStatus = e.target.action.value;
            display.data.O = SKU;
            display.data.AID = SKU;
            sendResponse(display.data);
            break;
          case "addBanner":
            display.data.draftStatus = e.target.action.value;
            sendResponse(display.data);
            break;
          case "updateBanner":
            display.data.draftStatus = e.target.action.value;
            display.data.status = true;
            sendResponse(display.data);
            break;
          case "deleteBanner":
            display.data.operation = display.operation;
            display.data.DID = display.DID;
            display.data.draftStatus = e.target.action.value;
            display.data.status = true;
            sendResponse(display.data);
            break;
          case "applyCOD":
            display.data.operation = display.operation;
            display.data.DID = display.DID;
            display.data.limit = "CODLIMIT2023"
            display.data.draftStatus = e.target.action.value;
            display.data.status = true;
            sendResponse(display.data);
            break
            default:
            console.log("no operation found");
            break;
        }
      } else setDisplay({ status: false });
    };

    // Section for comparison table
    function Content() {
      const [peer, setPeer] = useState([]);

      // get Peers details from here
      useEffect(() => {
        getContent();
      }, []);

      async function getContent() {
        let res = "";
        switch (display.operation) {
          case "insertProduct":
            setPeer([]);
            getSKU();
            break;
          case "insertHardware":
            setPeer([]);
            getHKU();
            break;
          case "updateProduct":
            res = await getProductDetails(display.data.AID);
            if (res) {
              res.data = JSON.stringify(res.data);
              res.data = JSON.parse(res.data);
              // console.log(res.data);
              if (res.data) setPeer(res.data);
            }

            break;
          case "updateHardware":
            res = await getHardwareDetails(display.data.AID);
            if (res) {
              res.data = JSON.stringify(res.data);
              res.data = JSON.parse(res.data);
              // console.log(res.data)
              if (res.data) setPeer(res.data);
            }
            break;
          case "updateCategory":
            res = await getCategoryDetails(display.data.AID);
            if (res) {
              res.data = JSON.stringify(res.data);
              res.data = JSON.parse(res.data);
              console.log(res.data);
              if (res.data) setPeer(res.data);
            }
            break;
          case "updateSubCategory":
            res = await getSubCategoryDetails(display.data.AID);
            if (res) {
              res.data = JSON.stringify(res.data);
              res.data = JSON.parse(res.data);
              console.log(res.data);
              if (res.data) setPeer(res.data);
            }
            break;
          case "updateMaterial":
            res = await getMaterialDetails(display.data.AID);
            if (res) {
              // res.data = JSON.stringify(res.data);
              // res.data = JSON.parse(res.data);
              console.log(res.data);
              if (res.data) setPeer(res.data);
            }
            break;
          case "updatePolish":
            console.log(display.data.AID);
            res = await getPolishDetails(display.data.AID);
            if (res) {
              // res.data = JSON.stringify(res.data);
              // res.data = JSON.parse(res.data);
              // console.log(res.data);
              if (res.data) setPeer(res.data);
            }

            break;
          case "updateBlog":
            console.log(display.data.AID);
            res = await getBlog(display.data.AID);
            if (res) {
              // res.data = JSON.stringify(res.data);
              // res.data = JSON.parse(res.data);
              // console.log(res.data);
              if (res.data) setPeer(res.data);
            }
            break;
          case "createOrder":
            getO();
            break;
          case "updateBanner":
            console.log(display.data.AID);
            res = await getBannerDetails(display.data.AID);
            if (res) {
              // res.data = JSON.stringify(res.data);
              // res.data = JSON.parse(res.data);
              // console.log(res.data);
              if (res.data) setPeer(res.data);
            }
            break;
            break;
          default:
            setPeer([]);
            break;
        }
      }

      // switch (display.type) {
      //   case "Product":
      //     return (
      //       <>
      //         <Grid container>
      //           <Grid item xs={12}>
      //             {" "}
      //             <Typography variant="h5" sx={{ textAlign: "center", mb: 1 }}>
      //               Data View
      //             </Typography>
      //           </Grid>

      //           {/* // Before */}
      //           {display.operation === "updateProduct" && (
      //             <Grid item xs={6} p={1}>
      //               <Typography variant="h6" sx={{ textAlign: "center" }}>
      //                 Before
      //               </Typography>
      //               <Box sx={{ height: "300px", overflow: "scroll" }}>
      //                 {Object.keys(peer).map(function (key) {
      //                   return (
      //                     <>
      //                       <Divider />
      //                       <Typography
      //                         sx={{ fontWeight: "bold !important" }}
      //                         variant="button"
      //                       >
      //                         {key + " :: "}
      //                       </Typography>
      //                       {peer[key] != display.data[key] ? (
      //                         <Typography
      //                           sx={{ color: "red !important" }}
      //                           variant="button"
      //                         >
      //                           {peer[key]}
      //                         </Typography>
      //                       ) : (
      //                         <Typography variant="button">
      //                           {peer[key]}
      //                         </Typography>
      //                       )}
      //                     </>
      //                   );
      //                 })}
      //               </Box>
      //             </Grid>
      //           )}
      //           {/* // Before Ends */}

      //           {/* After and product details */}

      //           <Grid
      //             item
      //             p={1}
      //             xs={display.operation === "updateProduct" ? 6 : 12}
      //           >
      //             <Typography variant="h6" sx={{ textAlign: "center" }}>
      //               {display.operation === "updateProduct"
      //                 ? "After"
      //                 : "Product Details"}
      //             </Typography>
      //             <Box sx={{ height: "300px", overflow: "scroll", p: 2 }}>
      //               {display.operation === "updateProduct"
      //                 ? Object.keys(display.data).map(function (key) {
      //                     return (
      //                       <>
      //                         <Divider />
      //                         <Typography
      //                           sx={{ fontWeight: "bold !important" }}
      //                           variant="button"
      //                         >
      //                           {key + " :: "}
      //                         </Typography>
      //                         {peer[key] !== display.data[key] ? (
      //                           <Typography
      //                             sx={{ color: "green !important" }}
      //                             variant="button"
      //                           >
      //                             {display.data[key]}
      //                           </Typography>
      //                         ) : (
      //                           <Typography variant="button">
      //                             {display.data[key]}
      //                           </Typography>
      //                         )}
      //                       </>
      //                     );
      //                   })
      //                 : Object.keys(display.data).map(function (key) {
      //                     return (
      //                       <>
      //                         <Divider />
      //                         <Typography
      //                           sx={{ fontWeight: "bold !important" }}
      //                           variant="button"
      //                         >
      //                           {key + " :: "}
      //                         </Typography>
      //                         <Typography variant="button">
      //                           {display.data[key]}
      //                         </Typography>
      //                       </>
      //                     );
      //                   })}
      //             </Box>
      //           </Grid>
      //           {/* After and product details ends */}
      //         </Grid>
      //       </>
      //     );
      //   case "Hardware":
      //     return (
      //       <>
      //         <Grid container>
      //           <Grid item xs={12}>
      //             {" "}
      //             <Typography variant="h5" sx={{ textAlign: "center", mb: 1 }}>
      //               Data View
      //             </Typography>
      //           </Grid>

      //           {/* // Before */}
      //           {display.operation === "updateHardware" && (
      //             <Grid item xs={6} p={1}>
      //               <Typography variant="h6" sx={{ textAlign: "center" }}>
      //                 Before
      //               </Typography>
      //               <Box sx={{ height: "300px", overflow: "scroll" }}>
      //                 {Object.keys(peer).map(function (key) {
      //                   return (
      //                     <>
      //                       <Divider />
      //                       <Typography
      //                         sx={{ fontWeight: "bold !important" }}
      //                         variant="button"
      //                       >
      //                         {key + " :: "}
      //                       </Typography>
      //                       {peer[key] !== display.data[key] ? (
      //                         <Typography
      //                           sx={{ color: "red !important" }}
      //                           variant="button"
      //                         >
      //                           {peer[key]}
      //                         </Typography>
      //                       ) : (
      //                         <Typography variant="button">
      //                           {peer[key]}
      //                         </Typography>
      //                       )}
      //                     </>
      //                   );
      //                 })}
      //               </Box>
      //             </Grid>
      //           )}
      //           {/* // Before Ends */}

      //           {/* After and product details */}
      //           <Grid
      //             item
      //             p={1}
      //             xs={display.operation === "updateHardware" ? 6 : 12}
      //           >
      //             <Typography variant="h6" sx={{ textAlign: "center" }}>
      //               {display.operation === "updateHardware"
      //                 ? "After"
      //                 : "Hardware Details"}
      //             </Typography>
      //             <Box sx={{ height: "300px", overflow: "scroll", p: 2 }}>
      //               {display.operation === "updateHardware"
      //                 ? Object.keys(display.data).map(function (key) {
      //                     return (
      //                       <>
      //                         <Divider />
      //                         <Typography
      //                           sx={{ fontWeight: "bold !important" }}
      //                           variant="button"
      //                         >
      //                           {key + " :: "}
      //                         </Typography>
      //                         {peer[key] !== display.data[key] ? (
      //                           <Typography
      //                             sx={{ color: "green !important" }}
      //                             variant="button"
      //                           >
      //                             {display.data[key]}
      //                           </Typography>
      //                         ) : (
      //                           <Typography variant="button">
      //                             {display.data[key]}
      //                           </Typography>
      //                         )}
      //                       </>
      //                     );
      //                   })
      //                 : Object.keys(display.data).map(function (key) {
      //                     return (
      //                       <>
      //                         <Divider />
      //                         <Typography
      //                           sx={{ fontWeight: "bold !important" }}
      //                           variant="button"
      //                         >
      //                           {key + " :: "}
      //                         </Typography>
      //                         <Typography variant="button">
      //                           {display.data[key]}
      //                         </Typography>
      //                       </>
      //                     );
      //                   })}
      //             </Box>
      //           </Grid>
      //           {/* After and product details ends */}
      //         </Grid>
      //       </>
      //     );
      //   default:
      //     return <Typography variant="h6">No type matched !!!</Typography>;
      // }
      return (
        <>
          <Grid container>
            <Grid item xs={12}>
              {" "}
              <Typography variant="h5" sx={{ textAlign: "center", mb: 1 }}>
                Data View
              </Typography>
            </Grid>

            {/* // Before */}
            {(display.operation === "updateProduct" ||
              display.operation === "updateHardware" ||
              display.operation === "updateSubCategory" ||
              display.operation === "updateMaterial" ||
              display.operation === "updatePolish" ||
              display.operation === "updateBlog" ||
              display.operation === "updateBanner" ||
              display.operation === "updateCategory") && (
              <Grid item xs={6} p={1}>
                <Typography variant="h6" sx={{ textAlign: "center" }}>
                  Before
                </Typography>
                <Box sx={{ height: "300px", overflow: "scroll" }}>
                  {Object.keys(peer).map(function (key) {
                    return (
                      <>
                        <Divider />
                        <Typography
                          sx={{ fontWeight: "bold !important" }}
                          variant="button"
                        >
                          {key + " :: "}
                        </Typography>
                        {peer[key] != display.data[key] ? (
                          <Typography
                            sx={{ color: "red !important" }}
                            variant="button"
                          >
                            {peer[key]}
                          </Typography>
                        ) : (
                          <Typography variant="button">
                            {console.log(typeof display.data[key])}

                            {peer[key]}
                          </Typography>
                        )}
                      </>
                    );
                  })}
                </Box>
              </Grid>
            )}
            {/* // Before Ends */}

            {/* After and product details */}
            <Grid
              item
              p={1}
              xs={
                display.operation === "updateProduct" ||
                display.operation === "updateHardware" ||
                display.operation === "updateSubCategory" ||
                display.operation === "updateMaterial" ||
                display.operation === "updateBlog" ||
                display.operation === "updateBanner" ||
                display.operation === "updatePolish" ||
                display.operation === "updateCategory"
                  ? 6
                  : 12
              }
            >
              <Typography variant="h6" sx={{ textAlign: "center" }}>
                {display.operation === "updateProduct" ||
                display.operation === "updateHardware" ||
                display.operation === "updateSubCategory" ||
                display.operation === "updateBanner" ||
                display.operation === "updateMaterial" ||
                display.operation === "updateBlog" ||
                display.operation === "updatePolish" ||
                display.operation === "updateCategory"
                  ? "After"
                  : "Article Details"}
              </Typography>
              <Box sx={{ height: "300px", overflow: "scroll", p: 2 }}>
                {display.operation === "updateProduct" ||
                display.operation === "updateHardware" ||
                display.operation === "updateSubCategory" ||
                display.operation === "updateMaterial" ||
                display.operation === "updateBanner" ||
                display.operation === "updateBlog" ||
                display.operation === "updatePolish" ||
                display.operation === "updateCategory"
                  ? Object.keys(display.data).map(function (key) {
                      return (
                        <>
                          <Divider />
                          <Typography
                            sx={{ fontWeight: "bold !important" }}
                            variant="button"
                          >
                            {key + " :: "}
                          </Typography>
                          {peer[key] !== display.data[key] ? (
                            <Typography
                              sx={{ color: "green !important" }}
                              variant="button"
                            >
                              {console.log(typeof display.data[key])}

                              {typeof display.data[key] == "object"
                                ? JSON.stringify(display.data[key])
                                : display.data[key]}
                            </Typography>
                          ) : (
                            <Typography variant="button">
                              {console.log(typeof display.data[key])}
                              {typeof display.data[key] == "object"
                                ? JSON.stringify(display.data[key])
                                : display.data[key]}
                            </Typography>
                          )}
                        </>
                      );
                    })
                  : Object.keys(display.data).map(function (key) {
                      return (
                        <>
                          <Divider />
                          <Typography
                            sx={{ fontWeight: "bold !important" }}
                            variant="button"
                          >
                            {key + " :: "}
                          </Typography>
                          <Typography variant="button">
                            {typeof display.data[key] == "object"
                              ? JSON.stringify(display.data[key])
                              : display.data[key]}
                          </Typography>
                        </>
                      );
                    })}
              </Box>
            </Grid>
            {/* After and product details ends */}
          </Grid>
        </>
      );
    }

    // Action like approve here
    function ActionForm() {
      const [status, setStatus] = useState(display.draftStatus);
      return (
        <Grid container sx={{ p: 1 }}>
          <Grid item xs={12}>
            <form
              encType="multipart/form-data"
              method="post"
              onSubmit={handleSubmit}
            >
              <TextField
                sx={{ mb: 2 }}
                size="small"
                fullWidth
                // required
                id="outlined-select"
                select
                // disabled={status === "Approved"}
                name="action"
                label="Action"
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
                helperText="Please select your action"
              >
                {Status.map((option) => (
                  <MenuItem key={option.key} value={option.value}>
                    {option.value}
                  </MenuItem>
                ))}
              </TextField>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Button size="small" type="submit" variant="contained">
                  Save Action
                </Button>
                <Button
                  size="small"
                  onClick={() => {
                    setDisplay({ status: false });
                  }}
                  variant="outlined"
                >
                  Cancel
                </Button>
              </Box>
            </form>
          </Grid>
        </Grid>
      );
    }

    return (
      <div>
        <Modal
          aria-labelledby="spring-modal-title"
          aria-describedby="spring-modal-description"
          open={true}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={true}>
            <Box sx={style}>
              <Content />
              <br></br>
              <ActionForm />
            </Box>
          </Fade>
        </Modal>
      </div>
    );
  }
  // Permission Box Ends

  // Data Grid
  function DataGridView() {
    return (
      <div style={{ marginTop: "2%", height: 400, width: "100%" }}>
        <DataGrid
          rows={pageState.data}
          rowCount={pageState.total}
          loading={pageState.isLoading}
          rowsPerPageOptions={[10, 30, 50, 100]}
          filterModel={{
            items: [
              {
                columnField: "product_title",
                operatorValue: "contains",
                value: `${pageState.title}`,
              },
            ],
          }}
          pagination
          page={pageState.page - 1}
          limit={pageState.limit}
          pageSize={pageState.limit}
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
  // Data Grid Ends

  // const handleSearch = (e) => {
  //   // //console.log(e.target.value)
  //   setSearch(e.target.value);
  // };

  // main container
  return (
    <Box sx={{ pl: 4, pr: 4 }}>
      <Typography sx={{ display: "block" }} variant="h5">
        Action Center
      </Typography>

      <br></br>

      <Grid className="actionDash" container>
        <Grid
          sx={{ backgroundColor: "#0000ff8c" }}
          item
          xs={12}
          className="card"
          md={3.8}
        >
          <PlaylistAddCheckCircleIcon fontSize={"large"} />
          <Typography variant="h6">Total Request</Typography>
          <Typography variant="h4">{meta.total}</Typography>
        </Grid>
        <Grid
          sx={{ backgroundColor: "#ffbd29" }}
          className="card"
          item
          xs={12}
          md={3.8}
        >
          <PendingIcon fontSize={"large"} />
          <Typography variant="h6">Pending Request</Typography>
          <Typography variant="h4">{meta.pending}</Typography>
        </Grid>
        <Grid
          sx={{ backgroundColor: "#40b13e" }}
          item
          xs={12}
          className="card"
          md={3.8}
        >
          <CheckCircleIcon fontSize={"large"} />
          <Typography variant="h6">Resolved Request</Typography>
          <Typography variant="h4">{meta.resolved}</Typography>
        </Grid>
      </Grid>

      {/* Section 1  */}

      {/* <Grid
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
        <Grid xs={12} >
          <TextField
            fullWidth
            autoComplete={false}
            id="demo-helper-text-aligned-no-helper"
            label="Search by SKU"
            onChange={handleSearch}
            name="seachQuery"
            size='small'
            type="search"
          />
        </Grid>

        <Grid xs={12} md={2.8}>
          <Button
            sx={{ width: "100%" }}
            color="primary"
            startIcon={<AddIcon />}
            variant="contained"
            onClick={() => {
              dispatch({type : OpenBox,payload : { state: true, formType: "product",row : Row,setRow : setRows} });
            }}
          >
            Add Product
          </Button>
        </Grid>
      </Grid> */}

      {/* Section 1 ends  */}
      <br></br>
      {/* data grid  */}

      <Grid container scaping={2} className="overviewContainer">
        <Grid item p={2} xs={12} sx={{ boxShadow: 2, borderRadius: 5 }}>
          <Typography variant="h6"> Notifications </Typography>
          {/* <br></br> */}
          <DataGridView/>
        </Grid>
      </Grid>
      {/*    
      <Grid sx = {{mt:3}} container scaping={2} className="overviewContainer">
        <Grid item p={2} xs={12} sx={{ boxShadow: 2, borderRadius: 5 }}>
          <Typography variant="h6"> Product List </Typography>
          <br></br>
          {DataGridView(productRow,productCol)}
        </Grid>
      </Grid> */}

      {display.status && SpringModal()}

      {/* data grid ends  */}
    </Box>
  );
}
