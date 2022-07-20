import React, {useEffect, useState} from "react";
import FollowOrder from "./FollowOrder";
import FormOrder from "./FormOrder";
const Order = ( {mode, oldForm, returnTable, setIsEdit })=> {
    // use redux to manage state
    let [WIDTH_ITEM_ORDER, setWIDTH_ITEM_ORDER] = useState(610);
    useEffect(() => {
        const handleResize = () => {
            if(document.getElementById('paper-resize-item')?.clientWidth >= 660) {
                setWIDTH_ITEM_ORDER(document.getElementById('paper-resize-item').clientWidth - 50 ) // minus padding
            } else {
                setWIDTH_ITEM_ORDER(610);
            }
        }
        handleResize()
        window.addEventListener('resize', handleResize)
      
        return _ => {
            window.removeEventListener('resize', handleResize)    
        }
    }, [])
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
        ? <FormOrder WIDTH_ITEM_ORDER={WIDTH_ITEM_ORDER} setIsEdit={setIsEdit} key={`order-manage`} mode={mode} oldForm={oldForm} returnAfterAdd={returnTable}></FormOrder> 
        : <FollowOrder WIDTH_ITEM_ORDER={WIDTH_ITEM_ORDER}  key={`follow-order-manage`} mode={mode} oldForm={oldForm} returnAfterAdd={returnTable}></FollowOrder> }
        </>
    );
}

export default Order;