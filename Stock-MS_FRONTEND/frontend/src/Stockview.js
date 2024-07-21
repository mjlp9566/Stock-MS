import React ,{useState,useEffect} from "react";
import axios from "axios";
import { CDataTable } from "@coreui/react";
import  {BrowserRouter as Router ,Routes,Route,Navigate,Link,useNavigate,useLocation} from 'react-router-dom';
import { CCard,CCardImage,CCardBody,CCardText,CCardTitle,CButton,CBadge,CCollapse } from "@coreui/react";
import Table from 'react-bootstrap/Table';

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




//while posting username--->name  here username is mailid
//in js username-->user



const UpProducts=new Array(); //updated values after editing
const Stockview = (props) => {
    const {state} = useLocation();
    const { sessi,user } = state;
    const navigate = useNavigate();
    const [products,setProducts]=useState([])
    const [selectAll, setSelectAll] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [totalRecords, setTotalRecords] = useState(0);

    const [displayResponsive, setDisplayResponsive] = useState(false);
    const [displayResponsive1, setDisplayResponsive1] = useState(false);
    const [position, setPosition] = useState('center');
    const [id, setId] = useState();
    const [name,setName]=useState('');
    const [indate,setIdate]=useState('');
    const [edate,setEdate]=useState('');
    const [quant,setQuant]=useState();
    const [price,setPrice]=useState();
    const [sup,setSup]=useState('');
    const [val_id,setVal]=useState('none');


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

    



 function  addPro()
  {
    alert(id);
     axios.post('http://localhost:8000/api/addpro',{
       id:parseInt(id),
       name:name,
       price:parseInt(price),
       indate:indate,
       edate:edate,
       quantity:parseInt(quant),
       Supplier:sup
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
                <Button label="Yes" icon="pi pi-check" onClick={() => addPro()} autoFocus />
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
                  axios.get("http://localhost:8000/api/fetch")
    .then(response => {
     setProducts(response.data)
    })
//console.log(products)
                }

            })
            .catch((err) => {});
}

const dateBodyTemplate = (products) => {
  return formatDate(products.indate);
}
const dateBodyTemplate1 = (products) => {
  return formatDate(products.edate);
}
const formatDate = (value) => {
  let val=new Date(value);
  return val.toLocaleDateString('en-UK', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
  });
}


const statusTemplate = (products) => {
  if(products.quantity==0){
  return <span className={"badge badge-danger"}>OUT OF STOCK</span>;
  }
  else
  {
    return <span className={"badge badge-success"}>IN STOCK</span>;
  }
}
const formatCurrency = (value) => {
  return value.toLocaleString('en-US', { style: 'currency', currency: 'INR' });
}

const priceBodyTemplate = (products) => {
  return formatCurrency(products.price);
}


const onSelectionChange = (event) => {
  const value = event.value;
  
  setSelectedProducts(value);
  setSelectAll(value.length === totalRecords);
}
//console.log(selectedProducts)
const onSelectAllChange = (event) => {
  const selectAll = event.checked;

  if (selectAll) {
    
          setSelectAll(true);
          setSelectedProducts(products);
       
     
  }
  else {
      setSelectAll(false);
      setSelectedProducts([]);
  }
}
//console.log(selectedProducts)

const onCellEditComplete = (e) => {
  
  let { rowData, newValue, field, originalEvent: event } = e;

  switch (field) {
      case 'quantity':
      case 'price':
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
  if(UpProducts.includes(rowData))
   console.log();
  else
   UpProducts.push(rowData)
  console.log(UpProducts)
  

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
  if (options.field === 'price')
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
    const footer = `In total there are ${products ? products.length : 0} products.`;  
   
    function Refresh()
    {
      axios.post("http://localhost:8000/api/upstock",{
      upDate:UpProducts
      }).then((res)=>
      {
        if(res.data==1)
        alert("STOCKS UPDATED SUCCESSFULLY")
        else 
        alert("OOPS!!STOCKS ARE NOT UPDATED")
      });
      setTimeout(function(){
        window.location.reload();
     });
     setTimeout()
    }     
  
   function delPro()
   {
    axios.post("http://localhost:8000/api/delpro",{
      selectedProducts
    })
    setTimeout(function(){
      window.location.reload();
   });
   setTimeout()
   }

function chck(c){
  if(parseInt(c)<0)
  {
alert("Enter a positive number");
setVal("block");
  }
}
    return (
      <div className="main-cointainer">
      <header className="header">
      <span className="header-brand mb-0 h1"><h3>Manage Stock</h3></span>
       <button className="Logout" onClick={Logout}>Logout</button>
      </header>
      <br></br>
     
      <div className="card">
                <DataTable 
                showGridlines 
                rows={10}
                selectAll={selectAll}
                selection={selectedProducts}
                onSelectionChange={onSelectionChange}
                onSelectAllChange={onSelectAllChange}
                emptyMessage="No data found"
                
                className="datatable-responsive"
                 value={products} 
                 header="STOCKS"
                 footer={footer} 
                 responsiveLayout="scroll">
                   <Column selectionMode="multiple" headerStyle={{ width: '3em' }}></Column>
                    <Column field="id" header="ID" />
                    <Column editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete} field="name"   filter filterPlaceholder="Search by name" header="Name" />
                    <Column editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete} field="indate"  sortable header="Incoming Date" dataType="date" body={dateBodyTemplate} />
                    <Column editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete} field="edate"  sortable header="Expiry Date" dataType="date" body={dateBodyTemplate1} />
                    <Column editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete} field="quantity" sortable header="Quantity" />
                    <Column editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete} field="price" sortable header="Price" body={priceBodyTemplate}/>
                    <Column field="quantity" sortable header="Status" body={statusTemplate} />
                    <Column editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete} field="Supplier" header="Supplier"/>
                   
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
                <InputText value={id} onValueChange={(e) => setId(e.target.value)} placeholder="ID" /><br></br>
                <label className="block">Name:</label>&nbsp;&nbsp;&nbsp; 
                <InputText value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" /><br></br>
                <label className="block">Incoming Date:</label>&nbsp;&nbsp;&nbsp; 
                <InputText value={indate} onChange={(e) => setIdate(e.target.value)} placeholder="mm/dd/yy" /><br></br>
                <label className="block">Expiry Date:</label>&nbsp;&nbsp;&nbsp; 
                <InputText value={edate} onChange={(e) => setEdate(e.target.value)} placeholder="mm/dd/yy" /><br></br>
                <label className="block">Quantity:</label>&nbsp;&nbsp;&nbsp; 
                <InputNumber value={quant} onValueChange={(e) => setQuant(e.target.value)} placeholder="Quantity" onBlur={(e) => {
        chck(e.target.value);
      }} /><br></br>
                <label className="block">Price:</label>&nbsp;&nbsp;&nbsp; 
                <InputNumber value={price} onValueChange={(e) => setPrice(e.target.value)} placeholder="Price" onBlur={(e) => {
        chck(e.target.value);
      }}/><br></br>
                <label className="block">Supplier Name:</label>&nbsp;&nbsp;&nbsp; 
                <InputText value={sup} onChange={(e) => setSup(e.target.value)} placeholder="Supplier" />
                  </center>
                </Dialog>
  </div>
     
    );
}
export default Stockview;