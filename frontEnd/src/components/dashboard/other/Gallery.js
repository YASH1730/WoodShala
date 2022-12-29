import React, { useState, useEffect } from "react";
import {
  Typography,
  ImageList,
  Grid,
  TextField,
  ImageListItem,
  Zoom,
  InputAdornment,
  Button,Box
} from "@mui/material";
import { getGallery, deleteImage } from "../../../services/service";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import AddIcon from "@mui/icons-material/Add";
import "../../assets/custom/css/gallery.css";
import { Notify, OpenBox } from "../../store/Types";
import { Store} from "../../store/Context";

export default function Knob() {
  const [images, setImages] = useState([]);
  const [buttonState, setButtonState] = useState({
    open: false,
    index: null,
  }); 

  // global State 
  const {dispatch} = Store();


  const [SKU, setSKU] = useState('');

  useEffect(() => {
    const res = getGallery(`WS-${localStorage.getItem("SKU")}`);

    res.then((res) => {
      // //console.log(res)
      if (res.status !== 203) {
        setImages(res.data);
        setSKU(`${localStorage.getItem("SKU")}`);
      }
    });
  }, [SKU]);

  const handleSKU = (e) => {
    setSKU(e.target.value);
    const res = getGallery(`WS-${SKU}`);
    localStorage.setItem("SKU", e.target.value);
    res.then((res) => {
      //console.log(res);
      if (res.status !== 203) {
        setImages(res.data);
      }
      // else {
      //     Alert.setNote({
      //         open: true,
      //         variant: 'error',
      //         message: "No Images Found"
      //     })
      // }
    });
  };

  const handleDelete = (e) => {
    const data = {
      SKU,
      imageIndex: parseInt(e.target.parentElement.getAttribute("alt")),
    };

    deleteImage(data).then((res) => {
      setSKU(localStorage.getItem("SKU"));
      dispatch({type : Notify, payload :{
        open: true,
        variant: "warning",
        message: "Image has been deleted !!",
    }});
    });
  };

  const handleHover = (e) => {
    //console.log(typeof e.target.alt);
    setButtonState({
      open: true,
      index: e.target.alt,
    });
  };

  const handleLeave = () => {
    setButtonState(false);
  };

  const handleUpdate = (e) => {
    dispatch({type : OpenBox, payload :  {
      state: true,
      formType: "update_gallery",
      payload: {
        SKU: localStorage.getItem("SKU"),
        imageIndex: e.target.parentElement.getAttribute("alt"),
      },
    }});
  };

  return (
    <Box  sx = {{pl:4,pr:4}}>
      <Typography component={'span'} sx={{ display: "block" }} variant="h5">
        Gallery
      </Typography>

      <Grid
        container
        p={3}
        mt={5}
        sx={{
          boxShadow: 1,
          borderRadius: 2,
          justifyContent: "center !important",
          alignItems: "center !important",
          gap: "15px",
        }}
      >
        <Grid xs={12} md={9}>
          <TextField
            fullWidth
            // autoComplete={false}
            id="demo-helper-text-aligned-no-helper"
            label="Search by SKU"
            name="seachQuery"
            value={SKU}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">WS</InputAdornment>
              ),
            }}
            type="search"
            onChange={handleSKU}
          />
        </Grid>
        <Grid xs={12} md={2.8}>
          <Button
            onClick={() => {
              dispatch({type : OpenBox, payload : { state: true, formType: "addGallery" }});
            }}
            sx={{ width: "100%" }}
            color="primary"
            startIcon={<AddIcon />}
            variant="contained"
          >
            Add Image
          </Button>
        </Grid>
      </Grid>

      <br></br>

      <Typography component={'span'} sx={{ display: "block" }} variant="h5">
        Product Images
      </Typography>
      <br></br>

      <ImageList
        sx={{ minWidth: 400, height: "content-fit", margin: "auto" }}
        cols={window.innerWidth <= 800 ? 1 : 3}
        gap={20}
      >
        {images !== [] &&
          images.map((item, index) => (
            <Zoom in={true} style={{ transitionDelay: "1000ms" }}>
              <ImageListItem
                onMouseLeave={handleLeave}
                key={index}
                sx={{ minWidth: "inherit", minHeight: "inherit" }}
              >
                <img
                  className="imageCard"
                  src={`${item}`}
                  srcSet={`${item}`}
                  alt={index}
                  loading="lazy"
                  onMouseOver={handleHover}
                  sx={{ maxWidth: "100%" }}
                />

                {index === parseInt(buttonState.index) && (
                  <Zoom
                    in={buttonState.open}
                    className="containerDiv"
                    style={{ transitionDelay: "300ms" }}
                  >
                    <div className="buttonDiv" alt={index}>
                      {/* <Button  startIcon={<AddIcon />} color = 'success'  variant='contained'>Add</Button> */}
                      <Button
                        small
                        startIcon={<ModeEditIcon />}
                        onClick={handleUpdate}
                        variant="contained"
                      >
                        Edit
                      </Button>
                      <Button
                        small
                        startIcon={<DeleteIcon />}
                        onClick={handleDelete}
                        color={"secondary"}
                        variant="contained"
                      >
                        Delete
                      </Button>
                    </div>
                  </Zoom>
                )}
              </ImageListItem>
            </Zoom>
          ))}
      </ImageList>
    </Box>
  );
}
