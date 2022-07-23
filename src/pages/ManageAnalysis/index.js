import React, {useState, useEffect, useRef} from "react";
import { useParams } from "react-router-dom";
import NavBarDetailStore from "../../component/NavBarDetailStore";
import HeaderDetailStore from "../../component/HeaderDetailStore";
import { useSelector, useDispatch } from "react-redux";
import { Key } from "../../constants/constForNavbarDetail";
import { doGetAnalysis } from "../../redux/slice/analysisSlice";
import { MenuItem, Select } from "@mui/material";
import Item from "./Item";
import {parseLocaleNumber} from '../../utils/parseLocaleNumber'
import { LoadingModal } from "../../component/common/LoadingModal/LoadingModal";

const ManageAnalysis = () => {
    const DAY_IN_MS = 24 * 60 * 60 * 1000
    const dispatch = useDispatch();
    const params = useParams();
    const [currency, setCurrency] = useState('VND');
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const [exactTotalSale, setExactTotalSale] = useState({
        data: [],
        labelX: '',
        labelY: '',
        labelPaper: 'Total',
        total: 0
    })
    const [exactTotalProduct, setExactTotalProduct] = useState({
        data: [],
        labelX: '',
        labelY: '',
        labelPaper: 'Total',
        total: 0
    })
    const [exactTotalOrder, setExactTotalOrder] = useState({
        data: [],
        labelX: '',
        labelY: '',
        labelPaper: 'Total',
        total: 0
    })
    const handleChangeCurrency = (e) => {
        setCurrency(e.target.value)
    }
    const dateRange = (endDate, numOfDays) => {
        if (!endDate) return []

        const endDateInMs = new Date(endDate).getTime()
        return [...Array(numOfDays).keys()].map(i => new Date(endDateInMs - i * DAY_IN_MS).toLocaleDateString('en-EN')).reverse()
    }
    const convertNewDateFromLocaleString = (date) => {
        if (!date) return NaN;
        return new Date(date).getTime(); 
    }
    useEffect(() => {
        setLoading(true);
        dispatch(doGetAnalysis({
            id: params.storeId,
            params: {
                currency: currency
            }
        })).then((result) => {
            const missingDates = result?.payload?.orders?.sort((a,b) => {
                return Date.parse(a.day) - Date.parse(b.day);
            }).map((order) => {
                return {
                    ...order,
                    day: new Date(order.day).toLocaleDateString('en-EN')
                }
            })
            let finalAllOrder = [];
            let dates = dateRange(new Date(),30)
            let idxOrder = 0;
            dates.every((date, idxDates) => {
                let dateConvert = convertNewDateFromLocaleString(date);
                let dayConvert = convertNewDateFromLocaleString(missingDates[idxOrder]?.day);
                if (!isNaN(dateConvert) && !isNaN(dayConvert) && dateConvert === dayConvert) {
                    finalAllOrder.push({
                        ...missingDates[idxOrder],
                        total_sale: Number(Number(missingDates[idxOrder]?.total_sale).toFixed(currency === 'USD' ? 2 : 0)),
                    })
                    idxOrder += 1;
                } else {
                    finalAllOrder.push({
                        day: date,
                        total_sale: 0,
                        total_products: 0,
                        total_order: 0
                    })
                }
                if (idxOrder >= missingDates.length && idxDates >= dates.length) return false;
                else return true;
            })
            result.payload.orders = finalAllOrder;
            setData(result.payload)
            
            setLoading(false);
        });
    }, [currency])
    const getExactTotalSales = () => {
        let dataForTotalSales = data.orders.map((order) => {
            return {
                date: order.day,
                Sales: order.total_sale
            }
        })
        setExactTotalSale({
            labelPaper: 'Total Sales',
            labelX: 'Date',
            labelY: 'Sale',
            total: `${parseLocaleNumber(Number(Number(data.total_sales).toFixed(currency === 'USD' ? 2 : 0)))} ${currency}` ,
            data: dataForTotalSales,
            currency: currency,
            format: true
        })
    }
    
    const getExactTotalProducts = () => {
        let dataForTotalProducts = data.orders.map((order) => {
            return {
                date: order.day,
                Products: order.total_products
            }
        })
        setExactTotalProduct({
            labelPaper: 'Total Products Sold',
            labelX: 'Date',
            labelY: 'Product',
            total: `${parseLocaleNumber(Number(Number(data.total_products).toFixed(currency === 'USD' ? 2 : 0)))}` ,
            data: dataForTotalProducts,
            currency: currency
        })
    }
    const getExactTotalOrder = () => {
        let dataForTotalOrder = data.orders.map((order) => {
            return {
                date: order.day,
                Orders: order.total_order
            }
        })
        setExactTotalOrder({
            labelPaper: 'Total Orders',
            labelX: 'Date',
            labelY: 'Order',
            total: `${parseLocaleNumber(Number(data.total_order))}` ,
            data: dataForTotalOrder,
            currency: currency
        })
    }
    useEffect(() => {
        if (data?.orders) {
            getExactTotalSales();
            getExactTotalProducts();
            getExactTotalOrder();
        }
    }, [data])
    return (
        <>
        <HeaderDetailStore keySelected={Key.Analysis}></HeaderDetailStore>
        <div className="row callpage" >
            <div className="col-lg-2 col-xl-2 p-0 m-0 pt-4 navbar-detail">
                <NavBarDetailStore isDesktop={true} keySelected={Key.Analysis}></NavBarDetailStore>
            </div> 
            <div className="col-12 col-sm-12 col-md-12 col-lg-10 col-xl-10 p-0 m-0 pt-4 desktop-table main-content-manage pt-5">     
                <div className="row" style={{ marginLeft: 60, marginBottom: 20}}> 
                    <Select style={{ width: 'auto', height: 28}} value={currency} onChange={handleChangeCurrency}  className='text-field-input text-content'>
                        <MenuItem value='VND'>VND</MenuItem>
                        <MenuItem value='USD'>USD</MenuItem>
                    </Select>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center'}}>
                    <Item exactData={exactTotalSale}></Item> 
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'center'}}>
                    <Item exactData={exactTotalOrder}></Item> 
                </div>
                <div style={{ display: 'flex', justifyContent: 'center'}}>
                    <Item exactData={exactTotalProduct}></Item> 
                </div>
            </div> 
        </div>  
        
        <LoadingModal show={loading} /> 
        </>    
    );
}

export default ManageAnalysis;