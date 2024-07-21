import React ,{useEffect} from "react";
import axios from "axios";
import "./Admin_Dash.css"
import pic from "./images/inv.jpg"
import pic1 from "./images/emp.jpg"
import  {BrowserRouter as Router ,Routes,Route,Navigate,Link,useNavigate,useLocation} from 'react-router-dom';
import { CCard,CCardImage,CCardBody,CCardText,CCardTitle,CButton } from "@coreui/react";
import Logout from "./Logout";
import { Button } from 'primereact/button';
//while posting username--->name
//in js username-->user
const Admin_Dash = (props) => {
    const {state} = useLocation();
    const { sessi,user } = state;
    const navigate = useNavigate();
   
    function getEvents(){
       
    let data ;
    axios
            .post("http://localhost:8000/api/check_exp", {
                user: user,
                sessi: sessi
            })
            .then((res) => {
               console.log(res.data)
                if(res.data==="0")
                {
                   navigate('/');
                   
                }
           
               
            })
            .catch((err) => {});
           

}
      useEffect(()=>{
         getEvents();
               },[])
function st()
{
    navigate('/Stock_view', { state: { sessi:sessi,user:user } })
}
function emp()
{
    navigate('/Empview', { state: { sessi:sessi,user:user } })
}

function Logout()
{
    navigate('/Logout', { state: { sessi:sessi,user:user } })
}
   
    return (
        <div>
     
        <div className="main-cointainer">
            <header className="header">
            <span className="header-brand mb-0 h1"><h3>Welcome admin!!!!</h3></span>
            <button className="Logout" onClick={Logout}>Logout</button>
            </header>
        </div>
                    <br></br>
            <center>
                
            <CCard style={{ width: '18rem' }}>
            <CCardImage orientation="top" src={pic} />
            <CCardBody color="black">
            <CCardTitle className="ctit" >MANAGE STOCK</CCardTitle>
            <CCardText className="ctex">
              
                <li>Add Stock</li>
                <li>Update Stock</li>
                <li>Delete Stock</li>
              
            </CCardText>
            <Button onClick={st} label="GET IN!" icon="pi pi-sign-in"></Button>
            </CCardBody>
            </CCard>

            <br></br>

            <CCard style={{ width: '18rem' }}>
            <CCardImage orientation="top" src={pic1} />
            <CCardBody color="black">
            <CCardTitle className="ctit" >MANAGE EMPLOYEE</CCardTitle>
            <CCardText className="ctex">
              
                <li>Add Employee</li>
                <li>Delete Employee</li>
              
            </CCardText>
            <Button onClick={emp} label="GET IN!" icon="pi pi-sign-in"></Button>

            </CCardBody>
            </CCard>
           
            </center>
        </div>
    )
}
export default Admin_Dash;