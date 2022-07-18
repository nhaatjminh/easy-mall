import React from "react";
import FollowOrder from "./FollowOrder";
import FormOrder from "./FormOrder";
export const WIDTH_ITEM_ORDER = 615;
const Order = ( {mode, oldForm, returnTable, setIsEdit })=> {
    // use redux to manage state
    return (
        <>
         <div className="row">  
            <div className="offset-1 col-1" style={{width: 50}}>
                <button className="btn-icon mt-1" onClick={returnTable}>              
                    <i className="fa-angle-left fa-icon  float-right fa-store-login" ></i>
                </button>
            </div>   
            <div className="col-9 col-sm-9 col-md-9 col-lg-9 col-xl-9 pt-3 ">                      
                <h5 className="font-weight-bold text-create-store mt-3 pl-2">{mode === "EDIT" ? oldForm?.order?.id ?? '' : "Create Order"}</h5>
            </div>    
        </div>
        {mode === 'ADD'
        ? <FormOrder setIsEdit={setIsEdit} key={`order-manage`} mode={mode} oldForm={oldForm} returnAfterAdd={returnTable}></FormOrder> 
        : <FollowOrder  key={`follow-order-manage`} mode={mode} oldForm={oldForm} returnAfterAdd={returnTable}></FollowOrder> }
        </>
    );
}

export default Order;