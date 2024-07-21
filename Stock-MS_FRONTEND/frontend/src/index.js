import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './Login';
import Register from './Register';
import Admin_Dash from './Admin_Dash';
import reportWebVitals from './reportWebVitals';
import  {BrowserRouter as Router ,Routes,Route,Navigate,NavLink, Link} from 'react-router-dom';
import Stockview from './Stockview';
import Empview from './Empview';
import Logout from './Logout';
import Prodpages from './prodpages';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <Router>

    <Routes>
      <Route path='/' element={<Login />}></Route>
      <Route path='/Register'  element={<Register/>}></Route>
      <Route path='/Admin' element={<Admin_Dash/>}></Route>
      <Route path='/Stock_view' element={<Stockview/>}></Route>
      <Route path='/Empview' element={<Empview/>}></Route>
      <Route path='/prodpages' element={<Prodpages/>}></Route>
      <Route path='/Logout' element={<Logout/>}></Route>
    </Routes>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
