import React, { useState, useRef, useEffect, useMemo } from "react";
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
  Autocomplete
} from "@mui/material";
import { Editor } from "@tinymce/tinymce-react";
import Slide from "@mui/material/Slide";
import Backdrop from "@mui/material/Backdrop";
import "../../../assets/custom/css/sideForm.css";
import { useDropzone } from "react-dropzone";
import CancelIcon from "@mui/icons-material/Cancel";
import AddIcon from '@mui/icons-material/Add';
// service APIS 
import {
  addCategory,
  editCategory,
  getLastProduct,
  categoryList,
  addSubCategories,
  getSubCatagories,
  editSubCatagories,
  addPrimaryMaterial,
  editPrimaryMaterial,
  getPrimaryMaterial,
  addSupplier,
  editSupplier,
  createBlog,
  updateBlog,
  addHardware,
  editHardware,
  getLastHardware,
  addMergeProduct,
  updateMergeProduct,
  getLastMergeProduct,
  getPresentSKUs,
  addCustomer,
  updateCustomer,
  addOrder,
  getLastOrder,
  customerCatalog,
  variation,
  getHardwareDropdown,
  getDraftID,
  addDraft,
  getArticlesId,
  getLastSupplier,
  getSupplierDropdown,
  addInward,
  addOutward,
  uploadImage,
  addTransfer,
  getStockSKU,
  addPolish,
  editPolish
} from "../../../services/service.js";
import { useConfirm } from "material-ui-confirm";


import { setAlert, setForm } from '../../../store/action/action'
import { useSelector, useDispatch } from "react-redux";

import size from 'react-image-size';
import { fromUnixTime } from "date-fns/esm";


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

const SideForm = () => {
  // multiple images
  const [files, setFiles] = useState([]);
  const [featured, setFeatured] = useState([]);

  // image link 
  const imageLink = 'https://admin.woodshala.in/upload/'

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
  const [Indoor, setIndoor] = useState([]);

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
    Promise.all(result).then(res => setFiles(old => { return [...old, ...res] }))
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
    useMemo(() => {

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

  function IndoorPreviews(props) {
    const [acceptedFileItems, setAcceptedFileItems] = useState([])
    const [fileRejectionItems, setFileRejectionItems] = useState([])

    const { getRootProps, getInputProps } = useDropzone({
      accept: "image/*",
      multiple: true,
      onDrop: (acceptedFiles) => {
        Dimension(acceptedFiles, setIndoor)
      }
    });


    // for check the file state in done or
    useMemo(() => {

      if (Indoor) {
        // REJECTED FILES
        setFileRejectionItems(Indoor.map((file) => {
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
        setAcceptedFileItems(Indoor.map(
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

      , [Indoor]);


    useEffect(() => {

      // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
      return () => Indoor.forEach((file) => URL.revokeObjectURL(file.preview));
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



  // static catalog

  const polishCatalog = [
    'Stain Finish',
    'Distressed Polish',
    'Antique Touch',
    'Duco Paint',
    'Natural Finish',
    'Oil Massge'
  ]

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

  const purpose = [
    'Manufacturing', 'Repairing', 'Polish', 'Packing', 'Shipping', 'Others'
  ]
  const level = [
    'Level 1',
    'Level 2',
    'Level 3',
    'Level 4',
    'Level 5',
    'Level 6',
    'Level 7',
    'Level 8',
    'Level 9',
    'Level 10',
  ]
  const hardware_polish = [
    'Matt', 'Glossy', 'Semi Glossy'
  ]


  // redux 
  const { form, mode } = useSelector(state => state);
  const dispatch = useDispatch();

  // states
  const [cat, setCat] = useState('');
  const [discount, setDiscount] = useState({ discount_limit: 0, MRP: 0 });
  // const [showFabric, setShowFabric] = useState("No");

  //  State for stepper
  const [activeStep, setActiveStep] = useState(0);

  // states for the dynamic rendering
  const [SKU, setSKU] = useState("");
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [materialCatalog, setMaterialCatalog] = useState([]);
  // const [textileCatalog, setTextileCatalog] = useState([]);
  // const [fabricCatalog, setFabricCatalog] = useState([]);
  const [SKUCatalog, setSKUCatalog] = useState([]);
  const [customer, setCustomerCatalog] = useState([]);
  const [productSKU, setProductSKU] = useState({ P_SKU: [], H_SKU: [], supplier: [] });

  const [catalog, setCatalog] = useState({
    hinge: [],
    knob: [],
    door: [],
    handle: [],
    fitting: [],
    polish: [],
    fabric: [],
    wheel: [],
    ceramic_drawer: [],
    ceramic_tiles: [],
  })

  // ref
  const editorRef = useRef();


  // pres data
  const [changeData, setData] = useState({
    CVW: 0,
    primary_material: [],
    product_articles: [],
    hardware_articles: [],
    supplier: '',
    range: "None",
    product_array: [],
    variation_array: [],
    warehouse: [],
    savedImages: [],
    specification_image: '',
    featured_image: '',
    mannequin_image: '',
    shipping: "",
    product_title: "",
    seo_title: "",
    seo_description: "",
    seo_keyword: "",
    product_des: "",
    category: "",
    sub_category: "",
    length: 0,
    breadth: 0,
    selling_points: [],
    height: 0,
    priMater: "",
    priMater_weight: "",
    secMater: "",
    secMater_weight: "",
    selling_price: 0,
    mrp: 0,
    discount_cap: 0,
    polish_time: 0,
    manufacturing_time: 0,
    polish: [],
    wight_cap: "",
    wall_hanging: "",
    assembly_required: "",
    assembly_leg: "",
    assembly_parts: 0,
    fitting: "None",
    silver: "",
    selling_point: "",
    mirror: "",
    joints: "",
    tax_rate: 18,
    seat_width: 0,
    ceramic_drawer: "None",
    ceramic_tiles: "None",
    seat_depth: 0,
    seat_height: 0,
    wheel: "None",
    wheel_included: "no",
    trolly: "",
    returnable: false,
    returnDays: 0,
    trolly_mater: "",
    top_size_length: 0,
    top_size_breadth: 0,
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
    ceramic_drawer_included: false,
    ceramic_tiles_included: false,
    unit: 'Pcs',
    quantity: 1,
    textile_type: '',
    category_id: '',
    sub_category_id: '',
    product_description: '',
    legs: 'None',
    fabric: "None",
    assembly_level: 'Easy Assembly',
    mattress: "no",
    mattress_length: 0,
    mattress_breadth: 0,
    hinge: "None",
    hinge_qty: 0,
    knob: "None",
    knob_qty: 0,
    handle: "None",
    handle_qty: 0,
    door: "None",
    door_qty: 0,
    plywood: 'no',
    wheel_qty: 0,
    cradle_bed: 'no',
    amazon_url: '',
    flipkart_url: '',
    jiomart_url: '',
    cradle_bed_depth: 0,
    cradle_bed_height: 0,
    cradle_bed_width: 0,
    showroom_price: 0,
    discount_limit: 0,
    length_main: 0,
    weight: 0,
    ceramic_drawer_qty: 0,
    ceramic_tiles_qty: 0,
    back_style: "None",
    weight_capacity: "None",
    drawer: 'None',
    package_breadth: 0,
    package_height: 0,
    package_length: 0,
    silver_weight: 0,
    mirror_length: 0,
    mirror_width: 0,
    drawer_count: 0,
    seating_size_width: 0,
    seating_size_depth: 0,
    seating_size_height: 0,
    restocking_time: 0,
    min_quantity: 1,
    hardware_polish: "None",
    warehouse_to: '',
    wood_weight: 0,
    metal_weight: 0,
    package_weight: 0,
    polish_name: '',
    polish_type: 'None',
    polish_finish: 'None',
    level: 'None',
    lock: false,
    price: 0,
    indoorSavedImage: [],
  });

  // function for generating Merged product  ID

  const getMKU = () => {
    getLastMergeProduct()
      .then((res) => {
        if (res.data.length > 0) {

          let index = parseInt(res.data[0].M.split("-")[1]) + 1;

          setSKU(`M-0${index}`);
        } else {
          setSKU("M-01001");
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
  // function for generating product DID ID

  const getSID = () => {
    getLastSupplier()
      .then((res) => {
        if (res.data.length > 0) {
          let index = parseInt(res.data[0].SID.split("-")[1]) + 1;

          setSKU(`SID-0${index}`);
        } else {
          setSKU("SID-01001");
        }
      })
      .catch((err) => {
        // //console.log(err);
      });
  };
  // function for generating product DID ID

  const getDID = () => {
    getDraftID()
      .then((res) => {
        if (res.data.length > 0) {
          let index = parseInt(res.data[0].DID.split("-")[1]) + 1;

          setSKU(`DID-0${index}`);
        } else {
          setSKU("DID-01001");
        }
      })
      .catch((err) => {
        // //console.log(err);
      });
  };


  useMemo(() => {
    switch (form.formType) {
      case "hardware":
        getHKU();
        categoryList().then((data) => {
          if (data.data === null) return setCategory([]);

          let hardware = data.data.filter((row) => { return row.category_name === 'Hardware' })

          setData({ ...changeData, category_name: hardware.length > 0 ? hardware[0]._id : 'None' })
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

        const row = form.payload.row;

        console.log(row)

        setData({
          SKU: row.SKU,
          title: row.title,
          category_name: row.category_id,
          category_id: row.category_id,
          sub_category_name: row.sub_category_id,
          sub_category_id: row.sub_category_id,
          hardware_image: row.hardware_image,
          warehouse: row.warehouse || [],
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
          polish_time: row.polish_time,
          restocking_time: row.restocking_time,
          selling_points: row.selling_points || [],
          seo_title: row.seo_title,
          seo_description: row.seo_description,
          seo_keyword: row.seo_keyword,
          hardware_polish: row.hardware_polish,
          min_quantity: row.min_quantity,
          continue_selling: row.continue_selling,
        })
        break;
      case "product":
        // getSKU();
        getDID();

        getHardwareDropdown().then((data) => {
          if (data.data !== null) return setCatalog(old => ({ ...old, ...data.data }))
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

        break;
      case "variation":
        getSKU();
        getHardwareDropdown().then((data) => {
          if (data.data !== null) return setCatalog(old => ({ ...old, ...data.data }))
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


        setData({
          _id: form.payload.value._id || form.payload.row.action._id,
          SKU: form.payload.row.action.SKU,
          CVW: form.payload.row.action.CVW,
          product_title: form.payload.row.action.product_title,
          category_name: form.payload.row.action.category_id,
          category_id: form.payload.row.action.category_id,
          sub_category_name: form.payload.row.action.sub_category_id,
          sub_category_id: form.payload.row.action.sub_category_id,
          product_description: form.payload.row.action.product_description,
          seo_title: form.payload.row.action.seo_title,
          seo_description: form.payload.row.action.seo_description,
          seo_keyword: form.payload.row.action.seo_keyword,
          product_image: form.payload.row.action.product_image,
          savedImages: form.payload.row.action.product_image,
          featured_image: form.payload.row.action.featured_image,
          mannequin_image: form.payload.row.action.mannequin_image,
          specification_image: form.payload.row.action.specification_image,
          primary_material: form.payload.row.action.primary_material,
          primary_material_name: form.payload.row.action.primary_material_name,
          warehouse: form.payload.row.action.warehouse,
          warehouse_name: form.payload.row.action.warehouse_name,
          length_main: form.payload.row.action.length_main,
          breadth: form.payload.row.action.breadth,
          height: form.payload.row.action.height,
          bangalore_stock: form.payload.row.action.bangalore_stock,
          jodhpur_stock: form.payload.row.action.jodhpur_stock,
          weight: form.payload.row.action.weight,
          polish: form.payload.row.action.polish,
          polish_name: form.payload.row.action.polish_name,
          hinge: form.payload.row.action.hinge,
          hinge_qty: form.payload.row.action.hinge_qty,
          hinge_name: form.payload.row.action.hinge_name,
          knob: form.payload.row.action.knob,
          knob_qty: form.payload.row.action.knob_qty,
          knob_name: form.payload.row.action.knob_name,
          handle: form.payload.row.action.handle,
          handle_qty: form.payload.row.action.handle_qty,
          handle_name: form.payload.row.action.handle_name,
          door: form.payload.row.action.door,
          door_qty: form.payload.row.action.door_qty,
          door_name: form.payload.row.action.door_name,
          fitting: form.payload.row.action.fitting,
          fitting_name: form.payload.row.action.fitting_name,
          selling_points: form.payload.row.action.selling_points,
          dial_size: form.payload.row.action.dial_size,
          seating_size_width: form.payload.row.action.seating_size_width,
          seating_size_depth: form.payload.row.action.seating_size_depth,
          seating_size_height: form.payload.row.action.seating_size_height,
          weight_capacity: form.payload.row.action.weight_capacity,
          fabric: form.payload.row.action.fabric,
          fabric_qty: form.payload.row.action.fabric_qty,
          fabric_name: form.payload.row.action.fabric_name,
          wall_hanging: form.payload.row.action.wall_hanging,
          assembly_required: form.payload.row.action.assembly_required,
          assembly_part: form.payload.row.action.assembly_part,
          legs: form.payload.row.action.legs,
          mirror: form.payload.row.action.mirror,
          mirror_length: form.payload.row.action.mirror_length,
          mirror_width: form.payload.row.action.mirror_width,
          silver: form.payload.row.action.silver,
          silver_weight: form.payload.row.action.silver_weight,
          joints: form.payload.row.action.joints,
          upholstery: form.payload.row.action.upholstery,
          trolley: form.payload.row.action.trolley,
          trolley_material: form.payload.row.action.trolley_material,
          rotating_seats: form.payload.row.action.rotating_seats,
          eatable_oil_polish: form.payload.row.action.eatable_oil_polish,
          no_chemical: form.payload.row.action.no_chemical,
          straight_back: form.payload.row.action.straight_back,
          lean_back: form.payload.row.action.lean_back,
          weaving: form.payload.row.action.weaving,
          knife: form.payload.row.action.knife,
          not_suitable_for_Micro_Dish: form.payload.row.action.not_suitable_for_Micro_Dish,
          tilt_top: form.payload.row.action.tilt_top,
          inside_compartments: form.payload.row.action.inside_compartments,
          stackable: form.payload.row.action.stackable,
          MRP: form.payload.row.action.MRP,
          tax_rate: form.payload.row.action.tax_rate,
          selling_price: form.payload.row.action.selling_price,
          showroom_price: form.payload.row.action.showroom_price,
          discount_limit: form.payload.row.action.discount_limit,
          polish_time: form.payload.row.action.polish_time,
          manufacturing_time: form.payload.row.action.manufacturing_time,
          status: form.payload.row.action.status,
          returnDays: form.payload.row.action.returnDays,
          COD: form.payload.row.action.COD,
          returnable: form.payload.row.action.returnable,
          drawer: form.payload.row.action.drawer,
          drawer_count: form.payload.row.action.drawer_count,
          mobile_store: form.payload.row.action.mobile_store,
          online_store: form.payload.row.action.online_store,
          range: form.payload.row.action.range,
          back_style: form.payload.row.action.back_style,
          package_length: form.payload.row.action.package_length,
          package_height: form.payload.row.action.package_height,
          package_breadth: form.payload.row.action.package_breadth,
          quantity: form.payload.row.action.quantity,
          unit: form.payload.row.action.unit,
          variation_array: form.payload.row.action.variation_array,
          assembly_level: form.payload.row.action.assembly_level,
          continue_selling: form.payload.row.action.continue_selling,
          wheel: form.payload.row.action.wheel,
          wheel_included: form.payload.row.action.wheel_included,
          wheel_qty: form.payload.row.action.wheel_qty,
          wheel_name: form.payload.row.action.wheel_name,
          ceramic_tiles: form.payload.row.action.ceramic_tiles,
          ceramic_tiles_qty: form.payload.row.action.ceramic_tiles_qty,
          ceramic_tiles_included: form.payload.row.action.ceramic_tiles_included,
          ceramic_tiles_name: form.payload.row.action.ceramic_tiles_name,
          ceramic_drawers_qty: form.payload.row.action.ceramic_drawers_qty,
          ceramic_drawers: form.payload.row.action.ceramic_drawers,
          ceramic_drawers_included: form.payload.row.action.ceramic_drawers_included,
          ceramic_drawers_name: form.payload.row.action.ceramic_drawers_name,
          mattress: form.payload.row.action.mattress,
          mattress_length: form.payload.row.action.mattress_length,
          mattress_breadth: form.payload.row.action.mattress_breadth,
          plywood: form.payload.row.action.plywood,
          top_size_breadth: form.payload.row.action.top_size_breadth,
          top_size_length: form.payload.row.action.top_size_length,
          amazon_url: form.payload.row.action.amazon_url,
          flipkart_url: form.payload.row.action.flipkart_url,
          jiomart_url: form.payload.row.action.jiomart_url,
          wood_weight: form.payload.row.action.wood_weight,
          package_weight: form.payload.row.action.package_weight,
          metal_weight: form.payload.row.action.metal_weight,

        });

        setCat(form.payload.row.action.category_id);
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
          category: form.payload.row.category_name,
          seo_title: form.payload.row.seo_title,
          seo_description: form.payload.row.seo_description,
          seo_keyword: form.payload.row.seo_keyword,
          product_description: form.payload.row.product_description,
        });
        break;
      case "update_PrimaryMaterial":
        getPrimaryMaterial().then((data) => {
          if (data.data === null) return setMaterialCatalog([]);

          return setMaterialCatalog(data.data);
        });
        setData({
          primaryMaterial_name: form.payload.row.primaryMaterial_name,
          primaryMaterial_description:
            form.payload.row.primaryMaterial_description,
        });
        break;
      case "subcategory":
        categoryList().then((data) => {
          if (data.data === null) return setCategory([]);

          return setCategory(data.data);
        });
        // setCat(form.payload.row.category_id);
        break;
      case "update_Subcategory":
        categoryList().then((data) => {
          if (data.data === null) return setCategory([]);
          return setCategory(data.data);
        });
        setCat(form.payload.row.category_id);
        setData({
          sub_category_name: form.payload.row.sub_category_name,
          seo_title: form.payload.row.seo_title,
          seo_description: form.payload.row.seo_description,
          seo_keyword: form.payload.row.seo_keyword,
          product_description: form.payload.row.product_description,

        });
        break;
      case "update_blog":
        setData({
          title: form.payload.value.title,
          card_image: form.payload.value.card_image,
          seo_title: form.payload.value.seo_title,
          seo_description: form.payload.value.seo_description,
          card_description: form.payload.value.card_description,
          description: form.payload.value.description,
        });
        break;
      case "update_product":

        getDID();


        getHardwareDropdown().then((data) => {
          if (data.data !== null) return setCatalog(old => ({ ...old, ...data.data }))
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


        setData({
          _id: form.payload.value._id || form.payload.row.action._id,
          SKU: form.payload.row.action.SKU,
          CVW: form.payload.row.action.CVW,
          parent_SKU: form.payload.row.parent_SKU,
          variations: form.payload.row.variations,
          variant_label: form.payload.row.variant_label,
          product_title: form.payload.row.action.product_title,
          category_name: form.payload.row.action.category_id,
          category_id: form.payload.row.action.category_id,
          sub_category_name: form.payload.row.action.sub_category_id,
          sub_category_id: form.payload.row.action.sub_category_id,
          product_description: form.payload.row.action.product_description,
          seo_title: form.payload.row.action.seo_title,
          seo_description: form.payload.row.action.seo_description,
          seo_keyword: form.payload.row.action.seo_keyword,
          product_image: form.payload.row.action.product_image,
          savedImages: form.payload.row.action.product_image,
          featured_image: form.payload.row.action.featured_image,
          mannequin_image: form.payload.row.action.mannequin_image,
          specification_image: form.payload.row.action.specification_image,
          primary_material: form.payload.row.action.primary_material,
          primary_material_name: form.payload.row.action.primary_material_name,
          warehouse: form.payload.row.action.warehouse,
          warehouse_name: form.payload.row.action.warehouse_name,
          length_main: form.payload.row.action.length_main,
          breadth: form.payload.row.action.breadth,
          height: form.payload.row.action.height,
          bangalore_stock: form.payload.row.action.bangalore_stock,
          jodhpur_stock: form.payload.row.action.jodhpur_stock,
          weight: form.payload.row.action.weight,
          polish: form.payload.row.action.polish,
          polish_name: form.payload.row.action.polish_name,
          hinge: form.payload.row.action.hinge,
          hinge_qty: form.payload.row.action.hinge_qty,
          hinge_name: form.payload.row.action.hinge_name,
          knob: form.payload.row.action.knob,
          knob_qty: form.payload.row.action.knob_qty,
          knob_name: form.payload.row.action.knob_name,
          handle: form.payload.row.action.handle,
          handle_qty: form.payload.row.action.handle_qty,
          handle_name: form.payload.row.action.handle_name,
          door: form.payload.row.action.door,
          door_qty: form.payload.row.action.door_qty,
          door_name: form.payload.row.action.door_name,
          fitting: form.payload.row.action.fitting,
          fitting_name: form.payload.row.action.fitting_name,
          selling_points: form.payload.row.action.selling_points,
          dial_size: form.payload.row.action.dial_size,
          seating_size_width: form.payload.row.action.seating_size_width,
          seating_size_depth: form.payload.row.action.seating_size_depth,
          seating_size_height: form.payload.row.action.seating_size_height,
          weight_capacity: form.payload.row.action.weight_capacity,
          fabric: form.payload.row.action.fabric,
          fabric_qty: form.payload.row.action.fabric_qty,
          fabric_name: form.payload.row.action.fabric_name,
          wall_hanging: form.payload.row.action.wall_hanging,
          assembly_required: form.payload.row.action.assembly_required,
          assembly_part: form.payload.row.action.assembly_part,
          legs: form.payload.row.action.legs,
          mirror: form.payload.row.action.mirror,
          mirror_length: form.payload.row.action.mirror_length,
          mirror_width: form.payload.row.action.mirror_width,
          silver: form.payload.row.action.silver,
          silver_weight: form.payload.row.action.silver_weight,
          joints: form.payload.row.action.joints,
          upholstery: form.payload.row.action.upholstery,
          trolley: form.payload.row.action.trolley,
          trolley_material: form.payload.row.action.trolley_material,
          rotating_seats: form.payload.row.action.rotating_seats,
          eatable_oil_polish: form.payload.row.action.eatable_oil_polish,
          no_chemical: form.payload.row.action.no_chemical,
          straight_back: form.payload.row.action.straight_back,
          lean_back: form.payload.row.action.lean_back,
          weaving: form.payload.row.action.weaving,
          knife: form.payload.row.action.knife,
          not_suitable_for_Micro_Dish: form.payload.row.action.not_suitable_for_Micro_Dish,
          tilt_top: form.payload.row.action.tilt_top,
          inside_compartments: form.payload.row.action.inside_compartments,
          stackable: form.payload.row.action.stackable,
          MRP: form.payload.row.action.MRP,
          tax_rate: form.payload.row.action.tax_rate,
          selling_price: form.payload.row.action.selling_price,
          showroom_price: form.payload.row.action.showroom_price,
          discount_limit: form.payload.row.action.discount_limit,
          polish_time: form.payload.row.action.polish_time,
          manufacturing_time: form.payload.row.action.manufacturing_time,
          status: form.payload.row.action.status,
          returnDays: form.payload.row.action.returnDays,
          COD: form.payload.row.action.COD,
          returnable: form.payload.row.action.returnable,
          drawer: form.payload.row.action.drawer,
          drawer_count: form.payload.row.action.drawer_count,
          mobile_store: form.payload.row.action.mobile_store,
          online_store: form.payload.row.action.online_store,
          range: form.payload.row.action.range,
          back_style: form.payload.row.action.back_style,
          package_length: form.payload.row.action.package_length,
          package_height: form.payload.row.action.package_height,
          package_breadth: form.payload.row.action.package_breadth,
          quantity: form.payload.row.action.quantity,
          unit: form.payload.row.action.unit,
          variation_array: form.payload.row.action.variation_array,
          assembly_level: form.payload.row.action.assembly_level,
          continue_selling: form.payload.row.action.continue_selling,
          wheel: form.payload.row.action.wheel,
          wheel_included: form.payload.row.action.wheel_included,
          wheel_qty: form.payload.row.action.wheel_qty,
          wheel_name: form.payload.row.action.wheel_name,
          ceramic_tiles: form.payload.row.action.ceramic_tiles,
          ceramic_tiles_qty: form.payload.row.action.ceramic_tiles_qty,
          ceramic_tiles_included: form.payload.row.action.ceramic_tiles_included,
          ceramic_tiles_name: form.payload.row.action.ceramic_tiles_name,
          ceramic_drawers_qty: form.payload.row.action.ceramic_drawers_qty,
          ceramic_drawers: form.payload.row.action.ceramic_drawers,
          ceramic_drawers_included: form.payload.row.action.ceramic_drawers_included,
          ceramic_drawers_name: form.payload.row.action.ceramic_drawers_name,
          mattress: form.payload.row.action.mattress,
          mattress_length: form.payload.row.action.mattress_length,
          mattress_breadth: form.payload.row.action.mattress_breadth,
          plywood: form.payload.row.action.plywood,
          top_size_breadth: form.payload.row.action.top_size_breadth,
          top_size_length: form.payload.row.action.top_size_length,
          amazon_url: form.payload.row.action.amazon_url,
          flipkart_url: form.payload.row.action.flipkart_url,
          jiomart_url: form.payload.row.action.jiomart_url,
          wood_weight: form.payload.row.action.wood_weight,
          package_weight: form.payload.row.action.package_weight,
          metal_weight: form.payload.row.action.metal_weight,
        });

        setCat(form.payload.row.action.category_id);

        break;
      case "update_customer":
        //console.log(form.payload);
        setData({
          CID: form.payload.row.CID,
          register_time: form.payload.row.register_time,
          username: form.payload.row.username,
          mobile: form.payload.row.mobile,
          email: form.payload.row.email,
          password: form.payload.row.password,
          city: form.payload.row.city,
          state: form.payload.row.state,
          shipping: form.payload.row.shipping,
        });
        break;
      case "merge_product":
        getMKU();

        getHardwareDropdown().then((data) => {
          if (data.data !== null) return setCatalog(old => ({ ...old, ...data.data }))
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

        setData({
          ...changeData,
        });

        break;
      case "update_merge":

        categoryList().then((data) => {
          if (data.data === null) return setCategory([]);
          return setCategory(data.data);
        });

        getSubCatagories().then((data) => {
          if (data.data === null) return setSubCategory([]);
          return setSubCategory(data.data);
        });

        console.log(form.payload.row.product_articles)

        // for product qty
        form.payload.row.product_articles.length > 0 && form.payload.row.product_articles.map(item => {
          setData(old => ({
            ...old,
            [item.SKU]: item.qty
          }))
        })


        setData(old => ({
          ...old,
          M: form.payload.row.M,
          product_articles: form.payload.row.product_articles.map(item => item.SKU) || [],
          product_title: form.payload.row.product_title,
          category_name: form.payload.row.category_id,
          category_id: form.payload.row.category_id,
          sub_category_name: form.payload.row.sub_category_id,
          sub_category_id: form.payload.row.sub_category_id,
          warehouse: form.payload.row.warehouse,
          warehouse_name: form.payload.row.warehouse_name,
          bangalore_stock: form.payload.row.bangalore_stock,
          jodhpur_stock: form.payload.row.jodhpur_stock,
          product_description: form.payload.row.product_description,
          product_image: form.payload.row.product_image,
          savedImages: form.payload.row.product_image,
          featured_image: form.payload.row.featured_image,
          mannequin_image: form.payload.row.mannequin_image,
          specification_image: form.payload.row.specification_image,
          selling_points: form.payload.row.selling_points,
          selling_price: form.payload.row.selling_price,
          showroom_price: form.payload.row.showroom_price,
          discount_limit: form.payload.row.discount_limit,
          mobile_store: form.payload.row.mobile_store,
          online_store: form.payload.row.online_store,
          continue_selling: form.payload.row.continue_selling,
          COD: form.payload.row.COD,
          returnDays: form.payload.row.returnDays,
          returnable: form.payload.row.returnable,
          polish_time: form.payload.row.polish_time,
          manufacturing_time: form.payload.row.manufacturing_time,
          package_length: form.payload.row.package_length,
          package_height: form.payload.row.package_height,
          package_breadth: form.payload.row.package_breadth,
          seo_title: form.payload.row.seo_title,
          seo_description: form.payload.row.seo_description,
          seo_keyword: form.payload.row.seo_keyword,
        }));

        break;
      case 'update_Stock':
        setData({
          ...changeData,
          _id: form.payload.row._id,
          product_id: form.payload.row.product_id,
          stock: form.payload.row.stock,
          warehouse: form.payload.row.warehouse,
        });
        break
      case 'update_supplier':
        setData({
          ...changeData,
          _id: form.payload.row._id,
          supplier_name: form.payload.row.supplier_name,
          mobile: form.payload.row.mobile,
          gst_no: form.payload.row.gst_no,
          alt_mobile: form.payload.row.alt_mobile,
          specialization: form.payload.row.specialization,
          SID: form.payload.row.SID,
          address: form.payload.row.address,
        });
        break
      case 'add_supplier':
        getSID();
        break;
      case 'update_polish':
        // console.log(form.payload.row)
        setData({
          ...changeData,
          _id: form.payload.row.action._id,
          polish_name: form.payload.row.action.polish_name,
          polish_type: form.payload.row.action.polish_type,
          level: form.payload.row.action.level,
          polish_finish: form.payload.row.action.polish_finish,
          outDoor_image: form.payload.row.action.outDoor_image,
          savedImages: form.payload.row.action.outDoor_image,
          inDoor_image: form.payload.row.action.inDoor_image,
          indoorSavedImage: form.payload.row.action.inDoor_image,
          lock: form.payload.row.action.lock,
          price: form.payload.row.action.price,
        })
        break;
      default:
    }
  }, [form.formType, form.state]);

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
    switch (form.formType) {
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
      case "update_supplier":
        setData({
          ...changeData,
          [e.target.name]: e.target.value,
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
      case "inward":
        console.log(e.target)
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
    "ceramic_drawer_included",
    "ceramic_tiles_included",
    "status",
    'lock'
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
    dispatch(setForm({ state: false, formType: null, payload: null }));
  };




  // function for handling category
  const handleCategory = (e) => {
    e.preventDefault();

    const FD = new FormData();

    FD.append("category_image", Image[0]);
    FD.append("category_name", e.target.category_name.value);
    FD.append("seo_title", changeData.seo_title);
    FD.append("seo_description", changeData.seo_description);
    FD.append("seo_keyword", changeData.seo_keyword);
    FD.append("product_description", changeData.product_description);
    FD.append("category_status", e.target.category_status.checked);

    // // //console.log(acceptedFiles[0].name, e.target.category_name.value)

    const res = addCategory(FD);

    res
      .then((data) => {
        // //console.log(data.status);

        if (data.status === 203) {
          setImages([]);
          dispatch(setAlert({
            open: true,
            variant: "error",
            message: data.data.message,
          }));
        } else {
          form.setRow([...form.row, {
            id: form.row.length + 1,
            category_name: data.data.response.category_name,
            category_status: data.data.response.category_status,
            category_image: data.data.response.category_image,
            seo_title: data.data.response.seo_title,
            seo_description: data.data.response.seo_description,
            seo_keyword: data.data.response.seo_keyword,
            product_description: data.data.response.product_description,
            action: data.data.response
          }])
          form.setCheck(old => [...old, data.data.response.category_status])
          setImages([]);
          handleClose();
          dispatch(setAlert({
            open: true,
            variant: "success",
            message: data.data.message,
          }));
        }
      })
      .catch((err) => {
        console.log(err);
        setImages([]);
        dispatch(setAlert({
          open: true,
          variant: "error",
          message: "Something Went Wrong !!!",
        }));
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
          dispatch(setAlert({
            open: true,
            variant: "error",
            message: data.data.message,
          }));
        } else {
          form.setRow([...form.row, {
            id: form.row.length + 1,
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
          dispatch(setAlert({
            open: true,
            variant: "success",
            message: data.data.message,
          }));
        }
      })
      .catch((err) => {
        console.log(err);
        setImages([]);
        dispatch(setAlert({
          open: true,
          variant: "error",
          message: "Something Went Wrong !!!",
        }));
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
          dispatch(setAlert({
            open: true,
            variant: "error",
            message: data.data.message,
          }));
        } else {
          form.setRow(form.row.map((set) => {
            if (set.action === form.payload.row.action) {
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
          dispatch(setAlert({
            open: true,
            variant: "success",
            message: data.data.message,
          }));
        }
      })
      .catch((err) => {
        console.log(err);
        setImages([]);
        dispatch(setAlert({
          open: true,
          variant: "error",
          message: "Something Went Wrong !!!",
        }));
      });
  };


  // function for handling update category
  const handleUpdateCategory = (e) => {
    e.preventDefault();

    const FD = new FormData();

    FD.append("_id", form.payload.row.action);

    Image[0] !== undefined && FD.append("category_image", Image[0]);
    console.log(Image[0])

    FD.append("seo_title", changeData.seo_title);
    FD.append("seo_description", changeData.seo_description);
    FD.append("seo_keyword", changeData.seo_keyword);
    FD.append("product_description", changeData.product_description);


    e.target.category_name.value !== undefined
      ? FD.append("category_name", e.target.category_name.value)
      : console.log();

    const res = editCategory(FD);
    res
      .then((data) => {

        if (data.status === 203) {
          setImages([]);
          dispatch(setAlert({
            open: true,
            variant: "error",
            message: data.data.message,
          }));
        } else {
          form.setRow(form.row.map((set) => {
            if (set.action === form.payload.row.action) {
              set.category_name = e.target.category_name.value;
              Image[0] !== undefined ? set.category_image = `https://admin.woodshala.in/upload/${Image[0].path}` : console.log();
              set.seo_title = changeData.seo_title;
              set.seo_description = changeData.seo_description;
              set.seo_keyword = changeData.seo_keyword;
              set.product_description = changeData.product_description;

            }
            return set;
          }))
          setImages([]);
          handleClose();
          dispatch(setAlert({
            open: true,
            variant: "success",
            message: data.data.message,
          }));
        }
      })
      .catch((err) => {
        // //console.log(err);
        setImages([]);
        dispatch(setAlert({
          open: true,
          variant: "error",
          message: "Something Went Wrong !!!",
        }));
      });
  };

  // function fo resting the values

  const resetAll = () => {
    setProductSKU({
      P_SKU: [],
      H_SKU: [],
      supplier: []
    })
    setImages([]);
    setFeatured([]);
    setFiles([]);
    setActiveStep(0);
    setData({
      CVW: 0,
      warehouse_to: '',
      primary_material: [],
      product_articles: [],
      hardware_articles: [],
      supplier: '',
      range: "None",
      product_array: [],
      variation_array: [],
      warehouse: [],
      savedImages: [],
      shipping: "",
      product_title: "",
      amazon_url: '',
      flipkart_url: '',
      jiomart_url: '',
      seo_title: "",
      seo_description: "",
      specification_image: '',
      featured_image: '',
      mannequin_image: '',
      seo_keyword: "",
      product_des: "",
      category: "",
      sub_category: "",
      length: 0,
      breadth: 0,
      selling_points: [],
      height: 0,
      priMater: "",
      priMater_weight: "",
      secMater: "",
      secMater_weight: "",
      selling_price: 0,
      mrp: 0,
      discount_cap: 0,
      polish_time: 0,
      manufacturing_time: 0,
      polish: [],
      wight_cap: "",
      wall_hanging: "",
      assembly_required: "",
      assembly_leg: "",
      assembly_parts: 0,
      fitting: "None",
      silver: "",
      selling_point: "",
      mirror: "",
      joints: "",
      tax_rate: 18,
      seat_width: 0,
      ceramic_drawer: "None",
      ceramic_tiles: "None",
      seat_depth: 0,
      seat_height: 0,
      wheel: "None",
      wheel_included: "no",
      trolly: "",
      returnable: false,
      returnDays: 0,
      trolly_mater: "",
      top_size_length: 0,
      top_size_breadth: 0,
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
      ceramic_drawer_included: false,
      ceramic_tiles_included: false,
      unit: 'Pcs',
      quantity: 1,
      textile_type: '',
      category_id: '',
      sub_category_id: '',
      product_description: '',
      legs: 'None',
      fabric: "None",
      assembly_level: 'Easy Assembly',
      mattress: "no",
      mattress_length: 0,
      mattress_breadth: 0,
      hinge: "None",
      hinge_qty: 0,
      knob: "None",
      knob_qty: 0,
      handle: "None",
      handle_qty: 0,
      door: "None",
      door_qty: 0,
      plywood: 'no',
      wheel_qty: 0,
      cradle_bed: 'no',
      cradle_bed_depth: 0,
      cradle_bed_height: 0,
      cradle_bed_width: 0,
      showroom_price: 0,
      discount_limit: 0,
      length_main: 0,
      weight: 0,
      ceramic_drawer_qty: 0,
      ceramic_tiles_qty: 0,
      back_style: "None",
      weight_capacity: "None",
      drawer: 'None',
      package_breadth: 0,
      package_height: 0,
      package_length: 0,
      silver_weight: 0,
      mirror_length: 0,
      mirror_width: 0,
      drawer_count: 0,
      seating_size_width: 0,
      seating_size_depth: 0,
      seating_size_height: 0,
      restocking_time: 0,
      min_quantity: 1,
      hardware_polish: "None",
      wood_weight: 0,
      metal_weight: 0,
      package_weight: 0,
      polish_type: 'None',
      polish_finish: 'None',
      level: 'None',
      lock: false,
      price: 0,
      indoorSavedImage: []

    });
    document.getElementById("myForm").reset();
  };



  const handleProduct = (e) => {
    e.preventDefault();

    const FD = new FormData();


    FD.append("DID", SKU);
    FD.append("AID", 'Not Assigned ' + SKU);
    FD.append("type", 'Product');
    FD.append("operation", 'insertProduct');

    FD.append("SKU", 'Not Assigned ' + SKU);
    FD.append("status", false);

    FD.append("CVW", changeData.CVW);

    files.map((element) => {
      if (element.validate) return FD.append("product_image", element);
    });

    FD.append("specification_image", changeData.specification_image || '');
    FD.append("featured_image", changeData.featured_image || '');
    FD.append("mannequin_image", changeData.mannequin_image || '');

    console.log(changeData.primary_material)

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
    catalog.wheel.map((item) => {
      return (
        item.SKU === changeData.wheel && FD.append("wheel_name", item.title)
      );
    });
    catalog.handle.map((item) => {
      return (
        item.SKU === changeData.handle &&
        FD.append("handle_name", item.title)
      );
    });
    catalog.ceramic_tiles.map((item) => {
      return (
        item.SKU === changeData.ceramic_tiles &&
        FD.append("ceramic_tiles_name", item.title)
      );
    });
    catalog.ceramic_drawer.map((item) => {
      return (
        item.SKU === changeData.ceramic_drawer &&
        FD.append("ceramic_drawer_name", item.title)
      );
    });

    catalog.fabric.map((item) => {
      return (
        item.fabric === changeData.fabric &&
        FD.append("fabric_name", item.title)
      );
    });

    catalog.wheel.map((item) => {
      return (
        item.wheel === changeData.wheel &&
        FD.append("wheel_name", item.title)
      );
    });

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
    FD.append("amazon_url", changeData.amazon_url);
    FD.append("flipkart_url", changeData.flipkart_url);
    FD.append("jiomart_url", changeData.jiomart_url);
    FD.append("wood_weight", changeData.wood_weight);
    FD.append("metal_weight", changeData.metal_weight);
    FD.append("package_weight", changeData.package_weight);

    FD.append("cradle_bed", changeData.cradle_bed);
    if (changeData.cradle_bed) {
      FD.append("cradle_bed_depth", changeData.cradle_bed_depth);
      FD.append("cradle_bed_height", changeData.cradle_bed_height);
      FD.append("cradle_bed_width", changeData.cradle_bed_width);
    }

    FD.append("wheel_included", changeData.wheel_included);

    if (changeData.wheel_included) {
      FD.append("wheel_qty", changeData.wheel_qty);
      FD.append("wheel", changeData.wheel);
    }
    if (changeData.handle !== 'None') {
      FD.append("handle_qty", changeData.handle_qty);
    }
    if (changeData.hinge !== 'None') {
      FD.append("hinge_qty", changeData.hinge_qty);
    }
    if (changeData.door !== 'None') {
      FD.append("door_qty", changeData.door_qty);
    }
    if (changeData.knob !== 'None') {
      FD.append("knob_qty", changeData.knob_qty);
    }
    if (changeData.fabric !== 'None') {
      FD.append("fabric_qty", changeData.fabric_qty);
    }

    FD.append("ceramic_drawer_included", changeData.ceramic_drawer_included);

    if (changeData.ceramic_drawer_included) {
      FD.append("ceramic_drawer", changeData.ceramic_drawer);
      FD.append("ceramic_drawer_qty", changeData.ceramic_drawer_qty);
    }

    FD.append("ceramic_tiles_included", changeData.ceramic_tiles_included);

    if (changeData.ceramic_tiles_included) {
      FD.append("ceramic_tiles", changeData.ceramic_tiles);
      FD.append("ceramic_tiles_qty", changeData.ceramic_tiles_qty);
    }

    FD.append("mattress", changeData.mattress);
    FD.append("mattress_length", changeData.mattress_length);
    FD.append("mattress_breadth", changeData.mattress_breadth);
    FD.append("plywood", changeData.plywood);


    FD.append("range", changeData.range);
    FD.append("category_id", changeData.category_name);
    FD.append("back_style", changeData.back_style);
    FD.append("sub_category_id", changeData.sub_category_name);
    FD.append("polish_time", changeData.polish_time);
    FD.append("manufacturing_time", changeData.manufacturing_time);
    FD.append("product_title", changeData.product_title);
    FD.append("product_description", changeData.product_description);
    FD.append("selling_points", JSON.stringify(changeData.selling_points));
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

    FD.append("top_size_length", changeData.top_size_length);
    FD.append("top_size_breadth", changeData.top_size_breadth);
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

    const res = addDraft(FD);


    res
      .then((data) => {
        // //console.log(data.status);

        if (data.status === 203) {
          dispatch(setAlert({
            open: true,
            variant: "error",
            message: data.data.message,
          }));
        } else {

          handleClose();
          dispatch(setAlert({
            open: true,
            variant: "success",
            message: data.data.message,
          }));
        }
      })
      .catch((err) => {
        // //console.log(err);
        dispatch(setAlert({
          open: true,
          variant: "error",
          message: "Something Went Wrong !!!",
        }));
      });
  };
  const handleVariation = (e) => {
    e.preventDefault();

    const FD = new FormData();
    files.map((element) => {
      if (element.validate) return FD.append("product_image", element);
    });
    FD.append('savedImages', JSON.stringify(changeData.savedImages));

    FD.append("status", true);
    FD.append("parent_SKU", changeData.SKU);

    FD.append('SKU', SKU);

    FD.append("variant_label", changeData.variant_label);
    FD.append("specification_image", changeData.specification_image);
    FD.append("featured_image", changeData.featured_image);
    FD.append("mannequin_image", changeData.mannequin_image);
    FD.append("wood_weight", changeData.wood_weight);
    FD.append("metal_weight", changeData.metal_weight);
    FD.append("package_weight", changeData.package_weight);

    console.log(changeData.primary_material)

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
    catalog.wheel.map((item) => {
      return (
        item.SKU === changeData.wheel && FD.append("wheel_name", item.title)
      );
    });
    catalog.handle.map((item) => {
      return (
        item.SKU === changeData.handle &&
        FD.append("handle_name", item.title)
      );
    });
    catalog.ceramic_tiles.map((item) => {
      return (
        item.SKU === changeData.ceramic_tiles &&
        FD.append("ceramic_tiles_name", item.title)
      );
    });
    catalog.ceramic_drawer.map((item) => {
      return (
        item.SKU === changeData.ceramic_drawer &&
        FD.append("ceramic_drawer_name", item.title)
      );
    });

    catalog.fabric.map((item) => {
      return (
        item.fabric === changeData.fabric &&
        FD.append("fabric_name", item.title)
      );
    });

    catalog.wheel.map((item) => {
      return (
        item.wheel === changeData.wheel &&
        FD.append("wheel_name", item.title)
      );
    });

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
    FD.append("amazon_url", changeData.amazon_url);
    FD.append("flipkart_url", changeData.flipkart_url);
    FD.append("jiomart_url", changeData.jiomart_url);

    FD.append("cradle_bed", changeData.cradle_bed);
    if (changeData.cradle_bed) {
      FD.append("cradle_bed_depth", changeData.cradle_bed_depth);
      FD.append("cradle_bed_height", changeData.cradle_bed_height);
      FD.append("cradle_bed_width", changeData.cradle_bed_width);
    }

    FD.append("wheel_included", changeData.wheel_included);

    if (changeData.wheel_included) {
      FD.append("wheel_qty", changeData.wheel_qty);
      FD.append("wheel", changeData.wheel);
    }
    if (changeData.handle !== 'None') {
      FD.append("handle_qty", changeData.handle_qty);
    }
    if (changeData.hinge !== 'None') {
      FD.append("hinge_qty", changeData.hinge_qty);
    }
    if (changeData.door !== 'None') {
      FD.append("door_qty", changeData.door_qty);
    }
    if (changeData.knob !== 'None') {
      FD.append("knob_qty", changeData.knob_qty);
    }
    if (changeData.fabric !== 'None') {
      FD.append("fabric_qty", changeData.fabric_qty);
    }

    FD.append("ceramic_drawer_included", changeData.ceramic_drawer_included);

    if (changeData.ceramic_drawer_included) {
      FD.append("ceramic_drawer", changeData.ceramic_drawer);
      FD.append("ceramic_drawer_qty", changeData.ceramic_drawer_qty);
    }

    FD.append("ceramic_tiles_included", changeData.ceramic_tiles_included);

    if (changeData.ceramic_tiles_included) {
      FD.append("ceramic_tiles", changeData.ceramic_tiles);
      FD.append("ceramic_tiles_qty", changeData.ceramic_tiles_qty);
    }

    FD.append("mattress", changeData.mattress);
    FD.append("mattress_length", changeData.mattress_length);
    FD.append("mattress_breadth", changeData.mattress_breadth);
    FD.append("plywood", changeData.plywood);


    FD.append("range", changeData.range);
    FD.append("category_id", changeData.category_name);
    FD.append("back_style", changeData.back_style);
    FD.append("sub_category_id", changeData.sub_category_name);
    FD.append("polish_time", changeData.polish_time);
    FD.append("manufacturing_time", changeData.manufacturing_time);
    FD.append("product_title", changeData.product_title);
    FD.append("product_description", changeData.product_description);
    FD.append("selling_points", JSON.stringify(changeData.selling_points));
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
    FD.append("CVW", changeData.CVW);

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

    FD.append("top_size_length", changeData.top_size_length);
    FD.append("top_size_breadth", changeData.top_size_breadth);
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
          dispatch(setAlert({
            open: true,
            variant: "error",
            message: data.data.message,
          }));
        } else {
          form.setRow(old => ({
            ...old, data: [...old.data, {
              id: old.data.length + 1,
              SKU: data.data.response.SKU,
              CVW: data.data.response.CVW,
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
              mannequin_image: data.data.response.mannequin_image,
              specification_image: data.data.response.specification_image,
              primary_material: data.data.response.primary_material,
              primary_material_name: data.data.response.primary_material_name,
              warehouse: data.data.response.warehouse,
              warehouse_name: data.data.response.warehouse_name,
              length_main: data.data.response.length_main,
              breadth: data.data.response.breadth,
              height: data.data.response.height,
              bangalore_stock: data.data.response.bangalore_stock,
              jodhpur_stock: data.data.response.jodhpur_stock,
              weight: data.data.response.weight,
              polish: data.data.response.polish,
              polish_name: data.data.response.polish_name,
              hinge: data.data.response.hinge,
              hinge_qty: data.data.response.hinge_qty,
              hinge_name: data.data.response.hinge_name,
              knob: data.data.response.knob,
              knob_qty: data.data.response.knob_qty,
              knob_name: data.data.response.knob_name,
              handle: data.data.response.handle,
              handle_qty: data.data.response.handle_qty,
              handle_name: data.data.response.handle_name,
              door: data.data.response.door,
              door_qty: data.data.response.door_qty,
              door_name: data.data.response.door_name,
              fitting: data.data.response.fitting,
              fitting_name: data.data.response.fitting_name,
              selling_points: data.data.response.selling_points,
              dial_size: data.data.response.dial_size,
              seating_size_width: data.data.response.seating_size_width,
              seating_size_depth: data.data.response.seating_size_depth,
              seating_size_height: data.data.response.seating_size_height,
              weight_capacity: data.data.response.weight_capacity,
              fabric: data.data.response.fabric,
              fabric_qty: data.data.response.fabric_qty,
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
              mobile_store: data.data.response.mobile_store,
              online_store: data.data.response.online_store,
              range: data.data.response.range,
              back_style: data.data.response.back_style,
              package_length: data.data.response.package_length,
              package_height: data.data.response.package_height,
              package_breadth: data.data.response.package_breadth,
              quantity: data.data.response.quantity,
              unit: data.data.response.unit,
              assembly_level: data.data.response.assembly_level,
              continue_selling: data.data.response.continue_selling,
              wheel: data.data.response.wheel,
              wheel_included: data.data.response.wheel_included,
              wheel_qty: data.data.response.wheel_qty,
              wheel_name: data.data.response.wheel_name,
              ceramic_tiles: data.data.response.ceramic_tiles,
              ceramic_tiles_qty: data.data.response.ceramic_tiles_qty,
              ceramic_tiles_included: data.data.response.ceramic_tiles_included,
              ceramic_tiles_name: data.data.response.ceramic_tiles_name,
              ceramic_drawers: data.data.response.ceramic_drawers,
              ceramic_drawers_included: data.data.response.ceramic_drawers_included,
              ceramic_drawers_name: data.data.response.ceramic_drawers_name,
              mattress: data.data.response.mattress,
              mattress_length: data.data.response.mattress_length,
              mattress_breadth: data.data.response.mattress_breadth,
              plywood: data.data.response.plywood,
              top_size_breadth: data.data.response.top_size_breadth,
              top_size_length: data.data.response.top_size_length,
              ceramic_drawers_qty: data.data.response.ceramic_drawers_qty,
              variations: data.data.response.variations,
              variant_label: data.data.response.variant_label,
              parent_SKU: data.data.response.parent_SKU,
              amazon_url: data.data.response.amazon_url,
              flipkart_url: data.data.response.flipkart_url,
              jiomart_url: data.data.response.jiomart_url,

              action: data.data.response
            }]
          }))
          handleClose();
          dispatch(setAlert({
            open: true,
            variant: "success",
            message: data.data.message,
          }));
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch(setAlert({
          open: true,
          variant: "error",
          message: "Something Went Wrong !!!",
        }));
      });
  };

  const handleUpdateProduct = (e) => {
    e.preventDefault();

    const FD = new FormData();

    FD.append("DID", SKU);
    FD.append("AID", changeData.SKU);
    FD.append("type", 'Product');
    FD.append("operation", 'updateProduct');
    FD.append("parentProduct", changeData.SKU);
    FD.append("variations", changeData.variations);
    FD.append("variant_label", changeData.variant_label);
    FD.append("amazon_url", changeData.amazon_url);
    FD.append("flipkart_url", changeData.flipkart_url);
    FD.append("jiomart_url", changeData.jiomart_url);
    FD.append("wood_weight", changeData.wood_weight);
    FD.append("metal_weight", changeData.metal_weight);
    FD.append("package_weight", changeData.package_weight);


    files.map((element) => {
      if (element.validate) return FD.append("product_image", element);
    });
    FD.append('savedImages', JSON.stringify(changeData.savedImages));

    FD.append("_id", changeData._id);

    FD.append("specification_image", changeData.specification_image);
    FD.append("featured_image", changeData.featured_image);
    FD.append("mannequin_image", changeData.mannequin_image);

    console.log(changeData.primary_material)

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
    catalog.wheel.map((item) => {
      return (
        item.SKU === changeData.wheel && FD.append("wheel_name", item.title)
      );
    });
    catalog.handle.map((item) => {
      return (
        item.SKU === changeData.handle &&
        FD.append("handle_name", item.title)
      );
    });
    catalog.ceramic_tiles.map((item) => {
      return (
        item.SKU === changeData.ceramic_tiles &&
        FD.append("ceramic_tiles_name", item.title)
      );
    });
    catalog.ceramic_drawer.map((item) => {
      return (
        item.SKU === changeData.ceramic_drawer &&
        FD.append("ceramic_drawer_name", item.title)
      );
    });

    catalog.fabric.map((item) => {
      return (
        item.fabric === changeData.fabric &&
        FD.append("fabric_name", item.title)
      );
    });

    catalog.wheel.map((item) => {
      return (
        item.wheel === changeData.wheel &&
        FD.append("wheel_name", item.title)
      );
    });

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

    FD.append("cradle_bed", changeData.cradle_bed);
    if (changeData.cradle_bed) {
      FD.append("cradle_bed_depth", changeData.cradle_bed_depth);
      FD.append("cradle_bed_height", changeData.cradle_bed_height);
      FD.append("cradle_bed_width", changeData.cradle_bed_width);
    }

    FD.append("wheel_included", changeData.wheel_included);

    if (changeData.wheel_included) {
      FD.append("wheel_qty", changeData.wheel_qty);
      FD.append("wheel", changeData.wheel);
    }
    if (changeData.handle !== 'None') {
      FD.append("handle_qty", changeData.handle_qty);
    }
    if (changeData.hinge !== 'None') {
      FD.append("hinge_qty", changeData.hinge_qty);
    }
    if (changeData.door !== 'None') {
      FD.append("door_qty", changeData.door_qty);
    }
    if (changeData.knob !== 'None') {
      FD.append("knob_qty", changeData.knob_qty);
    }
    if (changeData.fabric !== 'None') {
      FD.append("fabric_qty", changeData.fabric_qty);
    }

    FD.append("ceramic_drawer_included", changeData.ceramic_drawer_included);

    if (changeData.ceramic_drawer_included) {
      FD.append("ceramic_drawer", changeData.ceramic_drawer);
      FD.append("ceramic_drawer_qty", changeData.ceramic_drawer_qty);
    }

    FD.append("ceramic_tiles_included", changeData.ceramic_tiles_included);

    if (changeData.ceramic_tiles_included) {
      FD.append("ceramic_tiles", changeData.ceramic_tiles);
      FD.append("ceramic_tiles_qty", changeData.ceramic_tiles_qty);
    }

    FD.append("mattress", changeData.mattress);
    FD.append("mattress_length", changeData.mattress_length);
    FD.append("mattress_breadth", changeData.mattress_breadth);
    FD.append("plywood", changeData.plywood);


    FD.append("range", changeData.range);
    FD.append("category_id", changeData.category_name);
    FD.append("back_style", changeData.back_style);
    FD.append("sub_category_id", changeData.sub_category_name);
    FD.append("polish_time", changeData.polish_time);
    FD.append("manufacturing_time", changeData.manufacturing_time);
    FD.append("product_title", changeData.product_title);
    FD.append("product_description", changeData.product_description);
    FD.append("selling_points", JSON.stringify(changeData.selling_points));
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
    FD.append("CVW", changeData.CVW);

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

    FD.append("top_size_length", changeData.top_size_length);
    FD.append("top_size_breadth", changeData.top_size_breadth);
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

    const res = addDraft(FD);


    res
      .then((data) => {
        // //console.log(data.status);

        if (data.status === 203) {
          dispatch(setAlert({
            open: true,
            variant: "error",
            message: data.data.message,
          }));
        } else {

          handleClose();
          dispatch(setAlert({
            open: true,
            variant: "success",
            message: data.data.message,
          }));
        }
      })
      .catch((err) => {
        // //console.log(err);
        dispatch(setAlert({
          open: true,
          variant: "error",
          message: "Something Went Wrong !!!",
        }));
      });
  };

  const handleMergeProduct = (e) => {
    e.preventDefault();

    const FD = new FormData();


    files.map((element) => {
      if (element.validate) return FD.append("product_image", element);
    });

    FD.append("specification_image", changeData.specification_image || '');
    FD.append("featured_image", changeData.featured_image || '');
    FD.append("mannequin_image", changeData.mannequin_image || '');

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


    let Product_SKU = [];

    if (changeData.product_articles.length > 0)
      Product_SKU = changeData.product_articles.map(SKU => ({ SKU: SKU, qty: changeData[SKU] || 0 }));


    FD.append('product_articles', JSON.stringify(Product_SKU));

    FD.append("product_description", changeData.product_description);
    FD.append("seo_title", changeData.seo_title);
    FD.append("seo_description", changeData.seo_description);
    FD.append("seo_keyword", changeData.seo_keyword);
    FD.append("selling_points", JSON.stringify(changeData.selling_points));

    if (changeData.jodhpur_stock && changeData.jodhpur_stock > 0)
      FD.append("jodhpur_stock", changeData.jodhpur_stock);

    if (changeData.bangalore_stock && changeData.bangalore_stock > 0)
      FD.append("bangalore_stock", changeData.bangalore_stock);



    FD.append("category_id", changeData.category_name);
    FD.append("sub_category_id", changeData.sub_category_name);
    FD.append("product_title", changeData.product_title);
    FD.append("COD", changeData.COD);
    FD.append("returnDays", changeData.returnable ? changeData.returnDays : 0);
    FD.append("returnable", changeData.returnable);
    FD.append("M", SKU);
    FD.append("polish_time", changeData.polish_time);
    FD.append("manufacturing_time", changeData.manufacturing_time);
    FD.append("package_length", changeData.package_length ? changeData.package_length : 0);
    FD.append("package_height", changeData.package_height ? changeData.package_height : 0);
    FD.append("package_breadth", changeData.package_breadth ? changeData.package_breadth : 0);
    FD.append("warehouse", changeData.warehouse);

    FD.append(
      "showroom_price",
      changeData.showroom_price ? changeData.showroom_price : 0
    );

    FD.append("discount_limit", changeData.discount_limit);
    FD.append("selling_price", changeData.selling_price);

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

    const res = addMergeProduct(FD);

    res
      .then((data) => {
        if (data.status === 203) {
          dispatch(setAlert({
            open: true,
            variant: "error",
            message: data.data.message,
          }));
        } else {
          form.setRow(old => ({
            ...old, total: old.total + 1, data: [...form.row, {
              id: form.row.length + 1,
              M: data.data.response.M,
              product_articles: data.data.response.product_articles,
              product_title: data.data.response.product_title,
              category_name: data.data.response.category_name,
              sub_category_name: data.data.response.category_name,
              category_id: data.data.response.category_id,
              sub_category_id: data.data.response.category_id,
              warehouse: data.data.response.warehouse,
              warehouse_name: data.data.response.warehouse_name,
              bangalore_stock: data.data.response.bangalore_stock,
              jodhpur_stock: data.data.response.jodhpur_stock,
              product_description: data.data.response.product_description,
              product_image: data.data.response.product_image,
              featured_image: data.data.response.featured_image,
              mannequin_image: data.data.response.mannequin_image,
              specification_image: data.data.response.specification_image,
              selling_points: data.data.response.selling_points,
              selling_price: data.data.response.selling_price,
              showroom_price: data.data.response.showroom_price,
              discount_limit: data.data.response.discount_limit,
              mobile_store: data.data.response.mobile_store,
              online_store: data.data.response.online_store,
              continue_selling: data.data.response.continue_selling,
              COD: data.data.response.COD,
              returnDays: data.data.response.returnDays,
              returnable: data.data.response.returnable,
              polish_time: data.data.response.polish_time,
              manufacturing_time: data.data.response.manufacturing_time,
              package_length: data.data.response.package_length,
              package_height: data.data.response.package_height,
              package_breadth: data.data.response.package_breadth,
              seo_title: data.data.response.seo_title,
              seo_description: data.data.response.seo_description,
              seo_keyword: data.data.response.seo_keyword,
              action: data.data.response._id
            }]
          }))
          handleClose();
          dispatch(setAlert({
            open: true,
            variant: "success",
            message: data.data.message,
          }));
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch(setAlert({
          open: true,
          variant: "error",
          message: "Something Went Wrong !!!",
        }));
      });
  };
  const handleUpdateMergeProduct = (e) => {
    e.preventDefault();

    const FD = new FormData();

    FD.append("_id", form.payload.row.action);

    files.map((element) => {
      if (element.validate) return FD.append("product_image", element);
    });

    FD.append("specification_image", changeData.specification_image || '');
    FD.append("featured_image", changeData.featured_image || '');
    FD.append("mannequin_image", changeData.mannequin_image || '');

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


    let Product_SKU = [];

    if (changeData.product_articles.length > 0)
      Product_SKU = changeData.product_articles.map(SKU => ({ SKU: SKU, qty: changeData[SKU] || 0 }));


    FD.append('product_articles', JSON.stringify(Product_SKU));

    FD.append("product_description", changeData.product_description);
    FD.append("savedImages", JSON.stringify(changeData.savedImages));
    FD.append("seo_title", changeData.seo_title);
    FD.append("seo_description", changeData.seo_description);
    FD.append("seo_keyword", changeData.seo_keyword);
    FD.append("selling_points", JSON.stringify(changeData.selling_points));

    if (changeData.jodhpur_stock && changeData.jodhpur_stock > 0)
      FD.append("jodhpur_stock", changeData.jodhpur_stock);

    if (changeData.bangalore_stock && changeData.bangalore_stock > 0)
      FD.append("bangalore_stock", changeData.bangalore_stock);



    FD.append("category_id", changeData.category_name);
    FD.append("sub_category_id", changeData.sub_category_name);
    FD.append("product_title", changeData.product_title);
    FD.append("COD", changeData.COD);
    FD.append("returnDays", changeData.returnable ? changeData.returnDays : 0);
    FD.append("returnable", changeData.returnable);

    FD.append("polish_time", changeData.polish_time);
    FD.append("manufacturing_time", changeData.manufacturing_time);
    FD.append("package_length", changeData.package_length ? changeData.package_length : 0);
    FD.append("package_height", changeData.package_height ? changeData.package_height : 0);
    FD.append("package_breadth", changeData.package_breadth ? changeData.package_breadth : 0);
    FD.append("warehouse", changeData.warehouse);

    FD.append(
      "showroom_price",
      changeData.showroom_price ? changeData.showroom_price : 0
    );

    FD.append("discount_limit", changeData.discount_limit);
    FD.append("selling_price", changeData.selling_price);

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

    const res = updateMergeProduct(FD);

    res
      .then((data) => {
        if (data.status === 203) {
          dispatch(setAlert({
            open: true,
            variant: "error",
            message: data.data.message,
          }));
        } else {
          console.log(data.data.updates.product_articles)
          form.setRow(old => ({
            ...old, data: form.row.map((set) => {
              if (set.action === form.payload.row.action) {
                set.product_title = changeData.product_title;
                set.product_articles = data.data.updates.product_articles
                set.category_name = data.data.updates.category_name;
                set.category_id = data.data.updates.category_id;
                set.sub_category_name = data.data.updates.sub_category_name;
                set.sub_category_id = data.data.updates.sub_category_id;
                set.featured_image = data.data.updates.featured_image;
                set.mannequin_image = data.data.updates.mannequin_image;
                set.specification_image = data.data.updates.specification_image;
                set.warehouse = data.data.updates.warehouse;
                set.warehouse_name = data.data.updates.warehouse_name;
                set.bangalore_stock = data.data.updates.bangalore_stock;
                set.jodhpur_stock = data.data.updates.jodhpur_stock;
                set.product_description = data.data.updates.product_description;
                set.product_image = data.data.updates.product_image;
                set.selling_points = data.data.updates.selling_points;
                set.selling_price = data.data.updates.selling_price;
                set.showroom_price = data.data.updates.showroom_price;
                set.discount_limit = data.data.updates.discount_limit;
                set.mobile_store = data.data.updates.mobile_store;
                set.online_store = data.data.updates.online_store;
                set.continue_selling = data.data.updates.continue_selling;
                set.COD = data.data.updates.COD;
                set.returnDays = data.data.updates.returnDays;
                set.returnable = data.data.updates.returnable;
                set.polish_time = data.data.updates.polish_time;
                set.manufacturing_time = data.data.updates.manufacturing_time;
                set.package_length = data.data.updates.package_length;
                set.package_height = data.data.updates.package_height;
                set.package_breadth = data.data.updates.package_breadth;
                set.seo_title = data.data.updates.seo_title;
                set.seo_description = data.data.updates.seo_description;
                set.seo_keyword = data.data.updates.seo_keyword;
                return set
              }
              else return set;
            })
          }));

          handleClose();
          dispatch(setAlert({
            open: true,
            variant: "success",
            message: data.data.message,
          }));
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch(setAlert({
          open: true,
          variant: "error",
          message: "Something Went Wrong !!!",
        }));
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
          dispatch(setAlert({
            open: true,
            variant: "error",
            message: data.data.message,
          }));
        } else {
          form.setRow([...form.row, {
            id: form.row.length + 1,
            primaryMaterial_name: data.data.response.primaryMaterial_name,
            primaryMaterial_description: data.data.response.primaryMaterial_description,
            primaryMaterial_image: data.data.response.primaryMaterial_image,
            primaryMaterial_status: data.data.response.primaryMaterial_status,
            action: data.data.response
          }])
          form.setCheck(old => [...old, data.data.response.primaryMaterial_status])
          setImages([]);
          handleClose();
          dispatch(setAlert({
            open: true,
            variant: "success",
            message: data.data.message,
          }));
        }
      })
      .catch((err) => {
        console.log(err);
        setImages([]);
        dispatch(setAlert({
          open: true,
          variant: "error",
          message: "Something Went Wrong !!!",
        }));
      });
  };

  const handleUpdatePrimaryMaterial = (e) => {
    e.preventDefault();

    const FD = new FormData();

    FD.append("_id", form.payload.row.action);

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
          dispatch(setAlert({
            open: true,
            variant: "error",
            message: data.data.message,
          }));
        } else {
          form.setRow(form.row.map((set) => {
            if (set.action === form.payload.row.action) {
              set.primaryMaterial_description = e.target.primaryMaterial_description.value;
              set.primaryMaterial_name = e.target.primaryMaterial_name.value;
              set.primaryMaterial_image = Image[0] !== undefined ? `${imageLink}${Image[0].path}` : console.log()

            }
            return set;
          }))
          setImages([]);
          handleClose();
          dispatch(setAlert({
            open: true,
            variant: "success",
            message: data.data.message,
          }));
        }
      })
      .catch((err) => {
        // //console.log(err);
        setImages([]);
        dispatch(setAlert({
          open: true,
          variant: "error",
          message: "Something Went Wrong !!!",
        }));
      });
  };


  const handleSupplier = (e) => {
    e.preventDefault();

    const FD = new FormData();

    FD.append("supplier_name", e.target.supplier_name.value);
    FD.append("mobile", e.target.mobile.value);
    FD.append("gst_no", e.target.gst_no.value);
    FD.append("alt_mobile", e.target.alt_mobile.value);
    FD.append("specialization", e.target.specialization.value);
    FD.append("SID", e.target.SID.value);
    FD.append("address", e.target.address.value);

    const res = addSupplier(FD);

    res
      .then((data) => {
        //console.log(data.status);

        if (data.status === 200) {
          form.setRow([...form.row, {
            id: form.row.length + 1,
            supplier_name: data.data.response.supplier_name,
            mobile: data.data.response.mobile,
            gst_no: data.data.response.gst_no,
            alt_mobile: data.data.response.alt_mobile,
            specialization: data.data.response.specialization,
            SID: data.data.response.SID,
            address: data.data.response.address,
            action: data.data.response._id
          }])
          handleClose();
          dispatch(setAlert({
            open: true,
            variant: "success",
            message: data.data.message,
          }));
        } else {
          dispatch(setAlert({
            open: true,
            variant: "error",
            message: data.data.message,
          }));
        }
      })
      .catch((err) => {
        //console.log(err);
        dispatch(setAlert({
          open: true,
          variant: "error",
          message: "Something Went Wrong !!!",
        }));
      });
  };

  const handleUpdateSupplier = (e) => {
    e.preventDefault();

    const FD = new FormData();
    FD.append("_id", form.payload.row.action);


    FD.append("supplier_name", e.target.supplier_name.value);
    FD.append("mobile", e.target.mobile.value);
    FD.append("gst_no", e.target.gst_no.value);
    FD.append("alt_mobile", e.target.alt_mobile.value);
    FD.append("specialization", e.target.specialization.value);
    FD.append("SID", e.target.SID.value);
    FD.append("address", e.target.address.value);


    const res = editSupplier(FD);

    res
      .then((data) => {
        // //console.log(data.status);

        if (data.status === 203) {
          setImages([]);
          dispatch(setAlert({
            open: true,
            variant: "error",
            message: data.data.message,
          }));
        } else {
          form.setRow(form.row.map((set) => {
            if (set.action === form.payload.row.action) {
              set.supplier_name = e.target.supplier_name.value
              set.mobile = e.target.mobile.value
              set.gst_no = e.target.gst_no.value
              set.alt_mobile = e.target.alt_mobile.value
              set.specialization = e.target.specialization.value
              set.SID = e.target.SID.value
              set.address = e.target.address.value
            }
            return set;
          }))
          handleClose();
          dispatch(setAlert({
            open: true,
            variant: "success",
            message: data.data.message,
          }));
        }
      })
      .catch((err) => {
        // //console.log(err);
        setImages([]);
        dispatch(setAlert({
          open: true,
          variant: "error",
          message: "Something Went Wrong !!!",
        }));
      });
  };



  const handleInward = (e) => {
    e.preventDefault();

    const FD = new FormData();

    // merge the Quantities with product SKU number

    let Product_SKU = [];
    let Hardware_SKU = [];

    if (changeData.product_articles.length > 0)
      Product_SKU = changeData.product_articles.map(SKU => ({ [SKU]: changeData[SKU] || 0 }));

    if (changeData.hardware_articles.length > 0)
      Hardware_SKU = changeData.hardware_articles.map(SKU => ({ [SKU]: changeData[SKU] || 0 }));

    FD.append('product_articles', JSON.stringify(Product_SKU));
    FD.append('hardware_articles', JSON.stringify(Hardware_SKU));
    FD.append('warehouse', changeData.warehouse);
    FD.append('supplier', changeData.supplier)
    FD.append('vehicle_no', (e.target.vehicle_no.value).toUpperCase())
    FD.append('driver_name', e.target.driver_name.value);
    FD.append('driver_no', e.target.driver_no.value);


    const res = addInward(FD);

    res
      .then((data) => {

        if (data.status === 203) {
          setImages([]);
          dispatch(setAlert({
            open: true,
            variant: "error",
            message: data.data.message,
          }));
        } else {
          setProductSKU({
            P_SKU: [],
            H_SKU: [],
            supplier: []
          })
          form.setRow([...form.row, {
            id: form.row.length + 1,
            inward_id: data.data.response.inward_id,
            order_no: data.data.response.order_no,
            driver_name: data.data.response.driver_name,
            driver_no: data.data.response.driver_no,
            vehicle_no: data.data.response.vehicle_no,
            supplier: data.data.response.supplier,
            product_articles: data.data.response.product_articles,
            hardware_articles: data.data.response.hardware_articles,
            warehouse: data.data.response.warehouse,
            date: data.data.response.date,
          }])
          handleClose();
          dispatch(setAlert({
            open: true,
            variant: "success",
            message: data.data.message,
          }));
        }
      })
      .catch((err) => {
        console.log(err);
        setImages([]);
        dispatch(setAlert({
          open: true,
          variant: "error",
          message: "Something Went Wrong !!!",
        }));
      });
  };
  const handleOutward = (e) => {
    e.preventDefault();

    const FD = new FormData();


    // merge the Quantities with product SKU number

    let Product_SKU = [];
    let Hardware_SKU = [];

    if (changeData.product_articles.length > 0)
      Product_SKU = changeData.product_articles.map(SKU => ({ [SKU.split('Stock')[0]]: changeData[SKU] || 0 }));

    if (changeData.hardware_articles.length > 0)
      Hardware_SKU = changeData.hardware_articles.map(SKU => ({ [SKU.split('Stock')[0]]: changeData[SKU] || 0 }));

    FD.append('product_articles', JSON.stringify(Product_SKU));
    FD.append('hardware_articles', JSON.stringify(Hardware_SKU));
    FD.append('warehouse', changeData.warehouse);
    FD.append('supplier', changeData.supplier)
    FD.append('purpose', changeData.purpose)
    FD.append('reason', e.target.reason.value)
    FD.append('vehicle_no', e.target.vehicle_no.value.toUpperCase())
    FD.append('driver_name', e.target.driver_name.value)
    FD.append('driver_no', e.target.driver_no.value)


    const res = addOutward(FD);

    res
      .then((data) => {
        // //console.log(data.status);

        if (data.status === 203) {
          setImages([]);
          dispatch(setAlert({
            open: true,
            variant: "error",
            message: data.data.message,
          }));
        } else {
          setProductSKU({
            P_SKU: [],
            H_SKU: [],
            supplier: []
          })
          form.setRow([...form.row, {
            id: form.row.length + 1,
            outward_id: data.data.response.outward_id,
            order_no: data.data.response.order_no,
            driver_name: data.data.response.driver_name,
            driver_no: data.data.response.driver_no,
            vehicle_no: data.data.response.vehicle_no,
            supplier: data.data.response.supplier,
            product_articles: data.data.response.product_articles,
            hardware_articles: data.data.response.hardware_articles,
            warehouse: data.data.response.warehouse,
            purpose: data.data.response.purpose,
            reason: data.data.response.reason,
            date: data.data.response.date,

          }])
          handleClose();
          dispatch(setAlert({
            open: true,
            variant: "success",
            message: data.data.message,
          }));
        }
      })
      .catch((err) => {
        // //console.log(err);
        dispatch(setAlert({
          open: true,
          variant: "error",
          message: "Something Went Wrong !!!",
        }));
      });
  };
  const handleTransfer = (e) => {
    e.preventDefault();

    const FD = new FormData();

    // merge the Quantities with product SKU number

    let Product_SKU = [];
    let Hardware_SKU = [];

    if (changeData.product_articles.length > 0)
      Product_SKU = changeData.product_articles.map(SKU => ({ [SKU.split('Stock')[0]]: changeData[SKU] || 0 }));

    if (changeData.hardware_articles.length > 0)
      Hardware_SKU = changeData.hardware_articles.map(SKU => ({ [SKU.split('Stock')[0]]: changeData[SKU] || 0 }));

    FD.append('product_articles', JSON.stringify(Product_SKU));
    FD.append('hardware_articles', JSON.stringify(Hardware_SKU));
    FD.append('purpose', changeData.purpose)
    FD.append('reason', e.target.reason.value)
    FD.append('warehouse', changeData.warehouse)
    FD.append('warehouse_to', changeData.warehouse_to)


    const res = addTransfer(FD);

    res
      .then((data) => {
        // //console.log(data.status);

        if (data.status === 203) {
          setImages([]);
          dispatch(setAlert({
            open: true,
            variant: "error",
            message: data.data.message,
          }));
        } else {
          setProductSKU({
            P_SKU: [],
            H_SKU: [],
            supplier: []
          })
          form.setRow([...form.row, {
            id: form.row.length + 1,
            transfer_id: data.data.response.transfer_id,
            order_no: data.data.response.order_no,
            warehouse: data.data.response.warehouse,
            product_articles: data.data.response.product_articles,
            hardware_articles: data.data.response.hardware_articles,
            quantity: data.data.response.quantity,
            purpose: data.data.response.purpose,
            reason: data.data.response.reason,
            date: data.data.response.date,
          }])
          handleClose();
          dispatch(setAlert({
            open: true,
            variant: "success",
            message: data.data.message,
          }));
        }
      })
      .catch((err) => {
        // //console.log(err);
        dispatch(setAlert({
          open: true,
          variant: "error",
          message: "Something Went Wrong !!!",
        }));
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
    FD.append("seo_title", changeData.seo_title);
    FD.append("seo_description", changeData.seo_description);
    FD.append("seo_keyword", changeData.seo_keyword);
    FD.append("product_description", changeData.product_description);

    // // //console.log(acceptedFiles[0].name, e.target.category_name.value)

    const res = addSubCategories(FD);

    res
      .then((data) => {
        // //console.log(data.status);

        if (data.status === 203) {
          setImages([]);
          dispatch(setAlert({
            open: true,
            variant: "error",
            message: data.data.message,
          }));
        } else {
          form.setRow([...form.row, {
            id: form.row.length + 1,
            category_id: data.data.response.category_id,
            category_name: data.data.response.category_name,
            sub_category_name: data.data.response.sub_category_name,
            sub_category_status: data.data.response.sub_category_status,
            seo_title: data.data.response.seo_title,
            seo_description: data.data.response.seo_description,
            seo_keyword: data.data.response.seo_keyword,
            product_description: data.data.response.product_description,
            action: data.data.response
          }])
          form.setCheck(old => [...old, data.data.response.sub_category_status])
          setImages([]);
          handleClose();
          dispatch(setAlert({
            open: true,
            variant: "success",
            message: data.data.message,
          }));
        }
      })
      .catch((err) => {
        console.log(err);
        setImages([]);
        dispatch(setAlert({
          open: true,
          variant: "error",
          message: "Something Went Wrong !!!",
        }));
      });
  };
  const handleUpdateSubCategories = (e) => {
    e.preventDefault();

    const FD = new FormData();
    let catName = ''

    // //console.log(form.payload);

    FD.append("_id", form.payload.row.action);

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

    FD.append("seo_title", changeData.seo_title);
    FD.append("seo_description", changeData.seo_description);
    FD.append("seo_keyword", changeData.seo_keyword);
    FD.append("product_description", changeData.product_description);


    const res = editSubCatagories(FD);

    res
      .then((data) => {
        // //console.log(data.status);

        if (data.status === 203) {
          setImages([]);
          dispatch(setAlert({
            open: true,
            variant: "error",
            message: data.data.message,
          }));
        } else {
          form.setRow(form.row.map((set) => {
            if (set.action === form.payload.row.action) {
              set.sub_category_name = e.target.sub_category_name.value;
              set.category_name = catName;
              set.seo_title = changeData.seo_title;
              set.seo_description = changeData.seo_description;
              set.seo_keyword = changeData.seo_keyword;
              set.product_description = changeData.product_description;
            }
            return set;
          }))
          handleClose();
          dispatch(setAlert({
            open: true,
            variant: "success",
            message: data.data.message,
          }));
        }
      })
      .catch((err) => {
        console.log(err);
        setImages([]);
        dispatch(setAlert({
          open: true,
          variant: "error",
          message: "Something Went Wrong !!!",
        }));
      });
  };

  const [url, setUrl] = useState('');

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
          dispatch(setAlert({
            open: true,
            variant: "error",
            message: data.data.message,
          }));
        } else {
          setImages([]);
          setUrl(data.data.url);
          dispatch(setAlert({
            open: true,
            variant: "success",
            message: data.data.message,
          }));
        }
      })
      .catch((err) => {
        // //console.log(err);
        setImages([]);
        dispatch(setAlert({
          open: true,
          variant: "error",
          message: "Something Went Wrong !!!",
        }));
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
          dispatch(setAlert({
            open: true,
            variant: "error",
            message: data.data.message,
          }));
        } else {
          form.setRow([...form.row, {
            id: form.row.length + 1,
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
          dispatch(setAlert({
            open: true,
            variant: "success",
            message: data.data.message,
          }));
        }
      })
      .catch((err) => {
        // //console.log(err);
        setImages([]);
        dispatch(setAlert({
          open: true,
          variant: "error",
          message: "Something Went Wrong !!!",
        }));
      });
  };

  const handleUpdateBlog = (e) => {
    e.preventDefault();

    const FD = new FormData();

    featured.map((element) => {
      return FD.append("banner_image", element);
    });

    FD.append("_id", form.payload.value._id);

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
          dispatch(setAlert({
            open: true,
            variant: "error",
            message: data.data.message,
          }));
        } else {
          form.setRow(form.row.map((set) => {
            if (set.action === form.payload.row.action) {
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
          dispatch(setAlert({
            open: true,
            variant: "success",
            message: data.data.message,
          }));
        }
      })
      .catch((err) => {
        // //console.log(err);
        setImages([]);
        dispatch(setAlert({
          open: true,
          variant: "error",
          message: "Something Went Wrong !!!",
        }));
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
          // setImages([]);
          dispatch(setAlert({
            open: true,
            variant: "error",
            message: data.data.message || "Something Went Wrong !!!",
          }));
        } else {
          // setImages([]);
          // setUrl(data.data.url);
          handleClose();
          dispatch(setAlert({
            open: true,
            variant: "success",
            message: data.data.message,
          }));
        }
      })
      .catch((err) => {
        // //console.log(err);
        setImages([]);
        dispatch(setAlert({
          open: true,
          variant: "error",
          message: "Something Went Wrong !!!",
        }));
      });
  };

  // const handleAddStock = (e) => {
  //   e.preventDefault();

  //   const FD = new FormData();

  //   FD.append("product_id", changeData.product_id);
  //   FD.append("stock", changeData.stock);
  //   FD.append("warehouse", changeData.warehouse);


  //   const res = addInward(FD);

  //   res
  //     .then((data) => {
  //       if (data.status !== 200) {
  //         setImages([]);
  //         dispatch({
  //           type: Notify, payload: {
  //             open: true,
  //             variant: "error",
  //             message: data.data.message || "Something Went Wrong !!!",
  //           }
  //         });
  //       } else {
  //         form.setRow([...form.row, {
  //           id: form.row.length + 1,
  //           product_id: changeData.product_id,
  //           stock: changeData.stock,
  //           warehouse: changeData.warehouse,
  //           action: data.data.response
  //         }])
  //         setImages([]);
  //         setUrl(data.data.url);
  //         handleClose();
  //         dispatch({
  //           type: Notify, payload: {
  //             open: true,
  //             variant: "success",
  //             message: data.data.message,
  //           }
  //         });
  //       }
  //     })
  //     .catch((err) => {
  //       // //console.log(err);
  //       setImages([]);
  //       dispatch({
  //         type: Notify, payload: {
  //           open: true,
  //           variant: "error",
  //           message: "Something Went Wrong !!!",
  //         }
  //       });
  //     });
  // };
  // const handleUpdateStock = (e) => {
  //   e.preventDefault();

  //   const FD = new FormData();

  //   FD.append("product_id", changeData.product_id);
  //   FD.append("stock", changeData.stock);
  //   FD.append("warehouse", changeData.warehouse);


  //   const res = updateStock(FD);

  //   res
  //     .then((data) => {
  //       if (data.status !== 200) {
  //         dispatch({
  //           type: Notify, payload: {
  //             open: true,
  //             variant: "error",
  //             message: data.data.message || "Something Went Wrong !!!",
  //           }
  //         });
  //       } else {
  //         form.setRow(form.row.map((set) => {

  //           if (set.action === form.payload.row.action) {
  //             set.stock = changeData.stock;
  //           }
  //           return set;
  //         }))
  //         setUrl(data.data.url);
  //         handleClose();
  //         dispatch({
  //           type: Notify, payload: {
  //             open: true,
  //             variant: "success",
  //             message: data.data.message,
  //           }
  //         });
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       dispatch({
  //         type: Notify, payload: {
  //           open: true,
  //           variant: "error",
  //           message: "Something Went Wrong !!!",
  //         }
  //       });
  //     });
  // };

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

    FD.append("restocking_time", changeData.restocking_time);
    FD.append("selling_points", JSON.stringify(changeData.selling_points));
    FD.append("seo_title", changeData.seo_title);
    FD.append("seo_description", changeData.seo_description);
    FD.append("seo_keyword", changeData.seo_keyword);
    FD.append("hardware_polish", changeData.hardware_polish);
    FD.append("min_quantity", changeData.min_quantity);
    FD.append(
      "continue_selling",
      changeData.continue_selling ? changeData.continue_selling : true
    );


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
          dispatch(setAlert({
            open: true,
            variant: "error",
            message: data.data.message,
          }));
        } else {
          form.setRow([...form.row, {
            id: form.row.length + 1,
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
            action: data.data.response._id
          }])
          handleClose();
          dispatch(setAlert({
            open: true,
            variant: "success",
            message: data.data.message,
          }));
        }
      })
      .catch((err) => {
        // //console.log(err);
        dispatch(setAlert({
          open: true,
          variant: "error",
          message: "Something Went Wrong !!!",
        }));
      });
  };

  const handleUpdateHardware = (e) => {
    e.preventDefault();

    const FD = new FormData();

    console.log(form.payload.row.action)
    FD.append("_id", form.payload.row.action);

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

    FD.append("restocking_time", changeData.restocking_time || 0);
    FD.append("selling_points", JSON.stringify(changeData.selling_points));
    FD.append("seo_title", changeData.seo_title);
    FD.append("seo_description", changeData.seo_description);
    FD.append("seo_keyword", changeData.seo_keyword);
    FD.append("hardware_polish", changeData.hardware_polish);
    FD.append("min_quantity", changeData.min_quantity);
    FD.append(
      "continue_selling",
      changeData.continue_selling ? changeData.continue_selling : true
    );


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
          dispatch(setAlert({
            open: true,
            variant: "error",
            message: data.data.message,
          }));
        } else {
          form.setRow(form.row.map((set) => {

            if (set.action === form.payload.row.action) {
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
          dispatch(setAlert({
            open: true,
            variant: "success",
            message: data.data.message,
          }));
        }
      })
      .catch((err) => {
        // //console.log(err);
        dispatch(setAlert({
          open: true,
          variant: "error",
          message: "Something Went Wrong !!!",
        }));
      });
  };

  const handlePolish = (e) => {
    e.preventDefault();

    const FD = new FormData();

    FD.append("polish_name", e.target.polish_name.value);
    FD.append("polish_type", changeData.polish_type);
    FD.append("polish_finish", changeData.polish_finish);
    FD.append("level", changeData.level);
    FD.append("lock", e.target.lock.checked);
    FD.append("price", e.target.price.value);


    files.map((element) => {
      if (element.validate) return FD.append("outDoor_image", element);
    });
    Indoor.map((element) => {
      if (element.validate) return FD.append("inDoor_image", element);
    });


    const res = addPolish(FD);

    res
      .then((data) => {
        // //console.log(data.status);

        if (data.status === 203) {
          dispatch(setAlert({
            open: true,
            variant: "error",
            message: data.data.message,
          }));
        } else {
          form.setRow([...form.row, {
            id: form.row.length + 1,
            polish_name: data.data.response.polish_name,
            polish_type: data.data.response.polish_type,
            polish_finish: data.data.response.polish_finish,
            outDoor_image: data.data.response.outDoor_image,
            inDoor_image: data.data.response.inDoor_image,
            lock: data.data.response.lock,
            price: data.data.response.price,
            action: data.data.response
          }])
          handleClose();
          dispatch(setAlert({
            open: true,
            variant: "success",
            message: data.data.message,
          }));
        }
      })
      .catch((err) => {

        dispatch(setAlert({
          open: true,
          variant: "error",
          message: "Something Went Wrong !!!",
        }));
      });
  };
  const handleUpdatePolish = (e) => {
    e.preventDefault();

    const FD = new FormData();

    FD.append('_id', changeData._id);

    FD.append("polish_type", changeData.polish_type);
    FD.append("polish_finish", changeData.polish_finish);
    FD.append("level", changeData.level);
    FD.append("polish_name", changeData.polish_name);
    FD.append("lock", changeData.lock);
    FD.append("price", changeData.price);
    FD.append("savedOutDoor", JSON.stringify(changeData.savedImages));
    FD.append("savedIndoor", JSON.stringify(changeData.indoorSavedImage));


    files.map((element) => {
      if (element.validate) return FD.append("outDoor_image", element);
    });
    Indoor.map((element) => {
      if (element.validate) return FD.append("inDoor_image", element);
    });


    const res = editPolish(FD);

    res
      .then((data) => {
        // //console.log(data.status);

        if (data.status === 203) {
          dispatch(setAlert({
            open: true,
            variant: "error",
            message: data.data.message,
          }));
        } else {
          form.setRow(form.row.map((set) => {

            if (set.action === form.payload.row.action) {
              set.polish_name = changeData.polish_name
              set.polish_type = changeData.polish_type
              set.polish_finish = changeData.polish_finish
              set.level = changeData.level
              set.outDoor_image = changeData.outDoor_image
              set.inDoor_image = changeData.inDoor_image
              set.lock = changeData.lock
              set.price = changeData.price
            }
            return set;
          }))
          handleClose();
          dispatch(setAlert({
            open: true,
            variant: "success",
            message: data.data.message,
          }));
        }
      })
      .catch((err) => {
        //console.log(err);
        setImages([]);
        setIndoor([]);
        dispatch(setAlert({
          open: true,
          variant: "error",
          message: "Something Went Wrong !!!",
        }));
      });
  };

  // load new searchList
  const handleSupplierList = async (e) => {
    const delayDebounceFn = setTimeout(() => {
      getSupplierDropdown(e.target.value)
        .then((res) => {
          setProductSKU(old => ({
            ...old,
            supplier: res.data.Suppliers
          }));
        })
        .catch((err) => {
          setProductSKU(old => ({
            ...old,
            supplier: []
          }));
        })
    }, 1000)
    return () => clearTimeout(delayDebounceFn)

  }
  async function handleSearchStockSKU(e) {
    const delayDebounceFn = setTimeout(() => {
      getStockSKU({ search: e.target.value, warehouse: changeData.warehouse })
        .then((res) => {
          setProductSKU(old => ({
            ...old,
            P_SKU: res.data.P_SKU,
            H_SKU: res.data.H_SKU
          }));
        })
        .catch((err) => {
          setProductSKU(old => ({
            ...old,
            P_SKU: [],
            H_SKU: []
          }));
        })
    }, 1000)
    return () => clearTimeout(delayDebounceFn)

  }
  async function handleSearch(e) {
    const delayDebounceFn = setTimeout(() => {
      getArticlesId(e.target.value)
        .then((res) => {
          setProductSKU(old => ({
            ...old,
            P_SKU: res.data.P_SKU,
            H_SKU: res.data.H_SKU
          }));
        })
        .catch((err) => {
          setProductSKU(old => ({
            ...old,
            P_SKU: [],
            H_SKU: []
          }));
        })
    }, 1000)
    return () => clearTimeout(delayDebounceFn)

  }



  return (
    <>
      <Slide
        direction="left"
        in={form.state}
        mountOnEnter
        unmountOnExit
      >
        <Backdrop
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={form.state}
        >
          <Box
            className={
              mode.type === true ? "mainDarkContainer" : "mainContainer"
            }
            sx={
              form.formType === "product" ||
                form.formType === "update_product"
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

            {form.formType === "product" && (
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
                    encType="multipart/form-data"
                    method="post"
                  >
                    <Stepper
                      className="stepper"
                      activeStep={activeStep}
                      orientation="vertical"
                    >
                      {/* // Specification */}
                      <Step>
                        <StepLabel sx={{ cursor: 'pointer !important' }} onClick={() => setActiveStep(0)}>Specifications</StepLabel>
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

                            <TextField
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

                            <TextField
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

                            <TextField
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

                            <TextField
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

                            <TextField
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

                            <TextField
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

                            <TextField
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

                            <TextField
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

                            <TextField
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

                            <TextField
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
                            <Select
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


                            <TextField
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
                            <Select
                              multiple
                              fullWidth
                              value={changeData.polish}
                              name="polish"
                              onChange={handleProductFelids}
                              renderValue={(selected) => selected.join(", ")}
                            // MenuProps={MenuProps}
                            >
                              {catalog.polish.length > 0 && catalog.polish.map((option, index) => (
                                <MenuItem
                                  key={option.polish_name}
                                  value={option.polish_name}
                                >
                                  <Checkbox
                                    checked={
                                      changeData.polish.indexOf(
                                        option.polish_name
                                      ) > -1
                                    }
                                  />
                                  <ListItemText
                                    primary={option.polish_name}
                                  />
                                </MenuItem>
                              ))}
                            </Select>
                            {/* 
                            <TextField sx={{ mb : 1 }}
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

                                <TextField
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

                                <TextField sx={{ mt: 1, mb: 1 }}
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

                                <TextField
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
                                  name="online_store"
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
                        <StepLabel sx={{ cursor: 'pointer !important' }} onClick={() => setActiveStep(1)}>Images</StepLabel>
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
                            <TextField
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
                            <TextField
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
                            <TextField
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
                        <StepLabel sx={{ cursor: 'pointer !important' }} onClick={() => setActiveStep(2)}>Features</StepLabel>
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
                                    checked={changeData.ceramic_drawer_included}
                                    onChange={handleProductFelids}
                                    name="ceramic_drawer_included"
                                  />
                                }
                                label="Ceramic Drawers"
                              />

                              {changeData.ceramic_drawer_included && <><TextField sx={{ mt: 2, mb: 1 }}
                                size="small"
                                fullWidth
                                id="outlined-select"
                                select
                                name="ceramic_drawer"
                                label="Ceramic Drawer"
                                multiple
                                value={changeData.ceramic_drawer}
                                onChange={handleProductFelids}
                                helperText="Please select your Ceramic Tiles."
                              >
                                {catalog.ceramic_drawer.map(
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
                                <TextField

                                  value={changeData.ceramic_drawer_qty}
                                  onChange={handleProductFelids}
                                  size={'small'}
                                  fullWidth
                                  label='Ceramic Drawer Quantity'
                                  type='number'
                                  helperText='Enter the number of ceramic drawer included.'
                                  name='ceramic_drawer_qty' />
                              </>}


                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={changeData.ceramic_tiles_included}
                                    onChange={handleProductFelids}
                                    name="ceramic_tiles_included"
                                  />
                                }
                                label="Ceramic Tiles"
                              />
                            </FormGroup>
                            {changeData.ceramic_tiles_included && <><TextField sx={{ mt: 2, mb: 1 }}
                              size="small"
                              fullWidth
                              id="outlined-select"
                              select
                              name="ceramic_tiles"
                              label="Ceramic Tiles"
                              multiple
                              value={changeData.ceramic_tiles}
                              onChange={handleProductFelids}
                              helperText="Please select your Ceramic Tiles."
                            >
                              {catalog.ceramic_tiles.map(
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
                              <TextField

                                value={changeData.ceramic_tiles_qty}
                                onChange={handleProductFelids}
                                size={'small'}
                                fullWidth
                                label='Ceramic Tiles Quantity'
                                type='number'
                                helperText='Enter the number of ceramic tiles included.'
                                name='ceramic_tiles_qty' />
                            </>}
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
                        <StepLabel sx={{ cursor: 'pointer !important' }} onClick={() => setActiveStep(3)}>Miscellaneous</StepLabel>
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
                            </Box>



                            <TextField
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

                            <TextField
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
                                <TextField
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
                        <StepLabel sx={{ cursor: 'pointer !important' }} onClick={() => setActiveStep(4)}>Inventory & Shipping</StepLabel>
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
                            <Select
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

                                  <TextField
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

                            <TextField
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

                            <TextField
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

                            <TextField
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


                            <Box sx={{ display: 'flex', mb: 1 }}>

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
                        <StepLabel sx={{ cursor: 'pointer !important' }} onClick={() => setActiveStep(5)}>SEO</StepLabel>
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

                            <TextField
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

                            <TextField
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

                            <TextField
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

                            <FormLabel id="demo-radio-buttons-group-label">
                              Selling Points{" "}
                            </FormLabel>

                            <Grid container sx={{ mt: 1 }}>
                              <Grid item xs={12}   >
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
                                maxHeight: '100px', overflowY: 'scroll', mb: 1,
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
                      {/* SEO End */}


                      {/* Extra-details */}
                      <Step>
                        <StepLabel sx={{ cursor: 'pointer !important' }} onClick={() => setActiveStep(6)}>Extra-Details</StepLabel>
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



                            <TextField
                              size="small"
                              fullWidth
                              id="outlined-select"
                              type='number'
                              name="CVW"
                              label="CVW Number"
                              value={changeData.CVW || ''}
                              onChange={handleProductFelids}
                            />

                            <TextField
                              size="small"
                              fullWidth
                              // autoComplete={false}
                              id="fullWidth"
                              label="Wood Weight"
                              type="number"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    Kg
                                  </InputAdornment>
                                ),
                              }}
                              variant="outlined"
                              name="wood_weight"
                              value={changeData.wood_weight}
                              onChange={handleProductFelids}
                            />

                            <TextField
                              size="small"
                              fullWidth
                              // autoComplete={false}
                              id="fullWidth"
                              label=" Metallic Weight"
                              type="number"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    Kg
                                  </InputAdornment>
                                ),
                              }}
                              variant="outlined"
                              name="metal_weight"
                              value={changeData.metal_weight}
                              onChange={handleProductFelids}
                            />

                            <TextField
                              size="small"
                              fullWidth
                              // autoComplete={false}
                              id="fullWidth"
                              label="Packaging Weight"
                              type="number"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    Kg
                                  </InputAdornment>
                                ),
                              }}
                              variant="outlined"
                              name="package_weight"
                              value={changeData.package_weight}
                              onChange={handleProductFelids}
                            />



                            <TextField
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
                              <TextField
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


                            <TextField
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

                            {changeData.hinge !== 'None' && <TextField

                              value={changeData.hinge_qty}
                              size={'small'}
                              helperText="Enter the number of hinges pieces ."
                              fullWidth
                              onChange={handleProductFelids}
                              label='Hinge Quantity'
                              type='number'
                              name='hinge_qty' />}


                            <TextField
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

                            {changeData.knob !== 'None' && <TextField

                              size={'small'}
                              fullWidth
                              helperText="Enter the number of knob pieces ."
                              value={changeData.knob_qty}
                              onChange={handleProductFelids}
                              label='Knob Quantity'
                              type='number'
                              name='knob_qty' />}

                            <TextField
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

                            {changeData.door !== 'None' && <TextField

                              value={changeData.door_qty}
                              helperText="Enter the number of doors."
                              size={'small'}
                              fullWidth
                              onChange={handleProductFelids}
                              label='Door Quantity'
                              type='number'
                              name='door_qty' />}


                            <TextField
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

                            {changeData.handle !== 'None' && <TextField

                              value={changeData.handle_qty}
                              helperText="Enter the number of handles."
                              onChange={handleProductFelids}
                              size={'small'}
                              fullWidth
                              label='Handle Quantity'
                              type='number'
                              name='handle_qty' />}


                            <TextField
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

                                <TextField
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


                                <TextField
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



                            <TextField
                              size="small"
                              fullWidth
                              // autoComplete={false}
                              id="fullWidth"
                              label="Top Size Length"
                              type="number"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    Inch
                                  </InputAdornment>
                                ),
                              }}
                              variant="outlined"
                              name="top_size_length"
                              value={changeData.top_size_length}
                              onChange={handleProductFelids}
                            />
                            <TextField
                              size="small"
                              fullWidth
                              // autoComplete={false}
                              id="fullWidth"
                              label="Top Size Breadth"
                              type="number"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    Inch
                                  </InputAdornment>
                                ),
                              }}
                              variant="outlined"
                              name="top_size_breadth"
                              value={changeData.top_size_breadth}
                              onChange={handleProductFelids}
                            />



                            <TextField
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
                                Wheel Included
                              </FormLabel>
                              <RadioGroup

                                aria-labelledby="demo-radio-buttons-group-label"
                                name="wheel_included"
                                value={changeData.wheel_included || "no"}
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


                            {changeData.wheel_included === "yes" && <><TextField
                              size="small"
                              fullWidth
                              id="outlined-select"
                              select
                              name="wheel"
                              label="Wheel"
                              multiple
                              value={changeData.wheel}
                              onChange={handleProductFelids}
                              helperText="Please select your wheel."
                            >
                              {catalog.wheel.map(
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
                              <TextField

                                value={changeData.wheel_qty}
                                onChange={handleProductFelids}
                                size={'small'}
                                fullWidth
                                label='Wheel Quantity'
                                type='number'
                                helperText='Enter the number of wheel included.'
                                name='wheel_qty' />
                            </>}

                            <FormControl>
                              <FormLabel id="demo-radio-buttons-group-label">
                                Trolley
                              </FormLabel>
                              <RadioGroup


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

                                <TextField
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



                            <TextField
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


                            <TextField
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


                            <TextField
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
                                Plywood Included
                              </FormLabel>
                              <RadioGroup


                                aria-labelledby="demo-radio-buttons-group-label"
                                value={changeData.plywood || "no"}
                                onChange={handleProductFelids}
                                name="plywood"
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


                            <FormControl>
                              <FormLabel id="demo-radio-buttons-group-label">
                                Mattress
                              </FormLabel>
                              <RadioGroup


                                aria-labelledby="demo-radio-buttons-group-label"
                                value={changeData.mattress || "no"}
                                onChange={handleProductFelids}
                                name="mattress"
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


                            {changeData.mattress === "yes" && (
                              <>
                                <TextField
                                  size="small"
                                  fullWidth
                                  type='number'
                                  id="outlined-select"
                                  name="mattress_length"
                                  label="Mattress Length"
                                  value={changeData.mattress_length}
                                  onChange={handleProductFelids}
                                />
                                <TextField
                                  size="small"
                                  type='number'
                                  fullWidth
                                  id="outlined-select"
                                  name="mattress_breadth"
                                  label="Mattress Breadth"
                                  value={changeData.mattress_breadth}
                                  onChange={handleProductFelids}
                                />
                              </>
                            )}



                            <FormControl>
                              <FormLabel id="demo-radio-buttons-group-label">
                                Cradle Bed
                              </FormLabel>
                              <RadioGroup


                                aria-labelledby="demo-radio-buttons-group-label"
                                value={changeData.cradle_bed || "no"}
                                onChange={handleProductFelids}
                                name="cradle_bed"
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


                            {changeData.cradle_bed === "yes" && (
                              <>
                                <TextField
                                  size="small"
                                  fullWidth
                                  type='number'
                                  id="outlined-select"
                                  name="cradle_bed_height"
                                  label="Cradle Bed Height"
                                  value={changeData.cradle_bed_height}
                                  onChange={handleProductFelids}
                                />
                                <TextField
                                  size="small"
                                  type='number'
                                  fullWidth
                                  id="outlined-select"
                                  name="cradle_bed_width"
                                  label="Cradle Bed Width"
                                  value={changeData.cradle_bed_width}
                                  onChange={handleProductFelids}
                                />
                                <TextField
                                  size="small"
                                  type='number'
                                  fullWidth
                                  id="outlined-select"
                                  name="cradle_bed_depth"
                                  label="Cradle Bed Depth"
                                  value={changeData.cradle_bed_depth}
                                  onChange={handleProductFelids}
                                /></>
                            )}




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

                                <TextField
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
                                </TextField>

                                <TextField

                                  value={changeData.fabric_qty}
                                  onChange={handleProductFelids}
                                  size={'small'}
                                  fullWidth
                                  label='Fabric Quantity'
                                  type='number'
                                  helperText='Enter the fabric quantity in meter.'
                                  name='fabric_qty' />
                              </>
                            )}


                            <FormControl  >
                              <FormLabel id="demo-radio-buttons-group-label">
                                Vendor URLs
                              </FormLabel>
                            </FormControl>

                            <TextField
                              type='url'
                              fullWidth

                              size='small'
                              name='amazon_url'
                              label='Amazon'
                              onChange={handleProductFelids}
                              value={changeData.amazon_url}
                              placeholder="https://example.com"
                              pattern="https://.*"

                            />
                            <TextField
                              type='url'

                              size='small'
                              fullWidth
                              placeholder="https://example.com"
                              pattern="https://.*"
                              name='flipkart_url'
                              label='Flipkart'
                              onChange={handleProductFelids}
                              value={changeData.flipkart_url}
                            />
                            <TextField
                              type='url'

                              size='small'
                              fullWidth
                              placeholder="https://example.com"
                              pattern="https://.*"
                              name='jiomart_url'
                              label='Jio Mart'
                              onChange={handleProductFelids}
                              value={changeData.jiomart_url}
                            />



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

            {form.formType === "update_product" && (
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
                    encType="multipart/form-data"
                    method="post"
                  >
                    <Stepper
                      className="stepper"
                      activeStep={activeStep}
                      orientation="vertical"
                    >
                      {/* // Specification */}
                      <Step>
                        <StepLabel sx={{ cursor: 'pointer !important' }} onClick={() => setActiveStep(0)}>Specifications</StepLabel>
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

                            <TextField
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

                            <TextField
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

                            <TextField
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

                            <TextField
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

                            <TextField
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

                            <TextField
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

                            <TextField
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

                            <TextField
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

                            <TextField
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

                            <TextField
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
                            <Select
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



                            <TextField
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
                            <Select
                              multiple
                              fullWidth
                              value={changeData.polish || []}
                              name="polish"
                              onChange={handleProductFelids}
                              renderValue={(selected) => selected.join(", ")}
                            // MenuProps={MenuProps}
                            >
                              {catalog.polish.length > 0 && catalog.polish.map((option, index) => (
                                <MenuItem
                                  key={option.polish_name}
                                  value={option.polish_name}
                                >
                                  <Checkbox
                                    checked={
                                      changeData.polish.indexOf(
                                        option.polish_name
                                      ) > -1
                                    }
                                  />
                                  <ListItemText
                                    primary={option.polish_name}
                                  />
                                </MenuItem>
                              ))}
                            </Select>

                            {/* <TextField sx={{ mb : 1 }}
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

                                <TextField
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

                                <TextField sx={{ mt: 1, mb: 1 }}
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

                                <TextField
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
                                  name="online_store"
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
                        <StepLabel sx={{ cursor: 'pointer !important' }} onClick={() => setActiveStep(1)}>Images</StepLabel>
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
                            <TextField
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
                            <TextField
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
                            <TextField
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
                        <StepLabel sx={{ cursor: 'pointer !important' }} onClick={() => setActiveStep(2)}>Features</StepLabel>
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
                                    checked={changeData.ceramic_drawer_included}
                                    onChange={handleProductFelids}
                                    name="ceramic_drawer_included"
                                  />
                                }
                                label="Ceramic Drawers"
                              />

                              {changeData.ceramic_drawer_included && <><TextField sx={{ mt: 2, mb: 1 }}
                                size="small"
                                fullWidth
                                id="outlined-select"
                                select
                                name="ceramic_drawer"
                                label="Ceramic Drawer"
                                multiple
                                value={changeData.ceramic_drawer}
                                onChange={handleProductFelids}
                                helperText="Please select your Ceramic Tiles."
                              >
                                {catalog.ceramic_drawer.map(
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
                                <TextField

                                  value={changeData.ceramic_drawer_qty}
                                  onChange={handleProductFelids}
                                  size={'small'}
                                  fullWidth
                                  label='Ceramic Drawer Quantity'
                                  type='number'
                                  helperText='Enter the number of ceramic drawer included.'
                                  name='ceramic_drawer_qty' />
                              </>}


                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={changeData.ceramic_tiles_included}
                                    onChange={handleProductFelids}
                                    name="ceramic_tiles_included"
                                  />
                                }
                                label="Ceramic Tiles"
                              />
                            </FormGroup>
                            {changeData.ceramic_tiles_included && <><TextField sx={{ mt: 2, mb: 1 }}
                              size="small"
                              fullWidth
                              id="outlined-select"
                              select
                              name="ceramic_tiles"
                              label="Ceramic Tiles"
                              multiple
                              value={changeData.ceramic_tiles}
                              onChange={handleProductFelids}
                              helperText="Please select your Ceramic Tiles."
                            >
                              {catalog.ceramic_tiles.map(
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
                              <TextField

                                value={changeData.ceramic_tiles_qty}
                                onChange={handleProductFelids}
                                size={'small'}
                                fullWidth
                                label='Ceramic Tiles Quantity'
                                type='number'
                                helperText='Enter the number of ceramic tiles included.'
                                name='ceramic_tiles_qty' />
                            </>}
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
                        <StepLabel sx={{ cursor: 'pointer !important' }} onClick={() => setActiveStep(3)}>Miscellaneous</StepLabel>
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
                            </Box>



                            <TextField
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

                            <TextField
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
                                <TextField
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
                        <StepLabel sx={{ cursor: 'pointer !important' }} onClick={() => setActiveStep(4)}>Inventory & Shipping</StepLabel>
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
                            <Select
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

                                  <TextField
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

                            <TextField
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

                            <TextField
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

                            <TextField
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


                            <Box sx={{ display: 'flex', mb: 1 }}>

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
                        <StepLabel sx={{ cursor: 'pointer !important' }} onClick={() => setActiveStep(5)}>SEO</StepLabel>
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

                            <TextField
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

                            <TextField
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

                            <TextField
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

                            <FormLabel id="demo-radio-buttons-group-label">
                              Selling Points{" "}
                            </FormLabel>

                            <Grid container sx={{ mt: 1 }}>
                              <Grid item xs={12}   >
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
                                maxHeight: '100px', overflowY: 'scroll', mb: 1,
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
                      {/* SEO End */}


                      {/* Extra-details */}
                      <Step>
                        <StepLabel sx={{ cursor: 'pointer !important' }} onClick={() => setActiveStep(6)}>Extra-Details</StepLabel>
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



                            <TextField
                              size="small"
                              fullWidth
                              id="outlined-select"
                              type='number'
                              name="CVW"
                              label="CVW Number"
                              value={changeData.CVW || ''}
                              onChange={handleProductFelids}
                            />

                            <TextField
                              size="small"
                              fullWidth
                              // autoComplete={false}
                              id="fullWidth"
                              label="Wood Weight"
                              type="number"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    Kg
                                  </InputAdornment>
                                ),
                              }}
                              variant="outlined"
                              name="wood_weight"
                              value={changeData.wood_weight}
                              onChange={handleProductFelids}
                            />

                            <TextField
                              size="small"
                              fullWidth
                              // autoComplete={false}
                              id="fullWidth"
                              label=" Metallic Weight"
                              type="number"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    Kg
                                  </InputAdornment>
                                ),
                              }}
                              variant="outlined"
                              name="metal_weight"
                              value={changeData.metal_weight}
                              onChange={handleProductFelids}
                            />

                            <TextField
                              size="small"
                              fullWidth
                              // autoComplete={false}
                              id="fullWidth"
                              label="Packaging Weight"
                              type="number"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    Kg
                                  </InputAdornment>
                                ),
                              }}
                              variant="outlined"
                              name="package_weight"
                              value={changeData.package_weight}
                              onChange={handleProductFelids}
                            />




                            <TextField
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
                              <TextField
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


                            <TextField
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

                            {changeData.hinge !== 'None' && <TextField

                              value={changeData.hinge_qty}
                              size={'small'}
                              helperText="Enter the number of hinges pieces ."
                              fullWidth
                              onChange={handleProductFelids}
                              label='Hinge Quantity'
                              type='number'
                              name='hinge_qty' />}


                            <TextField
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

                            {changeData.knob !== 'None' && <TextField

                              size={'small'}
                              fullWidth
                              helperText="Enter the number of knob pieces ."
                              value={changeData.knob_qty}
                              onChange={handleProductFelids}
                              label='Knob Quantity'
                              type='number'
                              name='knob_qty' />}

                            <TextField
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

                            {changeData.door !== 'None' && <TextField

                              value={changeData.door_qty}
                              helperText="Enter the number of doors."
                              size={'small'}
                              fullWidth
                              onChange={handleProductFelids}
                              label='Door Quantity'
                              type='number'
                              name='door_qty' />}


                            <TextField
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

                            {changeData.handle !== 'None' && <TextField

                              value={changeData.handle_qty}
                              helperText="Enter the number of handles."
                              onChange={handleProductFelids}
                              size={'small'}
                              fullWidth
                              label='Handle Quantity'
                              type='number'
                              name='handle_qty' />}


                            <TextField
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

                                <TextField
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


                                <TextField
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



                            <TextField
                              size="small"
                              fullWidth
                              // autoComplete={false}
                              id="fullWidth"
                              label="Top Size Length"
                              type="number"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    Inch
                                  </InputAdornment>
                                ),
                              }}
                              variant="outlined"
                              name="top_size_length"
                              value={changeData.top_size_length}
                              onChange={handleProductFelids}
                            />
                            <TextField
                              size="small"
                              fullWidth
                              // autoComplete={false}
                              id="fullWidth"
                              label="Top Size Breadth"
                              type="number"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    Inch
                                  </InputAdornment>
                                ),
                              }}
                              variant="outlined"
                              name="top_size_breadth"
                              value={changeData.top_size_breadth}
                              onChange={handleProductFelids}
                            />



                            <TextField
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
                                Wheel Included
                              </FormLabel>
                              <RadioGroup

                                aria-labelledby="demo-radio-buttons-group-label"
                                name="wheel_included"
                                value={changeData.wheel_included || "no"}
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


                            {changeData.wheel_included === "yes" && <><TextField
                              size="small"
                              fullWidth
                              id="outlined-select"
                              select
                              name="wheel"
                              label="Wheel"
                              multiple
                              value={changeData.wheel}
                              onChange={handleProductFelids}
                              helperText="Please select your wheel."
                            >
                              {catalog.wheel.map(
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
                              <TextField

                                value={changeData.wheel_qty}
                                onChange={handleProductFelids}
                                size={'small'}
                                fullWidth
                                label='Wheel Quantity'
                                type='number'
                                helperText='Enter the number of wheel included.'
                                name='wheel_qty' />
                            </>}

                            <FormControl>
                              <FormLabel id="demo-radio-buttons-group-label">
                                Trolley
                              </FormLabel>
                              <RadioGroup


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

                                <TextField
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



                            <TextField
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


                            <TextField
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


                            <TextField
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
                            {/* 
                          <FormControl>
                            <FormLabel id="demo-radio-buttons-group-label">
                              Textile
                            </FormLabel>
                            <RadioGroup
                              sx={{ mb : 1 }}

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
                            <TextField sx={{ mb : 1 }}
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

                            */}


                            <FormControl>
                              <FormLabel id="demo-radio-buttons-group-label">
                                Plywood Included
                              </FormLabel>
                              <RadioGroup


                                aria-labelledby="demo-radio-buttons-group-label"
                                value={changeData.plywood || "no"}
                                onChange={handleProductFelids}
                                name="plywood"
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


                            <FormControl>
                              <FormLabel id="demo-radio-buttons-group-label">
                                Mattress
                              </FormLabel>
                              <RadioGroup


                                aria-labelledby="demo-radio-buttons-group-label"
                                value={changeData.mattress || "no"}
                                onChange={handleProductFelids}
                                name="mattress"
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


                            {changeData.mattress === "yes" && (
                              <>
                                <TextField
                                  size="small"
                                  fullWidth
                                  type='number'
                                  id="outlined-select"
                                  name="mattress_length"
                                  label="Mattress Length"
                                  value={changeData.mattress_length}
                                  onChange={handleProductFelids}
                                />
                                <TextField
                                  size="small"
                                  type='number'
                                  fullWidth
                                  id="outlined-select"
                                  name="mattress_breadth"
                                  label="Mattress Breadth"
                                  value={changeData.mattress_breadth}
                                  onChange={handleProductFelids}
                                />
                              </>
                            )}



                            <FormControl>
                              <FormLabel id="demo-radio-buttons-group-label">
                                Cradle Bed
                              </FormLabel>
                              <RadioGroup


                                aria-labelledby="demo-radio-buttons-group-label"
                                value={changeData.cradle_bed || "no"}
                                onChange={handleProductFelids}
                                name="cradle_bed"
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


                            {changeData.cradle_bed === "yes" && (
                              <>
                                <TextField
                                  size="small"
                                  fullWidth
                                  type='number'
                                  id="outlined-select"
                                  name="cradle_bed_height"
                                  label="Cradle Bed Height"
                                  value={changeData.cradle_bed_height}
                                  onChange={handleProductFelids}
                                />
                                <TextField
                                  size="small"
                                  type='number'
                                  fullWidth
                                  id="outlined-select"
                                  name="cradle_bed_width"
                                  label="Cradle Bed Width"
                                  value={changeData.cradle_bed_width}
                                  onChange={handleProductFelids}
                                />
                                <TextField
                                  size="small"
                                  type='number'
                                  fullWidth
                                  id="outlined-select"
                                  name="cradle_bed_depth"
                                  label="Cradle Bed Depth"
                                  value={changeData.cradle_bed_depth}
                                  onChange={handleProductFelids}
                                /></>
                            )}




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

                                <TextField
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
                                </TextField>

                                <TextField

                                  value={changeData.fabric_qty}
                                  onChange={handleProductFelids}
                                  size={'small'}
                                  fullWidth
                                  label='Fabric Quantity'
                                  type='number'
                                  helperText='Enter the fabric quantity in meter.'
                                  name='fabric_qty' />
                              </>
                            )}


                            <FormControl  >
                              <FormLabel id="demo-radio-buttons-group-label">
                                Vendor URLs
                              </FormLabel>
                            </FormControl>
                            <TextField
                              type='url'
                              fullWidth

                              size='small'
                              name='amazon_url'
                              label='Amazon'
                              onChange={handleProductFelids}
                              value={changeData.amazon_url || ''}
                              placeholder="https://example.com"
                              pattern="https://.*"

                            />
                            <TextField
                              type='url'

                              size='small'
                              fullWidth
                              placeholder="https://example.com"
                              pattern="https://.*"
                              name='flipkart_url'
                              label='Flipkart'
                              onChange={handleProductFelids}
                              value={changeData.flipkart_url || ''}
                            />
                            <TextField
                              type='url'

                              size='small'
                              fullWidth
                              placeholder="https://example.com"
                              pattern="https://.*"
                              name='jiomart_url'
                              label='Jio Mart'
                              onChange={handleProductFelids}
                              value={changeData.jiomart_url || ''}
                            />



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
                          </Box >
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

            {form.formType === "variation" && (
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
                    encType="multipart/form-data"
                    method="post"
                  >
                    <Stepper
                      className="stepper"
                      activeStep={activeStep}
                      orientation="vertical"
                    >
                      {/* // Specification */}
                      <Step>
                        <StepLabel sx={{ cursor: 'pointer !important' }} onClick={() => setActiveStep(0)}>Specifications</StepLabel>
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

                            <TextField
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

                            <TextField
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

                            <TextField
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

                            <TextField
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
                            <TextField
                              size="small"
                              fullWidth
                              // autoComplete={false}
                              id="fullWidth"
                              required
                              label="Variant Label"
                              type="text"
                              variant="outlined"
                              name="variant_label"
                              value={changeData.variant_label}
                              onChange={handleProductFelids}
                            />

                            <TextField
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

                            <TextField
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

                            <TextField
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

                            <TextField
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

                            <TextField
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

                            <TextField
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
                            <Select
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


                            <TextField
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
                            <Select
                              multiple
                              fullWidth
                              value={changeData.polish || []}
                              name="polish"
                              onChange={handleProductFelids}
                              renderValue={(selected) => selected.join(", ")}
                            // MenuProps={MenuProps}
                            >
                              {catalog.polish.length > 0 && catalog.polish.map((option, index) => (
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

                            {/* <TextField sx={{ mb : 1 }}
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

                                <TextField
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

                                <TextField sx={{ mt: 1, mb: 1 }}
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

                                <TextField
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
                                  name="online_store"
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
                        <StepLabel sx={{ cursor: 'pointer !important' }} onClick={() => setActiveStep(1)}>Images</StepLabel>
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
                            <TextField
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
                            <TextField
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
                            <TextField
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
                        <StepLabel sx={{ cursor: 'pointer !important' }} onClick={() => setActiveStep(2)}>Features</StepLabel>
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
                                    checked={changeData.ceramic_drawer_included}
                                    onChange={handleProductFelids}
                                    name="ceramic_drawer_included"
                                  />
                                }
                                label="Ceramic Drawers"
                              />

                              {changeData.ceramic_drawer_included && <><TextField sx={{ mt: 2, mb: 1 }}
                                size="small"
                                fullWidth
                                id="outlined-select"
                                select
                                name="ceramic_drawer"
                                label="Ceramic Drawer"
                                multiple
                                value={changeData.ceramic_drawer}
                                onChange={handleProductFelids}
                                helperText="Please select your Ceramic Tiles."
                              >
                                {catalog.ceramic_drawer.map(
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
                                <TextField

                                  value={changeData.ceramic_drawer_qty}
                                  onChange={handleProductFelids}
                                  size={'small'}
                                  fullWidth
                                  label='Ceramic Drawer Quantity'
                                  type='number'
                                  helperText='Enter the number of ceramic drawer included.'
                                  name='ceramic_drawer_qty' />
                              </>}


                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={changeData.ceramic_tiles_included}
                                    onChange={handleProductFelids}
                                    name="ceramic_tiles_included"
                                  />
                                }
                                label="Ceramic Tiles"
                              />
                            </FormGroup>
                            {changeData.ceramic_tiles_included && <><TextField sx={{ mt: 2, mb: 1 }}
                              size="small"
                              fullWidth
                              id="outlined-select"
                              select
                              name="ceramic_tiles"
                              label="Ceramic Tiles"
                              multiple
                              value={changeData.ceramic_tiles}
                              onChange={handleProductFelids}
                              helperText="Please select your Ceramic Tiles."
                            >
                              {catalog.ceramic_tiles.map(
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
                              <TextField

                                value={changeData.ceramic_tiles_qty}
                                onChange={handleProductFelids}
                                size={'small'}
                                fullWidth
                                label='Ceramic Tiles Quantity'
                                type='number'
                                helperText='Enter the number of ceramic tiles included.'
                                name='ceramic_tiles_qty' />
                            </>}
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
                        <StepLabel sx={{ cursor: 'pointer !important' }} onClick={() => setActiveStep(3)}>Miscellaneous</StepLabel>
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
                            </Box>



                            <TextField
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

                            <TextField
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
                                <TextField
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
                        <StepLabel sx={{ cursor: 'pointer !important' }} onClick={() => setActiveStep(4)}>Inventory & Shipping</StepLabel>
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
                            <Select
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

                                  <TextField
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

                            <TextField
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

                            <TextField
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

                            <TextField
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


                            <Box sx={{ display: 'flex', mb: 1 }}>

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
                        <StepLabel sx={{ cursor: 'pointer !important' }} onClick={() => setActiveStep(5)}>SEO</StepLabel>
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

                            <TextField
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

                            <TextField
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

                            <TextField
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

                            <FormLabel id="demo-radio-buttons-group-label">
                              Selling Points{" "}
                            </FormLabel>

                            <Grid container sx={{ mt: 1 }}>
                              <Grid item xs={12}   >
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
                                maxHeight: '100px', overflowY: 'scroll', mb: 1,
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
                      {/* SEO End */}


                      {/* Extra-details */}
                      <Step>
                        <StepLabel sx={{ cursor: 'pointer !important' }} onClick={() => setActiveStep(6)}>Extra-Details</StepLabel>
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



                            <TextField
                              size="small"
                              fullWidth
                              id="outlined-select"
                              type='number'
                              name="CVW"
                              label="CVW Number"
                              value={changeData.CVW || ''}
                              onChange={handleProductFelids}
                            />

                            <TextField
                              size="small"
                              fullWidth
                              // autoComplete={false}
                              id="fullWidth"
                              label="Wood Weight"
                              type="number"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    Kg
                                  </InputAdornment>
                                ),
                              }}
                              variant="outlined"
                              name="wood_weight"
                              value={changeData.wood_weight}
                              onChange={handleProductFelids}
                            />

                            <TextField
                              size="small"
                              fullWidth
                              // autoComplete={false}
                              id="fullWidth"
                              label=" Metallic Weight"
                              type="number"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    Kg
                                  </InputAdornment>
                                ),
                              }}
                              variant="outlined"
                              name="metal_weight"
                              value={changeData.metal_weight}
                              onChange={handleProductFelids}
                            />

                            <TextField
                              size="small"
                              fullWidth
                              // autoComplete={false}
                              id="fullWidth"
                              label="Packaging Weight"
                              type="number"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    Kg
                                  </InputAdornment>
                                ),
                              }}
                              variant="outlined"
                              name="package_weight"
                              value={changeData.package_weight}
                              onChange={handleProductFelids}
                            />



                            <TextField
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
                              <TextField
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


                            <TextField
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

                            {changeData.hinge !== 'None' && <TextField

                              value={changeData.hinge_qty}
                              size={'small'}
                              helperText="Enter the number of hinges pieces ."
                              fullWidth
                              onChange={handleProductFelids}
                              label='Hinge Quantity'
                              type='number'
                              name='hinge_qty' />}


                            <TextField
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

                            {changeData.knob !== 'None' && <TextField

                              size={'small'}
                              fullWidth
                              helperText="Enter the number of knob pieces ."
                              value={changeData.knob_qty}
                              onChange={handleProductFelids}
                              label='Knob Quantity'
                              type='number'
                              name='knob_qty' />}

                            <TextField
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

                            {changeData.door !== 'None' && <TextField

                              value={changeData.door_qty}
                              helperText="Enter the number of doors."
                              size={'small'}
                              fullWidth
                              onChange={handleProductFelids}
                              label='Door Quantity'
                              type='number'
                              name='door_qty' />}


                            <TextField
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

                            {changeData.handle !== 'None' && <TextField

                              value={changeData.handle_qty}
                              helperText="Enter the number of handles."
                              onChange={handleProductFelids}
                              size={'small'}
                              fullWidth
                              label='Handle Quantity'
                              type='number'
                              name='handle_qty' />}


                            <TextField
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

                                <TextField
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


                                <TextField
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



                            <TextField
                              size="small"
                              fullWidth
                              // autoComplete={false}
                              id="fullWidth"
                              label="Top Size Length"
                              type="number"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    Inch
                                  </InputAdornment>
                                ),
                              }}
                              variant="outlined"
                              name="top_size_length"
                              value={changeData.top_size_length}
                              onChange={handleProductFelids}
                            />
                            <TextField
                              size="small"
                              fullWidth
                              // autoComplete={false}
                              id="fullWidth"
                              label="Top Size Breadth"
                              type="number"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    Inch
                                  </InputAdornment>
                                ),
                              }}
                              variant="outlined"
                              name="top_size_breadth"
                              value={changeData.top_size_breadth}
                              onChange={handleProductFelids}
                            />



                            <TextField
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
                                Wheel Included
                              </FormLabel>
                              <RadioGroup

                                aria-labelledby="demo-radio-buttons-group-label"
                                name="wheel_included"
                                value={changeData.wheel_included || "no"}
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


                            {changeData.wheel_included === "yes" && <><TextField
                              size="small"
                              fullWidth
                              id="outlined-select"
                              select
                              name="wheel"
                              label="Wheel"
                              multiple
                              value={changeData.wheel}
                              onChange={handleProductFelids}
                              helperText="Please select your wheel."
                            >
                              {catalog.wheel.map(
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
                              <TextField

                                value={changeData.wheel_qty}
                                onChange={handleProductFelids}
                                size={'small'}
                                fullWidth
                                label='Wheel Quantity'
                                type='number'
                                helperText='Enter the number of wheel included.'
                                name='wheel_qty' />
                            </>}

                            <FormControl>
                              <FormLabel id="demo-radio-buttons-group-label">
                                Trolley
                              </FormLabel>
                              <RadioGroup


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

                                <TextField
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



                            <TextField
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


                            <TextField
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


                            <TextField
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
                            {/* 
                          <FormControl>
                            <FormLabel id="demo-radio-buttons-group-label">
                              Textile
                            </FormLabel>
                            <RadioGroup
                              sx={{ mb : 1 }}

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
                            <TextField sx={{ mb : 1 }}
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

                            */}


                            <FormControl>
                              <FormLabel id="demo-radio-buttons-group-label">
                                Plywood Included
                              </FormLabel>
                              <RadioGroup


                                aria-labelledby="demo-radio-buttons-group-label"
                                value={changeData.plywood || "no"}
                                onChange={handleProductFelids}
                                name="plywood"
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


                            <FormControl>
                              <FormLabel id="demo-radio-buttons-group-label">
                                Mattress
                              </FormLabel>
                              <RadioGroup


                                aria-labelledby="demo-radio-buttons-group-label"
                                value={changeData.mattress || "no"}
                                onChange={handleProductFelids}
                                name="mattress"
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


                            {changeData.mattress === "yes" && (
                              <>
                                <TextField
                                  size="small"
                                  fullWidth
                                  type='number'
                                  id="outlined-select"
                                  name="mattress_length"
                                  label="Mattress Length"
                                  value={changeData.mattress_length}
                                  onChange={handleProductFelids}
                                />
                                <TextField
                                  size="small"
                                  type='number'
                                  fullWidth
                                  id="outlined-select"
                                  name="mattress_breadth"
                                  label="Mattress Breadth"
                                  value={changeData.mattress_breadth}
                                  onChange={handleProductFelids}
                                />
                              </>
                            )}



                            <FormControl>
                              <FormLabel id="demo-radio-buttons-group-label">
                                Cradle Bed
                              </FormLabel>
                              <RadioGroup


                                aria-labelledby="demo-radio-buttons-group-label"
                                value={changeData.cradle_bed || "no"}
                                onChange={handleProductFelids}
                                name="cradle_bed"
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


                            {changeData.cradle_bed === "yes" && (
                              <>
                                <TextField
                                  size="small"
                                  fullWidth
                                  type='number'
                                  id="outlined-select"
                                  name="cradle_bed_height"
                                  label="Cradle Bed Height"
                                  value={changeData.cradle_bed_height}
                                  onChange={handleProductFelids}
                                />
                                <TextField
                                  size="small"
                                  type='number'
                                  fullWidth
                                  id="outlined-select"
                                  name="cradle_bed_width"
                                  label="Cradle Bed Width"
                                  value={changeData.cradle_bed_width}
                                  onChange={handleProductFelids}
                                />
                                <TextField
                                  size="small"
                                  type='number'
                                  fullWidth
                                  id="outlined-select"
                                  name="cradle_bed_depth"
                                  label="Cradle Bed Depth"
                                  value={changeData.cradle_bed_depth}
                                  onChange={handleProductFelids}
                                /></>
                            )}




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

                                <TextField
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
                                </TextField>

                                <TextField

                                  value={changeData.fabric_qty}
                                  onChange={handleProductFelids}
                                  size={'small'}
                                  fullWidth
                                  label='Fabric Quantity'
                                  type='number'
                                  helperText='Enter the fabric quantity in meter.'
                                  name='fabric_qty' />
                              </>
                            )}


                            <FormControl  >
                              <FormLabel id="demo-radio-buttons-group-label">
                                Vendor URLs
                              </FormLabel>
                            </FormControl>

                            <TextField
                              type='url'
                              fullWidth

                              size='small'
                              name='amazon_url'
                              label='Amazon'
                              onChange={handleProductFelids}
                              value={changeData.amazon_url}
                              placeholder="https://example.com"
                              pattern="https://.*"

                            />
                            <TextField
                              type='url'

                              size='small'
                              fullWidth
                              placeholder="https://example.com"
                              pattern="https://.*"
                              name='flipkart_url'
                              label='Flipkart'
                              onChange={handleProductFelids}
                              value={changeData.flipkart_url}
                            />
                            <TextField
                              type='url'

                              size='small'
                              fullWidth
                              placeholder="https://example.com"
                              pattern="https://.*"
                              name='jiomart_url'
                              label='Jio Mart'
                              onChange={handleProductFelids}
                              value={changeData.jiomart_url}
                            />



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
                          </Box >

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
                      Create Variation
                    </Button>
                  </form>
                </Grid>
              </Grid>
            )}

            {/* Variation Products Ends */}

            {/* merge Products */}

            {form.formType === "merge_product" && (
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
                    encType="multipart/form-data"
                    method="post"
                  >
                    <Stepper
                      className="stepper"
                      activeStep={activeStep}
                      orientation="vertical"
                    >

                      {/* // Specification */}
                      <Step>
                        <StepLabel sx={{ cursor: 'pointer !important' }} onClick={() => setActiveStep(0)}>Specifications</StepLabel>
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
                                disabled={activeStep === 4}
                                onClick={handleNextStep}
                              >
                                Continue
                              </Button>
                            </Box >

                            <TextField
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

                            <Autocomplete
                              disablePortal

                              size='small'
                              fullWidth
                              multiple
                              autoHighlight
                              id="combo-box-demo"
                              options={productSKU.P_SKU.map((row) => { return row.SKU })}
                              renderInput={(params) => <TextField onKeyUpCapture={handleSearch}
                                value={changeData.product_articles || ''}
                                {...params}
                                label="Product SKU" />}
                              onChange={(e, newMember) => setData(old => ({ ...old, product_articles: newMember }))}
                            />

                            {
                              changeData.product_articles.length > 0 && <Box mt={1} >

                                <Typography component={'span'} variant="body1">Product Quantities</Typography>
                                <Box p={1} sx={{
                                  display: 'flex',
                                  gap: '5px',
                                  flexDirection: 'column',
                                  maxHeight: 150,
                                  overflow: 'scroll'
                                }}>
                                  {changeData.product_articles.map((item) => <TextField
                                    name={item}
                                    fullWidth
                                    size='small'
                                    type='number'
                                    InputProps={{
                                      startAdornment: (
                                        <InputAdornment position="start">{item}</InputAdornment>
                                      ),
                                    }}
                                    placeholder={item}
                                    onChange={handleProductFelids}
                                    value={changeData[item] || 0}
                                  />)}
                                </Box>
                              </Box>
                            }


                            <TextField
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

                            <TextField
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

                            <TextField
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

                            <TextField
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

                            <TextField
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

                            <TextField
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
                                  name="online_store"
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
                              disabled={activeStep === 4}
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
                        <StepLabel sx={{ cursor: 'pointer !important' }} onClick={() => setActiveStep(1)}>Images</StepLabel>
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
                            <TextField
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
                            <TextField
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
                            <TextField
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
                        <StepLabel sx={{ cursor: 'pointer !important' }} onClick={() => setActiveStep(2)}>Inventory & Shipping</StepLabel>
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
                                disabled={activeStep === 4}
                                onClick={handleNextStep}
                              >
                                Continue
                              </Button>
                            </Box >

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
                            <Select
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

                                  <TextField
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

                            <TextField
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

                            <TextField
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

                            <TextField
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
                              disabled={activeStep === 4}
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
                        <StepLabel sx={{ cursor: 'pointer !important' }} onClick={() => setActiveStep(3)}>SEO</StepLabel>
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
                                disabled={activeStep === 3}
                                onClick={handleNextStep}
                              >
                                Continue
                              </Button>
                            </Box >

                            <TextField
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

                            <TextField
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

                            <TextField
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

                            <FormLabel id="demo-radio-buttons-group-label">
                              Selling Points{" "}
                            </FormLabel>

                            <Grid container sx={{ mt: 1 }}>
                              <Grid item xs={12}   >
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
                                maxHeight: '100px', overflowY: 'scroll', mb: 1,
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
                              disabled={activeStep === 3}
                              onClick={handleNextStep}
                            >
                              Continue
                            </Button>
                          </Box>
                        </StepContent>
                      </Step>
                      {/* SEO End */}

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

            {form.formType === "update_merge" && (
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
                    onSubmit={(e) => { confirmBox(e, handleUpdateMergeProduct) }} encType="multipart/form-data"
                    method="post"
                  >

                    <Stepper
                      className="stepper"
                      activeStep={activeStep}
                      orientation="vertical"
                    >
                      {/* // Specification */}
                      <Step>
                        <StepLabel sx={{ cursor: 'pointer !important' }} onClick={() => setActiveStep(0)}>Specifications</StepLabel>
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
                                disabled={activeStep === 4}
                                onClick={handleNextStep}
                              >
                                Continue
                              </Button>
                            </Box >

                            <TextField
                              size="small"
                              fullWidth
                              // autoComplete={false}
                              id="fullWidth"
                              // // required
                              disabled
                              label="SKU"
                              type="text"
                              value={changeData.M}

                              variant="outlined"
                              name="SKU"
                            />

                            <Autocomplete
                              disablePortal

                              size='small'
                              fullWidth
                              multiple
                              autoHighlight
                              id="combo-box-demo"
                              options={productSKU.P_SKU.map((row) => { return row.SKU })}
                              isOptionEqualToValue={(option, value) => {
                                console.log(value);
                                return typeof (value) === 'Array' ? value.isInclude(option) : value === option;
                              }}
                              value={changeData.product_articles}
                              renderInput={(params) => <TextField onKeyUpCapture={handleSearch}
                                value={changeData.product_articles}
                                {...params}
                                label="Product SKU" />}
                              onChange={(e, newMember) => setData(old => ({ ...old, product_articles: newMember }))}
                            />

                            {
                              changeData.product_articles.length > 0 && <Box mt={1} >

                                <Typography component={'span'} variant="body1">Product Quantities</Typography>
                                <Box p={1} sx={{
                                  display: 'flex',
                                  gap: '5px',
                                  flexDirection: 'column',
                                  maxHeight: 150,
                                  overflow: 'scroll'
                                }}>
                                  {changeData.product_articles.map((item) => <TextField
                                    name={item}
                                    fullWidth
                                    size='small'
                                    type='number'
                                    InputProps={{
                                      startAdornment: (
                                        <InputAdornment position="start">{item}</InputAdornment>
                                      ),
                                    }}
                                    placeholder={item}
                                    onChange={handleProductFelids}
                                    value={changeData[item] || 0}
                                  />)}
                                </Box>
                              </Box>
                            }


                            <TextField
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

                            <TextField
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

                            <TextField
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

                            <TextField
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

                            <TextField
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

                            <TextField
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
                                  name="online_store"
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
                              disabled={activeStep === 4}
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
                        <StepLabel sx={{ cursor: 'pointer !important' }} onClick={() => setActiveStep(1)}>Images</StepLabel>
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
                            <TextField
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
                            <TextField
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
                            <TextField
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


                      {/* Inventory & Shipping */}
                      <Step>
                        <StepLabel sx={{ cursor: 'pointer !important' }} onClick={() => setActiveStep(2)}>Inventory & Shipping</StepLabel>
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
                                disabled={activeStep === 4}
                                onClick={handleNextStep}
                              >
                                Continue
                              </Button>
                            </Box >

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
                            <Select
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

                                  <TextField
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

                            <TextField
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

                            <TextField
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

                            <TextField
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
                              disabled={activeStep === 4}
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
                        <StepLabel sx={{ cursor: 'pointer !important' }} onClick={() => setActiveStep(3)}>SEO</StepLabel>
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
                                disabled={activeStep === 3}
                                onClick={handleNextStep}
                              >
                                Continue
                              </Button>
                            </Box >

                            <TextField
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

                            <TextField
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

                            <TextField
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

                            <FormLabel id="demo-radio-buttons-group-label">
                              Selling Points{" "}
                            </FormLabel>

                            <Grid container sx={{ mt: 1 }}>
                              <Grid item xs={12}   >
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
                                maxHeight: '100px', overflowY: 'scroll', mb: 1,
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
                              disabled={activeStep === 3}
                              onClick={handleNextStep}
                            >
                              Continue
                            </Button>
                          </Box>
                        </StepContent>
                      </Step>
                      {/* SEO End */}
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

            {/*  add Category */}

            {form.formType === "category" && (
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
                    encType="multipart/form-data"
                    method="post"
                  >
                    <ImagePreviews
                      text={"Please Drag and Drop the Category image"}
                    >
                      {" "}
                    </ImagePreviews>

                    <TextField
                      size="small"
                      fullWidth
                      // required
                      id="outlined-select"
                      name="category_name"
                      label="Category"
                      type="text"
                      helperText="Please enter your category"
                    />

                    <TextField
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

                    <TextField
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

                    <TextField
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

            {form.formType === "update_category" && (
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
                    encType="multipart/form-data"
                    method="post"
                  >
                    <ImagePreviews
                      text={"Please Drag and Drop the Category image"}
                    >
                      {" "}
                    </ImagePreviews>

                    <TextField
                      size="small"
                      fullWidth
                      id="outlined-select"
                      onChange={handleChangeData}
                      value={changeData.category}
                      name="category_name"
                      label="Category"
                      helperText="Please enter the update"
                    />


                    <TextField
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

                    <TextField
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

                    <TextField
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

            {form.formType === "primaryMaterial" && (
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
                    encType="multipart/form-data"
                    method="post"
                  >
                    <ImagePreviews
                      text={"Please Drag and Drop the Material image"}
                    >
                      {" "}
                    </ImagePreviews>

                    <TextField
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

            {form.formType === "update_PrimaryMaterial" && (
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
                    encType="multipart/form-data"
                    method="post"
                  >
                    <ImagePreviews
                      text={"Please Drag and Drop the Material image"}
                    >
                      {" "}
                    </ImagePreviews>

                    <TextField
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

            {/*  add Supplier */}

            {form.formType === "add_supplier" && (
              <Grid container p={5}>
                <Grid item xs={12}>
                  <Typography component={'span'} variant="h5">
                    Add Supplier
                    <Typography component={'span'}
                      sx={{ display: "block !important" }}
                      variant="caption"
                    >
                      Add Supplier and necessary information from here
                    </Typography>
                  </Typography>
                </Grid>

                <Grid item xs={12} mt={5}>
                  <form
                    className="form"
                    onSubmit={(e) => { confirmBox(e, handleSupplier) }}
                    id="myForm"
                    encType="multipart/form-data"
                    method="post"
                  >
                    <TextField
                      size="small"
                      fullWidth
                      id="outlined-select"
                      name="SID"
                      disabled
                      value={SKU || ''}
                      onChange={handleChangeData}
                      label="Supplier ID"
                      type="text"
                    />
                    <TextField
                      size="small"
                      fullWidth
                      // required
                      value={changeData.supplier_name}
                      onChange={handleChangeData}
                      id="outlined-select"
                      name="supplier_name"
                      label="Supplier Name"
                      type="text"
                    />
                    <TextField
                      size="small"
                      fullWidth
                      value={changeData.mobile}
                      onChange={handleChangeData}
                      id="outlined-select"
                      name="mobile"
                      label="Mobile"
                      type="number"
                    />
                    <TextField
                      size="small"
                      fullWidth
                      // required
                      value={changeData.alt_mobile}
                      onChange={handleChangeData}
                      id="outlined-select"
                      name="alt_mobile"
                      label="Alternate Number"
                      type="number"
                    />
                    <TextField
                      size="small"
                      fullWidth
                      // required
                      id="outlined-select"
                      value={changeData.specialization}
                      onChange={handleChangeData}
                      name="specialization"
                      label="Specialization"
                      type="text"
                    />
                    <TextField
                      size="small"
                      fullWidth
                      // required
                      value={changeData.gst_no}
                      onChange={handleChangeData}
                      id="outlined-select"
                      name="gst_no"
                      label="GST Number"
                      type="text"
                    />

                    <TextareaAutosize
                      size="small"
                      fullWidth
                      placeholder="Address"
                      minRows={5}
                      maxRows={5}
                      value={changeData.address}
                      onChange={handleChangeData}
                      id="outlined-select"
                      name="address"
                      label="Address"
                      type="text"
                    />

                    <Button
                      color="primary"
                      type="submit"
                      fullWidth
                      variant="contained"
                    >
                      Add Supplier
                    </Button>
                  </form>
                </Grid>
              </Grid>
            )}
            {/* add Suppliers  Ends */}

            {/*  update Suppliers  */}

            {form.formType === "update_supplier" && (
              <Grid container p={5}>
                <Grid item xs={12}>
                  <Typography component={'span'} variant="h5">
                    Update Supplier
                    <Typography component={'span'}
                      sx={{ display: "block !important" }}
                      variant="caption"
                    >
                      Update supplier and necessary information from here
                    </Typography>
                  </Typography>
                </Grid>

                <Grid item xs={12} mt={5}>
                  <form
                    className="form"
                    onSubmit={(e) => { confirmBox(e, handleUpdateSupplier) }}
                    id="myForm"
                    encType="multipart/form-data"
                    method="post"
                  >
                    <TextField
                      size="small"
                      fullWidth
                      disabled
                      id="outlined-select"
                      name="SID"
                      value={changeData.SID || ''}
                      onChange={handleChangeData}
                      label="Supplier ID"
                      type="text"
                    />
                    <TextField
                      size="small"
                      fullWidth
                      // required
                      value={changeData.supplier_name || ''}
                      onChange={handleChangeData}
                      id="outlined-select"
                      name="supplier_name"
                      label="Supplier Name"
                      type="text"
                    />
                    <TextField
                      size="small"
                      fullWidth
                      value={changeData.mobile || ''}
                      onChange={handleChangeData}
                      id="outlined-select"
                      name="mobile"
                      label="Mobile"
                      type="number"
                    />
                    <TextField
                      size="small"
                      fullWidth
                      // required
                      value={changeData.alt_mobile || ''}
                      onChange={handleChangeData}
                      id="outlined-select"
                      name="alt_mobile"
                      label="Alternate Number"
                      type="number"
                    />
                    <TextField
                      size="small"
                      fullWidth
                      // required
                      id="outlined-select"
                      value={changeData.specialization || ''}
                      onChange={handleChangeData}
                      name="specialization"
                      label="Specialization"
                      type="text"
                    />
                    <TextField
                      size="small"
                      fullWidth
                      // required
                      value={changeData.gst_no || ''}
                      onChange={handleChangeData}
                      id="outlined-select"
                      name="gst_no"
                      label="GST Number"
                      type="text"
                    />

                    <TextareaAutosize
                      size="small"
                      fullWidth
                      placeholder="Address"
                      minRows={5}
                      maxRows={5}
                      value={changeData.address || ''}
                      onChange={handleChangeData}
                      id="outlined-select"
                      name="address"
                      label="Address"
                      type="text"
                    />

                    <Button
                      color="primary"
                      type="submit"
                      fullWidth
                      variant="contained"
                    >
                      Update Supplier
                    </Button>
                  </form>
                </Grid>
              </Grid>
            )}
            {/* update suppliers Ends */}


            {/*  update blog  */}

            {form.formType === "update_blog" && (
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
                          encType="multipart/form-data"
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

                          <TextField
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
                    encType="multipart/form-data"
                    method="post"
                  >
                    <FeaturesPreviews
                      text={"Please Drag and Drop the Card Image "}
                    >
                      {" "}
                    </FeaturesPreviews>

                    <TextField
                      size="small"
                      fullWidth
                      // required
                      id="outlined-select"
                      name="seo_title"
                      label="SEO Title"
                      value={changeData.seo_title}
                      onChange={handleChangeData}
                    />
                    <TextField
                      size="small"
                      fullWidth
                      // required
                      id="outlined-select"
                      name="seo_description"
                      label="SEO Description"
                      value={changeData.seo_description}
                      onChange={handleChangeData}
                    />

                    <TextField
                      size="small"
                      fullWidth
                      // required
                      id="outlined-select"
                      value={changeData.card_description}
                      onChange={handleChangeData}
                      name="card_description"
                      label="Card Description"
                    />

                    <TextField
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
                      <TextField
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

            {form.formType === "addBlog" && (
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
                          encType="multipart/form-data"
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

                          <TextField
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
                    encType="multipart/form-data"
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

                    <TextField
                      size="small"
                      fullWidth
                      // required
                      id="outlined-select"
                      name="seo_title"
                      label="SEO Title"
                    />
                    <TextField
                      size="small"
                      fullWidth
                      // required
                      id="outlined-select"
                      name="seo_description"
                      label="SEO Description"
                    />
                    <TextField
                      size="small"
                      fullWidth
                      // required
                      id="outlined-select"
                      name="card_description"
                      label="Card Description"
                    />

                    <TextField
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
                      <TextField
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


            {/*  add subCategory */}

            {form.formType === "subcategory" && (
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
                    encType="multipart/form-data"
                    method="post"
                  >
                    {/* <ImagePreviews text={'Please Drag and Drop the Category image'}> </ImagePreviews> */}

                    <TextField
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

                    <TextField
                      size="small"
                      fullWidth
                      // required
                      id="outlined-select"
                      name="sub_category_name"
                      label="Sub Category"
                      type="text"
                      helperText="Please enter your sub category"
                    />

                    <TextField
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

                    <TextField
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

                    <TextField
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

            {form.formType === "update_Subcategory" && (
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
                    encType="multipart/form-data"
                    method="post"
                  >
                    {/* <ImagePreviews text={'Please Drag and Drop the Category image'}> </ImagePreviews> */}

                    <FormLabel id="demo-radio-buttons-group-label">
                      Category
                    </FormLabel>

                    <TextField
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

                    <TextField
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

                    <TextField
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

                    <TextField
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

                    <TextField
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

            {form.formType === "add_customer" && (
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
                          encType="multipart/form-data"
                          method="post"
                        >

                          <TextField size="small"
                            fullWidth
                            // required
                            id="outlined-select"
                            name="customer_name"
                            label="Name"
                            type="text"
                          />
                          <TextField size="small"
                            fullWidth
                            // required
                            id="outlined-select"
                            name="mobile"
                            label="Mobile"
                            type="number"
                          />
                          <TextField size="small"
                            fullWidth
                            // required
                            id="outlined-select"
                            name="pincode"
                            label="Pin Code"
                            type="number"
                          />

                          <TextField size="small"
                            fullWidth
                            // required
                            id="outlined-select"
                            name="city"
                            label="City"
                            type="text"
                          />

                          <TextField
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

                          <TextField
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
                    encType="multipart/form-data"
                    method="post"
                  >
                    <ImagePreviews
                      text={"Please Drag and Drop the Profile Picture"}
                    >
                      {" "}
                    </ImagePreviews>

                    <TextField
                      size="small"
                      fullWidth
                      // required
                      id="outlined-select"
                      name="username"
                      label="Customer Name"
                      type="text"
                    />

                    <TextField
                      size="small"
                      fullWidth
                      // required
                      id="outlined-select"
                      name="email"
                      label="Customer Email"
                      type="text"
                    />
                    <TextField
                      size="small"
                      fullWidth
                      // required
                      id="outlined-select"
                      name="mobile"
                      label="Contact Number"
                      type="number"
                    />
                    <TextField
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

            {form.formType === "update_customer" && (
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
                    encType="multipart/form-data"
                    method="post"
                  >
                    <ImagePreviews
                      text={"Please Drag and Drop the Profile Picture"}
                    >
                      {" "}
                    </ImagePreviews>

                    <TextField
                      size="small"
                      fullWidth
                      value={changeData.username}
                      onChange={handleProductFelids}
                      id="outlined-select"
                      name="username"
                      label="Customer Name"
                      type="text"
                    />

                    <TextField
                      size="small"
                      fullWidth
                      value={changeData.email}
                      onChange={handleProductFelids}
                      id="outlined-select"
                      name="email"
                      label="Customer Email"
                      type="text"
                    />
                    <TextField
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
                    <TextField
                      size="small"
                      fullWidth
                      value={changeData.city}
                      onChange={handleProductFelids}
                      id="outlined-select"
                      name="city"
                      label="City"
                      type="text"
                    />
                    <TextField
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

            {form.formType === "add_order" && (
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
                    encType="multipart/form-data"
                    method="post"
                  >
                    <TextField
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
                    <Select
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
                      <TextField
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

                    <TextField
                      size="small"
                      fullWidth
                      // required
                      id="outlined-select"
                      name="paid_amount"
                      label="Paid Amount"
                      type="number"
                    />

                    <TextField
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
                        <TextField
                          size="small"
                          fullWidth
                          required
                          id="outlined-select"
                          name="customer_name"
                          label="Customer Name"
                          type="text"
                        />
                        <TextField
                          size="small"
                          fullWidth
                          required
                          id="outlined-select"
                          name="customer_email"
                          label="Customer Email"
                          type="text"
                        />
                        <TextField
                          size="small"
                          fullWidth
                          required
                          id="outlined-select"
                          name="customer_mobile"
                          label="Contact Number"
                          type="number"
                        />
                        <TextField
                          size="small"
                          fullWidth
                          required
                          id="outlined-select"
                          name="city"
                          label="City"
                          type="text"
                        />
                        <TextField
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




            {/* add Hardware */}

            {form.formType === "hardware" && (
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
                    encType="multipart/form-data"
                    method="post"
                  >
                    <Stepper
                      className="stepper"
                      activeStep={activeStep}
                      orientation="vertical"
                    >
                      {/* // Specification */}
                      <Step>
                        <StepLabel sx={{ cursor: 'pointer !important' }} onClick={() => setActiveStep(0)}>Specifications</StepLabel>
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

                            <TextField
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

                            <TextField
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


                            <TextField
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

                            <TextField
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


                            <TextField
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




                            <TextField
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
                        <StepLabel sx={{ cursor: 'pointer !important' }} onClick={() => setActiveStep(1)}>Features</StepLabel>
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
                        <StepLabel sx={{ cursor: 'pointer !important' }} onClick={() => setActiveStep(2)}>Inventory & Shipping</StepLabel>
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
                                disabled={activeStep === 3}
                                onClick={handleNextStep}
                              >
                                Continue
                              </Button>
                            </Box >

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
                              Restocking in {
                                changeData.restocking_time
                              }{" "}
                              Days
                            </Typography>
                            <Slider
                              aria-label="restocking time"
                              defaultValue={0}
                              size="small"
                              valueLabelDisplay="auto"
                              name="restocking_time"
                              value={changeData.restocking_time}
                              onChange={handleProductFelids}
                              helperText="Please select your restocking time."
                            />

                            <InputLabel id="demo-multiple-checkbox-label">Stock Warehouse</InputLabel>
                            <Select
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

                                  <TextField
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

                            <TextField
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

                            <TextField
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

                            <TextField
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

                            <Box sx={{ display: 'flex', mb: 1 }}>

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
                            <Box sx={{ display: 'flex', mb: 1 }}>

                              <TextField
                                size="small"
                                sx={{ width: '85%' }}
                                id="fullWidth"
                                label="Minimum Quantity For Sell"
                                type="Number"
                                variant="outlined"
                                name="min_quantity"
                                value={changeData.min_quantity}
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
                            <FormGroup>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={changeData.continue_selling}
                                    onChange={handleProductFelids}
                                    name="continue_selling"
                                  />
                                }
                                label="Continue Selling"
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
                              disabled={activeStep === 3}
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
                        <StepLabel sx={{ cursor: 'pointer !important' }} onClick={() => setActiveStep(3)}>SEO</StepLabel>
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
                                disabled={activeStep === 4}
                                onClick={handleNextStep}
                              >
                                Continue
                              </Button>
                            </Box >

                            <TextField
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

                            <TextField
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

                            <TextField
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

                            <FormLabel id="demo-radio-buttons-group-label">
                              Selling Points{" "}
                            </FormLabel>

                            <Grid container sx={{ mt: 1 }}>
                              <Grid item xs={12}   >
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
                                maxHeight: '100px', overflowY: 'scroll', mb: 1,
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
                              disabled={activeStep === 4}
                              onClick={handleNextStep}
                            >
                              Continue
                            </Button>
                          </Box>
                        </StepContent>
                      </Step>
                      {/* SEO End */}

                      {/* Extra details */}
                      <Step>
                        <StepLabel sx={{ cursor: 'pointer !important' }} onClick={() => setActiveStep(4)}>Extra Details</StepLabel>
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
                                disabled={activeStep === 4}
                                onClick={handleNextStep}
                              >
                                Continue
                              </Button>
                            </Box >

                            <TextField
                              size="small"
                              fullWidth
                              // required
                              id="outlined-select"
                              select
                              name="hardware_polish"
                              label="Hardware Polish"
                              value={changeData.hardware_polish || ''}
                              multiple
                              onChange={handleProductFelids}
                              helperText="Please select your Hardware Polish"
                            >
                              {hardware_polish.map(
                                (option) =>
                                  <MenuItem
                                    key={option}
                                    value={option}
                                  >
                                    {option}
                                  </MenuItem>
                              )}
                              <MenuItem key={"none"} value="None">
                                {"None"}
                              </MenuItem>
                            </TextField>



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
                              disabled={activeStep === 4}
                              onClick={handleNextStep}
                            >
                              Continue
                            </Button>
                          </Box>
                        </StepContent>
                      </Step>
                      {/* Extra details */}


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

            {form.formType === "update_hardware" && (
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
                    encType="multipart/form-data"
                    method="post"
                  >
                    <Stepper
                      className="stepper"
                      activeStep={activeStep}
                      orientation="vertical"
                    >
                      {/* // Specification */}
                      <Step>
                        <StepLabel sx={{ cursor: 'pointer !important' }} onClick={() => setActiveStep(0)}>Specifications</StepLabel>
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

                            <TextField
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

                            <TextField
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


                            <TextField
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

                            <TextField
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


                            <TextField
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




                            <TextField
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
                        <StepLabel sx={{ cursor: 'pointer !important' }} onClick={() => setActiveStep(1)}>Features</StepLabel>
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
                        <StepLabel sx={{ cursor: 'pointer !important' }} onClick={() => setActiveStep(2)}>Inventory & Shipping</StepLabel>
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
                                disabled={activeStep === 3}
                                onClick={handleNextStep}
                              >
                                Continue
                              </Button>
                            </Box >

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
                              Restocking in {
                                changeData.restocking_time
                              }{" "}
                              Days
                            </Typography>
                            <Slider
                              aria-label="restocking time"
                              defaultValue={0}
                              size="small"
                              valueLabelDisplay="auto"
                              name="restocking_time"
                              value={changeData.restocking_time || 0}
                              onChange={handleProductFelids}
                              helperText="Please select your restocking time."
                            />

                            <InputLabel id="demo-multiple-checkbox-label">Stock Warehouse</InputLabel>
                            <Select
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
                                let stock;
                                row === 'Jodhpur (Rajasthan)' ? stock = 'jodhpur_stock' : stock = 'bangalore_stock';
                                return <>

                                  <TextField
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

                            <TextField
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

                            <TextField
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

                            <TextField
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

                            <Box sx={{ display: 'flex', mb: 1 }}>

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
                            <Box sx={{ display: 'flex', mb: 1 }}>

                              <TextField
                                size="small"
                                sx={{ width: '85%' }}
                                id="fullWidth"
                                label="Minimum Quantity For Sell"
                                type="Number"
                                variant="outlined"
                                name="min_quantity"
                                value={changeData.min_quantity}
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
                            <FormGroup>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={changeData.continue_selling}
                                    onChange={handleProductFelids}
                                    name="continue_selling"
                                  />
                                }
                                label="Continue Selling"
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
                              disabled={activeStep === 3}
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
                        <StepLabel sx={{ cursor: 'pointer !important' }} onClick={() => setActiveStep(3)}>SEO</StepLabel>
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
                                disabled={activeStep === 4}
                                onClick={handleNextStep}
                              >
                                Continue
                              </Button>
                            </Box >

                            <TextField
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

                            <TextField
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

                            <TextField
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

                            <FormLabel id="demo-radio-buttons-group-label">
                              Selling Points{" "}
                            </FormLabel>

                            <Grid container sx={{ mt: 1 }}>
                              <Grid item xs={12}   >
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
                                maxHeight: '100px', overflowY: 'scroll', mb: 1,
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
                              disabled={activeStep === 4}
                              onClick={handleNextStep}
                            >
                              Continue
                            </Button>
                          </Box>
                        </StepContent>
                      </Step>
                      {/* SEO End */}

                      {/* Extra details */}
                      <Step>
                        <StepLabel sx={{ cursor: 'pointer !important' }} onClick={() => setActiveStep(4)}>Extra Details</StepLabel>
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
                                disabled={activeStep === 4}
                                onClick={handleNextStep}
                              >
                                Continue
                              </Button>
                            </Box >

                            <TextField
                              size="small"
                              fullWidth
                              // required
                              id="outlined-select"
                              select
                              name="hardware_polish"
                              label="Hardware Polish"
                              value={changeData.hardware_polish || ''}
                              multiple
                              onChange={handleProductFelids}
                              helperText="Please select your Hardware Polish"
                            >
                              {hardware_polish.map(
                                (option) =>
                                  <MenuItem
                                    key={option}
                                    value={option}
                                  >
                                    {option}
                                  </MenuItem>
                              )}
                              <MenuItem key={"none"} value="None">
                                {"None"}
                              </MenuItem>
                            </TextField>



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
                              disabled={activeStep === 4}
                              onClick={handleNextStep}
                            >
                              Continue
                            </Button>
                          </Box>
                        </StepContent>
                      </Step>
                      {/* Extra details */}



                    </Stepper>

                    <Button
                      color="primary"
                      type="submit"
                      fullWidth
                      variant="contained"
                    >
                      Update Hardware
                    </Button>
                  </form>
                </Grid>
              </Grid>
            )}

            {/* update Hardware Ends */}


            {/* add inward */}

            {form.formType === "inward" && (
              <Grid container p={5} className="productPadding">
                <Grid item xs={12}>
                  <Typography component={'span'} variant="h5">
                    Inward
                    <Typography component={'span'}
                      sx={{ display: "block !important" }}
                      variant="caption"
                    >
                      Add your inward stock and necessary information from here
                    </Typography>
                  </Typography>
                </Grid>

                <Grid item xs={12} mt={2}>
                  <form
                    className="form"
                    id="myForm"
                    onSubmit={(e) => { confirmBox(e, handleInward) }}
                    encType="multipart/form-data"
                    method="post"
                  >

                    <TextField
                      fullWidth
                      id="outlined-select"
                      required
                      select
                      size={'small'}
                      helperText="Please select the wearhouse for this operation."
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
                      {/* <MenuItem key={"none"} value="None">
                        {"None"}
                      </MenuItem> */}
                    </TextField>

                    <Autocomplete
                      disablePortal
                      size='small'
                      fullWidth
                      multiple
                      autoHighlight
                      id="combo-box-demo"
                      options={productSKU.P_SKU.map((row) => { return row.SKU })}
                      renderInput={(params) => <TextField onKeyUpCapture={handleSearch}
                        value={changeData.product_articles || ''}
                        {...params}
                        label="Product SKU" />}
                      onChange={(e, newMember) => setData(old => ({ ...old, product_articles: newMember }))}
                    />

                    {
                      changeData.product_articles.length > 0 && <Box mt={1} >

                        <Typography component={'span'} variant="body1">Product Quantities</Typography>
                        <Box p={1} sx={{
                          display: 'flex',
                          gap: '5px',
                          flexDirection: 'column',
                          maxHeight: 150,
                          overflow: 'scroll'
                        }}>
                          {changeData.product_articles.map((item) => <TextField
                            name={item}
                            fullWidth
                            size='small'
                            type='number'
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">{item}</InputAdornment>
                              ),
                            }}
                            placeholder={item}
                            onChange={handleProductFelids}
                            value={changeData[item] || 0}
                          />)}
                        </Box>
                      </Box>
                    }

                    <Autocomplete
                      disablePortal
                      size='small'
                      fullWidth
                      multiple
                      autoHighlight
                      id="combo-box-demo"
                      options={productSKU.H_SKU.map((row) => { return row.SKU })}
                      renderInput={(params) => <TextField onKeyUpCapture={handleSearch}
                        value={changeData.hardware_articles || ''}
                        {...params}
                        label="Hardware SKU" />}
                      onChange={(e, newMember) => setData(old => ({ ...old, hardware_articles: newMember }))}
                    />

                    {changeData.hardware_articles.length > 0 && <Box mt={1} >
                      <Typography component={'span'} variant="body1">Hardware Quantities</Typography>
                      <Box p={1} sx={{
                        display: 'flex',
                        gap: '5px',
                        flexDirection: 'column',
                        maxHeight: 150,
                        overflow: 'scroll'
                      }}>
                        {changeData.hardware_articles.map((item) => <TextField
                          name={item}
                          fullWidth
                          size='small'
                          type='number'
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">{item}</InputAdornment>
                            ),
                          }}
                          placeholder={item}
                          onChange={handleProductFelids}
                          value={changeData[item] || 0}
                        />)}
                      </Box>
                    </Box>
                    }

                    <Autocomplete
                      disablePortal
                      size='small'
                      fullWidth
                      required
                      autoHighlight
                      clearOnEscape
                      id="combo-box-demo"
                      options={productSKU.supplier.map((row) => { return row.SID })}
                      onChange={(e, newMember) => setData(old => ({ ...old, supplier: newMember }))}
                      renderInput={(params) => <TextField onKeyUpCapture={handleSupplierList}
                        value={changeData.supplier || ''}
                        name='supplier'
                        {...params}
                        label="Supplier" />}
                    />


                    <TextField
                      size="small"
                      fullWidth
                      id="fullWidth"
                      label="Vehicle No."
                      type="text"
                      inputProps={{ style: { textTransform: "uppercase" } }}
                      variant="outlined"
                      name="vehicle_no"
                    />
                    <TextField
                      size="small"
                      fullWidth
                      id="fullWidth"
                      label="Driver Name"
                      type="text"
                      variant="outlined"
                      name="driver_name"
                    />
                    <TextField
                      size="small"
                      fullWidth
                      id="fullWidth"
                      label="Driver Number"
                      type="Number"
                      variant="outlined"
                      name="driver_no"
                    />

                    <Button
                      color="primary"
                      type="submit"
                      fullWidth
                      variant="contained"
                    >
                      Save
                    </Button>
                  </form>
                </Grid>
              </Grid>
            )}

            {/* add Inward Ends */}

            {/* add Outward */}

            {form.formType === "outward" && (
              <Grid container p={5} className="productPadding">
                <Grid item xs={12}>
                  <Typography component={'span'} variant="h5">
                    Outward
                    <Typography component={'span'}
                      sx={{ display: "block !important" }}
                      variant="caption"
                    >
                      Add your outward stock and necessary information from here
                    </Typography>
                  </Typography>
                </Grid>

                <Grid item xs={12} mt={2}>
                  <form
                    className="form"
                    id="myForm"
                    onSubmit={(e) => { confirmBox(e, handleOutward) }}
                    encType="multipart/form-data"
                    method="post"
                  >

                    <TextField
                      fullWidth
                      id="outlined-select"
                      required
                      select
                      size={'small'}
                      helperText="Please select the wearhouse for this operation."
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
                      {/* <MenuItem key={"none"} value="None">
                        {"None"}
                      </MenuItem> */}
                    </TextField>

                    <Autocomplete
                      disablePortal
                      size='small'
                      fullWidth
                      multiple
                      autoHighlight
                      id="combo-box-demo"
                      options={productSKU.P_SKU.map((row) => { return row.product_id + " Stock :" + (row.stock) })}
                      renderInput={(params) => <TextField onKeyUpCapture={handleSearchStockSKU}
                        value={changeData.product_articles || ''}
                        {...params}
                        label="Product SKU" />}
                      onChange={(e, newMember) => setData(old => ({ ...old, product_articles: newMember }))}
                    />

                    {
                      changeData.product_articles.length > 0 && <Box mt={1} >

                        <Typography component={'span'} variant="body1">Product Quantities</Typography>
                        <Box p={1} sx={{
                          display: 'flex',
                          gap: '5px',
                          flexDirection: 'column',
                          maxHeight: 150,
                          overflow: 'scroll'
                        }}>
                          {changeData.product_articles.map((item) => <TextField
                            name={item}
                            fullWidth
                            size='small'
                            type='number'
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">{item.split('Stock')[0]}</InputAdornment>
                              ),
                            }}
                            placeholder={item}
                            onChange={handleProductFelids}
                            value={changeData[item] <= parseInt(item.split(':')[1]) ? changeData[item] : parseInt(item.split(':')[1])}
                          />)}
                        </Box>
                      </Box>
                    }

                    <Autocomplete
                      disablePortal
                      size='small'
                      fullWidth
                      multiple
                      autoHighlight
                      id="combo-box-demo"
                      options={productSKU.H_SKU.map((row) => { return row.product_id + " Stock :" + (row.stock) })}
                      renderInput={(params) => <TextField onKeyUpCapture={handleSearchStockSKU}
                        value={changeData.hardware_articles || ''}
                        {...params}
                        label="Hardware SKU" />}
                      onChange={(e, newMember) => setData(old => ({ ...old, hardware_articles: newMember }))}
                    />

                    {changeData.hardware_articles.length > 0 && <Box mt={1} >
                      <Typography component={'span'} variant="body1">Hardware Quantities</Typography>
                      <Box p={1} sx={{
                        display: 'flex',
                        gap: '5px',
                        flexDirection: 'column',
                        maxHeight: 150,
                        overflow: 'scroll'
                      }}>
                        {changeData.hardware_articles.map((item) => <TextField
                          name={item}
                          fullWidth
                          size='small'
                          type='number'
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">{item.split('Stock')[0]}</InputAdornment>
                            )
                          }}
                          placeholder={item}
                          onChange={handleProductFelids}
                          value={changeData[item] <= parseInt(item.split(':')[1]) ? changeData[item] : parseInt(item.split(':')[1])}
                        />)}
                      </Box>
                    </Box>
                    }

                    <Autocomplete
                      disablePortal
                      size='small'
                      fullWidth
                      required
                      autoHighlight
                      clearOnEscape
                      id="combo-box-demo"
                      options={productSKU.supplier.map((row) => { return row.SID })}
                      onChange={(e, newMember) => setData(old => ({ ...old, supplier: newMember }))}
                      renderInput={(params) => <TextField onKeyUpCapture={handleSupplierList}
                        value={changeData.supplier || ''}
                        name='supplier'
                        {...params}
                        label="Supplier" />}
                    />

                    <TextField
                      size="small"
                      fullWidth
                      name='driver_name'
                      id="fullWidth"
                      label="Driver Name"
                      type="text"
                      variant="outlined"
                    />
                    <TextField
                      size="small"
                      fullWidth
                      id="fullWidth"
                      label="Driver Number"
                      type="number"
                      variant="outlined"
                      name="driver_no"
                    />

                    <TextField
                      size="small"
                      fullWidth
                      id="fullWidth"
                      label="Vehicle No."
                      inputProps={{ style: { textTransform: "uppercase" } }}

                      type="text"
                      variant="outlined"
                      name="vehicle_no"
                    />


                    {/* <TextField  
                      size="small"
                      fullWidth
                      id="fullWidth"
                      label="Quantity"
                      type="number"
                      variant="outlined"
                      name="quantity"
                    /> */}

                    <TextField
                      size="small"
                      fullWidth
                      // required
                      id="outlined-select"
                      select
                      name="purpose"
                      label="Purpose"
                      value={changeData.purpose || ''}
                      multiple
                      onChange={handleProductFelids}
                      helperText="Please select your purpose"
                      required
                    >
                      {purpose.map(
                        (option) =>
                          option && (
                            <MenuItem
                              key={option}
                              value={option}
                            >
                              {option}
                            </MenuItem>
                          )
                      )}
                    </TextField>

                    <TextareaAutosize
                      size="small"
                      fullWidth
                      minRows={3}
                      maxRows={3}
                      required
                      resize={'none'}
                      id="fullWidth"
                      placeholder="Please eloburate the reson here..."
                      type="text"
                      variant="outlined"
                      name="reason"
                    />


                    <Button
                      color="primary"
                      type="submit"
                      fullWidth
                      variant="contained"
                    >
                      Save
                    </Button>
                  </form>
                </Grid>
              </Grid>
            )}

            {/* add outward Ends */}

            {/* add Transfer */}

            {form.formType === "transfer" && (
              <Grid container p={5} className="productPadding">
                <Grid item xs={12}>
                  <Typography component={'span'} variant="h5">
                    Transfer
                    <Typography component={'span'}
                      sx={{ display: "block !important" }}
                      variant="caption"
                    >
                      Transfer stock and necessary information from here
                    </Typography>
                  </Typography>
                </Grid>

                <Grid item xs={12} mt={2}>
                  <form
                    className="form"
                    id="myForm"
                    onSubmit={(e) => { confirmBox(e, handleTransfer) }}
                    encType="multipart/form-data"
                    method="post"
                  >

                    <TextField
                      fullWidth
                      id="outlined-select"
                      select
                      name="warehouse"
                      size='small'
                      required
                      label="From Warehouse"
                      value={changeData.warehouse || ''}
                      onChange={handleProductFelids}
                      multiple
                    >
                      {warehouse.map(
                        (option) => <MenuItem
                          key={option.value}
                          value={option.value}
                        >
                          {option.value}
                        </MenuItem>
                      )}

                    </TextField>

                    <TextField
                      fullWidth
                      id="outlined-select"
                      select
                      required
                      size='small'
                      name="warehouse_to"
                      label="To Warehouse"
                      value={changeData.warehouse_to || ''}
                      onChange={handleProductFelids}
                      multiple
                    >
                      {warehouse.map(
                        (option) => changeData.warehouse !== option.value && <MenuItem
                          key={option.value}
                          value={option.value}
                        >
                          {option.value}
                        </MenuItem>
                      )}

                    </TextField>


                    <Autocomplete
                      disablePortal
                      size='small'
                      fullWidth
                      multiple
                      autoHighlight
                      id="combo-box-demo"
                      options={productSKU.P_SKU.map((row) => { return row.product_id + " Stock :" + (row.stock) })}
                      renderInput={(params) => <TextField onKeyUpCapture={handleSearchStockSKU}
                        value={changeData.product_articles || ''}
                        {...params}
                        label="Product SKU" />}
                      onChange={(e, newMember) => setData(old => ({ ...old, product_articles: newMember }))}
                    />

                    {
                      changeData.product_articles.length > 0 && <Box mt={1} >

                        <Typography component={'span'} variant="body1">Product Quantities</Typography>
                        <Box p={1} sx={{
                          display: 'flex',
                          gap: '5px',
                          flexDirection: 'column',
                          maxHeight: 150,
                          overflow: 'scroll'
                        }}>
                          {changeData.product_articles.map((item) => <TextField
                            name={item}
                            fullWidth
                            size='small'
                            type='number'
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">{item.split('Stock')[0]}</InputAdornment>
                              ),
                            }}
                            placeholder={item}
                            onChange={handleProductFelids}
                            value={changeData[item] <= parseInt(item.split(':')[1]) ? changeData[item] : parseInt(item.split(':')[1])}
                          />)}
                        </Box>
                      </Box>
                    }

                    <Autocomplete
                      disablePortal
                      size='small'
                      fullWidth
                      multiple
                      autoHighlight
                      id="combo-box-demo"
                      options={productSKU.H_SKU.map((row) => { return row.product_id + " Stock :" + (row.stock) })}
                      renderInput={(params) => <TextField onKeyUpCapture={handleSearchStockSKU}
                        value={changeData.hardware_articles || ''}
                        {...params}
                        label="Hardware SKU" />}
                      onChange={(e, newMember) => setData(old => ({ ...old, hardware_articles: newMember }))}
                    />

                    {changeData.hardware_articles.length > 0 && <Box mt={1} >
                      <Typography component={'span'} variant="body1">Hardware Quantities</Typography>
                      <Box p={1} sx={{
                        display: 'flex',
                        gap: '5px',
                        flexDirection: 'column',
                        maxHeight: 150,
                        overflow: 'scroll'
                      }}>
                        {changeData.hardware_articles.map((item) => <TextField
                          name={item}
                          fullWidth
                          size='small'
                          type='number'
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">{item.split('Stock')[0]}</InputAdornment>
                            )
                          }}
                          placeholder={item}
                          onChange={handleProductFelids}
                          value={changeData[item] <= parseInt(item.split(':')[1]) ? changeData[item] : parseInt(item.split(':')[1])}
                        />)}
                      </Box>
                    </Box>
                    }



                    <TextField
                      size="small"
                      fullWidth
                      // required
                      id="outlined-select"
                      select
                      name="purpose"
                      label="Purpose"
                      value={changeData.purpose || ''}
                      multiple
                      onChange={handleProductFelids}
                      helperText="Please select your purpose"
                      required
                    >
                      {purpose.map(
                        (option) =>
                          option && (
                            <MenuItem
                              key={option}
                              value={option}
                            >
                              {option}
                            </MenuItem>
                          )
                      )}
                    </TextField>

                    <TextareaAutosize
                      size="small"
                      fullWidth
                      minRows={3}
                      maxRows={3}
                      required
                      resize={'none'}
                      id="fullWidth"
                      placeholder="Please eloburate the reson here..."
                      type="text"
                      variant="outlined"
                      name="reason"
                    />



                    <Button
                      color="primary"
                      type="submit"
                      fullWidth
                      variant="contained"
                    >
                      Save
                    </Button>
                  </form>
                </Grid>
              </Grid>
            )}

            {/* add Transfer Ends */}

            {/*  add Polish Material */}

            {form.formType === "addPolish" && (
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
                    encType="multipart/form-data"
                    method="post"
                  >



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


                    <FormLabel id="demo-radio-buttons-group-label">
                      Outdoor Images
                    </FormLabel>
                    <ProductsPreviews text={'Please Drag and Drop the outdoor image'}> </ProductsPreviews>

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

                    <FormLabel id="demo-radio-buttons-group-label">
                      Indoor Images
                    </FormLabel>
                    <IndoorPreviews text={'Please Drag and Drop the indoor image'}> </IndoorPreviews>

                    {Indoor.length > 0 && <Grid sx={{ p: 2 }} spacing={2} container>
                      {
                        Indoor.map((img, index) => {
                          return <>
                            <Grid item xs={2} sx={{ position: 'relative' }} >
                              <CancelIcon onClick={() => {
                                // this function is for removing the image from savedImage array 
                                let temp = Indoor;
                                console.log(">>>>>>", temp, Indoor);
                                temp.splice(index, 1);
                                setIndoor([...temp])
                              }} className='imageCross' color='primary' />
                              <img style={{ width: '100%' }} src={URL.createObjectURL(img)} alt={img.name} />
                            </Grid>
                          </>
                        })
                      }
                    </Grid>
                    }

                    <TextField
                      size="small"
                      fullWidth
                      // required
                      id="outlined-select"
                      select
                      name="polish_type"
                      label="Polish Type"
                      value={changeData.polish_type || ''}
                      multiple
                      onChange={handleProductFelids}
                      helperText="Please select your polish type."
                      required
                    >
                      {polishCatalog.map(
                        (option) =>
                          option && (
                            <MenuItem
                              key={option}
                              value={option}
                            >
                              {option}
                            </MenuItem>
                          )
                      )}
                      <MenuItem
                        key={'None'}
                        value={'None'}
                      >
                        {'None'}
                      </MenuItem>
                    </TextField>

                    <TextField
                      size="small"
                      fullWidth
                      // required
                      id="outlined-select"
                      select
                      name="polish_finish"
                      label="Polish Finish"
                      value={changeData.polish_finish || ''}
                      multiple
                      onChange={handleProductFelids}
                      helperText="Please select your polish finish."
                      required
                    >

                      <MenuItem
                        key={'Glossy'}
                        value={'Glossy'}
                      >
                        {'Glossy'}
                      </MenuItem>

                      <MenuItem
                        key={'Matt'}
                        value={'Matt'}
                      >
                        {'Matt'}
                      </MenuItem>
                      <MenuItem
                        key={'None'}
                        value={'None'}
                      >
                        {'None'}
                      </MenuItem>

                    </TextField>


                    <TextField
                      size="small"
                      fullWidth
                      // required
                      id="outlined-select"
                      select
                      name="level"
                      label="Polish Level"
                      value={changeData.level || ''}
                      multiple
                      onChange={handleProductFelids}
                      helperText="Please select your polish level."
                      required
                    >
                      {level.map(
                        (option) =>
                          option && (
                            <MenuItem
                              key={option}
                              value={option}
                            >
                              {option}
                            </MenuItem>
                          )
                      )}
                      <MenuItem
                        key={'None'}
                        value={'None'}
                      >
                        {'None'}
                      </MenuItem>
                    </TextField>

                    <TextField sx={{ mb: 2 }}
                      size="small"
                      fullWidth
                      // required
                      id="outlined-select"
                      name="price"
                      label="Price (per Inch)"
                      type="number"
                    />


                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={changeData.lock}
                          onChange={handleProductFelids}
                          name="lock"
                        />
                      }
                      label="Lock Polish"
                    />


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

            {/*  update Polish Material */}

            {form.formType === "update_polish" && (
              <Grid container p={5}>
                <Grid item xs={12}>
                  <Typography component={'span'} variant="h5">
                    Update Polish
                    <Typography component={'span'}
                      sx={{ display: "block !important" }}
                      variant="caption"
                    >
                      Update your Polish and necessary information from here
                    </Typography>
                  </Typography>
                </Grid>

                <Grid item xs={12} mt={5}>
                  <form
                    className="form" onSubmit={(e) => { confirmBox(e, handleUpdatePolish) }}
                    id="myForm"
                    encType="multipart/form-data"
                    method="post"
                  >

                    <TextField sx={{ mb: 2 }}
                      size="small"
                      fullWidth
                      // required
                      id="outlined-select"
                      name="polish_name"
                      value={changeData.polish_name || ''}
                      onChange={handleProductFelids}
                      label="Polish Name"
                      type="text"
                      helperText="Please enter your primary material"
                    />


                    <FormLabel id="demo-radio-buttons-group-label">
                      Outdoor Images
                    </FormLabel>
                    <ProductsPreviews text={'Please Drag and Drop the outdoor image'}> </ProductsPreviews>

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

                    <FormLabel id="demo-radio-buttons-group-label">
                      Indoor Images
                    </FormLabel>
                    <IndoorPreviews text={'Please Drag and Drop the indoor image'}> </IndoorPreviews>

                    {/* {console.log(Indoor)} */}
                    {Indoor.length > 0 && <Grid sx={{ p: 2 }} spacing={2} container>
                      {
                        Indoor.map((img, index) => {
                          return <>
                            <Grid item xs={2} sx={{ position: 'relative' }} >
                              <CancelIcon onClick={() => {
                                // this function is for removing the image from savedImage array 
                                let temp = Indoor;
                                console.log(">>>>>>", temp, Indoor);
                                temp.splice(index, 1);
                                setIndoor([...temp])
                              }} className='imageCross' color='primary' />
                              <img style={{ width: '100%' }} src={URL.createObjectURL(img)} alt={img.name} />
                            </Grid>
                          </>
                        })
                      }
                    </Grid>
                    }


                    {changeData.indoorSavedImage.length > 0 && <Grid sx={{ p: 2 }} spacing={2} container>
                      <FormLabel id="demo-radio-buttons-group-label">
                        Saved Images
                      </FormLabel>
                      {
                        changeData.indoorSavedImage.map((img, index) => {
                          return <>
                            <Grid item xs={2} sx={{ position: 'relative' }} >
                              <CancelIcon onClick={() => {
                                // this function is for removing the image from savedImage array 
                                let temp = changeData.indoorSavedImage;
                                temp.splice(index, 1);
                                setData({ ...changeData, indoorSavedImage: temp })
                              }} className='imageCross' color='primary' />
                              <img style={{ width: '100%' }} src={img} alt='productImage' />
                            </Grid>
                          </>
                        })
                      }
                    </Grid>
                    }

                    <TextField
                      size="small"
                      fullWidth
                      id="outlined-select"
                      value={changeData.polish_type || ''}
                      onChange={handleProductFelids}
                      select
                      name="polish_type"
                      label="Polish Type"
                      multiple
                      helperText="Please select your polish type."
                      required
                    >
                      {polishCatalog.map(
                        (option) =>
                          option && (
                            <MenuItem
                              key={option}
                              value={option}
                            >
                              {option}
                            </MenuItem>
                          )
                      )}
                      <MenuItem
                        key={'None'}
                        value={'None'}
                      >
                        {'None'}
                      </MenuItem>
                    </TextField>

                    <TextField
                      size="small"
                      fullWidth
                      // required
                      id="outlined-select"
                      select
                      name="polish_finish"
                      value={changeData.polish_finish || ''}
                      onChange={handleProductFelids}
                      label="Polish Finish"
                      multiple
                      helperText="Please select your polish finish."
                      required
                    >

                      <MenuItem
                        key={'Glossy'}
                        value={'Glossy'}
                      >
                        {'Glossy'}
                      </MenuItem>

                      <MenuItem
                        key={'Matt'}
                        value={'Matt'}
                      >
                        {'Matt'}
                      </MenuItem>
                      <MenuItem
                        key={'None'}
                        value={'None'}
                      >
                        {'None'}
                      </MenuItem>

                    </TextField>


                    <TextField
                      size="small"
                      fullWidth
                      // required
                      id="outlined-select"
                      select
                      name="level"
                      label="Polish Level"
                      value={changeData.level || ''}
                      multiple
                      onChange={handleProductFelids}
                      helperText="Please select your polish level."
                      required
                    >
                      {level.map(
                        (option) =>
                          option && (
                            <MenuItem
                              key={option}
                              value={option}
                            >
                              {option}
                            </MenuItem>
                          )
                      )}
                      <MenuItem
                        key={'None'}
                        value={'None'}
                      >
                        {'None'}
                      </MenuItem>
                    </TextField>

                    <TextField sx={{ mb: 2 }}
                      size="small"
                      fullWidth
                      // required
                      id="outlined-select"
                      name="price"
                      value={changeData.price || 0}
                      onChange={handleProductFelids}
                      label="Price (per Inch)"
                      type="number"
                    />


                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={changeData.lock}
                          onChange={handleProductFelids}
                          name="lock"
                        />
                      }
                      label="Lock Polish"
                    />


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
            {/* update addPolish  Ends */}

          </Box>
        </Backdrop>
      </Slide>
    </>
  );
};

export default SideForm;
