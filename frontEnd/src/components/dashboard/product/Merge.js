import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  Typography,
  TextField,
  Grid,
  Button,
  IconButton,
  Modal,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
// import AddIcon from "@mui/icons-material/Add";
import {
  getListProduct,
  deleteProduct,
  getListMergeProduct,
  deleteMergeProduct,
} from "../../../services/service";
import MergeIcon from "@mui/icons-material/Merge";
import question from "../../../assets/img/question.svg";
import { DataGrid } from "@mui/x-data-grid";
import { setAlert, setForm } from "../../../store/action/action";
import { useDispatch } from "react-redux";

export default function Products(props) {
  // store
  const dispatch = useDispatch();

  // states
  const [modalState, setModal] = useState(false);
  const [selectedSKU, setSelection] = useState([]);
  const [productUnit, setUnit] = useState([]);

  // page state to controlling the pagination on server side
  const [pageState, setPageState] = useState({
    data: [],
    isLoading: false,
    page: 1,
    limit: 50,
    total: 0,
    title: "",
    category: undefined,
    SKU: undefined,
    subCategory: undefined,
    filter: false,
  });

  const [search, setSearch] = useState({
    P: "",
    MS: "",
  });

  const fetchData = async () => {
    setPageState((lastState) => ({
      ...lastState,
      isLoading: true,
    }));
    const response = await getListMergeProduct({
      page: pageState.page,
      limit: pageState.limit,
      total: pageState.total,
      title: pageState.title,
      category: pageState.category,
      SKU: pageState.SKU,
      subCategory: pageState.subCategory,
    });

    setPageState((lastState) => ({
      ...lastState,
      data: response.data.data.map((row, index) => {
        return {
          id: index + 1,
          M: row.M,
          product_articles: row.product_articles,
          product_title: row.product_title,
          category_name: row.category_name,
          category_id: row.category_id,
          sub_category_name: row.sub_category_name,
          sub_category_id: row.sub_category_id,
          warehouse: row.warehouse,
          warehouse_name: row.warehouse_name,
          bangalore_stock: row.bangalore_stock,
          jodhpur_stock: row.jodhpur_stock,
          product_description: row.product_description,
          product_image: row.product_image,
          featured_image: row.featured_image,
          mannequin_image: row.mannequin_image,
          specification_image: row.specification_image,
          selling_points: row.selling_points,
          selling_price: row.selling_price,
          showroom_price: row.showroom_price,
          discount_limit: row.discount_limit,
          mobile_store: row.mobile_store,
          online_store: row.online_store,
          continue_selling: row.continue_selling,
          COD: row.COD,
          returnDays: row.returnDays,
          returnable: row.returnable,
          polish_time: row.polish_time,
          manufacturing_time: row.manufacturing_time,
          package_length: row.package_length,
          package_height: row.package_height,
          package_breadth: row.package_breadth,
          seo_title: row.seo_title,
          seo_description: row.seo_description,
          seo_keyword: row.seo_keyword,
          action: row._id,
        };
      }),
      isLoading: false,
      total: response.data.total,
      filter: false,
    }));
  };

  useMemo(() => {
    fetchData();
  }, [pageState.page, pageState.limit, pageState.filter]);

  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "M", headerName: "M (Product Id)", width: 100 },
    // {
    //   field: "product_article",
    //   headerName: "Merged Products",
    //   width: 160,
    // },
    {
      field: "featured_image",
      headerName: "Featured Image",
      width: 160,
      align: "center",
      renderCell: (params) => (
        <div className="categoryImage">
          <img src={params.formattedValue || question} alt="featured" />
        </div>
      ),
    },
    {
      field: "specification_image",
      headerName: "Specification Image",
      width: 160,
      align: "center",
      renderCell: (params) => (
        <div className="categoryImage">
          <img src={params.formattedValue || question} alt="featured" />
        </div>
      ),
    },
    {
      field: "product_title",
      headerName: "Product Title",
      width: 300,
    },
    {
      field: "category_name",
      headerName: "Category Name",
      width: 150,
    },
    {
      field: "sub_category_name",
      headerName: "Sub Category Name",

      width: 150,
    },

    {
      field: "action",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <div>
          <IconButton
            onClick={() => {
              dispatch(
                setForm({
                  state: true,
                  formType: "update_merge",
                  payload: params,
                  row: pageState.data,
                  setRow: setPageState,
                })
              );
            }}
            aria-label="update"
          >
            <CreateIcon />
          </IconButton>

          <IconButton
            onClick={async () => {
              let res = await deleteMergeProduct(params.formattedValue);

              if (res.status !== 200) {
                return dispatch(
                  setAlert({
                    open: true,
                    variant: "error",
                    message: "Please provide valid ID !!!",
                  })
                );
              }
              setPageState((old) => ({
                ...old,
                total: old - 1,
                data: old.data.filter((set) => {
                  return set.action !== params.formattedValue;
                }),
              }));

              dispatch(
                setAlert({
                  open: true,
                  variant: "success",
                  message: "Merged Product deleted successfully !!!",
                })
              );
            }}
            aria-label="delete"
          >
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  // data grid for table data

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

  const handleSearch = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  };

  // modal Style
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const handleQuantity = (e) => {
    setUnit({ ...productUnit, [e.target.name]: e.target.value });
  };

  return (
    <Box sx={{ pl: 4, pr: 4 }}>
      {/* <QuantityBox pu={productUnit} su={setUnit} /> */}
      <Modal
        open={modalState}
        onClose={() => {
          setModal(!modalState);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Quantity
          </Typography>
          <Typography id="modal-modal-title" variant="caption" component="span">
            Enter the number of Unit...
          </Typography>
          <Box
            sx={{
              mt: 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            {selectedSKU.map((set) => {
              return (
                <TextField
                  value={productUnit[set.SKU] || ""}
                  fullWidth
                  onChange={handleQuantity}
                  sx={{ p: 0.8, pb: 1 }}
                  size="small"
                  label={set.SKU}
                  type="Number"
                  name={set.SKU}
                />
              );
            })}

            <Box
              sx={{
                mt: 2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Button
                onClick={() => {
                  setModal(false);
                }}
                variant="outlined"
                size="small"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  setModal(false);

                  const unit = selectedSKU.map((row) => {
                    if (productUnit.hasOwnProperty(row.SKU))
                      return { [row.SKU]: productUnit[row.SKU] };
                  });

                  console.log(unit);
                  dispatch(
                    setForm({
                      state: true,
                      formType: "merge_product",
                      payload: selectedSKU,
                      unit: JSON.stringify(unit),
                      // row: MergeRow,
                      // setRow: setMergeRows
                    })
                  );
                  setSelection([]);
                  setUnit([]);
                }}
                variant="contained"
                size="small"
              >
                Merge
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
      <Typography component={"span"} sx={{ display: "block" }} variant="h5">
        Merge Products
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
        <Grid xs={12}>
          <TextField
            fullWidth
            size="small"
            // autoComplete={false}
            id="demo-helper-text-aligned-no-helper"
            label="Search By MS"
            onChange={handleSearch}
            name="MS"
            type="search"
          />
        </Grid>

        {/* <Grid xs={12} md={2.8}>
          <Button
            sx={{ width: "100%" }}
            color="primary"
            startIcon={<AddIcon />}
            variant="contained"
            onClick={() => { dispatch({ type: OpenBox, payload: { state: true, formType: 'product', row: Row, setRow: setRows } }) }}
          >
            Add Product
          </Button>
        </Grid> */}
      </Grid>

      {/* Section 1 ends  */}
      <br></br>
      {/* data grid  */}

      <Grid container scaping={2} className="overviewContainer">
        <Grid item p={2} xs={12} sx={{ boxShadow: 2, borderRadius: 5 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography component={"span"} variant="h6">
              {" "}
              Merge Product List{" "}
            </Typography>
            <Button
              variant="outlined"
              onClick={() => {
                dispatch(
                  setForm({
                    state: true,
                    formType: "merge_product",
                    setRow: setPageState,
                    row: pageState.data,
                  })
                );
              }}
            >
              Merge Product
            </Button>
          </Box>
          <DataGridView/>
        </Grid>
      </Grid>

      {/* data grid ends  */}
    </Box>
  );
}
