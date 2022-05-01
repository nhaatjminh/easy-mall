import React, { useEffect, useState } from "react";
import { ViewIcon } from '../../../assets/icon/svg/ViewIcon';
import './index.css'
import HeaderDetailStore from './../../../component/HeaderDetailStore/index';
import NavBarDetailStore from "../../../component/NavBarDetailStore";
import { useParams } from 'react-router-dom';
import { StoreApi } from "../../../service/api";

const ManageThems = () => {
    const params = useParams();
    const [homePageId, setHomePageId] = useState('');

    useEffect(() => {
        const query = {
            name: 'Home'
        }
        
        StoreApi.getPagesByStoreId(params.storeId, query)
            .then((result) => setHomePageId(result.data[0].id))
            .catch(err => console.log(err));

    }, [])

    const goToEditor = () => {
        window.open(process.env.REACT_APP_EDITOR_URL + `/editor/${params.storeId}?pageId=${homePageId}`);
    }

    return (
        <div>
            <HeaderDetailStore />
            <div className="row callpage">
                <div className="col-lg-2 col-xl-2 p-0 m-0 pt-4">
                    <NavBarDetailStore isDesktop={true}></NavBarDetailStore>
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-10 col-xl-10 p-5 m-0 pt-4 desktop-table mamagethemes">
                    <div className="mamagethemes__header">
                        <div className="mamagethemes__header--title">Theme</div>
                        <div className="mamagethemes__header--btn-to-editor" onClick={goToEditor}>
                            <span style={{ paddingRight: '5px' }}>
                                <ViewIcon />
                            </span>
                            <span>
                                View your editor
                            </span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ManageThems;