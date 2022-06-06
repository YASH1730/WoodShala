import React from "react";
import { Grid, Typography, Link, Stack, IconButton } from "@mui/material";

import "../assets/custom/css/footer.css";

// social icons
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import WhatsappRoundedIcon from "@mui/icons-material/WhatsappRounded";
import TwitterIcon from "@mui/icons-material/Twitter";
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
export default function Footer() {
  return (
    <>
      {/* Footer  */}
      <Grid container className="footerContainer">
        {/* Top */}
        <Grid className="lableContainer" item xs={12}>
          <Grid container>
            {/* LINK */}
            {/* <Grid item xs={3} className="link">
              <Stack>
                <Typography variant="Button">Links</Typography>
               
                <Typography sx = {{lineHeight: '1.66'}} variant="overline"> <Link href="#" underline="hover">
                  Home
                </Link></Typography>
                
                <Typography sx = {{lineHeight: '1.66'}} variant="overline"> <Link href="#" underline="hover">
                  Home
                </Link></Typography>
                
                <Typography sx = {{lineHeight: '1.66'}} variant="overline"> <Link href="#" underline="hover">
                  Home
                </Link></Typography>
                

              </Stack>
            </Grid>
           */}
              {/* SOCIAL lINK */}
              <Grid item xs={6} className="socialLinks">
              
            </Grid>

            {/* ADDRESS  */}
            {/* <Grid xs={3} item className="address">
              <Typography  variant="Button">Address</Typography> */}
{/* <br></br> */}
                {/* <Typography variant = 'caption' >
                Plot no. 25 Hasti colony, Jhalamand, Jodhpur, Rajasthan 342001
                </Typography>
            </Grid> */}


                {/* SOCIAL lINK */}
                <Grid item xs={12} className="socialLinks">
              <Typography variant="Button">Let's Connect</Typography>
                <div>
                <IconButton aria-label="delete">
                  <FacebookRoundedIcon />
                </IconButton>

                <IconButton aria-label="delete">
                  <WhatsappRoundedIcon />
                </IconButton>

                <IconButton aria-label="delete">
                  <TwitterIcon />
                </IconButton>

                <IconButton aria-label="delete">
                  <AlternateEmailIcon />
                </IconButton>
                </div>
            </Grid>

          </Grid>
        </Grid>

        {/* Bottom */}
        <Grid className="bottomBox" item xs={12}>
          <Typography color="white" variant="button">
            WoodShala&#169;2022{" "}
          </Typography>
        </Grid>
      </Grid>
      {/* End Footer  */}
    </>
  );
}
