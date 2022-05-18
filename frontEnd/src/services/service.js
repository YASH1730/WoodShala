import axios from 'axios';

<<<<<<< HEAD



//  login 

export const login = async(data)=>{
   return await axios.post(`/api/login`,data)
=======
//  login 

export const login = async(data)=>{
   return await axios.post(`/login`,data)
>>>>>>> 320e31090029ca7000e9889b160b1d0157d3d445
  }
 


// =========================== CURD FOR Cetagory ===========================

// for  adding category to the list 
export const addCategory = async(data)=>{
<<<<<<< HEAD
  return await axios.post(`/api/addCategory`,data,{headers: { 
=======
  return await axios.post(`/addCategory`,data,{headers: { 
>>>>>>> 320e31090029ca7000e9889b160b1d0157d3d445
        'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
     }})

}

// for list of category
export const categoryList = async(data) =>{
<<<<<<< HEAD
   return await axios.get(`/api/listCategory`,{headers: { 
=======
   return await axios.get(`/listCategory`,{headers: { 
>>>>>>> 320e31090029ca7000e9889b160b1d0157d3d445
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}

// for update the category
export const editCategory = async(data) =>{
<<<<<<< HEAD
   // console.log(data.ID)
   return await axios.patch(`/api/editCategory/?ID=${data.ID}`,data,{headers: { 
=======
  // console.log(data.ID)
   return await axios.patch(`/editCategory/?ID=${data.ID}`,data,{headers: { 
>>>>>>> 320e31090029ca7000e9889b160b1d0157d3d445
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}

// for delete the category
export const deleteCategory = async(data) =>{
   console.log(data)
<<<<<<< HEAD
   return await axios.delete(`/api/deleteCategory/?ID=${data}`,{headers: { 
=======
   return await axios.delete(`/deleteCategory/?ID=${data}`,{headers: { 
>>>>>>> 320e31090029ca7000e9889b160b1d0157d3d445
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}

// for status the category
export const statusCategory = async(data) =>{
   
<<<<<<< HEAD
   return await axios.post(`/api/changeStatusCategory`,data,{headers: { 
=======
   return await axios.post(`/changeStatusCategory`,data,{headers: { 
>>>>>>> 320e31090029ca7000e9889b160b1d0157d3d445
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}

// =========================== CURD FOR PRODUCTS  ===========================


// for  adding category to the list 

export const addProduct = async(data)=>{
   
<<<<<<< HEAD
   return await axios.post(`/api/addProducts`,data,{headers: { 
=======
   return await axios.post(`/addProducts`,data,{headers: { 
>>>>>>> 320e31090029ca7000e9889b160b1d0157d3d445
         'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
      }})
 
 }

// for listing the products

export const getListProduct = async()=>{
<<<<<<< HEAD
   return await axios.get(`/api/getListProduct`,{headers: { 
=======
   return await axios.get(`/getListProduct`,{headers: { 
>>>>>>> 320e31090029ca7000e9889b160b1d0157d3d445
         'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
      }})
 
 }

// for deleting the product 

export const deleteProduct = async (ID) => {
<<<<<<< HEAD
   return await axios.delete(`/api/deleteProduct/?ID=${ID}`,{headers: { 
=======
   return await axios.delete(`/deleteProduct/?ID=${ID}`,{headers: { 
>>>>>>> 320e31090029ca7000e9889b160b1d0157d3d445
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}

// for update the product 

export const updateProduct = async (data) => { 
<<<<<<< HEAD
   return await axios.patch(`/api/updateProduct`,data,{headers: { 
=======
   return await axios.patch(`/updateProduct`,data,{headers: { 
>>>>>>> 320e31090029ca7000e9889b160b1d0157d3d445
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}


<<<<<<< HEAD
 // for getting the last product 

 export const getLastProduct = async()=>{
   return await axios.get(`/api/getLastProduct`,{headers: { 
=======
// for getting the last product 

 export const getLastProduct = async()=>{
   return await axios.get(`/getLastProduct`,{headers: { 
>>>>>>> 320e31090029ca7000e9889b160b1d0157d3d445
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
 }


//  =========================== CURD For Bannner ========================

// add banner

export const addBanner = async (data)=>{
<<<<<<< HEAD
   return await axios.post(`/api/addBanner`,data,{headers: { 
=======
   return await axios.post(`/addBanner`,data,{headers: { 
>>>>>>> 320e31090029ca7000e9889b160b1d0157d3d445
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}

// list banner

export const listBanner = async ()=>{
<<<<<<< HEAD
   return await axios.get(`/api/listBanner`,{headers: { 
=======
   return await axios.get(`/listBanner`,{headers: { 
>>>>>>> 320e31090029ca7000e9889b160b1d0157d3d445
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}

// change status banner

export const chaneStatus = async (data)=>{
<<<<<<< HEAD
   return await axios.patch(`/api/chaneStatusBanner`,data,{headers: { 
=======
   return await axios.patch(`/chaneStatusBanner`,data,{headers: { 
>>>>>>> 320e31090029ca7000e9889b160b1d0157d3d445
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}


//  =========================== CURD For Sub Categories ========================

export const addSubCategories = async (data)=>{
<<<<<<< HEAD
   return await axios.post(`/api/addSubCategories`,data,{headers: { 
=======
   return await axios.post(`/addSubCategories`,data,{headers: { 
>>>>>>> 320e31090029ca7000e9889b160b1d0157d3d445
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}



// list subcategories

export const getSubCatagories = async ()=>{
<<<<<<< HEAD
   return await axios.get(`/api/getSubCatagories`,{headers: { 
=======
   return await axios.get(`/getSubCatagories`,{headers: { 
>>>>>>> 320e31090029ca7000e9889b160b1d0157d3d445
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}
// change status  subcategories

export const changeSubSatatus = async (data)=>{
<<<<<<< HEAD
   return await axios.patch(`/api/changeSubStatus`,data,{headers: { 
=======
   return await axios.patch(`/changeSubStatus`,data,{headers: { 
>>>>>>> 320e31090029ca7000e9889b160b1d0157d3d445
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}
// change status  subcategories

export const editSubCatagories = async (data)=>{
<<<<<<< HEAD
   return await axios.patch(`/api/editSubCatagories`,data,{headers: { 
=======
   return await axios.patch(`/editSubCatagories`,data,{headers: { 
>>>>>>> 320e31090029ca7000e9889b160b1d0157d3d445
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}

//  =========================== CURD For  Primary Material ========================

export const addPrimaryMaterial = async (data)=>{
<<<<<<< HEAD
   return await axios.post(`/api/addPrimaryMaterial`,data,{headers: { 
=======
   return await axios.post(`/addPrimaryMaterial`,data,{headers: { 
>>>>>>> 320e31090029ca7000e9889b160b1d0157d3d445
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}

<<<<<<< HEAD
// // list getPrimaryMaterial

export const getPrimaryMaterial = async ()=>{
   return await axios.get(`/api/getPrimaryMaterial`,{headers: { 
=======
//// list getPrimaryMaterial

export const getPrimaryMaterial = async ()=>{
   return await axios.get(`/getPrimaryMaterial`,{headers: { 
>>>>>>> 320e31090029ca7000e9889b160b1d0157d3d445
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}
// change status  changePrimaryMaterialStatus

export const changePrimaryMaterialStatus = async (data)=>{
<<<<<<< HEAD
   return await axios.patch(`/api/changePrimaryMaterialStatus`,data,{headers: { 
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}
// // change status  subcategories

export const editPrimaryMaterial = async (data)=>{
   return await axios.patch(`/api/editPrimaryMaterial`,data,{headers: { 
=======
   return await axios.patch(`/changePrimaryMaterialStatus`,data,{headers: { 
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}
//// change status  subcategories

export const editPrimaryMaterial = async (data)=>{
   return await axios.patch(`/editPrimaryMaterial`,data,{headers: { 
>>>>>>> 320e31090029ca7000e9889b160b1d0157d3d445
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}

//  =========================== CURD For  Secondary Material ========================

export const addSecondaryMaterial = async (data)=>{
<<<<<<< HEAD
   return await axios.post(`/api/addSecondaryMaterial`,data,{headers: { 
=======
   return await axios.post(`/addSecondaryMaterial`,data,{headers: { 
>>>>>>> 320e31090029ca7000e9889b160b1d0157d3d445
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}

<<<<<<< HEAD
// // list getSecondaryMaterial

export const getSecondaryMaterial = async ()=>{
   return await axios.get(`/api/getSecondaryMaterial`,{headers: { 
=======
//// list getSecondaryMaterial

export const getSecondaryMaterial = async ()=>{
   return await axios.get(`/getSecondaryMaterial`,{headers: { 
>>>>>>> 320e31090029ca7000e9889b160b1d0157d3d445
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}
// change status  changePrimaryMaterialStatus

export const changeSecondaryMaterialStatus = async (data)=>{
<<<<<<< HEAD
   return await axios.patch(`/api/changeSecondaryMaterialStatus`,data,{headers: { 
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}
// // change editSecondaryMaterial

export const editSecondaryMaterial = async (data)=>{
   return await axios.patch(`/api/editSecondaryMaterial`,data,{headers: { 
=======
   return await axios.patch(`/changeSecondaryMaterialStatus`,data,{headers: { 
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}
//// change editSecondaryMaterial

export const editSecondaryMaterial = async (data)=>{
   return await axios.patch(`/editSecondaryMaterial`,data,{headers: { 
>>>>>>> 320e31090029ca7000e9889b160b1d0157d3d445
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}

//  =========================== CURD For  Polish ========================

export const addPolish = async (data)=>{
<<<<<<< HEAD
   return await axios.post(`/api/addPolish`,data,{headers: { 
=======
   return await axios.post(`/addPolish`,data,{headers: { 
>>>>>>> 320e31090029ca7000e9889b160b1d0157d3d445
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}

// list getSecondaryMaterial

export const getPolish = async ()=>{
<<<<<<< HEAD
   return await axios.get(`/api/getPolish`,{headers: { 
=======
   return await axios.get(`/getPolish`,{headers: { 
>>>>>>> 320e31090029ca7000e9889b160b1d0157d3d445
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}
// change status  changePrimaryMaterialStatus

export const changePolishStatus = async (data)=>{
<<<<<<< HEAD
   return await axios.patch(`/api/changePolishStatus`,data,{headers: { 
=======
   return await axios.patch(`/changePolishStatus`,data,{headers: { 
>>>>>>> 320e31090029ca7000e9889b160b1d0157d3d445
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}

// change editPolish

export const editPolish = async (data)=>{
<<<<<<< HEAD
   return await axios.patch(`/api/editPolish`,data,{headers: { 
=======
   return await axios.patch(`/editPolish`,data,{headers: { 
>>>>>>> 320e31090029ca7000e9889b160b1d0157d3d445
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}

//  =========================== CURD For  Hinge ========================

export const addHinge = async (data)=>{
<<<<<<< HEAD
   return await axios.post(`/api/addHinge`,data,{headers: { 
=======
   return await axios.post(`/addHinge`,data,{headers: { 
>>>>>>> 320e31090029ca7000e9889b160b1d0157d3d445
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}

// list getHinge

export const getHinge = async ()=>{
<<<<<<< HEAD
   return await axios.get(`/api/getHinge`,{headers: { 
=======
   return await axios.get(`/getHinge`,{headers: { 
>>>>>>> 320e31090029ca7000e9889b160b1d0157d3d445
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}
// change status  changeHingeStatus

export const changeHingeStatus = async (data)=>{
<<<<<<< HEAD
   return await axios.patch(`/api/changeHingeStatus`,data,{headers: { 
=======
   return await axios.patch(`/changeHingeStatus`,data,{headers: { 
>>>>>>> 320e31090029ca7000e9889b160b1d0157d3d445
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}

// change editPolish

export const editHinge = async (data)=>{
<<<<<<< HEAD
   return await axios.patch(`/api/editHinge`,data,{headers: { 
=======
   return await axios.patch(`/editHinge`,data,{headers: { 
>>>>>>> 320e31090029ca7000e9889b160b1d0157d3d445
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}
//  =========================== CURD For  Hinge ========================

export const addFitting = async (data)=>{
<<<<<<< HEAD
   return await axios.post(`/api/addFitting`,data,{headers: { 
=======
   return await axios.post(`/addFitting`,data,{headers: { 
>>>>>>> 320e31090029ca7000e9889b160b1d0157d3d445
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}

// list getHinge

export const getFitting = async ()=>{
<<<<<<< HEAD
   return await axios.get(`/api/getFitting`,{headers: { 
=======
   return await axios.get(`/getFitting`,{headers: { 
>>>>>>> 320e31090029ca7000e9889b160b1d0157d3d445
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}
// change status  changeHingeStatus

export const changeFittingStatus = async (data)=>{
<<<<<<< HEAD
   return await axios.patch(`/api/changeFittingStatus`,data,{headers: { 
=======
   return await axios.patch(`/changeFittingStatus`,data,{headers: { 
>>>>>>> 320e31090029ca7000e9889b160b1d0157d3d445
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}

// change editPolish

export const editFitting = async (data)=>{
<<<<<<< HEAD
   return await axios.patch(`/api/editFitting`,data,{headers: { 
=======
   return await axios.patch(`/editFitting`,data,{headers: { 
>>>>>>> 320e31090029ca7000e9889b160b1d0157d3d445
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}
//  =========================== CURD For  Knob ========================

export const addKnob = async (data)=>{
<<<<<<< HEAD
   return await axios.post(`/api/addKnob`,data,{headers: { 
=======
   return await axios.post(`/addKnob`,data,{headers: { 
>>>>>>> 320e31090029ca7000e9889b160b1d0157d3d445
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}

// list getHinge

export const getKnob = async ()=>{
<<<<<<< HEAD
   return await axios.get(`/api/getKnob`,{headers: { 
=======
   return await axios.get(`/getKnob`,{headers: { 
>>>>>>> 320e31090029ca7000e9889b160b1d0157d3d445
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}
// change status  changeHingeStatus

export const changeKnobStatus = async (data)=>{
<<<<<<< HEAD
   return await axios.patch(`/api/changeKnobStatus`,data,{headers: { 
=======
   return await axios.patch(`/changeKnobStatus`,data,{headers: { 
>>>>>>> 320e31090029ca7000e9889b160b1d0157d3d445
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}

// change editPolish

export const editKnob = async (data)=>{
<<<<<<< HEAD
   return await axios.patch(`/api/editKnob`,data,{headers: { 
=======
   return await axios.patch(`/editKnob`,data,{headers: { 
>>>>>>> 320e31090029ca7000e9889b160b1d0157d3d445
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}
//  =========================== CURD For  Door ========================

export const addDoor = async (data)=>{
<<<<<<< HEAD
   return await axios.post(`/api/addDoor`,data,{headers: { 
=======
   return await axios.post(`/addDoor`,data,{headers: { 
>>>>>>> 320e31090029ca7000e9889b160b1d0157d3d445
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}

// list getHinge

export const getDoor = async ()=>{
<<<<<<< HEAD
   return await axios.get(`/api/getDoor`,{headers: { 
=======
   return await axios.get(`/getDoor`,{headers: { 
>>>>>>> 320e31090029ca7000e9889b160b1d0157d3d445
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}
// change status  changeHingeStatus

export const changeDoorStatus = async (data)=>{
<<<<<<< HEAD
   return await axios.patch(`/api/changeDoorStatus`,data,{headers: { 
=======
   return await axios.patch(`/changeDoorStatus`,data,{headers: { 
>>>>>>> 320e31090029ca7000e9889b160b1d0157d3d445
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}

// change editPolish

export const editDoor = async (data)=>{
<<<<<<< HEAD
   return await axios.patch(`/api/editDoor`,data,{headers: { 
=======
   return await axios.patch(`/editDoor`,data,{headers: { 
>>>>>>> 320e31090029ca7000e9889b160b1d0157d3d445
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}

//  =========================== CURD For Handle ========================

export const addHandle = async (data)=>{
<<<<<<< HEAD
   return await axios.post(`/api/addHandle`,data,{headers: { 
=======
   return await axios.post(`/addHandle`,data,{headers: { 
>>>>>>> 320e31090029ca7000e9889b160b1d0157d3d445
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}

// list getHinge

export const getHandle = async ()=>{
<<<<<<< HEAD
   return await axios.get(`/api/getHandle`,{headers: { 
=======
   return await axios.get(`/getHandle`,{headers: { 
>>>>>>> 320e31090029ca7000e9889b160b1d0157d3d445
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}
// change status  changeHingeStatus

export const changeHandleStatus = async (data)=>{
<<<<<<< HEAD
   return await axios.patch(`/api/changeHandleStatus`,data,{headers: { 
=======
   return await axios.patch(`/changeHandleStatus`,data,{headers: { 
>>>>>>> 320e31090029ca7000e9889b160b1d0157d3d445
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}

// change editPolish

export const editHandle = async (data)=>{
<<<<<<< HEAD
   return await axios.patch(`/api/editHandle`,data,{headers: { 
=======
   return await axios.patch(`/editHandle`,data,{headers: { 
>>>>>>> 320e31090029ca7000e9889b160b1d0157d3d445
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}


// =============== CURD of Gallaery ======================

// get gallery

export const getGallery = async (data)=>{
<<<<<<< HEAD
   return await axios.get(`/api/getGallery/?SKU=${data}`,{headers: { 
=======
   return await axios.get(`/getGallery/?SKU=${data}`,{headers: { 
>>>>>>> 320e31090029ca7000e9889b160b1d0157d3d445
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`}})
      
   }

// delete image

export const deleteImage = async (data)=>{
<<<<<<< HEAD
   return await axios.delete(`/api/deleteImage/?SKU=${data.SKU}&imageIndex=${data.imageIndex}`,{headers: { 
=======
   return await axios.delete(`/deleteImage/?SKU=${data.SKU}&imageIndex=${data.imageIndex}`,{headers: { 
>>>>>>> 320e31090029ca7000e9889b160b1d0157d3d445
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`}})
      
   }

// updateImage

export const updateImage =async (data)=>{
<<<<<<< HEAD
   return await axios.patch(`/api/updateImage`,data,{headers: { 
=======
   return await axios.patch(`/updateImage`,data,{headers: { 
>>>>>>> 320e31090029ca7000e9889b160b1d0157d3d445
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`}})
      
   }

// addImage

export const addImage =async (data)=>{
<<<<<<< HEAD
   return await axios.post(`/api/addImage`,data,{headers: { 
=======
   return await axios.post(`/addImage`,data,{headers: { 
>>>>>>> 320e31090029ca7000e9889b160b1d0157d3d445
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`}})
      
   }