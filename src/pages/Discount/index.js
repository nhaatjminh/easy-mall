import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { CustomButton } from "../../component/common/CustomButton/CustomButton";
import { CustomSearchInput } from "../../component/common/CustomSearchInput/CustomSearchInput";
import HeaderDetailStore from "../../component/HeaderDetailStore";
import NavBarDetailStore from "../../component/NavBarDetailStore";
import TableManage from "../../component/TableManage";
import { Key } from "../../constants/constForNavbarDetail";
import { useDebounce } from "../../hooks/useDebounce";
import { doDeleteSelectedDiscounts, doGetDiscounts } from "../../redux/slice/discountSlice";
import './index.scss'

const collumns = [
    {
        id: 'code',
        label: 'Code',
        minWidth: 200,
        align: 'left'
    },
    {
        id: 'status',
        label: 'Status',
        minWidth: 100,
        align: 'left'
    },
    {
        id: 'value',
        label: 'Value',
        minWidth: 300,
        align: 'left'
    },
];

const getStatus = (isEnd, endDate) => {

    if (!isEnd) return `<div class="discount__active-tag">Active</div>`;

    const __endDate = new Date(new Date(endDate).toLocaleString())
    if (__endDate > new Date(Date.now())) {
        return `<div class="discount__active-tag">Active</div>`
    }
    else {
        return `<div class="discount__expired-tag">Expired</div>`
    }
}

const getDiscountValue = (type, amount, currency) => {
    if (type === 1) {
        return `${currency === 'USD' ? '$' : ''}${amount}${currency === 'VND' ? 'VND' : ''} of all products`
    }
    else {
        return `${amount}% of all products`
    }
}

export const Discount = () => {
    let navigate = useNavigate()
    const params = useParams()

    const dispatch = useDispatch();
    const listDiscounts = useSelector((state) => state.discount.listDiscounts)
    const [data, setData] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const dbValue = useDebounce(searchValue, 300)

    useEffect(() => {
        dispatch(doGetDiscounts({
            storeId: params.storeId
        }))
    }, [])

    useEffect(() => {
        if (listDiscounts.length >= 0) {
            const list = listDiscounts?.map((item) => {
                return {
                    id: item.id,
                    code: item.code,
                    status: getStatus(item.is_end, item.end_at),
                    value: getDiscountValue(item.type, item.amount, item.currency),
                }
            })
            setData(list)
        }
    }, [listDiscounts])

    useEffect(() => {
        dispatch(doGetDiscounts({
            storeId: params.storeId,
            params: {
                code: searchValue
            }
        }))
    }, [dbValue])

    const handleEdit = (selected) => {
        navigate(`/store-detail/manage-discount/${params.storeId}/${selected}`)
    }

    const handleDelete = (selected) => {
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
                dispatch(doDeleteSelectedDiscounts(selected))
                .then(() => {
                    Swal.close();
                    Swal.fire({
                        icon: 'success',
                        title: 'Success!',
                        text: 'Delete discounts successfully!',
                    }).then((result) => {
                        // returnTable();
                    })
                })
            }
        })
    }

    return (
        <div>
            <HeaderDetailStore keySelected={Key.Discount} />
            <div className="row callpage">
                <div className="col-lg-2 col-xl-2 p-0 m-0 pt-4">
                    <NavBarDetailStore isDesktop={true} keySelected={Key.Discount}></NavBarDetailStore>
                </div>
                <div className="discount col-12 col-sm-12 col-md-12 col-lg-10 col-xl-10 p-5 pt-4 desktop-table">
                    <div className="discount__header">
                        <div className="text-title-1">
                            Discounts
                        </div>
                        <CustomButton onClick={() => navigate(`/store-detail/manage-discount/${params.storeId}/new`)}>
                            Create discount
                        </CustomButton>
                    </div>
                    <div className="discount__search">
                        <CustomSearchInput
                            placeholder='Search code'
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                    </div>
                    <div className="discount__list">
                        {/* {listDiscounts?.map((item) =>
                            <div onClick={() => navigate(`/store-detail/manage-discount/${params.storeId}/${item.id}`)}>
                                {item.code}
                            </div>
                        )} */}

                        <TableManage
                            data={data}
                            columnsOfData={collumns}
                            editFunction={handleEdit}
                            deleteAllFunction={handleDelete}
                        />
                    </div>
                </div>
            </div>
        </div >
    )
}