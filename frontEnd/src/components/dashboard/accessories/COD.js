import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Grid,
  Button,
  Switch,
  IconButton,
  Link,
  InputAdornment,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
// import '../../../assets/custom/css/review.css'
// import AddIcon from '@mui/icons-material/Add';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { DataGrid } from "@mui/x-data-grid";
import {
  listPincode,
  statusDelivery,
  deleteDelivery,
  downloadCSV,
  addDraft,
  getCOD,
} from "../../../services/service";
import UploadCSV from "../../Utility/UploadCSV";
import { setAlert } from "../../../store/action/action";
import { useDispatch } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { Lock, LockOpen } from "@mui/icons-material";
export default function Pincode() {
  const dispatch = useDispatch();

  const [pageState, setPageState] = useState({
    data: [],
    isLoading: false,
    page: 1,
    limit: 50,
    total: 0,
    pincode: "",
  });
  const [check, setCheck] = useState([]);
  const [value, setValue] = useState({ disabled: true });

  const [uploadBox, setUploadBox] = useState(false);

  // const API = 'http://localhost:8000';
  const API = "https://admin.woodshala.in";

  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    {
      field: "pincode",
      headerName: "PinCode",
      align: "center",
      width: 100,
    },
    // {
    //   field: "city",
    //   headerName: "City",
    //   width: 200,
    // },
    // {
    //   field: "state",
    //   headerName: "State",
    //   width: 100,
    // },
    {
      field: "delivery_status",
      headerName: "COD Available",
      type: "number",
      align: "center",
      width: 150,
      renderCell: (params) => (
        <Switch
          onChange={handleSwitch}
          name={`${params.row.action + " " + (params.row.id - 1)}`}
          checked={check[params.row.id - 1]}
        ></Switch>
      ),
    },
    {
      field: "action",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => (
        <div className="categoryImage">
          <IconButton
            onClick={async () => {
              let response = await deleteDelivery(params.formattedValue);
              if (response) {
                setPageState((old) => ({
                  ...old,
                  data: old.data.filter((row) => {
                    return row.action !== params.formattedValue;
                  }),
                  total: old.total - 1,
                }));
                dispatch(
                  setAlert({
                    open: true,
                    variant: "success",
                    message: "Delivery Deleted !!!",
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

  const handleSwitch = async (e) => {
    console.log(e.target.name);
    // //console.log(check)
    try {
      const id = e.target.name.split(" ");
      const FD = new FormData();

      FD.append("_id", id[0]);
      FD.append("delivery_status", e.target.checked);

      const res = await statusDelivery(FD);

      if (res) {
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
            message: res.data.message,
          })
        );
      }
    } catch (err) {
      //console.log(err)
      dispatch(
        setAlert({
          open: true,
          variant: "error",
          message: "Something went wrong !!!",
        })
      );
    }
  };


  useEffect(()=>{
    fetchCOD();
  },[])

  async function fetchCOD(){
    let COD = await getCOD()

    if(COD)
    {
      setValue(old=>({...old,...COD.data}))
    }
  }

  useEffect(() => {
    fetchData();
  }, [pageState.page, pageState.limit, pageState.filter]);

  // filter search
  useEffect(() => {
    if (pageState.pincode > 99999) fetchData();
    if (pageState.pincode === "") fetchData();
  }, [pageState.pincode]);

  function handleValue(e) {
    if(e.target.name === "max_advance_limit" || e.target.name === "min_advance_limit")
    setValue(old => ({ ...old, [e.target.name]: (e.target.value <= 100 && e.target.value > -1) ? e.target.value : 0}));
    else
    setValue(old => ({ ...old, [e.target.name]: e.target.value > -1 && e.target.value }));
  }

  async function fetchData() {
    try {
      setPageState((lastState) => ({
        ...lastState,
        isLoading: true,
      }));

      let response = await listPincode({
        page: pageState.page,
        limit: pageState.limit,
        total: pageState.total,
        pincode: pageState.pincode,
      });
      if (response) {
        setCheck(
          response.data.data.map((row, index) => {
            return row.delivery_status;
          })
        );
        setPageState((lastState) => ({
          ...lastState,
          data: response.data.data.map((row, index) => {
            return {
              id: index + 1,
              pincode: row.pincode,
              city: row.city,
              state: row.state,
              delivery_status: row.delivery_status,
              action: row._id,
            };
          }),
          isLoading: false,
          total: response.data.total,
        }));
      }
    } catch (err) {
      console.log("error>>", err);
    }
  }

  function DataGridView() {
    return (
      <div style={{ marginTop: "2%", height: 400, width: "100%" }}>
        <DataGrid
          rows={pageState.data}
          rowCount={pageState.total}
          loading={pageState.isLoading}
          rowsPerPageOptions={[10, 30, 50, 70, 100]}
          // filterModel={{
          //     items: [
          //         {
          //             columnField: "pincode",
          //             operatorValue: "=",
          //             value: `${pageState.pincode}`,
          //         },
          //     ],
          // }}
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

  async function handleSubmit(e) {
    try {
      e.preventDefault()
      const FD = new FormData();
      FD.append("DID", '');
      FD.append("AID", "Not Assigned ");
      FD.append("type", "COD");
      FD.append("operation", "applyCOD");
      FD.append('limit_without_advance', value.limit_without_advance)
      FD.append('max_advance_limit', value.max_advance_limit)
      FD.append('min_advance_limit', value.min_advance_limit)

      let res = await addDraft(FD)

      if (res.status === 200) {
        setValue({ disabled: true })
        dispatch(setAlert({
          open: true,
          message: res.data.message,
          variant: 'success'
        }))
      }
    }
    catch (err) {
      console.log(err)
      dispatch(setAlert({
        open: true,
        message: 'Something Went Wrong !!!',
        variant: 'error'
      }))
    }
  }

  return (
    <>
      <Typography component={"span"} sx={{ display: "block" }} variant="h5">
        COD
      </Typography>

      <br></br>

      {/* Section 1  */}


      <Grid
        container
        p={2}
        sx={{
          boxShadow: 1,
          borderRadius: 2,
          justifyContent: "center !important",
          alignItems: "center !important",
          gap: "15px",
        }}
      >
        <Grid item xs={12} md={7.5}>
          <TextField
            fullWidth
            size="small"
            id="demo-helper-text-aligned-no-helper"
            label="Search by pincode"
            onChange={(e) =>
              setPageState((old) => ({ ...old, pincode: e.target.value }))
            }
            type="number"
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <Button
            sx={{ width: "100%" }}
            onClick={() => {
              setUploadBox(true);
            }}
            size="small"
            color="primary"
            startIcon={<CloudUploadIcon />}
            variant="contained"
          >
            Upload CSV
          </Button>
        </Grid>
        <Grid item xs={12} md={2}>
          <Button
            component={Link}
            href={`${API}/api/downloadCSV`}
            sx={{ width: "100%" }}
            onClick={() => {
              dispatch(
                setAlert({
                  variant: "success",
                  message: "CSV will be started soon.",
                  open: "true",
                })
              );
            }}
            size="small"
            color="primary"
            startIcon={<CloudDownloadIcon />}
            variant="contained"
          >
            Download CSV
          </Button>
        </Grid>
      </Grid>

      <UploadCSV uploadBox={uploadBox} setUploadBox={setUploadBox}></UploadCSV>

      {/* Section 1 ends  */}
      <br></br>
      {/* data grid  */}

      <Grid
        container
        scaping={2}
        className="overviewContainer"
        sx={{ justifyContent: "space-between" }}
      >
        <Grid item p={2} xs={5.9} sx={{ boxShadow: 2, borderRadius: 5 }}>
          <Typography component={"span"} variant="h6">
            {" "}
            PinCode{" "}
          </Typography>
          {DataGridView()}
        </Grid>

        {/* // COD Setting  */}
        <Grid
          item
          p={2}
          xs={5.9}
          sx={{ boxShadow: 2, borderRadius: 5, height: "fit-content" }}
        >
          <Grid container sx={{ gap: "1rem" }}>
            <Grid item xs={12} component={"form"} method={"post"}>
              <Typography component={"span"} variant="h6">
                {" "}
                COD Settings
              </Typography>
            </Grid>
            <Grid item xs={12} p={1} component = 'form' method = 'post' encType = {'multipart/form-data'} onSubmit = {handleSubmit}>
              <TextField
                sx={{ marginBottom: 2 }}
                size="small"
                InputProps={{
                  startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                }}
                label="COD Limit"
                fullWidth
                disabled={value.disabled}
                type='number'
                onChange={handleValue}
                value={value.limit_without_advance}
                variant="outlined"
                name="limit_without_advance"
                helperText={'COD limit for without advance?'}
              />
              <TextField
                sx={{ marginBottom: 2 }}
                size="small"
                InputProps={{
                  startAdornment: <InputAdornment position="start">%</InputAdornment>,
                }}
                fullWidth
                type='number'
                disabled={value.disabled}
                onChange={handleValue}
                value={value.max_advance_limit}
                label="Max Advance Limit"
                variant="outlined"
                name="max_advance_limit"
                helperText={'Max advance should be charge above the limit?'}
              />
              <br />

              <TextField
                sx={{ marginBottom: 2 }}

                size="small"
                disabled={value.disabled}
                fullWidth
                type='number'
                onChange={handleValue}
                value={value.min_advance_limit}
                label="Min Advance Limit"
                InputProps={{
                  startAdornment: <InputAdornment position="start">%</InputAdornment>,
                }}
                variant="outlined"
                name="min_advance_limit"
                helperText={'Min advance should be charge above the limit?'}
              />
              <Box
                pt={2}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Button size="small" startIcon={value.disabled ? <Lock /> : <LockOpen />} onClick={() => setValue(old => ({ ...old, disabled: !old.disabled }))} variant="contained">
                  Limits
                </Button>
                <Button size="small" type='submit' variant="outlined">
                  Apply Limits
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* data grid ends  */}
    </>
  );
}
