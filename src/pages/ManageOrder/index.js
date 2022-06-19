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
import { CustomSearchInput } from "../../component/common/CustomSearchInput/CustomSearchInput";
import { useDebounce } from './../../hooks/useDebounce';
import { doCreateOrder, doGetListOrderOfStores, doGetOneOrder} from '../../redux/slice/orderSlice'

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
  const columns = [
    { id: 'name', label: 'Title', minWidth: 300 },
    {
      id: 'description',
      label: 'Description',
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
            setRows(result.payload);  
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
        setRows(result.payload);
        setLoading(false);
      });
    }
  }, [showAddOrder])
//   useEffect(() => {
//     let newRows = JSON.parse(JSON.stringify(collectionList));
//     newRows = newRows.map((collection) => {
//       if (collection.description) collection.description = stringToHTML(collection?.description);
//       return collection;
//     })
//     setRows(newRows);
//   }, [collectionList])
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
        if (!unmounted.current) setRows(result.payload);
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
                          <TableManage data={rows} columnsOfData={columns} editFunction={editFunction} deleteAllFunction={() => {}}></TableManage>
                        </>
                        )}
                      </div>
                    </>
                  : <Banner mode={mode} returnTable={() => setShowAddOrder(false)} oldForm={mode === "EDIT" ? oldForm : {}}></Banner>}
                        
                </>
              </div>
          </div> 
      </div>   
    </>    
  );
}

export default ManageOrder;