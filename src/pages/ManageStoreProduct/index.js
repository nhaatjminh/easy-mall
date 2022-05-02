import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import Stack from '@mui/material/Stack';
import './index.css';
import TableManage from "../../component/TableManage";

import NavBarDetailStore from "../../component/NavBarDetailStore";
import HeaderDetailStore from "../../component/HeaderDetailStore";
import AddProduct from "../../component/AddProduct";
import { useDispatch } from "react-redux";
import { doGetListCollectionOfStores } from "../../redux/slice/productSlice";
const ManageStoreProduct = () => {
  
  const dispatch = useDispatch();
  const [rows, setRows] = useState([]);
  const [showAddProduct, setShowAddProduct] = useState(false);
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
  useEffect(() => {
    if (!showAddProduct) 
      dispatch(doGetListCollectionOfStores(params.storeId))
      .then((result) => setRows(result.payload));
  }, [showAddProduct])
  return (
    <>
      <HeaderDetailStore ></HeaderDetailStore>
      <div className="row callpage" >
          <div className="col-lg-2 col-xl-2 p-0 m-0 pt-4  navbar-detail">
              <NavBarDetailStore  isDesktop={true}></NavBarDetailStore>
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
                    <button className="btn btn-success btn-form-product" onClick={() => setShowAddProduct(true)} ><p className="text-btn-form-product font-size-0-85-rem-max500"> Add Product </p></button>
                  </Stack>
                </Stack>
                <div className="table">
                  <TableManage data={rows} columnsOfData={columns}></TableManage>
                </div>
              </>
              : <AddProduct returnTable={() => setShowAddProduct(false)}></AddProduct>}
                      
              </>
              </div>
          </div> 
      </div>   
      </>    
    );
}

export default ManageStoreProduct;