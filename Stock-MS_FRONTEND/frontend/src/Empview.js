import React ,{useState,useEffect} from "react";
import axios from "axios";
import { CDataTable } from "@coreui/react";
import  {BrowserRouter as Router ,Routes,Route,Navigate,Link,useNavigate,useLocation} from 'react-router-dom';
import { CCard,CCardImage,CCardBody,CCardText,CCardTitle,CButton,CBadge,CCollapse } from "@coreui/react";
import Table from 'react-bootstrap/Table';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { InputNumber } from 'primereact/inputnumber';
 import './Stockview.css';
 import 'primeicons/primeicons.css';
 import 'primereact/resources/themes/lara-light-indigo/theme.css';
 import 'primereact/resources/primereact.css';
 import 'primeflex/primeflex.css';
 import { DataTable } from 'primereact/datatable';
 import { Column } from 'primereact/column';

 import "bootstrap/dist/css/bootstrap.min.css";
 import { InputText } from 'primereact/inputtext';
 import { Button } from 'primereact/button';
 import { Slider } from 'primereact/slider';
import { Dialog } from 'primereact/dialog';


const UpEmployee=new Array();
const Empview = (props) => {
    const {state} = useLocation();
    const { sessi,user } = state;
    const navigate = useNavigate();
    const [employee,setEmployee]=useState([])
    const [selectAll, setSelectAll] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [totalRecords, setTotalRecords] = useState(0);

    const [displayResponsive, setDisplayResponsive] = useState(false);
    const [displayResponsive1, setDisplayResponsive1] = useState(false);
    const [position, setPosition] = useState('center');
    const [id, setId] = useState();
    const [name,setName]=useState('');
    const [mail,setMail]=useState('');
    const [phone,setPhone]=useState();
    const [address,setAddress]=useState('');
    const [salary,setSalary]=useState();
   

    const dialogFuncMap = {
        'displayResponsive': setDisplayResponsive,
        'displayResponsive1': setDisplayResponsive1
      }
    
  
      const onClick = (name, position) => {
          dialogFuncMap[`${name}`](true);
  
          if (position) {
              setPosition(position);
          }
      }
  
      const onHide = (name) => {
          dialogFuncMap[`${name}`](false);
      }
  
      function  addEmp()
      {
       // console.log(indate);
         axios.post('http://localhost:8000/api/addemp',{
           id:id,
           name:name,
          mail:mail,
          phone:parseInt(phone),
          address:address,
          salary:parseInt(salary)
         })
         setTimeout(function(){
          window.location.reload();
       });
       setTimeout()
        
      }
      
    const renderFooter = (name) => {
        return (
            <div>
                <Button label="No" icon="pi pi-times" onClick={() => onHide(name)} className="p-button-text" />
                <Button label="Yes" icon="pi pi-check" onClick={() => addEmp()} autoFocus />
            </div>
        );
    }
    
    function getEvents(){
  
   
        axios
                .post("http://localhost:8000/api/check_exp", {
                    user: user,
                    sessi: sessi
                })
                .then((res) => {
                 
                    if(res.data==="0")
                    {
                       navigate('/');
                       
                    }  
                    else{
                      axios.get("http://localhost:8000/api/Efetch")
         
        .then(response => {
          console.log(response.data)
         setEmployee(response.data)
        })
        
                    }
    
                })
                .catch((err) => {});
    }

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'INR' });
      }

    const priceBodyTemplate = (employee) => {
        return formatCurrency(employee.salary);
      }

      const onSelectionChange = (event) => {
        const value = event.value;
        
        setSelectedEmployee(value);
        setSelectAll(value.length === totalRecords);
      }

      const onSelectAllChange = (event) => {
        const selectAll = event.checked;
      
        if (selectAll) {
          
                setSelectAll(true);
                setSelectedEmployee(employee);
             
           
        }
        else {
            setSelectAll(false);
            setSelectedEmployee([]);
        }
      }

      const onCellEditComplete = (e) => {
  
        let { rowData, newValue, field, originalEvent: event } = e;
      
        switch (field) {
            case 'phone':
            case 'salary':
                if (isPositiveInteger(newValue))
                    rowData[field] = newValue;
                else
                    event.preventDefault();
                break;
      
            default:
                if (newValue.trim().length > 0){
                    rowData[field] = newValue;
                 
                }
                else
                    event.preventDefault();
                break;
        }
        //console.log(rowData[field],field,rowData["id"])
        if(UpEmployee.includes(rowData))
         console.log();
        else
         UpEmployee.push(rowData)
        console.log(UpEmployee)
        
      
      }

      const isPositiveInteger = (val) => {
        let str = String(val);
        str = str.trim();
        if (!str) {
            return false;
        }
        str = str.replace(/^0+/, "") || "0";
        let n = Math.floor(Number(str));
        return n !== Infinity && String(n) === str && n >= 0;
      }

      const priceEditor = (options) => {
        return <InputNumber  value={options.value} onValueChange={(e) => options.editorCallback(e.target.value)} mode="currency" currency="INR" locale="en-US" />
      }
      const cellEditor = (options) => {
        if (options.field === 'phone')
            return priceEditor(options);
        if (options.field=== 'salary')
           return priceEditor(options);
        else
            return textEditor(options);
      }
      
      const textEditor = (options) => {
        return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
      }

      useEffect(()=>{
        getEvents();
        },[])
        function Logout()
        {
            navigate('/Logout', { state: { sessi:sessi,user:user } })
        }
        const footer = `In total there are ${employee ? employee.length : 0} employee.`;  
       
        function Refresh()
        {
          axios.post("http://localhost:8000/api/upemp",{
          upDate:UpEmployee
          }).then((res)=>
          {
            if(res.data==1)
            alert("EMPLOYEES UPDATED SUCCESSFULLY")
            else 
            alert("OOPS!!EMPLOYEES ARE NOT UPDATED")
          });
          setTimeout(function(){
            window.location.reload();
         });
         setTimeout()
        }     
      

        function delPro()
        {
         axios.post("http://localhost:8000/api/delemp",{
           selectedEmployee
         })
         setTimeout(function(){
           window.location.reload();
        });
        setTimeout()
        }
     
        return (
            <div className="main-cointainer">
            <header className="header">
            <span className="header-brand mb-0 h1"><h3>Manage Employee</h3></span>
             <button className="Logout" onClick={Logout}>Logout</button>
            </header>
            <br></br>
           
            <div className="card">
                      <DataTable 
                      showGridlines 
                      rows={10}
                      selectAll={selectAll}
                      selection={selectedEmployee}
                      onSelectionChange={onSelectionChange}
                      onSelectAllChange={onSelectAllChange}
                      emptyMessage="No data found"
                      
                      className="datatable-responsive"
                       value={employee} 
                       header="EMPLOYEES"
                       footer={footer} 
                       responsiveLayout="scroll">
                         <Column selectionMode="multiple" headerStyle={{ width: '3em' }}></Column>
                          <Column field="id" header="ID" />
                          <Column editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete} field="name"  sortable filter filterPlaceholder="Search by name" header="Name" />
                          <Column editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete} field="mail"   header="Mail" datatype="mail"/>
                          <Column editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete} field="phone"  header="Phone"/>
                          <Column editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete} field="address"  header="Address" />
                          <Column editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete} field="salary" sortable header="Salary" body={priceBodyTemplate}/>
                         
                  
                      { /* <Column field="rating" header="Rating" body={ratingTemplate}/>*/}
                      </DataTable>              
                  </div>
                  <br></br>
        <center>
        <div className="w3-show-inline-block">
        <div className="w3-bar">
          <Button  className="w3-btn w3-black" label="ADD" icon="pi pi-plus-circle"  onClick={() => onClick('displayResponsive')} ></Button>
          &nbsp;&nbsp;&nbsp; 
          <Button className="w3-btn w3-teal" icon="pi pi-minus-circle" label="DELETE"  onClick={() => onClick('displayResponsive1')}></Button>
          &nbsp;&nbsp;&nbsp;
          <Button onClick={Refresh} icon="pi pi-upload" label="UPDATE!"></Button>
        </div>
        </div>
        </center>
        <Dialog visible={displayResponsive1} header="Confirm to Delete" onHide={() => onHide('displayResponsive1')}>
        <br></br>
        <div>
            <Button label="No" icon="pi pi-times" onClick={() => onHide('displayResponsive1')} className="p-button-text" />
        &nbsp;&nbsp;&nbsp;
        <Button label="Yes" icon="pi pi-check" onClick={() => delPro()} ></Button>
        </div>
        </Dialog>
                      
                      <Dialog  header="Add stock" visible={displayResponsive}  onHide={() => onHide('displayResponsive')}  footer={renderFooter('displayResponsive')}>
                        <center>
                      <label className="block">ID:</label>&nbsp;&nbsp;&nbsp; 
                      <InputText value={id} onChange={(e) => setId(e.target.value)} placeholder="ID" /><br></br>
                      <label className="block">Name:</label>&nbsp;&nbsp;&nbsp; 
                      <InputText value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" /><br></br>
                      <label className="block">Phone:</label>&nbsp;&nbsp;&nbsp; 
                      <InputText value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" /><br></br>
                      <label className="block">Mail:</label>&nbsp;&nbsp;&nbsp; 
                      <InputText value={mail} onChange={(e) => setMail(e.target.value)} placeholder="Mail" /><br></br>
                      <label className="block">Address</label>&nbsp;&nbsp;&nbsp; 
                      <InputText value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" /><br></br>
                      <label className="block">Salary:</label>&nbsp;&nbsp;&nbsp; 
                      <InputText value={salary} onChange={(e) => setSalary(e.target.value)} placeholder="Salary" /><br></br>
                     
                        </center>
                      </Dialog>
        </div>
           
          );
      }
      export default Empview;