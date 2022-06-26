import React, {useState, useEffect, useRef} from "react";
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress'
import { useParams } from "react-router-dom";
import TableManage from "../../component/TableManage";
import NavBarDetailStore from "../../component/NavBarDetailStore";
import HeaderDetailStore from "../../component/HeaderDetailStore";
import Banner from "../../component/Banner";
import { useSelector, useDispatch } from "react-redux";
import { Key } from "../../constants/constForNavbarDetail";
import Swal from "sweetalert2";
import './index.css';
import { CustomSearchInput } from "../../component/common/CustomSearchInput/CustomSearchInput";
import { useDebounce } from './../../hooks/useDebounce';
import { doCreateOrder, doGetListOrderOfStores, doGetOneOrder} from '../../redux/slice/orderSlice'
import Order from "../../component/Order";

const ManageOrder = () => {
  const [showAddOrder, setShowAddOrder] = useState(false);
  const [oldForm, setOldForm] = useState({});
  const [mode, setMode] = useState() // just add or edit
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const params = useParams();
  const unmounted = useRef(false);
  const [rows, setRows] = useState();
  const [filterSeach, setFilterSearch] = useState(null);
  const dbValue = useDebounce(filterSeach, 300);
  const formatDate = (date) => {
    let d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    let year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}
  const columns = [
    { id: 'id', label: 'Order', minWidth: 300 },
    {
      id: 'status_date',
      label: 'Date',
      minWidth: 170,
      align: 'right'
    },
    {
      id: 'name',
      label: 'Customer',
      minWidth: 170,
      align: 'right'
    },{
      id: 'total_with_currency',
      label: 'Total',
      minWidth: 170,
      align: 'right'
    },{
      id: 'status',
      label: 'Fulfillment status',
      minWidth: 170,
      align: 'right',
      classNameWithData: (data) => {
        if (data === "RESTOCK") return 'restock-order'
        else if (data === "COMPLETED") return 'complete-order'
        else if (data === "DELETED") return 'deleted-order'
        else return 'normal-order'
      }
    },{
      id: 'total_item',
      label: 'Items',
      minWidth: 170,
      align: 'right'
    },
  ];
  const editFunction = (selected) => {
    Swal.showLoading();
    dispatch((doGetOneOrder(selected)))
    .then((result) => {
      setMode('EDIT');
      setOldForm(result.payload);  
      setShowAddOrder(true);
      Swal.close();
    })
  }
  const returnTable = async () => {
    await dispatch(doGetListOrderOfStores({
            id: params.storeId,
            params: {}
          }))
        .then((result) => {
          if (!unmounted.current) {
            let newRows = result.payload?.map((order) => {
              let date = new Date(Date.parse(order.status_date));
              return {
                ...order,
                status_date: formatDate(date),
                total_with_currency: `${order.currency === 'USD' ? Intl.NumberFormat('en-US').format(order.original_price) : Intl.NumberFormat('vi-VN').format(order.original_price)} ${order.currency}`
              }
            })
            setRows(newRows);
            setShowAddOrder(false);
          }
      });
  }
  useEffect(() => {
    if (!showAddOrder) {
      setLoading(true);
      dispatch(doGetListOrderOfStores({
        id: params.storeId,
        params: {}
      }))
      .then((result) => {
        let newRows = result.payload?.map((order) => {
          let date = new Date(Date.parse(order.status_date));
          return {
            ...order,
            status_date: formatDate(date),
            total_with_currency: `${order.currency === 'VND' ? Number(order.original_price).toFixed(0) : Number(order.original_price).toFixed(2)} ${order.currency}`
          }
        })
        setRows(newRows);
        setLoading(false);
      });
    }
  }, [showAddOrder])
  const handleSearch = (e) => {
    setFilterSearch(e.target.value);
  }
  const fetchOrderWithFilter = async () => {
    let search = {};
    if (filterSeach) {
      search.name = filterSeach;
    }
    dispatch(doGetListOrderOfStores({
      id: params.storeId,
      params: search
    }))
      .then((result) => {
        if (!unmounted.current) {
          let newRows = result.payload?.map((order) => {
            let date = new Date(Date.parse(order.status_date));
            return {
              ...order,
              status_date: formatDate(date),
              total_with_currency: `${order.currency === 'VND' ? Number(order.original_price).toFixed(0) : Number(order.original_price).toFixed(2)} ${order.currency}`
            }
          })
          setRows(newRows);
        }
    });
  }
  useEffect(() => {
    unmounted.current = false;
    fetchOrderWithFilter()
    return () => {
      unmounted.current = true;
    };
}, [dbValue])
  return (
    <>
      <HeaderDetailStore keySelected={Key.Order}></HeaderDetailStore>
      <div className="row callpage" >
          <div className="col-lg-2 col-xl-2 p-0 m-0 pt-4 navbar-detail">
              <NavBarDetailStore  isDesktop={true} keySelected={Key.Order}></NavBarDetailStore>
          </div> 
          <div className="col-12 col-sm-12 col-md-12 col-lg-10 col-xl-10 p-0 m-0 pt-4 desktop-table main-content-manage">     
              <div className="row ">   
                <>
                  {!showAddOrder ?
                    <>
                    
                      <p className="text-btn-login ml-1-5rem p-0-75rem"> Order </p>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={1}
                        className="custom"
                      >      
                            
                        <CustomSearchInput
                          placeholder='Search'
                          onChange={handleSearch}
                        />          
                        <button className="btn btn-success btn-form-product" onClick={() => {
                          setShowAddOrder(true);
                          setMode("ADD")
                        }} ><p className="text-btn-form-product font-size-0-85-rem-max500"> Add Order </p></button>
                      </Stack>
                      <div className="table">
                      { loading ? (<>
                          <div style={{display: 'flex', justifyContent: 'center'}}>
                            <CircularProgress />
                          </div>
                        </>)
                        : (
                        <>
                          <TableManage showToolbar={false} showAction={false} data={rows} columnsOfData={columns} editFunction={editFunction} deleteAllFunction={() => {}}></TableManage>
                        </>
                        )}
                      </div>
                    </>
                  : <Order mode={mode} returnTable={() => returnTable()} oldForm={mode === "EDIT" ? oldForm : {}}></Order>}
                        
                </>
              </div>
          </div> 
      </div>   
    </>    
  );
}

export default ManageOrder;