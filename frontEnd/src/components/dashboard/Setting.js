import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  Box,
  MenuItem,
  Typography,
  TextField,
  Grid,
  Button,
} from "@mui/material";

export default function Setting() {
  const {
    acceptedFiles,

    getRootProps,
    getInputProps,
  } = useDropzone({
    accept: "image/jpeg,image/png",
  });

  const acceptedFileItems = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const [cat, setCat] = useState("catagory");

  const post = [
    {
      value: "Admin",
      label: "Admin",
    },
    {
      value: "Accountant",
      label: "Accountant",
    },
    {
      value: "CEO",
      label: "CEO",
    },
    {
      value: "Driver",
      label: "Driver",
    },
    {
      value: "Delivery Person",
      label: "Delivery Person",
    },
    {
      value: "Manager",
      label: "Manager",
    },
    {
      value: "Security Guard",
      label: "Security Guard",
    },
  ];

  const handleChange = (event) => {
    setCat(event.target.value);
  };

  return (
    <Box  sx = {{pl:4,pr:4}}>
      <Typography component={'span'} sx={{ display: "block" }} variant="h5">
        Edit Profile
      </Typography>

      {/* Section 1  */}
      <Grid
        container
        p={3}
        pt={0}
        pb={0}
        sx={{
          borderRadius: 2,
          justifyContent: "center !important",
          alignItems: "center !important",
        }}
      >
        <Grid item xs={8}>
          <form method="post" className="formStyle">
            <Box
              sx={{
                "& .MuiTextField-root": { mt: 2 },
                margin: "auto",
              }}
            >
              <section className="dorpContainer">
                <div {...getRootProps({ className: "dropzone" })}>
                  <input {...getInputProps()} />
                  <p>
                    Drag & drop your staff image here, or click to select image
                  </p>
                  <em>(Only *.jpeg and *.png images will be accepted)</em>
                </div>
                <aside>
                  <h5>File Name</h5>
                  <ul>{acceptedFileItems}</ul>
                </aside>
              </section>

              <TextField
                fullWidth
                // autoComplete={false}
                id="fullWidth"
                label="Name"
                type="text"
                variant="outlined"
              />

              <TextField
                fullWidth
                // autoComplete={false}
                id="fullWidth"
                label="Email"
                type="email"
                variant="outlined"
              />

              <TextField
                fullWidth
                id="fullWidth"
                type="number"
                label="Contact Number"
                variant="outlined"
              />

              <TextField
                fullWidth
                id="outlined-select"
                select
                label="Staff Role"
                value={cat}
                multiple
                onChange={handleChange}
                helperText="Please select the staff role"
              >
                {post.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>

              <Button
                variant="contained"
                color="primary"
                sx={{ marginTop: "5%", marginBottom: "8%", float: "right" }}
              >
                {" "}
                Update Profile
              </Button>
            </Box>
          </form>
        </Grid>
      </Grid>
    </Box>
  );
}
