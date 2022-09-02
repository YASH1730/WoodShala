import React, { useState, useContext, useRef, useEffect } from "react";
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
  InputLabel
} from "@mui/material";
import { Editor } from "@tinymce/tinymce-react";
import Slide from "@mui/material/Slide";
import Backdrop from "@mui/material/Backdrop";
import "../../assets/custom/css/sideForm.css";
import { useDropzone } from "react-dropzone";
import CancelIcon from "@mui/icons-material/Cancel";
import { OpenBox, Mode, Notify } from "../../App";

// service
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
  addTextile,
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
  customerCatalog
} from "../../services/service.js";

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
  p: 4,
};

const Sideform = () => {
  // multiple images
  const [files, setFiles] = useState([]);
  const [featured, setFeatured] = useState([]);

  // single images
  const [Image, setImages] = useState([]);

  // modal state
  const [open, setOpen] = useState(false);

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

  function ProductsPreviews(props) {
    const { getRootProps, getInputProps } = useDropzone({
      accept: "image/*",
      multiple: true,
      onDrop: (acceptedFiles) => {
        setFiles(
          acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          )
        );
      },
    });

    const thumbs = files.map((file) => (
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

  ]


  // context
  const SideBox = useContext(OpenBox);
  const viewMode = useContext(Mode);
  const dispatchAlert = useContext(Notify);

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
  const [hingeCatalog, setHingeCatalog] = useState([]);
  const [fittingCatalog, setFittingCatalog] = useState([]);
  const [knobCatalog, setKnobCatalog] = useState([]);
  const [doorCatalog, setDoorCatalog] = useState([]);
  const [handleCatalog, setHandleCatalog] = useState([]);
  const [fabricCatalog, setFabricCatalog] = useState([]);
  const [SKUCatalog, setSKUCatalog] = useState([]);
  const [customer, setCustomerCatalog] = useState([]);

  // ref
  const editorRef = useRef();
  const sellingRef = useRef();

  // pres data
  const [changeData, setData] = useState({
    primary_material: [],
    range : '',
    product_array: [],
    shipping: '',
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
    dispatch_time: "",
    polish: "",
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
    textile: '',
    paid_amount: 0,
    total_amount: 0,
    customer_name: '',
    customer_email: '',
    shipping_address: '',
    searchCustomer: '',
    show_on_mobile : false,
  });

  useEffect(() => {

    switch (SideBox.open.formType) {
      case 'product':
        getSKU();
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

        getHinge().then((data) => {
          if (data.data === null) return setHingeCatalog([]);

          return setHingeCatalog(data.data);
        });

        getFitting().then((data) => {
          if (data.data === null) return setFittingCatalog([]);

          return setFittingCatalog(data.data);
        });

        getKnob().then((data) => {
          if (data.data === null) return setKnobCatalog([]);

          return setKnobCatalog(data.data);
        });

        getDoor().then((data) => {
          if (data.data === null) return setDoorCatalog([]);

          return setDoorCatalog(data.data);
        });

        getHandle().then((data) => {
          if (data.data === null) return setHandleCatalog([]);

          return setHandleCatalog(data.data);
        });

        getFabric().then((data) => {
          if (data.data === null) return setFabricCatalog([]);

          return setFabricCatalog(data.data);
        });



        break;
      case 'add_order':
        getOID();
        getPresentSKUs().then((data) => {
          if (data.data === null) return setSKUCatalog([]);

          return setSKUCatalog(data.data);
        });

        customerCatalog().then((data) => {
          console.log(data)
          if (data.data === null) return setCustomerCatalog([]);

          return setCustomerCatalog(data.data);

        })

        break;
      case "update_category":
        categoryList().then((data) => {
          if (data.data === null) return setCategory([]);

          return setCategory(data.data);
        });
        setData({
          category: SideBox.open.payload.row.category_name,
        });
        break;
      case "update_PrimaryMaterial":
        getPrimaryMaterial().then((data) => {
          if (data.data === null) return setMaterialCatalog([]);

          return setMaterialCatalog(data.data);
        });
        setData({
          priMater: SideBox.open.payload.row.primaryMaterial_name,
          primaryMaterial_description: SideBox.open.payload.row.primaryMaterial_description,
        });
        break;
      case "update_polish":
        getPolish().then((data) => {
          if (data.data === null) return setPolishCatalog([]);

          return setPolishCatalog(data.data);
        });

        setData({
          polish: SideBox.open.payload.row.polish_name,
        });
        break;
      case "update_knob":
        getKnob().then((data) => {
          if (data.data === null) return setKnobCatalog([]);

          return setKnobCatalog(data.data);
        });
        setData({
          knob: SideBox.open.payload.row.knob_name,
        });
        break;
      case "update_fitting":
        getFitting().then((data) => {
          if (data.data === null) return setFittingCatalog([]);

          return setFittingCatalog(data.data);
        });
        setData({
          fitting: SideBox.open.payload.row.fitting_name,
        });
        break;
      case "update_hinge":
        getHinge().then((data) => {
          if (data.data === null) return setHingeCatalog([]);

          return setHingeCatalog(data.data);
        });
        setData({
          hinge: SideBox.open.payload.row.hinge_name,
        });
        break;
      case "update_door":
        getDoor().then((data) => {
          if (data.data === null) return setDoorCatalog([]);

          return setDoorCatalog(data.data);
        });
        setData({
          door: SideBox.open.payload.row.door_name,
        });
        break;
      case "update_handle":
        getHandle().then((data) => {
          if (data.data === null) return setHandleCatalog([]);

          return setHandleCatalog(data.data);
        });

        setData({
          handle: SideBox.open.payload.row.handle_name,
        });
        break;
      case "subcategory":
        categoryList().then((data) => {
          if (data.data === null) return setCategory([]);

          return setCategory(data.data);
        });

        setCat(SideBox.open.payload.row.category_id);
        break;
      case "update_Subcategory":
        categoryList().then((data) => {
          if (data.data === null) return setCategory([]);

          return setCategory(data.data);
        });

        setCat(SideBox.open.payload.row.category_id);
        break;
      case "update_blog":
        setData({
          title: SideBox.open.payload.value.title,
          card_image: SideBox.open.payload.value.card_image,
          seo_title: SideBox.open.payload.value.seo_title,
          seo_description: SideBox.open.payload.value.seo_description,
          card_description: SideBox.open.payload.value.card_description,
          description: SideBox.open.payload.value.description,
        });
        break;
      case "update_product":

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

        getHinge().then((data) => {
          if (data.data === null) return setHingeCatalog([]);

          return setHingeCatalog(data.data);
        });

        getFitting().then((data) => {
          if (data.data === null) return setFittingCatalog([]);

          return setFittingCatalog(data.data);
        });

        getKnob().then((data) => {
          if (data.data === null) return setKnobCatalog([]);

          return setKnobCatalog(data.data);
        });

        getDoor().then((data) => {
          if (data.data === null) return setDoorCatalog([]);

          return setDoorCatalog(data.data);
        });

        getHandle().then((data) => {
          if (data.data === null) return setHandleCatalog([]);

          return setHandleCatalog(data.data);
        });

        getFabric().then((data) => {
          if (data.data === null) return setFabricCatalog([]);

          return setFabricCatalog(data.data);
        });


        setData({
          SKU: SideBox.open.payload.value.SKU,
          product_title: SideBox.open.payload.value.product_title,
          category_name: SideBox.open.payload.value.category_id,
          category_id: SideBox.open.payload.value.category_id,
          sub_category_name: SideBox.open.payload.value.sub_category_id,
          sub_category_id: SideBox.open.payload.value.sub_category_id,
          product_description: SideBox.open.payload.value.product_description,
          seo_title: SideBox.open.payload.value.seo_title,
          seo_description: SideBox.open.payload.value.seo_description,
          seo_keyword: SideBox.open.payload.value.seo_keyword,
          product_image: SideBox.open.payload.value.product_image,
          featured_image: SideBox.open.payload.value.featured_image,
          specification_image: SideBox.open.payload.value.specification_image,
          primary_material: JSON.parse(SideBox.open.payload.value.primary_material_name),
          primary_material_name: SideBox.open.payload.value.primary_material_name,
          length_main: SideBox.open.payload.value.length_main,
          breadth: SideBox.open.payload.value.breadth,
          height: SideBox.open.payload.value.height,
          weight: SideBox.open.payload.value.weight,
          polish: SideBox.open.payload.value.polish,
          polish_name: SideBox.open.payload.value.polish_name,
          hinge: SideBox.open.payload.value.hinge,
          hinge_name: SideBox.open.payload.value.hinge_name,
          knob: SideBox.open.payload.value.knob,
          textile: SideBox.open.payload.value.textile,
          knob_name: SideBox.open.payload.value.knob_name,
          textile_name: SideBox.open.payload.value.textile_name,
          textile_type: SideBox.open.payload.value.textile_type,
          handle: SideBox.open.payload.value.handle,
          handle_name: SideBox.open.payload.value.handle_name,
          door: SideBox.open.payload.value.door,
          door_name: SideBox.open.payload.value.door_name,
          fitting: SideBox.open.payload.value.fitting,
          fitting_name: SideBox.open.payload.value.fitting_name,
          selling_points: SideBox.open.payload.value.selling_points,
          top_size: SideBox.open.payload.value.top_size,
          dial_size: SideBox.open.payload.value.dial_size,
          seating_size_width: SideBox.open.payload.value.seating_size_width,
          seating_size_depth: SideBox.open.payload.value.seating_size_depth,
          seating_size_height: SideBox.open.payload.value.seating_size_height,
          weight_capacity: SideBox.open.payload.value.weight_capacity,
          fabric: SideBox.open.payload.value.fabric,
          fabric_name: SideBox.open.payload.value.fabric_name,
          wall_hanging: SideBox.open.payload.value.wall_hanging,
          assembly_required: SideBox.open.payload.value.assembly_required,
          assembly_part: SideBox.open.payload.value.assembly_part,
          legs: SideBox.open.payload.value.legs,
          mirror: SideBox.open.payload.value.mirror,
          mirror_length: SideBox.open.payload.value.mirror_length,
          mirror_width: SideBox.open.payload.value.mirror_width,
          silver: SideBox.open.payload.value.silver,
          silver_weight: SideBox.open.payload.value.silver_weight,
          joints: SideBox.open.payload.value.joints,
          upholstery: SideBox.open.payload.value.upholstery,
          wheel: SideBox.open.payload.value.wheel,
          trolley: SideBox.open.payload.value.trolley,
          trolley_material: SideBox.open.payload.value.trolley_material,
          rotating_seats: SideBox.open.payload.value.rotating_seats,
          eatable_oil_polish: SideBox.open.payload.value.eatable_oil_polish,
          no_chemical: SideBox.open.payload.value.no_chemical,
          straight_back: SideBox.open.payload.value.straight_back,
          lean_back: SideBox.open.payload.value.lean_back,
          weaving: SideBox.open.payload.value.weaving,
          knife: SideBox.open.payload.value.knife,
          not_suitable_for_Micro_Dish: SideBox.open.payload.value.not_suitable_for_Micro_Dish,
          tilt_top: SideBox.open.payload.value.tilt_top,
          inside_compartments: SideBox.open.payload.value.inside_compartments,
          stackable: SideBox.open.payload.value.stackable,
          MRP: SideBox.open.payload.value.MRP,
          tax_rate: SideBox.open.payload.value.tax_rate,
          selling_price: SideBox.open.payload.value.selling_price,
          showroom_price: SideBox.open.payload.value.showroom_price,
          discount_limit: SideBox.open.payload.value.discount_limit,
          dispatch_time: SideBox.open.payload.value.dispatch_time,
          status: SideBox.open.payload.value.status,
          returnDays: SideBox.open.payload.value.returnDays,
          COD: SideBox.open.payload.value.COD,
          returnable: SideBox.open.payload.value.returnable,
          drawer: SideBox.open.payload.value.drawer,
          drawer_count: SideBox.open.payload.value.drawer_count,
          range: SideBox.open.payload.value.range,
          show_on_mobile : SideBox.open.payload.value.show_on_mobile
        });

        setCat(SideBox.open.payload.value.category_id);

        break;
      case "update_fabric":
        getFitting().then((data) => {
          if (data.data === null) return setFittingCatalog([]);

          return setFittingCatalog(data.data);
        });
        setData({
          ...changeData,
          fabric_name: SideBox.open.payload.row.fabric_name,
        });
        break;
      case "update_textile":
        getTextile().then((data) => {
          if (data.data === null) return setTextileCatalog([]);
          return setTextileCatalog(data.data);
        });
        setData({
          ...changeData,
          textile_name: SideBox.open.payload.row.textile_name,
        });
        break;
      case "update_customer":
        console.log(SideBox.open.payload)
        setData({
          CID: SideBox.open.payload.row.CID,
          username: SideBox.open.payload.row.username,
          mobile: SideBox.open.payload.row.mobile,
          email: SideBox.open.payload.row.email,
          password: SideBox.open.payload.row.password,
          city: SideBox.open.payload.row.city,
          state: SideBox.open.payload.row.state,
          shipping: SideBox.open.payload.row.shipping,
        });
        break;
      case "merge_product":
        getMKU()
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

        getHinge().then((data) => {
          if (data.data === null) return setHingeCatalog([]);

          return setHingeCatalog(data.data);
        });

        getFitting().then((data) => {
          if (data.data === null) return setFittingCatalog([]);

          return setFittingCatalog(data.data);
        });

        getKnob().then((data) => {
          if (data.data === null) return setKnobCatalog([]);

          return setKnobCatalog(data.data);
        });

        getDoor().then((data) => {
          if (data.data === null) return setDoorCatalog([]);

          return setDoorCatalog(data.data);
        });

        getHandle().then((data) => {
          if (data.data === null) return setHandleCatalog([]);

          return setHandleCatalog(data.data);
        });

        getFabric().then((data) => {
          if (data.data === null) return setFabricCatalog([]);

          return setFabricCatalog(data.data);
        });


        let productArray = [];

        SideBox.open.payload.map((obj, index) => {
          return productArray.push(obj.SKU)
        })

        setData({
          ...changeData,
          productArray
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

        getHinge().then((data) => {
          if (data.data === null) return setHingeCatalog([]);

          return setHingeCatalog(data.data);
        });

        getFitting().then((data) => {
          if (data.data === null) return setFittingCatalog([]);

          return setFittingCatalog(data.data);
        });

        getKnob().then((data) => {
          if (data.data === null) return setKnobCatalog([]);

          return setKnobCatalog(data.data);
        });

        getDoor().then((data) => {
          if (data.data === null) return setDoorCatalog([]);

          return setDoorCatalog(data.data);
        });

        getHandle().then((data) => {
          if (data.data === null) return setHandleCatalog([]);

          return setHandleCatalog(data.data);
        });

        getFabric().then((data) => {
          if (data.data === null) return setFabricCatalog([]);

          return setFabricCatalog(data.data);
        });


        setData({
          SKU: SideBox.open.payload.value.SKU,
          product_array: SideBox.open.payload.value.product_array.split(','),
          product_title: SideBox.open.payload.value.product_title,
          category_name: SideBox.open.payload.value.category_id,
          category_id: SideBox.open.payload.value.category_id,
          sub_category_name: SideBox.open.payload.value.sub_category_id,
          sub_category_id: SideBox.open.payload.value.sub_category_id,
          product_description: SideBox.open.payload.value.product_description,
          seo_title: SideBox.open.payload.value.seo_title,
          seo_description: SideBox.open.payload.value.seo_description,
          seo_keyword: SideBox.open.payload.value.seo_keyword,
          product_image: SideBox.open.payload.value.product_image,
          featured_image: SideBox.open.payload.value.featured_image,
          specification_image: SideBox.open.payload.value.specification_image,
          selling_points: SideBox.open.payload.value.selling_points,
          rotating_seats: SideBox.open.payload.value.rotating_seats,
          eatable_oil_polish: SideBox.open.payload.value.eatable_oil_polish,
          no_chemical: SideBox.open.payload.value.no_chemical,
          straight_back: SideBox.open.payload.value.straight_back,
          lean_back: SideBox.open.payload.value.lean_back,
          weaving: SideBox.open.payload.value.weaving,
          knife: SideBox.open.payload.value.knife,
          not_suitable_for_Micro_Dish: SideBox.open.payload.value.not_suitable_for_Micro_Dish,
          tilt_top: SideBox.open.payload.value.tilt_top,
          inside_compartments: SideBox.open.payload.value.inside_compartments,
          stackable: SideBox.open.payload.value.stackable,
          MRP: SideBox.open.payload.value.MRP,
          tax_rate: SideBox.open.payload.value.tax_rate,
          selling_price: SideBox.open.payload.value.selling_price,
          showroom_price: SideBox.open.payload.value.showroom_price,
          discount_limit: SideBox.open.payload.value.discount_limit,
          dispatch_time: SideBox.open.payload.value.dispatch_time,
          status: SideBox.open.payload.value.status,
          returnDays: SideBox.open.payload.value.returnDays,
          COD: SideBox.open.payload.value.COD,
          returnable: SideBox.open.payload.value.returnable
        });

        break;

      default:
      // console.log("");
    }

  
  }, [SideBox.open.formType, SideBox.open.state]);

 

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
    switch (SideBox.open.formType) {
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

      default:
      // console.log("");
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
    "show_on_mobile"
  ];


  //  for product felids
  const handleProductFelids = (e) => {
    console.log(e);
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
    // console.log(changeData);
  };


  const handleChange = (event) => {
    // console.log(event.target.name);
    setCat(event.target.value);
  };

  const handleClose = () => {

    resetAll();
    SideBox.setOpen({ state: false, formType: null });
  };

  // function for generating Merged product  ID

  const getMKU = () => {
    getLastMergeProduct()
      .then((res) => {
        if (res.data.length > 0) {
          // // console.log(res.data[0].SKU)

          let index = parseInt(res.data[0].SKU.split("-")[1]) + 1;

          setSKU(`MS-0${index}`);
        } else {
          setSKU("MS-01001");
        }
      })
      .catch((err) => {
        // console.log(err);
      });
  };
  // function for generating product SKU ID

  const getSKU = () => {
    getLastProduct()
      .then((res) => {
        if (res.data.length > 0) {
          // // console.log(res.data[0].SKU)

          let index = parseInt(res.data[0].SKU.split("-")[1]) + 1;

          setSKU(`WS-0${index}`);
        } else {
          setSKU("WS-01001");
        }
      })
      .catch((err) => {
        // console.log(err);
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
        // console.log(err);
      });
  };

  // function for handling category
  const handleTextile = (e) => {
    e.preventDefault();

    const FD = new FormData();

    FD.append("textile_image", Image[0]);
    FD.append("textile_name", e.target.textile_name.value);
    FD.append("textile_status", e.target.textile_status.checked);

    // // console.log(acceptedFiles[0].name, e.target.category_name.value)

    const res = addTextile(FD);

    res
      .then((data) => {
        // console.log(data.status);

        if (data.status === 203) {
          setImages([]);
          dispatchAlert.setNote({
            open: true,
            variant: "error",
            message: data.data.message,
          });
        } else {
          setImages([]);
          handleClose();
          dispatchAlert.setNote({
            open: true,
            variant: "success",
            message: data.data.message,
          });
        }
      })
      .catch((err) => {
        // console.log(err);
        setImages([]);
        dispatchAlert.setNote({
          open: true,
          variant: "error",
          message: "Something Went Wrong !!!",
        });
      });
  };
  const handleFabric = (e) => {
    e.preventDefault();

    const FD = new FormData();

    FD.append("fabric_image", Image[0]);
    FD.append("fabric_name", e.target.fabric_name.value);
    FD.append("fabric_status", e.target.fabric_status.checked);

    // // console.log(acceptedFiles[0].name, e.target.category_name.value)

    const res = addFabric(FD);

    res
      .then((data) => {
        // console.log(data.status);

        if (data.status === 203) {
          setImages([]);
          dispatchAlert.setNote({
            open: true,
            variant: "error",
            message: data.data.message,
          });
        } else {
          setImages([]);
          handleClose();
          dispatchAlert.setNote({
            open: true,
            variant: "success",
            message: data.data.message,
          });
        }
      })
      .catch((err) => {
        // console.log(err);
        setImages([]);
        dispatchAlert.setNote({
          open: true,
          variant: "error",
          message: "Something Went Wrong !!!",
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

    // // console.log(acceptedFiles[0].name, e.target.category_name.value)

    const res = addCategory(FD);

    res
      .then((data) => {
        // console.log(data.status);

        if (data.status === 203) {
          setImages([]);
          dispatchAlert.setNote({
            open: true,
            variant: "error",
            message: data.data.message,
          });
        } else {
          setImages([]);
          handleClose();
          dispatchAlert.setNote({
            open: true,
            variant: "success",
            message: data.data.message,
          });
        }
      })
      .catch((err) => {
        // console.log(err);
        setImages([]);
        dispatchAlert.setNote({
          open: true,
          variant: "error",
          message: "Something Went Wrong !!!",
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
    FD.append("city", e.target.city.value);
    // FD.append("pincode", e.target.pincode.value);
    FD.append("state", e.target.state.value);
    // FD.append("landmark", e.target.landmark.value);
    FD.append("shipping", e.target.shipping.value);


    const res = addCustomer(FD);

    res
      .then((data) => {
        // console.log(data.status);

        if (data.status === 203) {
          setImages([]);
          dispatchAlert.setNote({
            open: true,
            variant: "error",
            message: data.data.message,
          });
        } else {
          setImages([]);
          handleClose();
          dispatchAlert.setNote({
            open: true,
            variant: "success",
            message: data.data.message,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        setImages([]);
        dispatchAlert.setNote({
          open: true,
          variant: "error",
          message: "Something Went Wrong !!!",
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
        // console.log(data.status);

        if (data.status === 203) {
          setImages([]);
          dispatchAlert.setNote({
            open: true,
            variant: "error",
            message: data.data.message,
          });
        } else {
          setImages([]);
          handleClose();
          dispatchAlert.setNote({
            open: true,
            variant: "success",
            message: data.data.message,
          });
        }
      })
      .catch((err) => {
        // console.log(err);
        setImages([]);
        dispatchAlert.setNote({
          open: true,
          variant: "error",
          message: "Something Went Wrong !!!",
        });
      });
  };

  // function for handling update category
  const handleUpdateTextile = (e) => {
    e.preventDefault();

    const FD = new FormData();

    FD.append("_id", SideBox.open.payload.row.action);

    Image[0] !== undefined && FD.append("fabric_image", Image[0]);

    e.target.textile_name.value !== ""
      ? FD.append("textile_name", e.target.textile_name.value)
      : console.log();

    const res = editTextile(FD);
    res
      .then((data) => {
        // console.log(data.status);

        if (data.status === 203) {
          setImages([]);
          dispatchAlert.setNote({
            open: true,
            variant: "error",
            message: data.data.message,
          });
        } else {
          setImages([]);
          handleClose();
          dispatchAlert.setNote({
            open: true,
            variant: "success",
            message: data.data.message,
          });
        }
      })
      .catch((err) => {
        // console.log(err);
        setImages([]);
        dispatchAlert.setNote({
          open: true,
          variant: "error",
          message: "Something Went Wrong !!!",
        });
      });
  };
  // function for handling update category
  const handleUpdateFabric = (e) => {
    e.preventDefault();

    const FD = new FormData();

    FD.append("_id", SideBox.open.payload.row.action);

    Image[0] !== undefined && FD.append("fabric_image", Image[0]);

    e.target.fabric_name.value !== ""
      ? FD.append("fabric_name", e.target.fabric_name.value)
      : console.log();

    const res = editFabric(FD);
    res
      .then((data) => {
        // console.log(data.status);

        if (data.status === 203) {
          setImages([]);
          dispatchAlert.setNote({
            open: true,
            variant: "error",
            message: data.data.message,
          });
        } else {
          setImages([]);
          handleClose();
          dispatchAlert.setNote({
            open: true,
            variant: "success",
            message: data.data.message,
          });
        }
      })
      .catch((err) => {
        // console.log(err);
        setImages([]);
        dispatchAlert.setNote({
          open: true,
          variant: "error",
          message: "Something Went Wrong !!!",
        });
      });
  };
  // function for handling update category
  const handleUpdateCategory = (e) => {
    e.preventDefault();

    const FD = new FormData();

    FD.append("_id", SideBox.open.payload.row.action);

    Image[0] !== undefined && FD.append("category_image", Image[0]);

    e.target.category_name.value !== undefined
      ? FD.append("category_name", e.target.category_name.value)
      : console.log();

    const res = editCategory(FD);
    res
      .then((data) => {
        // console.log(data.status);

        if (data.status === 203) {
          setImages([]);
          dispatchAlert.setNote({
            open: true,
            variant: "error",
            message: data.data.message,
          });
        } else {
          setImages([]);
          handleClose();
          dispatchAlert.setNote({
            open: true,
            variant: "success",
            message: data.data.message,
          });
        }
      })
      .catch((err) => {
        // console.log(err);
        setImages([]);
        dispatchAlert.setNote({
          open: true,
          variant: "error",
          message: "Something Went Wrong !!!",
        });
      });
  };

  // function fo resting the values

  const resetAll = () => {
    setImages([]);
    setFeatured([]);
    setFiles([]);

    setShowFabric("No");
    setData({
      searchCustomer: '',
      primary_material: [],
      product_array: [],
      shipping: [],
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
      dispatch_time: "",
      polish: "",
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
      textile: ''

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
        dispatchAlert.setNote({
          open: true,
          variant: "success",
          message: data.data.message,
        });
      })
      .catch((data) => {
        dispatchAlert.setNote({
          open: true,
          variant: "error",
          message: data.data.message,
        });
      });
  };

  const handleUpdateGallery = (e) => {
    const FD = new FormData();

    e.preventDefault();

    FD.append("category_image", Image[0]);
    FD.append("SKU", SideBox.open.payload.SKU);
    FD.append("ImageIndex", SideBox.open.payload.imageIndex);

    const res = updateImage(FD);

    // console.log(SideBox.open.payload);

    res
      .then((data) => {
        dispatchAlert.setNote({
          open: true,
          variant: "success",
          message: data.data.message,
        });
      })
      .catch((data) => {
        dispatchAlert.setNote({
          open: true,
          variant: "error",
          message: data.data.message,
        });
      });
  };


  const handleProduct = (e) => {
    e.preventDefault();

    const FD = new FormData();

    files.map((element) => {
      return FD.append("product_image", element);
    });

    FD.append("status", false);

    Image.map((element) => {
      return FD.append("specification_image", element);
    });

    featured.map((element) => {
      return FD.append("featured_image", element);
    });
   
    FD.append("primary_material_name", JSON.stringify(changeData.primary_material))

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

    polishCatalog.map((item) => {
      return (
        item._id === changeData.polish &&
        FD.append("polish_name", item.polish_name)
      );
    });

    textileCatalog.map((item) => {
      return (
        item._id === changeData.textile_type &&
        FD.append("textile_name", item.textile_name)
      );
    });
    hingeCatalog.map((item) => {
      return (
        item._id === changeData.hinge &&
        FD.append("hinge_name", item.hinge_name)
      );
    });
    fittingCatalog.map((item) => {
      return (
        item._id === changeData.fitting &&
        FD.append("fitting_name", item.fitting_name)
      );
    });
    knobCatalog.map((item) => {
      return (
        item._id === changeData.knob && FD.append("knob_name", item.knob_name)
      );
    });
    doorCatalog.map((item) => {
      return (
        item._id === changeData.door && FD.append("door_name", item.door_name)
      );
    });
    handleCatalog.map((item) => {
      return (
        item._id === changeData.handle &&
        FD.append("handle_name", item.handle_name)
      );
    });

    if (showFabric === "Yes") {
      fabricCatalog.map((item) => {
        return (
          item._id === changeData.fabric &&
          FD.append("fabric_name", item.fabric_name)
        );
      });
    }


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
    FD.append("sub_category_id", changeData.sub_category_name);
    FD.append("dispatch_time", changeData.dispatch_time);
    FD.append("product_title", changeData.product_title);
    FD.append("product_description", editorRef.current.getContent());
    FD.append("selling_points", sellingRef.current.getContent());
    FD.append("SKU", SKU);
    FD.append("MRP", changeData.MRP ? changeData.MRP : 0);
    FD.append(
      "showroom_price",
      changeData.showroom_price ? changeData.showroom_price : 0
    );
    FD.append("seo_title", changeData.seo_title);
    FD.append("seo_description", changeData.seo_description);
    FD.append("seo_keyword", changeData.seo_keyword);
    FD.append("discount_limit", changeData.discount_limit);
    FD.append("selling_price", changeData.selling_price);
    FD.append("primary_material", changeData.primary_material);
    FD.append("fabric", changeData.fabric);

    FD.append("drawer", changeData.drawer);

    if (changeData.drawer !== undefined || changeData.drawer !== 'none')
      FD.append("drawer_count", changeData.drawer_count ? changeData.drawer_count : 0);


    //  // console.log(secMaterial)
    if (changeData.secondary_material_weight !== undefined)
      FD.append(
        "secondary_material_weight",
        changeData.secondary_material_weight
      );
    FD.append(
      "length_main",
      changeData.length_main ? changeData.length_main : 0
    );
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
    FD.append("lean_back", changeData.lean_back ? changeData.lean_back : false);
    FD.append("weaving", changeData.weaving ? changeData.weaving : false);
    FD.append("knife", changeData.knife ? changeData.knife : false);
    FD.append("show_on_mobile", changeData.show_on_mobile ? changeData.show_on_mobile : false);
    
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
    FD.append(
      "straight_back",
      changeData.straight_back ? changeData.straight_back : false
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
        // console.log(data.status);

        if (data.status === 203) {
          dispatchAlert.setNote({
            open: true,
            variant: "error",
            message: data.data.message,
          });
        } else {
          handleClose();
          dispatchAlert.setNote({
            open: true,
            variant: "success",
            message: data.data.message,
          });
        }
      })
      .catch((err) => {
        // console.log(err);
        dispatchAlert.setNote({
          open: true,
          variant: "error",
          message: "Something Went Wrong !!!",
        });
      });
  };
  const handleUpdateProduct = (e) => {
    e.preventDefault();

    const FD = new FormData();



    files.map((element) => {
      return FD.append("product_image", element);
    });

    FD.append("_id", SideBox.open.payload.value._id);

    Image.map((element) => {
      return FD.append("specification_image", element);
    });

    featured.map((element) => {
      return FD.append("featured_image", element);
    });

    FD.append("primary_material_name", JSON.stringify(changeData.primary_material))

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

    polishCatalog.map((item) => {
      return (
        item._id === changeData.polish &&
        FD.append("polish_name", item.polish_name)
      );
    });

    textileCatalog.map((item) => {
      return (
        item._id === changeData.textile_type &&
        FD.append("textile_name", item.textile_name)
      );
    });
    hingeCatalog.map((item) => {
      return (
        item._id === changeData.hinge &&
        FD.append("hinge_name", item.hinge_name)
      );
    });
    fittingCatalog.map((item) => {
      return (
        item._id === changeData.fitting &&
        FD.append("fitting_name", item.fitting_name)
      );
    });
    knobCatalog.map((item) => {
      return (
        item._id === changeData.knob && FD.append("knob_name", item.knob_name)
      );
    });
    doorCatalog.map((item) => {
      return (
        item._id === changeData.door && FD.append("door_name", item.door_name)
      );
    });
    handleCatalog.map((item) => {
      return (
        item._id === changeData.handle &&
        FD.append("handle_name", item.handle_name)
      );
    });

    if (showFabric === "Yes") {
      fabricCatalog.map((item) => {
        return (
          item._id === changeData.fabric &&
          FD.append("fabric_name", item.fabric_name)
        );
      });
    }


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
    FD.append("sub_category_id", changeData.sub_category_name);
    FD.append("dispatch_time", changeData.dispatch_time);
    FD.append("product_title", changeData.product_title);
    FD.append("product_description", editorRef.current.getContent());
    FD.append("selling_points", sellingRef.current.getContent());
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
    FD.append("selling_price", changeData.selling_price);
    FD.append("primary_material", changeData.primary_material);
    FD.append("fabric", changeData.fabric);

    FD.append("drawer", changeData.drawer);

    if (changeData.drawer !== undefined || changeData.drawer !== 'none')
      FD.append("drawer_count", changeData.drawer_count ? changeData.drawer_count : 0);


    //  // console.log(secMaterial)
    if (changeData.secondary_material_weight !== undefined)
      FD.append(
        "secondary_material_weight",
        changeData.secondary_material_weight
      );
    FD.append(
      "length_main",
      changeData.length_main ? changeData.length_main : 0
    );
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
    FD.append("lean_back", changeData.lean_back ? changeData.lean_back : false);
    FD.append("weaving", changeData.weaving ? changeData.weaving : false);
    FD.append("knife", changeData.knife ? changeData.knife : false);
    FD.append("show_on_mobile", changeData.show_on_mobile ? changeData.show_on_mobile : false);
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
    FD.append(
      "straight_back",
      changeData.straight_back ? changeData.straight_back : false
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
        // console.log(data.status);

        if (data.status === 203) {
          dispatchAlert.setNote({
            open: true,
            variant: "error",
            message: data.data.message,
          });
        } else {
          handleClose();
          dispatchAlert.setNote({
            open: true,
            variant: "success",
            message: data.data.message,
          });
        }
      })
      .catch((err) => {
        // console.log(err);
        dispatchAlert.setNote({
          open: true,
          variant: "error",
          message: "Something Went Wrong !!!",
        });
      });
  };


  const handleMergeProduct = (e) => {
    e.preventDefault();

    const FD = new FormData();

    files.map((element) => {
      return FD.append("product_image", element);
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

    FD.append("returnDays", changeData.returnable ? changeData.returnDays : 0);
    FD.append("returnable", changeData.returnable);
    FD.append("COD", changeData.COD);

    FD.append("category_id", changeData.category_name);
    FD.append("sub_category_id", changeData.sub_category_name);
    FD.append("dispatch_time", changeData.dispatch_time);
    FD.append("product_title", changeData.product_title);
    FD.append("product_description", editorRef.current.getContent());
    FD.append("selling_points", sellingRef.current.getContent());
    FD.append("SKU", SKU);
    FD.append("product_array", changeData.productArray);
    FD.append("MRP", changeData.MRP ? changeData.MRP : 0);
    FD.append(
      "showroom_price",
      changeData.showroom_price ? changeData.showroom_price : 0
    );
    FD.append("seo_title", changeData.seo_title);
    FD.append("seo_description", changeData.seo_description);
    FD.append("seo_keyword", changeData.seo_keyword);
    FD.append("discount_limit", changeData.discount_limit);
    FD.append("selling_price", changeData.selling_price);
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
    FD.append("lean_back", changeData.lean_back ? changeData.lean_back : false);
    FD.append("weaving", changeData.weaving ? changeData.weaving : false);
    FD.append("knife", changeData.knife ? changeData.knife : false);
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
    FD.append(
      "straight_back",
      changeData.straight_back ? changeData.straight_back : false
    );
    FD.append("tilt_top", changeData.tilt_top ? changeData.tilt_top : false);
    FD.append(
      "inside_compartments",
      changeData.inside_compartments ? changeData.inside_compartments : false
    );
    FD.append("stackable", changeData.stackable ? changeData.stackable : false);
    FD.append("tax_rate", changeData.tax_rate);

    const res = addMergeProduct(FD);

    res
      .then((data) => {

        if (data.status === 203) {
          dispatchAlert.setNote({
            open: true,
            variant: "error",
            message: data.data.message,
          });
        } else {
          handleClose();
          dispatchAlert.setNote({
            open: true,
            variant: "success",
            message: data.data.message,
          });
        }
      })
      .catch((err) => {
        // console.log(err);
        dispatchAlert.setNote({
          open: true,
          variant: "error",
          message: "Something Went Wrong !!!",
        });
      });
  };
  const handleUpdateMergeProduct = (e) => {
    e.preventDefault();

    const FD = new FormData();



    FD.append("_id", SideBox.open.payload.value._id);


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

    FD.append("returnDays", changeData.returnable ? changeData.returnDays : 0);
    FD.append("returnable", changeData.returnable);
    FD.append("COD", changeData.COD);

    FD.append("category_id", changeData.category_name);
    FD.append("sub_category_id", changeData.sub_category_name);
    FD.append("dispatch_time", changeData.dispatch_time);
    FD.append("product_title", changeData.product_title);
    FD.append("product_description", editorRef.current.getContent());
    FD.append("selling_points", sellingRef.current.getContent());
    FD.append("SKU", SKU);
    FD.append("product_array", JSON.stringify(changeData.product_array));
    FD.append("MRP", changeData.MRP ? changeData.MRP : 0);
    FD.append(
      "showroom_price",
      changeData.showroom_price ? changeData.showroom_price : 0
    );
    FD.append("seo_title", changeData.seo_title);
    FD.append("seo_description", changeData.seo_description);
    FD.append("seo_keyword", changeData.seo_keyword);
    FD.append("discount_limit", changeData.discount_limit);
    FD.append("selling_price", changeData.selling_price);
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
    FD.append("lean_back", changeData.lean_back ? changeData.lean_back : false);
    FD.append("weaving", changeData.weaving ? changeData.weaving : false);
    FD.append("knife", changeData.knife ? changeData.knife : false);
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
    FD.append(
      "straight_back",
      changeData.straight_back ? changeData.straight_back : false
    );
    FD.append("tilt_top", changeData.tilt_top ? changeData.tilt_top : false);
    FD.append(
      "inside_compartments",
      changeData.inside_compartments ? changeData.inside_compartments : false
    );
    FD.append("stackable", changeData.stackable ? changeData.stackable : false);
    FD.append("tax_rate", changeData.tax_rate);

    const res = updateMergeProduct(FD);

    res
      .then((data) => {

        if (data.status === 203) {
          dispatchAlert.setNote({
            open: true,
            variant: "error",
            message: data.data.message,
          });
        } else {
          handleClose();
          dispatchAlert.setNote({
            open: true,
            variant: "success",
            message: data.data.message,
          });
        }
      })
      .catch((err) => {
        // console.log(err);
        dispatchAlert.setNote({
          open: true,
          variant: "error",
          message: "Something Went Wrong !!!",
        });
      });
  };


  const handlePrimaryMaterial = (e) => {
    e.preventDefault();

    const FD = new FormData();


    Image.map((element) => {
      return FD.append("primaryMaterial_image", element);
    });
    FD.append("primaryMaterial_description", e.target.primaryMaterial_description.value);

    FD.append("primaryMaterial_name", e.target.primaryMaterial_name.value);
    FD.append(
      "primaryMaterial_status",
      e.target.primaryMaterial_status.checked
    );

    // // console.log(acceptedFiles[0].name, e.target.category_name.value)

    const res = addPrimaryMaterial(FD);

    res
      .then((data) => {
        // console.log(data.status);

        if (data.status === 203) {
          setImages([]);
          dispatchAlert.setNote({
            open: true,
            variant: "error",
            message: data.data.message,
          });
        } else {
          setImages([]);
          handleClose();
          dispatchAlert.setNote({
            open: true,
            variant: "success",
            message: data.data.message,
          });
        }
      })
      .catch((err) => {
        // console.log(err);
        setImages([]);
        dispatchAlert.setNote({
          open: true,
          variant: "error",
          message: "Something Went Wrong !!!",
        });
      });
  };

  const handleUpdatePrimaryMaterial = (e) => {
    e.preventDefault();

    const FD = new FormData();


    FD.append("_id", SideBox.open.payload.row.action);

    Image.map((element) => {
      return FD.append("primaryMaterial_image", element);
    });
    FD.append("primaryMaterial_description", e.target.primaryMaterial_description.value);


    e.target.primaryMaterial_name.value !== "" &&
      FD.append("primaryMaterial_name", e.target.primaryMaterial_name.value);

    const res = editPrimaryMaterial(FD);

    res
      .then((data) => {
        // console.log(data.status);

        if (data.status === 203) {
          setImages([]);
          dispatchAlert.setNote({
            open: true,
            variant: "error",
            message: data.data.message,
          });
        } else {
          setImages([]);
          handleClose();
          dispatchAlert.setNote({
            open: true,
            variant: "success",
            message: data.data.message,
          });
        }
      })
      .catch((err) => {
        // console.log(err);
        setImages([]);
        dispatchAlert.setNote({
          open: true,
          variant: "error",
          message: "Something Went Wrong !!!",
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
        // console.log(data.status);

        if (data.status === 203) {
          setImages([]);
          dispatchAlert.setNote({
            open: true,
            variant: "error",
            message: data.data.message,
          });
        } else {
          setImages([]);
          handleClose();
          dispatchAlert.setNote({
            open: true,
            variant: "success",
            message: data.data.message,
          });
        }
      })
      .catch((err) => {
        // console.log(err);
        setImages([]);
        dispatchAlert.setNote({
          open: true,
          variant: "error",
          message: "Something Went Wrong !!!",
        });
      });
  };

  const handleUpdateHandle = (e) => {
    e.preventDefault();

    const FD = new FormData();
    FD.append("_id", SideBox.open.payload.row.action);

    e.target.handle_name.value !== "" &&
      FD.append("handle_name", e.target.handle_name.value);

    const res = editHandle(FD);

    res
      .then((data) => {
        // console.log(data.status);

        if (data.status === 203) {
          setImages([]);
          dispatchAlert.setNote({
            open: true,
            variant: "error",
            message: data.data.message,
          });
        } else {
          setImages([]);
          handleClose();
          dispatchAlert.setNote({
            open: true,
            variant: "success",
            message: data.data.message,
          });
        }
      })
      .catch((err) => {
        // console.log(err);
        setImages([]);
        dispatchAlert.setNote({
          open: true,
          variant: "error",
          message: "Something Went Wrong !!!",
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
        // console.log(data.status);

        if (data.status === 203) {
          setImages([]);
          dispatchAlert.setNote({
            open: true,
            variant: "error",
            message: data.data.message,
          });
        } else {
          setImages([]);
          handleClose();
          dispatchAlert.setNote({
            open: true,
            variant: "success",
            message: data.data.message,
          });
        }
      })
      .catch((err) => {
        // console.log(err);
        setImages([]);
        dispatchAlert.setNote({
          open: true,
          variant: "error",
          message: "Something Went Wrong !!!",
        });
      });
  };

  const handleUpdateHinge = (e) => {
    e.preventDefault();

    const FD = new FormData();
    FD.append("_id", SideBox.open.payload.row.action);

    e.target.hinge_name.value !== "" &&
      FD.append("hinge_name", e.target.hinge_name.value);

    const res = editHinge(FD);

    res
      .then((data) => {
        // console.log(data.status);

        if (data.status === 203) {
          setImages([]);
          dispatchAlert.setNote({
            open: true,
            variant: "error",
            message: data.data.message,
          });
        } else {
          setImages([]);
          handleClose();
          dispatchAlert.setNote({
            open: true,
            variant: "success",
            message: data.data.message,
          });
        }
      })
      .catch((err) => {
        // console.log(err);
        setImages([]);
        dispatchAlert.setNote({
          open: true,
          variant: "error",
          message: "Something Went Wrong !!!",
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
        // console.log(data.status);

        if (data.status === 203) {
          setImages([]);
          dispatchAlert.setNote({
            open: true,
            variant: "error",
            message: data.data.message,
          });
        } else {
          setImages([]);
          handleClose();
          handleClose();
          dispatchAlert.setNote({
            open: true,
            variant: "success",
            message: data.data.message,
          });
        }
      })
      .catch((err) => {
        // console.log(err);
        setImages([]);
        dispatchAlert.setNote({
          open: true,
          variant: "error",
          message: "Something Went Wrong !!!",
        });
      });
  };

  const handleUpdateDoor = (e) => {
    e.preventDefault();

    const FD = new FormData();
    FD.append("_id", SideBox.open.payload.row.action);

    e.target.door_name.value !== "" &&
      FD.append("door_name", e.target.door_name.value);

    const res = editDoor(FD);

    res
      .then((data) => {
        // console.log(data.status);

        if (data.status === 203) {
          setImages([]);
          dispatchAlert.setNote({
            open: true,
            variant: "error",
            message: data.data.message,
          });
        } else {
          setImages([]);
          handleClose();
          dispatchAlert.setNote({
            open: true,
            variant: "success",
            message: data.data.message,
          });
        }
      })
      .catch((err) => {
        // console.log(err);
        setImages([]);
        dispatchAlert.setNote({
          open: true,
          variant: "error",
          message: "Something Went Wrong !!!",
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
        // console.log(data.status);

        if (data.status === 203) {
          setImages([]);
          dispatchAlert.setNote({
            open: true,
            variant: "error",
            message: data.data.message,
          });
        } else {
          setImages([]);
          handleClose();
          dispatchAlert.setNote({
            open: true,
            variant: "success",
            message: data.data.message,
          });
        }
      })
      .catch((err) => {
        // console.log(err);
        setImages([]);
        dispatchAlert.setNote({
          open: true,
          variant: "error",
          message: "Something Went Wrong !!!",
        });
      });
  };
  const handleUpdateKnob = (e) => {
    e.preventDefault();

    const FD = new FormData();
    FD.append("_id", SideBox.open.payload.row.action);

    e.target.knob_name.value !== "" &&
      FD.append("knob_name", e.target.knob_name.value);

    const res = editKnob(FD);

    res
      .then((data) => {
        // console.log(data.status);

        if (data.status === 203) {
          setImages([]);
          dispatchAlert.setNote({
            open: true,
            variant: "error",
            message: data.data.message,
          });
        } else {
          setImages([]);
          handleClose();
          dispatchAlert.setNote({
            open: true,
            variant: "success",
            message: data.data.message,
          });
        }
      })
      .catch((err) => {
        // console.log(err);
        setImages([]);
        dispatchAlert.setNote({
          open: true,
          variant: "error",
          message: "Something Went Wrong !!!",
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
        // console.log(data.status);

        if (data.status === 203) {
          setImages([]);
          dispatchAlert.setNote({
            open: true,
            variant: "error",
            message: data.data.message,
          });
        } else {
          setImages([]);
          handleClose();
          dispatchAlert.setNote({
            open: true,
            variant: "success",
            message: data.data.message,
          });
        }
      })
      .catch((err) => {
        // console.log(err);
        setImages([]);
        dispatchAlert.setNote({
          open: true,
          variant: "error",
          message: "Something Went Wrong !!!",
        });
      });
  };

  const handleUpdateFitting = (e) => {
    e.preventDefault();

    const FD = new FormData();
    FD.append("_id", SideBox.open.payload.row.action);

    e.target.fitting_name.value !== "" &&
      FD.append("fitting_name", e.target.fitting_name.value);

    const res = editFitting(FD);

    res
      .then((data) => {
        // console.log(data.status);

        if (data.status === 203) {
          setImages([]);
          dispatchAlert.setNote({
            open: true,
            variant: "error",
            message: data.data.message,
          });
        } else {
          setImages([]);
          handleClose();
          dispatchAlert.setNote({
            open: true,
            variant: "success",
            message: data.data.message,
          });
        }
      })
      .catch((err) => {
        // console.log(err);
        setImages([]);
        dispatchAlert.setNote({
          open: true,
          variant: "error",
          message: "Something Went Wrong !!!",
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
        // console.log(data.status);

        if (data.status === 203) {
          setImages([]);
          dispatchAlert.setNote({
            open: true,
            variant: "error",
            message: data.data.message,
          });
        } else {
          setImages([]);
          handleClose();
          dispatchAlert.setNote({
            open: true,
            variant: "success",
            message: data.data.message,
          });
        }
      })
      .catch((err) => {
        // console.log(err);
        setImages([]);
        dispatchAlert.setNote({
          open: true,
          variant: "error",
          message: "Something Went Wrong !!!",
        });
      });
  };
  const handleUpdatePolish = (e) => {
    e.preventDefault();

    const FD = new FormData();
    FD.append("_id", SideBox.open.payload.row.action);

    e.target.polish_name.value !== "" &&
      FD.append("polish_name", e.target.polish_name.value);

    const res = editPolish(FD);

    res
      .then((data) => {
        // console.log(data.status);

        if (data.status === 203) {
          setImages([]);
          dispatchAlert.setNote({
            open: true,
            variant: "error",
            message: data.data.message,
          });
        } else {
          setImages([]);
          handleClose();
          dispatchAlert.setNote({
            open: true,
            variant: "success",
            message: data.data.message,
          });
        }
      })
      .catch((err) => {
        // console.log(err);
        setImages([]);
        dispatchAlert.setNote({
          open: true,
          variant: "error",
          message: "Something Went Wrong !!!",
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

    // // console.log(acceptedFiles[0].name, e.target.category_name.value)

    const res = addSubCategories(FD);

    res
      .then((data) => {
        // console.log(data.status);

        if (data.status === 203) {
          setImages([]);
          dispatchAlert.setNote({
            open: true,
            variant: "error",
            message: data.data.message,
          });
        } else {
          setImages([]);
          handleClose();
          dispatchAlert.setNote({
            open: true,
            variant: "success",
            message: data.data.message,
          });
        }
      })
      .catch((err) => {
        // console.log(err);
        setImages([]);
        dispatchAlert.setNote({
          open: true,
          variant: "error",
          message: "Something Went Wrong !!!",
        });
      });
  };
  const handleUpdateSubCategories = (e) => {
    e.preventDefault();

    const FD = new FormData();

    // console.log(SideBox.open.payload);

    FD.append("_id", SideBox.open.payload.row.action);

    category.map((item) => {
      return (
        item._id === e.target.category_id.value &&
        FD.append("category_name", item.category_name)
      );
    });

    e.target.category_id.value !== "" &&
      FD.append("category_id", e.target.category_id.value);
    e.target.sub_category_name.value !== "" &&
      FD.append("sub_category_name", e.target.sub_category_name.value);

    // // console.log(acceptedFiles[0].name, e.target.category_name.value)

    const res = editSubCatagories(FD);

    res
      .then((data) => {
        // console.log(data.status);

        if (data.status === 203) {
          setImages([]);
          dispatchAlert.setNote({
            open: true,
            variant: "error",
            message: data.data.message,
          });
        } else {
          setImages([]);
          handleClose();
          dispatchAlert.setNote({
            open: true,
            variant: "success",
            message: data.data.message,
          });
        }
      })
      .catch((err) => {
        // console.log(err);
        setImages([]);
        dispatchAlert.setNote({
          open: true,
          variant: "error",
          message: "Something Went Wrong !!!",
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
        // console.log(data.status);

        if (data.status === 203) {
          setImages([]);
          dispatchAlert.setNote({
            open: true,
            variant: "error",
            message: data.data.message,
          });
        } else {
          setImages([]);
          setUrl(data.data.url);
          dispatchAlert.setNote({
            open: true,
            variant: "success",
            message: data.data.message,
          });
        }
      })
      .catch((err) => {
        // console.log(err);
        setImages([]);
        dispatchAlert.setNote({
          open: true,
          variant: "error",
          message: "Something Went Wrong !!!",
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
        // console.log(data.status);

        if (data.status === 203) {
          setImages([]);
          dispatchAlert.setNote({
            open: true,
            variant: "error",
            message: data.data.message,
          });
        } else {
          setImages([]);
          setUrl(data.data.url);
          handleClose();
          dispatchAlert.setNote({
            open: true,
            variant: "success",
            message: data.data.message,
          });
        }
      })
      .catch((err) => {
        // console.log(err);
        setImages([]);
        dispatchAlert.setNote({
          open: true,
          variant: "error",
          message: "Something Went Wrong !!!",
        });
      });
  };

  const handleUpdateBlog = (e) => {
    e.preventDefault();

    const FD = new FormData();

    featured.map((element) => {
      return FD.append("banner_image", element);
    });

    FD.append("_id", SideBox.open.payload.value._id);

    FD.append("description", editorRef.current.getContent());
    FD.append("title", e.target.title.value);
    FD.append("seo_title", e.target.seo_title.value);
    FD.append("seo_description", e.target.seo_description.value);
    FD.append("card_description", e.target.card_description.value);

    const res = updateBlog(FD);

    res
      .then((data) => {
        // console.log(data.status);

        if (data.status === 203) {
          setImages([]);
          dispatchAlert.setNote({
            open: true,
            variant: "error",
            message: data.data.message,
          });
        } else {
          setImages([]);
          setUrl(data.data.url);
          handleClose();
          dispatchAlert.setNote({
            open: true,
            variant: "success",
            message: data.data.message,
          });
        }
      })
      .catch((err) => {
        // console.log(err);
        setImages([]);
        dispatchAlert.setNote({
          open: true,
          variant: "error",
          message: "Something Went Wrong !!!",
        });
      });
  };

  const handleOrder = (e) => {
    e.preventDefault();

    const FD = new FormData();

    FD.append("products", changeData.product_array);
    FD.append("OID", SKU);
    FD.append("status", 'processing');

    if (changeData.searchCustomer === "") {
      FD.append("customer_name", e.target.customer_name.value);
      FD.append("customer_email", e.target.customer_email.value);
      FD.append("customer_mobile", e.target.customer_mobile.value);
      FD.append("shipping", e.target.shipping.value);
      FD.append("city", e.target.city.value);
      FD.append("state", e.target.state.value);
    }
    else
      FD.append('searchCustomer', changeData.searchCustomer);

    FD.append('paid_amount', e.target.paid_amount.value);
    FD.append('total_amount', e.target.total_amount.value);


    const res = addOrder(FD);

    res
      .then((data) => {

        if (data.status !== 200) {
          setImages([]);
          dispatchAlert.setNote({
            open: true,
            variant: "error",
            message: data.data.message || 'Something Went Wrong !!!',
          });
        } else {
          setImages([]);
          setUrl(data.data.url);
          handleClose();
          dispatchAlert.setNote({
            open: true,
            variant: "success",
            message: data.data.message,
          });
        }
      })
      .catch((err) => {
        // console.log(err);
        setImages([]);
        dispatchAlert.setNote({
          open: true,
          variant: "error",
          message: "Something Went Wrong !!!",
        });
      });

  }

  return (
    <>
      <Slide
        direction="left"
        in={SideBox.open.state}
        mountOnEnter
        unmountOnExit
      >
        <Backdrop
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={SideBox.open.state}
        >
          <Box
            className={
              viewMode.mode === true ? "mainDarkContainer" : "mainContainer"
            }
            sx={
              SideBox.open.formType === "product" ||
                SideBox.open.formType === "update_product"
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

            {SideBox.open.formType === "product" && (
              <Grid container p={5} className="productPadding">

                <Grid item xs={12}>
                  <Typography variant="h5">
                    Add Product
                    <Typography
                      sx={{ display: "block !important" }}
                      variant="caption"
                    >
                      Add your product and necessary information from
                      here
                    </Typography>
                  </Typography>
                </Grid>

                <Grid item xs={12} mt={5}>
                  <form
                    className="form"
                    id="myForm"
                    onSubmit={handleProduct}
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
                            <TextField size="small"
                              fullWidth
                              autoComplete={false}
                              id="fullWidth"
                              // // required
                              label="SKU"
                              type="text"
                              value={SKU}
                              disabled
                              variant="outlined"
                              name="SKU"
                            />

                            <br></br>

                            <TextField size="small"
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
                              <MenuItem key={"none"} value={undefined}>
                                {"None"}
                              </MenuItem>
                            </TextField>
                            <br></br>

                            <TextField size="small"
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
                              <MenuItem key={"none"} value={undefined}>
                                {"None"}
                              </MenuItem>
                            </TextField>

                            <br></br>
                            <TextField size="small"
                              fullWidth
                              autoComplete={false}
                              id="fullWidth"
                              // required
                              label="Product Title"
                              type="text"
                              variant="outlined"
                              name="product_title"
                              value={changeData.product_title}
                              onChange={handleProductFelids}
                            />

                            <br></br>
                            <TextField size="small"
                              fullWidth
                              // required
                              autoComplete={false}
                              id="fullWidth"
                              label="SEO Title"
                              type="text"
                              variant="outlined"
                              name="seo_title"
                              value={changeData.seo_title}
                              onChange={handleProductFelids}
                            />

                            <br></br>
                            <TextField size="small"
                              fullWidth
                              // required
                              autoComplete={false}
                              id="fullWidth"
                              label="SEO Description"
                              type="text"
                              variant="outlined"
                              name="seo_description"
                              value={changeData.seo_description}
                              onChange={handleProductFelids}
                            />
                            <br></br>
                            <TextField size="small"
                              fullWidth
                              // required
                              autoComplete={false}
                              id="fullWidth"
                              label="SEO Keyword"
                              type="text"
                              variant="outlined"
                              name="seo_keyword"
                              value={changeData.seo_keyword}
                              onChange={handleProductFelids}
                            />

                            <br></br>
                            <TextField size="small"
                              fullWidth
                              autoComplete={false}
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

                            <br></br>
                            <TextField size="small"
                              fullWidth
                              autoComplete={false}
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
                            />

                            <br></br>
                            <TextField size="small"
                              fullWidth
                              // required
                              autoComplete={false}
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

                            <br></br>
                            <TextField size="small"
                              fullWidth
                              disabled
                              autoComplete={false}
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
                                changeData.MRP > 0 &&
                                  changeData.discount_limit > 0
                                  ? (changeData.selling_price =
                                    changeData.MRP -
                                    (changeData.MRP / 100) *
                                    changeData.discount_limit)
                                  : 0
                              }
                              onChange={handleProductFelids}
                              variant="outlined"
                              name="selling_price"
                            />

                            <br></br>
                            <TextField size="small"
                              fullWidth
                              autoComplete={false}
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

                            <br></br>
                            <TextField size="small"
                              fullWidth
                              autoComplete={false}
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

                            <br></br>
                            <TextField size="small"
                              fullWidth
                              autoComplete={false}
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

                            <br></br>

                            <TextField size="small"
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
                              <MenuItem key={"none"} value={undefined}>
                                {"None"}
                              </MenuItem>
                            </TextField>


                            <br></br>
                            <InputLabel id="demo-multiple-checkbox-label">Primary Material</InputLabel>
                            <Select
                              multiple
                              fullWidth
                              value={changeData.primary_material}
                              name="primary_material"
                              onChange={handleProductFelids}
                              renderValue={(selected) => selected.join(', ')}
                            // MenuProps={MenuProps}
                            >
                              {materialCatalog.map((option) => (
                                <MenuItem key={option._id} value={option.primaryMaterial_name}>
                                  <Checkbox checked={changeData.primary_material.indexOf(option.primaryMaterial_name) > -1} />
                                  <ListItemText primary={option.primaryMaterial_name} />
                                </MenuItem>
                              ))}
                            </Select>

                            {/* <br></br>

                            <TextField size="small"
                              fullWidth
                              // required
                              id="outlined-select"
                              select
                              name="primary_material"
                              label="Primary Material"
                              multiple
                              value={changeData.primary_material}
                              onChange={handleProductFelids}
                              helperText="Please select your Material ."
                            >
                              {materialCatalog.map(
                                (option) =>
                                  option.primaryMaterial_status && (
                                    <MenuItem
                                      key={option._id}
                                      value={option._id}
                                    >
                                      {option.primaryMaterial_name}
                                    </MenuItem>
                                  )
                              )}
                              <MenuItem key={"none"} value={undefined}>
                                {"None"}
                              </MenuItem>
                            </TextField>
 */}
                            <br></br>
                            <TextField size="small"
                              fullWidth
                              autoComplete={false}
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


                            <br></br>

                            <TextField size="small"
                              fullWidth
                              id="outlined-select"
                              select
                              name="range"
                              label="Range"
                              multiple
                              value={changeData.range || ''}
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
                              <MenuItem key={"none"} value={undefined}>
                                {"None"}
                              </MenuItem>
                            </TextField>


                            {/* <br></br>

                            <TextField size="small"
                              fullWidth
                              id="outlined-select"
                              select
                              name="secondary_material"
                              label="Secondary Material"
                              value={secMaterial || ""}
                              multiple
                              onChange={handleChangeSecMaterial}
                              helperText="Please select your Material ."
                            >
                              {secMaterialCatalog.map(
                                (option) =>
                                  option.secondaryMaterial_status && (
                                    <MenuItem
                                      key={option.value}
                                      value={option._id}
                                    >
                                      {option.secondaryMaterial_name}
                                    </MenuItem>
                                  )
                              )}
                              <MenuItem key={"none"} value={undefined}>
                                {"None"}
                              </MenuItem>
                            </TextField>

                            {secMaterial && (
                              <>
                                <br></br>
                                <TextField size="small"
                                  fullWidth
                                  autoComplete={false}
                                  id="fullWidth"
                                  label="Secondary Material Weight"
                                  type="number"
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        Kg
                                      </InputAdornment>
                                    ),
                                  }}
                                  variant="outlined"
                                  name="secondary_material_weight"
                                />
                              </>
                            )} */}
                          </Box>{" "}
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
                        <StepLabel>Images</StepLabel>
                        <StepContent className="stepContent">
                          <Box className="fields">
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
                          </Box>{" "}
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
                      {/* Images End */}

                      {/* Inventory & Shipping */}
                      <Step>
                        <StepLabel>Inventory & Shipping</StepLabel>
                        <StepContent className="stepContent">
                          <Box className="fields">

                            <br />

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

                            {
                              changeData.returnable && <>

                                <Typography variant='Caption' > Return in {changeData.returnDays} Days</Typography>
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
                            }

                            <br></br>

                            <Typography variant='Caption' > Dispatch in {changeData.dispatch_time} Days</Typography>

                            <Slider
                              aria-label="Construction Days"
                              defaultValue={0}
                              size="small"
                              valueLabelDisplay="auto"
                              name="dispatch_time"
                              value={changeData.dispatch_time}
                              onChange={handleProductFelids}
                              helperText="Please select your dispatch time"

                            />



                            {/* <TextField size="small"
                              fullWidth
                              // required
                              id="outlined-select"
                              select
                              name="dispatch_time"
                              label="Dispatch Time"
                              value={changeData.dispatch_time}
                              onChange={handleProductFelids}
                              multiple
                              helperText="Please select your dispatch time"
                            >
                              {dispatchTimeCatalog.map((option) => (
                                <MenuItem
                                  key={option.value}
                                  value={option.value}
                                >
                                  {option.label}
                                </MenuItem>
                              ))}
                              <MenuItem key={"none"} value={undefined}>
                                {"None"}
                              </MenuItem>
                            </TextField> */}
                          </Box>{" "}
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
                      {/* Features */}
                      <Step>
                        <StepLabel>Features</StepLabel>
                        <StepContent className="stepContent">
                          <Box className="fields">
                            <br></br>

                            {/* {Features} */}

                            <FormGroup>
                              <FormLabel id="demo-radio-buttons-group-label">
                                Features
                              </FormLabel>
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
                                    checked={changeData.lean_back}
                                    onChange={handleProductFelids}
                                    name="lean_back"
                                  />
                                }
                                label="Lean Back"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={changeData.straight_back}
                                    onChange={handleProductFelids}
                                    name="straight_back"
                                  />
                                }
                                label="Straight Back"
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
                            </FormGroup>
                          </Box>{" "}
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
                      {/* Features ends */}
                      {/* Miscellaneous */}
                      <Step>
                        <StepLabel>Miscellaneous</StepLabel>
                        <StepContent className="stepContent">
                          <Box className="fields">
                            <br></br>

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
                              <TextField size="small"
                                fullWidth
                                autoComplete={false}
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

                            <br></br>

                            <FormControl>
                              <FormLabel id="demo-radio-buttons-group-label">
                                Textile
                              </FormLabel>
                              <RadioGroup
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

                            <br></br>
                            {changeData.textile === 'yes' &&
                              <TextField size="small"
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
                                <MenuItem key={"none"} value={undefined}>
                                  {"None"}
                                </MenuItem>
                              </TextField>}

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

                            <br></br>
                            {(changeData.drawer === 'mechanical' || changeData.drawer === 'wooden') &&
                              <TextField size="small"
                                fullWidth
                                type='number'
                                id="outlined-select"
                                name="drawer_count"
                                label="Drawer Count"
                                value={changeData.drawer_count}
                                onChange={handleProductFelids}
                              />}
                            <br></br>

                            <TextField size="small"
                              fullWidth
                              id="outlined-select"
                              select
                              name="polish"
                              label="Polish"
                              value={changeData.polish}
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
                              <MenuItem key={"none"} value={undefined}>
                                {"None"}
                              </MenuItem>
                            </TextField>

                            <br></br>

                            <TextField size="small"
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
                              {hingeCatalog.map(
                                (option) =>
                                  option.hinge_status && (
                                    <MenuItem
                                      key={option.value}
                                      value={option._id}
                                    >
                                      {option.hinge_name}
                                    </MenuItem>
                                  )
                              )}
                              <MenuItem key={"none"} value={undefined}>
                                {"None"}
                              </MenuItem>
                            </TextField>

                            <br></br>

                            <TextField size="small"
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
                              {knobCatalog.map(
                                (option) =>
                                  option.knob_status && (
                                    <MenuItem
                                      key={option.value}
                                      value={option._id}
                                    >
                                      {option.knob_name}
                                    </MenuItem>
                                  )
                              )}
                              <MenuItem key={"none"} value={undefined}>
                                {"None"}
                              </MenuItem>
                            </TextField>

                            <br></br>

                            <TextField size="small"
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
                              {doorCatalog.map(
                                (option) =>
                                  option.door_status && (
                                    <MenuItem
                                      key={option.value}
                                      value={option._id}
                                    >
                                      {option.door_name}
                                    </MenuItem>
                                  )
                              )}
                              <MenuItem key={"none"} value={undefined}>
                                {"None"}
                              </MenuItem>
                            </TextField>

                            <br></br>

                            <TextField size="small"
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
                              {handleCatalog.map(
                                (option) =>
                                  option.handle_status && (
                                    <MenuItem
                                      key={option.value}
                                      value={option._id}
                                    >
                                      {option.handle_name}
                                    </MenuItem>
                                  )
                              )}
                              <MenuItem key={"none"} value={undefined}>
                                {"None"}
                              </MenuItem>
                            </TextField>

                            <br></br>

                            <TextField size="small"
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
                              <MenuItem key={"none"} value={undefined}>
                                {"None"}
                              </MenuItem>
                            </TextField>

                            <br></br>

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
                                <br></br>
                                <TextField size="small"
                                  fullWidth
                                  // required
                                  autoComplete={false}
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
                                  value={changeData.assembly_part}
                                  onChange={handleProductFelids}
                                />
                              </>
                            )}
                            {changeData.assembly_required === "yes" && (
                              <>
                                <br></br>
                                <TextField size="small"
                                  fullWidth
                                  // required
                                  id="outlined-select"
                                  select
                                  name="legs"
                                  label="Table Legs"
                                  value={changeData.legs}
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
                                  <MenuItem key={"none"} value={undefined}>
                                    {"None"}
                                  </MenuItem>
                                </TextField>
                              </>
                            )}

                            <br></br>

                            <TextField size="small"
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
                              {fittingCatalog.map(
                                (option) =>
                                  option.fitting_status && (
                                    <MenuItem
                                      key={option.value}
                                      value={option._id}
                                    >
                                      {option.fitting_name}
                                    </MenuItem>
                                  )
                              )}
                              <MenuItem key={"none"} value={undefined}>
                                {"None"}
                              </MenuItem>
                            </TextField>

                            <br></br>

                            {/* product description  */}


                            <FormLabel id="demo-radio-buttons-group-label">
                              Product Description
                            </FormLabel>

                            <Editor
                              apiKey="nrxcqobhboeugucjonpg61xo1m65hn8qjxwayuhvqfjzb6j4"
                              onInit={(event, editor) =>
                                (editorRef.current = editor)
                              }
                              init={{
                                height: 300,
                                menubar: true,
                              }}
                            />

                            {/* selling points  */}

                            <br></br>
                            <FormLabel id="demo-radio-buttons-group-label">
                              Selling Points{" "}
                            </FormLabel>

                            <Editor
                              apiKey="nrxcqobhboeugucjonpg61xo1m65hn8qjxwayuhvqfjzb6j4"
                              onInit={(event, editor) =>
                                (sellingRef.current = editor)
                              }
                              init={{
                                height: 400,
                                menubar: true,
                              }}
                            />



                            <br></br>

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

                            {changeData.mirror === 'yes' && (
                              <>
                                <br></br>
                                <TextField size="small"
                                  fullWidth
                                  autoComplete={false}
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

                                <br></br>
                                <TextField size="small"
                                  fullWidth
                                  autoComplete={false}
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

                            <br></br>

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

                            <br></br>

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

                              {changeData.upholstery === "yes" && (
                                <>
                                  <br></br>
                                  <TextField size="small"
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
                                    <MenuItem key={"none"} value={undefined}>
                                      {"None"}
                                    </MenuItem>
                                  </TextField>{" "}
                                </>
                              )}
                            </FormControl>


                            <br></br>
                            <TextField size="small"
                              fullWidth
                              autoComplete={false}
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

                            <br></br>
                            <TextField size="small"
                              fullWidth
                              autoComplete={false}
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

                            <br></br>
                            <TextField size="small"
                              fullWidth
                              autoComplete={false}
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

                            <br></br>

                            <FormControl>
                              <FormLabel id="demo-radio-buttons-group-label">
                                Wheel
                              </FormLabel>
                              <RadioGroup
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

                            <br></br>

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
                                <br></br>
                                <TextField size="small"
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

                            <br></br>
                            <TextField size="small"
                              fullWidth
                              autoComplete={false}
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

                            <br></br>
                            <TextField size="small"
                              fullWidth
                              autoComplete={false}
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
<br></br>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={changeData.show_on_mobile}
                                    onChange={handleProductFelids}
                                    name="show_on_mobile"
                                    helperText="Check it if want it on mobile."

                                  />
                                }
                                label="Show On Mobile"
                              />
                          </Box>{" "}
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
                      {/* Miscellaneous ends */}
                    </Stepper>

                    <br></br>

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

            {SideBox.open.formType === "update_product" && (
              <Grid container p={5} className="productPadding">

                <Grid item xs={12}>
                  <Typography variant="h5">
                    Update Product
                    <Typography
                      sx={{ display: "block !important" }}
                      variant="caption"
                    >
                      Add your product and necessary information from
                      here
                    </Typography>
                  </Typography>
                </Grid>

                <Grid item xs={12} mt={5}>
                  <form
                    className="form"
                    id="myForm"
                    onSubmit={handleUpdateProduct}
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
                            <TextField size="small"
                              fullWidth
                              autoComplete={false}
                              id="fullWidth"
                              label="SKU"
                              type="text"
                              value={changeData.SKU}
                              disabled
                              variant="outlined"
                              name="SKU"
                            />

                            <br></br>

                            <TextField size="small"
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
                              <MenuItem key={"none"} value={undefined}>
                                {"None"}
                              </MenuItem>
                            </TextField>
                            <br></br>

                            <TextField size="small"
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
                              <MenuItem key={"none"} value={undefined}>
                                {"None"}
                              </MenuItem>
                            </TextField>

                            <br></br>
                            <TextField size="small"
                              fullWidth
                              autoComplete={false}
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

                            <br></br>
                            <TextField size="small"
                              fullWidth
                              autoComplete={false}
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

                            <br></br>
                            <TextField size="small"
                              fullWidth
                              autoComplete={false}
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

                            <br></br>
                            <TextField size="small"
                              fullWidth
                              autoComplete={false}
                              id="fullWidth"
                              // required
                              label="Product Title"
                              type="text"
                              variant="outlined"
                              name="product_title"
                              value={changeData.product_title}
                              onChange={handleProductFelids}
                            />

                            <br></br>
                            <TextField size="small"
                              fullWidth
                              // required
                              autoComplete={false}
                              id="fullWidth"
                              label="SEO Title"
                              type="text"
                              variant="outlined"
                              name="seo_title"
                              value={changeData.seo_title}
                              onChange={handleProductFelids}
                            />

                            <br></br>
                            <TextField size="small"
                              fullWidth
                              // required
                              autoComplete={false}
                              id="fullWidth"
                              label="SEO Description"
                              type="text"
                              variant="outlined"
                              name="seo_description"
                              value={changeData.seo_description}
                              onChange={handleProductFelids}
                            />
                            <br></br>
                            <TextField size="small"
                              fullWidth
                              // required
                              autoComplete={false}
                              id="fullWidth"
                              label="SEO Keyword"
                              type="text"
                              variant="outlined"
                              name="seo_keyword"
                              value={changeData.seo_keyword}
                              onChange={handleProductFelids}
                            />
                            <br></br>
                            <TextField size="small"
                              fullWidth
                              autoComplete={false}
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

                            <br></br>
                            <TextField size="small"
                              fullWidth
                              autoComplete={false}
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

                            <br></br>
                            <TextField size="small"
                              fullWidth
                              autoComplete={false}
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
                            />

                            <br></br>
                            <TextField size="small"
                              fullWidth
                              // required
                              autoComplete={false}
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

                            <br></br>
                            <TextField size="small"
                              fullWidth
                              disabled
                              autoComplete={false}
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
                                changeData.MRP > 0 &&
                                  changeData.discount_limit > 0
                                  ? (changeData.selling_price =
                                    changeData.MRP -
                                    (changeData.MRP / 100) *
                                    changeData.discount_limit)
                                  : 0
                              }
                              onChange={handleProductFelids}
                              variant="outlined"
                              name="selling_price"
                            />
                            <br></br>

                            <TextField size="small"
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
                              <MenuItem key={"none"} value={undefined}>
                                {"None"}
                              </MenuItem>
                            </TextField>

                            <br></br>
                            <InputLabel id="demo-multiple-checkbox-label">Primary Material</InputLabel>
                            <Select
                              multiple
                              fullWidth
                              value={changeData.primary_material}
                              name="primary_material"
                              onChange={handleProductFelids}
                              renderValue={(selected) => selected.join(', ')}
                            // MenuProps={MenuProps}
                            >
                              {materialCatalog.map((option) => (
                                <MenuItem key={option._id} value={option.primaryMaterial_name}>
                                  <Checkbox checked={changeData.primary_material.indexOf(option.primaryMaterial_name) > -1} />
                                  <ListItemText primary={option.primaryMaterial_name} />
                                </MenuItem>
                              ))}
                            </Select>


                            <br></br>

                            <TextField size="small"
                              fullWidth
                              id="outlined-select"
                              select
                              name="range"
                              label="Range"
                              multiple
                              value={changeData.range || ''}
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
                              <MenuItem key={"none"} value={undefined}>
                                {"None"}
                              </MenuItem>
                            </TextField>


                            {/* <br></br>

                            <TextField size="small"
                              fullWidth
                              // required
                              id="outlined-select"
                              select
                              name="primary_material"
                              label="Primary Material"
                              multiple
                              value={changeData.primary_material}
                              onChange={handleProductFelids}
                              helperText="Please select your Material ."
                            >
                              {materialCatalog.map(
                                (option) =>
                                  option.primaryMaterial_status && (
                                    <MenuItem
                                      key={option._id}
                                      value={option._id}
                                    >
                                      {option.primaryMaterial_name}
                                    </MenuItem>
                                  )
                              )}
                              <MenuItem key={"none"} value={undefined}>
                                {"None"}
                              </MenuItem>
                            </TextField>
 */}


                            {/* <br></br>

                            <TextField size="small"
                              fullWidth
                              id="outlined-select"
                              select
                              name="secondary_material"
                              label="Secondary Material"
                              value={secMaterial || ""}
                              multiple
                              onChange={handleChangeSecMaterial}
                              helperText="Please select your Material ."
                            >
                              {secMaterialCatalog.map(
                                (option) =>
                                  option.secondaryMaterial_status && (
                                    <MenuItem
                                      key={option.value}
                                      value={option._id}
                                    >
                                      {option.secondaryMaterial_name}
                                    </MenuItem>
                                  )
                              )}
                              <MenuItem key={"none"} value={undefined}>
                                {"None"}
                              </MenuItem>
                            </TextField>

                            {secMaterial && (
                              <>
                                <br></br>
                                <TextField size="small"
                                  fullWidth
                                  autoComplete={false}
                                  id="fullWidth"
                                  label="Secondary Material Weight"
                                  type="number"
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        Kg
                                      </InputAdornment>
                                    ),
                                  }}
                                  variant="outlined"
                                  name="secondary_material_weight"
                                />
                              </>
                            )} */}
                          </Box>{" "}
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
                        <StepLabel>Images</StepLabel>
                        <StepContent className="stepContent">
                          <Box className="fields">
                            {/* <AcceptMaxFiles className="dorpContainer"/> */}


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
                          </Box>{" "}
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
                      {/* Images End */}

                      {/* Inventory & Shipping */}
                      <Step>
                        <StepLabel>Inventory & Shipping</StepLabel>
                        <StepContent className="stepContent">
                          <Box className="fields">

                            <br />

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

                            {
                              changeData.returnable && <>

                                <Typography variant='Caption' > Return in {changeData.returnDays} Days</Typography>
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
                            }

                            <br></br>

                            <Typography variant='Caption' > Dispatch in {changeData.dispatch_time} Days</Typography>

                            <Slider
                              aria-label="Construction Days"
                              defaultValue={0}
                              size="small"
                              valueLabelDisplay="auto"
                              name="dispatch_time"
                              value={changeData.dispatch_time}
                              onChange={handleProductFelids}
                              helperText="Please select your dispatch time"

                            />



                            {/* <TextField size="small"
                              fullWidth
                              // required
                              id="outlined-select"
                              select
                              name="dispatch_time"
                              label="Dispatch Time"
                              value={changeData.dispatch_time}
                              onChange={handleProductFelids}
                              multiple
                              helperText="Please select your dispatch time"
                            >
                              {dispatchTimeCatalog.map((option) => (
                                <MenuItem
                                  key={option.value}
                                  value={option.value}
                                >
                                  {option.label}
                                </MenuItem>
                              ))}
                              <MenuItem key={"none"} value={undefined}>
                                {"None"}
                              </MenuItem>
                            </TextField> */}
                          </Box>{" "}
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
                      {/* Features */}
                      <Step>
                        <StepLabel>Features</StepLabel>
                        <StepContent className="stepContent">
                          <Box className="fields">
                            <br></br>

                            {/* {Features} */}

                            <FormGroup>
                              <FormLabel id="demo-radio-buttons-group-label">
                                Features
                              </FormLabel>
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
                                    checked={changeData.lean_back}
                                    onChange={handleProductFelids}
                                    name="lean_back"
                                  />
                                }
                                label="Lean Back"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={changeData.straight_back}
                                    onChange={handleProductFelids}
                                    name="straight_back"
                                  />
                                }
                                label="Straight Back"
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
                            </FormGroup>
                          </Box>{" "}
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
                      {/* Features ends */}
                      {/* Miscellaneous */}
                      <Step>
                        <StepLabel>Miscellaneous</StepLabel>
                        <StepContent className="stepContent">
                          <Box className="fields">
                            <br></br>

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
                              <TextField size="small"
                                fullWidth
                                autoComplete={false}
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

                            <br></br>

                            <FormControl>
                              <FormLabel id="demo-radio-buttons-group-label">
                                Textile
                              </FormLabel>
                              <RadioGroup
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

                            <br></br>
                            {changeData.textile === 'yes' &&
                              <TextField size="small"
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
                                <MenuItem key={"none"} value={undefined}>
                                  {"None"}
                                </MenuItem>
                              </TextField>}

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

                            <br></br>
                            {(changeData.drawer === 'mechanical' || changeData.drawer === 'wooden') &&
                              <TextField size="small"
                                fullWidth
                                type='number'
                                id="outlined-select"
                                name="drawer_count"
                                label="Drawer Count"
                                value={changeData.drawer_count}
                                onChange={handleProductFelids}
                              />}
                            <br></br>

                            <TextField size="small"
                              fullWidth
                              id="outlined-select"
                              select
                              name="polish"
                              label="Polish"
                              value={changeData.polish || ''}
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
                              <MenuItem key={"none"} value={undefined}>
                                {"None"}
                              </MenuItem>
                            </TextField>

                            <br></br>

                            <TextField size="small"
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
                              {hingeCatalog.map(
                                (option) =>
                                  option.hinge_status && (
                                    <MenuItem
                                      key={option.value}
                                      value={option._id}
                                    >
                                      {option.hinge_name}
                                    </MenuItem>
                                  )
                              )}
                              <MenuItem key={"none"} value={undefined}>
                                {"None"}
                              </MenuItem>
                            </TextField>

                            <br></br>

                            <TextField size="small"
                              fullWidth
                              id="outlined-select"
                              select
                              name="knob"
                              label="Knob"
                              multiple
                              value={changeData.knob || ''}
                              onChange={handleProductFelids}
                              helperText="Please select your koon ."
                            >
                              {knobCatalog.map(
                                (option) =>
                                  option.knob_status && (
                                    <MenuItem
                                      key={option.value}
                                      value={option._id}
                                    >
                                      {option.knob_name}
                                    </MenuItem>
                                  )
                              )}
                              <MenuItem key={"none"} value={undefined}>
                                {"None"}
                              </MenuItem>
                            </TextField>

                            <br></br>

                            <TextField size="small"
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
                              {doorCatalog.map(
                                (option) =>
                                  option.door_status && (
                                    <MenuItem
                                      key={option.value}
                                      value={option._id}
                                    >
                                      {option.door_name}
                                    </MenuItem>
                                  )
                              )}
                              <MenuItem key={"none"} value={undefined}>
                                {"None"}
                              </MenuItem>
                            </TextField>

                            <br></br>

                            <TextField size="small"
                              fullWidth
                              id="outlined-select"
                              select
                              name="handle"
                              label="Handle"
                              multiple
                              value={changeData.handle || ''}
                              onChange={handleProductFelids}
                              helperText="Please select your fitting."
                            >
                              {handleCatalog.map(
                                (option) =>
                                  option.handle_status && (
                                    <MenuItem
                                      key={option.value}
                                      value={option._id}
                                    >
                                      {option.handle_name}
                                    </MenuItem>
                                  )
                              )}
                              <MenuItem key={"none"} value={undefined}>
                                {"None"}
                              </MenuItem>
                            </TextField>

                            <br></br>

                            <TextField size="small"
                              fullWidth
                              id="outlined-select"
                              select
                              name="weight_capacity"
                              label="Weight Capacity"
                              multiple
                              value={changeData.weight_capacity || ''}
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
                              <MenuItem key={"none"} value={undefined}>
                                {"None"}
                              </MenuItem>
                            </TextField>

                            <br></br>

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
                                <br></br>
                                <TextField size="small"
                                  fullWidth
                                  // required
                                  autoComplete={false}
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
                                  value={changeData.assembly_part}
                                  onChange={handleProductFelids}
                                />
                              </>
                            )}
                            {changeData.assembly_required === "yes" && (
                              <>
                                <br></br>
                                <TextField size="small"
                                  fullWidth
                                  // required
                                  id="outlined-select"
                                  select
                                  name="legs"
                                  label="Table Legs"
                                  value={changeData.legs}
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
                                  <MenuItem key={"none"} value={undefined}>
                                    {"None"}
                                  </MenuItem>
                                </TextField>
                              </>
                            )}

                            <br></br>

                            <TextField size="small"
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
                              {fittingCatalog.map(
                                (option) =>
                                  option.fitting_status && (
                                    <MenuItem
                                      key={option.value}
                                      value={option._id}
                                    >
                                      {option.fitting_name}
                                    </MenuItem>
                                  )
                              )}
                              <MenuItem key={"none"} value={undefined}>
                                {"None"}
                              </MenuItem>
                            </TextField>

                            <br></br>
                            <FormLabel id="demo-radio-buttons-group-label">
                              Product Description
                            </FormLabel>

                            {/* product description  */}
                            <Editor
                              apiKey="nrxcqobhboeugucjonpg61xo1m65hn8qjxwayuhvqfjzb6j4"
                              onInit={(event, editor) =>
                                (editorRef.current = editor)
                              }
                              init={{
                                height: 300,
                                menubar: true,
                              }}
                            />

                            {/* selling points  */}

                            <br></br>
                            <FormLabel id="demo-radio-buttons-group-label">
                              Selling Points{" "}
                            </FormLabel>

                            <Editor
                              apiKey="nrxcqobhboeugucjonpg61xo1m65hn8qjxwayuhvqfjzb6j4"
                              onInit={(event, editor) =>
                                (sellingRef.current = editor)
                              }
                              init={{
                                height: 400,
                                menubar: true,
                              }}
                            />



                            <br></br>

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

                            {changeData.mirror === 'yes' && (
                              <>
                                <br></br>
                                <TextField size="small"
                                  fullWidth
                                  autoComplete={false}
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

                                <br></br>
                                <TextField size="small"
                                  fullWidth
                                  autoComplete={false}
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

                            <br></br>

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

                            <br></br>

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

                              {changeData.upholstery === "yes" && (
                                <>
                                  <br></br>
                                  <TextField size="small"
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
                                    <MenuItem key={"none"} value={undefined}>
                                      {"None"}
                                    </MenuItem>
                                  </TextField>{" "}
                                </>
                              )}
                            </FormControl>


                            <br></br>
                            <TextField size="small"
                              fullWidth
                              autoComplete={false}
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

                            <br></br>
                            <TextField size="small"
                              fullWidth
                              autoComplete={false}
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

                            <br></br>
                            <TextField size="small"
                              fullWidth
                              autoComplete={false}
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

                            <br></br>

                            <FormControl>
                              <FormLabel id="demo-radio-buttons-group-label">
                                Wheel
                              </FormLabel>
                              <RadioGroup
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

                            <br></br>

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
                                <br></br>
                                <TextField size="small"
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

                            <br></br>
                            <TextField size="small"
                              fullWidth
                              autoComplete={false}
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

                            <br></br>
                            <TextField size="small"
                              fullWidth
                              autoComplete={false}
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
<br></br>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={changeData.show_on_mobile}
                                    onChange={handleProductFelids}
                                    name="show_on_mobile"
                                    helperText="Check it if want it on mobile."

                                  />
                                }
                                label="Show On Mobile"
                              />
                          </Box>{" "}
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
                      {/* Miscellaneous ends */}
                    </Stepper>

                    <br></br>

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


            {/* merge Products */}

            {SideBox.open.formType === "merge_product" && (
              <Grid container p={5} className="productPadding">

                <Grid item xs={12}>
                  <Typography variant="h5">
                    Merge Product
                    <Typography
                      sx={{ display: "block !important" }}
                      variant="caption"
                    >
                      Merge your products and necessary information from
                      here
                    </Typography>
                  </Typography>
                </Grid>

                <Grid item xs={12} mt={5}>
                  <form
                    className="form"
                    id="myForm"
                    onSubmit={handleMergeProduct}
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
                            <TextField size="small"
                              fullWidth
                              autoComplete={false}
                              id="fullWidth"
                              // // required
                              label="SKU"
                              type="text"
                              value={SKU}
                              disabled
                              variant="outlined"
                              name="SKU"
                            />
                            <br></br>
                            <TextField size="small"
                              fullWidth
                              autoComplete={false}
                              id="fullWidth"
                              label="Merging SKUs"
                              type="text"
                              value={changeData.productArray}
                              disabled
                              variant="outlined"
                              name="productArray"
                            />

                            <br></br>

                            <TextField size="small"
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
                              <MenuItem key={"none"} value={undefined}>
                                {"None"}
                              </MenuItem>
                            </TextField>
                            <br></br>

                            <TextField size="small"
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
                              <MenuItem key={"none"} value={undefined}>
                                {"None"}
                              </MenuItem>
                            </TextField>

                          </Box>{" "}
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
                        <StepLabel>Images</StepLabel>
                        <StepContent className="stepContent">
                          <Box className="fields">
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
                          </Box>{" "}
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
                      {/* Images End */}

                      {/* Inventory & Shipping */}
                      <Step>
                        <StepLabel>Inventory & Shipping</StepLabel>
                        <StepContent className="stepContent">
                          <Box className="fields">

                            <br />

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

                            {
                              changeData.returnable && <>

                                <Typography variant='Caption' > Return in {changeData.returnDays} Days</Typography>
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
                            }

                            <br></br>

                            <Typography variant='Caption' > Dispatch in {changeData.dispatch_time} Days</Typography>

                            <Slider
                              aria-label="Construction Days"
                              defaultValue={0}
                              size="small"
                              valueLabelDisplay="auto"
                              name="dispatch_time"
                              value={changeData.dispatch_time}
                              onChange={handleProductFelids}
                              helperText="Please select your dispatch time"

                            />



                            {/* <TextField size="small"
                              fullWidth
                              // required
                              id="outlined-select"
                              select
                              name="dispatch_time"
                              label="Dispatch Time"
                              value={changeData.dispatch_time}
                              onChange={handleProductFelids}
                              multiple
                              helperText="Please select your dispatch time"
                            >
                              {dispatchTimeCatalog.map((option) => (
                                <MenuItem
                                  key={option.value}
                                  value={option.value}
                                >
                                  {option.label}
                                </MenuItem>
                              ))}
                              <MenuItem key={"none"} value={undefined}>
                                {"None"}
                              </MenuItem>
                            </TextField> */}
                          </Box>{" "}
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
                      {/* Features */}
                      <Step>
                        <StepLabel>Features</StepLabel>
                        <StepContent className="stepContent">
                          <Box className="fields">
                            <br></br>

                            {/* {Features} */}

                            <FormGroup>
                              <FormLabel id="demo-radio-buttons-group-label">
                                Features
                              </FormLabel>
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
                                    checked={changeData.lean_back}
                                    onChange={handleProductFelids}
                                    name="lean_back"
                                  />
                                }
                                label="Lean Back"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={changeData.straight_back}
                                    onChange={handleProductFelids}
                                    name="straight_back"
                                  />
                                }
                                label="Straight Back"
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
                            </FormGroup>
                          </Box>{" "}
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
                      {/* Features ends */}
                      {/* Miscellaneous */}
                      <Step>
                        <StepLabel>Miscellaneous</StepLabel>
                        <StepContent className="stepContent">
                          <Box className="fields">


                            {/* selling points  */}

                            <br></br>
                            <FormLabel id="demo-radio-buttons-group-label">
                              Selling Points{" "}
                            </FormLabel>

                            <Editor
                              apiKey="nrxcqobhboeugucjonpg61xo1m65hn8qjxwayuhvqfjzb6j4"
                              onInit={(event, editor) =>
                                (sellingRef.current = editor)
                              }
                              init={{
                                height: 400,
                                menubar: true,
                              }}
                            />

                            <br></br>
                            <TextField size="small"
                              fullWidth
                              autoComplete={false}
                              id="fullWidth"
                              // required
                              label="Product Title"
                              type="text"
                              variant="outlined"
                              name="product_title"
                              value={changeData.product_title}
                              onChange={handleProductFelids}
                            />

                            <br></br>
                            <TextField size="small"
                              fullWidth
                              // required
                              autoComplete={false}
                              id="fullWidth"
                              label="SEO Title"
                              type="text"
                              variant="outlined"
                              name="seo_title"
                              value={changeData.seo_title}
                              onChange={handleProductFelids}
                            />

                            <br></br>
                            <TextField size="small"
                              fullWidth
                              // required
                              autoComplete={false}
                              id="fullWidth"
                              label="SEO Description"
                              type="text"
                              variant="outlined"
                              name="seo_description"
                              value={changeData.seo_description}
                              onChange={handleProductFelids}
                            />
                            <br></br>
                            <TextField size="small"
                              fullWidth
                              // required
                              autoComplete={false}
                              id="fullWidth"
                              label="SEO Keyword"
                              type="text"
                              variant="outlined"
                              name="seo_keyword"
                              value={changeData.seo_keyword}
                              onChange={handleProductFelids}
                            />

                            <br></br>
                            <FormLabel id="demo-radio-buttons-group-label">
                              Product Description
                            </FormLabel>

                            {/* product description  */}
                            <Editor
                              apiKey="nrxcqobhboeugucjonpg61xo1m65hn8qjxwayuhvqfjzb6j4"
                              onInit={(event, editor) =>
                                (editorRef.current = editor)
                              }
                              init={{
                                height: 300,
                                menubar: true,
                              }}
                            />

                            <br></br>
                            <TextField size="small"
                              fullWidth
                              autoComplete={false}
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

                            <br></br>
                            <TextField size="small"
                              fullWidth
                              autoComplete={false}
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
                            />

                            <br></br>
                            <TextField size="small"
                              fullWidth
                              // required
                              autoComplete={false}
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

                            <br></br>
                            <TextField size="small"
                              fullWidth
                              disabled
                              autoComplete={false}
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
                                changeData.MRP > 0 &&
                                  changeData.discount_limit > 0
                                  ? (changeData.selling_price =
                                    changeData.MRP -
                                    (changeData.MRP / 100) *
                                    changeData.discount_limit)
                                  : 0
                              }
                              onChange={handleProductFelids}
                              variant="outlined"
                              name="selling_price"
                            />

                            <br></br>

                            <TextField size="small"
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
                              <MenuItem key={"none"} value={undefined}>
                                {"None"}
                              </MenuItem>
                            </TextField>
                          </Box>{" "}
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
                      {/* Miscellaneous ends */}
                    </Stepper>

                    <br></br>

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

            {SideBox.open.formType === "update_merge" && (
              <Grid container p={5} className="productPadding">

                <Grid item xs={12}>
                  <Typography variant="h5">
                    Update Merge Product
                    <Typography
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
                    onSubmit={handleUpdateMergeProduct}
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
                            <TextField size="small"
                              fullWidth
                              autoComplete={false}
                              id="fullWidth"
                              label="SKU"
                              type="text"
                              value={changeData.SKU}
                              disabled
                              variant="outlined"
                              name="SKU"
                            />
                            <br></br>

                            <InputLabel id="demo-multiple-checkbox-label">Merging Product</InputLabel>
                            <Select
                              multiple
                              fullWidth
                              value={changeData.product_array}
                              name="product_array"
                              onChange={handleProductFelids}
                              renderValue={(selected) => selected.join(', ')}
                            >
                              {SKUCatalog.map((option) => (
                                <MenuItem key={option._id} value={option.SKU}>
                                  <Checkbox checked={changeData.product_array.indexOf(option.SKU) > -1} />
                                  <ListItemText primary={option.SKU} />
                                </MenuItem>
                              ))}
                            </Select>


                            <br></br>

                            <TextField size="small"
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
                              <MenuItem key={"none"} value={undefined}>
                                {"None"}
                              </MenuItem>
                            </TextField>
                            <br></br>

                            <TextField size="small"
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
                              <MenuItem key={"none"} value={undefined}>
                                {"None"}
                              </MenuItem>
                            </TextField>

                          </Box>{" "}
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
                        <StepLabel>Images</StepLabel>
                        <StepContent className="stepContent">
                          <Box className="fields">
                            {/* <AcceptMaxFiles className="dorpContainer"/> */}



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
                          </Box>{" "}
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
                      {/* Images End */}

                      {/* Inventory & Shipping */}
                      <Step>
                        <StepLabel>Inventory & Shipping</StepLabel>
                        <StepContent className="stepContent">
                          <Box className="fields">

                            <br />

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

                            {
                              changeData.returnable && <>

                                <Typography variant='Caption' > Return in {changeData.returnDays} Days</Typography>
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
                            }

                            <br></br>

                            <Typography variant='Caption' > Dispatch in {changeData.dispatch_time} Days</Typography>

                            <Slider
                              aria-label="Construction Days"
                              defaultValue={0}
                              size="small"
                              valueLabelDisplay="auto"
                              name="dispatch_time"
                              value={changeData.dispatch_time}
                              onChange={handleProductFelids}
                              helperText="Please select your dispatch time"

                            />



                            {/* <TextField size="small"
                              fullWidth
                              // required
                              id="outlined-select"
                              select
                              name="dispatch_time"
                              label="Dispatch Time"
                              value={changeData.dispatch_time}
                              onChange={handleProductFelids}
                              multiple
                              helperText="Please select your dispatch time"
                            >
                              {dispatchTimeCatalog.map((option) => (
                                <MenuItem
                                  key={option.value}
                                  value={option.value}
                                >
                                  {option.label}
                                </MenuItem>
                              ))}
                              <MenuItem key={"none"} value={undefined}>
                                {"None"}
                              </MenuItem>
                            </TextField> */}
                          </Box>{" "}
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
                      {/* Features */}
                      <Step>
                        <StepLabel>Features</StepLabel>
                        <StepContent className="stepContent">
                          <Box className="fields">
                            <br></br>

                            {/* {Features} */}

                            <FormGroup>
                              <FormLabel id="demo-radio-buttons-group-label">
                                Features
                              </FormLabel>
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
                                    checked={changeData.lean_back}
                                    onChange={handleProductFelids}
                                    name="lean_back"
                                  />
                                }
                                label="Lean Back"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={changeData.straight_back}
                                    onChange={handleProductFelids}
                                    name="straight_back"
                                  />
                                }
                                label="Straight Back"
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
                            </FormGroup>
                          </Box>{" "}
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
                      {/* Features ends */}
                      {/* Miscellaneous */}
                      <Step>
                        <StepLabel>Miscellaneous</StepLabel>
                        <StepContent className="stepContent">
                          <Box className="fields">


                            {/* selling points  */}

                            <br></br>
                            <FormLabel id="demo-radio-buttons-group-label">
                              Selling Points{" "}
                            </FormLabel>

                            <Editor
                              apiKey="nrxcqobhboeugucjonpg61xo1m65hn8qjxwayuhvqfjzb6j4"
                              onInit={(event, editor) =>
                                (sellingRef.current = editor)
                              }
                              init={{
                                height: 400,
                                menubar: true,
                              }}
                            />

                            <br></br>
                            <TextField size="small"
                              fullWidth
                              autoComplete={false}
                              id="fullWidth"
                              // required
                              label="Product Title"
                              type="text"
                              variant="outlined"
                              name="product_title"
                              value={changeData.product_title}
                              onChange={handleProductFelids}
                            />

                            <br></br>
                            <TextField size="small"
                              fullWidth
                              // required
                              autoComplete={false}
                              id="fullWidth"
                              label="SEO Title"
                              type="text"
                              variant="outlined"
                              name="seo_title"
                              value={changeData.seo_title}
                              onChange={handleProductFelids}
                            />

                            <br></br>
                            <TextField size="small"
                              fullWidth
                              // required
                              autoComplete={false}
                              id="fullWidth"
                              label="SEO Description"
                              type="text"
                              variant="outlined"
                              name="seo_description"
                              value={changeData.seo_description}
                              onChange={handleProductFelids}
                            />
                            <br></br>
                            <TextField size="small"
                              fullWidth
                              // required
                              autoComplete={false}
                              id="fullWidth"
                              label="SEO Keyword"
                              type="text"
                              variant="outlined"
                              name="seo_keyword"
                              value={changeData.seo_keyword}
                              onChange={handleProductFelids}
                            />

                            <br></br>
                            <FormLabel id="demo-radio-buttons-group-label">
                              Product Description
                            </FormLabel>

                            {/* product description  */}
                            <Editor
                              apiKey="nrxcqobhboeugucjonpg61xo1m65hn8qjxwayuhvqfjzb6j4"
                              onInit={(event, editor) =>
                                (editorRef.current = editor)
                              }
                              init={{
                                height: 300,
                                menubar: true,
                              }}
                            />

                            <br></br>
                            <TextField size="small"
                              fullWidth
                              autoComplete={false}
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

                            <br></br>
                            <TextField size="small"
                              fullWidth
                              autoComplete={false}
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
                            />

                            <br></br>
                            <TextField size="small"
                              fullWidth
                              // required
                              autoComplete={false}
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

                            <br></br>
                            <TextField size="small"
                              fullWidth
                              disabled
                              autoComplete={false}
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
                                changeData.MRP > 0 &&
                                  changeData.discount_limit > 0
                                  ? (changeData.selling_price =
                                    changeData.MRP -
                                    (changeData.MRP / 100) *
                                    changeData.discount_limit)
                                  : 0
                              }
                              onChange={handleProductFelids}
                              variant="outlined"
                              name="selling_price"
                            />

                            <br></br>

                            <TextField size="small"
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
                              <MenuItem key={"none"} value={undefined}>
                                {"None"}
                              </MenuItem>
                            </TextField>
                          </Box>{" "}
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
                      {/* Miscellaneous ends */}
                    </Stepper>

                    <br></br>

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

            {SideBox.open.formType === "textile" && (
              <Grid container p={5}>
                <Grid item xs={12}>
                  <Typography variant="h5">
                    Add Textile
                    <Typography
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
                    onSubmit={handleTextile}
                    id="myForm"
                    enctype="multipart/form-data"
                    method="post"
                  >
                    <ImagePreviews
                      text={"Please Drag and Drop the Textile image"}
                    >
                      {" "}
                    </ImagePreviews>

                    <TextField size="small"
                      fullWidth
                      // required
                      id="outlined-select"
                      name="textile_name"
                      label="Textile"
                      type="text"
                      helperText="Please enter your textile"
                    />

                    <br></br>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox name="textile_status" />}
                        label="Status (On/Off)"
                      />
                    </FormGroup>

                    <br></br>

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

            {SideBox.open.formType === "update_textile" && (
              <Grid container p={5}>
                <Grid item xs={12}>
                  <Typography variant="h5">
                    Update Textile
                    <Typography
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
                    id="myForm"
                    onSubmit={handleUpdateTextile}
                    enctype="multipart/form-data"
                    method="post"
                  >
                    <ImagePreviews
                      text={"Please Drag and Drop the Fabric image"}
                    >
                      {" "}
                    </ImagePreviews>

                    <TextField size="small"
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

            {SideBox.open.formType === "fabric" && (
              <Grid container p={5}>
                <Grid item xs={12}>
                  <Typography variant="h5">
                    Add Fabric
                    <Typography
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
                    onSubmit={handleFabric}
                    id="myForm"
                    enctype="multipart/form-data"
                    method="post"
                  >
                    <ImagePreviews
                      text={"Please Drag and Drop the fabric image"}
                    >
                      {" "}
                    </ImagePreviews>

                    <TextField size="small"
                      fullWidth
                      // required
                      id="outlined-select"
                      name="fabric_name"
                      label="Fabric"
                      type="text"
                      helperText="Please enter your fabric"
                    />

                    <br></br>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox name="fabric_status" />}
                        label="Status (On/Off)"
                      />
                    </FormGroup>

                    <br></br>

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

            {SideBox.open.formType === "update_fabric" && (
              <Grid container p={5}>
                <Grid item xs={12}>
                  <Typography variant="h5">
                    Update Fabric
                    <Typography
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
                    onSubmit={handleUpdateFabric}
                    enctype="multipart/form-data"
                    method="post"
                  >
                    <ImagePreviews
                      text={"Please Drag and Drop the Fabric image"}
                    >
                      {" "}
                    </ImagePreviews>

                    <TextField size="small"
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

            {SideBox.open.formType === "category" && (
              <Grid container p={5}>
                <Grid item xs={12}>
                  <Typography variant="h5">
                    Add Category
                    <Typography
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
                    className="form"
                    onSubmit={handleCategory}
                    id="myForm"
                    enctype="multipart/form-data"
                    method="post"
                  >
                    <ImagePreviews
                      text={"Please Drag and Drop the Category image"}
                    >
                      {" "}
                    </ImagePreviews>

                    <TextField size="small"
                      fullWidth
                      // required
                      id="outlined-select"
                      name="category_name"
                      label="Category"
                      type="text"
                      helperText="Please enter your category"
                    />

                    <br></br>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox name="category_status" />}
                        label="Status (On/Off)"
                      />
                    </FormGroup>

                    <br></br>

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

            {SideBox.open.formType === "update_category" && (
              <Grid container p={5}>
                <Grid item xs={12}>
                  <Typography variant="h5">
                    Update Category
                    <Typography
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
                    id="myForm"
                    onSubmit={handleUpdateCategory}
                    enctype="multipart/form-data"
                    method="post"
                  >
                    <ImagePreviews
                      text={"Please Drag and Drop the Category image"}
                    >
                      {" "}
                    </ImagePreviews>

                    <TextField size="small"
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

            {SideBox.open.formType === "primaryMaterial" && (
              <Grid container p={5}>
                <Grid item xs={12}>
                  <Typography variant="h5">
                    Add Primary Material
                    <Typography
                      sx={{ display: "block !important" }}
                      variant="caption"
                    >
                      Add your Primary Material and necessary information from
                      here
                    </Typography>
                  </Typography>
                </Grid>

                <Grid item xs={12} mt={5}>
                  <form
                    className="form"
                    onSubmit={handlePrimaryMaterial}
                    id="myForm"
                    enctype="multipart/form-data"
                    method="post"
                  >
                    <ImagePreviews text={'Please Drag and Drop the Material image'}> </ImagePreviews>

                    <TextField size="small"
                      fullWidth
                      // required
                      id="outlined-select"
                      name="primaryMaterial_name"
                      label="Primary Material"
                      type="text"
                      helperText="Please enter your primary material"
                    />

                    <br></br>
                    <TextareaAutosize
                      fullWidth
                      minRows={5}
                      id="outlined-select"
                      name="primaryMaterial_description"
                      defaultValue={'Primary Material Description'}
                      type="text"
                      helperText="Please enter your primary material description"
                    />

                    <br></br>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox name="primaryMaterial_status" />}
                        label="Status (On/Off)"
                      />
                    </FormGroup>

                    <br></br>

                    <Button
                      color="primary"
                      type="submit"
                      fullWidth
                      variant="contained"
                    >
                      Add Primary Material
                    </Button>
                  </form>
                </Grid>
              </Grid>
            )}
            {/* add primaryMaterial Ends */}

            {/*  update primaryMaterial */}

            {SideBox.open.formType === "update_PrimaryMaterial" && (
              <Grid container p={5}>
                <Grid item xs={12}>
                  <Typography variant="h5">
                    Update Primary Material
                    <Typography
                      sx={{ display: "block !important" }}
                      variant="caption"
                    >
                      Update your Primary Material and necessary information
                      from here
                    </Typography>
                  </Typography>
                </Grid>

                <Grid item xs={12} mt={5}>
                  <form
                    className="form"
                    id="myForm"
                    onSubmit={handleUpdatePrimaryMaterial}
                    enctype="multipart/form-data"
                    method="post"
                  >
                    <ImagePreviews text={'Please Drag and Drop the Material image'}> </ImagePreviews>

                    <TextField size="small"
                      fullWidth
                      onChange={handleChangeData}
                      id="outlined-select"
                      name="primaryMaterial_name"
                      label="Primary Material"
                      value={changeData.priMater}
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
                    <br></br>

                    <Button
                      color="primary"
                      type="submit"
                      fullWidth
                      variant="contained"
                    >
                      Update Primary Material
                    </Button>
                  </form>
                </Grid>
              </Grid>
            )}
            {/* update primaryMaterial Ends */}

            {/*  add knob */}

            {SideBox.open.formType === "addKnob" && (
              <Grid container p={5}>
                <Grid item xs={12}>
                  <Typography variant="h5">
                    Add Knob
                    <Typography
                      sx={{ display: "block !important" }}
                      variant="caption"
                    >
                      Add your knob and necessary information from here
                    </Typography>
                  </Typography>
                </Grid>

                <Grid item xs={12} mt={5}>
                  <form
                    className="form"
                    onSubmit={handleKnob}
                    id="myForm"
                    enctype="multipart/form-data"
                    method="post"
                  >
                    {/* <ImagePreviews text={'Please Drag and Drop the Category image'}> </ImagePreviews> */}
                    <TextField size="small"
                      fullWidth
                      // required
                      id="outlined-select"
                      name="knob_name"
                      label="Knob Name"
                      type="text"
                      helperText="Please enter your knob material"
                    />

                    <br></br>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox name="knob_status" />}
                        label="Status (On/Off)"
                      />
                    </FormGroup>

                    <br></br>

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

            {SideBox.open.formType === "update_knob" && (
              <Grid container p={5}>
                <Grid item xs={12}>
                  <Typography variant="h5">
                    Update Knob
                    <Typography
                      sx={{ display: "block !important" }}
                      variant="caption"
                    >
                      Update Knob and necessary information from here
                    </Typography>
                  </Typography>
                </Grid>

                <Grid item xs={12} mt={5}>
                  <form
                    className="form"
                    onSubmit={handleUpdateKnob}
                    id="myForm"
                    enctype="multipart/form-data"
                    method="post"
                  >
                    <TextField size="small"
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

                    <br></br>

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

            {SideBox.open.formType === "addHandle" && (
              <Grid container p={5}>
                <Grid item xs={12}>
                  <Typography variant="h5">
                    Add Handle Material
                    <Typography
                      sx={{ display: "block !important" }}
                      variant="caption"
                    >
                      Add your handle and necessary information from here
                    </Typography>
                  </Typography>
                </Grid>

                <Grid item xs={12} mt={5}>
                  <form
                    className="form"
                    onSubmit={handleHandle}
                    id="myForm"
                    enctype="multipart/form-data"
                    method="post"
                  >
                    {/* <ImagePreviews text={'Please Drag and Drop the Category image'}> </ImagePreviews> */}
                    <TextField size="small"
                      fullWidth
                      // required
                      id="outlined-select"
                      name="handle_name"
                      label="Handle Material Name"
                      type="text"
                      helperText="Please enter your knob material"
                    />

                    <br></br>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox name="handle_status" />}
                        label="Status (On/Off)"
                      />
                    </FormGroup>

                    <br></br>

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

            {SideBox.open.formType === "update_handle" && (
              <Grid container p={5}>
                <Grid item xs={12}>
                  <Typography variant="h5">
                    Update Handle Material
                    <Typography
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
                    onSubmit={handleUpdateHandle}
                    id="myForm"
                    enctype="multipart/form-data"
                    method="post"
                  >
                    <TextField size="small"
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

                    <br></br>

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

            {SideBox.open.formType === "addDoor" && (
              <Grid container p={5}>
                <Grid item xs={12}>
                  <Typography variant="h5">
                    Add Door
                    <Typography
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
                    onSubmit={handleDoor}
                    id="myForm"
                    enctype="multipart/form-data"
                    method="post"
                  >
                    {/* <ImagePreviews text={'Please Drag and Drop the Category image'}> </ImagePreviews> */}
                    <TextField size="small"
                      fullWidth
                      // required
                      id="outlined-select"
                      name="door_name"
                      label="Door Name"
                      type="text"
                      helperText="Please enter your knob material"
                    />

                    <br></br>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox name="door_status" />}
                        label="Status (On/Off)"
                      />
                    </FormGroup>

                    <br></br>

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

            {SideBox.open.formType === "update_door" && (
              <Grid container p={5}>
                <Grid item xs={12}>
                  <Typography variant="h5">
                    Update Door
                    <Typography
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
                    onSubmit={handleUpdateDoor}
                    id="myForm"
                    enctype="multipart/form-data"
                    method="post"
                  >
                    <TextField size="small"
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

                    <br></br>

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

            {SideBox.open.formType === "addFitting" && (
              <Grid container p={5}>
                <Grid item xs={12}>
                  <Typography variant="h5">
                    Add Fitting
                    <Typography
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
                    onSubmit={handleFitting}
                    id="myForm"
                    enctype="multipart/form-data"
                    method="post"
                  >
                    {/* <ImagePreviews text={'Please Drag and Drop the Category image'}> </ImagePreviews> */}
                    <TextField size="small"
                      fullWidth
                      // required
                      id="outlined-select"
                      name="fitting_name"
                      label="Fitting Name"
                      type="text"
                      helperText="Please enter your primary material"
                    />

                    <br></br>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox name="fitting_status" />}
                        label="Status (On/Off)"
                      />
                    </FormGroup>

                    <br></br>

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

            {SideBox.open.formType === "update_fitting" && (
              <Grid container p={5}>
                <Grid item xs={12}>
                  <Typography variant="h5">
                    Update Fitting
                    <Typography
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
                    onSubmit={handleUpdateFitting}
                    id="myForm"
                    enctype="multipart/form-data"
                    method="post"
                  >
                    <TextField size="small"
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

                    <br></br>

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

            {SideBox.open.formType === "addHinge" && (
              <Grid container p={5}>
                <Grid item xs={12}>
                  <Typography variant="h5">
                    Add Hinge
                    <Typography
                      sx={{ display: "block !important" }}
                      variant="caption"
                    >
                      Add your Hinge and necessary information from here
                    </Typography>
                  </Typography>
                </Grid>

                <Grid item xs={12} mt={5}>
                  <form
                    className="form"
                    onSubmit={handleHinge}
                    id="myForm"
                    enctype="multipart/form-data"
                    method="post"
                  >
                    {/* <ImagePreviews text={'Please Drag and Drop the Category image'}> </ImagePreviews> */}
                    <TextField size="small"
                      fullWidth
                      // required
                      id="outlined-select"
                      name="hinge_name"
                      label="Hinge Name"
                      type="text"
                      helperText="Please enter your primary material"
                    />

                    <br></br>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox name="hinge_status" />}
                        label="Status (On/Off)"
                      />
                    </FormGroup>

                    <br></br>

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

            {SideBox.open.formType === "update_hinge" && (
              <Grid container p={5}>
                <Grid item xs={12}>
                  <Typography variant="h5">
                    Update Hinge
                    <Typography
                      sx={{ display: "block !important" }}
                      variant="caption"
                    >
                      Update Hinge and necessary information from here
                    </Typography>
                  </Typography>
                </Grid>

                <Grid item xs={12} mt={5}>
                  <form
                    className="form"
                    onSubmit={handleUpdateHinge}
                    id="myForm"
                    enctype="multipart/form-data"
                    method="post"
                  >
                    <TextField size="small"
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

                    <br></br>

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

            {SideBox.open.formType === "addPolish" && (
              <Grid container p={5}>
                <Grid item xs={12}>
                  <Typography variant="h5">
                    Add Polish
                    <Typography
                      sx={{ display: "block !important" }}
                      variant="caption"
                    >
                      Add your Polish and necessary information from here
                    </Typography>
                  </Typography>
                </Grid>

                <Grid item xs={12} mt={5}>
                  <form
                    className="form"
                    onSubmit={handlePolish}
                    id="myForm"
                    enctype="multipart/form-data"
                    method="post"
                  >
                    {/* <ImagePreviews text={'Please Drag and Drop the Category image'}> </ImagePreviews> */}

                    <TextField size="small"
                      fullWidth
                      // required
                      id="outlined-select"
                      name="polish_name"
                      label="Polish Name"
                      type="text"
                      helperText="Please enter your primary material"
                    />

                    <br></br>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox name="polish_status" />}
                        label="Status (On/Off)"
                      />
                    </FormGroup>

                    <br></br>

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

            {SideBox.open.formType === "update_polish" && (
              <Grid container p={5}>
                <Grid item xs={12}>
                  <Typography variant="h5">
                    Update Polish
                    <Typography
                      sx={{ display: "block !important" }}
                      variant="caption"
                    >
                      Update Polish and necessary information from here
                    </Typography>
                  </Typography>
                </Grid>

                <Grid item xs={12} mt={5}>
                  <form
                    className="form"
                    onSubmit={handleUpdatePolish}
                    id="myForm"
                    enctype="multipart/form-data"
                    method="post"
                  >
                    {/* <ImagePreviews text={'Please Drag and Drop the Category image'}> </ImagePreviews> */}

                    <TextField size="small"
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

                    {/* <br></br>
                    <FormGroup>
                      <FormControlLabel control={<Checkbox name='polish_status' />} label="Status (On/Off)" />
                    </FormGroup> */}

                    <br></br>

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

            {SideBox.open.formType === "update_blog" && (
              <Grid container p={5}>
                <Grid item xs={12}>
                  <Typography variant="h5">
                    Update Blog
                    <Typography
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
                          id="myForm"
                          onSubmit={handleUpload}
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

                          <TextField size="small"
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
                    id="myForm"
                    onSubmit={handleUpdateBlog}
                    enctype="multipart/form-data"
                    method="post"
                  >
                    <FeaturesPreviews
                      text={"Please Drag and Drop the Card Image "}
                    >
                      {" "}
                    </FeaturesPreviews>

                    <TextField size="small"
                      fullWidth
                      // required
                      id="outlined-select"
                      name="seo_title"
                      label="SEO Title"
                      value={changeData.seo_title}
                      onChange={handleChangeData}
                    />
                    <TextField size="small"
                      fullWidth
                      // required
                      id="outlined-select"
                      name="seo_description"
                      label="SEO Description"
                      value={changeData.seo_description}
                      onChange={handleChangeData}
                    />

                    <TextField size="small"
                      fullWidth
                      // required
                      id="outlined-select"
                      value={changeData.card_description}
                      onChange={handleChangeData}
                      name="card_description"
                      label="Card Description"
                    />

                    <TextField size="small"
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
                      <TextField size="small"
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
                    <br></br>
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

            {SideBox.open.formType === "addBlog" && (
              <Grid container p={5}>
                <Grid item xs={12}>
                  <Typography variant="h5">
                    Add Blog
                    <Typography
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
                          id="myForm"
                          onSubmit={handleUpload}
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

                          <TextField size="small"
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
                    id="myForm"
                    onSubmit={handleAddBlog}
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

                    <TextField size="small"
                      fullWidth
                      // required
                      id="outlined-select"
                      name="seo_title"
                      label="SEO Title"
                    />
                    <TextField size="small"
                      fullWidth
                      // required
                      id="outlined-select"
                      name="seo_description"
                      label="SEO Description"
                    />
                    <TextField size="small"
                      fullWidth
                      // required
                      id="outlined-select"
                      name="card_description"
                      label="Card Description"
                    />

                    <TextField size="small"
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
                      <TextField size="small"
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
                    <br></br>
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

            {SideBox.open.formType === "addGallery" && (
              <Grid container p={5}>
                <Grid item xs={12}>
                  <Typography variant="h5">
                    Add Images
                    <Typography
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
                    id="myForm"
                    onSubmit={handleAddImage}
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

                    <TextField size="small"
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

            {SideBox.open.formType === "update_gallery" && (
              <Grid container p={5}>
                <Grid item xs={12}>
                  <Typography variant="h5">
                    Update Gallery
                    <Typography
                      sx={{ display: "block !important" }}
                      variant="caption"
                    >
                      Update Gallery and necessary information from here
                    </Typography>
                  </Typography>
                </Grid>

                <Grid item xs={12} mt={5}>
                  <form
                    className="form"
                    onSubmit={handleUpdateGallery}
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

                    <br></br>

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

            {SideBox.open.formType === "subcategory" && (
              <Grid container p={5}>
                <Grid item xs={12}>
                  <Typography variant="h5">
                    Add Sub Category
                    <Typography
                      sx={{ display: "block !important" }}
                      variant="caption"
                    >
                      Add your sub category and necessary information from here
                    </Typography>
                  </Typography>
                </Grid>

                <Grid item xs={12} mt={5}>
                  <form
                    className="form"
                    onSubmit={handleSubCategories}
                    id="myForm"
                    enctype="multipart/form-data"
                    method="post"
                  >
                    {/* <ImagePreviews text={'Please Drag and Drop the Category image'}> </ImagePreviews> */}

                    <TextField size="small"
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

                    <TextField size="small"
                      fullWidth
                      // required
                      id="outlined-select"
                      name="sub_category_name"
                      label="Sub Category"
                      type="text"
                      helperText="Please enter your sub category"
                    />

                    <br></br>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox name="sub_category_status" />}
                        label="Status (On/Off)"
                      />
                    </FormGroup>

                    <br></br>

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

            {SideBox.open.formType === "update_Subcategory" && (
              <Grid container p={5}>
                <Grid item xs={12}>
                  <Typography variant="h5">
                    Update Sub Category
                    <Typography
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
                    className="form"
                    onSubmit={handleUpdateSubCategories}
                    id="myForm"
                    enctype="multipart/form-data"
                    method="post"
                  >
                    {/* <ImagePreviews text={'Please Drag and Drop the Category image'}> </ImagePreviews> */}

                    <FormLabel id="demo-radio-buttons-group-label">
                      Category
                    </FormLabel>

                    <TextField size="small"
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

                    <TextField size="small"
                      fullWidth
                      id="outlined-select"
                      name="sub_category_name"
                      label="Sub Category"
                      type="text"
                      helperText="Please enter your sub category"
                    />

                    <br></br>

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

            {SideBox.open.formType === "add_customer" && (
              <Grid container p={5}>
                <Grid item xs={12}>
                  <Typography variant="h5">
                    Add Customer
                    <Typography
                      sx={{ display: "block !important" }}
                      variant="caption"
                    >
                      Add customer details and necessary information from
                      here
                    </Typography>
                  </Typography>
                </Grid>

                <Grid item xs={12} mt={5}>
                  <form
                    className="form"
                    onSubmit={handleCustomer}
                    id="myForm"
                    enctype="multipart/form-data"
                    method="post"
                  >
                    <ImagePreviews
                      text={"Please Drag and Drop the Profile Picture"}
                    >
                      {" "}
                    </ImagePreviews>

                    <TextField size="small"
                      fullWidth
                      // required
                      id="outlined-select"
                      name="name"
                      label="Customer Name"
                      type="text"
                    />

                    <TextField size="small"
                      fullWidth
                      // required
                      id="outlined-select"
                      name="email"
                      label="Customer Email"
                      type="text"
                    />
                    <TextField size="small"
                      fullWidth
                      // required
                      id="outlined-select"
                      name="mobile"
                      label="Contact Number"
                      type="number"
                    />
                    <TextField size="small"
                      fullWidth
                      // required
                      id="outlined-select"
                      name="password"
                      label="Password"
                      type="password"
                    />
                    {/* <TextField size="small"
                      fullWidth
                      // required
                      id="outlined-select"
                      name="pincode"
                      label="Pin-Code"
                      type="number"
                    /> */}
                    <TextField size="small"
                      fullWidth
                      // required
                      id="outlined-select"
                      name="city"
                      label="City"
                      type="text"
                    />
                    <TextField size="small"
                      fullWidth
                      // required
                      id="outlined-select"
                      name="state"
                      label="state"
                      type="text"
                    />
                    {/* <TextField size="small"
                      fullWidth
                      // required
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
                      id="outlined-select"
                      name="shipping"
                      type="text"
                      helperText="Please enter your primary material description"
                    />



                    <br></br>

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

            {SideBox.open.formType === "update_customer" && (
              <Grid container p={5}>
                <Grid item xs={12}>
                  <Typography variant="h5">
                    Update Customer
                    <Typography
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
                    className="form"
                    onSubmit={handleUpdateCustomer}
                    id="myForm"
                    enctype="multipart/form-data"
                    method="post"
                  >
                    <ImagePreviews
                      text={"Please Drag and Drop the Profile Picture"}
                    >
                      {" "}
                    </ImagePreviews>

                    <TextField size="small"
                      fullWidth
                      value={changeData.username}
                      onChange={handleProductFelids}
                      id="outlined-select"
                      name="username"
                      label="Customer Name"
                      type="text"
                    />

                    <TextField size="small"
                      fullWidth
                      value={changeData.email}
                      onChange={handleProductFelids}
                      id="outlined-select"
                      name="email"
                      label="Customer Email"
                      type="text"
                    />
                    <TextField size="small"
                      fullWidth
                      value={changeData.mobile}
                      onChange={handleProductFelids}
                      id="outlined-select"
                      name="mobile"
                      label="Contact Number"
                      type="number"
                    />
                    {/* <TextField size="small"
                      fullWidth
                      value={changeData.pincode}
                      onChange={handleProductFelids}
                      id="outlined-select"
                      name="pincode"
                      label="Pin-Code"
                      type="number"
                    /> */}
                    <TextField size="small"
                      fullWidth
                      value={changeData.city}
                      onChange={handleProductFelids}
                      id="outlined-select"
                      name="city"
                      label="City"
                      type="text"
                    />
                    <TextField size="small"
                      fullWidth
                      value={changeData.state}
                      onChange={handleProductFelids}
                      id="outlined-select"
                      name="state"
                      label="state"
                      type="text"
                    />
                    {/* <TextField size="small"
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
                      value={changeData.shipping || ''}
                      onChange={handleProductFelids}
                      id="outlined-select"
                      name="shipping"
                      type="text"
                      helperText="Please enter your primary material description"
                    />



                    <br></br>

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

            {SideBox.open.formType === "add_order" && (
              <Grid container p={5}>

                <Grid item xs={12}>
                  <Typography variant="h5">
                    Add Order
                    <Typography
                      sx={{ display: "block !important" }}
                      variant="caption"
                    >
                      Add order details and necessary information from
                      here
                    </Typography>
                  </Typography>
                </Grid>

                <Grid item xs={12} mt={5}>
                  <form
                    className="form"
                    onSubmit={handleOrder}
                    id="myForm"
                    enctype="multipart/form-data"
                    method="post"
                  >


                    <TextField size="small"
                      fullWidth
                      disabled
                      id="outlined-select"
                      value={SKU || ''}
                      name="OID"
                      label="Order ID"
                      type="text"
                      helperText='Search the customer for details'
                    />



                    <InputLabel id="demo-multiple-checkbox-label">Product</InputLabel>
                    <Select
                      multiple
                      fullWidth
                      value={changeData.product_array}
                      name="product_array"
                      onChange={handleProductFelids}
                      renderValue={(selected) => selected.join(', ')}
                    >
                      {SKUCatalog.map((option) => (
                        <MenuItem key={option._id} value={option.SKU}>
                          <Checkbox checked={changeData.product_array.indexOf(option.SKU) > -1} />
                          <ListItemText primary={option.SKU} />
                        </MenuItem>
                      ))}
                    </Select>

                    <Box>
                      <TextField size="small"
                        fullWidth
                        // required
                        id="outlined-select"
                        onChange={handleProductFelids}
                        value={changeData.searchCustomer || ''}
                        name="searchCustomer"
                        // onChange = {loadList}
                        label="Customer mobile number..."
                        type="text"
                        helperText='Search the customer for details'
                      />

                      <Box sx={{
                        boxShadow: 2, position: 'fixed', bgcolor: 'white', zIndex: 2, width: '88%',
                        display: (changeData.searchCustomer !== '' && changeData.searchCustomer !== changeData.display) ? 'block' : 'none'
                      }}>
                        {changeData.searchCustomer !== '' && changeData.searchCustomer !== changeData.display &&
                          customer.map((row) => {
                            return row.mobile.toString().includes(changeData.searchCustomer) || row.username.toLowerCase().includes(changeData.searchCustomer.toLowerCase()) ? <MenuItem
                              onClick={() => {
                                setData({ ...changeData, searchCustomer: row.mobile, display: row.mobile });
                              }}
                              key={row.mobile}>
                              {row.username} ({row.mobile})
                            </MenuItem> : console.log()


                          })
                        }
                      </Box>
                    </Box>

                    <TextField size="small"
                      fullWidth
                      // required
                      id="outlined-select"
                      name="paid_amount"
                      label="Paid Amount"
                      type="number"
                    />

                    <TextField size="small"
                      fullWidth
                      // required
                      id="outlined-select"
                      name="total_amount"
                      label="Total Amount"
                      type="number"
                    />

                    {changeData.searchCustomer === '' && <> <TextField size="small"
                      fullWidth
                      required
                      id="outlined-select"
                      name="customer_name"
                      label="Customer Name"
                      type="text"
                    />

                      <TextField size="small"
                        fullWidth
                        required
                        id="outlined-select"
                        name="customer_email"
                        label="Customer Email"
                        type="text"
                      />
                      <TextField size="small"
                        fullWidth
                        required
                        id="outlined-select"
                        name="customer_mobile"
                        label="Contact Number"
                        type="number"
                      />

                      <TextField size="small"
                        fullWidth
                        required
                        id="outlined-select"
                        name="city"
                        label="City"
                        type="text"
                      />
                      <TextField size="small"
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
                    }

                    <br></br>

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


          </Box>
        </Backdrop>
      </Slide>
    </>
  );
};

export default Sideform;
