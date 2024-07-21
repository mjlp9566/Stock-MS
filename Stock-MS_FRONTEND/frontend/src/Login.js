import React from "react";
import axios from "axios";
import "./Login.css"
import  {BrowserRouter as Redirect,Router ,Routes,Route,Navigate,Link} from 'react-router-dom';

import {withRouter} from "./withRouter";

//while posting username--->name
//in js username-->user
class Login extends React.Component {
    
    state = {
        user: "",
        password: "",
        response:[]
    };
   


    handleInput = (e) => {
        
        this.setState({
            [e.target.name]: e.target.value,
        });
        
    }
    renderRedirect = () => {
     
          return <Link to='/Register'  target={"_blank"}/>
    

      }
    handleSubmit = (e) => {
        e.preventDefault();
        
        
        axios
            .post("http://localhost:8000/api/login", {
                Email: this.state.user,
                password: this.state.password,
            })
            .then((res) => {
                this.setState({
                    user: "",
                    password: "",
                });
            
                 this.state.response=res.data
                alert(this.state.response['q'])
                const { navigate }=this.props;
          console.log(this.state.response['q']);
       
          if(this.state.response['q'] === "LOGIN SUCCESSFULL" && this.state.user === "admin@stock.com"){
            
            navigate("/Admin", { state: { sessi:this.state.response['sess'],user:this.state.response['user'] } });
          }
          else{
            navigate()
          }
            })
            .catch((err) => {});
          //  alert(this.state.response)
            //if(res==succ && name=admin)
         
        }     
    render() {
        
        return (
            
        <div>
          
          <center>
          <fieldset className="f1">
            <legend align="center"><b>LOGON</b></legend>
            <center>
            <form onSubmit={this.handleSubmit}>
                <table border="0px" cellPadding="15px">
                    <tr>
                        <td><b>Usermail:</b></td>
                            <td><input type="email" name="user" placeholder="usermail" value={this.state.user}  onChange={this.handleInput} required={true}></input></td>
                          

                    </tr>
                    <tr>
                        <td><b>Password:</b></td>
                        <td><input type="password"   name="password" placeholder="Password"  value={this.state.password} onChange={this.handleInput} required={true}></input></td>
                    </tr>
                    <tr>
                        <td colSpan="2">
                        <center>
                        <button className="button button1" type="submit">LOGIN</button>
                        </center>
                        
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="2">
                            
                            <center><Link to="/Register" ><b>New User? SIGNUP</b></Link></center>
                        </td>
                        
                    </tr>
                    
                </table>
            </form>
            </center>
        </fieldset> 
        </center>    
        </div>
        );
    }
    
}
export default withRouter(Login);



//value={this.state.user} name="user"
//onChange={this.handleInput} />