import React from "react"; 
import './index.css'
import { Box, Heading } from "grommet";
import Header from "./components/header";
export default function ContactUs() {
   
  return (
    <div  className="bg-red-300"
    style={{cursor: "pointer"}}
   >
        <Header/>
      <h1>Call Us at +91 8604479569</h1>
      <h1>Email Us at b22cs006@iitj.ac.in</h1>
     <a href="https://docs.google.com/forms/d/1axv9AVgpXDP7dcpdvI_Y-0ZFvb1b-4AJcxyzOMb_CrQ/edit?ts=67320ede"> <h1>Fill Out a Form</h1></a>
      
      
    </div>
  );
}