import React, { useState, useRef, useEffect } from "react";
import {
  Button,
  IconButton,
  MenuItem,
  Grid,
  Box,
  Typography,
  TextField,
  Modal,
  InputAdornment,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  FormGroup,
  Fade,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Slider,
  Select,
  TextareaAutosize,
  ListItemText,
  InputLabel,
} from "@mui/material";
import { Editor } from "@tinymce/tinymce-react";
import Slide from "@mui/material/Slide";
import Backdrop from "@mui/material/Backdrop";
import "../../assets/custom/css/sideForm.css";
import { useDropzone } from "react-dropzone";
import CancelIcon from "@mui/icons-material/Cancel";
import AddIcon from '@mui/icons-material/Add';
// service APIS 
import {
  addCategory,
  editCategory,
  addProduct,
  getLastProduct,
  updateProduct,
  categoryList,
  addSubCategories,
  getSubCatagories,
  editSubCatagories,
  addPrimaryMaterial,
  editPrimaryMaterial,
  getPrimaryMaterial,
  addPolish,
  editPolish,
  getPolish,
  addHinge,
  editHinge,
  getHinge,
  addFitting,
  editFitting,
  getFitting,
  addKnob,
  getKnob,
  editKnob,
  addDoor,
  getDoor,
  updateImage,
  editDoor,
  addHandle,
  getHandle,
  editHandle,
  addImage,
  uploadImage,
  createBlog,
  updateBlog,
  addFabric,
  editFabric,
  getFabric,
  addHardware,
  editHardware,
  addTextile,
  getLastHardware,
  editTextile,
  getTextile,
  addMergeProduct,
  updateMergeProduct,
  getLastMergeProduct,
  getPresentSKUs,
  addCustomer,
  updateCustomer,
  addOrder,
  getLastOrder,
  customerCatalog,
  addStock,
  updateStock,
  variation,
  getHardwareDropdown
} from "../../services/service.js";
import { useConfirm } from "material-ui-confirm";

import { OpenBox, Notify } from "../../store/Types";

import { Store } from '../../store/Context';

// custom hook 
// import Dimension from '../hook/Dimension';
import size from 'react-image-size';


const option = {
  labels: {
    confirmable: "Procced",
    cancellable: "Cancel"
  }
}

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 3,
};

const Sideform = () => {
  // multiple images
  const [files, setFiles] = useState([]);
  const [featured, setFeatured] = useState([]);

  // image link 
  const imageLink = 'https://woodshala.in/upload/'

  const confirm = useConfirm();


  // confirmBox 
  const confirmBox = (e, action) => {
    e.preventDefault();

    confirm({ description: `Data will listed in Database !!!` }, option)
      .then(() => action(e))
      .catch((err) => { console.log("Operation cancelled because. ", err) });
  }


  // single images
  const [Image, setImages] = useState([]);
  const [Mannequin, setMannequin] = useState([]);

  // modal state
  const [open, setOpen] = useState(false);

  // address object 
  const [address, setAddress] = useState([])

  function FeaturesPreviews(props) {
    const { getRootProps, getInputProps } = useDropzone({
      accept: "image/*",
      multiple: false,
      onDrop: (acceptedFiles) => {
        setFeatured(
          acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          )
        );
      },
    });

    const thumbs = featured.map((file) => (
      <div style={thumb} key={file.name}>
        <div style={thumbInner}>
          <img
            src={file.preview}
            style={img}
            alt="Images"
            // Revoke data uri after image is loaded
            onLoad={() => {
              URL.revokeObjectURL(file.preview);
            }}
          />
        </div>
      </div>
    ));

    useEffect(() => {
      // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
      return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
    }, []);

    return (
      <section className="container dorpContainer">
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <p>{props.text}</p>
        </div>
        <aside style={thumbsContainer}>{thumbs}</aside>
      </section>
    );
  }


  // function for the filter the image to the basis of ratio 1:1
  function Dimension(images, setFiles) {
    let result = images.map(async (image) => {
      let { width, height } = await size(URL.createObjectURL(image));
      // console.log(width,height)
      Object.assign(image, {
        preview: URL.createObjectURL(image),
        validate: width === height ? true : false
      })
      return image
    })
    Promise.all(result).then(res => setFiles(res))
  }



  function ProductsPreviews(props) {
    const [acceptedFileItems, setAcceptedFileItems] = useState([])
    const [fileRejectionItems, setFileRejectionItems] = useState([])

    const { getRootProps, getInputProps } = useDropzone({
      accept: "image/*",
      multiple: true,
      onDrop: (acceptedFiles) => {
        Dimension(acceptedFiles, setFiles)
      }
    });


    // for check the file state in done or
    useEffect(() => {

      if (files) {
        // REJECTED FILES
        setFileRejectionItems(files.map((file) => {
          return !file.validate ? <div style={thumb} key={file.name}>
            <div style={thumbInner}>
              {/* {console.log(file.validate)} */}

              <img
                src={URL.createObjectURL(file)}
                style={img}
                alt="Images"
                // Revoke data uri after image is loaded
                onLoad={() => {
                  URL.revokeObjectURL(file.preview);
                }}
              />
            </div>
          </div> : null;
        }
        ));

        // accepted
        setAcceptedFileItems(files.map(
          (file, index) => {
            return file.validate ? <div style={thumb} key={file.name}>
              <div style={thumbInner}>
                {/* {console.log(file.validate)} */}

                <img
                  src={URL.createObjectURL(file)}
                  style={img}
                  alt="Images"
                  // Revoke data uri after image is loaded
                  onLoad={() => {
                    URL.revokeObjectURL(file.preview);
                  }}
                />
              </div>
            </div> : null;
          }
        ))
      }
    }

      , [files]);


    useEffect(() => {

      // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
      return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
    }, []);

    return (
      <section className="container dorpContainer">
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <p>{props.text}</p>
        </div>
        <aside >
          <h4>Accepted files</h4>
          <aside style={thumbsContainer}>{acceptedFileItems}</aside>
          <h4>Rejected files</h4>
          <aside style={thumbsContainer}>{fileRejectionItems}</aside>
        </aside>
      </section>
    );
  }
  function ImagePreviews(props) {
    const { getRootProps, getInputProps } = useDropzone({
      accept: "image/*",
      multiple: false,
      onDrop: (acceptedFiles) => {
        setImages(
          acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          )
        );
      },
    });

    const thumbs = Image.map((file) => (
      <div style={thumb} key={file.name}>
        <div style={thumbInner}>
          <img
            src={file.preview}
            style={img}
            alt="Images"
            // Revoke data uri after image is loaded
            onLoad={() => {
              URL.revokeObjectURL(file.preview);
            }}
          />
        </div>
      </div>
    ));

    useEffect(() => {
      // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
      return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
    }, []);

    return (
      <section className="container dorpContainer">
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <p>{props.text}</p>
        </div>
        <aside style={thumbsContainer}>{thumbs}</aside>
      </section>
    );
  }
  function MannequinPreviews(props) {
    const { getRootProps, getInputProps } = useDropzone({
      accept: "image/*",
      multiple: false,
      onDrop: (acceptedFiles) => {
        setMannequin(
          acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          )
        );
      },
    });

    const thumbs = Mannequin.map((file) => (
      <div style={thumb} key={file.name}>
        <div style={thumbInner}>
          <img
            src={file.preview}
            style={img}
            alt="Images"
            // Revoke data uri after image is loaded
            onLoad={() => {
              URL.revokeObjectURL(file.preview);
            }}
          />
        </div>
      </div>
    ));

    useEffect(() => {
      // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
      return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
    }, []);

    return (
      <section className="container dorpContainer">
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <p>{props.text}</p>
        </div>
        <aside style={thumbsContainer}>{thumbs}</aside>
      </section>
    );
  }

  // static catalog
  const taxRateCatalog = [
    {
      value: "18",
      label: "18",
    },
    {
      value: "5",
      label: "5",
    },
    {
      value: "2",
      label: "2",
    },
  ];
  const backStyleCatalog = [
    {
      value: "Lean Back",
      label: "Lean Back",
    },
    {
      value: "Straight Back",
      label: "Straight Back",
    }
  ];

  const legCatalog = [
    {
      value: "Folding Legs",
      label: "Folding Legs",
    },
    {
      value: "Knockdown Legs",
      label: "Knockdown Legs",
    },
  ];
  const warehouse = [
    {
      value: "Bangalore (Karnataka)",
      label: "Bangalore (Karnataka)",
    },
    {
      value: "Jodhpur (Rajasthan)",
      label: "Jodhpur (Rajasthan)",
    },
  ];

  const weightCapCatalog = [
    {
      value: "Child",
      label: "Child",
    },
    {
      value: "Light Weight",
      label: "Light Weight",
    },
    {
      value: "Adult",
      label: "Adult",
    },
  ];

  const trollyMaterial = [
    {
      value: "Teak Wood",
      label: "Teak Wood",
    },
    {
      value: "Natural Solid Wood",
      label: "Natural Solid Wood",
    },
    {
      value: "Stone",
      label: "Stone",
    },
    {
      value: "Metal",
      label: "Metal",
    },
    {
      value: "Brass",
      label: "Brass",
    },
    {
      value: "Copper",
      label: "Copper",
    },
    {
      value: "Glass",
      label: "Glass",
    },
    {
      value: "Mango Wood",
      label: "Mango Wood",
    },
    {
      value: "Pine wood",
      label: "Pine wood",
    },
    {
      value: "Acacia wood",
      label: "Acacia wood",
    },
    {
      value: "Sheesham wood",
      label: "Sheesham wood",
    },
    {
      value: "Ceramic",
      label: "Ceramic",
    },
    {
      value: "Brass Coated SS",
      label: "Brass Coated SS",
    },
    {
      value: "Iron Jali",
      label: "Iron Jali",
    },
    {
      value: "Glass Jali",
      label: "Glass Jali",
    },
  ];
  const rangeCatalog = [
    {
      value: "Traditional",
      label: "Traditional",
    },

    {
      value: "Distressed",
      label: "Distressed",
    },

    {
      value: "Crackle",
      label: "Crackle",
    },

    {
      value: "Painting",
      label: "Painting",
    },

    {
      value: "Antique",
      label: "Antique",
    },
  ];

  const assemblyLevelCatalog = [
    {
      value: "Easy Assembly",
      label: "Easy Assembly",
    },
    {
      value: "Carpenter Assembly",
      label: "Carpenter Assembly",
    }
  ];

  const unitCatalog = [
    {
      value: "Pcs",
      label: "Pcs",
    },
    {
      value: "Kg",
      label: "Kg",
    },
    {
      value: "Ft",
      label: "Ft",
    },
    {
      value: "Set",
      label: "Set",
    },
    {
      value: "Metre",
      label: "Metre",
    },
  ];



  // global context 
  const { state, dispatch } = Store();

  // states
  const [cat, setCat] = useState();
  const [discount, setDiscount] = useState({ discount_limit: 0, MRP: 0 });
  const [showFabric, setShowFabric] = useState("No");

  //  State for stepper
  const [activeStep, setActiveStep] = useState(0);

  // states for the dynamic rendering
  const [SKU, setSKU] = useState("");
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [materialCatalog, setMaterialCatalog] = useState([]);
  const [polishCatalog, setPolishCatalog] = useState([]);
  const [textileCatalog, setTextileCatalog] = useState([]);
  // const [hingeCatalog, setHingeCatalog] = useState([]);
  // const [fittingCatalog, setFittingCatalog] = useState([]);
  // const [knobCatalog, setKnobCatalog] = useState([]);
  // const [doorCatalog, setDoorCatalog] = useState([]);
  // const [handleCatalog, setHandleCatalog] = useState([]);
  const [fabricCatalog, setFabricCatalog] = useState([]);
  const [SKUCatalog, setSKUCatalog] = useState([]);
  const [customer, setCustomerCatalog] = useState([]);

  const [catalog,setCatalog] = useState({
    hinge : [],
    knob : [],
    door : [],
    handle : [],
    fitting : [],
    polish : [],
    fabric : [],
    textile : []
})

  // ref
  const editorRef = useRef();


  // pres data
  const [changeData, setData] = useState({
    primary_material: [],
    range: "",
    product_array: [],
    variation_array: [],
    warehouse: [],
    savedImages: [],
    shipping: "",
    product_title: "",
    seo_title: "",
    seo_description: "",
    seo_keyword: "",
    product_des: "",
    category: "",
    sub_category: "",
    length: "",
    breadth: "",
    selling_points: [],
    height: "",
    priMater: "",
    priMater_weight: "",
    secMater: "",
    secMater_weight: "",
    selling_price: 0,
    mrp: "",
    discount_cap: "",
    polish_time: "",
    manufacturing_time: "",
    polish: [],
    hinge: "",
    knob: "",
    handle: "",
    door: "",
    wight_cap: "",
    wall_hanging: "",
    assembly_required: "",
    assembly_leg: "",
    assembly_parts: 0,
    fitting: "",
    rotating: "",
    eatable: "",
    no_chemical: "",
    straight_back: "",
    lean_back: "",
    weaving: "",
    not_micro_dish: "",
    tilt_top: "",
    inside_comp: "",
    stackable: "",
    silver: "",
    selling_point: "",
    mirror: "",
    joints: "",
    tax_rate: 18,
    seat_width: "",
    seat_depth: "",
    seat_height: "",
    wheel: "",
    trolly: "",
    returnable: false,
    returnDays: 0,
    trolly_mater: "",
    top_size: 0,
    dial_size: 0,
    COD: false,
    textile: "",
    paid_amount: 0,
    total_amount: 0,
    customer_name: "",
    customer_email: "",
    shipping_address: "",
    searchCustomer: "",
    mobile_store: true,
    online_store: true,
    continue_selling: true,
    unit: 'Pcs',
    quantity: 1,
    textile_type: '',
    category_id: '',
    back_style: '',
    sub_category_id: '',
    product_description: '',
    fabric: '',
    drawer: '',
    weight_capacity: '',
    legs: 'None',
    assembly_level: 'Easy Assembly',
  });

  useEffect(() => {
    switch (state.OpenBox.formType) {
      case "hardware":
        getHKU();
        categoryList().then((data) => {
          if (data.data === null) return setCategory([]);

          setData({ ...changeData, category_name: data.data.filter((row) => { return row.category_name === 'Hardware' })[0]._id })
          return setCategory(data.data);
        });

        getSubCatagories().then((data) => {
          if (data.data === null) return setSubCategory([]);

          return setSubCategory(data.data);
        });

        // console.log(category,category.filter((row) => { return row.category_name === 'Hardware' }))


        break;
      case "update_hardware":
        getHKU();
        categoryList().then((data) => {
          if (data.data === null) return setCategory([]);

          return setCategory(data.data);
        });

        getSubCatagories().then((data) => {
          if (data.data === null) return setSubCategory([]);

          return setSubCategory(data.data);
        });

        const row = state.OpenBox.payload.row;

        setData({
          SKU: row.SKU,
          title: row.title,
          category_name: row.category_id,
          category_id: row.category_id,
          sub_category_name: row.sub_category_id,
          sub_category_id: row.sub_category_id,
          hardware_image: row.hardware_image,
          warehouse: row.warehouse ?
            row.warehouse.split(',') : [],
          bangalore_stock: row.bangalore_stock,
          jodhpur_stock: row.jodhpur_stock,
          manufacturing_time: row.manufacturing_time,
          status: row.status === true ? 'on' : 'off',
          returnDays: row.returnDays,
          COD: row.COD,
          returnable: row.returnable,
          quantity: row.quantity,
          package_length: row.package_length,
          package_height: row.package_height,
          package_breadth: row.package_breadth,
          unit: row.unit,
          selling_price: row.selling_price,
          showroom_price: row.showroom_price,
          polish_time: row.polish_time
        })
        break;
      case "product":
        getSKU();

        getHardwareDropdown().then((data)=>{
          if(data.data !== null) return setCatalog(data.data)
        })

        categoryList().then((data) => {
          if (data.data === null) return setCategory([]);

          return setCategory(data.data);
        });

        getSubCatagories().then((data) => {
          if (data.data === null) return setSubCategory([]);

          return setSubCategory(data.data);
        });

        getPrimaryMaterial().then((data) => {
          if (data.data === null) return setMaterialCatalog([]);

          return setMaterialCatalog(data.data);
        });

        // getPolish().then((data) => {
        //   if (data.data === null) return setPolishCatalog([]);

        //   return setPolishCatalog(data.data);
        // });

        // getTextile().then((data) => {
        //   if (data.data === null) return setTextileCatalog([]);
        //   return setTextileCatalog(data.data);
        // });

        // getHinge().then((data) => {
        //   if (data.data === null) return setHingeCatalog([]);

        //   return setHingeCatalog(data.data);
        // });

        // getFitting().then((data) => {
        //   if (data.data === null) return setFittingCatalog([]);

        //   return setFittingCatalog(data.data);
        // });

        // getKnob().then((data) => {
        //   if (data.data === null) return setKnobCatalog([]);

        //   return setKnobCatalog(data.data);
        // });

        // getDoor().then((data) => {
        //   if (data.data === null) return setDoorCatalog([]);

        //   return setDoorCatalog(data.data);
        // });

        // getHandle().then((data) => {
        //   if (data.data === null) return setHandleCatalog([]);

        //   return setHandleCatalog(data.data);
        // });

        // getFabric().then((data) => {
        //   if (data.data === null) return setFabricCatalog([]);

        //   return setFabricCatalog(data.data);
        // });

        break;
      case "variation":
        getSKU();

        getHardwareDropdown().then((data)=>{
          if(data.data !== null) return setCatalog(data.data)
        })

        categoryList().then((data) => {
          if (data.data === null) return setCategory([]);

          return setCategory(data.data);
        });

        getSubCatagories().then((data) => {
          if (data.data === null) return setSubCategory([]);

          return setSubCategory(data.data);
        });

        getPrimaryMaterial().then((data) => {
          if (data.data === null) return setMaterialCatalog([]);

          return setMaterialCatalog(data.data);
        });

        // getPolish().then((data) => {
        //   if (data.data === null) return setPolishCatalog([]);

        //   return setPolishCatalog(data.data);
        // });

        // getTextile().then((data) => {
        //   if (data.data === null) return setTextileCatalog([]);
        //   return setTextileCatalog(data.data);
        // });

        // getHinge().then((data) => {
        //   if (data.data === null) return setHingeCatalog([]);

        //   return setHingeCatalog(data.data);
        // });

        // getFitting().then((data) => {
        //   if (data.data === null) return setFittingCatalog([]);

        //   return setFittingCatalog(data.data);
        // });

        // getKnob().then((data) => {
        //   if (data.data === null) return setKnobCatalog([]);

        //   return setKnobCatalog(data.data);
        // });

        // getDoor().then((data) => {
        //   if (data.data === null) return setDoorCatalog([]);

        //   return setDoorCatalog(data.data);
        // });

        // getHandle().then((data) => {
        //   if (data.data === null) return setHandleCatalog([]);

        //   return setHandleCatalog(data.data);
        // });

        // getFabric().then((data) => {
        //   if (data.data === null) return setFabricCatalog([]);

        //   return setFabricCatalog(data.data);
        // });
        // console.log(state.OpenBox.payload)
        const data = state.OpenBox.payload.row.action;
        console.log(data)
        setData({
          SKU: data.SKU,
          product_title: data.product_title,
          category_name: data.category_id,
          back_style: data.back_style,
          category_id: data.category_id,
          sub_category_name: data.sub_category_id,
          sub_category_id: data.sub_category_id,
          product_description: data.product_description,
          seo_title: data.seo_title,
          seo_description: data.seo_description,
          seo_keyword: data.seo_keyword,
          product_image: data.product_image,
          savedImages: data.product_image,
          featured_image: data.featured_image,
          specification_image: data.specification_image,
          mannequin_image: data.mannequin_image,
          primary_material: JSON.parse(
            data.primary_material_name
          ) || [],
          polish: JSON.parse(
            data.polish_name
          ) || [],
          warehouse: JSON.parse(
            data.warehouse_name
          ) || [],
          warehouse_name: data.warehouse_name,
          polish_name: data.polish_name,
          bangalore_stock: data.bangalore_stock,
          jodhpur_stock: data.jodhpur_stock,
          primary_material_name:
            data.primary_material_name,
          package_length: data.package_length,
          package_height: data.package_height,
          package_breadth: data.package_breadth,
          length_main: data.length_main,
          breadth: data.breadth,
          height: data.height,
          weight: data.weight,
          hinge: data.hinge,
          hinge_name: data.hinge_name,
          knob: data.knob,
          textile: data.textile,
          knob_name: data.knob_name,
          textile_name: data.textile_name,
          textile_type: data.textile_type,
          handle: data.handle,
          handle_name: data.handle_name,
          door: data.door,
          door_name: data.door_name,
          fitting: data.fitting,
          fitting_name: data.fitting_name,
          selling_points: data.selling_points,
          top_size: data.top_size,
          dial_size: data.dial_size,
          seating_size_width: data.seating_size_width,
          seating_size_depth: data.seating_size_depth,
          seating_size_height: data.seating_size_height,
          weight_capacity: data.weight_capacity,
          fabric: data.fabric,
          fabric_name: data.fabric_name,
          wall_hanging: data.wall_hanging,
          assembly_required: data.assembly_required,
          assembly_part: data.assembly_part,
          legs: data.legs,
          mirror: data.mirror,
          mirror_length: data.mirror_length,
          mirror_width: data.mirror_width,
          silver: data.silver,
          silver_weight: data.silver_weight,
          joints: data.joints,
          upholstery: data.upholstery,
          wheel: data.wheel,
          trolley: data.trolley,
          trolley_material: data.trolley_material,
          rotating_seats: data.rotating_seats,
          eatable_oil_polish: data.eatable_oil_polish,
          no_chemical: data.no_chemical,
          straight_back: data.straight_back,
          lean_back: data.lean_back,
          weaving: data.weaving,
          knife: data.knife,
          not_suitable_for_Micro_Dish:
            data.not_suitable_for_Micro_Dish,
          tilt_top: data.tilt_top,
          inside_compartments: data.inside_compartments,
          stackable: data.stackable,
          ceramic_drawers: data.ceramic_drawers,
          ceramic_tiles: data.ceramic_tiles,
          // MRP: data.MRP,
          tax_rate: data.tax_rate,
          selling_price: data.selling_price,
          showroom_price: data.showroom_price,
          discount_limit: data.discount_limit,
          polish_time: data.polish_time,
          manufacturing_time: data.manufacturing_time,
          status: data.status,
          returnDays: data.returnDays,
          COD: data.COD,
          returnable: data.returnable,
          drawer: data.drawer,
          drawer_count: data.drawer_count,
          range: data.range,
          mobile_store: state.OpenBox.payload.row.action.mobile_store,
          online_store: state.OpenBox.payload.row.action.online_store,
          continue_selling: state.OpenBox.payload.row.action.continue_selling,
          quantity: data.quantity,
          unit: data.unit,
          variation_array: data.variation_array,
        });

        setCat(data.category_id);

        break;
      case "add_order":
        getOID();
        getPresentSKUs().then((data) => {
          if (data.data === null) return setSKUCatalog([]);

          return setSKUCatalog(data.data);
        });

        customerCatalog().then((data) => {
          //console.log(data);
          if (data.data === null) return setCustomerCatalog([]);

          return setCustomerCatalog(data.data);
        });

        break;
      case "update_category":
        categoryList().then((data) => {
          if (data.data === null) return setCategory([]);

          return setCategory(data.data);
        });
        setData({
          category: state.OpenBox.payload.row.category_name,
        });
        break;
      case "update_PrimaryMaterial":
        getPrimaryMaterial().then((data) => {
          if (data.data === null) return setMaterialCatalog([]);

          return setMaterialCatalog(data.data);
        });
        setData({
          primaryMaterial_name: state.OpenBox.payload.row.primaryMaterial_name,
          primaryMaterial_description:
            state.OpenBox.payload.row.primaryMaterial_description,
        });
        break;
      case "update_polish":
        getPolish().then((data) => {
          if (data.data === null) return setPolishCatalog([]);

          return setPolishCatalog(data.data);
        });

        setData({
          polish: state.OpenBox.payload.row.polish_name,
        });
        break;
      // case "update_knob":
      //   getKnob().then((data) => {
      //     if (data.data === null) return setKnobCatalog([]);
      //     return setKnobCatalog(data.data);
      //   });
      //   setData({
      //     knob: state.OpenBox.payload.row.knob_name,
      //   });
      //   break;
      // case "update_fitting":
      //   getFitting().then((data) => {
      //     if (data.data === null) return setFittingCatalog([]);

      //     return setFittingCatalog(data.data);
      //   });
      //   setData({
      //     fitting: state.OpenBox.payload.row.fitting_name,
      //   });
      //   break;
      // case "update_hinge":
      //   getHinge().then((data) => {
      //     if (data.data === null) return setHingeCatalog([]);

      //     return setHingeCatalog(data.data);
      //   });
      //   setData({
      //     hinge: state.OpenBox.payload.row.hinge_name,
      //   });
      //   break;
      // case "update_door":
      //   getDoor().then((data) => {
      //     if (data.data === null) return setDoorCatalog([]);

      //     return setDoorCatalog(data.data);
      //   });
      //   setData({
      //     door: state.OpenBox.payload.row.door_name,
      //   });
      //   break;
      // case "update_handle":
        // getHandle().then((data) => {
        //   if (data.data === null) return setHandleCatalog([]);

        //   return setHandleCatalog(data.data);
        // });

        // setData({
        //   handle: state.OpenBox.payload.row.handle_name,
        // });
        // break;
      case "subcategory":
        categoryList().then((data) => {
          if (data.data === null) return setCategory([]);

          return setCategory(data.data);
        });
        // setCat(state.OpenBox.payload.row.category_id);
        break;
      case "update_Subcategory":
        categoryList().then((data) => {
          if (data.data === null) return setCategory([]);
          return setCategory(data.data);
        });
        setCat(state.OpenBox.payload.row.category_id);
        setData({
          sub_category_name: state.OpenBox.payload.row.sub_category_name,
        });
        break;
      case "update_blog":
        setData({
          title: state.OpenBox.payload.value.title,
          card_image: state.OpenBox.payload.value.card_image,
          seo_title: state.OpenBox.payload.value.seo_title,
          seo_description: state.OpenBox.payload.value.seo_description,
          card_description: state.OpenBox.payload.value.card_description,
          description: state.OpenBox.payload.value.description,
        });
        break;
      case "update_product":

        getHardwareDropdown().then((data)=>{
          if(data.data !== null) return setCatalog(data.data)
        })

        categoryList().then((data) => {
          if (data.data === null) return setCategory([]);

          return setCategory(data.data);
        });

        getSubCatagories().then((data) => {
          if (data.data === null) return setSubCategory([]);

          return setSubCategory(data.data);
        });

        getPrimaryMaterial().then((data) => {
          if (data.data === null) return setMaterialCatalog([]);

          return setMaterialCatalog(data.data);
        });

        // getPolish().then((data) => {
        //   if (data.data === null) return setPolishCatalog([]);

        //   return setPolishCatalog(data.data);
        // });

        // getTextile().then((data) => {
        //   if (data.data === null) return setTextileCatalog([]);
        //   return setTextileCatalog(data.data);
        // });

        // getHinge().then((data) => {
        //   if (data.data === null) return setHingeCatalog([]);

        //   return setHingeCatalog(data.data);
        // });

        // getFitting().then((data) => {
        //   if (data.data === null) return setFittingCatalog([]);

        //   return setFittingCatalog(data.data);
        // });

        // getKnob().then((data) => {
        //   if (data.data === null) return setKnobCatalog([]);

        //   return setKnobCatalog(data.data);
        // });

        // getDoor().then((data) => {
        //   if (data.data === null) return setDoorCatalog([]);

        //   return setDoorCatalog(data.data);
        // });

        // getHandle().then((data) => {
        //   if (data.data === null) return setHandleCatalog([]);

        //   return setHandleCatalog(data.data);
        // });

        // getFabric().then((data) => {
        //   if (data.data === null) return setFabricCatalog([]);

        //   return setFabricCatalog(data.data);
        // });
        // console.log(state.OpenBox.payload)
        setData({
          _id: state.OpenBox.payload.value._id || state.OpenBox.payload.row.action._id,
          assembly_level: state.OpenBox.payload.row.action.assembly_level,
          SKU: state.OpenBox.payload.row.action.SKU,
          product_title: state.OpenBox.payload.row.action.product_title,
          category_name: state.OpenBox.payload.row.action.category_id,
          back_style: state.OpenBox.payload.row.action.back_style,
          category_id: state.OpenBox.payload.row.action.category_id,
          sub_category_name: state.OpenBox.payload.row.action.sub_category_id,
          sub_category_id: state.OpenBox.payload.row.action.sub_category_id,
          product_description: state.OpenBox.payload.row.action.product_description,
          seo_title: state.OpenBox.payload.row.action.seo_title,
          seo_description: state.OpenBox.payload.row.action.seo_description,
          seo_keyword: state.OpenBox.payload.row.action.seo_keyword,
          product_image: state.OpenBox.payload.row.action.product_image,
          savedImages: state.OpenBox.payload.row.action.product_image,
          featured_image: state.OpenBox.payload.row.action.featured_image,
          specification_image: state.OpenBox.payload.row.action.specification_image,
          mannequin_image: state.OpenBox.payload.row.action.mannequin_image,
          primary_material: JSON.parse(
            state.OpenBox.payload.row.action.primary_material_name
          ) || [],
          polish: JSON.parse(
            state.OpenBox.payload.row.action.polish_name
          ) || [],
          warehouse: JSON.parse(
            state.OpenBox.payload.row.action.warehouse_name
          ) || [],
          warehouse_name: state.OpenBox.payload.row.action.warehouse_name,
          polish_name: state.OpenBox.payload.row.action.polish_name,
          bangalore_stock: state.OpenBox.payload.row.action.bangalore_stock,
          jodhpur_stock: state.OpenBox.payload.row.action.jodhpur_stock,
          primary_material_name: state.OpenBox.payload.row.action.primary_material_name,
          package_length: state.OpenBox.payload.row.action.package_length,
          package_height: state.OpenBox.payload.row.action.package_height,
          package_breadth: state.OpenBox.payload.row.action.package_breadth,
          length_main: state.OpenBox.payload.row.action.length_main,
          breadth: state.OpenBox.payload.row.action.breadth,
          height: state.OpenBox.payload.row.action.height,
          weight: state.OpenBox.payload.row.action.weight,
          hinge: state.OpenBox.payload.row.action.hinge,
          hinge_name: state.OpenBox.payload.row.action.hinge_name,
          knob: state.OpenBox.payload.row.action.knob,
          textile: state.OpenBox.payload.row.action.textile,
          knob_name: state.OpenBox.payload.row.action.knob_name,
          textile_name: state.OpenBox.payload.row.action.textile_name,
          textile_type: state.OpenBox.payload.row.action.textile_type,
          handle: state.OpenBox.payload.row.action.handle,
          handle_name: state.OpenBox.payload.row.action.handle_name,
          door: state.OpenBox.payload.row.action.door,
          door_name: state.OpenBox.payload.row.action.door_name,
          fitting: state.OpenBox.payload.row.action.fitting,
          fitting_name: state.OpenBox.payload.row.action.fitting_name,
          selling_points: state.OpenBox.payload.row.action.selling_points,
          top_size: state.OpenBox.payload.row.action.top_size,
          dial_size: state.OpenBox.payload.row.action.dial_size,
          seating_size_width: state.OpenBox.payload.row.action.seating_size_width,
          seating_size_depth: state.OpenBox.payload.row.action.seating_size_depth,
          seating_size_height: state.OpenBox.payload.row.action.seating_size_height,
          weight_capacity: state.OpenBox.payload.row.action.weight_capacity,
          fabric: state.OpenBox.payload.row.action.fabric,
          fabric_name: state.OpenBox.payload.row.action.fabric_name,
          wall_hanging: state.OpenBox.payload.row.action.wall_hanging,
          assembly_required: state.OpenBox.payload.row.action.assembly_required,
          assembly_part: state.OpenBox.payload.row.action.assembly_part,
          legs: state.OpenBox.payload.row.action.legs,
          mirror: state.OpenBox.payload.row.action.mirror,
          mirror_length: state.OpenBox.payload.row.action.mirror_length,
          mirror_width: state.OpenBox.payload.row.action.mirror_width,
          silver: state.OpenBox.payload.row.action.silver,
          silver_weight: state.OpenBox.payload.row.action.silver_weight,
          joints: state.OpenBox.payload.row.action.joints,
          upholstery: state.OpenBox.payload.row.action.upholstery,
          wheel: state.OpenBox.payload.row.action.wheel,
          trolley: state.OpenBox.payload.row.action.trolley,
          trolley_material: state.OpenBox.payload.row.action.trolley_material,
          rotating_seats: state.OpenBox.payload.row.action.rotating_seats,
          eatable_oil_polish: state.OpenBox.payload.row.action.eatable_oil_polish,
          no_chemical: state.OpenBox.payload.row.action.no_chemical,
          straight_back: state.OpenBox.payload.row.action.straight_back,
          lean_back: state.OpenBox.payload.row.action.lean_back,
          weaving: state.OpenBox.payload.row.action.weaving,
          knife: state.OpenBox.payload.row.action.knife,
          not_suitable_for_Micro_Dish:
            state.OpenBox.payload.row.action.not_suitable_for_Micro_Dish,
          tilt_top: state.OpenBox.payload.row.action.tilt_top,
          inside_compartments: state.OpenBox.payload.row.action.inside_compartments,
          stackable: state.OpenBox.payload.row.action.stackable,
          ceramic_drawers: state.OpenBox.payload.row.action.ceramic_drawers,
          ceramic_tiles: state.OpenBox.payload.row.action.ceramic_tiles,
          // row data.MRP,
          tax_rate: state.OpenBox.payload.row.action.tax_rate,
          selling_price: state.OpenBox.payload.row.action.selling_price,
          showroom_price: state.OpenBox.payload.row.action.showroom_price,
          discount_limit: state.OpenBox.payload.row.action.discount_limit,
          polish_time: state.OpenBox.payload.row.action.polish_time,
          manufacturing_time: state.OpenBox.payload.row.action.manufacturing_time,
          status: state.OpenBox.payload.row.action.status,
          returnDays: state.OpenBox.payload.row.action.returnDays,
          COD: state.OpenBox.payload.row.action.COD,
          returnable: state.OpenBox.payload.row.action.returnable,
          drawer: state.OpenBox.payload.row.action.drawer,
          drawer_count: state.OpenBox.payload.row.action.drawer_count,
          range: state.OpenBox.payload.row.action.range,
          mobile_store: state.OpenBox.payload.row.action.mobile_store,
          online_store: state.OpenBox.payload.row.action.online_store,
          continue_selling: state.OpenBox.payload.row.action.continue_selling,
          quantity: state.OpenBox.payload.row.action.quantity,
          unit: state.OpenBox.payload.row.action.unit,
        });

        setCat(state.OpenBox.payload.row.action.category_id);

        break;
      // case "update_fabric":
      //   getFitting().then((data) => {
      //     if (data.data === null) return setFittingCatalog([]);

      //     return setFittingCatalog(data.data);
      //   });
      //   setData({
      //     ...changeData,
      //     fabric_name: state.OpenBox.payload.row.fabric_name,
      //   });
      //   break;
      case "update_textile":
        getTextile().then((data) => {
          if (data.data === null) return setTextileCatalog([]);
          return setTextileCatalog(data.data);
        });
        setData({
          ...changeData,
          textile_name: state.OpenBox.payload.row.textile_name,
        });
        break;
      case "update_customer":
        //console.log(state.OpenBox.payload);
        setData({
          CID: state.OpenBox.payload.row.CID,
          register_time: state.OpenBox.payload.row.register_time,
          username: state.OpenBox.payload.row.username,
          mobile: state.OpenBox.payload.row.mobile,
          email: state.OpenBox.payload.row.email,
          password: state.OpenBox.payload.row.password,
          city: state.OpenBox.payload.row.city,
          state: state.OpenBox.payload.row.state,
          shipping: state.OpenBox.payload.row.shipping,
        });
        break;
      case "merge_product":
        getMKU();
        getPresentSKUs().then((data) => {
          if (data.data === null) return setSKUCatalog([]);

          return setSKUCatalog(data.data);
        });

        categoryList().then((data) => {
          if (data.data === null) return setCategory([]);

          return setCategory(data.data);
        });

        getSubCatagories().then((data) => {
          if (data.data === null) return setSubCategory([]);

          return setSubCategory(data.data);
        });

        getPrimaryMaterial().then((data) => {
          if (data.data === null) return setMaterialCatalog([]);

          return setMaterialCatalog(data.data);
        });

        getPolish().then((data) => {
          if (data.data === null) return setPolishCatalog([]);

          return setPolishCatalog(data.data);
        });

        getTextile().then((data) => {
          if (data.data === null) return setTextileCatalog([]);
          return setTextileCatalog(data.data);
        });

        // getHinge().then((data) => {
        //   if (data.data === null) return setHingeCatalog([]);

        //   return setHingeCatalog(data.data);
        // });

        // getFitting().then((data) => {
        //   if (data.data === null) return setFittingCatalog([]);

        //   return setFittingCatalog(data.data);
        // });

        // getKnob().then((data) => {
        //   if (data.data === null) return setKnobCatalog([]);

        //   return setKnobCatalog(data.data);
        // });

        // getDoor().then((data) => {
        //   if (data.data === null) return setDoorCatalog([]);

        //   return setDoorCatalog(data.data);
        // });

        // getHandle().then((data) => {
        //   if (data.data === null) return setHandleCatalog([]);

        //   return setHandleCatalog(data.data);
        // });

        getFabric().then((data) => {
          if (data.data === null) return setFabricCatalog([]);

          return setFabricCatalog(data.data);
        });

        let productArray = [];

        state.OpenBox.payload.map((obj, index) => {
          return productArray.push(obj.SKU);
        });

        setData({
          ...changeData,
          productArray,
        });

        break;
      case "update_merge":
        getPresentSKUs().then((data) => {
          if (data.data === null) return setSKUCatalog([]);

          return setSKUCatalog(data.data);
        });

        categoryList().then((data) => {
          if (data.data === null) return setCategory([]);

          return setCategory(data.data);
        });

        getSubCatagories().then((data) => {
          if (data.data === null) return setSubCategory([]);

          return setSubCategory(data.data);
        });

        getPrimaryMaterial().then((data) => {
          if (data.data === null) return setMaterialCatalog([]);

          return setMaterialCatalog(data.data);
        });

        getPolish().then((data) => {
          if (data.data === null) return setPolishCatalog([]);

          return setPolishCatalog(data.data);
        });

        getTextile().then((data) => {
          if (data.data === null) return setTextileCatalog([]);
          return setTextileCatalog(data.data);
        });

        // getHinge().then((data) => {
        //   if (data.data === null) return setHingeCatalog([]);

        //   return setHingeCatalog(data.data);
        // });

        // getFitting().then((data) => {
        //   if (data.data === null) return setFittingCatalog([]);

        //   return setFittingCatalog(data.data);
        // });

        // getKnob().then((data) => {
        //   if (data.data === null) return setKnobCatalog([]);

        //   return setKnobCatalog(data.data);
        // });

        // getDoor().then((data) => {
        //   if (data.data === null) return setDoorCatalog([]);

        //   return setDoorCatalog(data.data);
        // });

        // getHandle().then((data) => {
        //   if (data.data === null) return setHandleCatalog([]);

        //   return setHandleCatalog(data.data);
        // });

        getFabric().then((data) => {
          if (data.data === null) return setFabricCatalog([]);

          return setFabricCatalog(data.data);
        });

        setData({
          SKU: state.OpenBox.payload.value.SKU,
          MS: state.OpenBox.payload.value.MS,
          product_array: state.OpenBox.payload.value.product_array.split(","),
          product_title: state.OpenBox.payload.value.product_title,
          category_name: state.OpenBox.payload.value.category_id,
          category_id: state.OpenBox.payload.value.category_id,
          sub_category_name: state.OpenBox.payload.value.sub_category_id,
          warehouse: state.OpenBox.payload.value.warehouse ?
            state.OpenBox.payload.value.warehouse.split(',') : [],
          sub_category_id: state.OpenBox.payload.value.sub_category_id,
          product_description: state.OpenBox.payload.value.product_description,
          seo_title: state.OpenBox.payload.value.seo_title,
          seo_description: state.OpenBox.payload.value.seo_description,
          seo_keyword: state.OpenBox.payload.value.seo_keyword,
          product_image: state.OpenBox.payload.value.product_image,
          featured_image: state.OpenBox.payload.value.featured_image,
          specification_image: state.OpenBox.payload.value.specification_image,
          selling_points: state.OpenBox.payload.value.selling_points,
          rotating_seats: state.OpenBox.payload.value.rotating_seats,
          eatable_oil_polish: state.OpenBox.payload.value.eatable_oil_polish,
          no_chemical: state.OpenBox.payload.value.no_chemical,
          straight_back: state.OpenBox.payload.value.straight_back,
          lean_back: state.OpenBox.payload.value.lean_back,
          weaving: state.OpenBox.payload.value.weaving,
          knife: state.OpenBox.payload.value.knife,
          not_suitable_for_Micro_Dish:
            state.OpenBox.payload.value.not_suitable_for_Micro_Dish,
          tilt_top: state.OpenBox.payload.value.tilt_top,
          inside_compartments: state.OpenBox.payload.value.inside_compartments,
          stackable: state.OpenBox.payload.value.stackable,
          MRP: state.OpenBox.payload.value.MRP,
          tax_rate: state.OpenBox.payload.value.tax_rate,
          selling_price: state.OpenBox.payload.value.selling_price,
          showroom_price: state.OpenBox.payload.value.showroom_price,
          discount_limit: state.OpenBox.payload.value.discount_limit,
          polish_time: state.OpenBox.payload.value.polish_time,
          manufacturing_time: state.OpenBox.payload.value.manufacturing_time,
          status: state.OpenBox.payload.value.status,
          returnDays: state.OpenBox.payload.value.returnDays,
          COD: state.OpenBox.payload.value.COD,
          returnable: state.OpenBox.payload.value.returnable,
          bangalore_stock: state.OpenBox.payload.value.bangalore_stock,
          jodhpur_stock: state.OpenBox.payload.value.jodhpur_stock,

        });

        break;
      case 'update_Stock':
        setData({
          ...changeData,
          _id: state.OpenBox.payload.row._id,
          product_id: state.OpenBox.payload.row.product_id,
          stock: state.OpenBox.payload.row.stock,
          warehouse: state.OpenBox.payload.row.warehouse,
        });
        break
      default:
      // //console.log("");
    }
  }, [state.OpenBox.formType, state.OpenBox.state]);

  // stepper button
  const handleNextStep = () => {
    setActiveStep(activeStep + 1);
  };

  // stepper button
  const handleBackStep = () => {
    setActiveStep(activeStep - 1);
  };

  const handleDiscount = (e) => {
    if (e.target.name === "discount_limit") {
      if (e.target.value > 25) e.target.value = 25;
    }
    setDiscount({
      ...discount,
      [e.target.name]: e.target.value,
    });
  };

  // for update
  const handleChangeData = (e) => {
    switch (state.OpenBox.formType) {
      case "update_category":
        setData({
          ...changeData,
          category: e.target.value,
        });
        break;
      case "update_PrimaryMaterial":
        setData({
          ...changeData,
          [e.target.name]: e.target.value,
        });
        break;
      case "update_polish":
        setData({
          ...changeData,
          polish: e.target.value,
        });
        break;
      case "update_knob":
        setData({
          ...changeData,
          knob: e.target.value,
        });
        break;
      case "update_fitting":
        setData({
          ...changeData,
          fitting: e.target.value,
        });
        break;
      case "update_hinge":
        setData({
          ...changeData,
          hinge: e.target.value,
        });
        break;
      case "update_door":
        setData({
          ...changeData,
          door: e.target.value,
        });
        break;
      case "update_handle":
        setData({
          ...changeData,
          handle: e.target.value,
        });
        break;
      case "update_secondaryMaterial":
        setData({
          ...changeData,
          secMater: e.target.value,
        });
        break;
      case "update_product":
        setData({
          ...changeData,
          [e.target.name]: e.target.value,
        });
        break;
      case "update_blog":
        setData({
          ...changeData,
          [e.target.name]: e.target.value,
        });
        break;
      case "update_fabric":
        setData({
          ...changeData,
          [e.target.name]: e.target.value,
        });
        break;
      case "update_textile":
        setData({
          ...changeData,
          [e.target.name]: e.target.value,
        });
        break;

      default:
      // //console.log("");
    }
  };

  const feature = [
    "rotating_seats",
    "eatable_oil_polish",
    "no_chemical",
    "lean_back",
    "straight_back",
    "weaving",
    "not_suitable_for_Micro_Dish",
    "tilt_top",
    "inside_compartments",
    "stackable",
    "knife",
    "wall_hanging",
    "COD",
    "returnable",
    "mobile_store",
    "online_store",
    "continue_selling",
    "ceramic_drawers",
    "ceramic_tiles",
    "status"
  ];

  //  for product felids
  const handleProductFelids = (e) => {
    //console.log(e);
    if (feature.includes(e.target.name)) {
      setData({
        ...changeData,
        [e.target.name]: e.target.checked,
      });
    } else {
      setData({
        ...changeData,
        [e.target.name]: e.target.value,
      });
    }
    // //console.log(changeData);
  };

  const handleChange = (event) => {
    // //console.log(event.target.name);
    setCat(event.target.value);
  };

  const handleClose = () => {
    resetAll();
    dispatch({ type: OpenBox, payload: { state: false, formType: null, payload: null } });
  };

  // function for generating Merged product  ID

  const getMKU = () => {
    getLastMergeProduct()
      .then((res) => {
        if (res.data.length > 0) {

          let index = parseInt(res.data[0].MS.split("-")[1]) + 1;

          setSKU(`MS-0${index}`);
        } else {
          setSKU("MS-01001");
        }
      })
      .catch((err) => {
        // //console.log(err);
      });
  };
  // function for generating product SKU ID

  const getSKU = () => {
    getLastProduct()
      .then((res) => {
        if (res.data.length > 0) {
          // // //console.log(res.data[0].SKU)

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

  const getHKU = () => {
    getLastHardware()
      .then((res) => {
        if (res.data.length > 0) {
          let index = parseInt(res.data[0].SKU.split("-")[1]) + 1;

          setSKU(`H-0${index}`);
        } else {
          setSKU("H-01001");
        }
      })
      .catch((err) => {
        // //console.log(err);
      });
  };
  // function for generating product OID ID

  const getOID = () => {
    getLastOrder()
      .then((res) => {
        if (res.data.length > 0) {
          let index = parseInt(res.data[0].OID.split("-")[1]) + 1;

          setSKU(`OID-0${index}`);
        } else {
          setSKU("OID-01001");
        }
      })
      .catch((err) => {
        // //console.log(err);
      });
  };

  // function for handling category
  const handleTextile = (e) => {
    e.preventDefault();

    const FD = new FormData();

    FD.append("textile_image", Image[0]);
    FD.append("textile_name", e.target.textile_name.value);
    FD.append("textile_status", e.target.textile_status.checked);

    // // //console.log(acceptedFiles[0].name, e.target.category_name.value)

    const res = addTextile(FD);

    res
      .then((data) => {
        // //console.log(data.status);

        if (data.status === 203) {
          setImages([]);
          dispatch({
            type: Notify, payload: {
              open: true,
              variant: "error",
              message: data.data.message,
            }
          });
        } else {
          state.OpenBox.setRow([...state.OpenBox.row, {
            id: state.OpenBox.row.length + 1,
            textile_name: data.data.response.textile_name,
            textile_status: data.data.response.textile_status,
            textile_image: data.data.response.textile_image,
            action: data.data.response
          }])
          setImages([]);
          handleClose();
          dispatch({
            type: Notify, payload: {
              open: true,
              variant: "success",
              message: data.data.message,
            }
          });
        }
      })
      .catch((err) => {
        console.log(err);
        setImages([]);
        dispatch({
          type: Notify, payload: {
            open: true,
            variant: "error",
            message: "Something Went Wrong !!!",
          }
        });
      });
  };
  const handleFabric = (e) => {
    e.preventDefault();

    const FD = new FormData();

    FD.append("fabric_image", Image[0]);
    FD.append("fabric_name", e.target.fabric_name.value);
    FD.append("fabric_status", e.target.fabric_status.checked);

    // // //console.log(acceptedFiles[0].name, e.target.category_name.value)

    const res = addFabric(FD);

    res
      .then((data) => {
        // //console.log(data.status);

        if (data.status === 203) {

          dispatch({
            type: Notify, payload: {
              open: true,
              variant: "error",
              message: data.data.message,
            }
          });
        } else {
          state.OpenBox.setRow([...state.OpenBox.row, {
            id: state.OpenBox.row.length + 1,
            fabric_name: data.data.response.fabric_name,
            fabric_status: data.data.response.fabric_status,
            fabric_image: data.data.response.fabric_image,
            action: data.data.response
          }])
          handleClose();
          dispatch({
            type: Notify, payload: {
              open: true,
              variant: "success",
              message: data.data.message,
            }
          });
        }
      })
      .catch((err) => {
        // //console.log(err);

        dispatch({
          type: Notify, payload: {
            open: true,
            variant: "error",
            message: "Something Went Wrong !!!",
          }
        });
      });
  };

  // function for handling category
  const handleCategory = (e) => {
    e.preventDefault();

    const FD = new FormData();

    FD.append("category_image", Image[0]);
    FD.append("category_name", e.target.category_name.value);
    FD.append("category_status", e.target.category_status.checked);

    // // //console.log(acceptedFiles[0].name, e.target.category_name.value)

    const res = addCategory(FD);

    res
      .then((data) => {
        // //console.log(data.status);

        if (data.status === 203) {
          setImages([]);
          dispatch({
            type: Notify, payload: {
              open: true,
              variant: "error",
              message: data.data.message,
            }
          });
        } else {
          state.OpenBox.setRow([...state.OpenBox.row, {
            id: state.OpenBox.row.length + 1,
            category_name: data.data.response.category_name,
            category_status: data.data.response.category_status,
            category_image: data.data.response.category_image,
            action: data.data.response
          }])
          setImages([]);
          handleClose();
          dispatch({
            type: Notify, payload: {
              open: true,
              variant: "success",
              message: data.data.message,
            }
          });
        }
      })
      .catch((err) => {
        console.log(err);
        setImages([]);
        dispatch({
          type: Notify, payload: {
            open: true,
            variant: "error",
            message: "Something Went Wrong !!!",
          }
        });
      });
  };
  // function for handling Customer
  const handleCustomer = (e) => {
    e.preventDefault();

    const FD = new FormData();

    FD.append("profile_image", Image[0]);

    FD.append("username", e.target.username.value);
    FD.append("mobile", e.target.mobile.value);
    FD.append("email", e.target.email.value);
    FD.append("password", e.target.password.value);
    FD.append("shipping", JSON.stringify(address));

    const res = addCustomer(FD);

    res
      .then((data) => {
        // //console.log(data.status);

        if (data.status === 203) {
          setImages([]);
          dispatch({
            type: Notify, payload: {
              open: true,
              variant: "error",
              message: data.data.message,
            }
          });
        } else {
          state.OpenBox.setRow([...state.OpenBox.row, {
            id: state.OpenBox.row.length + 1,
            CID: data.data.response.CID,
            register_time: data.data.response.register_time,
            profile_image: data.data.response.profile_image,
            username: data.data.response.username,
            mobile: data.data.response.mobile,
            email: data.data.response.email,
            password: data.data.response.password,
            shipping: data.data.response.shipping,
            action: data.data.response
          }])
          setAddress([]);
          setImages([]);
          handleClose();
          dispatch({
            type: Notify, payload: {
              open: true,
              variant: "success",
              message: data.data.message,
            }
          });
        }
      })
      .catch((err) => {
        console.log(err);
        setImages([]);
        dispatch({
          type: Notify, payload: {
            open: true,
            variant: "error",
            message: "Something Went Wrong !!!",
          }
        });
      });
  };
  // function for handling Customer
  const handleUpdateCustomer = (e) => {
    e.preventDefault();

    const FD = new FormData();

    Image[0] !== undefined && FD.append("profile_image", Image[0]);

    FD.append("CID", changeData.CID);
    FD.append("username", changeData.username);
    FD.append("mobile", changeData.mobile);
    FD.append("email", changeData.email);
    FD.append("password", changeData.password);
    FD.append("city", changeData.city);
    // FD.append("pincode", changeData.pincode);
    FD.append("state", changeData.state);
    // FD.append("landmark", changeData.landmark);
    FD.append("shipping", changeData.shipping);

    const res = updateCustomer(FD);

    res
      .then((data) => {
        // //console.log(data.status);

        if (data.status === 203) {
          setImages([]);
          dispatch({
            type: Notify, payload: {
              open: true,
              variant: "error",
              message: data.data.message,
            }
          });
        } else {
          state.OpenBox.setRow(state.OpenBox.row.map((set) => {
            if (set.action === state.OpenBox.payload.row.action) {
              set.CID = changeData.CID
              set.register_time = changeData.register_time
              set.profile_image = Image[0] !== undefined ? `${imageLink}${Image[0].path}` : console.log()
              set.username = changeData.username
              set.mobile = changeData.mobile
              set.email = changeData.email
              set.password = changeData.password
              set.city = changeData.city
              set.state = changeData.state
              set.shipping = changeData.shipping

            }
            return set;
          }))
          setImages([]);
          handleClose();
          dispatch({
            type: Notify, payload: {
              open: true,
              variant: "success",
              message: data.data.message,
            }
          });
        }
      })
      .catch((err) => {
        console.log(err);
        setImages([]);
        dispatch({
          type: Notify, payload: {
            open: true,
            variant: "error",
            message: "Something Went Wrong !!!",
          }
        });
      });
  };

  // function for handling update category
  const handleUpdateTextile = (e) => {
    e.preventDefault();

    const FD = new FormData();

    FD.append("_id", state.OpenBox.payload.row.action);

    Image[0] !== undefined && FD.append("fabric_image", Image[0]);

    e.target.textile_name.value !== ""
      ? FD.append("textile_name", e.target.textile_name.value)
      : console.log();

    const res = editTextile(FD);
    res
      .then((data) => {
        // //console.log(data.status);

        if (data.status === 203) {
          setImages([]);
          dispatch({
            type: Notify, payload: {
              open: true,
              variant: "error",
              message: data.data.message,
            }
          });
        } else {
          state.OpenBox.setRow(state.OpenBox.row.map((set) => {
            if (set.action === state.OpenBox.payload.row.action) {
              set.textile_name = e.target.textile_name.value;
              set.textile_image = Image[0] !== undefined ? `${imageLink}${Image[0].path}` : console.log()

            }
            return set;
          }))
          setImages([]);
          handleClose();
          dispatch({
            type: Notify, payload: {
              open: true,
              variant: "success",
              message: data.data.message,
            }
          });
        }
      })
      .catch((err) => {
        // //console.log(err);
        setImages([]);
        dispatch({
          type: Notify, payload: {
            open: true,
            variant: "error",
            message: "Something Went Wrong !!!",
          }
        });
      });
  };
  // function for handling update category
  const handleUpdateFabric = (e) => {
    e.preventDefault();

    const FD = new FormData();

    FD.append("_id", state.OpenBox.payload.row.action);

    Image[0] !== undefined && FD.append("fabric_image", Image[0]);

    e.target.fabric_name.value !== ""
      ? FD.append("fabric_name", e.target.fabric_name.value)
      : console.log();

    const res = editFabric(FD);
    res
      .then((data) => {
        // //console.log(data.status);

        if (data.status === 203) {
          setImages([]);
          dispatch({
            type: Notify, payload: {
              open: true,
              variant: "error",
              message: data.data.message,
            }
          });
        } else {
          state.OpenBox.setRow(state.OpenBox.row.map((set) => {
            if (set.action === state.OpenBox.payload.row.action) {
              set.fabric_name = e.target.fabric_name.value;
              set.fabric_image = Image[0] !== undefined ? `${imageLink}${Image[0].path}` : console.log()

            }
            return set;
          }))
          setImages([]);
          handleClose();
          dispatch({
            type: Notify, payload: {
              open: true,
              variant: "success",
              message: data.data.message,
            }
          });
        }
      })
      .catch((err) => {
        // //console.log(err);
        setImages([]);
        dispatch({
          type: Notify, payload: {
            open: true,
            variant: "error",
            message: "Something Went Wrong !!!",
          }
        });
      });
  };
  // function for handling update category
  const handleUpdateCategory = (e) => {
    e.preventDefault();

    const FD = new FormData();

    FD.append("_id", state.OpenBox.payload.row.action);

    Image[0] !== undefined && FD.append("category_image", Image[0]);
    console.log(Image[0])

    e.target.category_name.value !== undefined
      ? FD.append("category_name", e.target.category_name.value)
      : console.log();

    const res = editCategory(FD);
    res
      .then((data) => {

        if (data.status === 203) {
          setImages([]);
          dispatch({
            type: Notify, payload: {
              open: true,
              variant: "error",
              message: data.data.message,
            }
          });
        } else {
          state.OpenBox.setRow(state.OpenBox.row.map((set) => {
            if (set.action === state.OpenBox.payload.row.action) {
              set.category_name = e.target.category_name.value;
              Image[0] !== undefined ? set.category_image = `https://woodshala.in/upload/${Image[0].path}` : console.log();
            }
            return set;
          }))
          setImages([]);
          handleClose();
          dispatch({
            type: Notify, payload: {
              open: true,
              variant: "success",
              message: data.data.message,
            }
          });
        }
      })
      .catch((err) => {
        // //console.log(err);
        setImages([]);
        dispatch({
          type: Notify, payload: {
            open: true,
            variant: "error",
            message: "Something Went Wrong !!!",
          }
        });
      });
  };

  // function fo resting the values

  const resetAll = () => {
    setImages([]);
    setFeatured([]);
    setMannequin([]);
    setFiles([]);
    setActiveStep(0);
    setShowFabric("No");
    setData({
      savedImages: [],
      warehouse_name: '',
      searchCustomer: "",
      primary_material: [],
      product_array: [],
      shipping: [],
      warehouse: [],
      product_title: "",
      seo_title: "",
      seo_des: "",
      seo_keyword: "",
      product_des: "",
      category: "",
      sub_category: "",
      length: "",
      breadth: "",
      selling_points: "",
      height: "",
      priMater: "",
      priMater_weight: "",
      secMater: "",
      secMater_weight: "",
      selling_price: "",
      mrp: "",
      discount_cap: "",
      polish_time: "",
      manufacturing_time: "",
      polish: [],
      hinge: "",
      knob: "",
      handle: "",
      door: "",
      wight_cap: "",
      wall_hanging: "",
      assembly_required: "",
      assembly_leg: "",
      assembly_parts: "",
      fitting: "",
      rotating: "",
      eatable: "",
      no_chemical: "",
      straight_back: "",
      lean_back: "",
      weaving: "",
      not_micro_dish: "",
      tilt_top: "",
      inside_comp: "",
      stackable: "",
      silver: "",
      selling_point: "",
      mirror: "",
      joints: "",
      tax_rate: 18,
      seat_width: "",
      seat_depth: "",
      seat_height: "",
      wheel: "",
      trolly: "",
      returnable: false,
      returnDays: 0,
      trolly_mater: "",
      top_size: 0,
      dial_size: 0,
      COD: false,
      textile: "",
      quantity: 1,
      unit: 'Pcs',
      legs: 'None',
      assembly_level: 'Easy Assembly',
      mobile_store: true,
      online_store: true,
      continue_selling: true
    });
    document.getElementById("myForm").reset();
  };

  const handleAddImage = (e) => {
    e.preventDefault();
    const FD = new FormData();

    files.map((element) => {
      return FD.append("product_image", element);
    });

    FD.append("SKU", e.target.SKU.value);

    const res = addImage(FD);

    res
      .then((data) => {
        dispatch({
          type: Notify, payload: {
            open: true,
            variant: "success",
            message: data.data.message,
          }
        });
      })
      .catch((data) => {
        dispatch({
          type: Notify, payload: {
            open: true,
            variant: "error",
            message: data.data.message,
          }
        });
      });
  };

  const handleUpdateGallery = (e) => {
    const FD = new FormData();

    e.preventDefault();

    FD.append("category_image", Image[0]);
    FD.append("SKU", state.OpenBox.payload.SKU);
    FD.append("ImageIndex", state.OpenBox.payload.imageIndex);

    const res = updateImage(FD);

    // //console.log(state.OpenBox.payload);

    res
      .then((data) => {
        dispatch({
          type: Notify, payload: {
            open: true,
            variant: "success",
            message: data.data.message,
          }
        });
      })
      .catch((data) => {
        dispatch({
          type: Notify, payload: {
            open: true,
            variant: "error",
            message: data.data.message,
          }
        });
      });
  };

  const handleProduct = (e) => {
    e.preventDefault();

    const FD = new FormData();

    files.map((element) => {
      if (element.validate) return FD.append("product_image", element);
    });

    FD.append("status", false);

    // Image.map((element) => {
    //   return FD.append("specification_image", element);
    // });

    // featured.map((element) => {
    //   return FD.append("featured_image", element);
    // });

    // Mannequin.map((element) => {
    //   return FD.append("mannequin_image", element);
    // });

    FD.append("specification_image", changeData.specification_image || '');
    FD.append("featured_image", changeData.featured_image || '');
    FD.append("mannequin_image", changeData.mannequin_image || '');

    FD.append(
      "primary_material_name",
      JSON.stringify(changeData.primary_material)
    );

    FD.append(
      "warehouse_name",
      JSON.stringify(changeData.warehouse)
    );
    FD.append(
      "polish_name",
      JSON.stringify(changeData.polish)
    );


    category.map((item) => {
      return (
        item._id === changeData.category_name &&
        FD.append("category_name", item.category_name)
      );
    });

    subCategory.map((item) => {
      return (
        item._id === changeData.sub_category_name &&
        FD.append("sub_category_name", item.sub_category_name)
      );
    });

    // polishCatalog.map((item) => {
    //   return (
    //     item._id === changeData.polish &&
    //     FD.append("polish_name", item.polish_name)
    //   );
    // });

    catalog.textile.map((item) => {
      return (
        item.SKU === changeData.textile_type &&
        FD.append("textile_name", item.title)
      );
    });
    catalog.hinge.map((item) => {
      return (
        item.SKU === changeData.hinge &&
        FD.append("hinge_name", item.title)
      );
    });
    catalog.fitting.map((item) => {
      return (
        item.SKU === changeData.fitting &&
        FD.append("fitting_name", item.title)
      );
    });
    catalog.knob.map((item) => {
      return (
        item.SKU === changeData.knob && FD.append("knob_name", item.title)
      );
    });
    catalog.door.map((item) => {
      return (
        item.SKU === changeData.door && FD.append("door_name", item.title)
      );
    });
    catalog.handle.map((item) => {
      return (
        item._id === changeData.handle &&
        FD.append("handle_name", item.title)
      );
    });

    if (showFabric === "Yes") {
      catalog.fabric.map((item) => {
        return (
          item.fabric === changeData.fabric &&
          FD.append("fabric_name", item.title)
        );
      });
    }

    FD.append("parentProduct", changeData.SKU);
    FD.append("returnDays", changeData.returnable ? changeData.returnDays : 0);
    FD.append("returnable", changeData.returnable);
    FD.append("COD", changeData.COD);
    FD.append("polish", changeData.polish);
    FD.append("hinge", changeData.hinge);
    FD.append("knob", changeData.knob);
    FD.append("handle", changeData.handle);
    FD.append("door", changeData.door);
    FD.append("fitting", changeData.fitting);
    FD.append("textile", changeData.textile);
    FD.append("textile_type", changeData.textile_type);
    FD.append("range", changeData.range);

    FD.append("category_id", changeData.category_name);
    FD.append("back_style", changeData.back_style);
    FD.append("sub_category_id", changeData.sub_category_name);
    FD.append("polish_time", changeData.polish_time);
    FD.append("manufacturing_time", changeData.manufacturing_time);
    FD.append("product_title", changeData.product_title);
    FD.append("product_description", changeData.product_description);
    FD.append("selling_points", JSON.stringify(changeData.selling_points));
    FD.append("SKU", SKU);
    FD.append("MRP", changeData.MRP ? changeData.MRP : 0);
    FD.append(
      "showroom_price",
      changeData.showroom_price ? changeData.showroom_price : 0
    );
    FD.append("seo_title", changeData.seo_title);
    FD.append("seo_description", changeData.seo_description);
    FD.append("seo_keyword", changeData.seo_keyword);
    FD.append("discount_limit", changeData.discount_limit || 0);
    FD.append("selling_price", changeData.selling_price);
    FD.append("primary_material", changeData.primary_material);
    FD.append("warehouse", changeData.warehouse);
    // FD.append("polish", changeData.polish);
    FD.append("fabric", changeData.fabric);

    FD.append("drawer", changeData.drawer);

    FD.append("unit", changeData.unit);
    FD.append("quantity", changeData.quantity ? changeData.quantity : 1);

    if (changeData.drawer !== undefined || changeData.drawer !== "none")
      FD.append(
        "drawer_count",
        changeData.drawer_count ? changeData.drawer_count : 0
      );

    //  // //console.log(secMaterial)
    if (changeData.secondary_material_weight !== undefined)
      FD.append(
        "secondary_material_weight",
        changeData.secondary_material_weight
      );
    FD.append(
      "length_main",
      changeData.length_main ? changeData.length_main : 0
    );
    FD.append("assembly_level", changeData.assembly_level);

    FD.append("package_length", changeData.package_length ? changeData.package_length : 0);
    FD.append("package_height", changeData.package_height ? changeData.package_height : 0);
    FD.append("package_breadth", changeData.package_breadth ? changeData.package_breadth : 0);

    FD.append("breadth", changeData.breadth ? changeData.breadth : 0);
    FD.append("height", changeData.height ? changeData.height : 0);
    FD.append("weight", changeData.weight ? changeData.weight : 0);

    FD.append("top_size", changeData.top_size);
    FD.append("dial_size", changeData.dial_size);
    FD.append(
      "seating_size_width",
      changeData.seating_size_width ? changeData.seating_size_width : 0
    );
    FD.append(
      "seating_size_depth",
      changeData.seating_size_depth ? changeData.seating_size_depth : 0
    );
    FD.append(
      "seating_size_height",
      changeData.seating_size_height ? changeData.seating_size_height : 0
    );
    FD.append("weight_capacity", changeData.weight_capacity);
    FD.append("assembly_required", changeData.assembly_required);

    if (changeData.jodhpur_stock && changeData.jodhpur_stock > 0)
      FD.append("jodhpur_stock", changeData.jodhpur_stock);

    if (changeData.bangalore_stock && changeData.bangalore_stock > 0)
      FD.append("bangalore_stock", changeData.bangalore_stock);


    if (changeData.assembly_required === "shipping")
      FD.append("assembly_part", changeData.assembly_part);
    if (changeData.assembly_required === "yes")
      FD.append("legs", changeData.legs);

    if (changeData.silver === "yes")
      FD.append(
        "silver_weight",
        changeData.silver_weight ? changeData.silver_weight : 0
      );

    if (changeData.trolley === "yes")
      FD.append("trolley_material", changeData.trolley_material);

    if (changeData.upholstery === "Yes") FD.append("fabric", changeData.fabric);

    FD.append("mirror", changeData.mirror);

    if (changeData.mirror === "yes") {
      FD.append(
        "mirror_length",
        changeData.mirror_length ? changeData.mirror_length : 0
      );
      FD.append(
        "mirror_width",
        changeData.mirror_width ? changeData.mirror_width : 0
      );
    }
    FD.append("joints", changeData.joints ? changeData.joints : "");
    FD.append(
      "upholstery",
      changeData.upholstery ? changeData.upholstery : "no"
    );
    FD.append("wheel", changeData.wheel ? changeData.wheel : "no");
    FD.append("trolley", changeData.trolley ? changeData.trolley : "no");
    FD.append("silver", changeData.silver ? changeData.silver : "no");
    FD.append(
      "rotating_seats",
      changeData.rotating_seats ? changeData.rotating_seats : false
    );
    FD.append(
      "eatable_oil_polish",
      changeData.eatable_oil_polish ? changeData.eatable_oil_polish : false
    );
    FD.append(
      "no_chemical",
      changeData.no_chemical ? changeData.no_chemical : false
    );
    FD.append("ceramic_drawers", changeData.ceramic_drawers ? changeData.ceramic_drawers : false);
    FD.append("ceramic_tiles", changeData.ceramic_tiles ? changeData.ceramic_tiles : false);
    FD.append("weaving", changeData.weaving ? changeData.weaving : false);
    FD.append("knife", changeData.knife ? changeData.knife : false);
    FD.append(
      "mobile_store",
      changeData.mobile_store ? changeData.mobile_store : true
    );
    FD.append(
      "online_store",
      changeData.online_store ? changeData.online_store : true
    );
    FD.append(
      "continue_selling",
      changeData.continue_selling ? changeData.continue_selling : true
    );

    FD.append(
      "wall_hanging",
      changeData.wall_hanging ? changeData.wall_hanging : false
    );

    FD.append(
      "not_suitable_for_Micro_Dish",
      changeData.not_suitable_for_Micro_Dish
        ? changeData.not_suitable_for_Micro_Dish
        : false
    );

    FD.append("tilt_top", changeData.tilt_top ? changeData.tilt_top : false);
    FD.append(
      "inside_compartments",
      changeData.inside_compartments ? changeData.inside_compartments : false
    );
    FD.append("stackable", changeData.stackable ? changeData.stackable : false);
    FD.append("tax_rate", changeData.tax_rate);

    const res = addProduct(FD);


    res
      .then((data) => {
        // //console.log(data.status);

        if (data.status === 203) {
          dispatch({
            type: Notify, payload: {
              open: true,
              variant: "error",
              message: data.data.message,
            }
          });
        } else {
          state.OpenBox.setRow([...state.OpenBox.row, {
            id: state.OpenBox.row.length + 1,
            SKU: data.data.response.SKU,
            product_title: data.data.response.product_title,
            category_name: data.data.response.category_name,
            category_id: data.data.response.category_id,
            sub_category_name: data.data.response.sub_category_name,
            sub_category_id: data.data.response.sub_category_id,
            product_description: data.data.response.product_description,
            seo_title: data.data.response.seo_title,
            seo_description: data.data.response.seo_description,
            seo_keyword: data.data.response.seo_keyword,
            product_image: data.data.response.product_image,
            featured_image: data.data.response.featured_image,
            specification_image: data.data.response.specification_image,
            mannequin_image: data.data.response.mannequin_image,
            primary_material: data.data.response.primary_material,
            warehouse: data.data.response.warehouse,
            primary_material_name: data.data.response.primary_material_name,
            length_main: data.data.response.length_main,
            breadth: data.data.response.breadth,
            height: data.data.response.height,
            bangalore_stock: data.data.response.bangalore_stock,
            jodhpur_stock: data.data.response.jodhpur_stock,
            weight: data.data.response.weight,
            polish: data.data.response.polish,
            polish_name: data.data.response.polish_name,
            hinge: data.data.response.hinge,
            hinge_name: data.data.response.hinge_name,
            knob: data.data.response.knob,
            textile: data.data.response.textile,
            knob_name: data.data.response.knob_name,
            textile_name: data.data.response.textile_name,
            textile_type: data.data.response.textile_type,
            handle: data.data.response.handle,
            handle_name: data.data.response.handle_name,
            door: data.data.response.door,
            door_name: data.data.response.door_name,
            fitting: data.data.response.fitting,
            fitting_name: data.data.response.fitting_name,
            selling_points: data.data.response.selling_points,
            top_size: data.data.response.top_size,
            dial_size: data.data.response.dial_size,
            seating_size_width: data.data.response.seating_size_width,
            seating_size_depth: data.data.response.seating_size_depth,
            seating_size_height: data.data.response.seating_size_height,
            weight_capacity: data.data.response.weight_capacity,
            fabric: data.data.response.fabric,
            fabric_name: data.data.response.fabric_name,
            wall_hanging: data.data.response.wall_hanging,
            assembly_required: data.data.response.assembly_required,
            assembly_part: data.data.response.assembly_part,
            legs: data.data.response.legs,
            mirror: data.data.response.mirror,
            mirror_length: data.data.response.mirror_length,
            mirror_width: data.data.response.mirror_width,
            silver: data.data.response.silver,
            silver_weight: data.data.response.silver_weight,
            joints: data.data.response.joints,
            upholstery: data.data.response.upholstery,
            wheel: data.data.response.wheel,
            trolley: data.data.response.trolley,
            trolley_material: data.data.response.trolley_material,
            rotating_seats: data.data.response.rotating_seats,
            eatable_oil_polish: data.data.response.eatable_oil_polish,
            no_chemical: data.data.response.no_chemical,
            straight_back: data.data.response.straight_back,
            lean_back: data.data.response.lean_back,
            weaving: data.data.response.weaving,
            knife: data.data.response.knife,
            not_suitable_for_Micro_Dish: data.data.response.not_suitable_for_Micro_Dish,
            tilt_top: data.data.response.tilt_top,
            inside_compartments: data.data.response.inside_compartments,
            stackable: data.data.response.stackable,
            MRP: data.data.response.MRP,
            tax_rate: data.data.response.tax_rate,
            selling_price: data.data.response.selling_price,
            showroom_price: data.data.response.showroom_price,
            discount_limit: data.data.response.discount_limit,
            polish_time: data.data.response.polish_time,
            manufacturing_time: data.data.response.manufacturing_time,
            status: data.data.response.status,
            returnDays: data.data.response.returnDays,
            COD: data.data.response.COD,
            returnable: data.data.response.returnable,
            drawer: data.data.response.drawer,
            drawer_count: data.data.response.drawer_count,
            range: data.data.response.range,
            action: data.data.response
          }])
          handleClose();
          dispatch({
            type: Notify, payload: {
              open: true,
              variant: "success",
              message: data.data.message,
            }
          });
        }
      })
      .catch((err) => {
        // //console.log(err);
        dispatch({
          type: Notify, payload: {
            open: true,
            variant: "error",
            message: "Something Went Wrong !!!",
          }
        });
      });
  };
  const handleVariation = (e) => {
    e.preventDefault();

    const FD = new FormData();
    FD.append("status", false);

    // console.log(changeData.product_image,
    //   changeData.specification_image,
    //   changeData.featured_image,
    //   changeData.mannequin_image)

  
    files.map((element) => {
      if (element.validate) return FD.append("product_image", element);
    });
    FD.append('savedImages', JSON.stringify(changeData.savedImages));
    

    // Image.length > 0 ? Image.map((element) => {
    //   return FD.append("specification_image", element);
    // }) : FD.append("specification_image", changeData.specification_image);

    // featured.length > 0 ? featured.map((element) => {
    //   return FD.append("featured_image", element);
    // }) : FD.append("featured_image", changeData.featured_image);

    // Mannequin.length > 0 ? Mannequin.map((element) => {
    //   return FD.append("mannequin_image", element);
    // }) : FD.append("mannequin_image", changeData.mannequin_image);

     FD.append("specification_image", changeData.specification_image || '');
     FD.append("featured_image", changeData.featured_image || '');
     FD.append("mannequin_image", changeData.mannequin_image || '');




    FD.append(
      "primary_material_name",
      JSON.stringify(changeData.primary_material)
    );

    FD.append(
      "warehouse_name",
      JSON.stringify(changeData.warehouse)
    );
    FD.append(
      "polish_name",
      JSON.stringify(changeData.polish)
    );


    category.map((item) => {
      return (
        item._id === changeData.category_name &&
        FD.append("category_name", item.category_name)
      );
    });

    subCategory.map((item) => {
      return (
        item._id === changeData.sub_category_name &&
        FD.append("sub_category_name", item.sub_category_name)
      );
    });

    // polishCatalog.map((item) => {
    //   return (
    //     item._id === changeData.polish &&
    //     FD.append("polish_name", item.polish_name)
    //   );
    // });

    catalog.textile.map((item) => {
      return (
        item.SKU === changeData.textile_type &&
        FD.append("textile_name", item.title)
      );
    });
    catalog.hinge.map((item) => {
      // if (item.SKU === changeData.hinge) multiOBJ = { ...multiOBJ, hinge_name: item.title}

      return (
        item.SKU === changeData.hinge &&
        FD.append("hinge_name", item.title)
      );
    });
    catalog.fitting.map((item) => {
      // if (item.SKU === changeData.fitting) multiOBJ = { ...multiOBJ, fitting_name: item.title }

      return (
        item.SKU === changeData.fitting &&
        FD.append("fitting_name", item.title)
      );
    });

    
    catalog.knob.map((item) => {
      // if (item.SKU === changeData.knob) multiOBJ = { ...multiOBJ, knob_name: item.title }

      return (
        item.SKU === changeData.knob && FD.append("knob_name", item.title)
      );
    });
    catalog.door.map((item) => {
      // if (item.SKU === changeData.door) multiOBJ = { ...multiOBJ, door_name: item.title }

      return (
        item.SKU === changeData.door && FD.append("door_name", item.title)
      );
    });
    catalog.handle.map((item) => {
      // if (item.SKU === changeData.handle) multiOBJ = { ...multiOBJ, handle_name: item.title }

      return (
        item.SKU === changeData.handle &&
        FD.append("handle_name", item.title)
      );
    });

    if (showFabric === "Yes") {
      catalog.fabric.map((item) => {
        return (
          item._id === changeData.fabric &&
          FD.append("fabric_name", item.title)
        );
      });
    }

    // for adding variation SKU to the product
    const parentArray = changeData.variation_array;
    console.log(changeData.variation_array)

    parentArray.push(SKU)

    FD.append("parentArray", JSON.stringify(parentArray));
    FD.append("parentProduct", changeData.SKU);
    FD.append("returnDays", changeData.returnable ? changeData.returnDays : 0);
    FD.append("returnable", changeData.returnable);
    FD.append("COD", changeData.COD);
    FD.append("polish", changeData.polish);
    FD.append("hinge", changeData.hinge);
    FD.append("knob", changeData.knob);
    FD.append("handle", changeData.handle);
    FD.append("door", changeData.door);
    FD.append("fitting", changeData.fitting);
    FD.append("textile", changeData.textile);
    FD.append("textile_type", changeData.textile_type);
    FD.append("range", changeData.range);

    FD.append("category_id", changeData.category_name);
    FD.append("back_style", changeData.back_style);
    FD.append("sub_category_id", changeData.sub_category_name);
    FD.append("polish_time", changeData.polish_time);
    FD.append("manufacturing_time", changeData.manufacturing_time);
    FD.append("product_title", changeData.product_title);
    FD.append("product_description", changeData.product_description);
    FD.append("selling_points", JSON.stringify(changeData.selling_points));
    FD.append("SKU", SKU);
    FD.append("MRP", changeData.MRP ? changeData.MRP : 0);
    FD.append(
      "showroom_price",
      changeData.showroom_price ? changeData.showroom_price : 0
    );
    FD.append("seo_title", changeData.seo_title);
    FD.append("seo_description", changeData.seo_description);
    FD.append("seo_keyword", changeData.seo_keyword);
    FD.append("discount_limit", changeData.discount_limit || 0);
    FD.append("selling_price", changeData.selling_price);
    FD.append("primary_material", changeData.primary_material);
    FD.append("warehouse", changeData.warehouse);
    FD.append("fabric", changeData.fabric);

    FD.append("drawer", changeData.drawer);

    FD.append("unit", changeData.unit);
    FD.append("quantity", changeData.quantity ? changeData.quantity : 1);

    if (changeData.drawer !== undefined || changeData.drawer !== "none")
      FD.append(
        "drawer_count",
        changeData.drawer_count ? changeData.drawer_count : 0
      );

    //  // //console.log(secMaterial)
    if (changeData.secondary_material_weight !== undefined)
      FD.append(
        "secondary_material_weight",
        changeData.secondary_material_weight
      );
    FD.append(
      "length_main",
      changeData.length_main ? changeData.length_main : 0
    );
    FD.append("assembly_level", changeData.assembly_level);


    FD.append("package_length", changeData.package_length ? changeData.package_length : 0);
    FD.append("package_height", changeData.package_height ? changeData.package_height : 0);
    FD.append("package_breadth", changeData.package_breadth ? changeData.package_breadth : 0);

    FD.append("breadth", changeData.breadth ? changeData.breadth : 0);
    FD.append("height", changeData.height ? changeData.height : 0);
    FD.append("weight", changeData.weight ? changeData.weight : 0);

    FD.append("top_size", changeData.top_size);
    FD.append("dial_size", changeData.dial_size);
    FD.append(
      "seating_size_width",
      changeData.seating_size_width ? changeData.seating_size_width : 0
    );
    FD.append(
      "seating_size_depth",
      changeData.seating_size_depth ? changeData.seating_size_depth : 0
    );
    FD.append(
      "seating_size_height",
      changeData.seating_size_height ? changeData.seating_size_height : 0
    );
    FD.append("weight_capacity", changeData.weight_capacity);
    FD.append("assembly_required", changeData.assembly_required);

    if (changeData.jodhpur_stock && changeData.jodhpur_stock > 0)
      FD.append("jodhpur_stock", changeData.jodhpur_stock);

    if (changeData.bangalore_stock && changeData.bangalore_stock > 0)
      FD.append("bangalore_stock", changeData.bangalore_stock);


    if (changeData.assembly_required === "shipping")
      FD.append("assembly_part", changeData.assembly_part);
    if (changeData.assembly_required === "yes")
      FD.append("legs", changeData.legs);

    if (changeData.silver === "yes")
      FD.append(
        "silver_weight",
        changeData.silver_weight ? changeData.silver_weight : 0
      );

    if (changeData.trolley === "yes")
      FD.append("trolley_material", changeData.trolley_material);

    if (changeData.upholstery === "Yes") FD.append("fabric", changeData.fabric);

    FD.append("mirror", changeData.mirror);

    if (changeData.mirror === "yes") {
      FD.append(
        "mirror_length",
        changeData.mirror_length ? changeData.mirror_length : 0
      );
      FD.append(
        "mirror_width",
        changeData.mirror_width ? changeData.mirror_width : 0
      );
    }
    FD.append("joints", changeData.joints ? changeData.joints : "");
    FD.append(
      "upholstery",
      changeData.upholstery ? changeData.upholstery : "no"
    );
    FD.append("wheel", changeData.wheel ? changeData.wheel : "no");
    FD.append("trolley", changeData.trolley ? changeData.trolley : "no");
    FD.append("silver", changeData.silver ? changeData.silver : "no");
    FD.append(
      "rotating_seats",
      changeData.rotating_seats ? changeData.rotating_seats : false
    );
    FD.append(
      "eatable_oil_polish",
      changeData.eatable_oil_polish ? changeData.eatable_oil_polish : false
    );
    FD.append(
      "no_chemical",
      changeData.no_chemical ? changeData.no_chemical : false
    );
    FD.append("ceramic_drawers", changeData.ceramic_drawers ? changeData.ceramic_drawers : false);
    FD.append("ceramic_tiles", changeData.ceramic_tiles ? changeData.ceramic_tiles : false);
    FD.append("weaving", changeData.weaving ? changeData.weaving : false);
    FD.append("knife", changeData.knife ? changeData.knife : false);
    FD.append(
      "mobile_store",
      changeData.mobile_store ? changeData.mobile_store : true
    );
    FD.append(
      "online_store",
      changeData.online_store ? changeData.online_store : true
    );
    FD.append(
      "continue_selling",
      changeData.continue_selling ? changeData.continue_selling : true
    );

    FD.append(
      "wall_hanging",
      changeData.wall_hanging ? changeData.wall_hanging : false
    );

    FD.append(
      "not_suitable_for_Micro_Dish",
      changeData.not_suitable_for_Micro_Dish
        ? changeData.not_suitable_for_Micro_Dish
        : false
    );

    FD.append("tilt_top", changeData.tilt_top ? changeData.tilt_top : false);
    FD.append(
      "inside_compartments",
      changeData.inside_compartments ? changeData.inside_compartments : false
    );
    FD.append("stackable", changeData.stackable ? changeData.stackable : false);
    FD.append("tax_rate", changeData.tax_rate);

    const res = variation(FD);


    res
      .then((data) => {


        if (data.status === 203) {
          dispatch({
            type: Notify, payload: {
              open: true,
              variant: "error",
              message: data.data.message,
            }
          });
        } else {
          state.OpenBox.setRow([...state.OpenBox.row, {
            id: state.OpenBox.row.length + 1,
            SKU: data.data.response.SKU,
            product_title: data.data.response.product_title,
            category_name: data.data.response.category_name,
            category_id: data.data.response.category_id,
            sub_category_name: data.data.response.sub_category_name,
            sub_category_id: data.data.response.sub_category_id,
            product_description: data.data.response.product_description,
            seo_title: data.data.response.seo_title,
            seo_description: data.data.response.seo_description,
            seo_keyword: data.data.response.seo_keyword,
            product_image: data.data.response.product_image,
            featured_image: data.data.response.featured_image,
            specification_image: data.data.response.specification_image,
            mannequin_image: data.data.response.mannequin_image,
            primary_material: data.data.response.primary_material,
            warehouse: data.data.response.warehouse,
            primary_material_name: data.data.response.primary_material_name,
            length_main: data.data.response.length_main,
            breadth: data.data.response.breadth,
            height: data.data.response.height,
            bangalore_stock: data.data.response.bangalore_stock,
            jodhpur_stock: data.data.response.jodhpur_stock,
            weight: data.data.response.weight,
            polish: data.data.response.polish,
            polish_name: data.data.response.polish_name,
            hinge: data.data.response.hinge,
            hinge_name: data.data.response.hinge_name,
            knob: data.data.response.knob,
            textile: data.data.response.textile,
            knob_name: data.data.response.knob_name,
            textile_name: data.data.response.textile_name,
            textile_type: data.data.response.textile_type,
            handle: data.data.response.handle,
            handle_name: data.data.response.handle_name,
            door: data.data.response.door,
            door_name: data.data.response.door_name,
            fitting: data.data.response.fitting,
            fitting_name: data.data.response.fitting_name,
            selling_points: data.data.response.selling_points,
            top_size: data.data.response.top_size,
            dial_size: data.data.response.dial_size,
            seating_size_width: data.data.response.seating_size_width,
            seating_size_depth: data.data.response.seating_size_depth,
            seating_size_height: data.data.response.seating_size_height,
            weight_capacity: data.data.response.weight_capacity,
            fabric: data.data.response.fabric,
            fabric_name: data.data.response.fabric_name,
            wall_hanging: data.data.response.wall_hanging,
            assembly_required: data.data.response.assembly_required,
            assembly_part: data.data.response.assembly_part,
            legs: data.data.response.legs,
            mirror: data.data.response.mirror,
            mirror_length: data.data.response.mirror_length,
            mirror_width: data.data.response.mirror_width,
            silver: data.data.response.silver,
            silver_weight: data.data.response.silver_weight,
            joints: data.data.response.joints,
            upholstery: data.data.response.upholstery,
            wheel: data.data.response.wheel,
            trolley: data.data.response.trolley,
            trolley_material: data.data.response.trolley_material,
            rotating_seats: data.data.response.rotating_seats,
            eatable_oil_polish: data.data.response.eatable_oil_polish,
            no_chemical: data.data.response.no_chemical,
            straight_back: data.data.response.straight_back,
            lean_back: data.data.response.lean_back,
            weaving: data.data.response.weaving,
            knife: data.data.response.knife,
            not_suitable_for_Micro_Dish: data.data.response.not_suitable_for_Micro_Dish,
            tilt_top: data.data.response.tilt_top,
            inside_compartments: data.data.response.inside_compartments,
            stackable: data.data.response.stackable,
            MRP: data.data.response.MRP,
            tax_rate: data.data.response.tax_rate,
            selling_price: data.data.response.selling_price,
            showroom_price: data.data.response.showroom_price,
            discount_limit: data.data.response.discount_limit,
            polish_time: data.data.response.polish_time,
            manufacturing_time: data.data.response.manufacturing_time,
            status: data.data.response.status,
            returnDays: data.data.response.returnDays,
            COD: data.data.response.COD,
            returnable: data.data.response.returnable,
            drawer: data.data.response.drawer,
            drawer_count: data.data.response.drawer_count,
            range: data.data.response.range,
            action: data.data.response
          }])
          handleClose();
          dispatch({
            type: Notify, payload: {
              open: true,
              variant: "success",
              message: data.data.message,
            }
          });
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: Notify, payload: {
            open: true,
            variant: "error",
            message: "Something Went Wrong !!!",
          }
        });
      });
  };
  const handleUpdateProduct = (e) => {
    e.preventDefault();

    const FD = new FormData();
    let multiOBJ = {};

    files.map((element) => {
      if (element.validate) return FD.append("product_image", element);
    });
    FD.append('savedImages', JSON.stringify(changeData.savedImages));

    FD.append("_id", changeData._id);

    // Image.map((element) => {
    //   return FD.append("specification_image", element);
    // });

    // featured.map((element) => {
    //   return FD.append("featured_image", element);
    // });

    // Mannequin.map((element) => {
    //   return FD.append("mannequin_image", element);
    // });

    FD.append("specification_image", changeData.specification_image);
    FD.append("featured_image", changeData.featured_image);
    FD.append("mannequin_image", changeData.mannequin_image);


    FD.append(
      "primary_material_name",
      JSON.stringify(changeData.primary_material)
    );
    FD.append(
      "warehouse_name",
      JSON.stringify(changeData.warehouse)
    );
    FD.append(
      "polish_name",
      JSON.stringify(changeData.polish)
    );

    category.map((item) => {
      if (item._id === changeData.category_name) multiOBJ = { ...multiOBJ, category_name: item.category_name }

      return (
        item._id === changeData.category_name &&
        FD.append("category_name", item.category_name)
      );
    });

    subCategory.map((item) => {
      if (item._id === changeData.sub_category_name) multiOBJ = { ...multiOBJ, sub_category_name: item.sub_category_name }

      return (
        item._id === changeData.sub_category_name &&
        FD.append("sub_category_name", item.sub_category_name)
      );
    });

    // polishCatalog.map((item) => {
    //   if (item._id === changeData.polish) multiOBJ = { ...multiOBJ, polish_name: item.polish_name }

    //   return (
    //     item._id === changeData.polish &&
    //     FD.append("polish_name", item.polish_name)
    //   );
    // });

    catalog.textile.map((item) => {
      if (item.SKU === changeData.textile_type) multiOBJ = { ...multiOBJ, textile_name: item.title }

      return (
        item.SKU === changeData.textile_type &&
        FD.append("textile_name", item.title)
      );
    });
    catalog.hinge.map((item) => {
      if (item.SKU === changeData.hinge) multiOBJ = { ...multiOBJ, hinge_name: item.title}

      return (
        item.SKU === changeData.hinge &&
        FD.append("hinge_name", item.title)
      );
    });
    catalog.fitting.map((item) => {
      if (item.SKU === changeData.fitting) multiOBJ = { ...multiOBJ, fitting_name: item.title }

      return (
        item.SKU === changeData.fitting &&
        FD.append("fitting_name", item.title)
      );
    });

    
    catalog.knob.map((item) => {
      if (item.SKU === changeData.knob) multiOBJ = { ...multiOBJ, knob_name: item.title }

      return (
        item.SKU === changeData.knob && FD.append("knob_name", item.title)
      );
    });
    catalog.door.map((item) => {
      if (item.SKU === changeData.door) multiOBJ = { ...multiOBJ, door_name: item.title }

      return (
        item.SKU === changeData.door && FD.append("door_name", item.title)
      );
    });
    catalog.handle.map((item) => {
      if (item.SKU === changeData.handle) multiOBJ = { ...multiOBJ, handle_name: item.title }

      return (
        item.SKU === changeData.handle &&
        FD.append("handle_name", item.title)
      );
    });

    if (showFabric === "Yes") {
      catalog.fabric.map((item) => {
        if (item.SKU === changeData.fabric) multiOBJ = { ...multiOBJ, fabric_name: item.title }

        return (
          item.SKU === changeData.fabric &&
          FD.append("fabric_name", item.title)
        );
      });
    }

    FD.append("returnDays", changeData.returnable ? changeData.returnDays : 0);
    FD.append("assembly_level", changeData.assembly_level);
    FD.append("returnable", changeData.returnable);
    FD.append("COD", changeData.COD);
    FD.append("polish", changeData.polish);
    FD.append("hinge", changeData.hinge);
    FD.append("knob", changeData.knob);
    FD.append("handle", changeData.handle);
    FD.append("door", changeData.door);
    FD.append("fitting", changeData.fitting);
    FD.append("textile", changeData.textile);
    FD.append("textile_type", changeData.textile_type);
    FD.append("range", changeData.range);
    FD.append("unit", changeData.unit);
    FD.append("quantity", changeData.quantity);
    FD.append("category_id", changeData.category_name);
    FD.append("back_style", changeData.back_style);
    FD.append("sub_category_id", changeData.sub_category_name);
    FD.append("polish_time", changeData.polish_time);
    FD.append("manufacturing_time", changeData.manufacturing_time);
    FD.append("product_title", changeData.product_title);

    FD.append("product_description", changeData.product_description);
    FD.append("selling_points", JSON.stringify(changeData.selling_points));

    FD.append("SKU", changeData.SKU);
    FD.append("MRP", changeData.MRP ? changeData.MRP : 0);
    FD.append(
      "showroom_price",
      changeData.showroom_price ? changeData.showroom_price : 0
    );
    FD.append("seo_title", changeData.seo_title);
    FD.append("seo_description", changeData.seo_description);
    FD.append("seo_keyword", changeData.seo_keyword);
    FD.append("discount_limit", changeData.discount_limit);
    FD.append("selling_price", changeData.selling_price ? changeData.selling_price : 0);
    FD.append("primary_material", changeData.primary_material);
    FD.append("warehouse", changeData.warehouse);
    FD.append("fabric", changeData.fabric);

    FD.append("drawer", changeData.drawer);

    if (changeData.jodhpur_stock && changeData.jodhpur_stock > 0)
      FD.append("jodhpur_stock", changeData.jodhpur_stock);

    if (changeData.bangalore_stock && changeData.bangalore_stock > 0)
      FD.append("bangalore_stock", changeData.bangalore_stock);

    if (changeData.drawer !== undefined || changeData.drawer !== "none")
      FD.append(
        "drawer_count",
        changeData.drawer_count ? changeData.drawer_count : 0
      );

    //  // //console.log(secMaterial)
    // if (changeData.secondary_material_weight !== undefined)
    //   FD.append(
    //     "secondary_material_weight",
    //     changeData.secondary_material_weight
    //   );
    FD.append(
      "length_main",
      changeData.length_main ? changeData.length_main : 0
    );
    FD.append("package_length", changeData.package_length);
    FD.append("package_height", changeData.package_height);
    FD.append("package_breadth", changeData.package_breadth);
    FD.append("breadth", changeData.breadth ? changeData.breadth : 0);
    FD.append("height", changeData.height ? changeData.height : 0);
    FD.append("weight", changeData.weight ? changeData.weight : 0);

    FD.append("top_size", changeData.top_size);
    FD.append("dial_size", changeData.dial_size);
    FD.append(
      "seating_size_width",
      changeData.seating_size_width ? changeData.seating_size_width : 0
    );
    FD.append(
      "seating_size_depth",
      changeData.seating_size_depth ? changeData.seating_size_depth : 0
    );
    FD.append(
      "seating_size_height",
      changeData.seating_size_height ? changeData.seating_size_height : 0
    );
    FD.append("weight_capacity", changeData.weight_capacity);
    FD.append("assembly_required", changeData.assembly_required);

    if (changeData.assembly_required === "shipping")
      FD.append("assembly_part", changeData.assembly_part);
    if (changeData.assembly_required === "yes")
      FD.append("legs", changeData.legs);

    if (changeData.silver === "yes")
      FD.append(
        "silver_weight",
        changeData.silver_weight ? changeData.silver_weight : 0
      );

    if (changeData.trolley === "yes")
      FD.append("trolley_material", changeData.trolley_material);

    if (changeData.upholstery === "Yes") FD.append("fabric", changeData.fabric);

    FD.append("mirror", changeData.mirror);

    if (changeData.mirror === "yes") {
      FD.append(
        "mirror_length",
        changeData.mirror_length ? changeData.mirror_length : 0
      );
      FD.append(
        "mirror_width",
        changeData.mirror_width ? changeData.mirror_width : 0
      );
    }
    FD.append("joints", changeData.joints ? changeData.joints : "");
    FD.append(
      "upholstery",
      changeData.upholstery ? changeData.upholstery : "no"
    );
    FD.append("wheel", changeData.wheel ? changeData.wheel : "no");
    FD.append("trolley", changeData.trolley ? changeData.trolley : "no");
    FD.append("silver", changeData.silver ? changeData.silver : "no");
    FD.append(
      "rotating_seats",
      changeData.rotating_seats ? changeData.rotating_seats : false
    );
    FD.append(
      "eatable_oil_polish",
      changeData.eatable_oil_polish ? changeData.eatable_oil_polish : false
    );
    FD.append(
      "no_chemical",
      changeData.no_chemical ? changeData.no_chemical : false
    );
    FD.append("ceramic_drawers", changeData.ceramic_drawers ? changeData.ceramic_drawers : false);
    FD.append("ceramic_tiles", changeData.ceramic_tiles ? changeData.ceramic_tiles : false);
    FD.append("weaving", changeData.weaving ? changeData.weaving : false);
    FD.append("knife", changeData.knife ? changeData.knife : false);
    FD.append(
      "mobile_store",
      changeData.mobile_store ? changeData.mobile_store : true
    );
    FD.append(
      "online_store",
      changeData.online_store ? changeData.online_store : true
    );
    FD.append(
      "continue_selling",
      changeData.continue_selling ? changeData.continue_selling : true
    );
    FD.append(
      "wall_hanging",
      changeData.wall_hanging ? changeData.wall_hanging : false
    );

    FD.append(
      "not_suitable_for_Micro_Dish",
      changeData.not_suitable_for_Micro_Dish
        ? changeData.not_suitable_for_Micro_Dish
        : false
    );

    FD.append("tilt_top", changeData.tilt_top ? changeData.tilt_top : false);
    FD.append(
      "inside_compartments",
      changeData.inside_compartments ? changeData.inside_compartments : false
    );
    FD.append("stackable", changeData.stackable ? changeData.stackable : false);
    FD.append("tax_rate", changeData.tax_rate);

    const res = updateProduct(FD);

    res
      .then((data) => {

        if (data.status === 203) {
          dispatch({
            type: Notify, payload: {
              open: true,
              variant: "error",
              message: data.data.message,
            }
          });
        } else {
          state.OpenBox.setRow(state.OpenBox.row.map((set) => {
            if (set.action === state.OpenBox.payload.row.action) {
              set.SKU = changeData.SKU
              set.product_title = changeData.product_title
              set.category_name = multiOBJ.category_name || changeData.category_name
              set.sub_category_name = multiOBJ.sub_category_name || changeData.sub_category_name
              set.product_description = changeData.product_description
              set.product_image = data.data.image
              set.seo_title = changeData.seo_title
              set.seo_description = changeData.seo_description
              set.seo_keyword = changeData.seo_keyword
              set.featured_image = featured[0] !== undefined ? `${imageLink}${featured[0].path}` : changeData.featured_image
              set.specification_image = Image[0] !== undefined ? `${imageLink}${Image[0].path}` : changeData.specification_image
              set.mannequin_image = Mannequin[0] !== undefined ? `${imageLink}${Mannequin[0].path}` : changeData.mannequin_image
              set.primary_material = changeData.primary_material
              set.warehouse = changeData.warehouse
              // set.warehouse_name = changeData.warehouse_name
              set.primary_material_name = changeData.primary_material_name
              set.length_main = changeData.length_main
              set.breadth = changeData.breadth
              set.height = changeData.height
              set.bangalore_stock = changeData.bangalore_stock
              set.jodhpur_stock = changeData.jodhpur_stock
              set.weight = changeData.weight
              set.hinge = multiOBJ.hinge_name || changeData.hinge_name
              set.knob = multiOBJ.knob_name || changeData.knob_name
              set.textile = multiOBJ.textile_name || changeData.textile_name
              set.textile_type = multiOBJ.textile_type || changeData.textile_type
              set.handle = multiOBJ.handle_name || changeData.handle_name
              set.door = multiOBJ.door_name || changeData.door_name
              set.fitting = multiOBJ.fitting_name || changeData.fitting_name
              set.selling_points = changeData.selling_points
              set.top_size = changeData.top_size
              set.dial_size = changeData.dial_size
              set.seating_size_width = changeData.seating_size_width
              set.seating_size_depth = changeData.seating_size_depth
              set.seating_size_height = changeData.seating_size_height
              set.weight_capacity = changeData.weight_capacity
              set.fabric = changeData.fabric
              set.fabric_name = changeData.fabric_name
              set.wall_hanging = changeData.wall_hanging
              set.assembly_required = changeData.assembly_required
              set.assembly_part = changeData.assembly_part
              set.assembly_level = changeData.assembly_level
              set.legs = changeData.legs
              set.mirror = changeData.mirror
              set.mirror_length = changeData.mirror_length
              set.mirror_width = changeData.mirror_width
              set.silver = changeData.silver
              set.silver_weight = changeData.silver_weight
              set.joints = changeData.joints
              set.upholstery = changeData.upholstery
              set.wheel = changeData.wheel
              set.trolley = changeData.trolley
              set.trolley_material = changeData.trolley_material
              set.rotating_seats = changeData.rotating_seats
              set.eatable_oil_polish = changeData.eatable_oil_polish
              set.no_chemical = changeData.no_chemical
              set.straight_back = changeData.straight_back
              set.lean_back = changeData.lean_back
              set.weaving = changeData.weaving
              set.knife = changeData.knife
              set.not_suitable_for_Micro_Dish = changeData.not_suitable_for_Micro_Dish
              set.tilt_top = changeData.tilt_top
              set.inside_compartments = changeData.inside_compartments
              set.stackable = changeData.stackable
              set.MRP = changeData.MRP
              set.tax_rate = changeData.tax_rate
              set.selling_price = changeData.selling_price
              set.showroom_price = changeData.showroom_price
              set.discount_limit = changeData.discount_limit
              set.polish_time = changeData.polish_time
              set.manufacturing_time = changeData.manufacturing_time
              set.status = changeData.status
              set.returnDays = changeData.returnDays
              set.COD = changeData.COD
              set.returnable = changeData.returnable
              set.drawer = changeData.drawer
              set.drawer_count = changeData.drawer_count
              set.mobile_store = changeData.mobile_store
              set.online_store = changeData.online_store
              set.continue_selling = changeData.continue_selling
              set.range = changeData.range
              set.action = changeData
              set.polish = changeData.polish
              set.action.polish_name = JSON.stringify(changeData.polish)
              set.action.warehouse_name = JSON.stringify(changeData.warehouse)
              set.action.primary_material_name = JSON.stringify(changeData.primary_material)
              return set
            }
            else return set;
          }))

          handleClose();
          dispatch({
            type: Notify, payload: {
              open: true,
              variant: "success",
              message: data.data.message,
            }
          });
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: Notify, payload: {
            open: true,
            variant: "error",
            message: "Something Went Wrong !!!",
          }
        });
      });
  };

  const handleMergeProduct = (e) => {
    e.preventDefault();

    const FD = new FormData();

    files.map((element) => {
      return FD.append("product_image", element);
    });

    Mannequin.map((element) => {
      return FD.append("mannequin_image", element);
    });

    FD.append("status", false);

    Image.map((element) => {
      return FD.append("specification_image", element);
    });

    featured.map((element) => {
      return FD.append("featured_image", element);
    });

    category.map((item) => {
      return (
        item._id === changeData.category_name &&
        FD.append("category_name", item.category_name)
      );
    });

    subCategory.map((item) => {
      return (
        item._id === changeData.sub_category_name &&
        FD.append("sub_category_name", item.sub_category_name)
      );
    });


    FD.append("category_id", changeData.category_name);
    FD.append("sub_category_id", changeData.sub_category_name);
    FD.append("product_title", changeData.product_title);
    FD.append("product_description", changeData.product_description);
    FD.append("product_quantity", state.OpenBox.unit);
    FD.append("MS", SKU);

    FD.append("SKU", SKU);
    FD.append("product_array", changeData.productArray);
    FD.append(
      "showroom_price",
      changeData.showroom_price ? changeData.showroom_price : 0
    );

    FD.append("discount_limit", changeData.discount_limit);
    FD.append("selling_price", changeData.selling_price);

    const res = addMergeProduct(FD);

    res
      .then((data) => {
        if (data.status === 203) {
          dispatch({
            type: Notify, payload: {
              open: true,
              variant: "error",
              message: data.data.message,
            }
          });
        } else {
          state.OpenBox.setRow([...state.OpenBox.row, {
            id: state.OpenBox.row.length + 1,
            MS: data.data.response.MS,
            product_array: data.data.response.product_array,
            product_title: data.data.response.product_title,
            category_name: data.data.response.category_name,
            category_id: data.data.response.category_id,
            sub_category_name: data.data.response.sub_category_name,
            sub_category_id: data.data.response.sub_category_id,
            product_description: data.data.response.product_description,
            assembly_level: data.data.response.assembly_level,
            seo_title: data.data.response.seo_title,
            seo_description: data.data.response.seo_description,
            seo_keyword: data.data.response.seo_keyword,
            product_image: data.data.response.product_image,
            featured_image: data.data.response.featured_image,
            specification_image: data.data.response.specification_image,
            selling_points: data.data.response.selling_points,
            rotating_seats: data.data.response.rotating_seats,
            eatable_oil_polish: data.data.response.eatable_oil_polish,
            no_chemical: data.data.response.no_chemical,
            straight_back: data.data.response.straight_back,
            lean_back: data.data.response.lean_back,
            weaving: data.data.response.weaving,
            knife: data.data.response.knife,
            not_suitable_for_Micro_Dish: data.data.response.not_suitable_for_Micro_Dish,
            tilt_top: data.data.response.tilt_top,
            inside_compartments: data.data.response.inside_compartments,
            stackable: data.data.response.stackable,
            MRP: data.data.response.MRP,
            tax_rate: data.data.response.tax_rate,
            selling_price: data.data.response.selling_price,
            showroom_price: data.data.response.showroom_price,
            discount_limit: data.data.response.discount_limit,
            status: data.data.response.status,
            returnDays: data.data.response.returnDays,
            warehouse: data.data.response.warehouse,
            COD: data.data.response.COD,
            returnable: data.data.response.returnable,
            action: data.data.response
          }])
          handleClose();
          dispatch({
            type: Notify, payload: {
              open: true,
              variant: "success",
              message: data.data.message,
            }
          });
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: Notify, payload: {
            open: true,
            variant: "error",
            message: "Something Went Wrong !!!",
          }
        });
      });
  };
  const handleUpdateMergeProduct = (e) => {
    e.preventDefault();

    const FD = new FormData();

    FD.append("_id", state.OpenBox.payload.value._id);

    Image.map((element) => {
      return FD.append("specification_image", element);
    });

    Mannequin.map((element) => {
      return FD.append("mannequin_image", element);
    });

    featured.map((element) => {
      return FD.append("featured_image", element);
    });

    category.map((item) => {
      return (
        item._id === changeData.category_name &&
        FD.append("category_name", item.category_name)
      );
    });

    subCategory.map((item) => {
      return (
        item._id === changeData.sub_category_name &&
        FD.append("sub_category_name", item.sub_category_name)
      );
    });

    FD.append("category_id", changeData.category_name);
    FD.append("sub_category_id", changeData.sub_category_name);
    FD.append("product_title", changeData.product_title);
    FD.append("product_description", changeData.product_description);
    FD.append("product_quantity", changeData.productArray);
    FD.append("MS", SKU);

    FD.append("SKU", SKU);
    FD.append("product_array", changeData.productArray);
    FD.append(
      "showroom_price",
      changeData.showroom_price ? changeData.showroom_price : 0
    );

    FD.append("discount_limit", changeData.discount_limit);
    FD.append("selling_price", changeData.selling_price);

    const res = updateMergeProduct(FD);

    res
      .then((data) => {
        if (data.status === 203) {
          dispatch({
            type: Notify, payload: {
              open: true,
              variant: "error",
              message: data.data.message,
            }
          });
        } else {
          state.OpenBox.setRow(state.OpenBox.row.map((set) => {
            if (set.action === state.OpenBox.payload.row.action) {
              set.MS = changeData.SKU
              set.product_array = changeData.product_array
              set.product_title = changeData.product_title
              set.category_name = changeData.category_name
              set.category_id = changeData.category_id
              set.sub_category_name = changeData.sub_category_name
              set.sub_category_id = changeData.sub_category_id
              set.product_description = changeData.product_description
              set.seo_title = changeData.seo_title
              set.seo_description = changeData.seo_description
              set.seo_keyword = changeData.seo_keyword
              set.product_image = changeData.product_image
              set.featured_image = changeData.featured_image
              set.specification_image = changeData.specification_image
              set.selling_points = changeData.selling_points
              set.rotating_seats = changeData.rotating_seats
              set.eatable_oil_polish = changeData.eatable_oil_polish
              set.no_chemical = changeData.no_chemical
              set.straight_back = changeData.straight_back
              set.lean_back = changeData.lean_back
              set.weaving = changeData.weaving
              set.polish_time = changeData.polish_time
              set.manufacturing_time = changeData.polish_time
              set.knife = changeData.knife
              set.not_suitable_for_Micro_Dish = changeData.not_suitable_for_Micro_Dish
              set.tilt_top = changeData.tilt_top
              set.inside_compartments = changeData.inside_compartments
              set.stackable = changeData.stackable
              set.MRP = changeData.MRP
              set.tax_rate = changeData.tax_rate
              set.selling_price = changeData.selling_price
              set.showroom_price = changeData.showroom_price
              set.discount_limit = changeData.discount_limit
              set.returnDays = changeData.returnDays
              set.warehouse = changeData.warehouse
              set.status = changeData.status
              set.COD = changeData.COD
              set.returnable = changeData.returnable
              set.action = changeData
              return set
            }
            else return set;
          }))
          handleClose();
          dispatch({
            type: Notify, payload: {
              open: true,
              variant: "success",
              message: data.data.message,
            }
          });
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: Notify, payload: {
            open: true,
            variant: "error",
            message: "Something Went Wrong !!!",
          }
        });
      });
  };

  const handlePrimaryMaterial = (e) => {
    e.preventDefault();

    const FD = new FormData();

    Image.map((element) => {
      return FD.append("primaryMaterial_image", element);
    });
    FD.append(
      "primaryMaterial_description",
      e.target.primaryMaterial_description.value
    );

    FD.append("primaryMaterial_name", e.target.primaryMaterial_name.value);
    FD.append(
      "primaryMaterial_status",
      e.target.primaryMaterial_status.checked
    );

    // // //console.log(acceptedFiles[0].name, e.target.category_name.value)

    const res = addPrimaryMaterial(FD);

    res
      .then((data) => {
        // //console.log(data.status);

        if (data.status === 203) {
          setImages([]);
          dispatch({
            type: Notify, payload: {
              open: true,
              variant: "error",
              message: data.data.message,
            }
          });
        } else {
          state.OpenBox.setRow([...state.OpenBox.row, {
            id: state.OpenBox.row.length + 1,
            primaryMaterial_name: data.data.response.primaryMaterial_name,
            primaryMaterial_description: data.data.response.primaryMaterial_description,
            primaryMaterial_image: data.data.response.primaryMaterial_image,
            primaryMaterial_status: data.data.response.primaryMaterial_status,
            action: data.data.response
          }])
          setImages([]);
          handleClose();
          dispatch({
            type: Notify, payload: {
              open: true,
              variant: "success",
              message: data.data.message,
            }
          });
        }
      })
      .catch((err) => {
        console.log(err);
        setImages([]);
        dispatch({
          type: Notify, payload: {
            open: true,
            variant: "error",
            message: "Something Went Wrong !!!",
          }
        });
      });
  };

  const handleUpdatePrimaryMaterial = (e) => {
    e.preventDefault();

    const FD = new FormData();

    FD.append("_id", state.OpenBox.payload.row.action);

    Image.map((element) => {
      return FD.append("primaryMaterial_image", element);
    });
    FD.append(
      "primaryMaterial_description",
      e.target.primaryMaterial_description.value
    );

    e.target.primaryMaterial_name.value !== "" &&
      FD.append("primaryMaterial_name", e.target.primaryMaterial_name.value);

    const res = editPrimaryMaterial(FD);

    res
      .then((data) => {
        // //console.log(data.status);

        if (data.status === 203) {
          setImages([]);
          dispatch({
            type: Notify, payload: {
              open: true,
              variant: "error",
              message: data.data.message,
            }
          });
        } else {
          state.OpenBox.setRow(state.OpenBox.row.map((set) => {
            if (set.action === state.OpenBox.payload.row.action) {
              set.primaryMaterial_description = e.target.primaryMaterial_description.value;
              set.primaryMaterial_name = e.target.primaryMaterial_name.value;
              set.primaryMaterial_image = Image[0] !== undefined ? `${imageLink}${Image[0].path}` : console.log()

            }
            return set;
          }))
          setImages([]);
          handleClose();
          dispatch({
            type: Notify, payload: {
              open: true,
              variant: "success",
              message: data.data.message,
            }
          });
        }
      })
      .catch((err) => {
        // //console.log(err);
        setImages([]);
        dispatch({
          type: Notify, payload: {
            open: true,
            variant: "error",
            message: "Something Went Wrong !!!",
          }
        });
      });
  };

  const handleHandle = (e) => {
    e.preventDefault();

    const FD = new FormData();

    FD.append("handle_name", e.target.handle_name.value);
    FD.append("handle_status", e.target.handle_status.checked);

    const res = addHandle(FD);

    res
      .then((data) => {
        // //console.log(data.status);

        if (data.status === 203) {
          dispatch({
            type: Notify, payload: {
              open: true,
              variant: "error",
              message: data.data.message,
            }
          });
        } else {
          state.OpenBox.setRow([...state.OpenBox.row, {
            id: state.OpenBox.row.length + 1,
            handle_name: data.data.response.handle_name,
            handle_status: data.data.response.handle_status,
            action: data.data.response
          }])
          handleClose();
          dispatch({
            type: Notify, payload: {
              open: true,
              variant: "success",
              message: data.data.message,
            }
          });
        }
      })
      .catch((err) => {
        // //console.log(err);
        dispatch({
          type: Notify, payload: {
            open: true,
            variant: "error",
            message: "Something Went Wrong !!!",
          }
        });
      });
  };

  const handleUpdateHandle = (e) => {
    e.preventDefault();

    const FD = new FormData();
    FD.append("_id", state.OpenBox.payload.row.action);

    e.target.handle_name.value !== "" &&
      FD.append("handle_name", e.target.handle_name.value);

    const res = editHandle(FD);

    res
      .then((data) => {
        // //console.log(data.status);

        if (data.status === 203) {
          setImages([]);
          dispatch({
            type: Notify, payload: {
              open: true,
              variant: "error",
              message: data.data.message,
            }
          });
        } else {
          state.OpenBox.setRow(state.OpenBox.row.map((set) => {
            if (set.action === state.OpenBox.payload.row.action)
              set.handle_name = e.target.handle_name.value;
            return set;
          }))
          handleClose();
          dispatch({
            type: Notify, payload: {
              open: true,
              variant: "success",
              message: data.data.message,
            }
          });
        }
      })
      .catch((err) => {
        // //console.log(err);
        setImages([]);
        dispatch({
          type: Notify, payload: {
            open: true,
            variant: "error",
            message: "Something Went Wrong !!!",
          }
        });
      });
  };

  const handleHinge = (e) => {
    e.preventDefault();

    const FD = new FormData();

    FD.append("hinge_name", e.target.hinge_name.value);
    FD.append("hinge_status", e.target.hinge_status.checked);

    const res = addHinge(FD);
    res
      .then((data) => {
        // //console.log(data.status);

        if (data.status === 203) {
          dispatch({
            type: Notify, payload: {
              open: true,
              variant: "error",
              message: data.data.message,
            }
          });
        } else {
          state.OpenBox.setRow([...state.OpenBox.row, {
            id: state.OpenBox.row.length + 1,
            hinge_name: data.data.response.hinge_name,
            hinge_status: data.data.response.hinge_status,
            action: data.data.response
          }])
          handleClose();
          dispatch({
            type: Notify, payload: {
              open: true,
              variant: "success",
              message: data.data.message,
            }
          });
        }
      })
      .catch((err) => {
        // //console.log(err);
        setImages([]);
        dispatch({
          type: Notify, payload: {
            open: true,
            variant: "error",
            message: "Something Went Wrong !!!",
          }
        });
      });
  };

  const handleUpdateHinge = (e) => {
    e.preventDefault();

    const FD = new FormData();
    FD.append("_id", state.OpenBox.payload.row.action);

    e.target.hinge_name.value !== "" &&
      FD.append("hinge_name", e.target.hinge_name.value);

    const res = editHinge(FD);

    res
      .then((data) => {
        // //console.log(data.status);

        if (data.status === 203) {
          setImages([]);
          dispatch({
            type: Notify, payload: {
              open: true,
              variant: "error",
              message: data.data.message,
            }
          });
        } else {
          state.OpenBox.setRow(state.OpenBox.row.map((set) => {
            if (set.action === state.OpenBox.payload.row.action)
              set.hinge_name = e.target.hinge_name.value;
            return set;
          }))
          handleClose();
          dispatch({
            type: Notify, payload: {
              open: true,
              variant: "success",
              message: data.data.message,
            }
          });
        }
      })
      .catch((err) => {
        // //console.log(err);
        setImages([]);
        dispatch({
          type: Notify, payload: {
            open: true,
            variant: "error",
            message: "Something Went Wrong !!!",
          }
        });
      });
  };
  const handleDoor = (e) => {
    e.preventDefault();

    const FD = new FormData();

    FD.append("door_name", e.target.door_name.value);
    FD.append("door_status", e.target.door_status.checked);

    const res = addDoor(FD);

    res
      .then((data) => {
        //console.log(data.status);

        if (data.status === 200) {
          state.OpenBox.setRow([...state.OpenBox.row, {
            id: state.OpenBox.row.length + 1,
            door_name: data.data.response.door_name,
            door_status: data.data.response.door_status,
            action: data.data.response
          }])
          handleClose();
          dispatch({
            type: Notify, payload: {
              open: true,
              variant: "success",
              message: data.data.message,
            }
          });
        } else {
          dispatch({
            type: Notify, payload: {
              open: true,
              variant: "error",
              message: data.data.message,
            }
          });
        }
      })
      .catch((err) => {
        //console.log(err);
        dispatch({
          type: Notify, payload: {
            open: true,
            variant: "error",
            message: "Something Went Wrong !!!",
          }
        });
      });
  };

  const handleUpdateDoor = (e) => {
    e.preventDefault();

    const FD = new FormData();
    FD.append("_id", state.OpenBox.payload.row.action);

    e.target.door_name.value !== "" &&
      FD.append("door_name", e.target.door_name.value);

    const res = editDoor(FD);

    res
      .then((data) => {
        // //console.log(data.status);

        if (data.status === 203) {
          setImages([]);
          dispatch({
            type: Notify, payload: {
              open: true,
              variant: "error",
              message: data.data.message,
            }
          });
        } else {
          state.OpenBox.setRow(state.OpenBox.row.map((set) => {
            if (set.action === state.OpenBox.payload.row.action)
              set.door_name = e.target.door_name.value;
            return set;
          }))
          handleClose();
          dispatch({
            type: Notify, payload: {
              open: true,
              variant: "success",
              message: data.data.message,
            }
          });
        }
      })
      .catch((err) => {
        // //console.log(err);
        setImages([]);
        dispatch({
          type: Notify, payload: {
            open: true,
            variant: "error",
            message: "Something Went Wrong !!!",
          }
        });
      });
  };


  const handleKnob = (e) => {

    e.preventDefault();

    const FD = new FormData();

    FD.append("knob_name", e.target.knob_name.value);
    FD.append("knob_status", e.target.knob_status.checked);

    const res = addKnob(FD);

    res
      .then((data) => {
        // //console.log(data.status);

        if (data.status === 203) {
          setImages([]);
          dispatch({
            type: Notify, payload: {
              open: true,
              variant: "error",
              message: data.data.message,
            }
          });
        } else {
          setImages([]);
          handleClose();
          dispatch({
            type: Notify, payload: {
              open: true,
              variant: "success",
              message: data.data.message,
            }
          });
        }
      })
      .catch((err) => {
        // //console.log(err);
        setImages([]);
        dispatch({
          type: Notify, payload: {
            open: true,
            variant: "error",
            message: "Something Went Wrong !!!",
          }
        });
      });
  };
  const handleUpdateKnob = (e) => {
    e.preventDefault();

    const FD = new FormData();
    FD.append("_id", state.OpenBox.payload.row.action);

    e.target.knob_name.value !== "" &&
      FD.append("knob_name", e.target.knob_name.value);

    const res = editKnob(FD);

    res
      .then((data) => {
        if (data.status === 203) {
          dispatch({
            type: Notify, payload: {
              open: true,
              variant: "error",
              message: data.data.message,
            }
          });
        } else {
          state.OpenBox.setRow(state.OpenBox.row.map((set) => {
            if (set.action === state.OpenBox.payload.row.action)
              set.knob_name = e.target.knob_name.value;
            return set;
          }))
          handleClose();
          dispatch({
            type: Notify, payload: {
              open: true,
              variant: "success",
              message: data.data.message,
            }
          });
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: Notify, payload: {
            open: true,
            variant: "error",
            message: "Something Went Wrong !!!",
          }
        });
      });
  };

  const handleFitting = (e) => {
    e.preventDefault();

    const FD = new FormData();

    FD.append("fitting_name", e.target.fitting_name.value);
    FD.append("fitting_status", e.target.fitting_status.checked);

    const res = addFitting(FD);

    res
      .then((data) => {
        // //console.log(data.status);

        if (data.status === 203) {
          setImages([]);
          dispatch({
            type: Notify, payload: {
              open: true,
              variant: "error",
              message: data.data.message,
            }
          });
        } else {
          state.OpenBox.setRow([...state.OpenBox.row, {
            id: state.OpenBox.row.length + 1,
            fitting_name: data.data.response.fitting_name,
            fitting_status: data.data.response.fitting_status,
            action: data.data.response
          }])
          setImages([]);
          handleClose();
          dispatch({
            type: Notify, payload: {
              open: true,
              variant: "success",
              message: data.data.message,
            }
          });
        }
      })
      .catch((err) => {
        // //console.log(err);
        setImages([]);
        dispatch({
          type: Notify, payload: {
            open: true,
            variant: "error",
            message: "Something Went Wrong !!!",
          }
        });
      });
  };

  const handleUpdateFitting = (e) => {
    e.preventDefault();

    const FD = new FormData();
    FD.append("_id", state.OpenBox.payload.row.action);

    e.target.fitting_name.value !== "" &&
      FD.append("fitting_name", e.target.fitting_name.value);

    const res = editFitting(FD);

    res
      .then((data) => {
        // //console.log(data.status);

        if (data.status === 203) {

          dispatch({
            type: Notify, payload: {
              open: true,
              variant: "error",
              message: data.data.message,
            }
          });
        } else {
          state.OpenBox.setRow(state.OpenBox.row.map((set) => {
            if (set.action === state.OpenBox.payload.row.action)
              set.fitting_name = e.target.fitting_name.value;
            return set;
          }))
          handleClose();
          dispatch({
            type: Notify, payload: {
              open: true,
              variant: "success",
              message: data.data.message,
            }
          });
        }
      })
      .catch((err) => {
        // //console.log(err);
        setImages([]);
        dispatch({
          type: Notify, payload: {
            open: true,
            variant: "error",
            message: "Something Went Wrong !!!",
          }
        });
      });
  };

  const handlePolish = (e) => {
    e.preventDefault();

    const FD = new FormData();

    FD.append("polish_name", e.target.polish_name.value);
    FD.append("polish_status", e.target.polish_status.checked);

    const res = addPolish(FD);

    res
      .then((data) => {
        // //console.log(data.status);

        if (data.status === 203) {
          setImages([]);
          dispatch({
            type: Notify, payload: {
              open: true,
              variant: "error",
              message: data.data.message,
            }
          });
        } else {
          state.OpenBox.setRow([...state.OpenBox.row, {
            id: state.OpenBox.row.length + 1,
            polish_name: data.data.response.polish_name,
            polish_status: data.data.response.polish_status,
            action: data.data.response
          }])
          setImages([]);
          handleClose();
          dispatch({
            type: Notify, payload: {
              open: true,
              variant: "success",
              message: data.data.message,
            }
          });
        }
      })
      .catch((err) => {
        // //console.log(err);
        setImages([]);
        dispatch({
          type: Notify, payload: {
            open: true,
            variant: "error",
            message: "Something Went Wrong !!!",
          }
        });
      });
  };
  const handleUpdatePolish = (e) => {
    e.preventDefault();

    const FD = new FormData();
    FD.append("_id", state.OpenBox.payload.row.action);

    e.target.polish_name.value !== "" &&
      FD.append("polish_name", e.target.polish_name.value);

    const res = editPolish(FD);

    res
      .then((data) => {
        // //console.log(data.status);

        if (data.status === 203) {
          dispatch({
            type: Notify, payload: {
              open: true,
              variant: "error",
              message: data.data.message,
            }
          });
        } else {
          state.OpenBox.setRow(state.OpenBox.row.map((set) => {

            if (set.action === state.OpenBox.payload.row.action)
              set.polish_name = e.target.polish_name.value;
            return set;
          }))
          handleClose();

          dispatch({
            type: Notify, payload: {
              open: true,
              variant: "success",
              message: data.data.message,
            }
          });
        }
      })
      .catch((err) => {
        // //console.log(err);
        setImages([]);
        dispatch({
          type: Notify, payload: {
            open: true,
            variant: "error",
            message: "Something Went Wrong !!!",
          }
        });
      });
  };

  const handleSubCategories = (e) => {
    e.preventDefault();

    const FD = new FormData();

    category.map((item) => {
      item._id === e.target.category_id.value &&
        FD.append("category_name", item.category_name);
    });

    FD.append("category_id", e.target.category_id.value);
    FD.append("sub_category_name", e.target.sub_category_name.value);
    FD.append("sub_category_status", e.target.sub_category_status.checked);

    // // //console.log(acceptedFiles[0].name, e.target.category_name.value)

    const res = addSubCategories(FD);

    res
      .then((data) => {
        // //console.log(data.status);

        if (data.status === 203) {
          setImages([]);
          dispatch({
            type: Notify, payload: {
              open: true,
              variant: "error",
              message: data.data.message,
            }
          });
        } else {
          state.OpenBox.setRow([...state.OpenBox.row, {
            id: state.OpenBox.row.length + 1,
            category_id: data.data.response.category_id,
            category_name: data.data.response.category_name,
            sub_category_name: data.data.response.sub_category_name,
            sub_category_status: data.data.response.sub_category_status,
            action: data.data.response
          }])
          setImages([]);
          handleClose();
          dispatch({
            type: Notify, payload: {
              open: true,
              variant: "success",
              message: data.data.message,
            }
          });
        }
      })
      .catch((err) => {
        console.log(err);
        setImages([]);
        dispatch({
          type: Notify, payload: {
            open: true,
            variant: "error",
            message: "Something Went Wrong !!!",
          }
        });
      });
  };
  const handleUpdateSubCategories = (e) => {
    e.preventDefault();

    const FD = new FormData();
    let catName = ''

    // //console.log(state.OpenBox.payload);

    FD.append("_id", state.OpenBox.payload.row.action);

    category.map((item) => {
      if (item._id === e.target.category_id.value) catName = item.category_name
      return (
        item._id === e.target.category_id.value && FD.append("category_name", catName)
      );
    });

    e.target.category_id.value !== "" &&
      FD.append("category_id", e.target.category_id.value);
    e.target.sub_category_name.value !== "" &&
      FD.append("sub_category_name", e.target.sub_category_name.value);


    const res = editSubCatagories(FD);

    res
      .then((data) => {
        // //console.log(data.status);

        if (data.status === 203) {
          setImages([]);
          dispatch({
            type: Notify, payload: {
              open: true,
              variant: "error",
              message: data.data.message,
            }
          });
        } else {
          state.OpenBox.setRow(state.OpenBox.row.map((set) => {
            if (set.action === state.OpenBox.payload.row.action) {
              set.sub_category_name = e.target.sub_category_name.value;
              set.category_name = catName;
            }
            return set;
          }))
          handleClose();
          dispatch({
            type: Notify, payload: {
              open: true,
              variant: "success",
              message: data.data.message,
            }
          });
        }
      })
      .catch((err) => {
        console.log(err);
        setImages([]);
        dispatch({
          type: Notify, payload: {
            open: true,
            variant: "error",
            message: "Something Went Wrong !!!",
          }
        });
      });
  };

  const [url, setUrl] = useState();

  const handleUpload = (e) => {
    e.preventDefault();

    const FD = new FormData();

    Image.map((element) => {
      return FD.append("banner_image", element);
    });

    const res = uploadImage(FD);

    res
      .then((data) => {
        // //console.log(data.status);

        if (data.status === 203) {
          setImages([]);
          dispatch({
            type: Notify, payload: {
              open: true,
              variant: "error",
              message: data.data.message,
            }
          });
        } else {
          setImages([]);
          setUrl(data.data.url);
          dispatch({
            type: Notify, payload: {
              open: true,
              variant: "success",
              message: data.data.message,
            }
          });
        }
      })
      .catch((err) => {
        // //console.log(err);
        setImages([]);
        dispatch({
          type: Notify, payload: {
            open: true,
            variant: "error",
            message: "Something Went Wrong !!!",
          }
        });
      });
  };

  const handleAddBlog = (e) => {
    e.preventDefault();

    const FD = new FormData();

    featured.map((element) => {
      return FD.append("banner_image", element);
    });

    FD.append("description", editorRef.current.getContent());
    FD.append("title", e.target.title.value);
    FD.append("card_description", e.target.card_description.value);
    FD.append("seo_title", e.target.seo_title.value);
    FD.append("seo_description", e.target.seo_description.value);
    const res = createBlog(FD);

    res
      .then((data) => {
        // //console.log(data.status);

        if (data.status === 203) {
          setImages([]);
          dispatch({
            type: Notify, payload: {
              open: true,
              variant: "error",
              message: data.data.message,
            }
          });
        } else {
          state.OpenBox.setRow([...state.OpenBox.row, {
            id: state.OpenBox.row.length + 1,
            uuid: data.data.response.uuid,
            seo_title: data.data.response.seo_title,
            seo_description: data.data.response.seo_description,
            title: data.data.response.title,
            card_image: data.data.response.card_image,
            card_description: data.data.response.card_description,
            description: data.data.response.description,
            action: data.data.response
          }])
          setImages([]);
          setUrl(data.data.url);
          handleClose();
          dispatch({
            type: Notify, payload: {
              open: true,
              variant: "success",
              message: data.data.message,
            }
          });
        }
      })
      .catch((err) => {
        // //console.log(err);
        setImages([]);
        dispatch({
          type: Notify, payload: {
            open: true,
            variant: "error",
            message: "Something Went Wrong !!!",
          }
        });
      });
  };

  const handleUpdateBlog = (e) => {
    e.preventDefault();

    const FD = new FormData();

    featured.map((element) => {
      return FD.append("banner_image", element);
    });

    FD.append("_id", state.OpenBox.payload.value._id);

    FD.append("description", editorRef.current.getContent());
    FD.append("title", e.target.title.value);
    FD.append("seo_title", e.target.seo_title.value);
    FD.append("seo_description", e.target.seo_description.value);
    FD.append("card_description", e.target.card_description.value);

    const res = updateBlog(FD);

    res
      .then((data) => {
        // //console.log(data.status);

        if (data.status === 203) {
          setImages([]);
          dispatch({
            type: Notify, payload: {
              open: true,
              variant: "error",
              message: data.data.message,
            }
          });
        } else {
          state.OpenBox.setRow(state.OpenBox.row.map((set) => {
            if (set.action === state.OpenBox.payload.row.action) {
              set.seo_title = e.target.seo_title.value
              set.seo_description = e.target.seo_description.value
              set.title = e.target.title.value
              set.card_image = featured[0] !== undefined ? `${imageLink}${Image[0].path}` : changeData.card_image
              set.card_description = e.target.card_description.value
              set.description = editorRef.current.getContent() || set.description
            }
            return set;
          }))
          setImages([]);
          setUrl(data.data.url);
          handleClose();
          dispatch({
            type: Notify, payload: {
              open: true,
              variant: "success",
              message: data.data.message,
            }
          });
        }
      })
      .catch((err) => {
        // //console.log(err);
        setImages([]);
        dispatch({
          type: Notify, payload: {
            open: true,
            variant: "error",
            message: "Something Went Wrong !!!",
          }
        });
      });
  };

  const handleOrder = (e) => {
    e.preventDefault();

    const FD = new FormData();

    FD.append("products", changeData.product_array);
    FD.append("OID", SKU);
    FD.append("status", "processing");

    if (changeData.searchCustomer === "") {
      FD.append("customer_name", e.target.customer_name.value);
      FD.append("customer_email", e.target.customer_email.value);
      FD.append("customer_mobile", e.target.customer_mobile.value);
      FD.append("shipping", e.target.shipping.value);
      FD.append("city", e.target.city.value);
      FD.append("state", e.target.state.value);
    } else FD.append("searchCustomer", changeData.searchCustomer);

    FD.append("paid_amount", e.target.paid_amount.value);
    FD.append("total_amount", e.target.total_amount.value);

    const res = addOrder(FD);

    res
      .then((data) => {
        if (data.status !== 200) {
          setImages([]);
          dispatch({
            type: Notify, payload: {
              open: true,
              variant: "error",
              message: data.data.message || "Something Went Wrong !!!",
            }
          });
        } else {
          setImages([]);
          setUrl(data.data.url);
          handleClose();
          dispatch({
            type: Notify, payload: {
              open: true,
              variant: "success",
              message: data.data.message,
            }
          });
        }
      })
      .catch((err) => {
        // //console.log(err);
        setImages([]);
        dispatch({
          type: Notify, payload: {
            open: true,
            variant: "error",
            message: "Something Went Wrong !!!",
          }
        });
      });
  };

  const handleAddStock = (e) => {
    e.preventDefault();

    const FD = new FormData();

    FD.append("product_id", changeData.product_id);
    FD.append("stock", changeData.stock);
    FD.append("warehouse", changeData.warehouse);


    const res = addStock(FD);

    res
      .then((data) => {
        if (data.status !== 200) {
          setImages([]);
          dispatch({
            type: Notify, payload: {
              open: true,
              variant: "error",
              message: data.data.message || "Something Went Wrong !!!",
            }
          });
        } else {
          state.OpenBox.setRow([...state.OpenBox.row, {
            id: state.OpenBox.row.length + 1,
            product_id: changeData.product_id,
            stock: changeData.stock,
            warehouse: changeData.warehouse,
            action: data.data.response
          }])
          setImages([]);
          setUrl(data.data.url);
          handleClose();
          dispatch({
            type: Notify, payload: {
              open: true,
              variant: "success",
              message: data.data.message,
            }
          });
        }
      })
      .catch((err) => {
        // //console.log(err);
        setImages([]);
        dispatch({
          type: Notify, payload: {
            open: true,
            variant: "error",
            message: "Something Went Wrong !!!",
          }
        });
      });
  };
  const handleUpdateStock = (e) => {
    e.preventDefault();

    const FD = new FormData();

    FD.append("product_id", changeData.product_id);
    FD.append("stock", changeData.stock);
    FD.append("warehouse", changeData.warehouse);


    const res = updateStock(FD);

    res
      .then((data) => {
        if (data.status !== 200) {
          dispatch({
            type: Notify, payload: {
              open: true,
              variant: "error",
              message: data.data.message || "Something Went Wrong !!!",
            }
          });
        } else {
          state.OpenBox.setRow(state.OpenBox.row.map((set) => {

            if (set.action === state.OpenBox.payload.row.action) {
              set.stock = changeData.stock;
            }
            return set;
          }))
          setUrl(data.data.url);
          handleClose();
          dispatch({
            type: Notify, payload: {
              open: true,
              variant: "success",
              message: data.data.message,
            }
          });
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: Notify, payload: {
            open: true,
            variant: "error",
            message: "Something Went Wrong !!!",
          }
        });
      });
  };

  const handleAddress = (e) => {
    e.preventDefault();
    setAddress([...address, {
      name: e.target.customer_name.value,
      mobile: e.target.mobile.value,
      pincode: e.target.pincode.value,
      city: e.target.city.value,
      state: e.target.state.value,
      shipping: e.target.address.value,
      type: e.target.type.value,
    }])
    console.log(address)
  }

  const handleHardware = (e) => {
    e.preventDefault();

    const FD = new FormData();

    files.map((element) => {
      return FD.append("hardware_image", element);
    });

    FD.append("status", changeData.status === 'on' ? true : false);

    category.map((item) => {
      return (
        item._id === changeData.category_name &&
        FD.append("category_name", item.category_name)
      );
    });

    subCategory.map((item) => {
      return (
        item._id === changeData.sub_category_name &&
        FD.append("sub_category_name", item.sub_category_name)
      );
    });

    FD.append("returnDays", changeData.returnable ? changeData.returnDays : 0);
    FD.append("returnable", changeData.returnable);
    FD.append("COD", changeData.COD);


    FD.append("category_id", changeData.category_name);
    FD.append("sub_category_id", changeData.sub_category_name);
    FD.append("polish_time", changeData.polish_time);
    FD.append("manufacturing_time", changeData.manufacturing_time);
    FD.append("title", changeData.title);

    FD.append("SKU", SKU);

    FD.append(
      "showroom_price",
      changeData.showroom_price ? changeData.showroom_price : 0
    );
    FD.append("selling_price", changeData.selling_price);
    FD.append("warehouse", changeData.warehouse);


    FD.append("unit", changeData.unit);
    FD.append("quantity", changeData.quantity);

    FD.append("package_length", changeData.package_length ? changeData.package_length : 0);
    FD.append("package_height", changeData.package_height ? changeData.package_height : 0);
    FD.append("package_breadth", changeData.package_breadth ? changeData.package_breadth : 0);


    if (changeData.jodhpur_stock && changeData.jodhpur_stock > 0)
      FD.append("jodhpur_stock", changeData.jodhpur_stock);

    if (changeData.bangalore_stock && changeData.bangalore_stock > 0)
      FD.append("bangalore_stock", changeData.bangalore_stock);

    const res = addHardware(FD);

    res
      .then((data) => {
        // //console.log(data.status);

        if (data.status === 203) {
          dispatch({
            type: Notify, payload: {
              open: true,
              variant: "error",
              message: data.data.message,
            }
          });
        } else {
          state.OpenBox.setRow([...state.OpenBox.row, {
            id: state.OpenBox.row.length + 1,
            SKU: data.data.response.SKU,
            title: data.data.response.title,
            category_name: data.data.response.category_name,
            category_id: data.data.response.category_id,
            sub_category_name: data.data.response.sub_category_name,
            sub_category_id: data.data.response.sub_category_id,
            hardware_image: data.data.response.hardware_image,
            warehouse: data.data.response.warehouse,
            bangalore_stock: data.data.response.bangalore_stock,
            jodhpur_stock: data.data.response.jodhpur_stock,
            manufacturing_time: data.data.response.manufacturing_time,
            status: data.data.response.status,
            returnDays: data.data.response.returnDays,
            COD: data.data.response.COD,
            returnable: data.data.response.returnable,
            quantity: data.data.response.quantity,
            package_length: data.data.response.package_length,
            package_height: data.data.response.package_height,
            package_breadth: data.data.response.package_breadth,
            unit: data.data.response.unit,
            range: data.data.response.range,
            action: data.data.response
          }])
          handleClose();
          dispatch({
            type: Notify, payload: {
              open: true,
              variant: "success",
              message: data.data.message,
            }
          });
        }
      })
      .catch((err) => {
        // //console.log(err);
        dispatch({
          type: Notify, payload: {
            open: true,
            variant: "error",
            message: "Something Went Wrong !!!",
          }
        });
      });
  };

  const handleUpdateHardware = (e) => {
    e.preventDefault();

    const FD = new FormData();

    FD.append("_id", state.OpenBox.payload.row.action);

    FD.append("status", changeData.status === 'on' ? true : false);

    let multiOBJ = {}

    category.map((item) => {
      if (item._id === changeData.category_name) multiOBJ = { ...multiOBJ, category_name: item.category_name }

      return (
        item._id === changeData.category_name &&
        FD.append("category_name", item.category_name)
      );
    });

    subCategory.map((item) => {
      if (item._id === changeData.sub_category_name) multiOBJ = { ...multiOBJ, sub_category_name: item.sub_category_name }

      return (
        item._id === changeData.sub_category_name &&
        FD.append("sub_category_name", item.sub_category_name)
      );
    });

    FD.append("returnDays", changeData.returnable ? changeData.returnDays : 0);
    FD.append("returnable", changeData.returnable);
    FD.append("COD", changeData.COD);


    FD.append("category_id", changeData.category_name);
    FD.append("sub_category_id", changeData.sub_category_name);
    FD.append("polish_time", changeData.polish_time);
    FD.append("manufacturing_time", changeData.manufacturing_time);
    FD.append("title", changeData.title);

    FD.append("SKU", changeData.SKU);

    FD.append(
      "showroom_price",
      changeData.showroom_price ? changeData.showroom_price : 0
    );
    FD.append("selling_price", changeData.selling_price);
    FD.append("warehouse", changeData.warehouse);


    FD.append("unit", changeData.unit);
    FD.append("quantity", changeData.quantity);

    FD.append("package_length", changeData.package_length ? changeData.package_length : 0);
    FD.append("package_height", changeData.package_height ? changeData.package_height : 0);
    FD.append("package_breadth", changeData.package_breadth ? changeData.package_breadth : 0);


    if (changeData.jodhpur_stock && changeData.jodhpur_stock > 0)
      FD.append("jodhpur_stock", changeData.jodhpur_stock);

    if (changeData.bangalore_stock && changeData.bangalore_stock > 0)
      FD.append("bangalore_stock", changeData.bangalore_stock);

    const res = editHardware(FD);

    res
      .then((data) => {
        // //console.log(data.status);

        if (data.status === 203) {
          dispatch({
            type: Notify, payload: {
              open: true,
              variant: "error",
              message: data.data.message,
            }
          });
        } else {
          state.OpenBox.setRow(state.OpenBox.row.map((set) => {

            if (set.action === state.OpenBox.payload.row.action) {
              set.title = changeData.title;
              set.category_name = multiOBJ.category_name;
              set.category_id = changeData.category_id;
              set.sub_category_name = multiOBJ.sub_category_name;
              set.sub_category_id = changeData.sub_category_id;
              set.hardware_image = changeData.hardware_image;
              set.warehouse = changeData.warehouse.join(',');
              set.bangalore_stock = changeData.bangalore_stock;
              set.jodhpur_stock = changeData.jodhpur_stock;
              set.manufacturing_time = changeData.manufacturing_time;
              set.status = changeData.status;
              set.returnDays = changeData.returnDays;
              set.COD = changeData.COD;
              set.returnable = changeData.returnable;
              set.quantity = changeData.quantity;
              set.package_length = changeData.package_length;
              set.package_height = changeData.package_height;
              set.package_breadth = changeData.package_breadth;
              set.unit = changeData.unit;
              set.range = changeData.range;
            }
            return set;
          }))
          handleClose();
          dispatch({
            type: Notify, payload: {
              open: true,
              variant: "success",
              message: data.data.message,
            }
          });
        }
      })
      .catch((err) => {
        // //console.log(err);
        dispatch({
          type: Notify, payload: {
            open: true,
            variant: "error",
            message: "Something Went Wrong !!!",
          }
        });
      });
  };

  return (
    <>
      <Slide
        direction="left"
        in={state.OpenBox.state}
        mountOnEnter
        unmountOnExit
      >
        <Backdrop
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={state.OpenBox.state}
        >
          <Box
            className={
              state.DarkMode.mode === true ? "mainDarkContainer" : "mainContainer"
            }
            sx={
              state.OpenBox.formType === "product" ||
                state.OpenBox.formType === "update_product"
                ? { width: "100vw !important", padding: "0 5% !important" }
                : {}
            }
          >
            <IconButton
              onClick={handleClose}
              color="primary"
              className="crossButton"
            >
              <CancelIcon />
            </IconButton>

            {/* add Products */}

            {state.OpenBox.formType === "product" && (
              <Grid container p={5} className="productPadding">
                <Grid item xs={12}>
                  <Typography component={'span'} variant="h5">
                    Add Product
                    <Typography component={'span'}
                      sx={{ display: "block !important" }}
                      variant="caption"
                    >
                      Add your product and necessary information from here
                    </Typography>
                  </Typography>
                </Grid>

                <Grid item xs={12} mt={5}>
                  <form
                    className="form"
                    id="myForm"
                    onSubmit={(e) => { confirmBox(e, handleProduct) }}
                    enctype="multipart/form-data"
                    method="post"
                  >
                    <Stepper
                      className="stepper"
                      activeStep={activeStep}
                      orientation="vertical"
                    >
                      {/* // Specification */}
                      <Step>
                        <StepLabel>Specifications</StepLabel>
                        <StepContent className="stepContent">
                          <Box className="fields">
                            {" "}
                            <Box className="stepAction">
                              <Button
                                variant="outlined"
                                size="small"
                                disabled={activeStep === 0}
                                onClick={handleBackStep}
                              >
                                Back
                              </Button>
                              <Button
                                variant="contained"
                                size="small"
                                disabled={activeStep === 6}
                                onClick={handleNextStep}
                              >
                                Continue
                              </Button>
                            </Box > <br />

                            <TextField sx={{ mb: 2 }}
                              size="small"
                              fullWidth
                              // autoComplete={false}
                              id="fullWidth"
                              // // required
                              label="SKU"
                              type="text"
                              value={SKU}
                              disabled
                              variant="outlined"
                              name="SKU"
                            />

                            <TextField sx={{ mb: 2 }}
                              size="small"
                              fullWidth
                              // required
                              id="outlined-select"
                              select
                              name="category_name"
                              label="Category"
                              value={changeData.category_name}
                              multiple
                              onChange={handleProductFelids}
                              helperText="Please select your category"
                            >
                              {category.map(
                                (option) =>
                                  option.category_status && (
                                    <MenuItem
                                      key={option._id}
                                      value={option._id}
                                    >
                                      {option.category_name}
                                    </MenuItem>
                                  )
                              )}
                              <MenuItem key={"none"} value="None">
                                {"None"}
                              </MenuItem>
                            </TextField>

                            <TextField sx={{ mb: 2 }}
                              size="small"
                              fullWidth
                              // required
                              id="outlined-select"
                              select
                              name="sub_category_name"
                              label="Sub Category"
                              multiple
                              value={changeData.sub_category_name}
                              onChange={handleProductFelids}
                              helperText="Please select your sub category"
                            >
                              {subCategory.map(
                                (option) =>
                                  changeData.category_name ===
                                  option.category_id && (
                                    <MenuItem
                                      key={option.value}
                                      value={option._id}
                                    >
                                      {option.sub_category_name}
                                    </MenuItem>
                                  )
                              )}
                              <MenuItem key={"none"} value="None">
                                {"None"}
                              </MenuItem>
                            </TextField>

                            <TextField sx={{ mb: 2 }}
                              size="small"
                              fullWidth
                              // autoComplete={false}
                              id="fullWidth"
                              // required
                              label="Title"
                              type="text"
                              variant="outlined"
                              name="product_title"
                              value={changeData.product_title}
                              onChange={handleProductFelids}
                            />

                            <TextField sx={{ mb: 2 }}
                              size="small"
                              fullWidth
                              // autoComplete={false}
                              id="fullWidth"
                              // required
                              label="Showroom Price"
                              type="number"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    ₹
                                  </InputAdornment>
                                ),
                              }}
                              variant="outlined"
                              name="showroom_price"
                              value={changeData.showroom_price}
                              onChange={handleProductFelids}
                            />

                            <TextField sx={{ mb: 2 }}
                              size="small"
                              fullWidth
                              // required
                              // autoComplete={false}
                              id="fullWidth"
                              onChange={(e) => {
                                handleDiscount(e);
                                handleProductFelids(e);
                              }}
                              label="Discount Limit"
                              type="number"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    %
                                  </InputAdornment>
                                ),
                              }}
                              variant="outlined"
                              name="discount_limit"
                              value={changeData.discount_limit}
                            />

                            <TextField sx={{ mb: 2 }}
                              size="small"
                              fullWidth
                              // disabled
                              // autoComplete={false}
                              id="fullWidth"
                              label="Selling Price"
                              type="number"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    ₹
                                  </InputAdornment>
                                ),
                              }}
                              value={
                                // changeData.MRP > 0 &&
                                //   changeData.discount_limit > 0
                                //   ? (changeData.selling_price =
                                //     changeData.MRP -
                                //     (changeData.MRP / 100) *
                                //     changeData.discount_limit)
                                //   : 0
                                changeData.selling_price
                              }
                              onChange={handleProductFelids}
                              variant="outlined"
                              name="selling_price"
                            />

                            <TextField sx={{ mb: 2 }}
                              size="small"
                              fullWidth
                              // autoComplete={false}
                              id="fullWidth"
                              label="Length"
                              type="number"
                              value={changeData.length_main}
                              onChange={handleProductFelids}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    Inch
                                  </InputAdornment>
                                ),
                              }}
                              variant="outlined"
                              name="length_main"
                              helperText="From left to right"
                            />

                            <TextField sx={{ mb: 2 }}
                              size="small"
                              fullWidth
                              // autoComplete={false}
                              id="fullWidth"
                              label="Breadth"
                              type="number"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    Inch
                                  </InputAdornment>
                                ),
                              }}
                              variant="outlined"
                              name="breadth"
                              value={changeData.breadth}
                              onChange={handleProductFelids}
                              helperText="From front to back"
                            />

                            <TextField sx={{ mb: 2 }}
                              size="small"
                              fullWidth
                              // autoComplete={false}
                              id="fullWidth"
                              label="Height"
                              type="number"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    Inch
                                  </InputAdornment>
                                ),
                              }}
                              variant="outlined"
                              name="height"
                              value={changeData.height}
                              onChange={handleProductFelids}
                              helperText="From bottom to top"
                            />

                            <InputLabel id="demo-multiple-checkbox-label">
                              Material
                            </InputLabel>
                            <Select sx={{ mb: 2 }}
                              multiple
                              fullWidth
                              value={changeData.primary_material}
                              name="primary_material"
                              onChange={handleProductFelids}
                              renderValue={(selected) => selected.join(", ")}
                            // MenuProps={MenuProps}
                            >
                              {materialCatalog.map((option) => (
                                <MenuItem
                                  key={option._id}
                                  value={option.primaryMaterial_name}
                                >
                                  <Checkbox
                                    checked={
                                      changeData.primary_material.indexOf(
                                        option.primaryMaterial_name
                                      ) > -1
                                    }
                                  />
                                  <ListItemText
                                    primary={option.primaryMaterial_name}
                                  />
                                </MenuItem>
                              ))}
                            </Select>

                            <TextField sx={{ mb: 2 }}
                              size="small"
                              fullWidth
                              // autoComplete={false}
                              id="fullWidth"
                              label="Weight"
                              type="number"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    Kg
                                  </InputAdornment>
                                ),
                              }}
                              variant="outlined"
                              name="weight"
                              value={changeData.weight}
                              onChange={handleProductFelids}
                            />

                            <TextField sx={{ mb: 2 }}
                              size="small"
                              fullWidth
                              id="outlined-select"
                              select
                              name="range"
                              label="Range"
                              multiple
                              value={changeData.range || ""}
                              onChange={handleProductFelids}
                              helperText="Please select the range."
                            >
                              {rangeCatalog.map((option) => (
                                <MenuItem
                                  key={option.value}
                                  value={option.value}
                                >
                                  {option.label}
                                </MenuItem>
                              ))}
                              <MenuItem key={"none"} value="None">
                                {"None"}
                              </MenuItem>
                            </TextField>

                            <InputLabel id="demo-multiple-checkbox-label">
                              Polish
                            </InputLabel>
                            <Select sx={{ mb: 2 }}
                              multiple
                              fullWidth
                              value={changeData.polish}
                              name="polish"
                              onChange={handleProductFelids}
                              renderValue={(selected) => selected.join(", ")}
                            // MenuProps={MenuProps}
                            >
                              {catalog.polish.length > 0 && catalog.polish.map((option,index) => (
                                <MenuItem
                                  key={option.SKU}
                                  value={option.SKU}
                                >
                                  <Checkbox
                                    checked={
                                      changeData.polish.indexOf(
                                        option.SKU
                                      ) > -1
                                    }
                                  />
                                  <ListItemText
                                    primary={option.title}
                                  />
                                </MenuItem>
                              ))}
                            </Select>
{/* 
                            <TextField sx={{ mb: 2 }}
                              size="small"
                              fullWidth
                              id="outlined-select"
                              select
                              name="polish"
                              label="Polish"
                              value={changeData.polish || ""}
                              onChange={handleProductFelids}
                              multiple
                              helperText="Please select your Polish."
                            >
                              {polishCatalog.map(
                                (option) =>
                                  option.polish_status && (
                                    <MenuItem
                                      key={option.value}
                                      value={option._id}
                                    >
                                      {option.polish_name}
                                    </MenuItem>
                                  )
                              )}
                              <MenuItem key={"none"} value="None">
                                {"None"}
                              </MenuItem>
                            </TextField> */}


                            <FormControl>
                              <FormLabel id="demo-radio-buttons-group-label">
                                Assembly
                              </FormLabel>
                              <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                name="assembly_required"
                                value={changeData.assembly_required || "no"}
                                onChange={handleProductFelids}
                              >
                                <FormControlLabel
                                  value="shipping"
                                  control={<Radio />}
                                  label="Shipping In Part"
                                />
                                <FormControlLabel
                                  value="yes"
                                  control={<Radio />}
                                  label="Yes"
                                />
                                <FormControlLabel
                                  value="no"
                                  control={<Radio />}
                                  label="No"
                                />
                              </RadioGroup>
                            </FormControl>
                            {changeData.assembly_required === "shipping" && (
                              <>

                                <TextField sx={{ mb: 2 }}
                                  size="small"
                                  fullWidth
                                  // required
                                  // autoComplete={false}
                                  id="fullWidth"
                                  label="Assemble Part"
                                  type="number"
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        No. of parts
                                      </InputAdornment>
                                    ),
                                  }}
                                  variant="outlined"
                                  name="assembly_part"
                                  value={changeData.assembly_part > -1 && changeData.assembly_part < 3 ? changeData.assembly_part : 0}
                                  onChange={handleProductFelids}
                                />
                              </>
                            )}
                            {changeData.assembly_required === "yes" && (
                              <>

                                <TextField sx={{ mt: 1, mb: 2 }}
                                  size="small"
                                  fullWidth
                                  // required
                                  id="outlined-select"
                                  select
                                  name="legs"
                                  label="Table Legs"
                                  value={changeData.legs || ""}
                                  onChange={handleProductFelids}
                                  multiple
                                  helperText="Please select your leg "
                                >
                                  {legCatalog.map((option) => (
                                    <MenuItem
                                      key={option.value}
                                      value={option.value}
                                    >
                                      {option.label}
                                    </MenuItem>
                                  ))}
                                  <MenuItem key={"none"} value="None">
                                    {"None"}
                                  </MenuItem>
                                </TextField>

                                <TextField sx={{ mb: 2 }}
                                  size="small"
                                  fullWidth
                                  // required
                                  id="outlined-select"
                                  select
                                  name="assembly_level"
                                  label="Assembly Level"
                                  value={changeData.assembly_level || ""}
                                  onChange={handleProductFelids}
                                  multiple
                                  helperText="Please select your assembly level "
                                >
                                  {assemblyLevelCatalog.map((option) => (
                                    <MenuItem
                                      key={option.value}
                                      value={option.value}
                                    >
                                      {option.label}
                                    </MenuItem>
                                  ))}
                                  <MenuItem key={"none"} value="None">
                                    {"None"}
                                  </MenuItem>
                                </TextField>
                              </>
                            )}



                            <FormLabel id="demo-radio-buttons-group-label">
                              Availability
                            </FormLabel>

                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={changeData.mobile_store}
                                  onChange={handleProductFelids}
                                  name="mobile_store"
                                  helperText="Check it if want it on mobile."
                                />
                              }
                              label="Mobile Store"
                            />
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={changeData.online_store}
                                  onChange={handleProductFelids}
                                  name="mobile_store"
                                  helperText="Check it if want it on online store."
                                />
                              }
                              label="Online Store"
                            />
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={changeData.continue_selling}
                                  onChange={handleProductFelids}
                                  name="continue_selling"
                                  helperText="Check it if want it to sell when out of Inventory."
                                />
                              }
                              label="Continue Selling"
                            />


                            {/*                            
                             <TextField sx = {{mb : 2}}
                              size="small"
                              fullWidth
                              // autoComplete={false}
                              id="fullWidth"
                              // required
                              label="MRP"
                              type="number"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    ₹
                                  </InputAdornment>
                                ),
                              }}
                              variant="outlined"
                              name="MRP"
                              onChange={handleProductFelids}
                              value={changeData.MRP}
                            /> */}





                          </Box >
                          <Box className="stepAction">
                            <Button
                              variant="outlined"
                              size="small"
                              disabled={activeStep === 0}
                              onClick={handleBackStep}
                            >
                              Back
                            </Button>
                            <Button
                              variant="contained"
                              size="small"
                              disabled={activeStep === 6}
                              onClick={handleNextStep}
                            >
                              Continue
                            </Button>
                          </Box>
                        </StepContent>
                      </Step>
                      {/* // Specification Ends*/}

                      {/* Images */}
                      <Step>
                        <StepLabel>Images</StepLabel>
                        <StepContent className="stepContent">
                          <Box className="fields">
                            {" "}
                            <Box className="stepAction">
                              <Button
                                variant="outlined"
                                size="small"
                                disabled={activeStep === 0}
                                onClick={handleBackStep}
                              >
                                Back
                              </Button>
                              <Button
                                variant="contained"
                                size="small"
                                disabled={activeStep === 6}
                                onClick={handleNextStep}
                              >
                                Continue
                              </Button>
                            </Box > <br />

                            {/* <AcceptMaxFiles className="dorpContainer"/> */}
                            <FormLabel id="demo-radio-buttons-group-label">
                              Product Images
                            </FormLabel>
                            <ProductsPreviews
                              text={"Make Sure the picture ratio should be in 1:1."}
                            ></ProductsPreviews>

                            {files.length > 0 && <Grid sx={{ p: 2 }} spacing={2} container>
                              {
                                files.map((img, index) => {
                                  return <>
                                    <Grid item xs={2} sx={{ position: 'relative' }} >
                                      <CancelIcon onClick={() => {
                                        // this function is for removing the image from savedImage array 
                                        let temp = files;
                                        console.log(">>>>>>", temp, files);
                                        temp.splice(index, 1);
                                        setFiles([...temp])
                                      }} className='imageCross' color='primary' />
                                      <img style={{ width: '100%' }} src={URL.createObjectURL(img)} alt={img.name} />
                                    </Grid>
                                  </>
                                })
                              }
                            </Grid>
                            }

                            {/* // featured images */}
                            <TextField sx={{ mb: 2 }}
                              size="small"
                              fullWidth
                              // required
                              id="outlined-select"
                              select
                              name="featured_image"
                              label="Feature Image"
                              value={changeData.featured_image}
                              multiple
                              onChange={handleProductFelids}
                              helperText="Please select your Featured Image"
                            >
                              {files.map(
                                (option) =>
                                  option.validate && (
                                    <MenuItem
                                      key={option}
                                      value={option}
                                    >
                                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <img style={{ width: '60px' }} src={URL.createObjectURL(option)} alt={"product"} />
                                        <h6>{option.name}</h6>
                                      </Box>
                                    </MenuItem>
                                  )
                              )}
                              <MenuItem key={"none"} value="None">
                                {"None"}
                              </MenuItem>
                            </TextField>
                            {/* // specification images */}
                            <TextField sx={{ mb: 2 }}
                              size="small"
                              fullWidth
                              // required
                              id="outlined-select"
                              select
                              name="specification_image"
                              label="Specification Image"
                              value={changeData.specificaiton_image}
                              multiple
                              onChange={handleProductFelids}
                              helperText="Please select your specification image."
                            >
                              {files.map(
                                (option) =>
                                  option.validate && (
                                    <MenuItem
                                      key={option}
                                      value={option}
                                    >
                                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <img style={{ width: '60px' }} src={URL.createObjectURL(option)} alt={"product"} />
                                        <h6>{option.name}</h6>
                                      </Box>
                                    </MenuItem>
                                  )
                              )}
                              <MenuItem key={"none"} value="None">
                                {"None"}
                              </MenuItem>
                            </TextField>
                            {/* // Mannequin images */}
                            <TextField sx={{ mb: 2 }}
                              size="small"
                              fullWidth
                              // required
                              id="outlined-select"
                              select
                              name="mannequin_image"
                              label="Mannequin Image"
                              value={changeData.mannequin_image}
                              multiple
                              onChange={handleProductFelids}
                              helperText="Please select your Mannequin Image."
                            >
                              {files.map(
                                (option) =>
                                  option.validate && (
                                    <MenuItem
                                      key={option}
                                      value={option}
                                    >
                                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <img style={{ width: '60px' }} src={URL.createObjectURL(option)} alt={"product"} />
                                        <h6>{option.name}</h6>
                                      </Box>
                                    </MenuItem>
                                  )
                              )}
                              <MenuItem key={"none"} value="None">
                                {"None"}
                              </MenuItem>
                            </TextField>


                            {/* 
                          <FormLabel id="demo-radio-buttons-group-label">
                            Featured Images
                          </FormLabel>
                          <FeaturesPreviews
                            text={"Please Drag and Drop featured images"}
                          ></FeaturesPreviews>
                          <FormLabel id="demo-radio-buttons-group-label">
                            Specification Images
                          </FormLabel>
                          <ImagePreviews
                            text={"Please Drag and Drop specification images"}
                          ></ImagePreviews>
                          <FormLabel id="demo-radio-buttons-group-label">
                            Mannequin Images
                          </FormLabel>
                          <MannequinPreviews
                            text={"Please Drag and Drop mannequin images"}
                          ></MannequinPreviews> */}
                          </Box >
                          <Box className="stepAction">
                            <Button
                              variant="outlined"
                              size="small"
                              disabled={activeStep === 0}
                              onClick={handleBackStep}
                            >
                              Back
                            </Button>
                            <Button
                              variant="contained"
                              size="small"
                              disabled={activeStep === 6}
                              onClick={handleNextStep}
                            >
                              Continue
                            </Button>
                          </Box>
                        </StepContent>
                      </Step>
                      {/* Images End */}


                      {/* Features */}
                      <Step>
                        <StepLabel>Features</StepLabel>
                        <StepContent className="stepContent">
                          <Box className="fields">
                            {" "}
                            <Box className="stepAction">
                              <Button
                                variant="outlined"
                                size="small"
                                disabled={activeStep === 0}
                                onClick={handleBackStep}
                              >
                                Back
                              </Button>
                              <Button
                                variant="contained"
                                size="small"
                                disabled={activeStep === 6}
                                onClick={handleNextStep}
                              >
                                Continue
                              </Button>
                            </Box > <br />

                            <FormGroup>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={changeData.rotating_seats}
                                    onChange={handleProductFelids}
                                    name="rotating_seats"
                                  />
                                }
                                label="Rotating Seats"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={changeData.eatable_oil_polish}
                                    onChange={handleProductFelids}
                                    name="eatable_oil_polish"
                                  />
                                }
                                label="Eatable Oil Polished"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={changeData.no_chemical}
                                    onChange={handleProductFelids}
                                    name="no_chemical"
                                  />
                                }
                                label="No Chemical Used"
                              />

                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={changeData.weaving}
                                    onChange={handleProductFelids}
                                    name="weaving"
                                  />
                                }
                                label="Weaving"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={
                                      changeData.not_suitable_for_Micro_Dish
                                    }
                                    onChange={handleProductFelids}
                                    name="not_suitable_for_Micro_Dish"
                                  />
                                }
                                label="Not Suitable For Microwave/Dishwasher"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={changeData.tilt_top}
                                    onChange={handleProductFelids}
                                    name="tilt_top"
                                  />
                                }
                                label="Tilt Top"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={changeData.inside_compartments}
                                    onChange={handleProductFelids}
                                    name="inside_compartments"
                                  />
                                }
                                label="Inside Compartments"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={changeData.stackable}
                                    onChange={handleProductFelids}
                                    name="stackable"
                                  />
                                }
                                label="Stackable"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={changeData.knife}
                                    onChange={handleProductFelids}
                                    name="knife"
                                  />
                                }
                                label="Knife Friendly Surface"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={changeData.wall_hanging}
                                    onChange={handleProductFelids}
                                    name="wall_hanging"
                                  />
                                }
                                label="Wall Hanging"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={changeData.ceramic_drawers}
                                    onChange={handleProductFelids}
                                    name="ceramic_drawers"
                                  />
                                }
                                label="Ceramic Drawers"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={changeData.ceramic_tiles}
                                    onChange={handleProductFelids}
                                    name="ceramic_tiles"
                                  />
                                }
                                label="Ceramic Tiles"
                              />
                            </FormGroup>
                          </Box >
                          <Box className="stepAction">
                            <Button
                              variant="outlined"
                              size="small"
                              disabled={activeStep === 0}
                              onClick={handleBackStep}
                            >
                              Back
                            </Button>
                            <Button
                              variant="contained"
                              size="small"
                              disabled={activeStep === 6}
                              onClick={handleNextStep}
                            >
                              Continue
                            </Button>
                          </Box>
                        </StepContent>
                      </Step>
                      {/* Features ends */}
                      {/* Miscellaneous */}
                      <Step>
                        <StepLabel>Miscellaneous</StepLabel>
                        <StepContent className="stepContent">
                          <Box className="fields">
                            {" "}
                            <Box className="stepAction">
                              <Button
                                variant="outlined"
                                size="small"
                                disabled={activeStep === 0}
                                onClick={handleBackStep}
                              >
                                Back
                              </Button>
                              <Button
                                variant="contained"
                                size="small"
                                disabled={activeStep === 6}
                                onClick={handleNextStep}
                              >
                                Continue
                              </Button>
                            </Box> <br />



                            <TextField sx={{ mb: 2 }}
                              size="small"
                              fullWidth
                              id="outlined-select"
                              select
                              name="back_style"
                              label="Back Style"
                              multiple
                              value={changeData.back_style || ""}
                              onChange={handleProductFelids}
                              helperText="Please select your Back Style."
                            >
                              {backStyleCatalog.map((option) => (
                                <MenuItem
                                  key={option.value}
                                  value={option.value}
                                >
                                  {option.label}
                                </MenuItem>
                              ))}
                              <MenuItem key={"none"} value="None">
                                {"None"}
                              </MenuItem>
                            </TextField>

                            <TextField sx={{ mb: 2 }}
                              size="small"
                              fullWidth
                              id="outlined-select"
                              select
                              name="weight_capacity"
                              label="Weight Capacity"
                              multiple
                              value={changeData.weight_capacity}
                              onChange={handleProductFelids}
                              helperText="Please select your Weight Capacity."
                            >
                              {weightCapCatalog.map((option) => (
                                <MenuItem
                                  key={option.value}
                                  value={option.value}
                                >
                                  {option.label}
                                </MenuItem>
                              ))}
                              <MenuItem key={"none"} value="None">
                                {"None"}
                              </MenuItem>
                            </TextField>


                            <FormControl>
                              <FormLabel id="demo-radio-buttons-group-label">
                                Drawer
                              </FormLabel>
                              <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                value={changeData.drawer || "no"}
                                onChange={handleProductFelids}
                                name="drawer"
                              >
                                <FormControlLabel
                                  value="mechanical"
                                  control={<Radio />}
                                  label="Mechanical"
                                />
                                <FormControlLabel
                                  value="wooden"
                                  control={<Radio />}
                                  label="Wooden"
                                />
                                <FormControlLabel
                                  value="none"
                                  control={<Radio />}
                                  label="None"
                                />
                              </RadioGroup>
                            </FormControl>

                            {(changeData.drawer === "mechanical" ||
                              changeData.drawer === "wooden") && (
                                <TextField sx={{ mb: 2 }}
                                  size="small"
                                  fullWidth
                                  type="number"
                                  id="outlined-select"
                                  name="drawer_count"
                                  label="Drawer Count"
                                  value={changeData.drawer_count}
                                  onChange={handleProductFelids}
                                />
                              )}





                            <FormControl>
                              <FormLabel id="demo-radio-buttons-group-label">
                                Joints ((Useful in products where info about
                                joints are shown))
                              </FormLabel>
                              <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                name="joints"
                                value={changeData.joints}
                                onChange={handleProductFelids}
                              >
                                <FormControlLabel
                                  value="single"
                                  control={<Radio />}
                                  label="Single"
                                />
                                <FormControlLabel
                                  value="multi"
                                  control={<Radio />}
                                  label="Multiple"
                                />
                              </RadioGroup>
                            </FormControl>

                          </Box >
                          <Box className="stepAction">
                            <Button
                              variant="outlined"
                              size="small"
                              disabled={activeStep === 0}
                              onClick={handleBackStep}
                            >
                              Back
                            </Button>
                            <Button
                              variant="contained"
                              size="small"
                              disabled={activeStep === 6}
                              onClick={handleNextStep}
                            >
                              Continue
                            </Button>
                          </Box>
                        </StepContent>
                      </Step>
                      {/* Miscellaneous ends */}


                      {/* Inventory & Shipping */}
                      <Step>
                        <StepLabel>Inventory & Shipping</StepLabel>
                        <StepContent className="stepContent">
                          <Box className="fields">
                            {" "}
                            <Box className="stepAction">
                              <Button
                                variant="outlined"
                                size="small"
                                disabled={activeStep === 0}
                                onClick={handleBackStep}
                              >
                                Back
                              </Button>
                              <Button
                                variant="contained"
                                size="small"
                                disabled={activeStep === 6}
                                onClick={handleNextStep}
                              >
                                Continue
                              </Button>
                            </Box > <br />

                            <FormGroup>
                              <FormLabel id="demo-radio-buttons-group-label">
                                Return & Payment Policy
                              </FormLabel>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={changeData.COD}
                                    onChange={handleProductFelids}
                                    name="COD"
                                  />
                                }
                                label="COD Available"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={changeData.returnable}
                                    onChange={handleProductFelids}
                                    name="returnable"
                                  />
                                }
                                label="Return Item"
                              />
                            </FormGroup>
                            {changeData.returnable && (
                              <>
                                <Typography component={'span'} variant="Caption">
                                  {" "}
                                  Return in {changeData.returnDays} Days
                                </Typography>
                                <Slider
                                  aria-label="Return Days"
                                  defaultValue={0}
                                  size="small"
                                  name="returnDays"
                                  value={changeData.returnDays}
                                  onChange={handleProductFelids}
                                  helperText="Please select your return days"
                                  valueLabelDisplay="auto"
                                />
                              </>
                            )}

                            <Typography component={'span'} variant="Caption">
                              {" "}
                              Polish in {changeData.polish_time} Days
                            </Typography>
                            <Slider
                              aria-label="Construction Days"
                              defaultValue={0}
                              size="small"
                              valueLabelDisplay="auto"
                              name="polish_time"
                              value={changeData.polish_time}
                              onChange={handleProductFelids}
                              helperText="Please select your polish time"
                            />

                            <Typography component={'span'} variant="Caption">
                              {" "}
                              Manufactured in {
                                changeData.manufacturing_time
                              }{" "}
                              Days
                            </Typography>
                            <Slider
                              aria-label="Construction Days"
                              defaultValue={0}
                              size="small"
                              valueLabelDisplay="auto"
                              name="manufacturing_time"
                              value={changeData.manufacturing_time}
                              onChange={handleProductFelids}
                              helperText="Please select your manufacturing time"
                            />

                            <InputLabel id="demo-multiple-checkbox-label">Stock Warehouse</InputLabel>
                            <Select sx={{ mb: 2 }}
                              multiple
                              fullWidth
                              value={changeData.warehouse}
                              name="warehouse"
                              onChange={handleProductFelids}
                              renderValue={(selected) => selected.join(', ')}
                            >
                              {warehouse.map((option) => (
                                <MenuItem key={option.label} value={option.value}>
                                  <Checkbox checked={changeData.warehouse.indexOf(option.value) > -1} />
                                  <ListItemText primary={option.value} />
                                </MenuItem>
                              ))}
                            </Select>

                            {

                              changeData.warehouse.map((row) => {
                                let stock; row === 'Jodhpur (Rajasthan)' ? stock = 'jodhpur_stock' : stock = 'bangalore_stock';
                                return <>

                                  <TextField sx={{ mb: 2 }}
                                    size="small"
                                    fullWidth
                                    name={stock}
                                    label={row + ' Stock'}
                                    type='number'
                                    value={changeData[stock] || ""}
                                    onChange={handleProductFelids}
                                  />
                                </>
                              })
                            }

                            <TextField sx={{ mb: 2 }}
                              size="small"
                              fullWidth
                              // autoComplete={false}
                              id="fullWidth"
                              label="Package Length"
                              type="number"
                              value={changeData.package_length}
                              onChange={handleProductFelids}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    Inch
                                  </InputAdornment>
                                ),
                              }}
                              variant="outlined"
                              name="package_length"
                              helperText="From left to right"
                            />

                            <TextField sx={{ mb: 2 }}
                              size="small"
                              fullWidth
                              // autoComplete={false}
                              id="fullWidth"
                              label="Package Breadth"
                              type="number"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    Inch
                                  </InputAdornment>
                                ),
                              }}
                              variant="outlined"
                              name="package_breadth"
                              value={changeData.package_breadth}
                              onChange={handleProductFelids}
                              helperText="From front to back"
                            />

                            <TextField sx={{ mb: 2 }}
                              size="small"
                              fullWidth
                              // autoComplete={false}
                              id="fullWidth"
                              label="Package Height"
                              type="number"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    Inch
                                  </InputAdornment>
                                ),
                              }}
                              variant="outlined"
                              name="package_height"
                              value={changeData.package_height}
                              onChange={handleProductFelids}
                              helperText="From bottom to top"
                            />

                            <FormLabel id="demo-radio-buttons-group-label">
                              Selling Points{" "}
                            </FormLabel>

                            <Grid container sx={{ mt: 1 }}>
                              <Grid item xs={12} sx={{ mb: 2 }} >
                                <Grid container sx={{ display: 'flex', alignItem: 'center', justifyContent: 'space-between' }} >
                                  <Grid item xs={11}><TextField fullWidth value={changeData.item || ''} size={'small'} type='text' name='item'
                                    onChange={handleProductFelids}
                                    label='Write a point...' /></Grid>
                                  <Grid item xs={0.8}>
                                    {changeData.select === undefined ? <Button
                                      fullWidth
                                      onClick={() => {
                                        changeData.item !== '' && setData({
                                          ...changeData,
                                          selling_points: [...changeData.selling_points, changeData.item],
                                          item: ''
                                        });
                                      }}
                                      variant='outlined'>Add</Button> : <Button onClick={() => {
                                        setData({
                                          ...changeData,
                                          selling_points: changeData.selling_points.filter((row, i) => {
                                            return i !== changeData.select;
                                          }),
                                          select: undefined

                                        })


                                      }}
                                        variant='outlined'>Remove</Button>}
                                  </Grid>
                                </Grid>
                              </Grid>
                              {changeData.selling_points.length > 0 && <Grid sx={{
                                maxHeight: '100px', overflowY: 'scroll', mb: 2,
                                border: '2px solid #91441f',
                                padding: '7px'
                              }} item xs={12}>
                                <ul style={{ listStyleType: 'square' }}>
                                  {
                                    changeData.selling_points && changeData.selling_points.map((item, index) => {
                                      return <li><Typography sx={{ cursor: 'pointer' }}
                                        onClick={() => {
                                          setData({
                                            ...changeData,
                                            select: index,
                                            item: item
                                          })
                                        }}
                                        variant='body'>{index + 1 + ". "}{item}</Typography>
                                      </li>
                                    })
                                  }
                                </ul>
                              </Grid>}
                            </Grid>

                            <Box sx={{ display: 'flex', mb: 2 }}>

                              <TextField
                                size="small"
                                sx={{ width: '90%' }}
                                id="fullWidth"
                                label="Quantity"
                                type="Number"
                                variant="outlined"
                                name="quantity"
                                value={changeData.quantity}
                                onChange={handleProductFelids}
                              />


                              <TextField
                                id="outlined-select-currency"
                                select
                                sx={{ ml: 1, width: '10%' }}
                                size='small'
                                label="Unit"
                                name='unit'
                                value={changeData.unit || ''}
                                onChange={handleProductFelids}
                              >
                                {unitCatalog.map((option) => (
                                  <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                  </MenuItem>
                                ))}
                              </TextField>
                            </Box>
                          </Box >
                          <Box className="stepAction">
                            <Button
                              variant="outlined"
                              size="small"
                              disabled={activeStep === 0}
                              onClick={handleBackStep}
                            >
                              Back
                            </Button>
                            <Button
                              variant="contained"
                              size="small"
                              disabled={activeStep === 6}
                              onClick={handleNextStep}
                            >
                              Continue
                            </Button>
                          </Box>
                        </StepContent>
                      </Step>
                      {/* Inventory & Shipping End */}

                      {/* SEO */}
                      <Step>
                        <StepLabel>SEO</StepLabel>
                        <StepContent className="stepContent">
                          <Box className="fields">
                            {" "}
                            <Box className="stepAction">
                              <Button
                                variant="outlined"
                                size="small"
                                disabled={activeStep === 0}
                                onClick={handleBackStep}
                              >
                                Back
                              </Button>
                              <Button
                                variant="contained"
                                size="small"
                                disabled={activeStep === 6}
                                onClick={handleNextStep}
                              >
                                Continue
                              </Button>
                            </Box > <br />

                            <TextField sx={{ mb: 2 }}
                              size="small"
                              fullWidth
                              // required
                              // autoComplete={false}
                              id="fullWidth"
                              label="SEO Title"
                              type="text"
                              variant="outlined"
                              name="seo_title"
                              value={changeData.seo_title}
                              onChange={handleProductFelids}
                            />

                            <TextField sx={{ mb: 2 }}
                              size="small"
                              fullWidth
                              // required
                              // autoComplete={false}
                              id="fullWidth"
                              label="SEO Description"
                              type="text"
                              variant="outlined"
                              name="seo_description"
                              value={changeData.seo_description}
                              onChange={handleProductFelids}
                            />

                            <TextField sx={{ mb: 2 }}
                              size="small"
                              fullWidth
                              // required
                              // autoComplete={false}
                              id="fullWidth"
                              label="SEO Keyword"
                              type="text"
                              variant="outlined"
                              name="seo_keyword"
                              value={changeData.seo_keyword}
                              onChange={handleProductFelids}
                            />

                            {/* product description  */}
                            <FormLabel id="demo-radio-buttons-group-label">
                              Product Description
                            </FormLabel>

                            <TextareaAutosize
                              fullWidth
                              minRows={5}
                              id="outlined-select"
                              name="product_description"
                              onChange={handleProductFelids}
                              defaultValue={changeData.product_description}
                              type="text"
                              helperText="Please enter your product description"
                            />
                            {/* <Editor
                              apiKey="nrxcqobhboeugucjonpg61xo1m65hn8qjxwayuhvqfjzb6j4"
                              onInit={(event, editor) =>
                                (editorRef.current = editor)
                              }
                              init={{
                                height: 300,
                                menubar: true,
                              }}
                            /> */}
                            <br />
                            {/* selling points  */}

                            {/* <FormLabel id="demo-radio-buttons-group-label">
                              Selling Points{" "}
                            </FormLabel>

                            <TextareaAutosize
                              fullWidth
                              minRows={5}
                              id="outlined-select"
                              name="selling_points"
                              defaultValue={"Selling Points" || changeData.selling_points}
                              type="text"
                              helperText="Please enter your selling points."
                            /> */}

                            {/* <Editor
                              apiKey="nrxcqobhboeugucjonpg61xo1m65hn8qjxwayuhvqfjzb6j4"
                              onInit={(event, editor) =>
                                (sellingRef.current = editor)
                              }
                              init={{
                                height: 400,
                                menubar: true,
                              }}
                            /> */}
                          </Box > <br />
                          <Box className="stepAction">
                            <Button
                              variant="outlined"
                              size="small"
                              disabled={activeStep === 0}
                              onClick={handleBackStep}
                            >
                              Back
                            </Button>
                            <Button
                              variant="contained"
                              size="small"
                              disabled={activeStep === 6}
                              onClick={handleNextStep}
                            >
                              Continue
                            </Button>
                          </Box>
                        </StepContent>
                      </Step>
                      {/* SEO End */}


                      {/* Extra-details */}
                      <Step>
                        <StepLabel>Extra-Details</StepLabel>
                        <StepContent className="stepContent">
                          <Box className="fields">
                            {" "}
                            <Box className="stepAction">
                              <Button
                                variant="outlined"
                                size="small"
                                disabled={activeStep === 0}
                                onClick={handleBackStep}
                              >
                                Back
                              </Button>
                              <Button
                                variant="contained"
                                size="small"
                                disabled={activeStep === 6}
                                onClick={handleNextStep}
                              >
                                Continue
                              </Button>
                            </Box >

                          </Box > <br />


                          <TextField sx={{ mb: 2 }}
                            size="small"
                            fullWidth
                            // required
                            id="outlined-select"
                            select
                            name="tax_rate"
                            label="Tax Rate"
                            value={changeData.tax_rate}
                            onChange={handleProductFelids}
                            multiple
                            helperText="Please select your tax rate."
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  %
                                </InputAdornment>
                              ),
                            }}
                          >
                            {taxRateCatalog.map((option) => (
                              <MenuItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </MenuItem>
                            ))}
                            <MenuItem key={"none"} value="None">
                              {"None"}
                            </MenuItem>
                          </TextField>


                          <FormControl>
                            <FormLabel id="demo-radio-buttons-group-label">
                              Silver
                            </FormLabel>
                            <RadioGroup
                              sx={{ mb: 2 }}
                              aria-labelledby="demo-radio-buttons-group-label"
                              value={changeData.silver || "no"}
                              onChange={handleProductFelids}
                              name="silver"
                            >
                              <FormControlLabel
                                value="yes"
                                control={<Radio />}
                                label="Yes"
                              />
                              <FormControlLabel
                                value="no"
                                control={<Radio />}
                                label="No"
                              />
                            </RadioGroup>
                          </FormControl>
                          {changeData.silver === "yes" && (
                            <TextField sx={{ mb: 2 }}
                              size="small"
                              fullWidth
                              // autoComplete={false}
                              id="fullWidth"
                              label="Sliver Weight"
                              type="text"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    Gram
                                  </InputAdornment>
                                ),
                              }}
                              variant="outlined"
                              name="silver_weight"
                              value={changeData.silver_weight}
                              onChange={handleProductFelids}
                            />
                          )}


                          <TextField sx={{ mb: 2 }}
                            size="small"
                            fullWidth
                            id="outlined-select"
                            select
                            name="hinge"
                            label="Hinge"
                            multiple
                            value={changeData.hinge}
                            onChange={handleProductFelids}
                            helperText="Please select your hinge."
                          >
                            {catalog.hinge.map(
                              (option) => option.status && <MenuItem
                                    key={option.SKU}
                                    value={option.SKU}
                                  >
                                    {option.title}
                                  </MenuItem>
                            )}
                            <MenuItem key={"none"} value="None">
                              {"None"}
                            </MenuItem>
                          </TextField>

                          <TextField sx={{ mb: 2 }}
                            size="small"
                            fullWidth
                            id="outlined-select"
                            select
                            name="knob"
                            label="Knob"
                            multiple
                            value={changeData.knob}
                            onChange={handleProductFelids}
                            helperText="Please select your knob."
                          >
                            {console.log(catalog)}
                            {catalog.knob.map(
                              (option) => option.status && <MenuItem
                                    key={option.SKU}
                                    value={option.SKU}
                                  >
                                    {option.title}
                                  </MenuItem>
                            )}
                            <MenuItem key={"none"} value="None">
                              {"None"}
                            </MenuItem>
                          </TextField>

                          <TextField sx={{ mb: 2 }}
                            size="small"
                            fullWidth
                            id="outlined-select"
                            select
                            name="door"
                            label="Door"
                            multiple
                            value={changeData.door}
                            onChange={handleProductFelids}
                            helperText="Please select your door."
                          >
                           {catalog.door.map(
                              (option) => option.status && <MenuItem
                                    key={option.SKU}
                                    value={option.SKU}
                                  >
                                    {option.title}
                                  </MenuItem>
                            )}
                            <MenuItem key={"none"} value="None">
                              {"None"}
                            </MenuItem>
                          </TextField>

                          <TextField sx={{ mb: 2 }}
                            size="small"
                            fullWidth
                            id="outlined-select"
                            select
                            name="handle"
                            label="Handle"
                            multiple
                            value={changeData.handle}
                            onChange={handleProductFelids}
                            helperText="Please select your handle."
                          >
                            {catalog.handle.map(
                              (option) => option.status && <MenuItem
                                    key={option.SKU}
                                    value={option.SKU}
                                  >
                                    {option.title}
                                  </MenuItem>
                            )}
                            <MenuItem key={"none"} value="None">
                              {"None"}
                            </MenuItem>
                          </TextField>

                          <TextField sx={{ mb: 2 }}
                            size="small"
                            fullWidth
                            id="outlined-select"
                            select
                            label="Fitting"
                            name="fitting"
                            multiple
                            value={changeData.fitting}
                            onChange={handleProductFelids}
                            helperText="Please select your fitting."
                          >
                           {catalog.fitting.map(
                              (option) => option.status && <MenuItem
                                    key={option.SKU}
                                    value={option.SKU}
                                  >
                                    {option.title}
                                  </MenuItem>
                            )}
                            <MenuItem key={"none"} value="None">
                              {"None"}
                            </MenuItem>
                          </TextField>


                          <FormControl>
                            <FormLabel id="demo-radio-buttons-group-label">
                              Mirror
                            </FormLabel>
                            <RadioGroup
                              sx={{ mb: 2 }}
                              aria-labelledby="demo-radio-buttons-group-label"
                              name="mirror"
                              value={changeData.mirror || "no"}
                              onChange={handleProductFelids}
                            >
                              <FormControlLabel
                                value="yes"
                                control={<Radio />}
                                label="Yes"
                              />
                              <FormControlLabel
                                value="no"
                                control={<Radio />}
                                label="No"
                              />
                            </RadioGroup>
                          </FormControl>

                          {changeData.mirror === "yes" && (
                            <>

                              <TextField sx={{ mb: 2 }}
                                size="small"
                                fullWidth
                                // autoComplete={false}
                                id="fullWidth"
                                label="Mirror Length"
                                type="text"
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      Inch
                                    </InputAdornment>
                                  ),
                                }}
                                variant="outlined"
                                value={changeData.mirror_length}
                                onChange={handleProductFelids}
                                name="mirror_length"
                              />


                              <TextField sx={{ mb: 2 }}
                                size="small"
                                fullWidth
                                // autoComplete={false}
                                id="fullWidth"
                                label="Mirror Width"
                                type="text"
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      Inch
                                    </InputAdornment>
                                  ),
                                }}
                                variant="outlined"
                                name="mirror_width"
                                value={changeData.mirror_width}
                                onChange={handleProductFelids}
                              />
                            </>
                          )}



                          <TextField sx={{ mb: 2 }}
                            size="small"
                            fullWidth
                            // autoComplete={false}
                            id="fullWidth"
                            label="Top Size"
                            type="number"
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  Inch
                                </InputAdornment>
                              ),
                            }}
                            variant="outlined"
                            name="top_size"
                            value={changeData.top_size}
                            onChange={handleProductFelids}
                          />



                          <TextField sx={{ mb: 2 }}
                            size="small"
                            fullWidth
                            // autoComplete={false}
                            id="fullWidth"
                            label="Dial Size (Only Applicable on Clock And Clock Containing Items )"
                            type="number"
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  Inch
                                </InputAdornment>
                              ),
                            }}
                            variant="outlined"
                            value={changeData.dial_size}
                            onChange={handleProductFelids}
                            name="dial_size"
                          />


                          <FormControl>
                            <FormLabel id="demo-radio-buttons-group-label">
                              Wheel
                            </FormLabel>
                            <RadioGroup
                              sx={{ mb: 2 }}
                              aria-labelledby="demo-radio-buttons-group-label"
                              name="wheel"
                              value={changeData.wheel || "no"}
                              onChange={handleProductFelids}
                            >
                              <FormControlLabel
                                value="yes"
                                control={<Radio />}
                                label="Yes"
                              />
                              <FormControlLabel
                                value="no"
                                control={<Radio />}
                                label="No"
                              />
                            </RadioGroup>
                          </FormControl>
                          <br />

                          <FormControl>
                            <FormLabel id="demo-radio-buttons-group-label">
                              Trolley
                            </FormLabel>
                            <RadioGroup
                              sx={{ mb: 2 }}

                              aria-labelledby="demo-radio-buttons-group-label"
                              name="trolley"
                              value={changeData.trolley || "no"}
                              onChange={handleProductFelids}
                            >
                              <FormControlLabel
                                value="yes"
                                control={<Radio />}
                                label="Yes"
                              />
                              <FormControlLabel
                                value="no"
                                control={<Radio />}
                                label="No"
                              />
                            </RadioGroup>
                          </FormControl>
                          {changeData.trolley === "yes" && (
                            <>

                              <TextField sx={{ mb: 2 }}
                                size="small"
                                fullWidth
                                id="outlined-select"
                                select
                                name="trolley_material"
                                label="Trolly Material"
                                multiple
                                value={changeData.trolley_material}
                                onChange={handleProductFelids}
                                helperText="Please select your Trolly Material "
                              >
                                {trollyMaterial.map((option) => (
                                  <MenuItem
                                    key={option.value}
                                    value={option.value}
                                  >
                                    {option.label}
                                  </MenuItem>
                                ))}
                              </TextField>
                            </>
                          )}



                          <TextField sx={{ mb: 2 }}
                            size="small"
                            fullWidth
                            // autoComplete={false}
                            id="fullWidth"
                            label="Seating Size Width"
                            type="number"
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  Inch
                                </InputAdornment>
                              ),
                            }}
                            variant="outlined"
                            name="seating_size_width"
                            value={changeData.seating_size_width}
                            onChange={handleProductFelids}
                          />


                          <TextField sx={{ mb: 2 }}
                            size="small"
                            fullWidth
                            // autoComplete={false}
                            id="fullWidth"
                            label="Seating Size Width Depth"
                            type="number"
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  Inch
                                </InputAdornment>
                              ),
                            }}
                            variant="outlined"
                            name="seating_size_depth"
                            value={changeData.seating_size_depth}
                            onChange={handleProductFelids}
                          />


                          <TextField sx={{ mb: 2 }}
                            size="small"
                            fullWidth
                            // autoComplete={false}
                            id="fullWidth"
                            label="Seating Size Height"
                            type="number"
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  Inch
                                </InputAdornment>
                              ),
                            }}
                            variant="outlined"
                            name="seating_size_height"
                            value={changeData.seating_size_height}
                            onChange={handleProductFelids}
                          />

                          <FormControl>
                            <FormLabel id="demo-radio-buttons-group-label">
                              Textile
                            </FormLabel>
                            <RadioGroup
                              sx={{ mb: 2 }}

                              aria-labelledby="demo-radio-buttons-group-label"
                              value={changeData.textile || "no"}
                              onChange={handleProductFelids}
                              name="textile"
                            >
                              <FormControlLabel
                                value="yes"
                                control={<Radio />}
                                label="Yes"
                              />
                              <FormControlLabel
                                value="no"
                                control={<Radio />}
                                label="No"
                              />
                            </RadioGroup>
                          </FormControl>


                          {changeData.textile === "yes" && (
                            <TextField sx={{ mb: 2 }}
                              size="small"
                              fullWidth
                              id="outlined-select"
                              select
                              name="textile_type"
                              label="Textile"
                              value={changeData.textile_type}
                              onChange={handleProductFelids}
                              multiple
                              helperText="Please select your textile."
                            >
                              {catalog.textile.map(
                              (option) => option.status && <MenuItem
                                    key={option.SKU}
                                    value={option.SKU}
                                  >
                                    {option.title}
                                  </MenuItem>
                            )}
                              <MenuItem key={"none"} value="None">
                                {"None"}
                              </MenuItem>
                            </TextField>
                          )}

                          <br />


                          <FormControl>
                            <FormLabel id="demo-radio-buttons-group-label">
                              Upholstery
                            </FormLabel>
                            <RadioGroup
                              defaultValue="no"
                              aria-labelledby="demo-radio-buttons-group-label"
                              // onChange={(e) => {
                              //   setShowFabric(e.target.value);
                              // }}
                              sx={{ mb: 2 }}

                              value={changeData.upholstery || "no"}
                              onChange={handleProductFelids}
                              name="upholstery"
                            >
                              <FormControlLabel
                                value="yes"
                                control={<Radio />}
                                label="Yes"
                              />
                              <FormControlLabel
                                value="no"
                                control={<Radio />}
                                label="No"
                              />
                            </RadioGroup>
                          </FormControl>
                          {changeData.upholstery === "yes" && (
                            <>

                              <TextField sx={{ mb: 2 }}
                                size="small"
                                fullWidth
                                id="outlined-select"
                                select
                                name="fabric"
                                label="Fabric"
                                multiple
                                value={changeData.fabric}
                                onChange={handleProductFelids}
                                helperText="Please select your fabric."
                              >
                              {catalog.fabric.map(
                              (option) => option.status && <MenuItem
                                    key={option.SKU}
                                    value={option.SKU}
                                  >
                                    {option.title}
                                  </MenuItem>
                            )}
                                <MenuItem key={"none"} value="None">
                                  {"None"}
                                </MenuItem>
                              </TextField>{" "}
                            </>
                          )}



                          <Box className="stepAction">
                            <Button
                              variant="outlined"
                              size="small"
                              disabled={activeStep === 0}
                              onClick={handleBackStep}
                            >
                              Back
                            </Button>
                            <Button
                              variant="contained"
                              size="small"
                              disabled={activeStep === 6}
                              onClick={handleNextStep}
                            >
                              Continue
                            </Button>
                          </Box>
                        </StepContent>
                      </Step>
                      {/* Extra-details End */}


                    </Stepper>

                    <Button
                      color="primary"
                      type="submit"
                      fullWidth
                      variant="contained"
                    >
                      Add Product
                    </Button>
                  </form>
                </Grid>
              </Grid>
            )}

            {/* add Products Ends */}
            {/* Update Products */}

            {state.OpenBox.formType === "update_product" && (
              <Grid container p={5} className="productPadding">
                <Grid item xs={12}>
                  <Typography component={'span'} variant="h5">
                    Update Product
                    <Typography component={'span'}
                      sx={{ display: "block !important" }}
                      variant="caption"
                    >
                      Update your product and necessary information from here
                    </Typography>
                  </Typography>
                </Grid>

                <Grid item xs={12} mt={5}>
                  <form
                    className="form"
                    id="myForm"
                    onSubmit={(e) => { confirmBox(e, handleUpdateProduct) }}
                    enctype="multipart/form-data"
                    method="post"
                  >
                    <Stepper
                      className="stepper"
                      activeStep={activeStep}
                      orientation="vertical"
                    >
                      {/* // Specification */}
                      <Step>
                        <StepLabel>Specifications</StepLabel>
                        <StepContent className="stepContent">
                          <Box className="fields">
                            {" "}
                            <Box className="stepAction">
                              <Button
                                variant="outlined"
                                size="small"
                                disabled={activeStep === 0}
                                onClick={handleBackStep}
                              >
                                Back
                              </Button>
                              <Button
                                variant="contained"
                                size="small"
                                disabled={activeStep === 6}
                                onClick={handleNextStep}
                              >
                                Continue
                              </Button>
                            </Box > <br />

                            <TextField sx={{ mb: 2 }}
                              size="small"
                              fullWidth
                              // autoComplete={false}
                              id="fullWidth"
                              // // required
                              label="SKU"
                              type="text"
                              value={changeData.SKU || ''}
                              disabled
                              variant="outlined"
                              name="SKU"
                            />

                            <TextField sx={{ mb: 2 }}
                              size="small"
                              fullWidth
                              // required
                              id="outlined-select"
                              select
                              name="category_name"
                              label="Category"
                              value={changeData.category_name || ''}
                              multiple
                              onChange={handleProductFelids}
                              helperText="Please select your category"
                            >
                              {category.map(
                                (option) =>
                                  option.category_status && (
                                    <MenuItem
                                      key={option._id}
                                      value={option._id}
                                    >
                                      {option.category_name}
                                    </MenuItem>
                                  )
                              )}
                              <MenuItem key={"none"} value="None">
                                {"None"}
                              </MenuItem>
                            </TextField>

                            <TextField sx={{ mb: 2 }}
                              size="small"
                              fullWidth
                              // required
                              id="outlined-select"
                              select
                              name="sub_category_name"
                              label="Sub Category"
                              multiple
                              value={changeData.sub_category_name || ''}
                              onChange={handleProductFelids}
                              helperText="Please select your sub category"
                            >
                              {subCategory.map(
                                (option) =>
                                  changeData.category_name ===
                                  option.category_id && (
                                    <MenuItem
                                      key={option.value}
                                      value={option._id}
                                    >
                                      {option.sub_category_name}
                                    </MenuItem>
                                  )
                              )}
                              <MenuItem key={"none"} value="None">
                                {"None"}
                              </MenuItem>
                            </TextField>

                            <TextField sx={{ mb: 2 }}
                              size="small"
                              fullWidth
                              // autoComplete={false}
                              id="fullWidth"
                              // required
                              label="Title"
                              type="text"
                              variant="outlined"
                              name="product_title"
                              value={changeData.product_title}
                              onChange={handleProductFelids}
                            />

                            <TextField sx={{ mb: 2 }}
                              size="small"
                              fullWidth
                              // autoComplete={false}
                              id="fullWidth"
                              // required
                              label="Showroom Price"
                              type="number"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    ₹
                                  </InputAdornment>
                                ),
                              }}
                              variant="outlined"
                              name="showroom_price"
                              value={changeData.showroom_price}
                              onChange={handleProductFelids}
                            />

                            <TextField sx={{ mb: 2 }}
                              size="small"
                              fullWidth
                              // required
                              // autoComplete={false}
                              id="fullWidth"
                              onChange={(e) => {
                                handleDiscount(e);
                                handleProductFelids(e);
                              }}
                              label="Discount Limit"
                              type="number"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    %
                                  </InputAdornment>
                                ),
                              }}
                              variant="outlined"
                              name="discount_limit"
                              value={changeData.discount_limit}
                            />

                            <TextField sx={{ mb: 2 }}
                              size="small"
                              fullWidth
                              // disabled
                              // autoComplete={false}
                              id="fullWidth"
                              label="Selling Price"
                              type="number"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    ₹
                                  </InputAdornment>
                                ),
                              }}
                              value={
                                // changeData.MRP > 0 &&
                                //   changeData.discount_limit > 0
                                //   ? (changeData.selling_price =
                                //     changeData.MRP -
                                //     (changeData.MRP / 100) *
                                //     changeData.discount_limit)
                                //   : 0
                                changeData.selling_price
                              }
                              onChange={handleProductFelids}
                              variant="outlined"
                              name="selling_price"
                            />

                            <TextField sx={{ mb: 2 }}
                              size="small"
                              fullWidth
                              // autoComplete={false}
                              id="fullWidth"
                              label="Length"
                              type="number"
                              value={changeData.length_main}
                              onChange={handleProductFelids}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    Inch
                                  </InputAdornment>
                                ),
                              }}
                              variant="outlined"
                              name="length_main"
                              helperText="From left to right"
                            />

                            <TextField sx={{ mb: 2 }}
                              size="small"
                              fullWidth
                              // autoComplete={false}
                              id="fullWidth"
                              label="Breadth"
                              type="number"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    Inch
                                  </InputAdornment>
                                ),
                              }}
                              variant="outlined"
                              name="breadth"
                              value={changeData.breadth}
                              onChange={handleProductFelids}
                              helperText="From front to back"
                            />

                            <TextField sx={{ mb: 2 }}
                              size="small"
                              fullWidth
                              // autoComplete={false}
                              id="fullWidth"
                              label="Height"
                              type="number"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    Inch
                                  </InputAdornment>
                                ),
                              }}
                              variant="outlined"
                              name="height"
                              value={changeData.height}
                              onChange={handleProductFelids}
                              helperText="From bottom to top"
                            />

                            <InputLabel id="demo-multiple-checkbox-label">
                              Material
                            </InputLabel>
                            <Select sx={{ mb: 2 }}
                              multiple
                              fullWidth
                              value={changeData.primary_material || []}
                              name="primary_material"
                              onChange={handleProductFelids}
                              renderValue={(selected) => selected.join(", ")}
                            // MenuProps={MenuProps}
                            >
                              {materialCatalog.map((option) => (
                                <MenuItem
                                  key={option._id}
                                  value={option.primaryMaterial_name}
                                >
                                  <Checkbox
                                    checked={
                                      changeData.primary_material.indexOf(
                                        option.primaryMaterial_name
                                      ) > -1
                                    }
                                  />
                                  <ListItemText
                                    primary={option.primaryMaterial_name}
                                  />
                                </MenuItem>
                              ))}
                            </Select>

                            <TextField sx={{ mb: 2 }}
                              size="small"
                              fullWidth
                              // autoComplete={false}
                              id="fullWidth"
                              label="Weight"
                              type="number"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    Kg
                                  </InputAdornment>
                                ),
                              }}
                              variant="outlined"
                              name="weight"
                              value={changeData.weight}
                              onChange={handleProductFelids}
                            />

                            <TextField sx={{ mb: 2 }}
                              size="small"
                              fullWidth
                              id="outlined-select"
                              select
                              name="range"
                              label="Range"
                              multiple
                              value={changeData.range || ""}
                              onChange={handleProductFelids}
                              helperText="Please select the range."
                            >
                              {rangeCatalog.map((option) => (
                                <MenuItem
                                  key={option.value}
                                  value={option.value}
                                >
                                  {option.label}
                                </MenuItem>
                              ))}
                              <MenuItem key={"none"} value="None">
                                {"None"}
                              </MenuItem>
                            </TextField>

                            <InputLabel id="demo-multiple-checkbox-label">
                              Polish
                            </InputLabel>
                            <Select sx={{ mb: 2 }}
                              multiple
                              fullWidth
                              value={changeData.polish || []}
                              name="polish"
                              onChange={handleProductFelids}
                              renderValue={(selected) => selected.join(", ")}
                            // MenuProps={MenuProps}
                            >
                              {catalog.polish.length > 0 && catalog.polish.map((option,index) => (
                                <MenuItem
                                  key={option.SKU}
                                  value={option.SKU}
                                >
                                  <Checkbox
                                    checked={
                                      changeData.polish.indexOf(
                                        option.SKU
                                      ) > -1
                                    }
                                  />
                                  <ListItemText
                                    primary={option.title}
                                  />
                                </MenuItem>
                              ))}
                            </Select>

                            {/* <TextField sx={{ mb: 2 }}
                              size="small"
                              fullWidth
                              id="outlined-select"
                              select
                              name="polish"
                              label="Polish"
                              value={changeData.polish || ""}
                              onChange={handleProductFelids}
                              multiple
                              helperText="Please select your Polish."
                            >
                              {polishCatalog.map(
                                (option) =>
                                  option.polish_status && (
                                    <MenuItem
                                      key={option.value}
                                      value={option._id}
                                    >
                                      {option.polish_name}
                                    </MenuItem>
                                  )
                              )}
                              <MenuItem key={"none"} value="None">
                                {"None"}
                              </MenuItem>
                            </TextField> */}


                            <FormControl>
                              <FormLabel id="demo-radio-buttons-group-label">
                                Assembly
                              </FormLabel>
                              <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                name="assembly_required"
                                value={changeData.assembly_required || "no"}
                                onChange={handleProductFelids}
                              >
                                <FormControlLabel
                                  value="shipping"
                                  control={<Radio />}
                                  label="Shipping In Part"
                                />
                                <FormControlLabel
                                  value="yes"
                                  control={<Radio />}
                                  label="Yes"
                                />
                                <FormControlLabel
                                  value="no"
                                  control={<Radio />}
                                  label="No"
                                />
                              </RadioGroup>
                            </FormControl>
                            {changeData.assembly_required === "shipping" && (
                              <>

                                <TextField sx={{ mb: 2 }}
                                  size="small"
                                  fullWidth
                                  // required
                                  // autoComplete={false}
                                  id="fullWidth"
                                  label="Assemble Part"
                                  type="number"
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        No. of parts
                                      </InputAdornment>
                                    ),
                                  }}
                                  variant="outlined"
                                  name="assembly_part"
                                  value={changeData.assembly_part > -1 && changeData.assembly_part < 3 ? changeData.assembly_part : 0}
                                  onChange={handleProductFelids}
                                />
                              </>
                            )}
                            {changeData.assembly_required === "yes" && (
                              <>

                                <TextField sx={{ mt: 1, mb: 2 }}
                                  size="small"
                                  fullWidth
                                  // required
                                  id="outlined-select"
                                  select
                                  name="legs"
                                  label="Table Legs"
                                  value={changeData.legs || ""}
                                  onChange={handleProductFelids}
                                  multiple
                                  helperText="Please select your leg "
                                >
                                  {legCatalog.map((option) => (
                                    <MenuItem
                                      key={option.value}
                                      value={option.value}
                                    >
                                      {option.label}
                                    </MenuItem>
                                  ))}
                                  <MenuItem key={"none"} value="None">
                                    {"None"}
                                  </MenuItem>
                                </TextField>

                                <TextField sx={{ mb: 2 }}
                                  size="small"
                                  fullWidth
                                  // required
                                  id="outlined-select"
                                  select
                                  name="assembly_level"
                                  label="Assembly Level"
                                  value={changeData.assembly_level || ""}
                                  onChange={handleProductFelids}
                                  multiple
                                  helperText="Please select your assembly level "
                                >
                                  {assemblyLevelCatalog.map((option) => (
                                    <MenuItem
                                      key={option.value}
                                      value={option.value}
                                    >
                                      {option.label}
                                    </MenuItem>
                                  ))}
                                  <MenuItem key={"none"} value="None">
                                    {"None"}
                                  </MenuItem>
                                </TextField>
                              </>
                            )}



                            <FormLabel id="demo-radio-buttons-group-label">
                              Availability
                            </FormLabel>

                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={changeData.mobile_store}
                                  onChange={handleProductFelids}
                                  name="mobile_store"
                                  helperText="Check it if want it on mobile."
                                />
                              }
                              label="Mobile Store"
                            />
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={changeData.online_store}
                                  onChange={handleProductFelids}
                                  name="mobile_store"
                                  helperText="Check it if want it on online store."
                                />
                              }
                              label="Online Store"
                            />
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={changeData.continue_selling}
                                  onChange={handleProductFelids}
                                  name="continue_selling"
                                  helperText="Check it if want it to sell when out of Inventory."
                                />
                              }
                              label="Continue Selling"
                            />


                            {/*                            
                             <TextField sx = {{mb : 2}}
                              size="small"
                              fullWidth
                              // autoComplete={false}
                              id="fullWidth"
                              // required
                              label="MRP"
                              type="number"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    ₹
                                  </InputAdornment>
                                ),
                              }}
                              variant="outlined"
                              name="MRP"
                              onChange={handleProductFelids}
                              value={changeData.MRP}
                            /> */}





                          </Box >
                          <Box className="stepAction">
                            <Button
                              variant="outlined"
                              size="small"
                              disabled={activeStep === 0}
                              onClick={handleBackStep}
                            >
                              Back
                            </Button>
                            <Button
                              variant="contained"
                              size="small"
                              disabled={activeStep === 6}
                              onClick={handleNextStep}
                            >
                              Continue
                            </Button>
                          </Box>
                        </StepContent>
                      </Step>
                      {/* // Specification Ends*/}

                      {/* Images */}
                      <Step>
                        <StepLabel>Images</StepLabel>
                        <StepContent className="stepContent">
                          <Box className="fields">
                            {" "}
                            <Box className="stepAction">
                              <Button
                                variant="outlined"
                                size="small"
                                disabled={activeStep === 0}
                                onClick={handleBackStep}
                              >
                                Back
                              </Button>
                              <Button
                                variant="contained"
                                size="small"
                                disabled={activeStep === 6}
                                onClick={handleNextStep}
                              >
                                Continue
                              </Button>
                            </Box > <br />
                            {/* <AcceptMaxFiles className="dorpContainer"/> */}
                            <FormLabel id="demo-radio-buttons-group-label">
                              Product Images
                            </FormLabel>

                            <ProductsPreviews
                              text={"Please Drag and Drop the product images"}
                            ></ProductsPreviews>

                            {files.length > 0 && <Grid sx={{ p: 2 }} spacing={2} container>
                              {
                                files.map((img, index) => {
                                  return <>
                                    <Grid item xs={2} sx={{ position: 'relative' }} >
                                      <CancelIcon onClick={() => {
                                        // this function is for removing the image from savedImage array 
                                        let temp = files;
                                        console.log(">>>>>>", temp, files);
                                        temp.splice(index, 1);
                                        setFiles([...temp])
                                      }} className='imageCross' color='primary' />
                                      <img style={{ width: '100%' }} src={URL.createObjectURL(img)} alt={img.name} />
                                    </Grid>
                                  </>
                                })
                              }
                            </Grid>
                            }


                            {changeData.savedImages.length > 0 && <Grid sx={{ p: 2 }} spacing={2} container>
                              <FormLabel id="demo-radio-buttons-group-label">
                                Saved Images
                              </FormLabel>
                              {
                                changeData.savedImages.map((img, index) => {
                                  return <>
                                    <Grid item xs={2} sx={{ position: 'relative' }} >
                                      <CancelIcon onClick={() => {
                                        // this function is for removing the image from savedImage array 
                                        let temp = changeData.savedImages;
                                        temp.splice(index, 1);
                                        setData({ ...changeData, savedImages: temp })
                                      }} className='imageCross' color='primary' />
                                      <img style={{ width: '100%' }} src={img} alt='productImage' />
                                    </Grid>
                                  </>
                                })
                              }
                            </Grid>
                            }


                            {/* // featured images */}
                            <TextField sx={{ mb: 2 }}
                              size="small"
                              fullWidth
                              // required
                              id="outlined-select"
                              select
                              name="featured_image"
                              label="Feature Image"
                              value={changeData.featured_image}
                              multiple
                              onChange={handleProductFelids}
                              helperText="Please select your Featured Image"
                            >
                              {files.map(
                                (option) =>
                                  option.validate && (
                                    <MenuItem
                                      key={option}
                                      value={option}
                                    >
                                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <img style={{ width: '60px' }} src={URL.createObjectURL(option)} alt={"product"} />
                                        <h6>{option.name}</h6>
                                      </Box>
                                    </MenuItem>
                                  )
                              )}
                              {/* {console.log(changeData.savedImages)} */}
                              {changeData.savedImages.map(
                                (option) =>
                                  <MenuItem
                                    key={option}
                                    value={option}
                                  >
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                      <img style={{ width: '60px' }} src={option} alt={"product"} />
                                      {/* <h6>{option.name}</h6> */}
                                    </Box>
                                  </MenuItem>
                              )}
                              <MenuItem key={"none"} value="None">
                                {"None"}
                              </MenuItem>
                            </TextField>

                            {/* // specification images */}
                            <TextField sx={{ mb: 2 }}
                              size="small"
                              fullWidth
                              // required
                              id="outlined-select"
                              select
                              name="specification_image"
                              label="Specification Image"
                              value={changeData.specificaiton_image}
                              multiple
                              onChange={handleProductFelids}
                              helperText="Please select your specification image."
                            >
                              {files.map(
                                (option) =>
                                  option.validate && (
                                    <MenuItem
                                      key={option}
                                      value={option}
                                    >
                                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <img style={{ width: '60px' }} src={URL.createObjectURL(option)} alt={"product"} />
                                        <h6>{option.name}</h6>
                                      </Box>
                                    </MenuItem>
                                  )
                              )}

{changeData.savedImages.map(
                                (option) =>
                                  <MenuItem
                                    key={option}
                                    value={option}
                                  >
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                      <img style={{ width: '60px' }} src={option} alt={"product"} />
                                      {/* <h6>{option.name}</h6> */}
                                    </Box>
                                  </MenuItem>
                              )}
                              <MenuItem key={"none"} value="None">
                                {"None"}
                              </MenuItem>
                            </TextField>
                            {/* // Mannequin images */}
                            <TextField sx={{ mb: 2 }}
                              size="small"
                              fullWidth
                              // required
                              id="outlined-select"
                              select
                              name="mannequin_image"
                              label="Mannequin Image"
                              value={changeData.mannequin_image}
                              multiple
                              onChange={handleProductFelids}
                              helperText="Please select your Mannequin Image."
                            >
                              {files.map(
                                (option) =>
                                  option.validate && (
                                    <MenuItem
                                      key={option}
                                      value={option}
                                    >
                                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <img style={{ width: '60px' }} src={URL.createObjectURL(option)} alt={"product"} />
                                        <h6>{option.name}</h6>
                                      </Box>
                                    </MenuItem>
                                  )
                              )}
                              {changeData.savedImages.map(
                                (option) =>
                                  <MenuItem
                                    key={option}
                                    value={option}
                                  >
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                      <img style={{ width: '60px' }} src={option} alt={"product"} />
                                      {/* <h6>{option.name}</h6> */}
                                    </Box>
                                  </MenuItem>
                              )}
                              <MenuItem key={"none"} value="None">
                                {"None"}
                              </MenuItem>
                            </TextField>



                            {/* <FormLabel id="demo-radio-buttons-group-label">
                            Featured Images
                          </FormLabel>
                          <FeaturesPreviews
                            text={"Please Drag and Drop featured images"}
                          ></FeaturesPreviews>
                          <FormLabel id="demo-radio-buttons-group-label">
                            Specification Images
                          </FormLabel>
                          <ImagePreviews
                            text={"Please Drag and Drop specification images"}
                          ></ImagePreviews>
                          <FormLabel id="demo-radio-buttons-group-label">
                            Mannequin Images
                          </FormLabel>
                          <MannequinPreviews
                            text={"Please Drag and Drop mannequin images"}
                          ></MannequinPreviews> */}
                          </Box >
                          <Box className="stepAction">
                            <Button
                              variant="outlined"
                              size="small"
                              disabled={activeStep === 0}
                              onClick={handleBackStep}
                            >
                              Back
                            </Button>
                            <Button
                              variant="contained"
                              size="small"
                              disabled={activeStep === 6}
                              onClick={handleNextStep}
                            >
                              Continue
                            </Button>
                          </Box>
                        </StepContent>
                      </Step>
                      {/* Images End */}


                      {/* Features */}
                      <Step>
                        <StepLabel>Features</StepLabel>
                        <StepContent className="stepContent">
                          <Box className="fields">
                            {" "}
                            <Box className="stepAction">
                              <Button
                                variant="outlined"
                                size="small"
                                disabled={activeStep === 0}
                                onClick={handleBackStep}
                              >
                                Back
                              </Button>
                              <Button
                                variant="contained"
                                size="small"
                                disabled={activeStep === 6}
                                onClick={handleNextStep}
                              >
                                Continue
                              </Button>
                            </Box > <br />

                            <FormGroup>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={changeData.rotating_seats}
                                    onChange={handleProductFelids}
                                    name="rotating_seats"
                                  />
                                }
                                label="Rotating Seats"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={changeData.eatable_oil_polish}
                                    onChange={handleProductFelids}
                                    name="eatable_oil_polish"
                                  />
                                }
                                label="Eatable Oil Polished"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={changeData.no_chemical}
                                    onChange={handleProductFelids}
                                    name="no_chemical"
                                  />
                                }
                                label="No Chemical Used"
                              />

                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={changeData.weaving}
                                    onChange={handleProductFelids}
                                    name="weaving"
                                  />
                                }
                                label="Weaving"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={
                                      changeData.not_suitable_for_Micro_Dish
                                    }
                                    onChange={handleProductFelids}
                                    name="not_suitable_for_Micro_Dish"
                                  />
                                }
                                label="Not Suitable For Microwave/Dishwasher"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={changeData.tilt_top}
                                    onChange={handleProductFelids}
                                    name="tilt_top"
                                  />
                                }
                                label="Tilt Top"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={changeData.inside_compartments}
                                    onChange={handleProductFelids}
                                    name="inside_compartments"
                                  />
                                }
                                label="Inside Compartments"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={changeData.stackable}
                                    onChange={handleProductFelids}
                                    name="stackable"
                                  />
                                }
                                label="Stackable"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={changeData.knife}
                                    onChange={handleProductFelids}
                                    name="knife"
                                  />
                                }
                                label="Knife Friendly Surface"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={changeData.wall_hanging}
                                    onChange={handleProductFelids}
                                    name="wall_hanging"
                                  />
                                }
                                label="Wall Hanging"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={changeData.ceramic_drawers}
                                    onChange={handleProductFelids}
                                    name="ceramic_drawers"
                                  />
                                }
                                label="Ceramic Drawers"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={changeData.ceramic_tiles}
                                    onChange={handleProductFelids}
                                    name="ceramic_tiles"
                                  />
                                }
                                label="Ceramic Tiles"
                              />
                            </FormGroup>
                          </Box >
                          <Box className="stepAction">
                            <Button
                              variant="outlined"
                              size="small"
                              disabled={activeStep === 0}
                              onClick={handleBackStep}
                            >
                              Back
                            </Button>
                            <Button
                              variant="contained"
                              size="small"
                              disabled={activeStep === 6}
                              onClick={handleNextStep}
                            >
                              Continue
                            </Button>
                          </Box>
                        </StepContent>
                      </Step>
                      {/* Features ends */}
                      {/* Miscellaneous */}
                      <Step>
                        <StepLabel>Miscellaneous</StepLabel>
                        <StepContent className="stepContent">
                          <Box className="fields">
                            {" "}
                            <Box className="stepAction">
                              <Button
                                variant="outlined"
                                size="small"
                                disabled={activeStep === 0}
                                onClick={handleBackStep}
                              >
                                Back
                              </Button>
                              <Button
                                variant="contained"
                                size="small"
                                disabled={activeStep === 6}
                                onClick={handleNextStep}
                              >
                                Continue
                              </Button>
                            </Box> <br />



                            <TextField sx={{ mb: 2 }}
                              size="small"
                              fullWidth
                              id="outlined-select"
                              select
                              name="back_style"
                              label="Back Style"
                              multiple
                              value={changeData.back_style || ""}
                              onChange={handleProductFelids}
                              helperText="Please select your Back Style."
                            >
                              {backStyleCatalog.map((option) => (
                                <MenuItem
                                  key={option.value}
                                  value={option.value}
                                >
                                  {option.label}
                                </MenuItem>
                              ))}
                              <MenuItem key={"none"} value="None">
                                {"None"}
                              </MenuItem>
                            </TextField>

                            <TextField sx={{ mb: 2 }}
                              size="small"
                              fullWidth
                              id="outlined-select"
                              select
                              name="weight_capacity"
                              label="Weight Capacity"
                              multiple
                              value={changeData.weight_capacity}
                              onChange={handleProductFelids}
                              helperText="Please select your Weight Capacity."
                            >
                              {weightCapCatalog.map((option) => (
                                <MenuItem
                                  key={option.value}
                                  value={option.value}
                                >
                                  {option.label}
                                </MenuItem>
                              ))}
                              <MenuItem key={"none"} value="None">
                                {"None"}
                              </MenuItem>
                            </TextField>


                            <FormControl>
                              <FormLabel id="demo-radio-buttons-group-label">
                                Drawer
                              </FormLabel>
                              <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                value={changeData.drawer || "no"}
                                onChange={handleProductFelids}
                                name="drawer"
                              >
                                <FormControlLabel
                                  value="mechanical"
                                  control={<Radio />}
                                  label="Mechanical"
                                />
                                <FormControlLabel
                                  value="wooden"
                                  control={<Radio />}
                                  label="Wooden"
                                />
                                <FormControlLabel
                                  value="none"
                                  control={<Radio />}
                                  label="None"
                                />
                              </RadioGroup>
                            </FormControl>

                            {(changeData.drawer === "mechanical" ||
                              changeData.drawer === "wooden") && (
                                <TextField sx={{ mb: 2 }}
                                  size="small"
                                  fullWidth
                                  type="number"
                                  id="outlined-select"
                                  name="drawer_count"
                                  label="Drawer Count"
                                  value={changeData.drawer_count}
                                  onChange={handleProductFelids}
                                />
                              )}





                            <FormControl>
                              <FormLabel id="demo-radio-buttons-group-label">
                                Joints ((Useful in products where info about
                                joints are shown))
                              </FormLabel>
                              <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                name="joints"
                                value={changeData.joints}
                                onChange={handleProductFelids}
                              >
                                <FormControlLabel
                                  value="single"
                                  control={<Radio />}
                                  label="Single"
                                />
                                <FormControlLabel
                                  value="multi"
                                  control={<Radio />}
                                  label="Multiple"
                                />
                              </RadioGroup>
                            </FormControl>

                          </Box >
                          <Box className="stepAction">
                            <Button
                              variant="outlined"
                              size="small"
                              disabled={activeStep === 0}
                              onClick={handleBackStep}
                            >
                              Back
                            </Button>
                            <Button
                              variant="contained"
                              size="small"
                              disabled={activeStep === 6}
                              onClick={handleNextStep}
                            >
                              Continue
                            </Button>
                          </Box>
                        </StepContent>
                      </Step>
                      {/* Miscellaneous ends */}


                      {/* Inventory & Shipping */}
                      <Step>
                        <StepLabel>Inventory & Shipping</StepLabel>
                        <StepContent className="stepContent">
                          <Box className="fields">
                            {" "}
                            <Box className="stepAction">
                              <Button
                                variant="outlined"
                                size="small"
                                disabled={activeStep === 0}
                                onClick={handleBackStep}
                              >
                                Back
                              </Button>
                              <Button
                                variant="contained"
                                size="small"
                                disabled={activeStep === 6}
                                onClick={handleNextStep}
                              >
                                Continue
                              </Button>
                            </Box > <br />

                            <FormGroup>
                              <FormLabel id="demo-radio-buttons-group-label">
                                Return & Payment Policy
                              </FormLabel>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={changeData.COD}
                                    onChange={handleProductFelids}
                                    name="COD"
                                  />
                                }
                                label="COD Available"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={changeData.returnable}
                                    onChange={handleProductFelids}
                                    name="returnable"
                                  />
                                }
                                label="Return Item"
                              />
                            </FormGroup>
                            {changeData.returnable && (
                              <>
                                <Typography component={'span'} variant="Caption">
                                  {" "}
                                  Return in {changeData.returnDays} Days
                                </Typography>
                                <Slider
                                  aria-label="Return Days"
                                  defaultValue={0}
                                  size="small"
                                  name="returnDays"
                                  value={changeData.returnDays}
                                  onChange={handleProductFelids}
                                  helperText="Please select your return days"
                                  valueLabelDisplay="auto"
                                />
                              </>
                            )}

                            <Typography component={'span'} variant="Caption">
                              {" "}
                              Polish in {changeData.polish_time} Days
                            </Typography>
                            <Slider
                              aria-label="Construction Days"
                              defaultValue={0}
                              size="small"
                              valueLabelDisplay="auto"
                              name="polish_time"
                              value={changeData.polish_time}
                              onChange={handleProductFelids}
                              helperText="Please select your polish time"
                            />

                            <Typography component={'span'} variant="Caption">
                              {" "}
                              Manufactured in {
                                changeData.manufacturing_time
                              }{" "}
                              Days
                            </Typography>
                            <Slider
                              aria-label="Construction Days"
                              defaultValue={0}
                              size="small"
                              valueLabelDisplay="auto"
                              name="manufacturing_time"
                              value={changeData.manufacturing_time}
                              onChange={handleProductFelids}
                              helperText="Please select your manufacturing time"
                            />

                            <InputLabel id="demo-multiple-checkbox-label">Stock Warehouse</InputLabel>
                            <Select sx={{ mb: 2 }}
                              multiple
                              fullWidth
                              value={changeData.warehouse}
                              name="warehouse"
                              onChange={handleProductFelids}
                              renderValue={(selected) => selected.join(', ')}
                            >
                              {warehouse.map((option) => (
                                <MenuItem key={option.label} value={option.value}>
                                  <Checkbox checked={changeData.warehouse.indexOf(option.value) > -1} />
                                  <ListItemText primary={option.value} />
                                </MenuItem>
                              ))}
                            </Select>

                            {

                              changeData.warehouse.map((row) => {
                                let stock; row === 'Jodhpur (Rajasthan)' ? stock = 'jodhpur_stock' : stock = 'bangalore_stock';
                                return <>

                                  <TextField sx={{ mb: 2 }}
                                    size="small"
                                    fullWidth
                                    name={stock}
                                    label={row + ' Stock'}
                                    type='number'
                                    value={changeData[stock] || ""}
                                    onChange={handleProductFelids}
                                  />
                                </>
                              })
                            }

                            <TextField sx={{ mb: 2 }}
                              size="small"
                              fullWidth
                              // autoComplete={false}
                              id="fullWidth"
                              label="Package Length"
                              type="number"
                              value={changeData.package_length}
                              onChange={handleProductFelids}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    Inch
                                  </InputAdornment>
                                ),
                              }}
                              variant="outlined"
                              name="package_length"
                              helperText="From left to right"
                            />

                            <TextField sx={{ mb: 2 }}
                              size="small"
                              fullWidth
                              // autoComplete={false}
                              id="fullWidth"
                              label="Package Breadth"
                              type="number"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    Inch
                                  </InputAdornment>
                                ),
                              }}
                              variant="outlined"
                              name="package_breadth"
                              value={changeData.package_breadth}
                              onChange={handleProductFelids}
                              helperText="From front to back"
                            />

                            <TextField sx={{ mb: 2 }}
                              size="small"
                              fullWidth
                              // autoComplete={false}
                              id="fullWidth"
                              label="Package Height"
                              type="number"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    Inch
                                  </InputAdornment>
                                ),
                              }}
                              variant="outlined"
                              name="package_height"
                              value={changeData.package_height}
                              onChange={handleProductFelids}
                              helperText="From bottom to top"
                            />

                            <FormLabel id="demo-radio-buttons-group-label">
                              Selling Points{" "}
                            </FormLabel>

                            <Grid container sx={{ mt: 1 }}>
                              <Grid item xs={12} sx={{ mb: 2 }} >
                                <Grid container sx={{ display: 'flex', alignItem: 'center', justifyContent: 'space-between' }} >
                                  <Grid item xs={11}><TextField fullWidth value={changeData.item || ''} size={'small'} type='text' name='item'
                                    onChange={handleProductFelids}
                                    label='Write a point...' /></Grid>
                                  <Grid item xs={0.8}>
                                    {changeData.select === undefined ? <Button
                                      fullWidth
                                      onClick={() => {
                                        changeData.item !== '' && setData({
                                          ...changeData,
                                          selling_points: [...changeData.selling_points, changeData.item],
                                          item: ''
                                        });
                                      }}
                                      variant='outlined'>Add</Button> : <Button onClick={() => {
                                        setData({
                                          ...changeData,
                                          selling_points: changeData.selling_points.filter((row, i) => {
                                            return i !== changeData.select;
                                          }),
                                          select: undefined

                                        })


                                      }}
                                        variant='outlined'>Remove</Button>}
                                  </Grid>
                                </Grid>
                              </Grid>
                              {changeData.selling_points.length > 0 && <Grid sx={{
                                maxHeight: '100px', overflowY: 'scroll', mb: 2,
                                border: '2px solid #91441f',
                                padding: '7px'
                              }} item xs={12}>
                                <ul style={{ listStyleType: 'square' }}>
                                  {
                                    changeData.selling_points && changeData.selling_points.map((item, index) => {
                                      return <li><Typography sx={{ cursor: 'pointer' }}
                                        onClick={() => {
                                          setData({
                                            ...changeData,
                                            select: index,
                                            item: item
                                          })
                                        }}
                                        variant='body'>{index + 1 + ". "}{item}</Typography>
                                      </li>
                                    })
                                  }
                                </ul>
                              </Grid>}
                            </Grid>


                            <Box sx={{ display: 'flex', mb: 2 }}>

                              <TextField
                                size="small"
                                sx={{ width: '85%' }}
                                id="fullWidth"
                                label="Quantity"
                                type="Number"
                                variant="outlined"
                                name="quantity"
                                value={changeData.quantity}
                                onChange={handleProductFelids}
                              />


                              <TextField
                                id="outlined-select-currency"
                                select
                                sx={{ ml: 1 }}
                                size='small'
                                label="Unit"
                                name='unit'
                                value={changeData.unit || ''}
                                onChange={handleProductFelids}
                              >
                                {unitCatalog.map((option) => (
                                  <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                  </MenuItem>
                                ))}
                              </TextField>
                            </Box>
                          </Box >
                          <Box className="stepAction">
                            <Button
                              variant="outlined"
                              size="small"
                              disabled={activeStep === 0}
                              onClick={handleBackStep}
                            >
                              Back
                            </Button>
                            <Button
                              variant="contained"
                              size="small"
                              disabled={activeStep === 6}
                              onClick={handleNextStep}
                            >
                              Continue
                            </Button>
                          </Box>
                        </StepContent>
                      </Step>
                      {/* Inventory & Shipping End */}

                      {/* SEO */}
                      <Step>
                        <StepLabel>SEO</StepLabel>
                        <StepContent className="stepContent">
                          <Box className="fields">
                            {" "}
                            <Box className="stepAction">
                              <Button
                                variant="outlined"
                                size="small"
                                disabled={activeStep === 0}
                                onClick={handleBackStep}
                              >
                                Back
                              </Button>
                              <Button
                                variant="contained"
                                size="small"
                                disabled={activeStep === 6}
                                onClick={handleNextStep}
                              >
                                Continue
                              </Button>
                            </Box > <br />

                            <TextField sx={{ mb: 2 }}
                              size="small"
                              fullWidth
                              // required
                              // autoComplete={false}
                              id="fullWidth"
                              label="SEO Title"
                              type="text"
                              variant="outlined"
                              name="seo_title"
                              value={changeData.seo_title}
                              onChange={handleProductFelids}
                            />

                            <TextField sx={{ mb: 2 }}
                              size="small"
                              fullWidth
                              // required
                              // autoComplete={false}
                              id="fullWidth"
                              label="SEO Description"
                              type="text"
                              variant="outlined"
                              name="seo_description"
                              value={changeData.seo_description}
                              onChange={handleProductFelids}
                            />

                            <TextField sx={{ mb: 2 }}
                              size="small"
                              fullWidth
                              // required
                              // autoComplete={false}
                              id="fullWidth"
                              label="SEO Keyword"
                              type="text"
                              variant="outlined"
                              name="seo_keyword"
                              value={changeData.seo_keyword}
                              onChange={handleProductFelids}
                            />

                            {/* product description  */}
                            <FormLabel id="demo-radio-buttons-group-label">
                              Product Description
                            </FormLabel>

                            <TextareaAutosize
                              fullWidth
                              minRows={5}
                              id="outlined-select"
                              name="product_description"
                              onChange={handleProductFelids}
                              defaultValue={changeData.product_description}
                              type="text"
                              helperText="Please enter your product description"
                            />
                            {/* <Editor
                              apiKey="nrxcqobhboeugucjonpg61xo1m65hn8qjxwayuhvqfjzb6j4"
                              onInit={(event, editor) =>
                                (editorRef.current = editor)
                              }
                              init={{
                                height: 300,
                                menubar: true,
                              }}
                            /> */}
                            <br />
                            {/* selling points  */}

                            {/* <FormLabel id="demo-radio-buttons-group-label">
                              Selling Points{" "}
                            </FormLabel>

                            <TextareaAutosize
                              fullWidth
                              minRows={5}
                              id="outlined-select"
                              name="selling_points"
                              defaultValue={"Selling Points" || changeData.selling_points}
                              type="text"
                              helperText="Please enter your selling points."
                            /> */}

                            {/* <Editor
                              apiKey="nrxcqobhboeugucjonpg61xo1m65hn8qjxwayuhvqfjzb6j4"
                              onInit={(event, editor) =>
                                (sellingRef.current = editor)
                              }
                              init={{
                                height: 400,
                                menubar: true,
                              }}
                            /> */}
                          </Box > <br />
                          <Box className="stepAction">
                            <Button
                              variant="outlined"
                              size="small"
                              disabled={activeStep === 0}
                              onClick={handleBackStep}
                            >
                              Back
                            </Button>
                            <Button
                              variant="contained"
                              size="small"
                              disabled={activeStep === 6}
                              onClick={handleNextStep}
                            >
                              Continue
                            </Button>
                          </Box>
                        </StepContent>
                      </Step>
                      {/* SEO End */}


                      {/* Extra-details */}
                      <Step>
                        <StepLabel>Extra-Details</StepLabel>
                        <StepContent className="stepContent">
                          <Box className="fields">
                            {" "}
                            <Box className="stepAction">
                              <Button
                                variant="outlined"
                                size="small"
                                disabled={activeStep === 0}
                                onClick={handleBackStep}
                              >
                                Back
                              </Button>
                              <Button
                                variant="contained"
                                size="small"
                                disabled={activeStep === 6}
                                onClick={handleNextStep}
                              >
                                Continue
                              </Button>
                            </Box >

                          </Box > <br />


                          <TextField sx={{ mb: 2 }}
                            size="small"
                            fullWidth
                            // required
                            id="outlined-select"
                            select
                            name="tax_rate"
                            label="Tax Rate"
                            value={changeData.tax_rate || ''}
                            onChange={handleProductFelids}
                            multiple
                            helperText="Please select your tax rate."
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  %
                                </InputAdornment>
                              ),
                            }}
                          >
                            {taxRateCatalog.map((option) => (
                              <MenuItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </MenuItem>
                            ))}
                            <MenuItem key={"none"} value="None">
                              {"None"}
                            </MenuItem>
                          </TextField>


                          <FormControl>
                            <FormLabel id="demo-radio-buttons-group-label">
                              Silver
                            </FormLabel>
                            <RadioGroup
                              sx={{ mb: 2 }}
                              aria-labelledby="demo-radio-buttons-group-label"
                              value={changeData.silver || "no"}
                              onChange={handleProductFelids}
                              name="silver"
                            >
                              <FormControlLabel
                                value="yes"
                                control={<Radio />}
                                label="Yes"
                              />
                              <FormControlLabel
                                value="no"
                                control={<Radio />}
                                label="No"
                              />
                            </RadioGroup>
                          </FormControl>
                          {changeData.silver === "yes" && (
                            <TextField sx={{ mb: 2 }}
                              size="small"
                              fullWidth
                              // autoComplete={false}
                              id="fullWidth"
                              label="Sliver Weight"
                              type="text"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    Gram
                                  </InputAdornment>
                                ),
                              }}
                              variant="outlined"
                              name="silver_weight"
                              value={changeData.silver_weight}
                              onChange={handleProductFelids}
                            />
                          )}


                          <TextField sx={{ mb: 2 }}
                            size="small"
                            fullWidth
                            id="outlined-select"
                            select
                            name="hinge"
                            label="Hinge"
                            multiple
                            value={changeData.hinge || ''}
                            onChange={handleProductFelids}
                            helperText="Please select your hinge."
                          >
                            {catalog.hinge.map(
                              (option) => option.status && <MenuItem
                                    key={option.SKU}
                                    value={option.SKU}
                                  >
                                    {option.title}
                                  </MenuItem>
                            )}
                            <MenuItem key={"none"} value="None">
                              {"None"}
                            </MenuItem>
                          </TextField>

                          <TextField sx={{ mb: 2 }}
                            size="small"
                            fullWidth
                            id="outlined-select"
                            select
                            name="knob"
                            label="Knob"
                            multiple
                            value={changeData.knob || ''}
                            onChange={handleProductFelids}
                            helperText="Please select your knob."
                          >
                           {catalog.knob.map(
                              (option) => option.status && <MenuItem
                                    key={option.SKU}
                                    value={option.SKU}
                                  >
                                    {option.title}
                                  </MenuItem>
                            )}
                            <MenuItem key={"none"} value="None">
                              {"None"}
                            </MenuItem>
                          </TextField>

                          <TextField sx={{ mb: 2 }}
                            size="small"
                            fullWidth
                            id="outlined-select"
                            select
                            name="door"
                            label="Door"
                            multiple
                            value={changeData.door || ''}
                            onChange={handleProductFelids}
                            helperText="Please select your door."
                          >
                          {catalog.door.map(
                              (option) => option.status && <MenuItem
                                    key={option.SKU}
                                    value={option.SKU}
                                  >
                                    {option.title}
                                  </MenuItem>
                            )}
                            <MenuItem key={"none"} value="None">
                              {"None"}
                            </MenuItem>
                          </TextField>

                          <TextField sx={{ mb: 2 }}
                            size="small"
                            fullWidth
                            id="outlined-select"
                            select
                            name="handle"
                            label="Handle"
                            multiple
                            value={changeData.handle || ''}
                            onChange={handleProductFelids}
                            helperText="Please select your handle."
                          >
                           {catalog.handle.map(
                              (option) => option.status && <MenuItem
                                    key={option.SKU}
                                    value={option.SKU}
                                  >
                                    {option.title}
                                  </MenuItem>
                            )}
                            <MenuItem key={"none"} value="None">
                              {"None"}
                            </MenuItem>
                          </TextField>

                          <TextField sx={{ mb: 2 }}
                            size="small"
                            fullWidth
                            id="outlined-select"
                            select
                            label="Fitting"
                            name="fitting"
                            multiple
                            value={changeData.fitting || ''}
                            onChange={handleProductFelids}
                            helperText="Please select your fitting."
                          >
                          {catalog.fitting.map(
                              (option) => option.status && <MenuItem
                                    key={option.SKU}
                                    value={option.SKU}
                                  >
                                    {option.title}
                                  </MenuItem>
                            )}
                            <MenuItem key={"none"} value="None">
                              {"None"}
                            </MenuItem>
                          </TextField>


                          <FormControl>
                            <FormLabel id="demo-radio-buttons-group-label">
                              Mirror
                            </FormLabel>
                            <RadioGroup
                              sx={{ mb: 2 }}
                              aria-labelledby="demo-radio-buttons-group-label"
                              name="mirror"
                              value={changeData.mirror || "no"}
                              onChange={handleProductFelids}
                            >
                              <FormControlLabel
                                value="yes"
                                control={<Radio />}
                                label="Yes"
                              />
                              <FormControlLabel
                                value="no"
                                control={<Radio />}
                                label="No"
                              />
                            </RadioGroup>
                          </FormControl>

                          {changeData.mirror === "yes" && (
                            <>

                              <TextField sx={{ mb: 2 }}
                                size="small"
                                fullWidth
                                // autoComplete={false}
                                id="fullWidth"
                                label="Mirror Length"
                                type="text"
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      Inch
                                    </InputAdornment>
                                  ),
                                }}
                                variant="outlined"
                                value={changeData.mirror_length}
                                onChange={handleProductFelids}
                                name="mirror_length"
                              />


                              <TextField sx={{ mb: 2 }}
                                size="small"
                                fullWidth
                                // autoComplete={false}
                                id="fullWidth"
                                label="Mirror Width"
                                type="text"
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      Inch
                                    </InputAdornment>
                                  ),
                                }}
                                variant="outlined"
                                name="mirror_width"
                                value={changeData.mirror_width}
                                onChange={handleProductFelids}
                              />
                            </>
                          )}



                          <TextField sx={{ mb: 2 }}
                            size="small"
                            fullWidth
                            // autoComplete={false}
                            id="fullWidth"
                            label="Top Size"
                            type="number"
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  Inch
                                </InputAdornment>
                              ),
                            }}
                            variant="outlined"
                            name="top_size"
                            value={changeData.top_size}
                            onChange={handleProductFelids}
                          />



                          <TextField sx={{ mb: 2 }}
                            size="small"
                            fullWidth
                            // autoComplete={false}
                            id="fullWidth"
                            label="Dial Size (Only Applicable on Clock And Clock Containing Items )"
                            type="number"
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  Inch
                                </InputAdornment>
                              ),
                            }}
                            variant="outlined"
                            value={changeData.dial_size}
                            onChange={handleProductFelids}
                            name="dial_size"
                          />


                          <FormControl>
                            <FormLabel id="demo-radio-buttons-group-label">
                              Wheel
                            </FormLabel>
                            <RadioGroup
                              sx={{ mb: 2 }}
                              aria-labelledby="demo-radio-buttons-group-label"
                              name="wheel"
                              value={changeData.wheel || "no"}
                              onChange={handleProductFelids}
                            >
                              <FormControlLabel
                                value="yes"
                                control={<Radio />}
                                label="Yes"
                              />
                              <FormControlLabel
                                value="no"
                                control={<Radio />}
                                label="No"
                              />
                            </RadioGroup>
                          </FormControl>
                          <br />

                          <FormControl>
                            <FormLabel id="demo-radio-buttons-group-label">
                              Trolley
                            </FormLabel>
                            <RadioGroup
                              sx={{ mb: 2 }}

                              aria-labelledby="demo-radio-buttons-group-label"
                              name="trolley"
                              value={changeData.trolley || "no"}
                              onChange={handleProductFelids}
                            >
                              <FormControlLabel
                                value="yes"
                                control={<Radio />}
                                label="Yes"
                              />
                              <FormControlLabel
                                value="no"
                                control={<Radio />}
                                label="No"
                              />
                            </RadioGroup>
                          </FormControl>
                          {changeData.trolley === "yes" && (
                            <>

                              <TextField sx={{ mb: 2 }}
                                size="small"
                                fullWidth
                                id="outlined-select"
                                select
                                name="trolley_material"
                                label="Trolly Material"
                                multiple
                                value={changeData.trolley_material}
                                onChange={handleProductFelids}
                                helperText="Please select your Trolly Material "
                              >
                                {trollyMaterial.map((option) => (
                                  <MenuItem
                                    key={option.value}
                                    value={option.value}
                                  >
                                    {option.label}
                                  </MenuItem>
                                ))}
                              </TextField>
                            </>
                          )}



                          <TextField sx={{ mb: 2 }}
                            size="small"
                            fullWidth
                            // autoComplete={false}
                            id="fullWidth"
                            label="Seating Size Width"
                            type="number"
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  Inch
                                </InputAdornment>
                              ),
                            }}
                            variant="outlined"
                            name="seating_size_width"
                            value={changeData.seating_size_width}
                            onChange={handleProductFelids}
                          />


                          <TextField sx={{ mb: 2 }}
                            size="small"
                            fullWidth
                            // autoComplete={false}
                            id="fullWidth"
                            label="Seating Size Width Depth"
                            type="number"
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  Inch
                                </InputAdornment>
                              ),
                            }}
                            variant="outlined"
                            name="seating_size_depth"
                            value={changeData.seating_size_depth}
                            onChange={handleProductFelids}
                          />


                          <TextField sx={{ mb: 2 }}
                            size="small"
                            fullWidth
                            // autoComplete={false}
                            id="fullWidth"
                            label="Seating Size Height"
                            type="number"
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  Inch
                                </InputAdornment>
                              ),
                            }}
                            variant="outlined"
                            name="seating_size_height"
                            value={changeData.seating_size_height}
                            onChange={handleProductFelids}
                          />

                          <FormControl>
                            <FormLabel id="demo-radio-buttons-group-label">
                              Textile
                            </FormLabel>
                            <RadioGroup
                              sx={{ mb: 2 }}

                              aria-labelledby="demo-radio-buttons-group-label"
                              value={changeData.textile || "no"}
                              onChange={handleProductFelids}
                              name="textile"
                            >
                              <FormControlLabel
                                value="yes"
                                control={<Radio />}
                                label="Yes"
                              />
                              <FormControlLabel
                                value="no"
                                control={<Radio />}
                                label="No"
                              />
                            </RadioGroup>
                          </FormControl>


                          {changeData.textile === "yes" && (
                            <TextField sx={{ mb: 2 }}
                              size="small"
                              fullWidth
                              id="outlined-select"
                              select
                              name="textile_type"
                              label="Textile"
                              value={changeData.textile_type}
                              onChange={handleProductFelids}
                              multiple
                              helperText="Please select your textile."
                            >
                             {catalog.textile.map(
                              (option) => option.status && <MenuItem
                                    key={option.SKU}
                                    value={option.SKU}
                                  >
                                    {option.title}
                                  </MenuItem>
                            )}
                              <MenuItem key={"none"} value="None">
                                {"None"}
                              </MenuItem>
                            </TextField>
                          )}

                          <br />


                          <FormControl>
                            <FormLabel id="demo-radio-buttons-group-label">
                              Upholstery
                            </FormLabel>
                            <RadioGroup
                              defaultValue="no"
                              aria-labelledby="demo-radio-buttons-group-label"
                              // onChange={(e) => {
                              //   setShowFabric(e.target.value);
                              // }}
                              sx={{ mb: 2 }}

                              value={changeData.upholstery || "no"}
                              onChange={handleProductFelids}
                              name="upholstery"
                            >
                              <FormControlLabel
                                value="yes"
                                control={<Radio />}
                                label="Yes"
                              />
                              <FormControlLabel
                                value="no"
                                control={<Radio />}
                                label="No"
                              />
                            </RadioGroup>
                          </FormControl>
                          {changeData.upholstery === "yes" && (
                            <>

                              <TextField sx={{ mb: 2 }}
                                size="small"
                                fullWidth
                                id="outlined-select"
                                select
                                name="fabric"
                                label="Fabric"
                                multiple
                                value={changeData.fabric}
                                onChange={handleProductFelids}
                                helperText="Please select your fabric."
                              >
                               {catalog.fabric.map(
                              (option) => option.status && <MenuItem
                                    key={option.SKU}
                                    value={option.SKU}
                                  >
                                    {option.title}
                                  </MenuItem>
                            )}
                                <MenuItem key={"none"} value="None">
                                  {"None"}
                                </MenuItem>
                              </TextField>{" "}
                            </>
                          )}



                          <Box className="stepAction">
                            <Button
                              variant="outlined"
                              size="small"
                              disabled={activeStep === 0}
                              onClick={handleBackStep}
                            >
                              Back
                            </Button>
                            <Button
                              variant="contained"
                              size="small"
                              disabled={activeStep === 6}
                              onClick={handleNextStep}
                            >
                              Continue
                            </Button>
                          </Box>
                        </StepContent>
                      </Step>
                      {/* Extra-details End */}


                    </Stepper>
                    <Button
                      color="primary"
                      type="submit"
                      fullWidth
                      variant="contained"
                    >
                      Update Product
                    </Button>
                  </form>
                </Grid>
              </Grid>
            )}

            {/* update Products Ends */}
            {/* Variation Products */}

            {state.OpenBox.formType === "variation" && (
              <Grid container p={5} className="productPadding">
                <Grid item xs={12}>
                  <Typography component={'span'} variant="h5">
                    Create Variation
                    <Typography component={'span'}
                      sx={{ display: "block !important" }}
                      variant="caption"
                    >
                      Add variation of product and necessary information from here
                    </Typography>
                  </Typography>
                </Grid>

                <Grid item xs={12} mt={5}>
                  <form
                    className="form"
                    id="myForm"
                    onSubmit={(e) => { confirmBox(e, handleVariation) }}
                    enctype="multipart/form-data"
                    method="post"
                  >
                    <Stepper
                      className="stepper"
                      activeStep={activeStep}
                      orientation="vertical"
                    >
                      {/* // Specification */}
                      <Step>
                        <StepLabel>Specifications</StepLabel>
                        <StepContent className="stepContent">
                          <Box className="fields">
                            {" "}
                            <Box className="stepAction">
                              <Button
                                variant="outlined"
                                size="small"
                                disabled={activeStep === 0}
                                onClick={handleBackStep}
                              >
                                Back
                              </Button>
                              <Button
                                variant="contained"
                                size="small"
                                disabled={activeStep === 6}
                                onClick={handleNextStep}
                              >
                                Continue
                              </Button>
                            </Box > <br />

                            <TextField sx={{ mb: 2 }}
                              size="small"
                              fullWidth
                              // autoComplete={false}
                              id="fullWidth"
                              // // required
                              label="SKU"
                              type="text"
                              value={SKU}
                              disabled
                              variant="outlined"
                              name="SKU"
                            />

                            <TextField sx={{ mb: 2 }}
                              size="small"
                              fullWidth
                              // required
                              id="outlined-select"
                              select
                              name="category_name"
                              label="Category"
                              value={changeData.category_name || ''}
                              multiple
                              onChange={handleProductFelids}
                              helperText="Please select your category"
                            >
                              {category.map(
                                (option) =>
                                  option.category_status && (
                                    <MenuItem
                                      key={option._id}
                                      value={option._id}
                                    >
                                      {option.category_name}
                                    </MenuItem>
                                  )
                              )}
                              <MenuItem key={"none"} value="None">
                                {"None"}
                              </MenuItem>
                            </TextField>

                            <TextField sx={{ mb: 2 }}
                              size="small"
                              fullWidth
                              // required
                              id="outlined-select"
                              select
                              name="sub_category_name"
                              label="Sub Category"
                              multiple
                              value={changeData.sub_category_name || ''}
                              onChange={handleProductFelids}
                              helperText="Please select your sub category"
                            >
                              {subCategory.map(
                                (option) =>
                                  changeData.category_name ===
                                  option.category_id && (
                                    <MenuItem
                                      key={option.value}
                                      value={option._id}
                                    >
                                      {option.sub_category_name}
                                    </MenuItem>
                                  )
                              )}
                              <MenuItem key={"none"} value="None">
                                {"None"}
                              </MenuItem>
                            </TextField>

                            <TextField sx={{ mb: 2 }}
                              size="small"
                              fullWidth
                              // autoComplete={false}
                              id="fullWidth"
                              // required
                              label="Title"
                              type="text"
                              variant="outlined"
                              name="product_title"
                              value={changeData.product_title}
                              onChange={handleProductFelids}
                            />

                            <TextField sx={{ mb: 2 }}
                              size="small"
                              fullWidth
                              // autoComplete={false}
                              id="fullWidth"
                              // required
                              label="Showroom Price"
                              type="number"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    ₹
                                  </InputAdornment>
                                ),
                              }}
                              variant="outlined"
                              name="showroom_price"
                              value={changeData.showroom_price}
                              onChange={handleProductFelids}
                            />

                            <TextField sx={{ mb: 2 }}
                              size="small"
                              fullWidth
                              // required
                              // autoComplete={false}
                              id="fullWidth"
                              onChange={(e) => {
                                handleDiscount(e);
                                handleProductFelids(e);
                              }}
                              label="Discount Limit"
                              type="number"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    %
                                  </InputAdornment>
                                ),
                              }}
                              variant="outlined"
                              name="discount_limit"
                              value={changeData.discount_limit}
                            />

                            <TextField sx={{ mb: 2 }}
                              size="small"
                              fullWidth
                              // disabled
                              // autoComplete={false}
                              id="fullWidth"
                              label="Selling Price"
                              type="number"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    ₹
                                  </InputAdornment>
                                ),
                              }}
                              value={
                                // changeData.MRP > 0 &&
                                //   changeData.discount_limit > 0
                                //   ? (changeData.selling_price =
                                //     changeData.MRP -
                                //     (changeData.MRP / 100) *
                                //     changeData.discount_limit)
                                //   : 0
                                changeData.selling_price
                              }
                              onChange={handleProductFelids}
                              variant="outlined"
                              name="selling_price"
                            />

                            <TextField sx={{ mb: 2 }}
                              size="small"
                              fullWidth
                              // autoComplete={false}
                              id="fullWidth"
                              label="Length"
                              type="number"
                              value={changeData.length_main}
                              onChange={handleProductFelids}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    Inch
                                  </InputAdornment>
                                ),
                              }}
                              variant="outlined"
                              name="length_main"
                              helperText="From left to right"
                            />

                            <TextField sx={{ mb: 2 }}
                              size="small"
                              fullWidth
                              // autoComplete={false}
                              id="fullWidth"
                              label="Breadth"
                              type="number"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    Inch
                                  </InputAdornment>
                                ),
                              }}
                              variant="outlined"
                              name="breadth"
                              value={changeData.breadth}
                              onChange={handleProductFelids}
                              helperText="From front to back"
                            />

                            <TextField sx={{ mb: 2 }}
                              size="small"
                              fullWidth
                              // autoComplete={false}
                              id="fullWidth"
                              label="Height"
                              type="number"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    Inch
                                  </InputAdornment>
                                ),
                              }}
                              variant="outlined"
                              name="height"
                              value={changeData.height}
                              onChange={handleProductFelids}
                              helperText="From bottom to top"
                            />

                            <InputLabel id="demo-multiple-checkbox-label">
                              Material
                            </InputLabel>
                            <Select sx={{ mb: 2 }}
                              multiple
                              fullWidth
                              value={changeData.primary_material}
                              name="primary_material"
                              onChange={handleProductFelids}
                              renderValue={(selected) => selected.join(", ")}
                            // MenuProps={MenuProps}
                            >
                              {materialCatalog.map((option) => (
                                <MenuItem
                                  key={option._id}
                                  value={option.primaryMaterial_name}
                                >
                                  <Checkbox
                                    checked={
                                      changeData.primary_material.indexOf(
                                        option.primaryMaterial_name
                                      ) > -1
                                    }
                                  />
                                  <ListItemText
                                    primary={option.primaryMaterial_name}
                                  />
                                </MenuItem>
                              ))}
                            </Select>

                            <TextField sx={{ mb: 2 }}
                              size="small"
                              fullWidth
                              // autoComplete={false}
                              id="fullWidth"
                              label="Weight"
                              type="number"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    Kg
                                  </InputAdornment>
                                ),
                              }}
                              variant="outlined"
                              name="weight"
                              value={changeData.weight}
                              onChange={handleProductFelids}
                            />

                            <TextField sx={{ mb: 2 }}
                              size="small"
                              fullWidth
                              id="outlined-select"
                              select
                              name="range"
                              label="Range"
                              multiple
                              value={changeData.range || ""}
                              onChange={handleProductFelids}
                              helperText="Please select the range."
                            >
                              {rangeCatalog.map((option) => (
                                <MenuItem
                                  key={option.value}
                                  value={option.value}
                                >
                                  {option.label}
                                </MenuItem>
                              ))}
                              <MenuItem key={"none"} value="None">
                                {"None"}
                              </MenuItem>
                            </TextField>

                            <InputLabel id="demo-multiple-checkbox-label">
                              Polish
                            </InputLabel>
                            <Select sx={{ mb: 2 }}
                              multiple
                              fullWidth
                              value={changeData.polish || []}
                              name="polish"
                              onChange={handleProductFelids}
                              renderValue={(selected) => selected.join(", ")}
                            // MenuProps={MenuProps}
                            >
                              {catalog.polish.length > 0 && catalog.polish.map((option,index) => (
                                <MenuItem
                                  key={option.SKU}
                                  value={option.SKU}
                                >
                                  <Checkbox
                                    checked={
                                      changeData.polish.indexOf(
                                        option.SKU
                                      ) > -1
                                    }
                                  />
                                  <ListItemText
                                    primary={option.title}
                                  />
                                </MenuItem>
                              ))}
                            </Select>
                            {/* <TextField sx={{ mb: 2 }}
                              size="small"
                              fullWidth
                              id="outlined-select"
                              select
                              name="polish"
                              label="Polish"
                              value={changeData.polish || ""}
                              onChange={handleProductFelids}
                              multiple
                              helperText="Please select your Polish."
                            >
                              {polishCatalog.map(
                                (option) =>
                                  option.polish_status && (
                                    <MenuItem
                                      key={option.value}
                                      value={option._id}
                                    >
                                      {option.polish_name}
                                    </MenuItem>
                                  )
                              )}
                              <MenuItem key={"none"} value="None">
                                {"None"}
                              </MenuItem>
                            </TextField> */}


                            <FormControl>
                              <FormLabel id="demo-radio-buttons-group-label">
                                Assembly
                              </FormLabel>
                              <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                name="assembly_required"
                                value={changeData.assembly_required || "no"}
                                onChange={handleProductFelids}
                              >
                                <FormControlLabel
                                  value="shipping"
                                  control={<Radio />}
                                  label="Shipping In Part"
                                />
                                <FormControlLabel
                                  value="yes"
                                  control={<Radio />}
                                  label="Yes"
                                />
                                <FormControlLabel
                                  value="no"
                                  control={<Radio />}
                                  label="No"
                                />
                              </RadioGroup>
                            </FormControl>
                            {changeData.assembly_required === "shipping" && (
                              <>

                                <TextField sx={{ mb: 2 }}
                                  size="small"
                                  fullWidth
                                  // required
                                  // autoComplete={false}
                                  id="fullWidth"
                                  label="Assemble Part"
                                  type="number"
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        No. of parts
                                      </InputAdornment>
                                    ),
                                  }}
                                  variant="outlined"
                                  name="assembly_part"
                                  value={changeData.assembly_part > -1 && changeData.assembly_part < 3 ? changeData.assembly_part : 0}
                                  onChange={handleProductFelids}
                                />
                              </>
                            )}
                            {changeData.assembly_required === "yes" && (
                              <>

                                <TextField sx={{ mt: 1, mb: 2 }}
                                  size="small"
                                  fullWidth
                                  // required
                                  id="outlined-select"
                                  select
                                  name="legs"
                                  label="Table Legs"
                                  value={changeData.legs || ""}
                                  onChange={handleProductFelids}
                                  multiple
                                  helperText="Please select your leg "
                                >
                                  {legCatalog.map((option) => (
                                    <MenuItem
                                      key={option.value}
                                      value={option.value}
                                    >
                                      {option.label}
                                    </MenuItem>
                                  ))}
                                  <MenuItem key={"none"} value="None">
                                    {"None"}
                                  </MenuItem>
                                </TextField>

                                <TextField sx={{ mb: 2 }}
                                  size="small"
                                  fullWidth
                                  // required
                                  id="outlined-select"
                                  select
                                  name="assembly_level"
                                  label="Assembly Level"
                                  value={changeData.assembly_level || ""}
                                  onChange={handleProductFelids}
                                  multiple
                                  helperText="Please select your assembly level "
                                >
                                  {assemblyLevelCatalog.map((option) => (
                                    <MenuItem
                                      key={option.value}
                                      value={option.value}
                                    >
                                      {option.label}
                                    </MenuItem>
                                  ))}
                                  <MenuItem key={"none"} value="None">
                                    {"None"}
                                  </MenuItem>
                                </TextField>
                              </>
                            )}



                            <FormLabel id="demo-radio-buttons-group-label">
                              Availability
                            </FormLabel>

                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={changeData.mobile_store}
                                  onChange={handleProductFelids}
                                  name="mobile_store"
                                  helperText="Check it if want it on mobile."
                                />
                              }
                              label="Mobile Store"
                            />
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={changeData.online_store}
                                  onChange={handleProductFelids}
                                  name="mobile_store"
                                  helperText="Check it if want it on online store."
                                />
                              }
                              label="Online Store"
                            />
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={changeData.continue_selling}
                                  onChange={handleProductFelids}
                                  name="continue_selling"
                                  helperText="Check it if want it to sell when out of Inventory."
                                />
                              }
                              label="Continue Selling"
                            />

                            {/*                            
                             <TextField sx = {{mb : 2}}
                              size="small"
                              fullWidth
                              // autoComplete={false}
                              id="fullWidth"
                              // required
                              label="MRP"
                              type="number"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    ₹
                                  </InputAdornment>
                                ),
                              }}
                              variant="outlined"
                              name="MRP"
                              onChange={handleProductFelids}
                              value={changeData.MRP}
                            /> */}





                          </Box >
                          <Box className="stepAction">
                            <Button
                              variant="outlined"
                              size="small"
                              disabled={activeStep === 0}
                              onClick={handleBackStep}
                            >
                              Back
                            </Button>
                            <Button
                              variant="contained"
                              size="small"
                              disabled={activeStep === 6}
                              onClick={handleNextStep}
                            >
                              Continue
                            </Button>
                          </Box>
                        </StepContent>
                      </Step>
                      {/* // Specification Ends*/}

                    {/* Images */}
                    <Step>
                        <StepLabel>Images</StepLabel>
                        <StepContent className="stepContent">
                          <Box className="fields">
                            {" "}
                            <Box className="stepAction">
                              <Button
                                variant="outlined"
                                size="small"
                                disabled={activeStep === 0}
                                onClick={handleBackStep}
                              >
                                Back
                              </Button>
                              <Button
                                variant="contained"
                                size="small"
                                disabled={activeStep === 6}
                                onClick={handleNextStep}
                              >
                                Continue
                              </Button>
                            </Box > <br />
                            {/* <AcceptMaxFiles className="dorpContainer"/> */}
                            <FormLabel id="demo-radio-buttons-group-label">
                              Product Images
                            </FormLabel>

                            <ProductsPreviews
                              text={"Please Drag and Drop the product images"}
                            ></ProductsPreviews>

                            {files.length > 0 && <Grid sx={{ p: 2 }} spacing={2} container>
                            <FormLabel id="demo-radio-buttons-group-label">
                                Total Images
                              </FormLabel>{
                                files.map((img, index) => {
                                  return <>
                                    <Grid item xs={2} sx={{ position: 'relative' }} >
                                      <CancelIcon onClick={() => {
                                        // this function is for removing the image from savedImage array 
                                        let temp = files;
                                        console.log(">>>>>>", temp, files);
                                        temp.splice(index, 1);
                                        setFiles([...temp])
                                      }} className='imageCross' color='primary' />
                                      <img style={{ width: '100%' }} src={URL.createObjectURL(img)} alt={img.name} />
                                    </Grid>
                                  </>
                                })
                              }
                            </Grid>
                            }


                            {changeData.savedImages.length > 0 && <Grid sx={{ p: 2 }} spacing={2} container>
                              <FormLabel id="demo-radio-buttons-group-label">
                                Saved Images
                              </FormLabel>
                              {
                                changeData.savedImages.map((img, index) => {
                                  return <>
                                    <Grid item xs={2} sx={{ position: 'relative' }} >
                                      <CancelIcon onClick={() => {
                                        // this function is for removing the image from savedImage array 
                                        let temp = changeData.savedImages;
                                        temp.splice(index, 1);
                                        setData({ ...changeData, savedImages: temp })
                                      }} className='imageCross' color='primary' />
                                      <img style={{ width: '100%' }} src={img} alt='productImage' />
                                    </Grid>
                                  </>
                                })
                              }
                            </Grid>
                            }


                            {/* // featured images */}
                            <TextField sx={{ mb: 2 }}
                              size="small"
                              fullWidth
                              // required
                              id="outlined-select"
                              select
                              name="featured_image"
                              label="Feature Image"
                              value={changeData.featured_image}
                              multiple
                              onChange={handleProductFelids}
                              helperText="Please select your Featured Image"
                            >
                              {files.map(
                                (option) =>
                                  option.validate && (
                                    <MenuItem
                                      key={option}
                                      value={option}
                                    >
                                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <img style={{ width: '60px' }} src={URL.createObjectURL(option)} alt={"product"} />
                                        <h6>{option.name}</h6>
                                      </Box>
                                    </MenuItem>
                                  )
                              )}

                               {/* {console.log(changeData.savedImages)} */}
                               {changeData.savedImages.map(
                                (option) =>
                                  <MenuItem
                                    key={option}
                                    value={option}
                                  >
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                      <img style={{ width: '60px' }} src={option} alt={"product"} />
                                      {/* <h6>{option.name}</h6> */}
                                    </Box>
                                  </MenuItem>
                              )}
                              <MenuItem key={"none"} value="None">
                                {"None"}
                              </MenuItem>
                            </TextField>

                            {/* // specification images */}
                            <TextField sx={{ mb: 2 }}
                              size="small"
                              fullWidth
                              // required
                              id="outlined-select"
                              select
                              name="specification_image"
                              label="Specification Image"
                              value={changeData.specificaiton_image}
                              multiple
                              onChange={handleProductFelids}
                              helperText="Please select your specification image."
                            >
                              {files.map(
                                (option) =>
                                  option.validate && (
                                    <MenuItem
                                      key={option}
                                      value={option}
                                    >
                                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <img style={{ width: '60px' }} src={URL.createObjectURL(option)} alt={"product"} />
                                        <h6>{option.name}</h6>
                                      </Box>
                                    </MenuItem>
                                  )
                              )}

                               {/* {console.log(changeData.savedImages)} */}
                               {changeData.savedImages.map(
                                (option) =>
                                  <MenuItem
                                    key={option}
                                    value={option}
                                  >
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                      <img style={{ width: '60px' }} src={option} alt={"product"} />
                                      {/* <h6>{option.name}</h6> */}
                                    </Box>
                                  </MenuItem>
                              )}
                              <MenuItem key={"none"} value="None">
                                {"None"}
                              </MenuItem>
                            </TextField>
                            {/* // Mannequin images */}
                            <TextField sx={{ mb: 2 }}
                              size="small"
                              fullWidth
                              // required
                              id="outlined-select"
                              select
                              name="mannequin_image"
                              label="Mannequin Image"
                              value={changeData.mannequin_image}
                              multiple
                              onChange={handleProductFelids}
                              helperText="Please select your Mannequin Image."
                            >
                              {files.map(
                                (option) =>
                                  option.validate && (
                                    <MenuItem
                                      key={option}
                                      value={option}
                                    >
                                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <img style={{ width: '60px' }} src={URL.createObjectURL(option)} alt={"product"} />
                                        <h6>{option.name}</h6>
                                      </Box>
                                    </MenuItem>
                                  )
                              )}
                               {/* {console.log(changeData.savedImages)} */}
                               {changeData.savedImages.map(
                                (option) =>
                                  <MenuItem
                                    key={option}
                                    value={option}
                                  >
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                      <img style={{ width: '60px' }} src={option} alt={"product"} />
                                      {/* <h6>{option.name}</h6> */}
                                    </Box>
                                  </MenuItem>
                              )}
                              <MenuItem key={"none"} value="None">
                                {"None"}
                              </MenuItem>
                            </TextField>



                            {/* <FormLabel id="demo-radio-buttons-group-label">
                            Featured Images
                          </FormLabel>
                          <FeaturesPreviews
                            text={"Please Drag and Drop featured images"}
                          ></FeaturesPreviews>
                          <FormLabel id="demo-radio-buttons-group-label">
                            Specification Images
                          </FormLabel>
                          <ImagePreviews
                            text={"Please Drag and Drop specification images"}
                          ></ImagePreviews>
                          <FormLabel id="demo-radio-buttons-group-label">
                            Mannequin Images
                          </FormLabel>
                          <MannequinPreviews
                            text={"Please Drag and Drop mannequin images"}
                          ></MannequinPreviews> */}
                          </Box >
                          <Box className="stepAction">
                            <Button
                              variant="outlined"
                              size="small"
                              disabled={activeStep === 0}
                              onClick={handleBackStep}
                            >
                              Back
                            </Button>
                            <Button
                              variant="contained"
                              size="small"
                              disabled={activeStep === 6}
                              onClick={handleNextStep}
                            >
                              Continue
                            </Button>
                          </Box>
                        </StepContent>
                      </Step>
                      {/* Images End */}

                      {/* Features */}
                      <Step>
                        <StepLabel>Features</StepLabel>
                        <StepContent className="stepContent">
                          <Box className="fields">
                            {" "}
                            <Box className="stepAction">
                              <Button
                                variant="outlined"
                                size="small"
                                disabled={activeStep === 0}
                                onClick={handleBackStep}
                              >
                                Back
                              </Button>
                              <Button
                                variant="contained"
                                size="small"
                                disabled={activeStep === 6}
                                onClick={handleNextStep}
                              >
                                Continue
                              </Button>
                            </Box > <br />

                            <FormGroup>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={changeData.rotating_seats}
                                    onChange={handleProductFelids}
                                    name="rotating_seats"
                                  />
                                }
                                label="Rotating Seats"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={changeData.eatable_oil_polish}
                                    onChange={handleProductFelids}
                                    name="eatable_oil_polish"
                                  />
                                }
                                label="Eatable Oil Polished"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={changeData.no_chemical}
                                    onChange={handleProductFelids}
                                    name="no_chemical"
                                  />
                                }
                                label="No Chemical Used"
                              />

                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={changeData.weaving}
                                    onChange={handleProductFelids}
                                    name="weaving"
                                  />
                                }
                                label="Weaving"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={
                                      changeData.not_suitable_for_Micro_Dish
                                    }
                                    onChange={handleProductFelids}
                                    name="not_suitable_for_Micro_Dish"
                                  />
                                }
                                label="Not Suitable For Microwave/Dishwasher"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={changeData.tilt_top}
                                    onChange={handleProductFelids}
                                    name="tilt_top"
                                  />
                                }
                                label="Tilt Top"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={changeData.inside_compartments}
                                    onChange={handleProductFelids}
                                    name="inside_compartments"
                                  />
                                }
                                label="Inside Compartments"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={changeData.stackable}
                                    onChange={handleProductFelids}
                                    name="stackable"
                                  />
                                }
                                label="Stackable"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={changeData.knife}
                                    onChange={handleProductFelids}
                                    name="knife"
                                  />
                                }
                                label="Knife Friendly Surface"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={changeData.wall_hanging}
                                    onChange={handleProductFelids}
                                    name="wall_hanging"
                                  />
                                }
                                label="Wall Hanging"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={changeData.ceramic_drawers}
                                    onChange={handleProductFelids}
                                    name="ceramic_drawers"
                                  />
                                }
                                label="Ceramic Drawers"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={changeData.ceramic_tiles}
                                    onChange={handleProductFelids}
                                    name="ceramic_tiles"
                                  />
                                }
                                label="Ceramic Tiles"
                              />
                            </FormGroup>
                          </Box >
                          <Box className="stepAction">
                            <Button
                              variant="outlined"
                              size="small"
                              disabled={activeStep === 0}
                              onClick={handleBackStep}
                            >
                              Back
                            </Button>
                            <Button
                              variant="contained"
                              size="small"
                              disabled={activeStep === 6}
                              onClick={handleNextStep}
                            >
                              Continue
                            </Button>
                          </Box>
                        </StepContent>
                      </Step>
                      {/* Features ends */}
                      {/* Miscellaneous */}
                      <Step>
                        <StepLabel>Miscellaneous</StepLabel>
                        <StepContent className="stepContent">
                          <Box className="fields">
                            {" "}
                            <Box className="stepAction">
                              <Button
                                variant="outlined"
                                size="small"
                                disabled={activeStep === 0}
                                onClick={handleBackStep}
                              >
                                Back
                              </Button>
                              <Button
                                variant="contained"
                                size="small"
                                disabled={activeStep === 6}
                                onClick={handleNextStep}
                              >
                                Continue
                              </Button>
                            </Box> <br />



                            <TextField sx={{ mb: 2 }}
                              size="small"
                              fullWidth
                              id="outlined-select"
                              select
                              name="back_style"
                              label="Back Style"
                              multiple
                              value={changeData.back_style || ""}
                              onChange={handleProductFelids}
                              helperText="Please select your Back Style."
                            >
                              {backStyleCatalog.map((option) => (
                                <MenuItem
                                  key={option.value}
                                  value={option.value}
                                >
                                  {option.label}
                                </MenuItem>
                              ))}
                              <MenuItem key={"none"} value="None">
                                {"None"}
                              </MenuItem>
                            </TextField>

                            <TextField sx={{ mb: 2 }}
                              size="small"
                              fullWidth
                              id="outlined-select"
                              select
                              name="weight_capacity"
                              label="Weight Capacity"
                              multiple
                              value={changeData.weight_capacity}
                              onChange={handleProductFelids}
                              helperText="Please select your Weight Capacity."
                            >
                              {weightCapCatalog.map((option) => (
                                <MenuItem
                                  key={option.value}
                                  value={option.value}
                                >
                                  {option.label}
                                </MenuItem>
                              ))}
                              <MenuItem key={"none"} value="None">
                                {"None"}
                              </MenuItem>
                            </TextField>


                            <FormControl>
                              <FormLabel id="demo-radio-buttons-group-label">
                                Drawer
                              </FormLabel>
                              <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                value={changeData.drawer || "no"}
                                onChange={handleProductFelids}
                                name="drawer"
                              >
                                <FormControlLabel
                                  value="mechanical"
                                  control={<Radio />}
                                  label="Mechanical"
                                />
                                <FormControlLabel
                                  value="wooden"
                                  control={<Radio />}
                                  label="Wooden"
                                />
                                <FormControlLabel
                                  value="none"
                                  control={<Radio />}
                                  label="None"
                                />
                              </RadioGroup>
                            </FormControl>

                            {(changeData.drawer === "mechanical" ||
                              changeData.drawer === "wooden") && (
                                <TextField sx={{ mb: 2 }}
                                  size="small"
                                  fullWidth
                                  type="number"
                                  id="outlined-select"
                                  name="drawer_count"
                                  label="Drawer Count"
                                  value={changeData.drawer_count}
                                  onChange={handleProductFelids}
                                />
                              )}





                            <FormControl>
                              <FormLabel id="demo-radio-buttons-group-label">
                                Joints ((Useful in products where info about
                                joints are shown))
                              </FormLabel>
                              <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                name="joints"
                                value={changeData.joints}
                                onChange={handleProductFelids}
                              >
                                <FormControlLabel
                                  value="single"
                                  control={<Radio />}
                                  label="Single"
                                />
                                <FormControlLabel
                                  value="multi"
                                  control={<Radio />}
                                  label="Multiple"
                                />
                              </RadioGroup>
                            </FormControl>

                          </Box >
                          <Box className="stepAction">
                            <Button
                              variant="outlined"
                              size="small"
                              disabled={activeStep === 0}
                              onClick={handleBackStep}
                            >
                              Back
                            </Button>
                            <Button
                              variant="contained"
                              size="small"
                              disabled={activeStep === 6}
                              onClick={handleNextStep}
                            >
                              Continue
                            </Button>
                          </Box>
                        </StepContent>
                      </Step>
                      {/* Miscellaneous ends */}


                      {/* Inventory & Shipping */}
                      <Step>
                        <StepLabel>Inventory & Shipping</StepLabel>
                        <StepContent className="stepContent">
                          <Box className="fields">
                            {" "}
                            <Box className="stepAction">
                              <Button
                                variant="outlined"
                                size="small"
                                disabled={activeStep === 0}
                                onClick={handleBackStep}
                              >
                                Back
                              </Button>
                              <Button
                                variant="contained"
                                size="small"
                                disabled={activeStep === 6}
                                onClick={handleNextStep}
                              >
                                Continue
                              </Button>
                            </Box > <br />

                            <FormGroup>
                              <FormLabel id="demo-radio-buttons-group-label">
                                Return & Payment Policy
                              </FormLabel>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={changeData.COD}
                                    onChange={handleProductFelids}
                                    name="COD"
                                  />
                                }
                                label="COD Available"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={changeData.returnable}
                                    onChange={handleProductFelids}
                                    name="returnable"
                                  />
                                }
                                label="Return Item"
                              />
                            </FormGroup>
                            {changeData.returnable && (
                              <>
                                <Typography component={'span'} variant="Caption">
                                  {" "}
                                  Return in {changeData.returnDays} Days
                                </Typography>
                                <Slider
                                  aria-label="Return Days"
                                  defaultValue={0}
                                  size="small"
                                  name="returnDays"
                                  value={changeData.returnDays}
                                  onChange={handleProductFelids}
                                  helperText="Please select your return days"
                                  valueLabelDisplay="auto"
                                />
                              </>
                            )}

                            <Typography component={'span'} variant="Caption">
                              {" "}
                              Polish in {changeData.polish_time} Days
                            </Typography>
                            <Slider
                              aria-label="Construction Days"
                              defaultValue={0}
                              size="small"
                              valueLabelDisplay="auto"
                              name="polish_time"
                              value={changeData.polish_time}
                              onChange={handleProductFelids}
                              helperText="Please select your polish time"
                            />

                            <Typography component={'span'} variant="Caption">
                              {" "}
                              Manufactured in {
                                changeData.manufacturing_time
                              }{" "}
                              Days
                            </Typography>
                            <Slider
                              aria-label="Construction Days"
                              defaultValue={0}
                              size="small"
                              valueLabelDisplay="auto"
                              name="manufacturing_time"
                              value={changeData.manufacturing_time}
                              onChange={handleProductFelids}
                              helperText="Please select your manufacturing time"
                            />

                            <InputLabel id="demo-multiple-checkbox-label">Stock Warehouse</InputLabel>
                            <Select sx={{ mb: 2 }}
                              multiple
                              fullWidth
                              value={changeData.warehouse}
                              name="warehouse"
                              onChange={handleProductFelids}
                              renderValue={(selected) => selected.join(', ')}
                            >
                              {warehouse.map((option) => (
                                <MenuItem key={option.label} value={option.value}>
                                  <Checkbox checked={changeData.warehouse.indexOf(option.value) > -1} />
                                  <ListItemText primary={option.value} />
                                </MenuItem>
                              ))}
                            </Select>

                            {

                              changeData.warehouse.map((row) => {
                                let stock; row === 'Jodhpur (Rajasthan)' ? stock = 'jodhpur_stock' : stock = 'bangalore_stock';
                                return <>

                                  <TextField sx={{ mb: 2 }}
                                    size="small"
                                    fullWidth
                                    name={stock}
                                    label={row + ' Stock'}
                                    type='number'
                                    value={changeData[stock] || ""}
                                    onChange={handleProductFelids}
                                  />
                                </>
                              })
                            }

                            <TextField sx={{ mb: 2 }}
                              size="small"
                              fullWidth
                              // autoComplete={false}
                              id="fullWidth"
                              label="Package Length"
                              type="number"
                              value={changeData.package_length}
                              onChange={handleProductFelids}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    Inch
                                  </InputAdornment>
                                ),
                              }}
                              variant="outlined"
                              name="package_length"
                              helperText="From left to right"
                            />

                            <TextField sx={{ mb: 2 }}
                              size="small"
                              fullWidth
                              // autoComplete={false}
                              id="fullWidth"
                              label="Package Breadth"
                              type="number"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    Inch
                                  </InputAdornment>
                                ),
                              }}
                              variant="outlined"
                              name="package_breadth"
                              value={changeData.package_breadth}
                              onChange={handleProductFelids}
                              helperText="From front to back"
                            />

                            <TextField sx={{ mb: 2 }}
                              size="small"
                              fullWidth
                              // autoComplete={false}
                              id="fullWidth"
                              label="Package Height"
                              type="number"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    Inch
                                  </InputAdornment>
                                ),
                              }}
                              variant="outlined"
                              name="package_height"
                              value={changeData.package_height}
                              onChange={handleProductFelids}
                              helperText="From bottom to top"
                            />

                            <FormLabel id="demo-radio-buttons-group-label">
                              Selling Points{" "}
                            </FormLabel>

                            <Grid container sx={{ mt: 1 }}>
                              <Grid item xs={12} sx={{ mb: 2 }} >
                                <Grid container sx={{ display: 'flex', alignItem: 'center', justifyContent: 'space-between' }} >
                                  <Grid item xs={11}><TextField fullWidth value={changeData.item || ''} size={'small'} type='text' name='item'
                                    onChange={handleProductFelids}
                                    label='Write a point...' /></Grid>
                                  <Grid item xs={0.8}>
                                    {changeData.select === undefined ? <Button
                                      fullWidth
                                      onClick={() => {
                                        changeData.item !== '' && setData({
                                          ...changeData,
                                          selling_points: [...changeData.selling_points, changeData.item],
                                          item: ''
                                        });
                                      }}
                                      variant='outlined'>Add</Button> : <Button onClick={() => {
                                        setData({
                                          ...changeData,
                                          selling_points: changeData.selling_points.filter((row, i) => {
                                            return i !== changeData.select;
                                          }),
                                          select: undefined

                                        })


                                      }}
                                        variant='outlined'>Remove</Button>}
                                  </Grid>
                                </Grid>
                              </Grid>
                              {changeData.selling_points.length > 0 && <Grid sx={{
                                maxHeight: '100px', overflowY: 'scroll', mb: 2,
                                border: '2px solid #91441f',
                                padding: '7px'
                              }} item xs={12}>
                                <ul style={{ listStyleType: 'square' }}>
                                  {
                                    changeData.selling_points && changeData.selling_points.map((item, index) => {
                                      return <li><Typography sx={{ cursor: 'pointer' }}
                                        onClick={() => {
                                          setData({
                                            ...changeData,
                                            select: index,
                                            item: item
                                          })
                                        }}
                                        variant='body'>{index + 1 + ". "}{item}</Typography>
                                      </li>
                                    })
                                  }
                                </ul>
                              </Grid>}
                            </Grid>


                            <Box sx={{ display: 'flex', mb: 2 }}>

                              <TextField
                                size="small"
                                sx={{ width: '85%' }}
                                id="fullWidth"
                                label="Quantity"
                                type="Number"
                                variant="outlined"
                                name="quantity"
                                value={changeData.quantity}
                                onChange={handleProductFelids}
                              />


                              <TextField
                                id="outlined-select-currency"
                                select
                                sx={{ ml: 1 }}
                                size='small'
                                label="Unit"
                                name='unit'
                                value={changeData.unit || ''}
                                onChange={handleProductFelids}
                              >
                                {unitCatalog.map((option) => (
                                  <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                  </MenuItem>
                                ))}
                              </TextField>
                            </Box>
                          </Box >
                          <Box className="stepAction">
                            <Button
                              variant="outlined"
                              size="small"
                              disabled={activeStep === 0}
                              onClick={handleBackStep}
                            >
                              Back
                            </Button>
                            <Button
                              variant="contained"
                              size="small"
                              disabled={activeStep === 6}
                              onClick={handleNextStep}
                            >
                              Continue
                            </Button>
                          </Box>
                        </StepContent>
                      </Step>
                      {/* Inventory & Shipping End */}

                      {/* SEO */}
                      <Step>
                        <StepLabel>SEO</StepLabel>
                        <StepContent className="stepContent">
                          <Box className="fields">
                            {" "}
                            <Box className="stepAction">
                              <Button
                                variant="outlined"
                                size="small"
                                disabled={activeStep === 0}
                                onClick={handleBackStep}
                              >
                                Back
                              </Button>
                              <Button
                                variant="contained"
                                size="small"
                                disabled={activeStep === 6}
                                onClick={handleNextStep}
                              >
                                Continue
                              </Button>
                            </Box > <br />

                            <TextField sx={{ mb: 2 }}
                              size="small"
                              fullWidth
                              // required
                              // autoComplete={false}
                              id="fullWidth"
                              label="SEO Title"
                              type="text"
                              variant="outlined"
                              name="seo_title"
                              value={changeData.seo_title}
                              onChange={handleProductFelids}
                            />

                            <TextField sx={{ mb: 2 }}
                              size="small"
                              fullWidth
                              // required
                              // autoComplete={false}
                              id="fullWidth"
                              label="SEO Description"
                              type="text"
                              variant="outlined"
                              name="seo_description"
                              value={changeData.seo_description}
                              onChange={handleProductFelids}
                            />

                            <TextField sx={{ mb: 2 }}
                              size="small"
                              fullWidth
                              // required
                              // autoComplete={false}
                              id="fullWidth"
                              label="SEO Keyword"
                              type="text"
                              variant="outlined"
                              name="seo_keyword"
                              value={changeData.seo_keyword}
                              onChange={handleProductFelids}
                            />

                            {/* product description  */}
                            <FormLabel id="demo-radio-buttons-group-label">
                              Product Description
                            </FormLabel>

                            <TextareaAutosize
                              fullWidth
                              minRows={5}
                              id="outlined-select"
                              name="product_description"
                              onChange={handleProductFelids}
                              defaultValue={changeData.product_description}
                              type="text"
                              helperText="Please enter your product description"
                            />
                            {/* <Editor
                              apiKey="nrxcqobhboeugucjonpg61xo1m65hn8qjxwayuhvqfjzb6j4"
                              onInit={(event, editor) =>
                                (editorRef.current = editor)
                              }
                              init={{
                                height: 300,
                                menubar: true,
                              }}
                            /> */}
                            <br />
                            {/* selling points  */}

                            {/* <FormLabel id="demo-radio-buttons-group-label">
                              Selling Points{" "}
                            </FormLabel>

                            <TextareaAutosize
                              fullWidth
                              minRows={5}
                              id="outlined-select"
                              name="selling_points"
                              defaultValue={"Selling Points" || changeData.selling_points}
                              type="text"
                              helperText="Please enter your selling points."
                            /> */}

                            {/* <Editor
                              apiKey="nrxcqobhboeugucjonpg61xo1m65hn8qjxwayuhvqfjzb6j4"
                              onInit={(event, editor) =>
                                (sellingRef.current = editor)
                              }
                              init={{
                                height: 400,
                                menubar: true,
                              }}
                            /> */}
                          </Box > <br />
                          <Box className="stepAction">
                            <Button
                              variant="outlined"
                              size="small"
                              disabled={activeStep === 0}
                              onClick={handleBackStep}
                            >
                              Back
                            </Button>
                            <Button
                              variant="contained"
                              size="small"
                              disabled={activeStep === 6}
                              onClick={handleNextStep}
                            >
                              Continue
                            </Button>
                          </Box>
                        </StepContent>
                      </Step>
                      {/* SEO End */}


                      {/* Extra-details */}
                      <Step>
                        <StepLabel>Extra-Details</StepLabel>
                        <StepContent className="stepContent">
                          <Box className="fields">
                            {" "}
                            <Box className="stepAction">
                              <Button
                                variant="outlined"
                                size="small"
                                disabled={activeStep === 0}
                                onClick={handleBackStep}
                              >
                                Back
                              </Button>
                              <Button
                                variant="contained"
                                size="small"
                                disabled={activeStep === 6}
                                onClick={handleNextStep}
                              >
                                Continue
                              </Button>
                            </Box >

                          </Box > <br />


                          <TextField sx={{ mb: 2 }}
                            size="small"
                            fullWidth
                            // required
                            id="outlined-select"
                            select
                            name="tax_rate"
                            label="Tax Rate"
                            value={changeData.tax_rate || ''}
                            onChange={handleProductFelids}
                            multiple
                            helperText="Please select your tax rate."
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  %
                                </InputAdornment>
                              ),
                            }}
                          >
                            {taxRateCatalog.map((option) => (
                              <MenuItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </MenuItem>
                            ))}
                            <MenuItem key={"none"} value="None">
                              {"None"}
                            </MenuItem>
                          </TextField>


                          <FormControl>
                            <FormLabel id="demo-radio-buttons-group-label">
                              Silver
                            </FormLabel>
                            <RadioGroup
                              sx={{ mb: 2 }}
                              aria-labelledby="demo-radio-buttons-group-label"
                              value={changeData.silver || "no"}
                              onChange={handleProductFelids}
                              name="silver"
                            >
                              <FormControlLabel
                                value="yes"
                                control={<Radio />}
                                label="Yes"
                              />
                              <FormControlLabel
                                value="no"
                                control={<Radio />}
                                label="No"
                              />
                            </RadioGroup>
                          </FormControl>
                          {changeData.silver === "yes" && (
                            <TextField sx={{ mb: 2 }}
                              size="small"
                              fullWidth
                              // autoComplete={false}
                              id="fullWidth"
                              label="Sliver Weight"
                              type="text"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    Gram
                                  </InputAdornment>
                                ),
                              }}
                              variant="outlined"
                              name="silver_weight"
                              value={changeData.silver_weight}
                              onChange={handleProductFelids}
                            />
                          )}


                    
<TextField sx={{ mb: 2 }}
                            size="small"
                            fullWidth
                            id="outlined-select"
                            select
                            name="hinge"
                            label="Hinge"
                            multiple
                            value={changeData.hinge || ''}
                            onChange={handleProductFelids}
                            helperText="Please select your hinge."
                          >
                            {catalog.hinge.map(
                              (option) => option.status && <MenuItem
                                    key={option.SKU}
                                    value={option.SKU}
                                  >
                                    {option.title}
                                  </MenuItem>
                            )}
                            <MenuItem key={"none"} value="None">
                              {"None"}
                            </MenuItem>
                          </TextField>

                          <TextField sx={{ mb: 2 }}
                            size="small"
                            fullWidth
                            id="outlined-select"
                            select
                            name="knob"
                            label="Knob"
                            multiple
                            value={changeData.knob || ''}
                            onChange={handleProductFelids}
                            helperText="Please select your knob."
                          >
                           {catalog.knob.map(
                              (option) => option.status && <MenuItem
                                    key={option.SKU}
                                    value={option.SKU}
                                  >
                                    {option.title}
                                  </MenuItem>
                            )}
                            <MenuItem key={"none"} value="None">
                              {"None"}
                            </MenuItem>
                          </TextField>

                          <TextField sx={{ mb: 2 }}
                            size="small"
                            fullWidth
                            id="outlined-select"
                            select
                            name="door"
                            label="Door"
                            multiple
                            value={changeData.door || ''}
                            onChange={handleProductFelids}
                            helperText="Please select your door."
                          >
                          {catalog.door.map(
                              (option) => option.status && <MenuItem
                                    key={option.SKU}
                                    value={option.SKU}
                                  >
                                    {option.title}
                                  </MenuItem>
                            )}
                            <MenuItem key={"none"} value="None">
                              {"None"}
                            </MenuItem>
                          </TextField>

                          <TextField sx={{ mb: 2 }}
                            size="small"
                            fullWidth
                            id="outlined-select"
                            select
                            name="handle"
                            label="Handle"
                            multiple
                            value={changeData.handle || ''}
                            onChange={handleProductFelids}
                            helperText="Please select your handle."
                          >
                           {catalog.handle.map(
                              (option) => option.status && <MenuItem
                                    key={option.SKU}
                                    value={option.SKU}
                                  >
                                    {option.title}
                                  </MenuItem>
                            )}
                            <MenuItem key={"none"} value="None">
                              {"None"}
                            </MenuItem>
                          </TextField>

                          <TextField sx={{ mb: 2 }}
                            size="small"
                            fullWidth
                            id="outlined-select"
                            select
                            label="Fitting"
                            name="fitting"
                            multiple
                            value={changeData.fitting || ''}
                            onChange={handleProductFelids}
                            helperText="Please select your fitting."
                          >
                          {catalog.fitting.map(
                              (option) => option.status && <MenuItem
                                    key={option.SKU}
                                    value={option.SKU}
                                  >
                                    {option.title}
                                  </MenuItem>
                            )}
                            <MenuItem key={"none"} value="None">
                              {"None"}
                            </MenuItem>
                          </TextField>



                          <FormControl>
                            <FormLabel id="demo-radio-buttons-group-label">
                              Mirror
                            </FormLabel>
                            <RadioGroup
                              sx={{ mb: 2 }}
                              aria-labelledby="demo-radio-buttons-group-label"
                              name="mirror"
                              value={changeData.mirror || "no"}
                              onChange={handleProductFelids}
                            >
                              <FormControlLabel
                                value="yes"
                                control={<Radio />}
                                label="Yes"
                              />
                              <FormControlLabel
                                value="no"
                                control={<Radio />}
                                label="No"
                              />
                            </RadioGroup>
                          </FormControl>

                          {changeData.mirror === "yes" && (
                            <>

                              <TextField sx={{ mb: 2 }}
                                size="small"
                                fullWidth
                                // autoComplete={false}
                                id="fullWidth"
                                label="Mirror Length"
                                type="text"
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      Inch
                                    </InputAdornment>
                                  ),
                                }}
                                variant="outlined"
                                value={changeData.mirror_length}
                                onChange={handleProductFelids}
                                name="mirror_length"
                              />


                              <TextField sx={{ mb: 2 }}
                                size="small"
                                fullWidth
                                // autoComplete={false}
                                id="fullWidth"
                                label="Mirror Width"
                                type="text"
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      Inch
                                    </InputAdornment>
                                  ),
                                }}
                                variant="outlined"
                                name="mirror_width"
                                value={changeData.mirror_width}
                                onChange={handleProductFelids}
                              />
                            </>
                          )}



                          <TextField sx={{ mb: 2 }}
                            size="small"
                            fullWidth
                            // autoComplete={false}
                            id="fullWidth"
                            label="Top Size"
                            type="number"
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  Inch
                                </InputAdornment>
                              ),
                            }}
                            variant="outlined"
                            name="top_size"
                            value={changeData.top_size}
                            onChange={handleProductFelids}
                          />



                          <TextField sx={{ mb: 2 }}
                            size="small"
                            fullWidth
                            // autoComplete={false}
                            id="fullWidth"
                            label="Dial Size (Only Applicable on Clock And Clock Containing Items )"
                            type="number"
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  Inch
                                </InputAdornment>
                              ),
                            }}
                            variant="outlined"
                            value={changeData.dial_size}
                            onChange={handleProductFelids}
                            name="dial_size"
                          />


                          <FormControl>
                            <FormLabel id="demo-radio-buttons-group-label">
                              Wheel
                            </FormLabel>
                            <RadioGroup
                              sx={{ mb: 2 }}
                              aria-labelledby="demo-radio-buttons-group-label"
                              name="wheel"
                              value={changeData.wheel || "no"}
                              onChange={handleProductFelids}
                            >
                              <FormControlLabel
                                value="yes"
                                control={<Radio />}
                                label="Yes"
                              />
                              <FormControlLabel
                                value="no"
                                control={<Radio />}
                                label="No"
                              />
                            </RadioGroup>
                          </FormControl>
                          <br />

                          <FormControl>
                            <FormLabel id="demo-radio-buttons-group-label">
                              Trolley
                            </FormLabel>
                            <RadioGroup
                              sx={{ mb: 2 }}

                              aria-labelledby="demo-radio-buttons-group-label"
                              name="trolley"
                              value={changeData.trolley || "no"}
                              onChange={handleProductFelids}
                            >
                              <FormControlLabel
                                value="yes"
                                control={<Radio />}
                                label="Yes"
                              />
                              <FormControlLabel
                                value="no"
                                control={<Radio />}
                                label="No"
                              />
                            </RadioGroup>
                          </FormControl>
                          {changeData.trolley === "yes" && (
                            <>

                              <TextField sx={{ mb: 2 }}
                                size="small"
                                fullWidth
                                id="outlined-select"
                                select
                                name="trolley_material"
                                label="Trolly Material"
                                multiple
                                value={changeData.trolley_material}
                                onChange={handleProductFelids}
                                helperText="Please select your Trolly Material "
                              >
                                {trollyMaterial.map((option) => (
                                  <MenuItem
                                    key={option.value}
                                    value={option.value}
                                  >
                                    {option.label}
                                  </MenuItem>
                                ))}
                              </TextField>
                            </>
                          )}



                          <TextField sx={{ mb: 2 }}
                            size="small"
                            fullWidth
                            // autoComplete={false}
                            id="fullWidth"
                            label="Seating Size Width"
                            type="number"
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  Inch
                                </InputAdornment>
                              ),
                            }}
                            variant="outlined"
                            name="seating_size_width"
                            value={changeData.seating_size_width}
                            onChange={handleProductFelids}
                          />


                          <TextField sx={{ mb: 2 }}
                            size="small"
                            fullWidth
                            // autoComplete={false}
                            id="fullWidth"
                            label="Seating Size Width Depth"
                            type="number"
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  Inch
                                </InputAdornment>
                              ),
                            }}
                            variant="outlined"
                            name="seating_size_depth"
                            value={changeData.seating_size_depth}
                            onChange={handleProductFelids}
                          />


                          <TextField sx={{ mb: 2 }}
                            size="small"
                            fullWidth
                            // autoComplete={false}
                            id="fullWidth"
                            label="Seating Size Height"
                            type="number"
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  Inch
                                </InputAdornment>
                              ),
                            }}
                            variant="outlined"
                            name="seating_size_height"
                            value={changeData.seating_size_height}
                            onChange={handleProductFelids}
                          />

                          <FormControl>
                            <FormLabel id="demo-radio-buttons-group-label">
                              Textile
                            </FormLabel>
                            <RadioGroup
                              sx={{ mb: 2 }}

                              aria-labelledby="demo-radio-buttons-group-label"
                              value={changeData.textile || "no"}
                              onChange={handleProductFelids}
                              name="textile"
                            >
                              <FormControlLabel
                                value="yes"
                                control={<Radio />}
                                label="Yes"
                              />
                              <FormControlLabel
                                value="no"
                                control={<Radio />}
                                label="No"
                              />
                            </RadioGroup>
                          </FormControl>


                          {changeData.textile === "yes" && (
                            <TextField sx={{ mb: 2 }}
                              size="small"
                              fullWidth
                              id="outlined-select"
                              select
                              name="textile_type"
                              label="Textile"
                              value={changeData.textile_type}
                              onChange={handleProductFelids}
                              multiple
                              helperText="Please select your textile."
                            >
                              {textileCatalog.map(
                                (option) =>
                                  option.textile_status && (
                                    <MenuItem
                                      key={option.value}
                                      value={option._id}
                                    >
                                      {option.textile_name}
                                    </MenuItem>
                                  )
                              )}
                              <MenuItem key={"none"} value="None">
                                {"None"}
                              </MenuItem>
                            </TextField>
                          )}

                          <br />


                          <FormControl>
                            <FormLabel id="demo-radio-buttons-group-label">
                              Upholstery
                            </FormLabel>
                            <RadioGroup
                              defaultValue="no"
                              aria-labelledby="demo-radio-buttons-group-label"
                              // onChange={(e) => {
                              //   setShowFabric(e.target.value);
                              // }}
                              sx={{ mb: 2 }}

                              value={changeData.upholstery || "no"}
                              onChange={handleProductFelids}
                              name="upholstery"
                            >
                              <FormControlLabel
                                value="yes"
                                control={<Radio />}
                                label="Yes"
                              />
                              <FormControlLabel
                                value="no"
                                control={<Radio />}
                                label="No"
                              />
                            </RadioGroup>
                          </FormControl>
                          {changeData.upholstery === "yes" && (
                            <>

                              <TextField sx={{ mb: 2 }}
                                size="small"
                                fullWidth
                                id="outlined-select"
                                select
                                name="fabric"
                                label="Fabric"
                                multiple
                                value={changeData.fabric}
                                onChange={handleProductFelids}
                                helperText="Please select your fabric."
                              >
                                {fabricCatalog.map(
                                  (option) =>
                                    option.fabric_status && (
                                      <MenuItem
                                        key={option.value}
                                        value={option._id}
                                      >
                                        {option.fabric_name}
                                      </MenuItem>
                                    )
                                )}
                                <MenuItem key={"none"} value="None">
                                  {"None"}
                                </MenuItem>
                              </TextField>{" "}
                            </>
                          )}



                          <Box className="stepAction">
                            <Button
                              variant="outlined"
                              size="small"
                              disabled={activeStep === 0}
                              onClick={handleBackStep}
                            >
                              Back
                            </Button>
                            <Button
                              variant="contained"
                              size="small"
                              disabled={activeStep === 6}
                              onClick={handleNextStep}
                            >
                              Continue
                            </Button>
                          </Box>
                        </StepContent>
                      </Step>
                      {/* Extra-details End */}


                    </Stepper>
                    <Button
                      color="primary"
                      type="submit"
                      fullWidth
                      variant="contained"
                    >
                      Add Variant
                    </Button>
                  </form>
                </Grid>
              </Grid>
            )}

            {/* Variation Products Ends */}

            {/* merge Products */}

            {state.OpenBox.formType === "merge_product" && (
              <Grid container p={5} className="productPadding">
                <Grid item xs={12}>
                  <Typography component={'span'} variant="h5">
                    Merge Product
                    <Typography component={'span'}
                      sx={{ display: "block !important" }}
                      variant="caption"
                    >
                      Merge your products and necessary information from here
                    </Typography>
                  </Typography>
                </Grid>

                <Grid item xs={12} mt={5}>
                  <form
                    className="form"
                    id="myForm"
                    onSubmit={(e) => { confirmBox(e, handleMergeProduct) }}
                    enctype="multipart/form-data"
                    method="post"
                  >
                    <Stepper
                      className="stepper"
                      activeStep={activeStep}
                      orientation="vertical"
                    >
                      {/* // Specification */}
                      <Step>
                        <StepLabel>Specifications</StepLabel>
                        <StepContent className="stepContent">
                          <Box className="fields">
                            {" "}
                            <Box className="stepAction">
                              <Button
                                variant="outlined"
                                size="small"
                                disabled={activeStep === 0}
                                onClick={handleBackStep}
                              >
                                Back
                              </Button>
                              <Button
                                variant="contained"
                                size="small"
                                disabled={activeStep === 6}
                                onClick={handleNextStep}
                              >
                                Continue
                              </Button>
                            </Box > <br />

                            <TextField sx={{ mb: 2 }}
                              size="small"
                              fullWidth
                              // autoComplete={false}
                              id="fullWidth"
                              // // required
                              label="SKU"
                              type="text"
                              value={SKU}
                              disabled
                              variant="outlined"
                              name="SKU"
                            />

                            <TextField sx={{ mb: 2 }}
                              size="small"
                              fullWidth
                              // autoComplete={false}
                              id="fullWidth"
                              label="Merging SKUs"
                              type="text"
                              value={changeData.productArray}
                              disabled
                              variant="outlined"
                              name="productArray"
                            />

                            <TextField sx={{ mb: 1 }}
                              size="small"
                              fullWidth
                              // required
                              id="outlined-select"
                              select
                              name="category_name"
                              label="Category"
                              value={changeData.category_name}
                              multiple
                              onChange={handleProductFelids}
                              helperText="Please select your category"
                            >
                              {category.map(
                                (option) =>
                                  option.category_status && (
                                    <MenuItem
                                      key={option._id}
                                      value={option._id}
                                    >
                                      {option.category_name}
                                    </MenuItem>
                                  )
                              )}
                              <MenuItem key={"none"} value="None">
                                {"None"}
                              </MenuItem>
                            </TextField>

                            <TextField sx={{ mb: 2 }}
                              size="small"
                              fullWidth
                              // required
                              id="outlined-select"
                              select
                              name="sub_category_name"
                              label="Sub Category"
                              multiple
                              value={changeData.sub_category_name}
                              onChange={handleProductFelids}
                              helperText="Please select your sub category"
                            >
                              {subCategory.map(
                                (option) =>
                                  changeData.category_name ===
                                  option.category_id && (
                                    <MenuItem
                                      key={option.value}
                                      value={option._id}
                                    >
                                      {option.sub_category_name}
                                    </MenuItem>
                                  )
                              )}
                              <MenuItem key={"none"} value="None">
                                {"None"}
                              </MenuItem>
                            </TextField>


                            <TextField sx={{ mb: 2 }}
                              size="small"
                              fullWidth
                              // autoComplete={false}
                              id="fullWidth"
                              // required
                              label="Title"
                              type="text"
                              variant="outlined"
                              name="product_title"
                              value={changeData.product_title}
                              onChange={handleProductFelids}
                            />

                            {/* product description  */}
                            <FormLabel
                              sx={{ mb: 2 }}
                              id="demo-radio-buttons-group-label">
                              Product Description
                            </FormLabel>

                            <TextareaAutosize
                              fullWidth
                              minRows={5}
                              id="outlined-select"
                              name="product_description"
                              defaultValue={"Product Description" || changeData.product_description}
                              type="text"
                              helperText="Please enter your product description"
                            />

                            <TextField sx={{ mt: 2, mb: 2 }}
                              size="small"
                              fullWidth
                              // autoComplete={false}
                              id="fullWidth"
                              // required
                              label="Showroom Price"
                              type="number"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    ₹
                                  </InputAdornment>
                                ),
                              }}
                              variant="outlined"
                              name="showroom_price"
                              value={changeData.showroom_price}
                              onChange={handleProductFelids}
                            />

                            <TextField sx={{ mb: 2 }}
                              size="small"
                              fullWidth
                              // disabled
                              // autoComplete={false}
                              id="fullWidth"
                              label="Selling Price"
                              type="number"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    ₹
                                  </InputAdornment>
                                ),
                              }}
                              value={
                                // changeData.MRP > 0 &&
                                //   changeData.discount_limit > 0
                                //   ? (changeData.selling_price =
                                //     changeData.MRP -
                                //     (changeData.MRP / 100) *
                                //     changeData.discount_limit)
                                //   : 0
                                changeData.selling_price
                              }
                              onChange={handleProductFelids}
                              variant="outlined"
                              name="selling_price"
                            />

                            <TextField sx={{ mb: 2 }}
                              size="small"
                              fullWidth
                              // required
                              // autoComplete={false}
                              id="fullWidth"
                              onChange={(e) => {
                                handleDiscount(e);
                                handleProductFelids(e);
                              }}
                              label="Discount Limit"
                              type="number"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    %
                                  </InputAdornment>
                                ),
                              }}
                              variant="outlined"
                              name="discount_limit"
                              value={changeData.discount_limit}
                            />
                          </Box >
                          <Box className="stepAction">
                            <Button
                              variant="outlined"
                              size="small"
                              disabled={activeStep === 0}
                              onClick={handleBackStep}
                            >
                              Back
                            </Button>
                            <Button
                              variant="contained"
                              size="small"
                              disabled={activeStep === 6}
                              onClick={handleNextStep}
                            >
                              Continue
                            </Button>
                          </Box>
                        </StepContent>
                      </Step>
                      {/* // Specification Ends*/}

                      {/* Images */}
                      <Step>
                        <StepLabel>Images</StepLabel>
                        <StepContent className="stepContent">
                          <Box className="fields">
                            {" "}
                            <Box className="stepAction">
                              <Button
                                variant="outlined"
                                size="small"
                                disabled={activeStep === 0}
                                onClick={handleBackStep}
                              >
                                Back
                              </Button>
                              <Button
                                variant="contained"
                                size="small"
                                disabled={activeStep === 6}
                                onClick={handleNextStep}
                              >
                                Continue
                              </Button>
                            </Box > <br />

                            {/* <AcceptMaxFiles className="dorpContainer"/> */}
                            <FormLabel id="demo-radio-buttons-group-label">
                              Product Images
                            </FormLabel>
                            <ProductsPreviews
                              text={"Please Drag and Drop the product images"}
                            ></ProductsPreviews>
                            <FormLabel id="demo-radio-buttons-group-label">
                              Featured Images
                            </FormLabel>
                            <FeaturesPreviews
                              text={"Please Drag and Drop featured images"}
                            ></FeaturesPreviews>
                            <FormLabel id="demo-radio-buttons-group-label">
                              Specification Images
                            </FormLabel>
                            <ImagePreviews
                              text={"Please Drag and Drop specification images"}
                            ></ImagePreviews>
                            <FormLabel id="demo-radio-buttons-group-label">
                              Mannequin Images
                            </FormLabel>
                            <MannequinPreviews
                              text={"Please Drag and Drop mannequin images"}
                            ></MannequinPreviews>
                          </Box > <br />
                          <Box className="stepAction">
                            <Button
                              variant="outlined"
                              size="small"
                              disabled={activeStep === 0}
                              onClick={handleBackStep}
                            >
                              Back
                            </Button>
                            <Button
                              variant="contained"
                              size="small"
                              disabled={activeStep === 6}
                              onClick={handleNextStep}
                            >
                              Continue
                            </Button>
                          </Box>
                        </StepContent>
                      </Step>
                      {/* Images End */}
                    </Stepper>
                    <Button
                      color="primary"
                      type="submit"
                      fullWidth
                      variant="contained"
                    >
                      Merge Product
                    </Button>
                  </form>
                </Grid>
              </Grid>
            )}

            {/* merge Products Ends */}

            {/* update merge Products */}

            {state.OpenBox.formType === "update_merge" && (
              <Grid container p={5} className="productPadding">
                <Grid item xs={12}>
                  <Typography component={'span'} variant="h5">
                    Update Merge Product
                    <Typography component={'span'}
                      sx={{ display: "block !important" }}
                      variant="caption"
                    >
                      Update Merge your products and necessary information from
                      here
                    </Typography>
                  </Typography>
                </Grid>

                <Grid item xs={12} mt={5}>
                  <form
                    className="form"
                    id="myForm"
                    onSubmit={(e) => { confirmBox(e, handleUpdateMergeProduct) }} enctype="multipart/form-data"
                    method="post"
                  >

                    <Stepper
                      className="stepper"
                      activeStep={activeStep}
                      orientation="vertical"
                    >
                      {/* // Specification */}
                      <Step>
                        <StepLabel>Specifications</StepLabel>
                        <StepContent className="stepContent">
                          <Box className="fields">
                            {" "}
                            <Box className="stepAction">
                              <Button
                                variant="outlined"
                                size="small"
                                disabled={activeStep === 0}
                                onClick={handleBackStep}
                              >
                                Back
                              </Button>
                              <Button
                                variant="contained"
                                size="small"
                                disabled={activeStep === 6}
                                onClick={handleNextStep}
                              >
                                Continue
                              </Button>
                            </Box > <br />

                            <TextField sx={{ mb: 2 }}
                              size="small"
                              fullWidth
                              // autoComplete={false}
                              id="fullWidth"
                              // // required
                              label="SKU"
                              type="text"
                              value={changeData.SKU}
                              disabled
                              variant="outlined"
                              name="SKU"
                            />

                            <Select sx={{ mb: 2 }}
                              multiple
                              fullWidth
                              value={changeData.product_array}
                              name="product_array"
                              onChange={handleProductFelids}
                              renderValue={(selected) => selected.join(", ")}
                            >
                              {SKUCatalog.map((option) => (
                                <MenuItem key={option._id} value={option.SKU}>
                                  <Checkbox
                                    checked={
                                      changeData.product_array.indexOf(
                                        option.SKU
                                      ) > -1
                                    }
                                  />
                                  <ListItemText primary={option.SKU} />
                                </MenuItem>
                              ))}
                            </Select>

                            <TextField sx={{ mb: 1 }}
                              size="small"
                              fullWidth
                              // required
                              id="outlined-select"
                              select
                              name="category_name"
                              label="Category"
                              value={changeData.category_name || ''}
                              multiple
                              onChange={handleProductFelids}
                              helperText="Please select your category"
                            >
                              {category.map(
                                (option) =>
                                  option.category_status && (
                                    <MenuItem
                                      key={option._id}
                                      value={option._id}
                                    >
                                      {option.category_name}
                                    </MenuItem>
                                  )
                              )}
                              <MenuItem key={"none"} value="None">
                                {"None"}
                              </MenuItem>
                            </TextField>

                            <TextField sx={{ mb: 2 }}
                              size="small"
                              fullWidth
                              // required
                              id="outlined-select"
                              select
                              name="sub_category_name"
                              label="Sub Category"
                              multiple
                              value={changeData.sub_category_name || ''}
                              onChange={handleProductFelids}
                              helperText="Please select your sub category"
                            >
                              {subCategory.map(
                                (option) =>
                                  changeData.category_name ===
                                  option.category_id && (
                                    <MenuItem
                                      key={option.value}
                                      value={option._id}
                                    >
                                      {option.sub_category_name}
                                    </MenuItem>
                                  )
                              )}
                              <MenuItem key={"none"} value="None">
                                {"None"}
                              </MenuItem>
                            </TextField>


                            <TextField sx={{ mb: 2 }}
                              size="small"
                              fullWidth
                              // autoComplete={false}
                              id="fullWidth"
                              // required
                              label="Title"
                              type="text"
                              variant="outlined"
                              name="product_title"
                              value={changeData.product_title}
                              onChange={handleProductFelids}
                            />

                            {/* product description  */}
                            <FormLabel
                              sx={{ mb: 2 }}
                              id="demo-radio-buttons-group-label">
                              Product Description
                            </FormLabel>

                            <TextareaAutosize
                              fullWidth
                              minRows={5}
                              id="outlined-select"
                              name="product_description"
                              defaultValue={"Product Description" || changeData.product_description}
                              type="text"
                              helperText="Please enter your product description"
                            />

                            <TextField sx={{ mt: 2, mb: 2 }}
                              size="small"
                              fullWidth
                              // autoComplete={false}
                              id="fullWidth"
                              // required
                              label="Showroom Price"
                              type="number"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    ₹
                                  </InputAdornment>
                                ),
                              }}
                              variant="outlined"
                              name="showroom_price"
                              value={changeData.showroom_price}
                              onChange={handleProductFelids}
                            />

                            <TextField sx={{ mb: 2 }}
                              size="small"
                              fullWidth
                              // disabled
                              // autoComplete={false}
                              id="fullWidth"
                              label="Selling Price"
                              type="number"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    ₹
                                  </InputAdornment>
                                ),
                              }}
                              value={
                                // changeData.MRP > 0 &&
                                //   changeData.discount_limit > 0
                                //   ? (changeData.selling_price =
                                //     changeData.MRP -
                                //     (changeData.MRP / 100) *
                                //     changeData.discount_limit)
                                //   : 0
                                changeData.selling_price
                              }
                              onChange={handleProductFelids}
                              variant="outlined"
                              name="selling_price"
                            />

                            <TextField sx={{ mb: 2 }}
                              size="small"
                              fullWidth
                              // required
                              // autoComplete={false}
                              id="fullWidth"
                              onChange={(e) => {
                                handleDiscount(e);
                                handleProductFelids(e);
                              }}
                              label="Discount Limit"
                              type="number"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    %
                                  </InputAdornment>
                                ),
                              }}
                              variant="outlined"
                              name="discount_limit"
                              value={changeData.discount_limit}
                            />
                          </Box >
                          <Box className="stepAction">
                            <Button
                              variant="outlined"
                              size="small"
                              disabled={activeStep === 0}
                              onClick={handleBackStep}
                            >
                              Back
                            </Button>
                            <Button
                              variant="contained"
                              size="small"
                              disabled={activeStep === 6}
                              onClick={handleNextStep}
                            >
                              Continue
                            </Button>
                          </Box>
                        </StepContent>
                      </Step>
                      {/* // Specification Ends*/}

                      {/* Images */}
                      <Step>
                        <StepLabel>Images</StepLabel>
                        <StepContent className="stepContent">
                          <Box className="fields">
                            {" "}
                            <Box className="stepAction">
                              <Button
                                variant="outlined"
                                size="small"
                                disabled={activeStep === 0}
                                onClick={handleBackStep}
                              >
                                Back
                              </Button>
                              <Button
                                variant="contained"
                                size="small"
                                disabled={activeStep === 6}
                                onClick={handleNextStep}
                              >
                                Continue
                              </Button>
                            </Box > <br />

                            {/* <AcceptMaxFiles className="dorpContainer"/> */}
                            <FormLabel id="demo-radio-buttons-group-label">
                              Product Images
                            </FormLabel>
                            <ProductsPreviews
                              text={"Please Drag and Drop the product images"}
                            ></ProductsPreviews>
                            <FormLabel id="demo-radio-buttons-group-label">
                              Featured Images
                            </FormLabel>
                            <FeaturesPreviews
                              text={"Please Drag and Drop featured images"}
                            ></FeaturesPreviews>
                            <FormLabel id="demo-radio-buttons-group-label">
                              Specification Images
                            </FormLabel>
                            <ImagePreviews
                              text={"Please Drag and Drop specification images"}
                            ></ImagePreviews>
                            <FormLabel id="demo-radio-buttons-group-label">
                              Mannequin Images
                            </FormLabel>
                            <MannequinPreviews
                              text={"Please Drag and Drop mannequin images"}
                            ></MannequinPreviews>
                          </Box > <br />
                          <Box className="stepAction">
                            <Button
                              variant="outlined"
                              size="small"
                              disabled={activeStep === 0}
                              onClick={handleBackStep}
                            >
                              Back
                            </Button>
                            <Button
                              variant="contained"
                              size="small"
                              disabled={activeStep === 6}
                              onClick={handleNextStep}
                            >
                              Continue
                            </Button>
                          </Box>
                        </StepContent>
                      </Step>
                      {/* Images End */}
                    </Stepper>
                    <Button
                      color="primary"
                      type="submit"
                      fullWidth
                      variant="contained"
                    >
                      Update Merge Product
                    </Button>
                  </form>
                </Grid>
              </Grid>
            )}

            {/* update merge Products Ends */}

            {/*  add textile */}

            {state.OpenBox.formType === "textile" && (
              <Grid container p={5}>
                <Grid item xs={12}>
                  <Typography component={'span'} variant="h5">
                    Add Textile
                    <Typography component={'span'}
                      sx={{ display: "block !important" }}
                      variant="caption"
                    >
                      Add Textile and necessary information from here
                    </Typography>
                  </Typography>
                </Grid>

                <Grid item xs={12} mt={5}>
                  <form
                    className="form"
                    onSubmit={(e) => { confirmBox(e, handleTextile) }}
                    id="myForm"
                    enctype="multipart/form-data"
                    method="post"
                  >
                    <ImagePreviews
                      text={"Please Drag and Drop the Textile image"}
                    >
                      {" "}
                    </ImagePreviews>

                    <TextField sx={{ mb: 2 }}
                      size="small"
                      fullWidth
                      // required
                      id="outlined-select"
                      name="textile_name"
                      label="Textile"
                      type="text"
                      helperText="Please enter your textile"
                    />


                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox name="textile_status" />}
                        label="Status (On/Off)"
                      />
                    </FormGroup>



                    <Button
                      color="primary"
                      type="submit"
                      fullWidth
                      variant="contained"
                    >
                      Add Textile
                    </Button>
                  </form>
                </Grid>
              </Grid>
            )}
            {/* add textile Ends */}

            {/*  update textile */}

            {state.OpenBox.formType === "update_textile" && (
              <Grid container p={5}>
                <Grid item xs={12}>
                  <Typography component={'span'} variant="h5">
                    Update Textile
                    <Typography component={'span'}
                      sx={{ display: "block !important" }}
                      variant="caption"
                    >
                      Update your Textile and necessary information from here
                    </Typography>
                  </Typography>
                </Grid>

                <Grid item xs={12} mt={5}>
                  <form
                    className="form"
                    id="myForm" onSubmit={(e) => { confirmBox(e, handleUpdateTextile) }}
                    enctype="multipart/form-data"
                    method="post"
                  >
                    <ImagePreviews
                      text={"Please Drag and Drop the Textile image"}
                    >
                      {" "}
                    </ImagePreviews>

                    <TextField sx={{ mb: 2 }}
                      size="small"
                      fullWidth
                      id="outlined-select"
                      onChange={handleChangeData}
                      value={changeData.textile_name}
                      name="textile_name"
                      label="Textile"
                      helperText="Please enter the update"
                    />

                    <Button
                      color="primary"
                      type="submit"
                      fullWidth
                      variant="contained"
                    >
                      Update Textile
                    </Button>
                  </form>
                </Grid>
              </Grid>
            )}

            {/* update Textile Ends */}

            {/*  add fabric */}

            {state.OpenBox.formType === "fabric" && (
              <Grid container p={5}>
                <Grid item xs={12}>
                  <Typography component={'span'} variant="h5">
                    Add Fabric
                    <Typography component={'span'}
                      sx={{ display: "block !important" }}
                      variant="caption"
                    >
                      Add Fabric and necessary information from here
                    </Typography>
                  </Typography>
                </Grid>

                <Grid item xs={12} mt={5}>
                  <form
                    className="form"
                    onSubmit={(e) => { confirmBox(e, handleFabric) }}
                    id="myForm"
                    enctype="multipart/form-data"
                    method="post"
                  >
                    <ImagePreviews
                      text={"Please Drag and Drop the fabric image"}
                    >
                      {" "}
                    </ImagePreviews>

                    <TextField sx={{ mb: 2 }}
                      size="small"
                      fullWidth
                      // required
                      id="outlined-select"
                      name="fabric_name"
                      label="Fabric"
                      type="text"
                      helperText="Please enter your fabric"
                    />


                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox name="fabric_status" />}
                        label="Status (On/Off)"
                      />
                    </FormGroup>



                    <Button
                      color="primary"
                      type="submit"
                      fullWidth
                      variant="contained"
                    >
                      Add Fabric
                    </Button>
                  </form>
                </Grid>
              </Grid>
            )}
            {/* add fabric Ends */}

            {/*  update fabric */}

            {state.OpenBox.formType === "update_fabric" && (
              <Grid container p={5}>
                <Grid item xs={12}>
                  <Typography component={'span'} variant="h5">
                    Update Fabric
                    <Typography component={'span'}
                      sx={{ display: "block !important" }}
                      variant="caption"
                    >
                      Update your fabric and necessary information from here
                    </Typography>
                  </Typography>
                </Grid>

                <Grid item xs={12} mt={5}>
                  <form
                    className="form"
                    id="myForm"
                    onSubmit={(e) => { confirmBox(e, handleUpdateFabric) }} enctype="multipart/form-data"
                    method="post"
                  >
                    <ImagePreviews
                      text={"Please Drag and Drop the Fabric image"}
                    >
                      {" "}
                    </ImagePreviews>

                    <TextField sx={{ mb: 2 }}
                      size="small"
                      fullWidth
                      id="outlined-select"
                      onChange={handleChangeData}
                      value={changeData.fabric_name}
                      name="fabric_name"
                      label="Fabric"
                      helperText="Please enter the update"
                    />

                    <Button
                      color="primary"
                      type="submit"
                      fullWidth
                      variant="contained"
                    >
                      Update Fabric
                    </Button>
                  </form>
                </Grid>
              </Grid>
            )}

            {/* update fabric Ends */}

            {/*  add Category */}

            {state.OpenBox.formType === "category" && (
              <Grid container p={5}>
                <Grid item xs={12}>
                  <Typography component={'span'} variant="h5">
                    Add Category
                    <Typography component={'span'}
                      sx={{ display: "block !important" }}
                      variant="caption"
                    >
                      Add your product category and necessary information from
                      here
                    </Typography>
                  </Typography>
                </Grid>

                <Grid item xs={12} mt={5}>
                  <form
                    className="form" onSubmit={(e) => { confirmBox(e, handleCategory) }}
                    id="myForm"
                    enctype="multipart/form-data"
                    method="post"
                  >
                    <ImagePreviews
                      text={"Please Drag and Drop the Category image"}
                    >
                      {" "}
                    </ImagePreviews>

                    <TextField sx={{ mb: 2 }}
                      size="small"
                      fullWidth
                      // required
                      id="outlined-select"
                      name="category_name"
                      label="Category"
                      type="text"
                      helperText="Please enter your category"
                    />


                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox name="category_status" />}
                        label="Status (On/Off)"
                      />
                    </FormGroup>



                    <Button
                      color="primary"
                      type="submit"
                      fullWidth
                      variant="contained"
                    >
                      Add Category
                    </Button>
                  </form>
                </Grid>
              </Grid>
            )}
            {/* add Category Ends */}

            {/*  update Category */}

            {state.OpenBox.formType === "update_category" && (
              <Grid container p={5}>
                <Grid item xs={12}>
                  <Typography component={'span'} variant="h5">
                    Update Category
                    <Typography component={'span'}
                      sx={{ display: "block !important" }}
                      variant="caption"
                    >
                      Update your product category and necessary information
                      from here
                    </Typography>
                  </Typography>
                </Grid>

                <Grid item xs={12} mt={5}>
                  <form
                    className="form"
                    id="myForm" onSubmit={(e) => { confirmBox(e, handleUpdateCategory) }}
                    enctype="multipart/form-data"
                    method="post"
                  >
                    <ImagePreviews
                      text={"Please Drag and Drop the Category image"}
                    >
                      {" "}
                    </ImagePreviews>

                    <TextField sx={{ mb: 2 }}
                      size="small"
                      fullWidth
                      id="outlined-select"
                      onChange={handleChangeData}
                      value={changeData.category}
                      name="category_name"
                      label="Category"
                      helperText="Please enter the update"
                    />

                    <Button
                      color="primary"
                      type="submit"
                      fullWidth
                      variant="contained"
                    >
                      Update Category
                    </Button>
                  </form>
                </Grid>
              </Grid>
            )}

            {/* update Category Ends */}

            {/*  add primaryMateriel */}

            {state.OpenBox.formType === "primaryMaterial" && (
              <Grid container p={5}>
                <Grid item xs={12}>
                  <Typography component={'span'} variant="h5">
                    Add Material
                    <Typography component={'span'}
                      sx={{ display: "block !important" }}
                      variant="caption"
                    >
                      Add your Material and necessary information from
                      here
                    </Typography>
                  </Typography>
                </Grid>

                <Grid item xs={12} mt={5}>
                  <form
                    className="form" onSubmit={(e) => { confirmBox(e, handlePrimaryMaterial) }}
                    id="myForm"
                    enctype="multipart/form-data"
                    method="post"
                  >
                    <ImagePreviews
                      text={"Please Drag and Drop the Material image"}
                    >
                      {" "}
                    </ImagePreviews>

                    <TextField sx={{ mb: 2 }}
                      size="small"
                      fullWidth
                      // required
                      id="outlined-select"
                      name="primaryMaterial_name"
                      label="Material"
                      type="text"
                      helperText="Please enter your primary material"
                    />


                    <TextareaAutosize
                      fullWidth
                      minRows={5}
                      id="outlined-select"
                      name="primaryMaterial_description"
                      defaultValue={"Material Description"}
                      type="text"
                      helperText="Please enter your primary material description"
                    />


                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox name="primaryMaterial_status" />}
                        label="Status (On/Off)"
                      />
                    </FormGroup>



                    <Button
                      color="primary"
                      type="submit"
                      fullWidth
                      variant="contained"
                    >
                      Add Material
                    </Button>
                  </form>
                </Grid>
              </Grid>
            )}
            {/* add primaryMaterial Ends */}

            {/*  update primaryMaterial */}

            {state.OpenBox.formType === "update_PrimaryMaterial" && (
              <Grid container p={5}>
                <Grid item xs={12}>
                  <Typography component={'span'} variant="h5">
                    Update Material
                    <Typography component={'span'}
                      sx={{ display: "block !important" }}
                      variant="caption"
                    >
                      Update your Material and necessary information
                      from here
                    </Typography>
                  </Typography>
                </Grid>

                <Grid item xs={12} mt={5}>
                  <form
                    className="form"
                    id="myForm" onSubmit={(e) => { confirmBox(e, handleUpdatePrimaryMaterial) }}
                    enctype="multipart/form-data"
                    method="post"
                  >
                    <ImagePreviews
                      text={"Please Drag and Drop the Material image"}
                    >
                      {" "}
                    </ImagePreviews>

                    <TextField sx={{ mb: 2 }}
                      size="small"
                      fullWidth
                      onChange={handleChangeData}
                      id="outlined-select"
                      name="primaryMaterial_name"
                      label="Material"
                      value={changeData.primaryMaterial_name}
                      helperText="Please enter the update"
                    />

                    <TextareaAutosize
                      fullWidth
                      minRows={5}
                      id="outlined-select"
                      name="primaryMaterial_description"
                      onChange={handleChangeData}
                      defaultValue={changeData.primaryMaterial_description}
                      type="text"
                      helperText="Please enter your primary material description"
                    />


                    <Button
                      color="primary"
                      type="submit"
                      fullWidth
                      variant="contained"
                    >
                      Update Material
                    </Button>
                  </form>
                </Grid>
              </Grid>
            )}
            {/* update primaryMaterial Ends */}

            {/*  add knob */}

            {state.OpenBox.formType === "addKnob" && (
              <Grid container p={5}>
                <Grid item xs={12}>
                  <Typography component={'span'} variant="h5">
                    Add Knob
                    <Typography component={'span'}
                      sx={{ display: "block !important" }}
                      variant="caption"
                    >
                      Add your knob and necessary information from here
                    </Typography>
                  </Typography>
                </Grid>

                <Grid item xs={12} mt={5}>
                  <form
                    className="form" onSubmit={(e) => { confirmBox(e, handleKnob) }}
                    id="myForm"
                    enctype="multipart/form-data"
                    method="post"
                  >
                    {/* <ImagePreviews text={'Please Drag and Drop the Category image'}> </ImagePreviews> */}
                    <TextField sx={{ mb: 2 }}
                      size="small"
                      fullWidth
                      // required
                      id="outlined-select"
                      name="knob_name"
                      label="Knob Name"
                      type="text"
                      helperText="Please enter your knob material"
                    />


                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox name="knob_status" />}
                        label="Status (On/Off)"
                      />
                    </FormGroup>



                    <Button
                      color="primary"
                      type="submit"
                      fullWidth
                      variant="contained"
                    >
                      Add Knob
                    </Button>
                  </form>
                </Grid>
              </Grid>
            )}
            {/* add knob  Ends */}

            {/*  update knob  */}

            {state.OpenBox.formType === "update_knob" && (
              <Grid container p={5}>
                <Grid item xs={12}>
                  <Typography component={'span'} variant="h5">
                    Update Knob
                    <Typography component={'span'}
                      sx={{ display: "block !important" }}
                      variant="caption"
                    >
                      Update Knob and necessary information from here
                    </Typography>
                  </Typography>
                </Grid>

                <Grid item xs={12} mt={5}>
                  <form
                    className="form" onSubmit={(e) => { confirmBox(e, handleUpdateKnob) }}
                    id="myForm"
                    enctype="multipart/form-data"
                    method="post"
                  >
                    <TextField sx={{ mb: 2 }}
                      size="small"
                      fullWidth
                      // required
                      id="outlined-select"
                      onChange={handleChangeData}
                      name="knob_name"
                      label="Knob Name"
                      type="text"
                      value={changeData.knob}
                      helperText="Please enter your knob "
                    />



                    <Button
                      color="primary"
                      type="submit"
                      fullWidth
                      variant="contained"
                    >
                      Update Knob
                    </Button>
                  </form>
                </Grid>
              </Grid>
            )}
            {/* update knob   Ends */}

            {/*  add Handle */}

            {state.OpenBox.formType === "addHandle" && (
              <Grid container p={5}>
                <Grid item xs={12}>
                  <Typography component={'span'} variant="h5">
                    Add Handle Material
                    <Typography component={'span'}
                      sx={{ display: "block !important" }}
                      variant="caption"
                    >
                      Add your handle and necessary information from here
                    </Typography>
                  </Typography>
                </Grid>

                <Grid item xs={12} mt={5}>
                  <form
                    className="form" onSubmit={(e) => { confirmBox(e, handleHandle) }}
                    id="myForm"
                    enctype="multipart/form-data"
                    method="post"
                  >
                    {/* <ImagePreviews text={'Please Drag and Drop the Category image'}> </ImagePreviews> */}
                    <TextField sx={{ mb: 2 }}
                      size="small"
                      fullWidth
                      // required
                      id="outlined-select"
                      name="handle_name"
                      label="Handle Material Name"
                      type="text"
                      helperText="Please enter your knob material"
                    />


                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox name="handle_status" />}
                        label="Status (On/Off)"
                      />
                    </FormGroup>



                    <Button
                      color="primary"
                      type="submit"
                      fullWidth
                      variant="contained"
                    >
                      Add Handle Material
                    </Button>
                  </form>
                </Grid>
              </Grid>
            )}
            {/* add Handle  Ends */}

            {/*  update Handle  */}

            {state.OpenBox.formType === "update_handle" && (
              <Grid container p={5}>
                <Grid item xs={12}>
                  <Typography component={'span'} variant="h5">
                    Update Handle Material
                    <Typography component={'span'}
                      sx={{ display: "block !important" }}
                      variant="caption"
                    >
                      Update Door and necessary information from here
                    </Typography>
                  </Typography>
                </Grid>

                <Grid item xs={12} mt={5}>
                  <form
                    className="form"
                    onSubmit={(e) => { confirmBox(e, handleUpdateHandle) }}
                    id="myForm"
                    enctype="multipart/form-data"
                    method="post"
                  >
                    <TextField sx={{ mb: 2 }}
                      size="small"
                      onChange={handleChangeData}
                      fullWidth
                      // required
                      id="outlined-select"
                      name="handle_name"
                      value={changeData.handle}
                      label="Handle Material Name"
                      type="text"
                      helperText="Please enter your Door "
                    />



                    <Button
                      color="primary"
                      type="submit"
                      fullWidth
                      variant="contained"
                    >
                      Update Handle Material
                    </Button>
                  </form>
                </Grid>
              </Grid>
            )}
            {/* update Handle   Ends */}

            {/*  add Door */}

            {state.OpenBox.formType === "addDoor" && (
              <Grid container p={5}>
                <Grid item xs={12}>
                  <Typography component={'span'} variant="h5">
                    Add Door
                    <Typography component={'span'}
                      sx={{ display: "block !important" }}
                      variant="caption"
                    >
                      Add your door and necessary information from here
                    </Typography>
                  </Typography>
                </Grid>

                <Grid item xs={12} mt={5}>
                  <form
                    className="form"
                    onSubmit={(e) => { confirmBox(e, handleDoor) }}
                    id="myForm"
                    enctype="multipart/form-data"
                    method="post"
                  >
                    {/* <ImagePreviews text={'Please Drag and Drop the Category image'}> </ImagePreviews> */}
                    <TextField sx={{ mb: 2 }}
                      size="small"
                      fullWidth
                      // required
                      id="outlined-select"
                      name="door_name"
                      label="Door Name"
                      type="text"
                      helperText="Please enter your door material"
                    />


                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox name="door_status" />}
                        label="Status (On/Off)"
                      />
                    </FormGroup>



                    <Button
                      color="primary"
                      type="submit"
                      fullWidth
                      variant="contained"
                    >
                      Add Door
                    </Button>
                  </form>
                </Grid>
              </Grid>
            )}
            {/* add Door  Ends */}

            {/*  update Door  */}

            {state.OpenBox.formType === "update_door" && (
              <Grid container p={5}>
                <Grid item xs={12}>
                  <Typography component={'span'} variant="h5">
                    Update Door
                    <Typography component={'span'}
                      sx={{ display: "block !important" }}
                      variant="caption"
                    >
                      Update Door and necessary information from here
                    </Typography>
                  </Typography>
                </Grid>

                <Grid item xs={12} mt={5}>
                  <form
                    className="form"
                    onSubmit={(e) => { confirmBox(e, handleUpdateDoor) }}
                    id="myForm"
                    enctype="multipart/form-data"
                    method="post"
                  >
                    <TextField sx={{ mb: 2 }}
                      size="small"
                      fullWidth
                      onChange={handleChangeData}
                      // required
                      id="outlined-select"
                      name="door_name"
                      label="Door Name"
                      value={changeData.door}
                      type="text"
                      helperText="Please enter your Door "
                    />



                    <Button
                      color="primary"
                      type="submit"
                      fullWidth
                      variant="contained"
                    >
                      Update Door
                    </Button>
                  </form>
                </Grid>
              </Grid>
            )}
            {/* update door   Ends */}

            {/*  add Fitting */}

            {state.OpenBox.formType === "addFitting" && (
              <Grid container p={5}>
                <Grid item xs={12}>
                  <Typography component={'span'} variant="h5">
                    Add Fitting
                    <Typography component={'span'}
                      sx={{ display: "block !important" }}
                      variant="caption"
                    >
                      Add your fitting and necessary information from here
                    </Typography>
                  </Typography>
                </Grid>

                <Grid item xs={12} mt={5}>
                  <form
                    className="form"
                    onSubmit={(e) => { confirmBox(e, handleFitting) }} id="myForm"
                    enctype="multipart/form-data"
                    method="post"
                  >
                    {/* <ImagePreviews text={'Please Drag and Drop the Category image'}> </ImagePreviews> */}
                    <TextField sx={{ mb: 2 }}
                      size="small"
                      fullWidth
                      // required
                      id="outlined-select"
                      name="fitting_name"
                      label="Fitting Name"
                      type="text"
                      helperText="Please enter your primary material"
                    />


                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox name="fitting_status" />}
                        label="Status (On/Off)"
                      />
                    </FormGroup>



                    <Button
                      color="primary"
                      type="submit"
                      fullWidth
                      variant="contained"
                    >
                      Add Fitting
                    </Button>
                  </form>
                </Grid>
              </Grid>
            )}
            {/* add Fitting  Ends */}

            {/*  update fitting  */}

            {state.OpenBox.formType === "update_fitting" && (
              <Grid container p={5}>
                <Grid item xs={12}>
                  <Typography component={'span'} variant="h5">
                    Update Fitting
                    <Typography component={'span'}
                      sx={{ display: "block !important" }}
                      variant="caption"
                    >
                      Update Fitting and necessary information from here
                    </Typography>
                  </Typography>
                </Grid>

                <Grid item xs={12} mt={5}>
                  <form
                    className="form"
                    onSubmit={(e) => { confirmBox(e, handleUpdateFitting) }}
                    id="myForm"
                    enctype="multipart/form-data"
                    method="post"
                  >
                    <TextField sx={{ mb: 2 }}
                      size="small"
                      fullWidth
                      // required
                      id="outlined-select"
                      name="fitting_name"
                      label="Fitting Name"
                      value={changeData.fitting}
                      onChange={handleChangeData}
                      type="text"
                      helperText="Please enter your fitting "
                    />



                    <Button
                      color="primary"
                      type="submit"
                      fullWidth
                      variant="contained"
                    >
                      Update Fitting
                    </Button>
                  </form>
                </Grid>
              </Grid>
            )}
            {/* add fitting   Ends */}

            {/*  add Hinge */}

            {state.OpenBox.formType === "addHinge" && (
              <Grid container p={5}>
                <Grid item xs={12}>
                  <Typography component={'span'} variant="h5">
                    Add Hinge
                    <Typography component={'span'}
                      sx={{ display: "block !important" }}
                      variant="caption"
                    >
                      Add your Hinge and necessary information from here
                    </Typography>
                  </Typography>
                </Grid>

                <Grid item xs={12} mt={5}>
                  <form
                    className="form" onSubmit={(e) => { confirmBox(e, handleHinge) }}
                    id="myForm"
                    enctype="multipart/form-data"
                    method="post"
                  >
                    {/* <ImagePreviews text={'Please Drag and Drop the Category image'}> </ImagePreviews> */}
                    <TextField sx={{ mb: 2 }}
                      size="small"
                      fullWidth
                      // required
                      id="outlined-select"
                      name="hinge_name"
                      label="Hinge Name"
                      type="text"
                      helperText="Please enter your primary material"
                    />


                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox name="hinge_status" />}
                        label="Status (On/Off)"
                      />
                    </FormGroup>



                    <Button
                      color="primary"
                      type="submit"
                      fullWidth
                      variant="contained"
                    >
                      Add Hinge
                    </Button>
                  </form>
                </Grid>
              </Grid>
            )}
            {/* add addHinge  Ends */}

            {/*  update hinge  */}

            {state.OpenBox.formType === "update_hinge" && (
              <Grid container p={5}>
                <Grid item xs={12}>
                  <Typography component={'span'} variant="h5">
                    Update Hinge
                    <Typography component={'span'}
                      sx={{ display: "block !important" }}
                      variant="caption"
                    >
                      Update Hinge and necessary information from here
                    </Typography>
                  </Typography>
                </Grid>

                <Grid item xs={12} mt={5}>
                  <form
                    className="form" onSubmit={(e) => { confirmBox(e, handleUpdateHinge) }}
                    id="myForm"
                    enctype="multipart/form-data"
                    method="post"
                  >
                    <TextField sx={{ mb: 2 }}
                      size="small"
                      fullWidth
                      onChange={handleChangeData}
                      // required
                      id="outlined-select"
                      name="hinge_name"
                      label="Hinge Name"
                      value={changeData.hinge}
                      type="text"
                      helperText="Please enter your hinge "
                    />



                    <Button
                      color="primary"
                      type="submit"
                      fullWidth
                      variant="contained"
                    >
                      Update Hinge
                    </Button>
                  </form>
                </Grid>
              </Grid>
            )}
            {/* add hinge   Ends */}

            {/*  add Polish Material */}

            {state.OpenBox.formType === "addPolish" && (
              <Grid container p={5}>
                <Grid item xs={12}>
                  <Typography component={'span'} variant="h5">
                    Add Polish
                    <Typography component={'span'}
                      sx={{ display: "block !important" }}
                      variant="caption"
                    >
                      Add your Polish and necessary information from here
                    </Typography>
                  </Typography>
                </Grid>

                <Grid item xs={12} mt={5}>
                  <form
                    className="form" onSubmit={(e) => { confirmBox(e, handlePolish) }}
                    id="myForm"
                    enctype="multipart/form-data"
                    method="post"
                  >
                    {/* <ImagePreviews text={'Please Drag and Drop the Category image'}> </ImagePreviews> */}

                    <TextField sx={{ mb: 2 }}
                      size="small"
                      fullWidth
                      // required
                      id="outlined-select"
                      name="polish_name"
                      label="Polish Name"
                      type="text"
                      helperText="Please enter your primary material"
                    />


                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox name="polish_status" />}
                        label="Status (On/Off)"
                      />
                    </FormGroup>



                    <Button
                      color="primary"
                      type="submit"
                      fullWidth
                      variant="contained"
                    >
                      Add Polish
                    </Button>
                  </form>
                </Grid>
              </Grid>
            )}
            {/* add addPolish  Ends */}

            {/*  update Polish  */}

            {state.OpenBox.formType === "update_polish" && (
              <Grid container p={5}>
                <Grid item xs={12}>
                  <Typography component={'span'} variant="h5">
                    Update Polish
                    <Typography component={'span'}
                      sx={{ display: "block !important" }}
                      variant="caption"
                    >
                      Update Polish and necessary information from here
                    </Typography>
                  </Typography>
                </Grid>

                <Grid item xs={12} mt={5}>
                  <form
                    className="form" onSubmit={(e) => { confirmBox(e, handleUpdatePolish) }}
                    id="myForm"
                    enctype="multipart/form-data"
                    method="post"
                  >
                    {/* <ImagePreviews text={'Please Drag and Drop the Category image'}> </ImagePreviews> */}

                    <TextField sx={{ mb: 2 }}
                      size="small"
                      fullWidth
                      onChange={handleChangeData}
                      // required
                      id="outlined-select"
                      name="polish_name"
                      label="Polish Name"
                      type="text"
                      value={changeData.polish}
                      helperText="Please enter your polish"
                    />

                    {/*
                    <FormGroup>
                      <FormControlLabel control={<Checkbox name='polish_status' />} label="Status (On/Off)" />
                    </FormGroup> */}



                    <Button
                      color="primary"
                      type="submit"
                      fullWidth
                      variant="contained"
                    >
                      Update Polish
                    </Button>
                  </form>
                </Grid>
              </Grid>
            )}
            {/* add update polish  Ends */}

            {/*  update blog  */}

            {state.OpenBox.formType === "update_blog" && (
              <Grid container p={5}>
                <Grid item xs={12}>
                  <Typography component={'span'} variant="h5">
                    Update Blog
                    <Typography component={'span'}
                      sx={{ display: "block !important" }}
                      variant="caption"
                    >
                      Update your blog and necessary information from here
                    </Typography>
                  </Typography>
                </Grid>

                <Grid item xs={12} mt={5}>
                  <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={open}
                    onClose={() => {
                      setOpen(false);
                    }}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                      timeout: 500,
                    }}
                  >
                    <Fade in={open}>
                      <Box sx={style}>
                        <form
                          className="form"
                          id="myForm" onSubmit={(e) => { confirmBox(e, handleUpload) }}
                          enctype="multipart/form-data"
                          method="post"
                        >
                          <FormLabel id="demo-radio-buttons-group-label">
                            Get Image Url
                          </FormLabel>

                          <ImagePreviews
                            text={"Please Drag and Drop the Image "}
                          >
                            {" "}
                          </ImagePreviews>

                          <TextField sx={{ mb: 2 }}
                            size="small"
                            fullWidth
                            disabled
                            id="outlined-select"
                            label="Image URL"
                            value={url || ""}
                          />

                          <Button
                            color="primary"
                            type="submit"
                            variant="contained"
                          >
                            Get Url
                          </Button>
                        </form>
                      </Box>
                    </Fade>
                  </Modal>

                  <form
                    className="form"
                    id="myForm" onSubmit={(e) => { confirmBox(e, handleUpdateBlog) }}
                    enctype="multipart/form-data"
                    method="post"
                  >
                    <FeaturesPreviews
                      text={"Please Drag and Drop the Card Image "}
                    >
                      {" "}
                    </FeaturesPreviews>

                    <TextField sx={{ mb: 2 }}
                      size="small"
                      fullWidth
                      // required
                      id="outlined-select"
                      name="seo_title"
                      label="SEO Title"
                      value={changeData.seo_title}
                      onChange={handleChangeData}
                    />
                    <TextField sx={{ mb: 2 }}
                      size="small"
                      fullWidth
                      // required
                      id="outlined-select"
                      name="seo_description"
                      label="SEO Description"
                      value={changeData.seo_description}
                      onChange={handleChangeData}
                    />

                    <TextField sx={{ mb: 2 }}
                      size="small"
                      fullWidth
                      // required
                      id="outlined-select"
                      value={changeData.card_description}
                      onChange={handleChangeData}
                      name="card_description"
                      label="Card Description"
                    />

                    <TextField sx={{ mb: 2 }}
                      size="small"
                      fullWidth
                      // required
                      id="outlined-select"
                      value={changeData.title}
                      onChange={handleChangeData}
                      name="title"
                      label="Blog Title"
                    />
                    {/* product description  */}

                    <Editor
                      apiKey="nrxcqobhboeugucjonpg61xo1m65hn8qjxwayuhvqfjzb6j4"
                      initialValue={`${changeData.description}`}
                      onInit={(event, editor) => (editorRef.current = editor)}
                      init={{
                        height: 400,
                        menubar: true,
                        plugins: "image code",
                      }}
                    />

                    <div className="getLinkButton">
                      <TextField sx={{ mb: 2 }}
                        size="small"
                        disabled
                        fullWidth
                        id="outlined-select"
                        label="Image URL"
                        value={url}
                      />
                      <Button
                        color="primary"
                        onClick={() => {
                          setOpen(true);
                        }}
                        variant="contained"
                      >
                        Upload
                      </Button>
                    </div>

                    <Button
                      color="primary"
                      type="submit"
                      fullWidth
                      variant="contained"
                    >
                      Update Blog
                    </Button>
                  </form>
                </Grid>
              </Grid>
            )}
            {/* add update blog  Ends */}

            {/*   Add BLog */}

            {state.OpenBox.formType === "addBlog" && (
              <Grid container p={5}>
                <Grid item xs={12}>
                  <Typography component={'span'} variant="h5">
                    Add Blog
                    <Typography component={'span'}
                      sx={{ display: "block !important" }}
                      variant="caption"
                    >
                      Add your blog and necessary information from here
                    </Typography>
                  </Typography>
                </Grid>

                <Grid item xs={12} mt={5}>
                  <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={open}
                    onClose={() => {
                      setOpen(false);
                    }}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                      timeout: 500,
                    }}
                  >
                    <Fade in={open}>
                      <Box sx={style}>
                        <form
                          className="form"
                          id="myForm" onSubmit={(e) => { confirmBox(e, handleUpload) }}
                          enctype="multipart/form-data"
                          method="post"
                        >
                          <FormLabel id="demo-radio-buttons-group-label">
                            Get Image Url
                          </FormLabel>

                          <ImagePreviews
                            text={"Please Drag and Drop the Image "}
                          >
                            {" "}
                          </ImagePreviews>

                          <TextField sx={{ mb: 2 }}
                            size="small"
                            fullWidth
                            disabled
                            id="outlined-select"
                            label="Image URL"
                            value={url || ""}
                          />

                          <Button
                            color="primary"
                            type="submit"
                            variant="contained"
                          >
                            Get Url
                          </Button>
                        </form>
                      </Box>
                    </Fade>
                  </Modal>

                  <form
                    className="form"
                    id="myForm" onSubmit={(e) => { confirmBox(e, handleAddBlog) }}
                    enctype="multipart/form-data"
                    method="post"
                  >
                    <FormLabel id="demo-radio-buttons-group-label">
                      Add Blog Description
                    </FormLabel>

                    <FeaturesPreviews
                      text={"Please Drag and Drop the Card Image "}
                    >
                      {" "}
                    </FeaturesPreviews>

                    <TextField sx={{ mb: 2 }}
                      size="small"
                      fullWidth
                      // required
                      id="outlined-select"
                      name="seo_title"
                      label="SEO Title"
                    />
                    <TextField sx={{ mb: 2 }}
                      size="small"
                      fullWidth
                      // required
                      id="outlined-select"
                      name="seo_description"
                      label="SEO Description"
                    />
                    <TextField sx={{ mb: 2 }}
                      size="small"
                      fullWidth
                      // required
                      id="outlined-select"
                      name="card_description"
                      label="Card Description"
                    />

                    <TextField sx={{ mb: 2 }}
                      size="small"
                      fullWidth
                      // required
                      id="outlined-select"
                      name="title"
                      label="Blog Title"
                    />
                    {/* product description  */}
                    <Editor
                      apiKey="nrxcqobhboeugucjonpg61xo1m65hn8qjxwayuhvqfjzb6j4"
                      initialValue="<p>Write Blog Here!!!</p>"
                      onInit={(event, editor) => (editorRef.current = editor)}
                      init={{
                        height: 400,
                        menubar: true,
                        plugins: "image code",
                      }}
                    />

                    <div className="getLinkButton">
                      <TextField sx={{ mb: 2 }}
                        size="small"
                        disabled
                        fullWidth
                        id="outlined-select"
                        label="Image URL"
                        value={url}
                      />
                      <Button
                        color="primary"
                        onClick={() => {
                          setOpen(true);
                        }}
                        variant="contained"
                      >
                        Upload
                      </Button>
                    </div>

                    <Button
                      color="primary"
                      type="submit"
                      fullWidth
                      variant="contained"
                    >
                      Add Blog
                    </Button>
                  </form>
                </Grid>
              </Grid>
            )}

            {/* Add Blog Ends */}

            {/*   Add Gallery */}

            {state.OpenBox.formType === "addGallery" && (
              <Grid container p={5}>
                <Grid item xs={12}>
                  <Typography component={'span'} variant="h5">
                    Add Images
                    <Typography component={'span'}
                      sx={{ display: "block !important" }}
                      variant="caption"
                    >
                      Add your product images and necessary information from
                      here
                    </Typography>
                  </Typography>
                </Grid>

                <Grid item xs={12} mt={5}>
                  <form
                    className="form"
                    id="myForm" onSubmit={(e) => { confirmBox(e, handleAddImage) }}
                    enctype="multipart/form-data"
                    method="post"
                  >
                    <FormLabel id="demo-radio-buttons-group-label">
                      Product Image
                    </FormLabel>

                    <ProductsPreviews
                      text={"Please Drag and Drop the Product Image "}
                    >
                      {" "}
                    </ProductsPreviews>

                    <TextField sx={{ mb: 2 }}
                      size="small"
                      fullWidth
                      // required
                      id="outlined-select"
                      name="SKU"
                      label="Product SKU"
                      helperText="Please enter the product SKU where you want to add the image"
                    />

                    <Button
                      color="primary"
                      type="submit"
                      fullWidth
                      variant="contained"
                    >
                      Add Images
                    </Button>
                  </form>
                </Grid>
              </Grid>
            )}

            {/* Add Gallery Ends */}

            {/*  update Gallery  */}

            {state.OpenBox.formType === "update_gallery" && (
              <Grid container p={5}>
                <Grid item xs={12}>
                  <Typography component={'span'} variant="h5">
                    Update Gallery
                    <Typography component={'span'}
                      sx={{ display: "block !important" }}
                      variant="caption"
                    >
                      Update Gallery and necessary information from here
                    </Typography>
                  </Typography>
                </Grid>

                <Grid item xs={12} mt={5}>
                  <form
                    className="form" onSubmit={(e) => { confirmBox(e, handleUpdateGallery) }}
                    id="myForm"
                    enctype="multipart/form-data"
                    method="post"
                  >
                    <FormLabel id="demo-radio-buttons-group-label">
                      Product Image
                    </FormLabel>

                    <ImagePreviews
                      text={"Please Drag and Drop the Product Image "}
                    >
                      {" "}
                    </ImagePreviews>



                    <Button
                      color="primary"
                      type="submit"
                      fullWidth
                      variant="contained"
                    >
                      Update Gallery
                    </Button>
                  </form>
                </Grid>
              </Grid>
            )}
            {/* add update Gallery  Ends */}

            {/*  add subCategory */}

            {state.OpenBox.formType === "subcategory" && (
              <Grid container p={5}>
                <Grid item xs={12}>
                  <Typography component={'span'} variant="h5">
                    Add Sub Category
                    <Typography component={'span'}
                      sx={{ display: "block !important" }}
                      variant="caption"
                    >
                      Add your sub category and necessary information from here
                    </Typography>
                  </Typography>
                </Grid>

                <Grid item xs={12} mt={5}>
                  <form
                    className="form" onSubmit={(e) => { confirmBox(e, handleSubCategories) }}
                    id="myForm"
                    enctype="multipart/form-data"
                    method="post"
                  >
                    {/* <ImagePreviews text={'Please Drag and Drop the Category image'}> </ImagePreviews> */}

                    <TextField sx={{ mb: 2 }}
                      size="small"
                      fullWidth
                      // required
                      id="outlined-select"
                      select
                      name="category_id"
                      label="Category"
                      value={cat}
                      multiple
                      onChange={handleChange}
                      helperText="Please select your category"
                    >
                      {category.map(
                        (option) =>
                          option.category_status && (
                            <MenuItem key={option._id} value={option._id}>
                              {option.category_name}
                            </MenuItem>
                          )
                      )}
                    </TextField>

                    <TextField sx={{ mb: 2 }}
                      size="small"
                      fullWidth
                      // required
                      id="outlined-select"
                      name="sub_category_name"
                      label="Sub Category"
                      type="text"
                      helperText="Please enter your sub category"
                    />


                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox name="sub_category_status" />}
                        label="Status (On/Off)"
                      />
                    </FormGroup>



                    <Button
                      color="primary"
                      type="submit"
                      fullWidth
                      variant="contained"
                    >
                      Add Sub Category
                    </Button>
                  </form>
                </Grid>
              </Grid>
            )}
            {/* add sebCategory Ends */}

            {/*update subCategory */}

            {state.OpenBox.formType === "update_Subcategory" && (
              <Grid container p={5}>
                <Grid item xs={12}>
                  <Typography component={'span'} variant="h5">
                    Update Sub Category
                    <Typography component={'span'}
                      sx={{ display: "block !important" }}
                      variant="caption"
                    >
                      Add your update sub category and necessary information
                      from here
                    </Typography>
                  </Typography>
                </Grid>

                <Grid item xs={12} mt={5}>
                  <form
                    className="form" onSubmit={(e) => { confirmBox(e, handleUpdateSubCategories) }}
                    id="myForm"
                    enctype="multipart/form-data"
                    method="post"
                  >
                    {/* <ImagePreviews text={'Please Drag and Drop the Category image'}> </ImagePreviews> */}

                    <FormLabel id="demo-radio-buttons-group-label">
                      Category
                    </FormLabel>

                    <TextField sx={{ mb: 2 }}
                      size="small"
                      fullWidth
                      id="outlined-select"
                      select
                      name="category_id"
                      displayEmpty
                      value={cat}
                      multiple
                      onChange={handleChange}
                      helperText="Please select your category"
                    >
                      {category.map(
                        (option) =>
                          option.category_status && (
                            <MenuItem key={option._id} value={option._id}>
                              {option.category_name}
                            </MenuItem>
                          )
                      )}
                    </TextField>

                    <TextField sx={{ mb: 2 }}
                      size="small"
                      fullWidth
                      id="outlined-select"
                      name="sub_category_name"
                      label="Sub Category"
                      value={changeData.sub_category_name || ''}
                      onChange={handleProductFelids}
                      type="text"
                      helperText="Please enter your sub category"
                    />



                    <Button
                      color="primary"
                      type="submit"
                      fullWidth
                      variant="contained"
                    >
                      Add Sub Category
                    </Button>
                  </form>
                </Grid>
              </Grid>
            )}
            {/* update sebCategory Ends */}

            {/*  add Customer */}

            {state.OpenBox.formType === "add_customer" && (
              <Grid container p={5}>
                <Grid item xs={12}>
                  <Typography component={'span'} variant="h5">
                    Add Customer
                    <Typography component={'span'}
                      sx={{ display: "block !important" }}
                      variant="caption"
                    >
                      Add customer details and necessary information from here
                    </Typography>
                  </Typography>
                </Grid>

                <Grid item xs={12} mt={5}>
                  <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={open}
                    onClose={() => {
                      setOpen(false);
                    }}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                      timeout: 500,
                    }}
                  >
                    <Fade in={open}>
                      <Box sx={style}>
                        <Typography sx={{ pb: 1 }} variant='h6'>
                          Address
                        </Typography>
                        <form
                          className="form"
                          id="myForm" onSubmit={(e) => { confirmBox(e, handleAddress) }}
                          enctype="multipart/form-data"
                          method="post"
                        >

                          <TextField sx={{ mb: 1 }} size="small"
                            fullWidth
                            // required
                            id="outlined-select"
                            name="customer_name"
                            label="Name"
                            type="text"
                          />
                          <TextField sx={{ mb: 1 }} size="small"
                            fullWidth
                            // required
                            id="outlined-select"
                            name="mobile"
                            label="Mobile"
                            type="number"
                          />
                          <TextField sx={{ mb: 1 }} size="small"
                            fullWidth
                            // required
                            id="outlined-select"
                            name="pincode"
                            label="Pin Code"
                            type="number"
                          />

                          <TextField sx={{ mb: 1 }} size="small"
                            fullWidth
                            // required
                            id="outlined-select"
                            name="city"
                            label="City"
                            type="text"
                          />

                          <TextField sx={{ mb: 1 }}
                            size="small"
                            fullWidth
                            // required
                            id="outlined-select"
                            name="state"
                            label="State"
                            type="text"
                          />

                          <FormLabel id="demo-radio-buttons-group-label">
                            Address
                          </FormLabel>

                          <TextareaAutosize
                            fullWidth
                            minRows={5}
                            id="outlined-select"
                            name="address"
                            type="text"
                            placeholder="Please enter your address"
                          />

                          <FormLabel id="demo-radio-buttons-group-label">
                            Address Type
                          </FormLabel>

                          <TextField sx={{ mb: 1 }}
                            size="small"
                            fullWidth
                            id="outlined-select"
                            select
                            name="type"
                            displayEmpty
                            value={cat}
                            multiple
                            onChange={handleChange}
                            helperText="Please select your address type"
                          >
                            <MenuItem key={'home'} value={'home'}>
                              Home
                            </MenuItem>
                            <MenuItem key={'office'} value={'office'}>
                              Office
                            </MenuItem>
                            <MenuItem key={'none'} value={'none'}>
                              None
                            </MenuItem>
                          </TextField>

                          <Button
                            color="primary"
                            type="submit"
                            variant="contained"
                          >
                            Add Address
                          </Button>
                        </form>
                      </Box>
                    </Fade>
                  </Modal>

                  <form
                    className="form" onSubmit={(e) => { confirmBox(e, handleCustomer) }}
                    id="myForm"
                    enctype="multipart/form-data"
                    method="post"
                  >
                    <ImagePreviews
                      text={"Please Drag and Drop the Profile Picture"}
                    >
                      {" "}
                    </ImagePreviews>

                    <TextField sx={{ mb: 2 }}
                      size="small"
                      fullWidth
                      // required
                      id="outlined-select"
                      name="username"
                      label="Customer Name"
                      type="text"
                    />

                    <TextField sx={{ mb: 2 }}
                      size="small"
                      fullWidth
                      // required
                      id="outlined-select"
                      name="email"
                      label="Customer Email"
                      type="text"
                    />
                    <TextField sx={{ mb: 2 }}
                      size="small"
                      fullWidth
                      // required
                      id="outlined-select"
                      name="mobile"
                      label="Contact Number"
                      type="number"
                    />
                    <TextField sx={{ mb: 2 }}
                      size="small"
                      fullWidth
                      // required
                      id="outlined-select"
                      name="password"
                      label="Password"
                      type="password"
                    />

                    <FormLabel id="demo-radio-buttons-group-label">
                      Shipping Address
                    </FormLabel>
                    <Grid container >
                      {
                        address && address.map((item) => {
                          return <Grid item xs={3}>
                            <Box sx={{
                              overflowWrap: 'break-word',
                              border: '2px solid #a52a2a80',
                              borderStyle: 'dashed',
                              p: 1,
                              ml: 1,
                              mr: 1,
                              width: '130px',
                              height: '150px',
                              overflow: 'hidden'
                            }}>
                              <Typography variant='caption'>{item.shipping}</Typography></Box>
                          </Grid>
                        })
                      }
                      <Grid item xs={3}>
                        <Button variant='outlined' sx={{ width: '20%' }} onClick={() => { setOpen(true) }}><AddIcon /></Button>
                      </Grid>
                    </Grid>



                    <Button
                      color="primary"
                      type="submit"
                      fullWidth
                      variant="contained"
                    >
                      Add Customer
                    </Button>
                  </form>
                </Grid>
              </Grid>
            )}
            {/* add Customer Ends */}
            {/*  update Customer */}

            {state.OpenBox.formType === "update_customer" && (
              <Grid container p={5}>
                <Grid item xs={12}>
                  <Typography component={'span'} variant="h5">
                    Update Customer
                    <Typography component={'span'}
                      sx={{ display: "block !important" }}
                      variant="caption"
                    >
                      Update customer details and necessary information from
                      here
                    </Typography>
                  </Typography>
                </Grid>

                <Grid item xs={12} mt={5}>
                  <form
                    className="form" onSubmit={(e) => { confirmBox(e, handleUpdateCustomer) }}
                    id="myForm"
                    enctype="multipart/form-data"
                    method="post"
                  >
                    <ImagePreviews
                      text={"Please Drag and Drop the Profile Picture"}
                    >
                      {" "}
                    </ImagePreviews>

                    <TextField sx={{ mb: 2 }}
                      size="small"
                      fullWidth
                      value={changeData.username}
                      onChange={handleProductFelids}
                      id="outlined-select"
                      name="username"
                      label="Customer Name"
                      type="text"
                    />

                    <TextField sx={{ mb: 2 }}
                      size="small"
                      fullWidth
                      value={changeData.email}
                      onChange={handleProductFelids}
                      id="outlined-select"
                      name="email"
                      label="Customer Email"
                      type="text"
                    />
                    <TextField sx={{ mb: 2 }}
                      size="small"
                      fullWidth
                      value={changeData.mobile}
                      onChange={handleProductFelids}
                      id="outlined-select"
                      name="mobile"
                      label="Contact Number"
                      type="number"
                    />
                    {/*  <TextField sx = {{mb : 2}} size="small"
                      fullWidth
                      value={changeData.pincode}
                      onChange={handleProductFelids}
                      id="outlined-select"
                      name="pincode"
                      label="Pin-Code"
                      type="number"
                    /> */}
                    <TextField sx={{ mb: 2 }}
                      size="small"
                      fullWidth
                      value={changeData.city}
                      onChange={handleProductFelids}
                      id="outlined-select"
                      name="city"
                      label="City"
                      type="text"
                    />
                    <TextField sx={{ mb: 2 }}
                      size="small"
                      fullWidth
                      value={changeData.state}
                      onChange={handleProductFelids}
                      id="outlined-select"
                      name="state"
                      label="state"
                      type="text"
                    />
                    {/*  <TextField sx = {{mb : 2}} size="small"
                      fullWidth
                      value={changeData.landmark}
                      onChange={handleProductFelids}
                      id="outlined-select"
                      name="landmark"
                      label="Landmark"
                      type="text"
                      helperText = 'Place nearby the main building.'
                    /> */}

                    <FormLabel id="demo-radio-buttons-group-label">
                      Shipping Address
                    </FormLabel>

                    <TextareaAutosize
                      fullWidth
                      minRows={5}
                      value={changeData.shipping || ""}
                      onChange={handleProductFelids}
                      id="outlined-select"
                      name="shipping"
                      type="text"
                      helperText="Please enter your primary material description"
                    />



                    <Button
                      color="primary"
                      type="submit"
                      fullWidth
                      variant="contained"
                    >
                      Update Customer
                    </Button>
                  </form>
                </Grid>
              </Grid>
            )}
            {/* update Customer Ends */}

            {/* add order */}

            {state.OpenBox.formType === "add_order" && (
              <Grid container p={5}>
                <Grid item xs={12}>
                  <Typography component={'span'} variant="h5">
                    Add Order
                    <Typography component={'span'}
                      sx={{ display: "block !important" }}
                      variant="caption"
                    >
                      Add order details and necessary information from here
                    </Typography>
                  </Typography>
                </Grid>

                <Grid item xs={12} mt={5}>
                  <form
                    className="form" onSubmit={(e) => { confirmBox(e, handleOrder) }}
                    id="myForm"
                    enctype="multipart/form-data"
                    method="post"
                  >
                    <TextField sx={{ mb: 2 }}
                      size="small"
                      fullWidth
                      disabled
                      id="outlined-select"
                      value={SKU || ""}
                      name="OID"
                      label="Order ID"
                      type="text"
                      helperText="Search the customer for details"
                    />

                    <InputLabel id="demo-multiple-checkbox-label">
                      Product
                    </InputLabel>
                    <Select sx={{ mb: 2 }}
                      multiple
                      fullWidth
                      value={changeData.product_array}
                      name="product_array"
                      onChange={handleProductFelids}
                      renderValue={(selected) => selected.join(", ")}
                    >
                      {SKUCatalog.map((option) => (
                        <MenuItem key={option._id} value={option.SKU}>
                          <Checkbox
                            checked={
                              changeData.product_array.indexOf(option.SKU) > -1
                            }
                          />
                          <ListItemText primary={option.SKU} />
                        </MenuItem>
                      ))}
                    </Select>

                    <Box>
                      <TextField sx={{ mb: 2 }}
                        size="small"
                        fullWidth
                        // required
                        id="outlined-select"
                        onChange={handleProductFelids}
                        value={changeData.searchCustomer || ""}
                        name="searchCustomer"
                        // onChange = {loadList}
                        label="Customer mobile number..."
                        type="text"
                        helperText="Search the customer for details"
                      />

                      <Box
                        sx={{
                          boxShadow: 2,
                          position: "fixed",
                          bgcolor: "white",
                          zIndex: 2,
                          width: "88%",
                          display:
                            changeData.searchCustomer !== "" &&
                              changeData.searchCustomer !== changeData.display
                              ? "block"
                              : "none",
                        }}
                      >
                        {changeData.searchCustomer !== "" &&
                          changeData.searchCustomer !== changeData.display &&
                          customer.map((row) => {
                            return row.mobile
                              .toString()
                              .includes(changeData.searchCustomer) ||
                              row.username
                                .toLowerCase()
                                .includes(
                                  changeData.searchCustomer.toLowerCase()
                                ) ? (
                              <MenuItem
                                onClick={() => {
                                  setData({
                                    ...changeData,
                                    searchCustomer: row.mobile,
                                    display: row.mobile,
                                  });
                                }}
                                key={row.mobile}
                              >
                                {row.username} ({row.mobile})
                              </MenuItem>
                            ) : (console.log()
                            );
                          })}
                      </Box>
                    </Box>

                    <TextField sx={{ mb: 2 }}
                      size="small"
                      fullWidth
                      // required
                      id="outlined-select"
                      name="paid_amount"
                      label="Paid Amount"
                      type="number"
                    />

                    <TextField sx={{ mb: 2 }}
                      size="small"
                      fullWidth
                      // required
                      id="outlined-select"
                      name="total_amount"
                      label="Total Amount"
                      type="number"
                    />

                    {changeData.searchCustomer === "" && (
                      <>
                        {" "}
                        <TextField sx={{ mb: 2 }}
                          size="small"
                          fullWidth
                          required
                          id="outlined-select"
                          name="customer_name"
                          label="Customer Name"
                          type="text"
                        />
                        <TextField sx={{ mb: 2 }}
                          size="small"
                          fullWidth
                          required
                          id="outlined-select"
                          name="customer_email"
                          label="Customer Email"
                          type="text"
                        />
                        <TextField sx={{ mb: 2 }}
                          size="small"
                          fullWidth
                          required
                          id="outlined-select"
                          name="customer_mobile"
                          label="Contact Number"
                          type="number"
                        />
                        <TextField sx={{ mb: 2 }}
                          size="small"
                          fullWidth
                          required
                          id="outlined-select"
                          name="city"
                          label="City"
                          type="text"
                        />
                        <TextField sx={{ mb: 2 }}
                          size="small"
                          fullWidth
                          required
                          id="outlined-select"
                          name="state"
                          label="state"
                          type="text"
                        />
                        <FormLabel id="demo-radio-buttons-group-label">
                          Shipping Address
                        </FormLabel>
                        <TextareaAutosize
                          fullWidth
                          minRows={5}
                          id="outlined-select"
                          name="shipping"
                          type="text"
                          helperText="Please enter your primary material description"
                        />
                      </>
                    )}



                    <Button
                      color="primary"
                      type="submit"
                      fullWidth
                      variant="contained"
                    >
                      Add Order
                    </Button>
                  </form>
                </Grid>
              </Grid>
            )}

            {/* update order */}

            {/*  add stock */}

            {state.OpenBox.formType === "addStock" && (
              <Grid container p={5}>
                <Grid item xs={12}>
                  <Typography component={'span'} variant="h5">
                    Add Stock
                    <Typography component={'span'}
                      sx={{ display: "block !important" }}
                      variant="caption"
                    >
                      Add your product stock and necessary information from
                      here
                    </Typography>
                  </Typography>
                </Grid>

                <Grid item xs={12} mt={5}>
                  <form
                    className="form" onSubmit={(e) => { confirmBox(e, handleAddStock) }}
                    id="myForm"
                    enctype="multipart/form-data"
                    method="post"
                  >
                    <TextField sx={{ mb: 2 }}
                      fullWidth
                      id="outlined-select"
                      select
                      name="warehouse"
                      label="Select Warehouse..."
                      value={changeData.warehouse || ''}
                      onChange={handleProductFelids}
                      multiple
                    >
                      {warehouse.map(
                        (option) =>
                          <MenuItem
                            key={option.value}
                            value={option.value}
                          >
                            {option.value}
                          </MenuItem>
                      )}
                      <MenuItem key={"none"} value="None">
                        {"None"}
                      </MenuItem>
                    </TextField>

                    <TextField sx={{ mb: 2 }}
                      size="small"
                      fullWidth
                      id="outlined-select"
                      name="product_id"
                      value={changeData.product_id}
                      onChange={handleProductFelids}
                      label="SKU"
                      type="text"
                      helperText="Please enter your product_id (SKU)"
                    />

                    <TextField sx={{ mb: 2 }}
                      size="small"
                      fullWidth
                      id="outlined-select"
                      name="stock"
                      value={changeData.stock}
                      onChange={handleProductFelids}
                      label="Stock Size"
                      type="Number"
                      helperText="Please enter your stock size"
                    />




                    <Button
                      color="primary"
                      type="submit"
                      fullWidth
                      variant="contained"
                    >
                      Add Stock
                    </Button>
                  </form>
                </Grid>
              </Grid>
            )}
            {/* add Stock Ends */}

            {/*  update stock */}

            {state.OpenBox.formType === "update_Stock" && (
              <Grid container p={5}>
                <Grid item xs={12}>
                  <Typography component={'span'} variant="h5">
                    Update Stock
                    <Typography component={'span'}
                      sx={{ display: "block !important" }}
                      variant="caption"
                    >
                      Update your product stock and necessary information from
                      here
                    </Typography>
                  </Typography>
                </Grid>

                <Grid item xs={12} mt={5}>
                  <form
                    className="form"
                    onSubmit={(e) => { confirmBox(e, handleUpdateStock) }}
                    id="myForm"
                    enctype="multipart/form-data"
                    method="post"
                  >
                    <TextField sx={{ mb: 2 }}
                      fullWidth
                      id="outlined-select"
                      select
                      disabled
                      name="warehouse"
                      label="Select Warehouse..."
                      value={changeData.warehouse || ''}
                      multiple
                    >
                      {warehouse.map(
                        (option) =>
                          <MenuItem
                            key={option.value}
                            value={option.value}
                          >
                            {option.value}
                          </MenuItem>
                      )}
                      <MenuItem key={"none"} value="None">
                        {"None"}
                      </MenuItem>
                    </TextField>

                    <TextField sx={{ mb: 2 }}
                      size="small"
                      fullWidth
                      id="outlined-select"
                      disabled
                      name="product_id"
                      value={changeData.product_id}
                      onChange={handleProductFelids}
                      label="SKU"
                      type="text"
                      helperText="Please enter your product_id (SKU)"
                    />

                    <TextField sx={{ mb: 2 }}
                      size="small"
                      fullWidth
                      id="outlined-select"
                      name="stock"
                      value={changeData.stock}
                      onChange={handleProductFelids}
                      label="Stock Size"
                      type="Number"
                      helperText="Please enter your stock size"
                    />




                    <Button
                      color="primary"
                      type="submit"
                      fullWidth
                      variant="contained"
                    >
                      Update Stock
                    </Button>
                  </form>
                </Grid>
              </Grid>
            )}
            {/* update Stock Ends */}


            {/* add Hardware */}

            {state.OpenBox.formType === "hardware" && (
              <Grid container p={5} className="productPadding">
                <Grid item xs={12}>
                  <Typography component={'span'} variant="h5">
                    Add Hardware
                    <Typography component={'span'}
                      sx={{ display: "block !important" }}
                      variant="caption"
                    >
                      Add your hardware and necessary information from here
                    </Typography>
                  </Typography>
                </Grid>

                <Grid item xs={12} mt={5}>
                  <form
                    className="form"
                    id="myForm"
                    onSubmit={(e) => { confirmBox(e, handleHardware) }}
                    enctype="multipart/form-data"
                    method="post"
                  >
                    <Stepper
                      className="stepper"
                      activeStep={activeStep}
                      orientation="vertical"
                    >
                      {/* // Specification */}
                      <Step>
                        <StepLabel>Specifications</StepLabel>
                        <StepContent className="stepContent">
                          <Box className="fields">
                            {" "}
                            <Box className="stepAction">
                              <Button
                                variant="outlined"
                                size="small"
                                disabled={activeStep === 0}
                                onClick={handleBackStep}
                              >
                                Back
                              </Button>
                              <Button
                                variant="contained"
                                size="small"
                                disabled={activeStep === 6}
                                onClick={handleNextStep}
                              >
                                Continue
                              </Button>
                            </Box > <br />

                            <TextField sx={{ mb: 2 }}
                              size="small"
                              fullWidth
                              disabled
                              id="fullWidth"
                              label="SKU"
                              type="text"
                              variant="outlined"
                              name="SKU"
                              value={SKU || ''}
                            />

                            <TextField sx={{ mb: 2 }}
                              size="small"
                              fullWidth
                              // autoComplete={false}
                              id="fullWidth"
                              // required
                              label="Title"
                              type="text"
                              variant="outlined"
                              name="title"
                              value={changeData.title}
                              onChange={handleProductFelids}
                            />


                            <TextField sx={{ mb: 2 }}
                              size="small"
                              fullWidth
                              // required
                              id="outlined-select"
                              select
                              disabled
                              name="category_name"
                              label="Category"
                              value={changeData.category_name || ''}
                              multiple
                              onChange={handleProductFelids}
                              helperText="Please select your category"
                            >
                              {category.map(
                                (option) =>
                                  option.category_status && (
                                    <MenuItem
                                      key={option._id}
                                      value={option._id}
                                    >
                                      {option.category_name}
                                    </MenuItem>
                                  )
                              )}
                              <MenuItem key={"none"} value="None">
                                {"None"}
                              </MenuItem>
                            </TextField>

                            <TextField sx={{ mb: 2 }}
                              size="small"
                              fullWidth
                              // required
                              id="outlined-select"
                              select
                              name="sub_category_name"
                              label="Sub Category"
                              multiple
                              value={changeData.sub_category_name}
                              onChange={handleProductFelids}
                              helperText="Please select your sub category"
                            >
                              {subCategory.map(
                                (option) =>
                                  changeData.category_name ===
                                  option.category_id && (
                                    <MenuItem
                                      key={option.value}
                                      value={option._id}
                                    >
                                      {option.sub_category_name}
                                    </MenuItem>
                                  )
                              )}
                              <MenuItem key={"none"} value="None">
                                {"None"}
                              </MenuItem>
                            </TextField>


                            <TextField sx={{ mb: 2 }}
                              size="small"
                              fullWidth
                              // autoComplete={false}
                              id="fullWidth"
                              // required
                              label="Showroom Price"
                              type="number"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    ₹
                                  </InputAdornment>
                                ),
                              }}
                              variant="outlined"
                              name="showroom_price"
                              value={changeData.showroom_price}
                              onChange={handleProductFelids}
                            />




                            <TextField sx={{ mb: 2 }}
                              size="small"
                              fullWidth
                              // disabled
                              // autoComplete={false}
                              id="fullWidth"
                              label="Selling Price"
                              type="number"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    ₹
                                  </InputAdornment>
                                ),
                              }}
                              value={
                                // changeData.MRP > 0 &&
                                //   changeData.discount_limit > 0
                                //   ? (changeData.selling_price =
                                //     changeData.MRP -
                                //     (changeData.MRP / 100) *
                                //     changeData.discount_limit)
                                //   : 0
                                changeData.selling_price
                              }
                              onChange={handleProductFelids}
                              variant="outlined"
                              name="selling_price"
                            />



                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={changeData.status}
                                  onChange={handleProductFelids}
                                  name="status"
                                  helperText="Check it if want it on mobile."
                                />
                              }
                              label="Show On Website"
                            />

                          </Box >
                          <Box className="stepAction">
                            <Button
                              variant="outlined"
                              size="small"
                              disabled={activeStep === 0}
                              onClick={handleBackStep}
                            >
                              Back
                            </Button>
                            <Button
                              variant="contained"
                              size="small"
                              disabled={activeStep === 6}
                              onClick={handleNextStep}
                            >
                              Continue
                            </Button>
                          </Box>
                        </StepContent>
                      </Step>
                      {/* // Specification Ends*/}

                      {/* Images */}
                      <Step>
                        <StepLabel>Images</StepLabel>
                        <StepContent className="stepContent">
                          <Box className="fields">
                            {" "}
                            <Box className="stepAction">
                              <Button
                                variant="outlined"
                                size="small"
                                disabled={activeStep === 0}
                                onClick={handleBackStep}
                              >
                                Back
                              </Button>
                              <Button
                                variant="contained"
                                size="small"
                                disabled={activeStep === 6}
                                onClick={handleNextStep}
                              >
                                Continue
                              </Button>
                            </Box > <br />

                            {/* <AcceptMaxFiles className="dorpContainer"/> */}
                            <FormLabel id="demo-radio-buttons-group-label">
                              Hardware Images
                            </FormLabel>
                            <ProductsPreviews
                              text={"Please Drag and Drop the hardware images"}
                            ></ProductsPreviews>

                          </Box >
                          <Box className="stepAction">
                            <Button
                              variant="outlined"
                              size="small"
                              disabled={activeStep === 0}
                              onClick={handleBackStep}
                            >
                              Back
                            </Button>
                            <Button
                              variant="contained"
                              size="small"
                              disabled={activeStep === 6}
                              onClick={handleNextStep}
                            >
                              Continue
                            </Button>
                          </Box>
                        </StepContent>
                      </Step>
                      {/* Images End */}


                      {/* Inventory & Shipping */}
                      <Step>
                        <StepLabel>Inventory & Shipping</StepLabel>
                        <StepContent className="stepContent">
                          <Box className="fields">
                            {" "}
                            <Box className="stepAction">
                              <Button
                                variant="outlined"
                                size="small"
                                disabled={activeStep === 0}
                                onClick={handleBackStep}
                              >
                                Back
                              </Button>
                              <Button
                                variant="contained"
                                size="small"
                                disabled={activeStep === 2}
                                onClick={handleNextStep}
                              >
                                Continue
                              </Button>
                            </Box > <br />

                            <FormGroup>
                              <FormLabel id="demo-radio-buttons-group-label">
                                Return & Payment Policy
                              </FormLabel>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={changeData.COD}
                                    onChange={handleProductFelids}
                                    name="COD"
                                  />
                                }
                                label="COD Available"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={changeData.returnable}
                                    onChange={handleProductFelids}
                                    name="returnable"
                                  />
                                }
                                label="Return Item"
                              />
                            </FormGroup>
                            {changeData.returnable && (
                              <>
                                <Typography component={'span'} variant="Caption">
                                  {" "}
                                  Return in {changeData.returnDays} Days
                                </Typography>
                                <Slider
                                  aria-label="Return Days"
                                  defaultValue={0}
                                  size="small"
                                  name="returnDays"
                                  value={changeData.returnDays}
                                  onChange={handleProductFelids}
                                  helperText="Please select your return days"
                                  valueLabelDisplay="auto"
                                />
                              </>
                            )}

                            <Typography component={'span'} variant="Caption">
                              {" "}
                              Polish in {changeData.polish_time} Days
                            </Typography>
                            <Slider
                              aria-label="Construction Days"
                              defaultValue={0}
                              size="small"
                              valueLabelDisplay="auto"
                              name="polish_time"
                              value={changeData.polish_time}
                              onChange={handleProductFelids}
                              helperText="Please select your polish time"
                            />

                            <Typography component={'span'} variant="Caption">
                              {" "}
                              Manufactured in {
                                changeData.manufacturing_time
                              }{" "}
                              Days
                            </Typography>
                            <Slider
                              aria-label="Construction Days"
                              defaultValue={0}
                              size="small"
                              valueLabelDisplay="auto"
                              name="manufacturing_time"
                              value={changeData.manufacturing_time}
                              onChange={handleProductFelids}
                              helperText="Please select your manufacturing time"
                            />

                            <InputLabel id="demo-multiple-checkbox-label">Stock Warehouse</InputLabel>
                            <Select sx={{ mb: 2 }}
                              multiple
                              fullWidth
                              value={changeData.warehouse}
                              name="warehouse"
                              onChange={handleProductFelids}
                              renderValue={(selected) => selected.join(', ')}
                            >
                              {warehouse.map((option) => (
                                <MenuItem key={option.label} value={option.value}>
                                  <Checkbox checked={changeData.warehouse.indexOf(option.value) > -1} />
                                  <ListItemText primary={option.value} />
                                </MenuItem>
                              ))}
                            </Select>

                            {

                              changeData.warehouse.map((row) => {
                                let stock; row === 'Jodhpur (Rajasthan)' ? stock = 'jodhpur_stock' : stock = 'bangalore_stock';
                                return <>

                                  <TextField sx={{ mb: 2 }}
                                    size="small"
                                    fullWidth
                                    name={stock}
                                    label={row + ' Stock'}
                                    type='number'
                                    value={changeData[stock] || ""}
                                    onChange={handleProductFelids}
                                  />
                                </>
                              })
                            }

                            <TextField sx={{ mb: 2 }}
                              size="small"
                              fullWidth
                              // autoComplete={false}
                              id="fullWidth"
                              label="Package Length"
                              type="number"
                              value={changeData.package_length}
                              onChange={handleProductFelids}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    Inch
                                  </InputAdornment>
                                ),
                              }}
                              variant="outlined"
                              name="package_length"
                              helperText="From left to right"
                            />

                            <TextField sx={{ mb: 2 }}
                              size="small"
                              fullWidth
                              // autoComplete={false}
                              id="fullWidth"
                              label="Package Breadth"
                              type="number"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    Inch
                                  </InputAdornment>
                                ),
                              }}
                              variant="outlined"
                              name="package_breadth"
                              value={changeData.package_breadth}
                              onChange={handleProductFelids}
                              helperText="From front to back"
                            />

                            <TextField sx={{ mb: 2 }}
                              size="small"
                              fullWidth
                              // autoComplete={false}
                              id="fullWidth"
                              label="Package Height"
                              type="number"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    Inch
                                  </InputAdornment>
                                ),
                              }}
                              variant="outlined"
                              name="package_height"
                              value={changeData.package_height}
                              onChange={handleProductFelids}
                              helperText="From bottom to top"
                            />

                            <Box sx={{ display: 'flex', mb: 2 }}>

                              <TextField
                                size="small"
                                sx={{ width: '85%' }}
                                id="fullWidth"
                                label="Quantity"
                                type="Number"
                                variant="outlined"
                                name="quantity"
                                value={changeData.quantity}
                                onChange={handleProductFelids}
                              />


                              <TextField
                                id="outlined-select-currency"
                                select
                                sx={{ ml: 1 }}
                                size='small'
                                label="Unit"
                                name='unit'
                                value={changeData.unit || ''}
                                onChange={handleProductFelids}
                              >
                                {unitCatalog.map((option) => (
                                  <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                  </MenuItem>
                                ))}
                              </TextField>
                            </Box>
                          </Box >
                          <Box className="stepAction">
                            <Button
                              variant="outlined"
                              size="small"
                              disabled={activeStep === 0}
                              onClick={handleBackStep}
                            >
                              Back
                            </Button>
                            <Button
                              variant="contained"
                              size="small"
                              disabled={activeStep === 2}
                              onClick={handleNextStep}
                            >
                              Continue
                            </Button>
                          </Box>
                        </StepContent>
                      </Step>
                      {/* Inventory & Shipping End */}



                    </Stepper>

                    <Button
                      color="primary"
                      type="submit"
                      fullWidth
                      variant="contained"
                    >
                      Add Hardware
                    </Button>
                  </form>
                </Grid>
              </Grid>
            )}

            {/* add Hardware Ends */}
            {/* update Hardware */}

            {state.OpenBox.formType === "update_hardware" && (
              <Grid container p={5} className="productPadding">
                <Grid item xs={12}>
                  <Typography component={'span'} variant="h5">
                    Update Hardware
                    <Typography component={'span'}
                      sx={{ display: "block !important" }}
                      variant="caption"
                    >
                      Update your hardware and necessary information from here
                    </Typography>
                  </Typography>
                </Grid>

                <Grid item xs={12} mt={5}>
                  <form
                    className="form"
                    id="myForm"
                    onSubmit={(e) => { confirmBox(e, handleUpdateHardware) }}
                    enctype="multipart/form-data"
                    method="post"
                  >
                    <Stepper
                      className="stepper"
                      activeStep={activeStep}
                      orientation="vertical"
                    >
                      {/* // Specification */}
                      <Step>
                        <StepLabel>Specifications</StepLabel>
                        <StepContent className="stepContent">
                          <Box className="fields">
                            {" "}
                            <Box className="stepAction">
                              <Button
                                variant="outlined"
                                size="small"
                                disabled={activeStep === 0}
                                onClick={handleBackStep}
                              >
                                Back
                              </Button>
                              <Button
                                variant="contained"
                                size="small"
                                disabled={activeStep === 6}
                                onClick={handleNextStep}
                              >
                                Continue
                              </Button>
                            </Box > <br />

                            <TextField sx={{ mb: 2 }}
                              size="small"
                              fullWidth
                              disabled
                              id="fullWidth"
                              label="SKU"
                              type="text"
                              variant="outlined"
                              name="SKU"
                              value={changeData.SKU || ''}
                            />

                            <TextField sx={{ mb: 2 }}
                              size="small"
                              fullWidth
                              // autoComplete={false}
                              id="fullWidth"
                              // required
                              label="Title"
                              type="text"
                              variant="outlined"
                              name="title"
                              value={changeData.title}
                              onChange={handleProductFelids}
                            />


                            <TextField sx={{ mb: 2 }}
                              size="small"
                              fullWidth
                              // required
                              id="outlined-select"
                              select
                              disabled

                              name="category_name"
                              label="Category"
                              value={changeData.category_name || ''}
                              multiple
                              onChange={handleProductFelids}
                              helperText="Please select your category"
                            >
                              {category.map(
                                (option) =>
                                  option.category_status && (
                                    <MenuItem
                                      key={option._id}
                                      value={option._id}
                                    >
                                      {option.category_name}
                                    </MenuItem>
                                  )
                              )}
                              <MenuItem key={"none"} value="None">
                                {"None"}
                              </MenuItem>
                            </TextField>

                            <TextField sx={{ mb: 2 }}
                              size="small"
                              fullWidth
                              // required
                              id="outlined-select"
                              select
                              name="sub_category_name"
                              label="Sub Category"
                              multiple
                              value={changeData.sub_category_name || ''}
                              onChange={handleProductFelids}
                              helperText="Please select your sub category"
                            >
                              {subCategory.map(
                                (option) =>
                                  changeData.category_name ===
                                  option.category_id && (
                                    <MenuItem
                                      key={option.value}
                                      value={option._id}
                                    >
                                      {option.sub_category_name}
                                    </MenuItem>
                                  )
                              )}
                              <MenuItem key={"none"} value="None">
                                {"None"}
                              </MenuItem>
                            </TextField>



                            <TextField sx={{ mb: 2 }}
                              size="small"
                              fullWidth
                              // autoComplete={false}
                              id="fullWidth"
                              // required
                              label="Showroom Price"
                              type="number"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    ₹
                                  </InputAdornment>
                                ),
                              }}
                              variant="outlined"
                              name="showroom_price"
                              value={changeData.showroom_price}
                              onChange={handleProductFelids}
                            />




                            <TextField sx={{ mb: 2 }}
                              size="small"
                              fullWidth
                              // disabled
                              // autoComplete={false}
                              id="fullWidth"
                              label="Selling Price"
                              type="number"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    ₹
                                  </InputAdornment>
                                ),
                              }}
                              value={
                                // changeData.MRP > 0 &&
                                //   changeData.discount_limit > 0
                                //   ? (changeData.selling_price =
                                //     changeData.MRP -
                                //     (changeData.MRP / 100) *
                                //     changeData.discount_limit)
                                //   : 0
                                changeData.selling_price
                              }
                              onChange={handleProductFelids}
                              variant="outlined"
                              name="selling_price"
                            />



                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={changeData.status || false}
                                  onChange={handleProductFelids}
                                  name="status"
                                  helperText="Check it if want it on mobile."
                                />
                              }
                              label="Show On Website"
                            />

                          </Box >
                          <Box className="stepAction">
                            <Button
                              variant="outlined"
                              size="small"
                              disabled={activeStep === 0}
                              onClick={handleBackStep}
                            >
                              Back
                            </Button>
                            <Button
                              variant="contained"
                              size="small"
                              disabled={activeStep === 6}
                              onClick={handleNextStep}
                            >
                              Continue
                            </Button>
                          </Box>
                        </StepContent>
                      </Step>
                      {/* // Specification Ends*/}


                      {/* Inventory & Shipping */}
                      <Step>
                        <StepLabel>Inventory & Shipping</StepLabel>
                        <StepContent className="stepContent">
                          <Box className="fields">
                            {" "}
                            <Box className="stepAction">
                              <Button
                                variant="outlined"
                                size="small"
                                disabled={activeStep === 0}
                                onClick={handleBackStep}
                              >
                                Back
                              </Button>
                              <Button
                                variant="contained"
                                size="small"
                                disabled={activeStep === 1}
                                onClick={handleNextStep}
                              >
                                Continue
                              </Button>
                            </Box > <br />

                            <FormGroup>
                              <FormLabel id="demo-radio-buttons-group-label">
                                Return & Payment Policy
                              </FormLabel>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={changeData.COD}
                                    onChange={handleProductFelids}
                                    name="COD"
                                  />
                                }
                                label="COD Available"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={changeData.returnable}
                                    onChange={handleProductFelids}
                                    name="returnable"
                                  />
                                }
                                label="Return Item"
                              />
                            </FormGroup>
                            {changeData.returnable && (
                              <>
                                <Typography component={'span'} variant="Caption">
                                  {" "}
                                  Return in {changeData.returnDays} Days
                                </Typography>
                                <Slider
                                  aria-label="Return Days"
                                  defaultValue={0}
                                  size="small"
                                  name="returnDays"
                                  value={changeData.returnDays}
                                  onChange={handleProductFelids}
                                  helperText="Please select your return days"
                                  valueLabelDisplay="auto"
                                />
                              </>
                            )}

                            <Typography component={'span'} variant="Caption">
                              {" "}
                              Polish in {changeData.polish_time} Days
                            </Typography>
                            <Slider
                              aria-label="Construction Days"
                              defaultValue={0}
                              size="small"
                              valueLabelDisplay="auto"
                              name="polish_time"
                              value={changeData.polish_time}
                              onChange={handleProductFelids}
                              helperText="Please select your polish time"
                            />

                            <Typography component={'span'} variant="Caption">
                              {" "}
                              Manufactured in {
                                changeData.manufacturing_time
                              }{" "}
                              Days
                            </Typography>
                            <Slider
                              aria-label="Construction Days"
                              defaultValue={0}
                              size="small"
                              valueLabelDisplay="auto"
                              name="manufacturing_time"
                              value={changeData.manufacturing_time}
                              onChange={handleProductFelids}
                              helperText="Please select your manufacturing time"
                            />

                            <InputLabel id="demo-multiple-checkbox-label">Stock Warehouse</InputLabel>
                            <Select sx={{ mb: 2 }}
                              multiple
                              fullWidth
                              value={changeData.warehouse}
                              name="warehouse"
                              onChange={handleProductFelids}
                              renderValue={(selected) => selected.join(', ')}
                            >
                              {warehouse.map((option) => (
                                <MenuItem key={option.label} value={option.value}>
                                  <Checkbox checked={changeData.warehouse.indexOf(option.value) > -1} />
                                  <ListItemText primary={option.value} />
                                </MenuItem>
                              ))}
                            </Select>

                            {

                              changeData.warehouse.map((row) => {
                                let stock; row === 'Jodhpur (Rajasthan)' ? stock = 'jodhpur_stock' : stock = 'bangalore_stock';
                                return <>

                                  <TextField sx={{ mb: 2 }}
                                    size="small"
                                    fullWidth
                                    name={stock}
                                    label={row + ' Stock'}
                                    type='number'
                                    value={changeData[stock] || ""}
                                    onChange={handleProductFelids}
                                  />
                                </>
                              })
                            }

                            <TextField sx={{ mb: 2 }}
                              size="small"
                              fullWidth
                              // autoComplete={false}
                              id="fullWidth"
                              label="Package Length"
                              type="number"
                              value={changeData.package_length}
                              onChange={handleProductFelids}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    Inch
                                  </InputAdornment>
                                ),
                              }}
                              variant="outlined"
                              name="package_length"
                              helperText="From left to right"
                            />

                            <TextField sx={{ mb: 2 }}
                              size="small"
                              fullWidth
                              // autoComplete={false}
                              id="fullWidth"
                              label="Package Breadth"
                              type="number"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    Inch
                                  </InputAdornment>
                                ),
                              }}
                              variant="outlined"
                              name="package_breadth"
                              value={changeData.package_breadth}
                              onChange={handleProductFelids}
                              helperText="From front to back"
                            />

                            <TextField sx={{ mb: 2 }}
                              size="small"
                              fullWidth
                              // autoComplete={false}
                              id="fullWidth"
                              label="Package Height"
                              type="number"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    Inch
                                  </InputAdornment>
                                ),
                              }}
                              variant="outlined"
                              name="package_height"
                              value={changeData.package_height}
                              onChange={handleProductFelids}
                              helperText="From bottom to top"
                            />
                          </Box >

                          <Box sx={{ display: 'flex', mb: 2 }}>

                            <TextField
                              size="small"
                              sx={{ width: '85%' }}
                              id="fullWidth"
                              label="Quantity"
                              type="Number"
                              variant="outlined"
                              name="quantity"
                              value={changeData.quantity}
                              onChange={handleProductFelids}
                            />


                            <TextField
                              id="outlined-select-currency"
                              select
                              sx={{ ml: 1 }}
                              size='small'
                              label="Unit"
                              name='unit'
                              value={changeData.unit || ''}
                              onChange={handleProductFelids}
                            >
                              {unitCatalog.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                  {option.label}
                                </MenuItem>
                              ))}
                            </TextField>
                          </Box>
                          <Box className="stepAction">
                            <Button
                              variant="outlined"
                              size="small"
                              disabled={activeStep === 0}
                              onClick={handleBackStep}
                            >
                              Back
                            </Button>
                            <Button
                              variant="contained"
                              size="small"
                              disabled={activeStep === 1}
                              onClick={handleNextStep}
                            >
                              Continue
                            </Button>
                          </Box>
                        </StepContent>
                      </Step>
                      {/* Inventory & Shipping End */}



                    </Stepper>

                    <Button
                      color="primary"
                      type="submit"
                      fullWidth
                      variant="contained"
                    >
                      Add Hardware
                    </Button>
                  </form>
                </Grid>
              </Grid>
            )}

            {/* update Hardware Ends */}

          </Box>
        </Backdrop>
      </Slide>
    </>
  );
};

export default Sideform;
