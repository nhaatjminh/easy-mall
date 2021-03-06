import React, { useEffect, useRef, useState } from "react";
import "./index.scss";
import _ from "lodash";

import { useParams } from "react-router-dom";
import { batch, useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import HeaderDetailStore from "../../../../component/HeaderDetailStore";
import NavBarDetailStore from "../../../../component/NavBarDetailStore";
import { CustomInput } from "../../../../component/common/CustomInput/CustomInput";
import { CustomCard } from "./../../../../component/common/CustomCard/CustomCard";
import { AddIcon } from "../../../../assets/icon/svg/AddIcon";
import {
  doDeleteMenu,
  doGetCurrentMenu,
  doUpdateMenu,
  doUpdateSubMenu,
} from "../../../../redux/slice/navigationSlice";
import { Button, Modal } from "react-bootstrap";

import { BackIcon } from "../../../../assets/icon/svg/BackIcon";
import { useNavigate } from "react-router-dom";
import { Key } from "../../../../constants/constForNavbarDetail";
import { doGetListPages } from "./../../../../redux/slice/pageSlice";
import { ConfirmModal } from "./../../../../component/common/ConfirmModal/ConfirmModal";
import { LoadingModal } from "./../../../../component/common/LoadingModal/LoadingModal";
import { CustomButton } from "../../../../component/common/CustomButton/CustomButton";
import { ExternalLinkIcon } from "../../../../assets/icon/svg/ExternalLinkIcon";
import { BasicButton } from "../../../../component/common/BasicButton/CustomButton";
import { XIcon } from "../../../../assets/icon/svg/XIcon";
import { PageIcon } from "./../../../../assets/icon/svg/PageIcon";
import { useDebounce } from "./../../../../hooks/useDebounce";
import { removeSpace } from "./../../../../helpers/common";
import validator from "validator";
import { TextError } from "../../../../component/common/TextError/TextError";
import { HomeIcon } from "../../../../assets/icon/svg/HomeIcon";
import { TagIcon } from "./../../../../assets/icon/svg/TagIcon";
import { CartIcon } from "../../../../assets/icon/svg/CartIcon";
import { CollectionIcon } from "../../../../assets/icon/svg/CollectionIcon";
import { PaymentIcon } from "../../../../assets/icon/svg/PaymentIcon";
import { PolocyIcon } from "../../../../assets/icon/svg/PolocyIcon";
import { GoIcon } from "./../../../../assets/icon/svg/GoIcon";
import CustomSortableTree from "../../../../component/CustomSortableTree";

import {
  addNodeUnderParent,
  removeNodeAtPath,
  changeNodeAtPath,
  toggleExpandedForAll,
} from "react-sortable-tree";
const DefaultPage = {
  Home: <HomeIcon />,
  Products: <TagIcon />,
  Collections: <CollectionIcon />,
  Cart: <CartIcon />,
  Payment: <PaymentIcon />,
};

const DetailMenu = ({ }) => {
  const menu = useSelector((state) => state.navigation.currentMenu);
  const isLoading = useSelector((state) => state.navigation.isLoading);
  const listPage = useSelector((state) => state.page.listPages);
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const [displayPages, setDisplayPages] = useState({
    default: [],
    pages: [],
    other: [],
    external: [],
  });
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [preLink, setPreLink] = useState("");
  const [mode, setMode] = useState("ADD");
  const [updateItemId, setUpdateItemId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [openDeleteMenuModal, setOpenDeleteMenuModal] = useState(false);
  const [showPageLinks, setShowPageLinks] = useState(false);
  const [linkValue, setLinkValue] = useState("");
  const [isEditTitle, setIsEditTitle] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const dbValue = useDebounce(link, 300);
  const [icon, setIcon] = useState("page");
  const [err, setErr] = useState({});
  const [groupItem, setGroupItem] = useState(null);
  const [isDisable, setIsDisable] = useState(false);
  const [treeData, setTreeData] = useState([]);
  const [oldTree, setOldTree] = useState({});
  const nameMounted = useRef(false);
  const linkMounted = useRef(false);
  const titleMounted = useRef(false);
  const clicked = useRef(false);
  const __rowInfo = useRef({});
  window.onbeforeunload = function () {
    if (!_.isEqual(treeData, oldTree)) {
      return "";
    }
  }.bind(this);
  useEffect(() => {
    batch(() => {
      dispatch(doGetCurrentMenu(params.id)).then((res) => {
        let listMenuItem = [];
        if (res.payload.listMenuItem) {
          listMenuItem = res.payload.listMenuItem;
        }
        setTreeData(listMenuItem);
        setOldTree(listMenuItem);
      });
      dispatch(doGetListPages(params.storeId));
    });
  }, []);

  useEffect(() => {
    if (menu.name) setTitle(menu.name);
  }, [menu.name]);

  useEffect(() => {
    if (listPage && listPage.length > 0) {
      const result = listPage.reduce(
        (list, item) => {
          if (item.is_default) {
            if (DefaultPage[item.name]) list.default.push(item);
            else list.other.push(item);
          } else list.pages.push(item);

          return list;
        },
        {
          default: [],
          pages: [],
          other: [],
          external: [],
        }
      );

      setDisplayPages(result);
    }
  }, [listPage]);

  useEffect(() => {
    if (nameMounted.current) {
      if (removeSpace(name) === "") {
        setErr({
          ...err,
          name: "Name is requried",
        });
      } else {
        setErr({
          ...err,
          name: null,
        });
      }
    } else {
      nameMounted.current = true;
    }
  }, [name]);

  useEffect(() => {
    if (titleMounted.current) {
      if (removeSpace(title) === "") {
        setErr({
          ...err,
          title: "Title is requried",
        });
      } else {
        setErr({
          ...err,
          title: null,
        });
      }
    } else {
      titleMounted.current = true;
    }
  }, [title]);

  useEffect(() => {
    if (linkMounted.current) {
      if (linkValue === "") {
        setErr({
          ...err,
          link: "Link needs to be a URL address",
        });
      } else {
        setErr({
          ...err,
          link: null,
        });
      }
    } else {
      linkMounted.current = true;
    }
  }, [linkValue]);

  useEffect(() => {
    let externalResult = [];

    // from external link
    if (link.includes(".") && validator.isURL(link)) {
      if (
        link.substring(0, 8) === "https://" ||
        link.substring(0, 7) === "http://"
      ) {
        externalResult.push({
          id: 0,
          page_url: link,
          name: link,
        });
      } else {
        const url = "https://" + link;
        externalResult.push({
          id: 0,
          page_url: url,
          name: url,
        });
      }
    }

    // from pages of store
    const defaultResult = displayPages.default.reduce((list, item) => {
      const s = removeSpace(link).toLowerCase();
      if (item.name.toLowerCase().includes(s)) {
        list.push(item);
      }
      return list;
    }, []);

    const pagesResult = displayPages.pages.reduce((list, item) => {
      const s = removeSpace(link).toLowerCase();
      if (item.name.toLowerCase().includes(s)) {
        list.push(item);
      }
      return list;
    }, []);

    const otherResult = displayPages.other.reduce((list, item) => {
      const s = removeSpace(link).toLowerCase();
      if (item.name.toLowerCase().includes(s)) {
        list.push(item);
      }
      return list;
    }, []);

    setSearchResult({
      default: defaultResult,
      pages: pagesResult,
      other: otherResult,
      external: externalResult,
    });
  }, [dbValue, displayPages]);

  const getIcon = ({ name, link }) => {
    if (link === "") return null;
    if (DefaultPage[name]) return DefaultPage[name];
    if (link[0] === "/") {
      if (link.substring(1, 7) === "pages/") return <PageIcon />;
      else return <PolocyIcon />;
    } else return <ExternalLinkIcon />;
  };

  const renderItem = (item) => {
    return (
      <div
        key={item.id}
        className="detail-menu__add-item-modal--link--list--link-item"
        onMouseDown={() => {
          clicked.current = true;
          setLink(item.name);
          setLinkValue(item.page_url);
          setPreLink(item.name);
          setShowPageLinks(false);
          setIcon(item.type === 1 ? "page" : "external");
        }}
      >
        {/* <span>{DefaultPage[item.name] ? DefaultPage[item.name] : null}</span> */}
        <span>{getIcon({name: item.name, link: item.page_url})}</span>
        <span className=" text-normal-1">{item.name}</span>
      </div>
    );
  };

  const renderGroupItem = (group, type) => {
    return (
      <div
        // key={item.id}
        className="detail-menu__add-item-modal--link--list--link-item"
        style={{ display: "flex" }}
        onMouseDown={() => {
          clicked.current = true;
          setGroupItem(group);
        }}
      >
        <span>
          {type === "Pages" ? (
            <PageIcon />
          ) : type === "Other" ? (
            <PolocyIcon />
          ) : null}
        </span>
        <span className=" text-normal-1">{type}</span>
        <span style={{ marginLeft: "auto" }}>
          <GoIcon />
        </span>
      </div>
    );
  };

  const getPageNameFromUrl = (url) => {
    const index = listPage?.findIndex((item) => item.page_url === url);
    if (index >= 0) {
      return listPage[index].name;
    }
    return "";
  };

  const checkErr = () => {
    let error = {};
    if (removeSpace(name) === "") {
      error.name = "Name is requried";
    }
    if (linkValue === "") {
      error.link = "Link needs to be a URL address";
    }
    if (Object.keys(error).length) {
      setErr(error);
    }
    return Object.keys(error).length;
  };

  const handleCloseModal = () => {
    setName("");
    setLink("");
    setLinkValue("");
    setPreLink("");
    setErr({});
    setShowModal(false);

    nameMounted.current = false;
    linkMounted.current = false;
  };

  const handleEditMenu = () => {
    if (err.title) return;

    if (removeSpace(title) === "") {
      setErr({
        ...err,
        title: "Title is requried",
      });
      return;
    }

    dispatch(
      doUpdateMenu({
        id: menu.id,
        name: removeSpace(title),
      })
    );
    setIsEditTitle(false);
  };

  const handleDeleteMenu = () => {
    dispatch(doDeleteMenu(menu.id)).then(() => navigate(-1));
  };
  // Menu items
  const hanndleAddNewMenuItem = () => {
    if (checkErr()) return;
    const newTree = addNodeUnderParent({
      treeData: treeData,
      parentKey: null,
      expandParent: true,
      getNodeKey,
      newNode: {
        title: removeSpace(name),
        link: linkValue,
      },
    });
    setTreeData(newTree.treeData);
    handleCloseModal();
    // dispatch(
    //   doUpdateSubMenu({
    //     menu_id: menu.id,
    //     data: {
    //       listMenuItem: newTree.treeData,
    //     },
    //   })
    // ).then((res) => {
    //   setTreeData(newTree.treeData);
    //   setIsDisable(true)
    //   handleCloseModal();
    // });
  };

  const handleEitMenuItem = () => {
    if (checkErr()) return;
    const { node, path } = __rowInfo.current;
    const { children } = node;
    const newTree = changeNodeAtPath({
      treeData,
      path,
      getNodeKey,
      newNode: {
        children,
        title: removeSpace(name),
        link: linkValue,
      },
    });
    setTreeData(newTree);
    handleCloseModal();
    // dispatch(
    //   doUpdateSubMenu({
    //     menu_id: menu.id,
    //     data: {
    //       listMenuItem: newTree,
    //     },
    //   })
    // ).then((res) => {
    //   setTreeData(newTree);
    //   setIsDisable(true)
    //   handleCloseModal();
    // });
    __rowInfo.current = {};
  };
  const handleDeleteMenuItem = () => {
    const { path } = __rowInfo.current;
    const newNode = removeNodeAtPath({
      treeData,
      path,
      getNodeKey,
    });
    setOpenConfirmModal(false);
    setTreeData(newNode);
    // dispatch(
    //   doUpdateSubMenu({
    //     menu_id: menu.id,
    //     data: {
    //       listMenuItem: newNode,
    //     },
    //   })
    // ).then((res) => {
    //   setIsDisable(true)
    //   setOpenConfirmModal(false);
    //   setTreeData(newNode);
    // });
    __rowInfo.current = {};
  };
  const updateSubMenu = () => {
    dispatch(
      doUpdateSubMenu({
        menu_id: menu.id,
        data: {
          listMenuItem: treeData,
        },
      })
    ).then(() => {
      setOldTree(treeData);
    });
  };

  const _handleEditMenuItem = (rowInfo) => {
    setMode("EDIT");
    setUpdateItemId(rowInfo.node.id);
    setName(rowInfo.node.title);
    setLink(
      rowInfo.node.link[0] === "/"
        ? getPageNameFromUrl(rowInfo.node.link)
        : rowInfo.node.link
    );
    setPreLink(
      rowInfo.node.link[0] === "/"
        ? getPageNameFromUrl(rowInfo.node.link)
        : rowInfo.node.link
    );
    setLinkValue(rowInfo.node.link);
    setShowModal(true);
    __rowInfo.current = rowInfo;
  };
  const _handleDeleteMenuItem = (rowInfo) => {
    setOpenConfirmModal(true);
    __rowInfo.current = rowInfo;
  };

  const getNodeKey = ({ treeIndex }) => treeIndex;
  return (
    <div>
      <HeaderDetailStore keySelected={Key.Navigation} />
      <div className="row callpage">
        <div className="col-lg-2 col-xl-2 p-0 m-0 pt-4">
          <NavBarDetailStore
            isDesktop={true}
            keySelected={Key.Navigation}
          ></NavBarDetailStore>
        </div>
        <div className="detail-menu col-12 col-sm-12 col-md-12 col-lg-10 col-xl-10 p-5 pt-4 desktop-table">
          <div className="detail-menu__header">
            <span
              onClick={() => navigate(-1)}
              className="detail-menu__header--back-icon"
            >
              <BackIcon />
            </span>
            <span className="detail-menu__header--title text-title-1">
              {menu.name}
            </span>
          </div>
          <CustomCard className="detail-menu__edit-title">
            <div className="detail-menu__edit-title--text text-normal-1">
              Title
            </div>
            <div className="detail-menu__edit-title--input">
              <CustomInput
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={!isEditTitle || menu.is_default}
                warning={err.title}
              />
              {menu.is_default ? null : isEditTitle ? (
                <>
                  <CustomButton
                    style={{
                      backgroundColor: "white",
                      color: "black",
                      border: "1px solid #c9cccf",
                      height: "fit-content",
                      marginLeft: "15px",
                      width: "70px",
                      textAlign: "center",
                      "&:hover": {
                        background: "#f6f6f7",
                      },
                    }}
                    onClick={() => {
                      setIsEditTitle(false);
                      setErr({});
                      setTitle(menu.name);
                    }}
                  >
                    Cancel
                  </CustomButton>
                  <CustomButton
                    style={{
                      height: "fit-content",
                      marginLeft: "15px",
                      width: "70px",
                      textAlign: "center",
                    }}
                    onClick={() => handleEditMenu()}
                  >
                    Save
                  </CustomButton>
                </>
              ) : (
                <CustomButton
                  style={{
                    backgroundColor: "white",
                    color: "black",
                    border: "1px solid #c9cccf",
                    height: "fit-content",
                    marginLeft: "15px",
                    width: "70px",
                    textAlign: "center",
                    "&:hover": {
                      background: "#f6f6f7",
                    },
                  }}
                  onClick={() => {
                    setIsEditTitle(true);
                  }}
                >
                  Edit
                </CustomButton>
              )}
            </div>
            {isEditTitle && err.title ? (
              <TextError>{err.title}</TextError>
            ) : null}
          </CustomCard>

          <CustomCard className="detail-menu__menu">
            <div className="detail-menu__menu--title text-title-2">
              Menu items
            </div>
            {/* Menu List */}
            <CustomSortableTree
              maxDepth={3}
              data={treeData}
              setData={setTreeData}
              deleteFunc={_handleDeleteMenuItem}
              editFunc={_handleEditMenuItem}
              onChange={(treeData) => {
                setTreeData(treeData);
              }}
            />

            <div
              className="detail-menu__menu--add"
              onClick={() => {
                setMode("ADD");
                setShowModal(true);
              }}
            >
              <span className="detail-menu__menu--add--icon">
                <AddIcon />
              </span>
              <span className="detail-menu__menu--add--text text-normal-1">
                Add menu item
              </span>
            </div>
          </CustomCard>

          <div className="detail-menu__group-btn">
            {!menu.is_default ? (
                <Button
                  variant="outline-danger"
                  onClick={() => setOpenDeleteMenuModal(true)}
                >
                  Delete menu
                </Button>
            ) : null}
            <Button
              variant="success"
              className="detail-menu__group-btn__save"
              disabled={_.isEqual(treeData, oldTree)}
              onClick={updateSubMenu}
            >
              Save
            </Button>
          </div>

          {/* <CustomButton
            disabled={_.isEqual(treeData, oldTree)}
            className="SaveSubMenu-btn"
            style={{
              height: "fit-content",
              marginLeft: "auto",
              marginTop: "40px",
              width: "70px",
              textAlign: "center",
            }}
            onClick={updateSubMenu}
          >
            Save
          </CustomButton> */}
          {/* <button onClick={updateSubMenu}>Save</button> */}
        </div>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <div className="text-title-1">
            {mode === "ADD" ? "Add menu item" : name}
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="detail-menu__add-item-modal--name">
            <div className="text-normal-1">Name</div>
            <CustomInput
              placeholder="e.g About us"
              value={name}
              onChange={(e) => setName(e.target.value)}
              warning={err.name}
            />
            {err.name ? <TextError>{err.name}</TextError> : null}
          </div>
          <div className="detail-menu__add-item-modal--link">
            <div className="text-normal-1">Link</div>
            <div className="detail-menu__add-item-modal--link__input-group">
              <CustomInput
                placeholder="Link to your page or external link"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                onFocus={() => setShowPageLinks(true)}
                warning={err.link}
                onBlur={() => {
                  setTimeout(() => {
                    if (!clicked.current) {
                      setShowPageLinks(false);
                      setGroupItem(null);
                      if (link !== preLink) {
                        setLink(preLink);
                      }
                    } else {
                      clicked.current = false;
                    }
                    // if (isClick) {
                    //     setShowPageLinks(false)
                    //     setLink(preLink)
                    //     setIsClick(false)
                    // }
                  }, 100);
                }}
                icon={getIcon({ name: link, link: linkValue })}
              />
              <BasicButton
                className="detail-menu__add-item-modal--link__input-group__clear-btn"
                onClick={() => {
                  setLink("");
                  setPreLink("");
                  setLinkValue("");
                }}
              >
                <XIcon />
              </BasicButton>
            </div>
            {err.link ? <TextError>{err.link}</TextError> : null}
            {showPageLinks ? (
              <CustomCard className="detail-menu__add-item-modal--link--list">
                {groupItem ? (
                  <>
                    <div
                      className="detail-menu__add-item-modal--link--list--link-item"
                      onClick={() => setGroupItem(null)}
                    >
                      <span>
                        <BackIcon />
                      </span>
                      <span className="text-normal-1">Back</span>
                    </div>
                    {groupItem?.map((item) => renderItem(item))}
                  </>
                ) : (
                  <>
                    {!searchResult.default.length &&
                    !searchResult.pages.length &&
                    !searchResult.other.length &&
                    !searchResult.external.length ?
                    <div 
                      style={{
                        marginTop: '-10px',
                        marginBottom: '-10px'
                      }}
                      className="text-normal-2"
                    >
                      No results
                    </div> 
                    : null
                    }
                    {searchResult.default?.map((item) => renderItem(item))}
                    {searchResult.pages.length
                      ? renderGroupItem(searchResult.pages, "Pages")
                      : null}
                    {searchResult.other.length
                      ? renderGroupItem(searchResult.other, "Other")
                      : null}
                    {searchResult.external?.map((item) => renderItem(item))}
                  </>
                )}
              </CustomCard>
            ) : null}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="detail-menu__add-item-modal--btn">
            <Button className="btn btn-secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button
              className="btn btn-success"
              onMouseDown={
                mode === "ADD" ? hanndleAddNewMenuItem : handleEitMenuItem
              }
            >
              {mode === "ADD" ? "Add" : "Save"}
            </Button>
          </div>
        </Modal.Footer>
      </Modal>

      <ConfirmModal
        show={openConfirmModal}
        setShow={setOpenConfirmModal}
        title="Remove menu item?"
        content={`This will remove this menu item.`}
        onConfirm={handleDeleteMenuItem}
      />

      <ConfirmModal
        show={openDeleteMenuModal}
        setShow={setOpenDeleteMenuModal}
        title="Delete this menu?"
        content={`Are you sure you want to delete this menu? This can't be undone.`}
        onConfirm={handleDeleteMenu}
      />
      <LoadingModal show={isLoading} />
    </div>
  );
};

export default DetailMenu;
