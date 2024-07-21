import React ,{useEffect} from "react";
import axios from "axios";
import  {BrowserRouter as Router ,Routes,Route,Navigate,Link,useNavigate,useLocation} from 'react-router-dom';
const Logout=(props)=>{
    const {state} = useLocation();
    const { sessi,user } = state;
    const navigate = useNavigate();
   
    function getEvents(){
       
    let data ;
    axios
            .post("http://localhost:8000/api/logout", {
                user: user,
                sessi: sessi
            })
            .then((res) => {
               console.log(res.data)
                if(res.data==="1")
                {
                   navigate('/');
                   
                }
           
               
            })
            .catch((err) => {});
           

}
      useEffect(()=>{
         getEvents();
               },[])
}
export default Logout;