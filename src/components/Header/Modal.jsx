import React,{useState} from 'react';


const Modal = ({onAddProduct}) => {
    
 return (
 <>
 <div className="modal">
    <div className="overlay" onClick={onAddProduct}>
    </div>
    <div className="modal-content" >
        <h2>New product details</h2>
        <label>name</label><input type='text'/><br/>
        <label>price</label><input type='text'/><br/>
        <label>image url</label><input type='text'/>
        <button className="cls_mod" onClick={onAddProduct}>close</button>
        <div><button className="" onClick={onAddProduct}>save</button></div>
    </div>
 </div>
<></>
</>
    );
};

export default Modal;