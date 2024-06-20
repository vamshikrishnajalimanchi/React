import React,{useState} from 'react';
import "./Header.css"
import Modal from './Modal';

const Header = () => {
    let [mod,setMod]=useState(false);

function onAddProduct(){
    console.log('CLOSE..');
setMod(!mod);
}

    return (<>
        <div className="header">
            <button onClick={onAddProduct}>Add New Product</button>
        </div>
        {mod&&<Modal onAddProduct={onAddProduct}/>}
        </>
    );
};

export default Header;

//const Header = ({ totalProducts, onAddProduct }) => {
//     return (
//         <div className="header">
//             <h1>Total Products: {totalProducts}</h1>
//             <button onClick={onAddProduct}>Add New Product</button>
//         </div>
//     );
// };