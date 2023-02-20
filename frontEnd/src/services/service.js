import axios from "axios";
import config from "../config.json";

const API = config.Official_API;

//  login

export const login = async (data) => {
  return await axios.post(`${API}/login`, data);
};

// =========================== CURD FOR Cetagory ===========================

// for  adding category to the list
export const addCategory = async (data) => {
  return await axios.post(`${API}/addCategory`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

// for list of category
export const categoryList = async (data) => {
  return await axios.get(`${API}/listCategory`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

// for update the category
export const editCategory = async (data) => {
  // console.log(data.ID)
  return await axios.patch(`${API}/editCategory/?ID=${data.ID}`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

// for list the category
export const getCategoryList = async (data) => {
  return await axios.get(`${API}/getCategoryList/?search=${data}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
// for list the category
export const applyDiscount = async (data) => {
  return await axios.post(`${API}/applyDiscount/`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

// // for delete the category
// export const deleteCategory = async (data) => {
//   console.log(data);
//   return await axios.delete(`${API}/deletePrimaryMaterial/?ID=${data}`, {
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem("token")}`,
//     },
//   });
// };

// for status the category
export const statusCategory = async (data) => {
  return await axios.post(`${API}/changeStatusCategory`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

// =========================== CURD FOR PRODUCTS  ===========================

// for  adding category to the list

export const addProduct = async (data) => {
  return await axios.post(`${API}/addProducts`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
// for  adding variation to the product

export const variation = async (data) => {
  return await axios.post(`${API}/variation`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

// for listing the products

export const getListProduct = async (data) => {
  return await axios.get(
    `${API}/getListProduct?filter=${JSON.stringify(data)}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
};

// for deleting the product

export const deleteProduct = async (ID) => {
  return await axios.delete(`${API}/deleteProduct/?ID=${ID}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

// for update the product

export const updateProduct = async (data) => {
  return await axios.patch(`${API}/updateProduct`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

// for getting the last product

export const getLastProduct = async () => {
  return await axios.get(`${API}/getLastProduct`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

// for getHardwareDropdown

export const getHardwareDropdown = async () => {
  return await axios.get(`${API}/getHardwareDropdown`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

// for getting the last product

export const getPresentSKUs = async (data) => {
  return await axios.get(`${API}/getPresentSKUs?search=${data}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

// get product details for display
export const getProductDetails = async (data) => {
  return await axios.get(`${API}/getProductDetails?SKU=${data}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

//  =========================== CURD For Bannner ========================

// add banner

export const addBanner = async (data) => {
  return await axios.post(`${API}/addBanner`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

// list banner

export const listBanner = async () => {
  return await axios.get(`${API}/listBanner`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

// change status banner

export const changeStatus = async (data) => {
  return await axios.patch(`${API}/changeStatusBanner`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

//  =========================== CURD For Sub Categories ========================

export const addSubCategories = async (data) => {
  return await axios.post(`${API}/addSubCategories`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

// list subcategories

export const getSubCatagories = async () => {
  return await axios.get(`${API}/getSubCatagories`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
// change status  subcategories

export const changeSubSatatus = async (data) => {
  return await axios.patch(`${API}/changeSubStatus`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
// change status  subcategories

export const editSubCatagories = async (data) => {
  return await axios.patch(`${API}/editSubCatagories`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

//  =========================== CURD For  Primary Material ========================

export const addPrimaryMaterial = async (data) => {
  return await axios.post(`${API}/addPrimaryMaterial`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

// // list getPrimaryMaterial

export const getPrimaryMaterial = async () => {
  return await axios.get(`${API}/getPrimaryMaterial`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
// change status  changePrimaryMaterialStatus

export const changePrimaryMaterialStatus = async (data) => {
  return await axios.patch(`${API}/changePrimaryMaterialStatus`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
// // change status  subcategories

export const editPrimaryMaterial = async (data) => {
  return await axios.patch(`${API}/editPrimaryMaterial`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

//  =========================== CURD For  Secondary Material ========================

export const addSecondaryMaterial = async (data) => {
  return await axios.post(`${API}/addSecondaryMaterial`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

// // list getSecondaryMaterial

export const getSecondaryMaterial = async () => {
  return await axios.get(`${API}/getSecondaryMaterial`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
// change status  changePrimaryMaterialStatus

export const changeSecondaryMaterialStatus = async (data) => {
  return await axios.patch(`${API}/changeSecondaryMaterialStatus`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
// // change editSecondaryMaterial

export const editSecondaryMaterial = async (data) => {
  return await axios.patch(`${API}/editSecondaryMaterial`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

//  =========================== CURD For  Polish ========================

export const addPolish = async (data) => {
  return await axios.post(`${API}/addPolish`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

// list getSecondaryMaterial

export const getPolish = async () => {
  return await axios.get(`${API}/getPolish`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
// change status  changePrimaryMaterialStatus

export const changePolishStatus = async (data) => {
  return await axios.patch(`${API}/changePolishStatus`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

// change editPolish

export const editPolish = async (data) => {
  return await axios.patch(`${API}/editPolish`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

//  =========================== CURD For  Hinge ========================

export const addHinge = async (data) => {
  return await axios.post(`${API}/addHinge`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

// list getHinge

export const getHinge = async () => {
  return await axios.get(`${API}/getHinge`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
// change status  changeHingeStatus

export const changeHingeStatus = async (data) => {
  return await axios.patch(`${API}/changeHingeStatus`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

// change editPolish

export const editHinge = async (data) => {
  return await axios.patch(`${API}/editHinge`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
//  =========================== CURD For  Hinge ========================

export const addFitting = async (data) => {
  return await axios.post(`${API}/addFitting`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

// list getHinge

export const getFitting = async () => {
  return await axios.get(`${API}/getFitting`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
// change status  changeHingeStatus

export const changeFittingStatus = async (data) => {
  return await axios.patch(`${API}/changeFittingStatus`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

// change editPolish

export const editFitting = async (data) => {
  return await axios.patch(`${API}/editFitting`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
//  =========================== CURD For  Knob ========================

export const addKnob = async (data) => {
  return await axios.post(`${API}/addKnob`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

// list getHinge

export const getKnob = async () => {
  return await axios.get(`${API}/getKnob`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
// change status  changeHingeStatus

export const changeKnobStatus = async (data) => {
  return await axios.patch(`${API}/changeKnobStatus`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

// change editPolish

export const editKnob = async (data) => {
  return await axios.patch(`${API}/editKnob`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
//  =========================== CURD For  Supplier ========================

export const addSupplier = async (data) => {
  return await axios.post(`${API}/addSupplier`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

// list getHinge

export const getSupplier = async () => {
  return await axios.get(`${API}/getSupplier`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
// change status  changeHingeStatus

export const getSupplierDropdown = async (data) => {
  return await axios.get(`${API}/getSupplierDropdown?search=${data}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

// change editPolish

export const editSupplier = async (data) => {
  return await axios.patch(`${API}/editSupplier`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

// change getLastSupplier

export const getLastSupplier = async (data) => {
  return await axios.get(`${API}/getLastSupplier`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

//  =========================== CURD For Handle ========================

export const addHandle = async (data) => {
  return await axios.post(`${API}/addHandle`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

// list getHinge

export const getHandle = async () => {
  return await axios.get(`${API}/getHandle`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
// change status  changeHingeStatus

export const changeHandleStatus = async (data) => {
  return await axios.patch(`${API}/changeHandleStatus`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

// change editPolish

export const editHandle = async (data) => {
  return await axios.patch(`${API}/editHandle`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

// =============== CURD of Gallaery ======================

// get gallery

export const getGallery = async (data) => {
  return await axios.get(`${API}/getGallery/?SKU=${data}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

// delete image

export const deleteImage = async (data) => {
  return await axios.delete(
    `${API}/deleteImage/?SKU=${data.SKU}&imageIndex=${data.imageIndex}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
};

// updateImage

export const updateImage = async (data) => {
  return await axios.patch(`${API}/updateImage`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

// addImage

export const addImage = async (data) => {
  return await axios.post(`${API}/addImage`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

// =============== CURD of Blog ======================

// addImage

export const uploadImage = async (data) => {
  return await axios.post(`${API}/uploadImage`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

// createBlog

export const createBlog = async (data) => {
  return await axios.post(`${API}/createBlog`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

// getBlogHome

export const getBlogHome = async () => {
  return await axios.get(`${API}/getBlogHome`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

// getBlog description

export const getBlog = async (data) => {
  return await axios.get(`${API}/getBlog?uuid=${data}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

// deleteBLog

export const deleteBLog = async (data) => {
  console.log(data);
  return await axios.delete(`${API}/deleteBLog?_id=${data}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

// updateBlog

export const updateBlog = async (data) => {
  return await axios.patch(`${API}/updateBlog`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

// ================== CURD for Draft ==========================

export const getDraft = async (data) => {
  return await axios.get(`${API}/getDraft?filter=${JSON.stringify(data)}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
export const getDraftID = async () => {
  return await axios.get(`${API}/getDraftID`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
export const getMetaDraft = async () => {
  return await axios.get(`${API}/getMetaDraft`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const deleteDraft = async (id) => {
  return await axios.delete(`${API}/deleteDraft?ID=${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const addDraft = async (data) => {
  return await axios.post(`${API}/addDraft`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const getProduct = async () => {
  return await axios.get(`${API}/getProduct`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const getArticlesId = async (data) => {
  return await axios.get(`${API}/getArticlesId?search=${data}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const changeProductStatus = async (data) => {
  return await axios.patch(`${API}/changeProductStatus`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const updateBulk = async (data) => {
  console.log(data);
  return await axios.post(`${API}/updateBulk`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const dropDraft = async (data) => {
  return await axios.post(`${API}/dropDraft`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

// ================== CURD for Fabric ==========================

export const addFabric = async (data) => {
  return await axios.post(`${API}/addFabric`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const editFabric = async (data) => {
  return await axios.patch(`${API}/editFabric`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const getFabric = async () => {
  return await axios.get(`${API}/getFabric`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const changeFabricStatus = async (data) => {
  return await axios.patch(`${API}/changeFabricStatus`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const deleteFabric = async (data) => {
  return await axios.delete(`${API}/deleteFabric?_id=${data}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

// ================== CURD for Textile ==========================

export const addTextile = async (data) => {
  return await axios.post(`${API}/addTextile`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const editTextile = async (data) => {
  return await axios.patch(`${API}/editTextile`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const getTextile = async () => {
  return await axios.get(`${API}/getTextile`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const changeTextileStatus = async (data) => {
  return await axios.patch(`${API}/changeTextileStatus`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const deleteTextile = async (data) => {
  return await axios.delete(`${API}/deleteTextile?_id=${data}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

// =========================== CURD FOR MERGE PRODUCTS  ===========================

// for  adding category to the list

export const addMergeProduct = async (data) => {
  return await axios.post(`${API}/addMergeProduct`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

// for listing the MergeProducts

export const getListMergeProduct = async (data) => {
  return await axios.get(
    `${API}/getListMergeProduct?filter=${JSON.stringify(data)}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
};

// for deleting the MergeProduct

export const deleteMergeProduct = async (ID) => {
  return await axios.delete(`${API}/deleteMergeProduct/?ID=${ID}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

// for update the MergeProduct

export const updateMergeProduct = async (data) => {
  return await axios.patch(`${API}/updateMergeProduct`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

// for getting the last MergeProduct

export const getLastMergeProduct = async () => {
  return await axios.get(`${API}/getLastMergeProduct`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

// =========================== CURD FOR Order PRODUCTS  ===========================

// for  adding order to the list

export const addOrder = async (data) => {
  return await axios.post(`${API}/placeOrder`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

// for  get order list

export const getOrder = async (data) => {
  return await axios.get(`${API}/listOrders?filter=${JSON.stringify(data)}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
// for  get customOrderList list

export const customOrderList = async () => {
  return await axios.get(`${API}/customOrderList`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

// change status
export const changeOrderStatus = async (data) => {
  return await axios.post(`${API}/changeOrderStatus`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

// order ID at last
export const getLastOrder = async () => {
  return await axios.get(`${API}/getLastOrder`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

// cusotm product ID at last
export const getLastCp = async () => {
  return await axios.get(`${API}/getLastCp`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

// add custom product
export const addCustomProduct = async (data) => {
  return await axios.post(`${API}/addCustomProduct`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
// add delete product
export const deleteOrder = async (data) => {
  return await axios.delete(`${API}/deleteOrder?_id=${data}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

// =========================== CURD FOR Customer  ===========================

// for  list customer to the list

export const listCustomer = async () => {
  return await axios.get(`${API}/listCustomer`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

// for  list customer to the list

export const deleteCustomer = async () => {
  return await axios.delete(`${API}/deleteCustomer`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

// change add Customer
export const addCustomer = async (data) => {
  return await axios.post(`${API}/addCustomer`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
//  add Customer
export const updateCustomer = async (data) => {
  return await axios.patch(`${API}/updateCustomer`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
// Catalog Customer
export const customerCatalog = async () => {
  return await axios.get(`${API}/customerCatalog`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

// ================= CURD for Inventory =========================

// add Inward
export const addInward = async (data) => {
  return await axios.post(`${API}/addInward`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
export const addOutward = async (data) => {
  return await axios.post(`${API}/addOutward`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
export const addTransfer = async (data) => {
  return await axios.post(`${API}/addTransfer`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

// for listing the products

export const listEntires = async (data) => {
  return await axios.get(
    `${API}/listEntires?page=${data.page}&limit=${data.pageSize}&type=${data.entires}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
};
// for totalEntries

export const totalEntries = async (data) => {
  return await axios.get(`${API}/totalEntries`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

// update stock
export const updateStock = async (data) => {
  return await axios.patch(`${API}/updateStock`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

// list stock
export const listStock = async () => {
  return await axios.get(`${API}/listStock`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

// list stock
export const preview = async (data) => {
  return await axios.get(`${API}/preview?SKU=${data}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

// delete stock
export const deleteStock = async (data) => {
  return await axios.delete(`${API}/deleteStock?_id=${data}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

//  getStockSKU getting stocked SKUs
export const getStockSKU = async (data) => {
  return await axios.get(
    `${API}/getStockSKU?search=${data.search}&warehouse=${data.warehouse}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
};

// ================== CURD for Hardware ==========================

export const addHardware = async (data) => {
  return await axios.post(`${API}/addHardware`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const editHardware = async (data) => {
  return await axios.patch(`${API}/editHardware`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const getHardware = async () => {
  return await axios.get(`${API}/getHardware`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const changeHardwareStatus = async (data) => {
  return await axios.patch(`${API}/changeHardwareStatus`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const deleteHardware = async (data) => {
  return await axios.delete(`${API}/deleteHardware?_id=${data}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const getLastHardware = async () => {
  return await axios.get(`${API}/getLastHardware`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

// get product details for display
export const getHardwareDetails = async (data) => {
  return await axios.get(`${API}/getHardwareDetails?SKU=${data}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const refreshToken = async (data) => {
  return await axios.post(`${API}/refreshToken`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
// ============== securuty log

export const listLogs = async () => {
  return await axios.get(`${API}/listLogs`);
};

// =============== Pincode

export const uploadPincodeCSV = async (data) => {
  return await axios.post(`${API}/uploadPincodeCSV`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const listPincode = async (data) => {
  return await axios.get(
    `${API}/listPincode?filter=${JSON.stringify(data)}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
};

// for status the category
export const statusDelivery = async (data) => {
  return await axios.post(`${API}/statusDelivery`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

// for delete the delivery
export const deleteDelivery = async (data) => {
  return await axios.delete(`${API}/deleteDelivery/?ID=${data}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

// for Dwnload CSV
export const downloadCSV = async (data) => {
  return await axios.get(`${API}/downloadCSV`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
