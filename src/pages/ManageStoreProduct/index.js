import React, {useState, useEffect, useRef} from "react";
import { useParams } from "react-router-dom";
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress'
import './index.css';
import TableManage from "../../component/TableManage";

import NavBarDetailStore from "../../component/NavBarDetailStore";
import HeaderDetailStore from "../../component/HeaderDetailStore";
import AddProduct from "../../component/Product";
import { useDispatch } from "react-redux";
import { doDeleteProduct, doGetListProductsOfStores, doGetOneProductOfStores } from "../../redux/slice/productSlice";
import { Key } from "../../constants/constForNavbarDetail";
import Swal from "sweetalert2";
import { CustomSearchInput } from "../../component/common/CustomSearchInput/CustomSearchInput";
import { useDebounce } from './../../hooks/useDebounce';
const ManageStoreProduct = () => {
  
  const dispatch = useDispatch();
  const [rows, setRows] = useState([]);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [oldForm, setOldForm] = useState({});
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState() // just add or edit
  const [isEdit, setIsEdit] = useState(false);
  const unmounted = useRef(false);
  const params = useParams();
  const columns = [
    { id: 'title', label: 'Title', minWidth: 170, align: 'center', sort: 'string' },
    {
      id: 'status',
      label: 'Status',
      minWidth: 100,
      align: 'center',
      classNameWithData: (data) => {
        if (data === "Active") return 'active-product'
        return 'draft-product'
      },
      sort: 'string'
    },
    {
      id: 'inventory',
      label: 'Inventory',
      minWidth: 170,
      align: 'center',
      sort: 'number'
    },
    {
      id: 'type',
      label: 'Type',
      minWidth: 170,
      align: 'center',
      sort: 'string'
    },
    {
      id: 'vendor',
      label: 'Vendor',
      minWidth: 170,
      align: 'center',
      sort: 'string'
    },
  ];
  const [filterSeach, setFilterSearch] = useState();
  const dbValue = useDebounce(filterSeach, 300);
  const editFunction = (selected) => {
    Swal.showLoading();
    dispatch((doGetOneProductOfStores(selected)))
    .then((result) => {    
      // info of product receive from server is array. get first element. into form, need this is object not array
      if (Array.isArray(result.payload.product)) result.payload.product = result.payload.product[0]; 
      setMode('EDIT');
      setOldForm(result.payload);  
      setShowAddProduct(true);
      setIsEdit(true);
      Swal.close();
    })
  }
  const deleteAllFunction = async (selected) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
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
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Delete successful products!',
          }).then((result) => {   
            returnTable();
          })
        })
      }
    })
   
  }
  const returnTable = async () => {
    setIsEdit(false);
    await dispatch(doGetListProductsOfStores({
          id: params.storeId,
          params: {}
        }))
        .then((result) => {
          if (!unmounted.current) {
            setRows(result.payload);  
            setShowAddProduct(false);
          }
      });
  }
  useEffect(() => {
    unmounted.current = false;
    if (!showAddProduct) {
      setLoading(true);
      dispatch(doGetListProductsOfStores({
        id: params.storeId,
        params: {}
      }))
        .then((result) => {
          if (!unmounted.current) {
            setRows(result.payload); 
            setLoading(false);
          }
      });
    }

      return () => {
        unmounted.current = true;
      };
  }, [showAddProduct])
  const handleSearch = (e) => {
    setFilterSearch(e.target.value);
  }
  const fetchProductWithFilter = async () => {
    let search = {};
    if (filterSeach) {
      search.title = filterSeach;
    }
    dispatch(doGetListProductsOfStores({
      id: params.storeId,
      params: search
    }))
      .then((result) => {
        if (!unmounted.current) setRows(result.payload);
    });
  }
  useEffect(() => {
    unmounted.current = false;
    fetchProductWithFilter()
    return () => {
      unmounted.current = true;
    };
}, [dbValue])
  return (
    <>
      <HeaderDetailStore isEdit={isEdit} keySelected={Key.Product} ></HeaderDetailStore>
      <div className="row callpage" >
          <div className="col-lg-2 col-xl-2 p-0 m-0 pt-4  navbar-detail">
              <NavBarDetailStore isEdit={isEdit}  isDesktop={true} keySelected={Key.Product}></NavBarDetailStore>
          </div> 
          <div className="col-12 col-sm-12 col-md-12 col-lg-10 col-xl-10 p-0 m-0 pt-4 desktop-table main-content-manage">     
              <div className="row ">
                  
              <>
              {!showAddProduct ?
              <>
              
                <p className="text-btn-login ml-1-5rem p-0-75rem"> Products </p>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  spacing={10}
                  className="custom"
                >           
                  <CustomSearchInput
                    placeholder='Search'
                    onChange={handleSearch}
                  />   
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
                      setIsEdit(true);
                    }} ><p className="text-btn-form-product font-size-0-85-rem-max500"> Add Product </p></button>
                  </Stack>
                </Stack>
                <div className="table">
                  { loading ? (<>
                      <div style={{display: 'flex', justifyContent: 'center'}}>
                        <CircularProgress />
                      </div>
                    </>)
                    : (
                    <>
                      <TableManage data={rows} columnsOfData={columns} editFunction={editFunction} deleteAllFunction={deleteAllFunction}></TableManage>
                    </>)}
                </div>
              </>
              : <AddProduct  setIsEdit={(bool) => setIsEdit(bool)} mode={mode} returnTable={() => returnTable()} oldForm={mode === "EDIT" ? oldForm : {}}></AddProduct>}
                      
              </>
              </div>
          </div> 
      </div>   
      </>    
    );
}

export default ManageStoreProduct;