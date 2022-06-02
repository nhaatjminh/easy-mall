import React, { useEffect, useState } from "react";
import './index.scss';
import NavBarDetailStore from "../../component/NavBarDetailStore";
import HeaderDetailStore from "../../component/HeaderDetailStore";
import { Key } from "../../constants/constForNavbarDetail";
import { CustomCard } from './../../component/common/CustomCard/CustomCard';
import { TagIcon } from './../../assets/icon/svg/TagIcon';
import { EditIcon } from './../../assets/icon/svg/EditIcon';
import { GridIcon } from './../../assets/icon/svg/GridIcon';
import { NavIcon } from './../../assets/icon/svg/NavIcon';
import { CustomButton } from "../../component/common/CustomButton/CustomButton";
import productImg from '../../assets/image/product.svg'
import themeImg from '../../assets/image/theme.svg'
import pageImg from '../../assets/image/page.svg'
import navigationImg from '../../assets/image/navigation.svg'
import { useNavigate, useParams } from 'react-router-dom';
import { LoadingModal } from "../../component/common/LoadingModal/LoadingModal";

const tabContent = {
  'product': {
    title: 'Add your first product',
    content: 'Add physical items, digital downloads, services, or anything else you dream up.',
    btn: 'Add product'
  },
  'theme': {
    title: 'Edit the look and feel of your online store',
    content: 'Choose a theme and add your logo, colors, and images to reflect your brand.',
    btn: 'Customize theme'
  },
  'page': {
    title: 'Add pages to your online store',
    content: 'Share your brand story and build trust with customers. Create pages that describe who you are and how people can contact you.',
    btn: 'Add pages'
  },
  'navigation': {
    title: 'Organize your online store navigation',
    content: 'Help customers to find what they are looking for by organizing the pages on your online store.',
    btn: 'Organize navigation'
  },
}

const tabImg = {
  'product': productImg,
  'theme': themeImg,
  'page': pageImg,
  'navigation': navigationImg,
}

const ManageHome = () => {
  const [tab, setTab] = useState('product');
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000)
  }, [])

  return (
    <>
      <HeaderDetailStore ></HeaderDetailStore>
      <div className="row callpage" >
        <div className="col-lg-2 col-xl-2 p-0 m-0 pt-4 navbar-detail">
          <NavBarDetailStore isDesktop={true} keySelected={Key.Home}></NavBarDetailStore>
        </div>
        <div className="manage-home col-12 col-sm-12 col-md-12 col-lg-10 col-xl-10 p-0 m-0 pt-4 desktop-table main-content-manage">
          {isLoading ? null :
            <CustomCard className="manage-home__main">
              <div className="manage-home__main__title text-title-1">You're off to a great start.</div>
              <div className="manage-home__main__body">
                <div className="manage-home__main__tabs">
                  <div
                    className={`manage-home__main__tab ${tab === 'product' ? 'manage-home__main__tab--active' : ''}`}
                    onClick={() => setTab('product')}>
                    <span className="manage-home__main__tab--icon"><TagIcon /></span>
                    <span className="manage-home__main__tab--title text-normal-2 font-weight-bold">Add Product</span>
                  </div>
                  <div
                    className={`manage-home__main__tab ${tab === 'theme' ? 'manage-home__main__tab--active' : ''}`}
                    onClick={() => setTab('theme')}>
                    <span className="manage-home__main__tab--icon"><EditIcon /></span>
                    <span className="manage-home__main__tab--title text-normal-2 font-weight-bold">Customize theme</span>
                  </div>
                  <div
                    className={`manage-home__main__tab ${tab === 'page' ? 'manage-home__main__tab--active' : ''}`}
                    onClick={() => setTab('page')}>
                    <span className="manage-home__main__tab--icon"><GridIcon /></span>
                    <span className="manage-home__main__tab--title text-normal-2 font-weight-bold">Add pages</span>
                  </div>
                  <div
                    className={`manage-home__main__tab ${tab === 'navigation' ? 'manage-home__main__tab--active' : ''}`}
                    onClick={() => setTab('navigation')}>
                    <span className="manage-home__main__tab--icon"><NavIcon /></span>
                    <span className="manage-home__main__tab--title text-normal-2 font-weight-bold">Organize navigation</span>
                  </div>
                </div>

                <div className="manage-home__main__content">
                  <div className="manage-home__main__content--title">
                    {tabContent[tab].title}
                  </div>
                  <div className="manage-home__main__content--content text-normal-1">
                    {tabContent[tab].content}
                  </div>
                  <CustomButton
                    className="manage-home__main__content--btn"
                    content={tabContent[tab].btn}
                    onClick={() => navigate(`/store-detail/manage-${tab}/${params.storeId}`)}
                  />
                </div>

                <div className="manage-home__main__illustration">
                  <img src={tabImg[tab]} />
                </div>
              </div>
            </CustomCard>
          }
        </div>
      </div>

      <LoadingModal show={isLoading} />
    </>
  );
}

export default ManageHome;