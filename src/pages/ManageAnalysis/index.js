import React, {useState, useEffect, useRef} from "react";
import { useParams } from "react-router-dom";
import NavBarDetailStore from "../../component/NavBarDetailStore";
import HeaderDetailStore from "../../component/HeaderDetailStore";
import { useSelector, useDispatch } from "react-redux";
import { Key } from "../../constants/constForNavbarDetail";
import { doGetAnalysis } from "../../redux/slice/analysisSlice";
import { MenuItem, Select } from "@mui/material";
import Item from "./Item";

const ManageAnalysis = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const [currency, setCurrency] = useState('VND');
    const [data, setData] = useState({});
    const handleChangeCurrency = (e) => {
        setCurrency(e.target.value)
    }
    useEffect(() => {
        dispatch(doGetAnalysis({
            id: params.storeId,
            params: {
                currency: currency
            }
        })).then((result) => setData(result.payload));
    }, [currency])
    return (
        <>
        <HeaderDetailStore keySelected={Key.Analysis}></HeaderDetailStore>
        <div className="row callpage" >
            <div className="col-lg-2 col-xl-2 p-0 m-0 pt-4 navbar-detail">
                <NavBarDetailStore isDesktop={true} keySelected={Key.Analysis}></NavBarDetailStore>
            </div> 
            <div className="col-12 col-sm-12 col-md-12 col-lg-10 col-xl-10 p-0 m-0 pt-4 desktop-table main-content-manage pt-5">     
                <div className="row "> 
                    <Select style={{ width: 'auto'}} value={currency} onChange={handleChangeCurrency} className='text-field-input text-content'>
                        <MenuItem value='VND'>VND</MenuItem>
                        <MenuItem value='USD'>USD</MenuItem>
                    </Select>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <Item></Item> 
                    <Item></Item> 
                </div>
                
                <div style={{display: 'flex', justifyContent: 'space-between'}}> 
                    <Item></Item> 
                </div>
            </div> 
        </div>   
        </>    
    );
}

export default ManageAnalysis;