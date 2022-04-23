import React from "react";
import FormProduct from './FormProduct'
import './index.css';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
const AddProduct = ( {returnTable })=> {
    // use redux to manage state
    return (
        <>
         <div className="row">  
            <div className="offset-1 col-1" style={{width: '5%'}}>
                <button className="btn-icon mt-1" onClick={returnTable}>              
                    <i className="fa-angle-left fa-icon  float-right fa-store-login" ></i>
                </button>
            </div>   
            <div className="col-9 col-sm-9 col-md-9 col-lg-9 col-xl-9 pt-3 ">                      
                <h5 className="font-weight-bold text-create-store mt-3">Tạo Cửa Hàng</h5>
            </div>    
        </div>
        <FormProduct mode={"ADD"} oldForm={{}}></FormProduct>
        </>
    );
}

export default AddProduct;