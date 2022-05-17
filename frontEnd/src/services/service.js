import axios from 'axios';

//  login 

export const login = async(data)=>{
   return await axios.post(`/login`,data)
  }
 


// =========================== CURD FOR Cetagory ===========================

// for  adding category to the list 
export const addCategory = async(data)=>{
  return await axios.post(`/addCategory`,data,{headers: { 
        'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
     }})

}

// for list of category
export const categoryList = async(data) =>{
   return await axios.get(`/listCategory`,{headers: { 
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}

// for update the category
export const editCategory = async(data) =>{
  // console.log(data.ID)
   return await axios.patch(`/editCategory/?ID=${data.ID}`,data,{headers: { 
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}

// for delete the category
export const deleteCategory = async(data) =>{
   console.log(data)
   return await axios.delete(`/deleteCategory/?ID=${data}`,{headers: { 
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}

// for status the category
export const statusCategory = async(data) =>{
   
   return await axios.post(`/changeStatusCategory`,data,{headers: { 
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}

// =========================== CURD FOR PRODUCTS  ===========================


// for  adding category to the list 

export const addProduct = async(data)=>{
   
   return await axios.post(`/addProducts`,data,{headers: { 
         'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
      }})
 
 }

// for listing the products

export const getListProduct = async()=>{
   return await axios.get(`/getListProduct`,{headers: { 
         'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
      }})
 
 }

// for deleting the product 

export const deleteProduct = async (ID) => {
   return await axios.delete(`/deleteProduct/?ID=${ID}`,{headers: { 
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}

// for update the product 

export const updateProduct = async (data) => { 
   return await axios.patch(`/updateProduct`,data,{headers: { 
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}


// for getting the last product 

 export const getLastProduct = async()=>{
   return await axios.get(`/getLastProduct`,{headers: { 
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
 }


//  =========================== CURD For Bannner ========================

// add banner

export const addBanner = async (data)=>{
   return await axios.post(`/addBanner`,data,{headers: { 
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}

// list banner

export const listBanner = async ()=>{
   return await axios.get(`/listBanner`,{headers: { 
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}

// change status banner

export const chaneStatus = async (data)=>{
   return await axios.patch(`/chaneStatusBanner`,data,{headers: { 
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}


//  =========================== CURD For Sub Categories ========================

export const addSubCategories = async (data)=>{
   return await axios.post(`/addSubCategories`,data,{headers: { 
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}



// list subcategories

export const getSubCatagories = async ()=>{
   return await axios.get(`/getSubCatagories`,{headers: { 
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}
// change status  subcategories

export const changeSubSatatus = async (data)=>{
   return await axios.patch(`/changeSubStatus`,data,{headers: { 
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}
// change status  subcategories

export const editSubCatagories = async (data)=>{
   return await axios.patch(`/editSubCatagories`,data,{headers: { 
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}

//  =========================== CURD For  Primary Material ========================

export const addPrimaryMaterial = async (data)=>{
   return await axios.post(`/addPrimaryMaterial`,data,{headers: { 
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}

//// list getPrimaryMaterial

export const getPrimaryMaterial = async ()=>{
   return await axios.get(`/getPrimaryMaterial`,{headers: { 
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}
// change status  changePrimaryMaterialStatus

export const changePrimaryMaterialStatus = async (data)=>{
   return await axios.patch(`/changePrimaryMaterialStatus`,data,{headers: { 
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}
//// change status  subcategories

export const editPrimaryMaterial = async (data)=>{
   return await axios.patch(`/editPrimaryMaterial`,data,{headers: { 
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}

//  =========================== CURD For  Secondary Material ========================

export const addSecondaryMaterial = async (data)=>{
   return await axios.post(`/addSecondaryMaterial`,data,{headers: { 
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}

//// list getSecondaryMaterial

export const getSecondaryMaterial = async ()=>{
   return await axios.get(`/getSecondaryMaterial`,{headers: { 
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}
// change status  changePrimaryMaterialStatus

export const changeSecondaryMaterialStatus = async (data)=>{
   return await axios.patch(`/changeSecondaryMaterialStatus`,data,{headers: { 
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}
//// change editSecondaryMaterial

export const editSecondaryMaterial = async (data)=>{
   return await axios.patch(`/editSecondaryMaterial`,data,{headers: { 
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}

//  =========================== CURD For  Polish ========================

export const addPolish = async (data)=>{
   return await axios.post(`/addPolish`,data,{headers: { 
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}

// list getSecondaryMaterial

export const getPolish = async ()=>{
   return await axios.get(`/getPolish`,{headers: { 
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}
// change status  changePrimaryMaterialStatus

export const changePolishStatus = async (data)=>{
   return await axios.patch(`/changePolishStatus`,data,{headers: { 
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}

// change editPolish

export const editPolish = async (data)=>{
   return await axios.patch(`/editPolish`,data,{headers: { 
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}

//  =========================== CURD For  Hinge ========================

export const addHinge = async (data)=>{
   return await axios.post(`/addHinge`,data,{headers: { 
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}

// list getHinge

export const getHinge = async ()=>{
   return await axios.get(`/getHinge`,{headers: { 
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}
// change status  changeHingeStatus

export const changeHingeStatus = async (data)=>{
   return await axios.patch(`/changeHingeStatus`,data,{headers: { 
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}

// change editPolish

export const editHinge = async (data)=>{
   return await axios.patch(`/editHinge`,data,{headers: { 
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}
//  =========================== CURD For  Hinge ========================

export const addFitting = async (data)=>{
   return await axios.post(`/addFitting`,data,{headers: { 
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}

// list getHinge

export const getFitting = async ()=>{
   return await axios.get(`/getFitting`,{headers: { 
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}
// change status  changeHingeStatus

export const changeFittingStatus = async (data)=>{
   return await axios.patch(`/changeFittingStatus`,data,{headers: { 
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}

// change editPolish

export const editFitting = async (data)=>{
   return await axios.patch(`/editFitting`,data,{headers: { 
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}
//  =========================== CURD For  Knob ========================

export const addKnob = async (data)=>{
   return await axios.post(`/addKnob`,data,{headers: { 
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}

// list getHinge

export const getKnob = async ()=>{
   return await axios.get(`/getKnob`,{headers: { 
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}
// change status  changeHingeStatus

export const changeKnobStatus = async (data)=>{
   return await axios.patch(`/changeKnobStatus`,data,{headers: { 
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}

// change editPolish

export const editKnob = async (data)=>{
   return await axios.patch(`/editKnob`,data,{headers: { 
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}
//  =========================== CURD For  Door ========================

export const addDoor = async (data)=>{
   return await axios.post(`/addDoor`,data,{headers: { 
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}

// list getHinge

export const getDoor = async ()=>{
   return await axios.get(`/getDoor`,{headers: { 
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}
// change status  changeHingeStatus

export const changeDoorStatus = async (data)=>{
   return await axios.patch(`/changeDoorStatus`,data,{headers: { 
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}

// change editPolish

export const editDoor = async (data)=>{
   return await axios.patch(`/editDoor`,data,{headers: { 
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}

//  =========================== CURD For Handle ========================

export const addHandle = async (data)=>{
   return await axios.post(`/addHandle`,data,{headers: { 
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}

// list getHinge

export const getHandle = async ()=>{
   return await axios.get(`/getHandle`,{headers: { 
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}
// change status  changeHingeStatus

export const changeHandleStatus = async (data)=>{
   return await axios.patch(`/changeHandleStatus`,data,{headers: { 
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}

// change editPolish

export const editHandle = async (data)=>{
   return await axios.patch(`/editHandle`,data,{headers: { 
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}


// =============== CURD of Gallaery ======================

// get gallery

export const getGallery = async (data)=>{
   return await axios.get(`/getGallery/?SKU=${data}`,{headers: { 
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`}})
      
   }

// delete image

export const deleteImage = async (data)=>{
   return await axios.delete(`/deleteImage/?SKU=${data.SKU}&imageIndex=${data.imageIndex}`,{headers: { 
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`}})
      
   }

// updateImage

export const updateImage =async (data)=>{
   return await axios.patch(`/updateImage`,data,{headers: { 
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`}})
      
   }

// addImage

export const addImage =async (data)=>{
   return await axios.post(`/addImage`,data,{headers: { 
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`}})
      
   }