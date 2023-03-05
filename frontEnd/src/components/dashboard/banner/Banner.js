import React, { useState, useEffect } from "react";
// import PropTypes from 'prop-types';
import {
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Grid,
  Box,
  Button,
} from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import question from "../../../assets/img/question.svg";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { setAlert, setForm } from "../../../store/action/action";
import CreateIcon from "@mui/icons-material/Create";
import { listBanner, addDraft } from "../../../services/service";
import "../../../assets/custom/css/category.css";

import { DataGrid } from "@mui/x-data-grid";

export default function Banner() {
  // context
  const dispatch = useDispatch();
  const [pageState, setPageState] = useState({
    data: [],
    isLoading: false,
    page: 1,
    limit: 10,
    total: 0,
    uuid: undefined,
    title: undefined,
    date: "",
    filter: false,
  });

  async function fetchData() {
    setPageState((lastState) => ({
      ...lastState,
      isLoading: true,
    }));
    listBanner({
      page: pageState.page,
      limit: pageState.limit,
      total: pageState.total,
      uuid: pageState.uuid,
      title: pageState.title,
    })
      .then((data) => {
        setPageState((lastState) => ({
          ...lastState,
          data: data.data.data.map((row, index) => {
            return {
              id: index + 1,
              uuid: row.uuid,
              web_banner: row.web_banner,
              web_url: row.web_url,
              mobile_banner: row.mobile_banner,
              mobile_url: row.mobile_url,
              banner_title: row.banner_title,
              web_banner_status: row.web_banner_status,
              mobile_banner_status: row.mobile_banner_status,
              sequence_no: row.sequence_no,
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

  useEffect(() => {
    fetchData();
  }, [pageState.page, pageState.limit, pageState.filter]);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 50,
    },
    {
      field: "uuid",
      headerName: "UUID",
      width: 150,
    },
    {
      field: "banner_title",
      headerName: "Title",
      width: 150,
    },
    {
      field: "sequence_no",
      headerName: "Sequence No.",
      width: 170,
    },
    {
      field: "web_banner_image",
      align: "center",
      headerName: "Web Banner",
      width: 150,
      renderCell: (params) => (
        <div className="categoryImage">
          {
            <img
              src={
                params.formattedValue !== "undefined"
                  ? params.formattedValue
                  : question
              }
              alt="category"
            />
          }
        </div>
      ),
    },
    {
      field: "mobile_banner_image",
      align: "center",
      headerName: "Mobile Banner",
      width: 150,
      renderCell: (params) => (
        <div className="categoryImage">
          {
            <img
              src={
                params.formattedValue !== "undefined"
                  ? params.formattedValue
                  : question
              }
              alt="category"
            />
          }
        </div>
      ),
    },
    {
      field: "web_banner_status",
      headerName: "Web Status",
      width: 170,
      renderCell: (params) => (
        <div className="categoryImage">
          {params.formattedValue ? "Activated" : "Deactivated"}
        </div>
      ),
    },
    {
      field: "mobile_banner_status",
      headerName: "Mobile Status",
      width: 170,
      renderCell: (params) => (
        <div className="categoryImage">
          {params.formattedValue ? "Activated" : "Deactivated"}
        </div>
      ),
    },

    {
      field: "action",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <div className="categoryImage">
          <IconButton
            onClick={() => {
              dispatch(
                setForm({
                  state: true,
                  formType: "update_banner",
                  payload: params,
                })
              );
            }}
            aria-label="delete"
          >
            <CreateIcon />
          </IconButton>
          <IconButton
            onClick={async () => {
              let res = await addDraft({
                DID: "",
                AID: params.formattedValue.uuid,
                type: "Banner",
                operation: "deleteBanner",
              });

              if (res.status === 200) {
                dispatch(
                  setAlert({
                    open: true,
                    variant: "success",
                    message: res.data.message,
                  })
                );
              } else {
                dispatch(
                  setAlert({
                    open: true,
                    variant: "error",
                    message: res.data.message,
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

  const handleSearch = (e) => {
    return setPageState((old) => ({ ...old, [e.target.name]: e.target.value }));
  };

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
        Banner
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
        <Grid xs={12} md={4}>
          <TextField
            size="small"
            fullWidth
            id="demo-helper-text-aligned-no-helper"
            type="text"
            placeholder="ex:- xxx-xxx-xxx"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">uuid</InputAdornment>
              ),
            }}
            value={pageState.uuid || ""}
            name="uuid"
            onChange={handleSearch}
          />
        </Grid>
        <Grid xs={12} md={6.3}>
          <TextField
            size="small"
            fullWidth
            id="demo-helper-text-aligned-no-helper"
            type="text"
            label="Search by title"
            placeholder="ex:- Banner"
            value={pageState.title || ""}
            name="title"
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

      {/* data grid   */}

      <Grid
        container
        scaping={2}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItem: "center",
        }}
      >
        {/* // listing banners  */}
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
              Banner List{" "}
            </Typography>
            <Button
              startIcon={<AddCircleIcon />}
              onClick={() => {
                dispatch(
                  setForm({
                    state: true,
                    formType: "add_banner",
                    setRow: setPageState,
                  })
                );
              }}
              color="primary"
              variant="contained"
            >
              Add Banner
            </Button>
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
