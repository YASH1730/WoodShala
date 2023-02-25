import {
  Autocomplete,
  Backdrop,
  Box,
  Button,
  Fade,
  Grid,
  IconButton,
  Modal,
  Rating,
  Switch,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useMemo, useCallback } from "react";
import "../../../assets/custom/css/review.css";
import {
  addReply,
  getArticlesId,
  getReview,
  statusReview,
  deleteReview,
  metaReview,
} from "../../../services/service";
// redux
import { setAlert, setForm } from "../../../store/action/action";
import { useDispatch, useSelector } from "react-redux";
//icon
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useConfirm } from "material-ui-confirm";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";
import ReviewsIcon from "@mui/icons-material/Reviews";
//datagrid
import { DataGrid } from "@mui/x-data-grid";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  borderRadius: "15px",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
};

const Review = () => {
  const [search, setSearch] = useState("");
  const [check, setCheck] = useState([]);
  const [productSKU, setProductSKU] = useState({
    P_SKU: [],
    H_SKU: [],
  });
  // page state to controlling the pagination on server side
  const [pageState, setPageState] = useState({
    data: [],
    isLoading: false,
    page: 1,
    limit: 50,
    total: 0,
    product_id: "",
    total_review: 0,
    active_review: 0,
    hide_review: 0,
  });

  // state for reply
  const [replyState, setReplyState] = useState({
    open: false,
    customer: [],
    admin: [],
    ID: "",
  });

  const confirm = useConfirm();

  const option = {
    labels: {
      confirmable: "Proceed",
      cancellable: "Cancel",
    },
  };

  // confirmBox
  const confirmBox = (e, action, id) => {
    e.preventDefault();

    confirm({ description: `Review will be removed from Database !!!` }, option)
      .then(async () => {
        let res = await action(id);

        if (res) {
          setPageState((old) => ({
            ...old,
            data: old.data.filter((row) => {
              return row.action._id !== id;
            }),
            total: old.total - 1,
          }));
          dispatch(
            setAlert({
              open: true,
              variant: "success",
              message: res.data.message,
            })
          );
        }
      })
      .catch((err) => {
        console.log("Operation cancelled because. ", err);
      });
  };

  const dispatch = useDispatch();

  async function fetchData() {
    try {
      setPageState((lastState) => ({
        ...lastState,
        isLoading: true,
      }));
      let data = await getReview({
        page: pageState.page,
        limit: pageState.limit,
        total: pageState.total,
        product_id: pageState.product_id,
      });
      if (data) {
        setCheck(
          data.data.data.map((row, index) => {
            // console.log(row);
            return row.hide;
          })
        );
        setPageState((lastState) => ({
          ...lastState,
          data: data.data.data.map((row, index) => {
            return {
              id: index + 1,
              CID: row.CID,
              product_id: row.product_id,
              rating: row.rating,
              review: row.review,
              admin_reply: row.admin_reply,
              review_title: row.review_title,
              review_images: row.review_images,
              review_videos: row.review_videos,
              yourTube_url: row.yourTube_url,
              reviewer_name: row.reviewer_name,
              reviewer_email: row.reviewer_email,
              hide: row.hide,
              date: row.date,
              action: row,
            };
          }),
          isLoading: false,
          total: data.data.total,
          filter: false,
          total_review: data.data.total,
          active_review: data.data.active,
          hide_review: data.data.hide,
        }));
      }
    } catch (err) {
      console.log("err>>", err);
    }
  }

  useMemo(() => {
    fetchData();
  }, [pageState.page, pageState.limit, pageState.filter]);

  useMemo(() => {
    metaReview().then((data) => {
      // console.log(data);
      setPageState((old) => ({
        ...old,
        total_review: data.data.total,
        active_review: data.data.active,
        hide_review: data.data.hide,
      }));
    });
  }, [pageState.data, check]);

  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "CID", headerName: "CID", width: 100 },
    {
      field: "hide",
      headerName: "Status",
      width: 100,
      renderCell: (params) => (
        <Switch
          onChange={handleSwitch}
          name={`${params.row.action._id + " " + (params.row.id - 1)}`}
          checked={check[params.row.id - 1]}
        ></Switch>
      ),
    },
    {
      field: "product_id",
      headerName: "Product ID",
      width: 100,
    },
    {
      field: "reviewer_name",
      headerName: "Name",
      width: 150,
    },
    {
      field: "reviewer_email",
      headerName: "Email",
      width: 150,
    },
    {
      field: "rating",
      headerName: "Rating",
      width: 150,
      renderCell: (params) => (
        <Rating
          readOnly
          value={parseInt(params.formattedValue)}
          precision={0.5}
        />
      ),
    },
    {
      field: "review_title",
      headerName: "Review Title",

      width: 110,
    },
    {
      field: "review",
      headerName: "Review",

      width: 110,
    },
    {
      field: "yourTube_url",
      headerName: "Your Tube",
      width: 110,
    },

    {
      field: "date",
      headerName: "Review At",
      width: 110,
    },

    {
      field: "action",
      headerName: "Actions",
      width: 250,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: "5px" }}>
          {/* // update  */}
          <Tooltip title="Update">
            <IconButton
              onClick={() => {
                //console.log(params)

                dispatch(
                  setForm({
                    state: true,
                    formType: "update_review",
                    payload: params,
                    setRow: setPageState,
                  })
                );
              }}
              aria-label="update"
            >
              <CreateIcon />
            </IconButton>
          </Tooltip>

          {/* reply */}
          {/* <Tooltip title="Reply">
            <IconButton
              onClick={() => {
                setReplyState((old) => ({
                  ...old,
                  open: true,
                  customer: params.formattedValue.review,
                  admin: params.formattedValue.admin_reply,
                  ID: params.formattedValue._id,
                }));
              }}
              aria-label="update"
            >
              <SendIcon />
            </IconButton>
          </Tooltip> */}

          {/* // ============== delete product */}
          <Tooltip title="Delete">
            <IconButton
              onClick={(e) => {
                confirmBox(e, deleteReview, params.formattedValue._id);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  const handleSwitch = (e) => {
    console.log(e.target.name);
    console.log(check);

    const id = e.target.name.split(" ");
    const FD = new FormData();

    FD.append("_id", id[0]);
    FD.append("hide", e.target.checked);

    const res = statusReview(FD);

    res
      .then((data) => {
        setCheck(
          check.map((row, index) => {
            // //console.log(parseInt(id[1]) === index)
            if (parseInt(id[1]) === index) return !row;
            else return row;
          })
        );

        dispatch(
          setAlert({
            open: true,
            variant: "success",
            message: "Review Status Updated Successfully !!!",
          })
        );
      })
      .catch((err) => {
        //console.log(err)
        dispatch(
          setAlert({
            open: true,
            variant: "error",
            message: "Something went wrong !!!",
          })
        );
      });
  };

  function DataGridView() {
    return (
      <div style={{ marginTop: "2%", height: 400, width: "100%" }}>
        <DataGrid
          rows={pageState.data}
          rowCount={pageState.total}
          loading={pageState.isLoading}
          rowsPerPageOptions={[10, 30, 50, 70, 100]}
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

  async function handleSearch(e) {
    const delayDebounceFn = setTimeout(() => {
      getArticlesId(e.target.value)
        .then((res) => {
          setProductSKU((old) => ({
            ...old,
            P_SKU: res.data.P_SKU,
            H_SKU: res.data.H_SKU,
          }));
        })
        .catch((err) => {
          setProductSKU((old) => ({
            ...old,
            P_SKU: [],
            H_SKU: [],
          }));
        });
    }, 1000);
    return () => clearTimeout(delayDebounceFn);
  }

  return (
    <Box sx={{ pl: 4, pr: 4 }}>
      <Typography component={"span"} sx={{ display: "block" }} variant="h5">
        Review
      </Typography>
      {/* Meta Card  */}
      <Grid container className="reviewMeta" p={2}>
        <Grid
          className="reviewMetaItem"
          sx={{ backgroundColor: "#7f5cf7ab" }}
          item
          xs={12}
          md={3.8}
        >
          <ReviewsIcon />
          <Typography variant="h4">Total</Typography>
          <Typography variant="h6">{pageState.total_review}</Typography>
        </Grid>
        <Grid
          className="reviewMetaItem"
          sx={{ backgroundColor: "#0091ff8c" }}
          item
          xs={12}
          md={3.8}
        >
          <DoneIcon />
          <Typography variant="h4">Active</Typography>
          <Typography variant="h6">{pageState.active_review}</Typography>
        </Grid>
        <Grid
          className="reviewMetaItem"
          sx={{ backgroundColor: "#f73b3bb5" }}
          item
          xs={12}
          md={3.8}
        >
          <ClearIcon />
          <Typography variant="h4">Hide</Typography>
          <Typography variant="h6">{pageState.hide_review}</Typography>
        </Grid>
      </Grid>
      {/* Meta Card Ends  */}

      {/* Select Product  */}
      <Grid
        mt={1}
        container
        p={2}
        sx={{
          boxShadow: 1,
          borderRadius: 2,
          justifyContent: "space-between",
          alignItems: "center ",
          gap: "10px",
        }}
      >
        <Grid item xs={12} md={7.8}>
          <Autocomplete
            freeSolo
            size="small"
            fullWidth
            noOptionsText={"ex : P-01001"}
            autoHighlight
            disableClearable
            id="combo-box-demo"
            options={productSKU.P_SKU.map((row) => {
              return row.SKU;
            })}
            renderInput={(params) => (
              <TextField
                onKeyUpCapture={handleSearch}
                value={search || ""}
                {...params}
                label="Product SKU"
                onChange={(e) => {
                  setPageState((old) => ({
                    ...old,
                    product_id: e.target.value,
                  }));
                }}
              />
            )}
            onChange={(e, newMember) => {
              console.log(newMember);
              setPageState((old) => ({ ...old, product_id: newMember }));
            }}
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <Button
            fullWidth
            variant="contained"
            startIcon={<VisibilityIcon />}
            onClick={fetchData}
          >
            Show Reviews
          </Button>
        </Grid>
        <Grid item xs={12} md={2}>
          <Button
            fullWidth
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() =>
              dispatch(
                setForm({
                  state: true,
                  formType: "review",
                  setRow: setPageState,
                  row: pageState,
                  setCheck: setCheck,
                })
              )
            }
          >
            Add Review
          </Button>
        </Grid>
      </Grid>
      {/* Select Product Ends */}

      {/* data grid  */}
      {/* <br></br> */}
      <Grid container mt={2} className="overviewContainer">
        <Grid item p={2} xs={12} md={12} sx={{ boxShadow: 2, borderRadius: 5 }}>
          <Typography component={"span"} variant="h6">
            {" "}
            Review List{" "}
          </Typography>

          {DataGridView()}
        </Grid>
      </Grid>

      {/* data grid ends  */}

      {/* reply */}
      {/* <ReplyModal state={replyState} setState={setReplyState} /> */}
      {/* reply ends */}
    </Box>
  );
};

// function Conversation({ admin, customer }) {
//   return (
//     <Box className="displayScreen">
//       {[...customer, ...admin]
//         .sort((a, b) => {
//           return new Date(a.date) - new Date(b.date);
//         })
//         .map((row, index) => {
//           return (
//             <Box
//               className={customer.includes(row) ? "message" : "message right"}
//             >
//               {console.log(customer.includes(row))}
//               <Typography sx={{ display: "block" }} variant="body1">
//                 {row.message}
//               </Typography>
//               <Typography sx={{ fontSize: "0.6rem !important" }}>
//                 {row.time}
//               </Typography>
//             </Box>
//           );
//         })}
//     </Box>
//   );
// }

// function ReplyModal({ state, setState }) {
//   const handleClose = () => setState((old) => ({ ...old, open: false }));

//   // getting current data
//   function getTime() {
//     const currentDate = new Date();
//     const date =
//       currentDate.getDate() +
//       "/" +
//       (currentDate.getMonth() + 1) +
//       "/" +
//       currentDate.getFullYear() +
//       " @ " +
//       currentDate.getHours() +
//       ":" +
//       currentDate.getMinutes() +
//       ":" +
//       currentDate.getSeconds();

//     return date;
//   }

//   async function handleSubmit(e) {
//     e.preventDefault();
//     try {
//       console.log(e.target.reply.value);

//       let data = {
//         message: e.target.reply.value,
//         time: getTime(),
//         date: new Date(),
//       };

//       const FD = new FormData();
//       FD.append("reply", JSON.stringify([data]));
//       FD.append("_id", state.ID);

//       let res = await addReply(FD);

//       if (res.status === 200) {
//         setState((old) => ({
//           ...old,
//           admin: [...old.admin, data],
//         }));
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   return (
//     <div>
//       <Modal
//         aria-labelledby="transition-modal-title"
//         aria-describedby="transition-modal-description"
//         open={state.open}
//         onClose={handleClose}
//         closeAfterTransition
//         BackdropComponent={Backdrop}
//         BackdropProps={{
//           timeout: 500,
//         }}
//       >
//         <Fade in={state.open}>
//           <Box sx={style}>
//             <Typography id="transition-modal-title" variant="h6" component="h2">
//               Reply Box
//             </Typography>
//             <Box
//               className="messageContainer"
//               component={"form"}
//               onSubmit={handleSubmit}
//               method="post"
//               action=""
//             >
//               <Grid container className="innerMessageContainer">
//                 <Grid xs={12}>
//                   <Conversation customer={state.customer} admin={state.admin} />
//                 </Grid>
//                 <Grid xs={9.5} className="messageField">
//                   <TextField
//                     fullWidth
//                     size="small"
//                     label="Reply"
//                     type="text"
//                     name="reply"
//                     variant="outlined"
//                   ></TextField>
//                 </Grid>
//                 <Grid xs={2} className="sendButton">
//                   <Button
//                     fullWidth
//                     color="primary"
//                     variant="contained"
//                     size="small"
//                     type="submit"
//                     endIcon={<SendIcon />}
//                   >
//                     Send
//                   </Button>
//                 </Grid>
//               </Grid>
//             </Box>
//           </Box>
//         </Fade>
//       </Modal>
//     </div>
//   );
// }

export default Review;
