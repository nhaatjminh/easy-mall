import React, {useState, useEffect, useRef} from "react";
import { useParams, useNavigate } from "react-router-dom";
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress'

import NavBarDetailStore from "../../component/NavBarDetailStore";
import HeaderDetailStore from "../../component/HeaderDetailStore";
import { useDispatch } from "react-redux";
import { doGetListProductsOfStoresScopeFull, doUpdateInventory } from "../../redux/slice/productSlice";
import { Key } from "../../constants/constForNavbarDetail";
import { CustomSearchInput } from "../../component/common/CustomSearchInput/CustomSearchInput";
import { useDebounce } from './../../hooks/useDebounce';
import TableInventory from "../../component/TableInventory";

const ManageInventory = () => {
 
  let routeChange = useNavigate();
  const dispatch = useDispatch();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const unmounted = useRef(false);
  const params = useParams();
  const [isEdit, setIsEdit] = useState(false);
  const columns = [
    { id: 'title', label: 'Product', minWidth: 170, align: 'left', sort: 'string' },
    {
      id: 'sku',
      label: 'SKU',
      minWidth: 170,
      align: 'center'
    },
    {
      id: 'inventory',
      label: 'Available',
      minWidth: 170,
      align: 'center'
    }
  ];
  const [filterSeach, setFilterSearch] = useState();
  const saveForRef = useRef({});
  const dbValue = useDebounce(filterSeach, 300);
  
  useEffect(() => {
    unmounted.current = false;
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

      return () => {
        unmounted.current = true;
      };
  }, [])
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
      setLoading(false);
      setIsEdit(false);
    });
  }
  
  const changeRef = ({id, key, value, clean}) => {
    if (clean) {
      saveForRef.current[id] = {}
      return;
    }
    if (!saveForRef.current[id]) saveForRef.current[id] = {}
    saveForRef.current[id][`${key}`] = value
  }
  return (
    <>
      <HeaderDetailStore isEdit={isEdit} keySelected={Key.Inventory}></HeaderDetailStore>
      <div className="row callpage" >
          <div className="col-lg-2 col-xl-2 p-0 m-0 pt-4 navbar-detail">
              <NavBarDetailStore isEdit={isEdit}  isDesktop={true} keySelected={Key.Inventory}></NavBarDetailStore>
          </div> 
          <div className="col-12 col-sm-12 col-md-12 col-lg-10 col-xl-10 p-0 m-0 pt-4 desktop-table main-content-manage">     
              <div className="row ">   
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
                        <TableInventory  changeRef={changeRef}  saveForRef={saveForRef}    setIsEdit={(bool) => setIsEdit(bool)} editItem={editItem} data={rows} columnsOfData={columns}></TableInventory>
                      </>
                      )}
                    </div>
                  </>   
              </div>
          </div> 
      </div>   
    </>    
  );
}

export default ManageInventory;