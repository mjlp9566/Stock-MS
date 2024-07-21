import React ,{useEffect} from "react";
import axios from "axios";
import "./Register.css"
import  {BrowserRouter as Router ,Routes,Route,Navigate,Link, createRoutesFromElements} from 'react-router-dom';

//while posting username--->name
//in js username-->user
class Register extends React.Component {
    state = {
        user: "",
        password: "",
        phone: "",
        Email: "",
       showStore: false
    };
   response=""; 
   
  
//when we place cursor on password field ot will show pass word validation box
 onfocus()
 {
    this.setState(
        {
            showStore: true
        }
    )

    var myInput = document.getElementById("psw");
    var letter = document.getElementById("letter");
    var capital = document.getElementById("capital");
    var number = document.getElementById("number");
    var length = document.getElementById("length");
    
    // When the user clicks on the password field, show the message box
    myInput.onfocus = function() {
      document.getElementById("message").style.display = "block";
    }
    
    // When the user clicks outside of the password field, hide the message box
    myInput.onblur = function() {
      document.getElementById("message").style.display = "none";
    }
    
    // When the user starts to type something inside the password field
    myInput.onkeyup = function() {
      // Validate lowercase letters
      var lowerCaseLetters = /[a-z]/g;
      if(myInput.value.match(lowerCaseLetters)) {  
        letter.classList.remove("invalid");
        letter.classList.add("valid");
      } else {
        letter.classList.remove("valid");
        letter.classList.add("invalid");
      }
      
      // Validate capital letters
      var upperCaseLetters = /[A-Z]/g;
      if(myInput.value.match(upperCaseLetters)) {  
        capital.classList.remove("invalid");
        capital.classList.add("valid");
      } else {
        capital.classList.remove("valid");
        capital.classList.add("invalid");
      }
    
      // Validate numbers
      var numbers = /[0-9]/g;
      if(myInput.value.match(numbers)) {  
        number.classList.remove("invalid");
        number.classList.add("valid");
      } else {
        number.classList.remove("valid");
        number.classList.add("invalid");
      }
      
      // Validate length
      if(myInput.value.length >= 8) {
        length.classList.remove("invalid");
        length.classList.add("valid");
      } else {
        length.classList.remove("valid");
        length.classList.add("invalid");
      }
    }
 }

 //to not display password validations
 onblur()
 {
    this.setState(
        {
            showStore: false
        }
    )
 }






   
    handleInput = (e) => {
        
        this.setState({
            [e.target.name]: e.target.value,
        });
    };
  
    handleSubmit = (e) => {
        e.preventDefault();
  
        axios
            .post("http://localhost:8000/api/register", {
                name: this.state.user,
                password: this.state.password,
                email:this.state.Email,
                phone:parseInt(this.state.phone)
            })
            .then((res) => {
                this.setState({
                    user: "",
                    password: "",
                    Email: "",
                    phone: ""
                });
            
                 this.response=res.data
                alert(this.response)
            })
            .catch((err) => {});
    };

    render() {
        return (
            
        <div>
        
          <center><fieldset id="reg" name="reg" className="reg">
        <legend align="center"><b>Register</b></legend>
        <form id="forms" onSubmit={this.handleSubmit} >
            <table border="0px" cellPadding="15px">
                <tr>
                    <td>
                        <b>Username:</b> 
                    </td>
                    <td><input type="text" required="true" name="user" placeholder="name"  value={this.state.user} onChange={this.handleInput}></input></td>
                </tr>
                <tr>
                    <td>
                        <b>Password:</b>
                    </td>
                    <td><input type="password" name="password" id="psw" onFocus={() => this.onfocus()} onBlur={() => this.onblur()} ref="psw"  value={this.state.password}  onChange={this.handleInput} required="true" placeholder="password" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"></input></td>
                    
                </tr>
              
                <tr>
                    <td>
                        <b>Phone:</b>
                    </td>
                    <td><input type="text" name="phone" pattern="[789][0-9]{9}" required="true" placeholder="phone"  value={this.state.phone}  onChange={this.handleInput}></input></td>
                </tr>
                <tr>
                    <td>
                       <b> Email:</b>
                    </td>
                    <td><input type="email" name="Email" required="true" placeholder="email"   pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                      value={this.state.Email}  onChange={this.handleInput}></input></td>
                </tr>
                <tr>
                    <td colspan="2">
                  
                       <center>
                       <button class="button button1" type="submit">CREATE</button>
                       </center>
                        
                    
                    </td>
                </tr>
                    <tr>
                   
                    <td colspan="2">
                        <center><h3><Link to="/">LOGIN</Link></h3></center>
                    </td>
                </tr>
            </table>
        </form>
    </fieldset></center> 
    <center>
    <div id="message" style={{display: this.state.showStore ? 'block' : 'none' }}>
  <h3>Password must contain the following:</h3>
  <p id="letter" class="invalid">A <b>lowercase</b> letter</p>
  <p id="capital" class="invalid">A <b>capital (uppercase)</b> letter</p>
  <p id="number" class="invalid">A <b>number</b></p>
  <p id="length" class="invalid">Minimum <b>8 characters</b></p>
</div>
</center>
        </div>
        
        );
    }
    
}
export default Register;


//value={this.state.user} name="user"
//onChange={this.handleInput} />