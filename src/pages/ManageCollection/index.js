import React, {useState, useEffect, useRef} from "react";
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress'
import { useParams } from "react-router-dom";
import TableManage from "../../component/TableManage";
import NavBarDetailStore from "../../component/NavBarDetailStore";
import HeaderDetailStore from "../../component/HeaderDetailStore";
import Collection from "../../component/Collection";
import { useSelector, useDispatch } from "react-redux";
import { doGetListCollectionOfStores, doGetOneCollections, doDeleteCollection } from "../../redux/slice/collectionSlice";
import { Key } from "../../constants/constForNavbarDetail";
import Swal from "sweetalert2";
import { CustomSearchInput } from "../../component/common/CustomSearchInput/CustomSearchInput";
import { useDebounce } from './../../hooks/useDebounce';

const ManageCollection = () => {
  const [showAddCollection, setShowAddCollection] = useState(false);
  const [oldForm, setOldForm] = useState({});
  const [mode, setMode] = useState() // just add or edit
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const params = useParams();
  const unmounted = useRef(false);
  const stringToHTML = function (str) {
    let parser = new DOMParser();
    let doc = parser.parseFromString(str, 'text/html');
    return doc.body.innerHTML.replace("\"", "`");
  };
  const collectionList = useSelector((state) => state.collectionSlice.listCollection);
  const [rows, setRows] = useState(collectionList);
  const [filterSeach, setFilterSearch] = useState(null);
  const dbValue = useDebounce(filterSeach, 300);
  const [isEdit, setIsEdit] = useState(false);
  const columns = [
    { id: 'name', label: 'Title', minWidth: 300, align: 'left', sort: 'string', haveImage: true },
    {
      id: 'description',
      label: 'Description',
      minWidth: 170,
      align: 'left'
    },
  ];
  const editFunction = (selected) => {
    Swal.showLoading();
    dispatch((doGetOneCollections(selected)))
    .then((result) => {
      setMode('EDIT');
      setIsEdit(true);
      setOldForm(result.payload);  
      setShowAddCollection(true);
      Swal.close();
    })
  }
  const deleteAllFunction = async (selected) => {
    Swal.showLoading();
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
        const listPromise = [];
        selected.map((product) => {
          listPromise.push(
            new Promise((resolve) => {
              dispatch(doDeleteCollection({
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
            text: 'Delete successful collection!',
          }).then((result) => {   
            returnTable();
          })
        })
      }
    })
    
  }
  const returnTable = async () => {
    setIsEdit(false)
    await dispatch(doGetListCollectionOfStores({
            id: params.storeId,
            params: {}
          }))
        .then((result) => {
          if (!unmounted.current) {
            setRows(result.payload);  
            setShowAddCollection(false);
          }
      });
  }
  useEffect(() => {
    
    if (!showAddCollection) {
      setLoading(true);
      dispatch(doGetListCollectionOfStores({
        id: params.storeId,
        params: {}
      }))
      .then((result) => {
        setRows(result.payload);
        setLoading(false);
      });
    }
  }, [showAddCollection])
  useEffect(() => {
    let newRows = JSON.parse(JSON.stringify(collectionList));
    newRows = newRows.map((collection) => {
      if (collection.description) collection.description = stringToHTML(collection?.description);
      return collection;
    })
    setRows(newRows);
  }, [collectionList])
  const handleSearch = (e) => {
    setFilterSearch(e.target.value);
  }
  const fetchCollectionWithFilter = async () => {
    let search = {};
    if (filterSeach) {
      search.name = filterSeach;
    }
    dispatch(doGetListCollectionOfStores({
      id: params.storeId,
      params: search
    }))
      .then((result) => {
        if (!unmounted.current) setRows(result.payload);
    });
  }
  useEffect(() => {
    unmounted.current = false;
    fetchCollectionWithFilter()
    return () => {
      unmounted.current = true;
    };
}, [dbValue])
  return (
    <>
      <HeaderDetailStore isEdit={isEdit} keySelected={Key.Collection}></HeaderDetailStore>
      <div className="row callpage" >
          <div className="col-lg-2 col-xl-2 p-0 m-0 pt-4 navbar-detail">
              <NavBarDetailStore isEdit={isEdit}  isDesktop={true} keySelected={Key.Collection}></NavBarDetailStore>
          </div> 
          <div className="col-12 col-sm-12 col-md-12 col-lg-10 col-xl-10 p-0 m-0 pt-4 desktop-table main-content-manage">     
              <div className="row ">   
                <>
                  {!showAddCollection ?
                    <>
                    
                      <p className="text-btn-login ml-1-5rem p-0-75rem"> Collection </p>
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
                          setShowAddCollection(true);
                          setMode("ADD")
                          setIsEdit(true);
                        }} ><p className="text-btn-form-product font-size-0-85-rem-max500"> Add Collection </p></button>
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
                        </>
                        )}
                      </div>
                    </>
                  : <Collection  setIsEdit={(bool) => setIsEdit(bool)} mode={mode} returnTable={() => returnTable()} oldForm={mode === "EDIT" ? oldForm : {}}></Collection>}
                        
                </>
              </div>
          </div> 
      </div>   
    </>    
  );
}

export default ManageCollection;