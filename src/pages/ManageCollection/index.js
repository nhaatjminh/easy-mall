import React, {useState, useEffect} from "react";
import Stack from '@mui/material/Stack';
import { useParams } from "react-router-dom";
import TableManage from "../../component/TableManage";

import NavBarDetailStore from "../../component/NavBarDetailStore";
import HeaderDetailStore from "../../component/HeaderDetailStore";
import Collection from "../../component/Collection";
import { useSelector, useDispatch } from "react-redux";
import { doGetListCollectionOfStores } from "../../redux/slice/collectionSlice";
import { Key } from "../../constants/constForNavbarDetail";

const ManageCollection = () => {
  const [rows, setRows] = useState([]);
  const [showAddCollection, setShowAddCollection] = useState(false);
  
  const dispatch = useDispatch();
  const params = useParams();
  const collectionList = useSelector((state) => state.collectionSlice.listCollection);
  const columns = [
    { id: 'name', label: 'Title', minWidth: 300 },
    {
      id: 'condition',
      label: 'Condition',
      minWidth: 170,
      align: 'right'
    },
  ];
  
  useEffect(() => {
    if (!showAddCollection) 
      dispatch(doGetListCollectionOfStores(params.storeId))
      .then((result) => setRows(result.payload));
  }, [showAddCollection])
  return (
    <>
      <HeaderDetailStore ></HeaderDetailStore>
      <div className="row callpage" >
          <div className="col-lg-2 col-xl-2 p-0 m-0 pt-4 navbar-detail">
              <NavBarDetailStore  isDesktop={true} keySelected={Key.Collection}></NavBarDetailStore>
          </div> 
          <div className="col-12 col-sm-12 col-md-12 col-lg-10 col-xl-10 p-0 m-0 pt-4 desktop-table main-content-manage">     
              <div className="row ">   
                <>
                  {!showAddCollection ?
                    <>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={1}
                      >              
                        <p className="text-btn-login ml-1rem p-0-75rem"> Collection </p>
                        <button className="btn btn-success btn-form-product" onClick={() => setShowAddCollection(true)} ><p className="text-btn-form-product font-size-0-85-rem-max500"> Add Collection </p></button>
                      </Stack>
                      <div className="table">
                        <TableManage data={collectionList} columnsOfData={columns}></TableManage>
                      </div>
                    </>
                  : <Collection returnTable={() => setShowAddCollection(false)}></Collection>}
                        
                </>
              </div>
          </div> 
      </div>   
    </>    
  );
}

export default ManageCollection;