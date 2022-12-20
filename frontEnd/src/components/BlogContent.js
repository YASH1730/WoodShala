import React, {useEffect, useState} from "react";
import {
  Grid,
  Typography,
  List,
  ListItem,
  Link,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@mui/material";
import ReactHtmlParser from "react-html-parser";
import Footer from "./Footer";

import { Image } from 'mui-image'
//logo
import logo from "../assets/img/Blog/logo.webp";
import ArrowRightOutlinedIcon from "@mui/icons-material/ArrowRightOutlined";
import KeyboardBackspaceSharpIcon from "@mui/icons-material/KeyboardBackspaceSharp";
//css
import "../assets/custom/css/blogContent.css";

import {getBlog} from '../services/service'

// imports for TOC

import { unified } from 'unified';
import rehypeParse from 'rehype-parse';
import rehypeStringify from 'rehype-stringify';
import { visit } from 'unist-util-visit';
import parameterize from 'parameterize';

export default function BlogContent() {

  const [data,setData] = useState([])

  useEffect(()=>{
    getBlog(localStorage.getItem('uuid'))
    .then((data)=>{
      //console.log(data)
      setData(data.data)
    })
  },[])

  const toc = [];

  const content = data && unified()
  .use(rehypeParse, {
    fragment: true,
  })
  .use(() => {
    return (tree) => {
      visit(tree, 'element', function (node) {
        if (node.tagName[0] === 'h' && parseInt(node.tagName[1]) <= 6 )
        {
          // console.log(node)
          const id = parameterize(node.children[0].value);
          node.properties.id = id;
          toc.push({id : `#${id}`,value : node.children[0].value})
          //console.log(toc)
        }
      });
      return;
    };
  })
  .use(rehypeStringify)
  .processSync(data.description)
  .toString();

  return (
    <>
      <title>Blog-Content</title>

      {/* // top bar */}

      <Grid container className="navBar">
        <Grid item xs={4}></Grid>
        <Grid item xs={4} className="logo">
          <img src={logo} alt="logo" />
        </Grid>
        <Grid item className="backBtn" xs={4}>
          <IconButton variant="contained" color="primary">
            <KeyboardBackspaceSharpIcon
              onClick={() => {
                window.location = "/blog";
              }}
            />
          </IconButton>
        </Grid>
      </Grid>

      {/* Read Box */}

      <Grid container className="readBox">
        {/* Table OF COntent */}
        <Grid item xs={4} md={2} className="TOC">
          
          <Typography component={'span'} variant="h6" color="primary">
            Table Of Content
          </Typography>
          <List className = 'TOCList' color="black">
              {toc && toc.map((jump,index)=>{
                return <> <ListItem key = {index} component = {Link} href = {jump.id}> 
                  <ListItemIcon>
                    <ArrowRightOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary={jump.value}/>
                </ListItem>
                </>
              })}
          </List>
        </Grid>
        {/* Table OF COntent Ends */}

        {/* Content Box */}
        {data && <Grid item xs={11.5} md={9.5} className="content">
            <Typography component={'span'} variant= 'h5'>{data.title}</Typography>
            <br></br>
            <img
            src = {data.card_image}
            className  = 'banner-img'
            alt = 'banner blog'
          />
            <br></br>

            <Grid item className = 'content' >{ReactHtmlParser(content)}</Grid>
            
        </Grid>}

        <Grid item xs = {12}>
        <Footer></Footer>
        </Grid>
        {/* Content Box Ends */}
      </Grid>

      {/* Ends Read Box */}
      
    </>
  );
}
