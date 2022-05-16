import React, {useState, useEffect, useRef} from "react";
import { useParams } from "react-router-dom";
import Stack from '@mui/material/Stack';
import './index.css';
import TableManage from "../../component/TableManage";

import NavBarDetailStore from "../../component/NavBarDetailStore";
import HeaderDetailStore from "../../component/HeaderDetailStore";
import AddProduct from "../../component/Product";
import { useDispatch } from "react-redux";
import { doDeleteProduct, doGetListProductsOfStores, doGetOneProductOfStores } from "../../redux/slice/productSlice";
import { Key } from "../../constants/constForNavbarDetail";
import Swal from "sweetalert2";
const ManageStoreProduct = () => {
  
  const dispatch = useDispatch();
  const [rows, setRows] = useState([]);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [oldForm, setOldForm] = useState({});
  const [mode, setMode] = useState() // just add or edit
  const unmounted = useRef(false);
  const params = useParams();
  const columns = [
    { id: 'title', label: 'Title', minWidth: 170 },
    { id: 'status', label: 'Status', minWidth: 100 },
    {
      id: 'inventory',
      label: 'Inventory',
      minWidth: 170,
      align: 'right',
    },
    {
      id: 'type',
      label: 'Type',
      minWidth: 170,
      align: 'right',
    },
    {
      id: 'vendor',
      label: 'Vendor',
      minWidth: 170,
      align: 'right'
    },
  ];
  const editFunction = (numSelected, selected) => {
    if (numSelected !== 1) {
      Swal.fire({
        icon: 'warning',
        title: 'Warning!',
        text: 'You just can edit 1 product!',
      })
    } else {
      Swal.showLoading();
      new Promise(() => {
        dispatch((doGetOneProductOfStores(selected[0])))
        .then((result) => {    
          // info of product receive from server is array. get first element. into form, need this is object not array
          if (Array.isArray(result.payload.product)) result.payload.product = result.payload.product[0];
          setOldForm(result.payload);  
          setShowAddProduct(true);
          setMode('EDIT');
          Swal.close();
        })
      })
    }
  }
  const deleteAllFunction = async (numSelected, selected) => {
    Swal.showLoading();
    const listPromise = [];
    selected.map((product) => {
      listPromise.push(
        new Promise((resolve) => {
          dispatch(doDeleteProduct({
            id: product
            })).then(() => {
                resolve();
            })
        })
      )
    })
    Promise.all(listPromise).then(() => {
      Swal.close();
      returnTable();
    })
  }
  const returnTable = async () => {
    await dispatch(doGetListProductsOfStores(params.storeId))
        .then((result) => {
          if (!unmounted.current) {
            setRows(result.payload);  
            setShowAddProduct(false);
          }
      });
  }
  useEffect(() => {
    unmounted.current = false;
    if (!showAddProduct) 
      dispatch(doGetListProductsOfStores(params.storeId))
        .then((result) => {
          if (!unmounted.current) setRows(result.payload);
      });

      return () => {
        unmounted.current = true;
      };
  }, [showAddProduct])
  return (
    <>
      <HeaderDetailStore ></HeaderDetailStore>
      <div className="row callpage" >
          <div className="col-lg-2 col-xl-2 p-0 m-0 pt-4  navbar-detail">
              <NavBarDetailStore  isDesktop={true} keySelected={Key.Product}></NavBarDetailStore>
          </div> 
          <div className="col-12 col-sm-12 col-md-12 col-lg-10 col-xl-10 p-0 m-0 pt-4 desktop-table main-content-manage">     
              <div className="row ">
                  
              <>
              {!showAddProduct ?
              <>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  spacing={1}
                >              
                  <p className="text-btn-login ml-1rem p-0-75rem"> Products </p>
                  <Stack
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="center"
                    spacing={1}
                  >
                    <button className="btn  btn-form-product" > <p className="text-btn-form-product"> Export </p></button>
                    <button className="btn  btn-form-product" > <p className="text-btn-form-product"> Import </p></button>
                    <button className="btn btn-success btn-form-product" onClick={() => {
                      setShowAddProduct(true);
                      setMode('ADD');
                    }} ><p className="text-btn-form-product font-size-0-85-rem-max500"> Add Product </p></button>
                  </Stack>
                </Stack>
                <div className="table">
                  <TableManage data={rows} columnsOfData={columns} editFunction={editFunction} deleteAllFunction={deleteAllFunction}></TableManage>
                </div>
              </>
              : <AddProduct mode={mode} returnTable={() => returnTable()} oldForm={oldForm}></AddProduct>}
                      
              </>
              </div>
          </div> 
      </div>   
      </>    
    );
}

export default ManageStoreProduct;