import React, {useState, useEffect, useRef} from "react";
import { useParams, useNavigate } from "react-router-dom";
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress'
import TableManage from "../../component/TableManage";

import NavBarDetailStore from "../../component/NavBarDetailStore";
import HeaderDetailStore from "../../component/HeaderDetailStore";
import { useDispatch } from "react-redux";
import { doDeleteProduct, doGetListProductsOfStores, doGetOneProductOfStores, doGetListProductsOfStoresScopeFull, doUpdateInventory } from "../../redux/slice/productSlice";
import { Key } from "../../constants/constForNavbarDetail";
import Swal from "sweetalert2";
import { CustomSearchInput } from "../../component/common/CustomSearchInput/CustomSearchInput";
import { useDebounce } from './../../hooks/useDebounce';
import { ProductApi } from "../../service/api";
import TableInventory from "../../component/TableInventory";

const ManageInventory = () => {
 
  let routeChange = useNavigate();
  const dispatch = useDispatch();
  const [rows, setRows] = useState([]);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [oldForm, setOldForm] = useState({});
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState() // just add or edit
  const unmounted = useRef(false);
  const params = useParams();
  const columns = [
    { id: 'title', label: 'Product', minWidth: 170, align: 'left' },
    {
      id: 'sku',
      label: 'SKU',
      minWidth: 170,
      align: 'center',
    },
    {
      id: 'inventory',
      label: 'Available',
      minWidth: 170,
      align: 'center',
    }
  ];
  const [filterSeach, setFilterSearch] = useState();
  const dbValue = useDebounce(filterSeach, 300);
  
  useEffect(() => {
    unmounted.current = false;
    if (!showAddProduct) {
      setLoading(true);
      dispatch(doGetListProductsOfStoresScopeFull({
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
    dispatch(doGetListProductsOfStoresScopeFull({
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
  const editItem = async (object) => {
    setLoading(true);
    await dispatch(doUpdateInventory({productObj: object}))
    await dispatch(doGetListProductsOfStoresScopeFull({
      id: params.storeId,
      params: {}
    }))
    .then((result) => {
      setRows(result.payload);
      setLoading(false)
    });
  }
  return (
    <>
      <HeaderDetailStore keySelected={Key.Inventory}></HeaderDetailStore>
      <div className="row callpage" >
          <div className="col-lg-2 col-xl-2 p-0 m-0 pt-4 navbar-detail">
              <NavBarDetailStore  isDesktop={true} keySelected={Key.Inventory}></NavBarDetailStore>
          </div> 
          <div className="col-12 col-sm-12 col-md-12 col-lg-10 col-xl-10 p-0 m-0 pt-4 desktop-table main-content-manage">     
              <div className="row ">   
                <>
                  {!showAddProduct ?
                    <>
                    
                      <p className="text-btn-login ml-1-5rem p-0-75rem"> Inventory </p>
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
                          
                          routeChange(`/store-detail/manage-product/${params.storeId}`)
                        }} ><p className="text-btn-form-product font-size-0-85-rem-max500"> View Products </p></button>
                      </Stack>
                      <div className="table">
                        { loading ? (<>
                          <div style={{display: 'flex', justifyContent: 'center'}}>
                            <CircularProgress />
                          </div>
                        </>)
                        : (
                        <>
                          <TableInventory editItem={editItem} data={rows} columnsOfData={columns}></TableInventory>
                        </>
                        )}
                      </div>
                    </>
                  : <></>
                  }        
                </>
              </div>
          </div> 
      </div>   
    </>    
  );
}

export default ManageInventory;