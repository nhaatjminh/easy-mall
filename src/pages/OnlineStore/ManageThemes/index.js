import React, { useEffect, useState } from "react";
import { ViewIcon } from '../../../assets/icon/svg/ViewIcon';
import './index.scss'
import HeaderDetailStore from './../../../component/HeaderDetailStore/index';
import NavBarDetailStore from "../../../component/NavBarDetailStore";
import { useParams } from 'react-router-dom';
import { StoreApi } from "../../../service/api";
import { Key } from "../../../constants/constForNavbarDetail";
import { LoadingModal } from "../../../component/common/LoadingModal/LoadingModal";
import { SlideCard } from "../../../component/common/SildeCard/SlideCard";
import { CustomCard } from './../../../component/common/CustomCard/CustomCard';
import themeImg from '../../../assets/image/temp.png'
import { GridIcon } from './../../../assets/icon/svg/GridIcon';
import { BasicButton } from "../../../component/common/BasicButton/CustomButton";
import { CustomButton } from './../../../component/common/CustomButton/CustomButton';
import { useDispatch, useSelector } from "react-redux";
import { doGetCurrentTemplate, doPublish } from "../../../redux/slice/themeSlice";
import Swal from "sweetalert2";
import { ThemeCollection } from "../../../component/Themes/ThemeCollection/ThemeCollection";

const ManageThems = () => {
    const params = useParams();
    const [homePageId, setHomePageId] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showThemeModal, setShowThemeModal] = useState(false);
    const [themeType, setThemeType] = useState(false);
    const [collectionName, setCollectionName] = useState('');
    const currentTemplate = useSelector((state) => state.theme.currentTemplate)
    const currentStore = useSelector((state) => state.listStore.currentStore)
    const dispatch = useDispatch()

    useEffect(() => {
        const query = {
            name: 'Home'
        }

        setIsLoading(true)
        Promise.all([
            dispatch(doGetCurrentTemplate(params.storeId)),
            StoreApi.getPagesByStoreId(params.storeId, query)
        ]).then((res) => {
            setHomePageId(res[1]?.data[0]?.id)
            setIsLoading(false)
        })

    }, [])

    useEffect(() => {

    }, [])

    const goToEditor = () => {
        window.open(process.env.REACT_APP_EDITOR_URL + `/editor/${params.storeId}?pageId=${homePageId}`);
    }

    const handleViewStore = () => {
        let url = currentStore.store_link
        if (!currentStore.store_link.includes('https://') && !currentStore.store_link.includes('http://')) {
            url = 'http://' + url
        }
        window.open(url)
    }

    const publish = () => {
        Swal.fire({
            icon: 'warning',
            title: 'Do you want to publish?',
            confirmButtonText: 'Yes',
            showCancelButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                setIsLoading(true)
                dispatch(doPublish(params.storeId))
                    .then(() => {
                        Swal.fire({
                            icon: 'success',
                            title: 'Success!',
                            text: 'Publish successfully!',
                        })
                        setIsLoading(false)
                    })
            }
        })
    }

    return (
        <div>
            <HeaderDetailStore keySelected={Key.Theme} />
            <div className="row callpage">
                <div className="col-lg-2 col-xl-2 p-0 m-0 pt-4">
                    <NavBarDetailStore isDesktop={true} keySelected={Key.Theme}></NavBarDetailStore>
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-10 col-xl-10 desktop-table mamagethemes">
                    <div className="mamagethemes__header">
                        <div className="mamagethemes__header--title">Theme</div>
                        <div
                            className="mamagethemes__header--btn-to-editor"
                            onClick={handleViewStore}
                        >
                            <span style={{ paddingRight: '5px' }}>
                                <ViewIcon />
                            </span>
                            <span>
                                View your store
                            </span>
                        </div>
                    </div>
                    <SlideCard className='mamagethemes__slide-card mamagethemes__current-theme' underline>
                        <div className="mamagethemes__current-theme--left mamagethemes__slide-card--left">
                            <div className="text-title-2">Current theme</div>
                            <div className="text-normal-2">This is the theme customers see when they visit your store.</div>
                        </div>
                        <CustomCard className="mamagethemes__current-theme--right" width='100%'>
                            <div className="mamagethemes__current-theme--right--header">
                                <div className="mamagethemes__current-theme--right--header--text">
                                    <div className="text-title-2">{currentTemplate?.name}</div>
                                    <div className="text-normal-2">Last save: today</div>
                                </div>
                                <BasicButton className="btn" onClick={publish}>Publish</BasicButton>
                                <CustomButton className="btn" onClick={goToEditor}>Customize</CustomButton>
                            </div>
                            <img className="mamagethemes__current-theme--right__img" src={currentTemplate?.thumbnail ? currentTemplate.thumbnail : themeImg} />
                        </CustomCard>
                    </SlideCard>

                    <SlideCard className='mamagethemes__slide-card mamagethemes__theme-lib'>
                        <div className="mamagethemes__slide-card--left">
                            <div className="text-title-2">Theme library</div>
                            <div className="text-normal-2">Manage your store's themes. Add and publish themes to change your online store's appearance.</div>
                            <BasicButton
                                style={{ margin: '10px 0' }}
                                onClick={() => {
                                    setShowThemeModal(true)
                                    setThemeType("STORE")
                                    setCollectionName("Your store's themes")
                                }}
                            >
                                View your store themes
                            </BasicButton>
                        </div>
                        <div className="mamagethemes__theme-lib--right">
                            <CustomCard>
                                <div className="mamagethemes__theme-lib__card">
                                    <div className="mamagethemes__theme-lib__card__icon">
                                        <GridIcon />
                                    </div>
                                    <div className="mamagethemes__theme-lib__card__content">
                                        <div className="mamagethemes__theme-lib__card__content__text">
                                            <div className="text-title-2">Free themes</div>
                                            <div className="text-normal-2">Explore Easy Mall's free themes, all designed to offer the best home page customization.</div>
                                        </div>
                                        <BasicButton
                                            className="mamagethemes__theme-lib__card__content__btn"
                                            onClick={() => {
                                                setShowThemeModal(true)
                                                setThemeType("FREE")
                                                setCollectionName("Free themes")
                                            }}
                                        >
                                            Explore free themes
                                        </BasicButton>
                                    </div>

                                </div>
                                <div className="mamagethemes__theme-lib__card__line"></div>
                                <div className="mamagethemes__theme-lib__card">
                                    <div className="mamagethemes__theme-lib__card__icon">
                                        <GridIcon />
                                    </div>
                                    <div className="mamagethemes__theme-lib__card__content">
                                        <div className="mamagethemes__theme-lib__card__content__text">
                                            <div className="text-title-2">Easy Mall Theme Store</div>
                                            <div className="text-normal-2">Browse free and selected paid themes using search and filter tools.</div>
                                        </div>
                                        <BasicButton
                                            className="mamagethemes__theme-lib__card__content__btn"
                                            onClick={() => {
                                                setShowThemeModal(true)
                                                setThemeType("PAID")
                                                setCollectionName("Theme store")
                                            }}
                                        >
                                            Visit theme store
                                        </BasicButton>
                                    </div>
                                </div>

                            </CustomCard>
                        </div>
                    </SlideCard>
                </div>
            </div>
            <ThemeCollection
                show={showThemeModal}
                setShow={setShowThemeModal}
                title={collectionName}
                storeId={params.storeId}
                type={themeType}
                setHomePageId={setHomePageId}
            />
            <LoadingModal show={isLoading} />
        </div>
    )
}

export default ManageThems;