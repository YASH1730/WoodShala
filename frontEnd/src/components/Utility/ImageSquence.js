import { Box, Grid, Typography } from "@mui/material";
// import img1 from "../../assets/img/Blog/bed.jpg";
// import img2 from "../../assets/img/Blog/chair.jpg";
// import img3 from "../../assets/img/Blog/door.jpg";
// import img4 from "../../assets/img/Blog/table.jpg";
import React, { useState } from "react";

const ImageSquence = ({ image, setImage, savedImage, text }) => {
  //   let [imgArr, setImgArr] = useState([img1, img2, img3, img4]);
  let [place, setPlace] = useState({
    from: null,
    to: null,
  });

  function handleOnDrag(e) {
    console.log("On Drag", e.target.alt);
    setPlace((old) => ({ ...old, from: e.target.alt }));
  }

  function handleEndDrag(e) {
    console.log("End Drag", e.target.alt);
    let newImgArr = image;

    // let from = parseInt(e.target.alt);
    console.log(place);

    if (place.from && place.to) {
      // swap
      let temp = newImgArr[place.from];
      newImgArr[place.from] = newImgArr[parseInt(place.to)];
      newImgArr[place.to] = temp;
      // swap

      //   console.log(newImgArr);
      if (savedImage)
        setImage((old) => ({ ...old, savedImage: [...newImgArr] }));
      else setImage([...newImgArr]);
    }
  }

  function handelPlaceIt(e) {
    console.log("Place IT", e.target.alt);
    setPlace((old) => ({ ...old, to: e.target.alt }));
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h6">Set Images Squence of {text}</Typography>
        <Typography variant="caption">
          Set the image squence by drag and drop.
        </Typography>
      </Grid>
      <Grid item xs={12}></Grid>
      <GenrateImage
        image={image}
        place={place}
        savedImage={savedImage}
        handelPlaceIt={handelPlaceIt}
        handleOnDrag={handleOnDrag}
        handleEndDrag={handleEndDrag}
      />
    </Grid>
  );
};

function GenrateImage({
  image,
  handelPlaceIt,
  handleOnDrag,
  handleEndDrag,
  savedImage,
}) {
  const imageContainer = {
    minWidth: 100,
    display: "flex",
    gap: 5,
    flexWrap: "wrap",
  };

  return (
    <Box sx={imageContainer}>
      {image.map((img, index) => (
        <div
          style={{ width: "70px", height: "70px", border: "1px solid brown" }}
        >
          <img
            style={{ border: 1 }}
            draggable
            onDragOverCapture={handelPlaceIt}
            onDrag={handleOnDrag}
            onDragEnd={handleEndDrag}
            width="100%"
            src={savedImage ? img : URL.createObjectURL(img)}
            alt={index}
          />
        </div>
      ))}
    </Box>
  );
}

export default ImageSquence;
