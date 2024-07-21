
import React ,{useState,useEffect} from "react";
import pic from "./images/inv.jpg"
import axios from "axios";
import "./Admin_Dash.css"
import pic1 from "./images/emp.jpg"
import  {BrowserRouter as Router ,Routes,Route,Navigate,Link,useNavigate,useLocation} from 'react-router-dom';
import { CCard,CCardHeader,CCardImage,CCardBody,CCardText,CCardTitle,CButton } from "@coreui/react";

import { Button } from 'primereact/button';
const Prodpages = (props) => 
{

function em()
{
    alert(123)
}





  const data=[
    {
        title:"product1",
        text:"decription1",
        image:pic1
    },
    {
        title:"product2",
        text:"description2",
        image:pic
    }
]
let customer="customer1";
const CCardView=()=>
{
    //console.log(data)
    return(
    <div className="main-cointainer">
    <header className="header">
    <span className="header-brand mb-0 h1"><h3>Welcome {customer}</h3></span>
  
    </header>
    <br></br>
    <center>
    
    {data.map((item, index) => (
   <CCard  className={`mb-3 border-top-${item.color} border-top-3` }style={{ width: '18rem' }} key={index}>
   <CCardImage orientation="top" src={pic} />
   <CCardBody color="black">
   <CCardTitle className="ctit" >{item.title}</CCardTitle>
   <CCardText className="ctex">{item.text}
   </CCardText>
   <Button onClick={em} label="GET IN!" icon="pi pi-sign-in"></Button>
   </CCardBody>
   </CCard>
  ))}
  
 
       
        </center>
    </div>
    );
}






 return (
    
   <CCardView/>
        
 );  
}

export default Prodpages;