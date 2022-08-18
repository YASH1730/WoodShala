
import axios from "axios";


const localURL = "http://localhost:8000/api";
const official = "http://157.245.102.136/api";

//  login

export const login = async (data) => {
  return await axios.post(`${official}/login`, data);
};

// =========================== CURD FOR Cetagory ===========================

// for  adding category to the list
export const addCategory = async (data) => {
  return await axios.post(`${official}/addCategory`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

// for list of category
export const categoryList = async (data) => {
  return await axios.get(`${official}/listCategory`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

// for update the category
export const editCategory = async (data) => {
  // console.log(data.ID)
  return await axios.patch(`${official}/editCategory/?ID=${data.ID}`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

// for delete the category
export const deleteCategory = async (data) => {
  console.log(data);
  return await axios.delete(`${official}/deleteCategory/?ID=${data}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

// for status the category
export const statusCategory = async (data) => {
  return await axios.post(`${official}/changeStatusCategory`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

// =========================== CURD FOR PRODUCTS  ===========================

// for  adding category to the list

export const addProduct = async (data) => {
  return await axios.post(`${official}/addProducts`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

// for listing the products

export const getListProduct = async () => {
  return await axios.get(`${official}/getListProduct`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

// for deleting the product

export const deleteProduct = async (ID) => {
  return await axios.delete(`${official}/deleteProduct/?ID=${ID}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

// for update the product

export const updateProduct = async (data) => {
  return await axios.patch(`${official}/updateProduct`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

// for getting the last product

export const getLastProduct = async () => {
  return await axios.get(`${official}/getLastProduct`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

// for getting the last product

export const getPresentSKUs = async () => {
  return await axios.get(`${official}/getPresentSKUs`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

//  =========================== CURD For Bannner ========================

// add banner

export const addBanner = async (data) => {
  return await axios.post(`${official}/addBanner`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

// list banner

export const listBanner = async () => {
  return await axios.get(`${official}/listBanner`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

// change status banner

export const changeStatus = async (data) => {
  return await axios.patch(`${official}/changeStatusBanner`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

//  =========================== CURD For Sub Categories ========================

export const addSubCategories = async (data) => {
  return await axios.post(`${official}/addSubCategories`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

// list subcategories

export const getSubCatagories = async () => {
  return await axios.get(`${official}/getSubCatagories`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};
// change status  subcategories

export const changeSubSatatus = async (data) => {
  return await axios.patch(`${official}/changeSubStatus`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};
// change status  subcategories

export const editSubCatagories = async (data) => {
  return await axios.patch(`${official}/editSubCatagories`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

//  =========================== CURD For  Primary Material ========================

export const addPrimaryMaterial = async (data) => {
  return await axios.post(`${official}/addPrimaryMaterial`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

// // list getPrimaryMaterial

export const getPrimaryMaterial = async () => {
  return await axios.get(`${official}/getPrimaryMaterial`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};
// change status  changePrimaryMaterialStatus

export const changePrimaryMaterialStatus = async (data) => {
  return await axios.patch(`${official}/changePrimaryMaterialStatus`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};
// // change status  subcategories

export const editPrimaryMaterial = async (data) => {
  return await axios.patch(`${official}/editPrimaryMaterial`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

//  =========================== CURD For  Secondary Material ========================

export const addSecondaryMaterial = async (data) => {
  return await axios.post(`${official}/addSecondaryMaterial`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

// // list getSecondaryMaterial

export const getSecondaryMaterial = async () => {
  return await axios.get(`${official}/getSecondaryMaterial`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};
// change status  changePrimaryMaterialStatus

export const changeSecondaryMaterialStatus = async (data) => {
  return await axios.patch(`${official}/changeSecondaryMaterialStatus`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};
// // change editSecondaryMaterial

export const editSecondaryMaterial = async (data) => {
  return await axios.patch(`${official}/editSecondaryMaterial`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

//  =========================== CURD For  Polish ========================

export const addPolish = async (data) => {
  return await axios.post(`${official}/addPolish`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

// list getSecondaryMaterial

export const getPolish = async () => {
  return await axios.get(`${official}/getPolish`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};
// change status  changePrimaryMaterialStatus

export const changePolishStatus = async (data) => {
  return await axios.patch(`${official}/changePolishStatus`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

// change editPolish

export const editPolish = async (data) => {
  return await axios.patch(`${official}/editPolish`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

//  =========================== CURD For  Hinge ========================

export const addHinge = async (data) => {
  return await axios.post(`${official}/addHinge`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

// list getHinge

export const getHinge = async () => {
  return await axios.get(`${official}/getHinge`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};
// change status  changeHingeStatus

export const changeHingeStatus = async (data) => {
  return await axios.patch(`${official}/changeHingeStatus`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

// change editPolish

export const editHinge = async (data) => {
  return await axios.patch(`${official}/editHinge`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};
//  =========================== CURD For  Hinge ========================

export const addFitting = async (data) => {
  return await axios.post(`${official}/addFitting`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

// list getHinge

export const getFitting = async () => {
  return await axios.get(`${official}/getFitting`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};
// change status  changeHingeStatus

export const changeFittingStatus = async (data) => {
  return await axios.patch(`${official}/changeFittingStatus`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

// change editPolish

export const editFitting = async (data) => {
  return await axios.patch(`${official}/editFitting`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};
//  =========================== CURD For  Knob ========================

export const addKnob = async (data) => {
  return await axios.post(`${official}/addKnob`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

// list getHinge

export const getKnob = async () => {
  return await axios.get(`${official}/getKnob`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};
// change status  changeHingeStatus

export const changeKnobStatus = async (data) => {
  return await axios.patch(`${official}/changeKnobStatus`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

// change editPolish

export const editKnob = async (data) => {
  return await axios.patch(`${official}/editKnob`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};
//  =========================== CURD For  Door ========================

export const addDoor = async (data) => {
  return await axios.post(`${official}/addDoor`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

// list getHinge

export const getDoor = async () => {
  return await axios.get(`${official}/getDoor`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};
// change status  changeHingeStatus

export const changeDoorStatus = async (data) => {
  return await axios.patch(`${official}/changeDoorStatus`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

// change editPolish

export const editDoor = async (data) => {
  return await axios.patch(`${official}/editDoor`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

//  =========================== CURD For Handle ========================

export const addHandle = async (data) => {
  return await axios.post(`${official}/addHandle`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

// list getHinge

export const getHandle = async () => {
  return await axios.get(`${official}/getHandle`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};
// change status  changeHingeStatus

export const changeHandleStatus = async (data) => {
  return await axios.patch(`${official}/changeHandleStatus`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

// change editPolish

export const editHandle = async (data) => {
  return await axios.patch(`${official}/editHandle`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

// =============== CURD of Gallaery ======================

// get gallery

export const getGallery = async (data) => {
  return await axios.get(`${official}/getGallery/?SKU=${data}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

// delete image

export const deleteImage = async (data) => {
  return await axios.delete(
    `${official}/deleteImage/?SKU=${data.SKU}&imageIndex=${data.imageIndex}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
      },
    }
  );
};

// updateImage

export const updateImage = async (data) => {
  return await axios.patch(`${official}/updateImage`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

// addImage

export const addImage = async (data) => {
  return await axios.post(`${official}/addImage`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

// =============== CURD of Blog ======================

// addImage

export const uploadImage = async (data) => {
  return await axios.post(`${official}/uploadImage`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

// createBlog

export const createBlog = async (data) => {
  return await axios.post(`${official}/createBlog`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

// getBlogHome

export const getBlogHome = async () => {
  return await axios.get(`${official}/getBlogHome`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

// getBlog description

export const getBlog = async (data) => {
  return await axios.get(`${official}/getBlog?uuid=${data}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

// deleteBLog

export const deleteBLog = async (data) => {
  return await axios.delete(`${official}/deleteBLog?_id=${data}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

// updateBlog

export const updateBlog = async (data) => {
  return await axios.patch(`${official}/updateBlog`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

// ================== CURD for Draft ==========================

export const getDraft = async () => {
  return await axios.get(`${official}/getDraft`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

export const changeProductStatus = async (data) => {
  return await axios.patch(`${official}/changeProductStatus`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

export const updateBulk = async (data) => {
  console.log(data)
  return await axios.post(`${official}/updateBulk`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

// ================== CURD for Fabric ==========================

export const addFabric = async (data) => {
  return await axios.post(`${official}/addFabric`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

export const editFabric = async (data) => {
  return await axios.patch(`${official}/editFabric`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

export const getFabric = async () => {
  return await axios.get(`${official}/getFabric`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

export const changeFabricStatus = async (data) => {
  return await axios.patch(`${official}/changeFabricStatus`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

export const deleteFabric = async (data) => {
  return await axios.delete(`${official}/deleteFabric?_id=${data}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

// ================== CURD for Textile ==========================

export const addTextile = async (data) => {
  return await axios.post(`${official}/addTextile`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

export const editTextile = async (data) => {
  return await axios.patch(`${official}/editTextile`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

export const getTextile = async () => {
  return await axios.get(`${official}/getTextile`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

export const changeTextileStatus = async (data) => {
  return await axios.patch(`${official}/changeTextileStatus`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

export const deleteTextile = async (data) => {
  return await axios.delete(`${official}/deleteTextile?_id=${data}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

// =========================== CURD FOR MERGE PRODUCTS  ===========================

// for  adding category to the list

export const addMergeProduct = async (data) => {
  return await axios.post(`${official}/addMergeProduct`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

// for listing the MergeProducts

export const getListMergeProduct = async () => {
  return await axios.get(`${official}/getListMergeProduct`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

// for deleting the MergeProduct

export const deleteMergeProduct = async (ID) => {
  return await axios.delete(`${official}/deleteMergeProduct/?ID=${ID}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

// for update the MergeProduct

export const updateMergeProduct = async (data) => {
  return await axios.patch(`${official}/updateMergeProduct`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

// for getting the last MergeProduct

export const getLastMergeProduct = async () => {
  return await axios.get(`${official}/getLastMergeProduct`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

// =========================== CURD FOR MERGE PRODUCTS  ===========================

// for  adding category to the list

export const getOrder = async () => {
  return await axios.get(`${official}/listOrders`,{
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

// change status 
export const changeOrderStatus = async (data) => {
  return await axios.post(`${official}/changeOrderStatus`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};