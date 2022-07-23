import React, { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import HeaderDetailStore from "../../../component/HeaderDetailStore";
import NavBarDetailStore from "../../../component/NavBarDetailStore";
import { Key } from "../../../constants/constForNavbarDetail";
import './index.scss'
import { BackIcon } from './../../../assets/icon/svg/BackIcon';
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { BlankCard } from "../../../component/common/BlankCard/BlankCard";
import { CustomInput } from "../../../component/common/CustomInput/CustomInput";
import { BasicButton } from "../../../component/common/BasicButton/CustomButton";
import { Checkbox, FormControl, FormControlLabel, MenuItem, Radio, RadioGroup, Select, TextField } from "@mui/material";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from "@mui/x-date-pickers";
import { useDebounce } from './../../../hooks/useDebounce';
import { useDidMountEffect } from './../../../hooks/useDidMountEffct';
import { DiscountApi } from './../../../service/api/discountApi';
import { Loader } from './../../../component/common/Loader/Loader';
import { TextError } from './../../../component/common/TextError/TextError';
import { useDispatch, useSelector } from "react-redux";
import { getDateTime, removeSpace } from './../../../helpers/common';
import { doCreateDiscount } from "../../../redux/slice/discountSlice";
import { LoadingModal } from './../../../component/common/LoadingModal/LoadingModal';

export const CreateDiscount = () => {
    let navigate = useNavigate()
    const params = useParams()

    const [code, setCode] = useState('');
    const [currency, setCurrency] = useState('VND');
    const [valueType, setValueType] = useState(0);
    const [discountValue, setDiscountValue] = useState(0);
    const [discountPercent, setDiscountPercent] = useState(0);
    const [requireValue, setRequireValue] = useState(0);
    const [limitValue, setLimitValue] = useState(0);
    const [selected, setSelected] = useState(0);
    const [isLimit, setIsLimit] = useState(false);
    const [startDate, setStartDate] = useState(new Date(Date.now()))
    const [startTime, setStartTime] = useState(new Date(Date.now()))
    const [endDate, setEndDate] = useState(new Date(Date.now()))
    const [endTime, setEndTime] = useState(new Date(Date.now()))
    const [isEnd, setIsEnd] = useState(false);
    const [codeErr, setCodeErr] = useState('');
    const [isGerenating, setIsGenerating] = useState(false);
    const codeRef = useRef();

    const dispatch = useDispatch();
    const isLoading = useSelector((state) => state.discount.isLoading)
    const dbValue = useDebounce(code, 300);

    useDidMountEffect(() => {
        if (isGerenating) return;
        if (!removeSpace(code)) {
            setCodeErr('You must enter code')
            return;
        }
        DiscountApi.checkCode({ store_id: params.storeId, code: code })
            .then((res) => {
                if (res.data) setCodeErr('This code already exist!')
                else {
                    if (codeErr) setCodeErr('')
                }
            })
    }, [dbValue])

    const hanldeGeneratecode = () => {
        setIsGenerating(true)
        DiscountApi.generateCode({ store_id: params.storeId })
            .then((res) => {
                setCode(res.data)
                setIsGenerating(false)
            })
            .catch((err) => {
                console.log(err)
                setIsGenerating(false)
            })
    }

    const handleCreateDiscount = () => {
        if (!removeSpace(code)) {
            setCodeErr('You must enter code')
            codeRef.current.scrollIntoView({ block: 'center', behavior: 'smooth' })
            return;
        }
        if (codeErr) {
            codeRef.current.scrollIntoView({ block: 'center', behavior: 'smooth' })
            return;
        }

        dispatch(doCreateDiscount({
            store_id: params.storeId,
            code: code,
            currency: currency,
            start_at: getDateTime(startDate, startTime),
            type: valueType,
            amount: valueType ? discountValue : discountPercent,
            quantity: isLimit ? limitValue : -1,
            condition_type: parseInt(selected),
            condition: parseInt(selected) ? requireValue : undefined,
            is_end: isEnd,
            end_at: isEnd ? getDateTime(endDate, endTime) : undefined
        }))
            .then((res) => {
                navigate(-1)
            })
    }

    return (
        <div>
            <HeaderDetailStore keySelected={Key.Discount} />
            <div className="row callpage">
                <div className="col-lg-2 col-xl-2 p-0 m-0 pt-4">
                    <NavBarDetailStore isDesktop={true} keySelected={Key.Discount}></NavBarDetailStore>
                </div>
                <div className="create-discount col-12 col-sm-12 col-md-12 col-lg-10 col-xl-10 p-5 pt-4 desktop-table">
                    <div className="create-discount__header">
                        <span
                            style={{
                                cursor: 'pointer',
                                marginRight: 15
                            }}
                            onClick={() => navigate(-1)}
                        >
                            <BackIcon />
                        </span>
                        <span className="text-title-1">
                            Create discount
                        </span>
                    </div>
                    <Row>
                        <Col md={8} sm={12}>
                            <BlankCard className='create-discount__code-card'>
                                <Card.Body className="create-discount__code-card__header">
                                    <div className="text-title-2">Amount off order</div>
                                    <div className="text-normal-2">Order discount</div>
                                </Card.Body>
                                <Card.Body className="create-discount__code-card__body">
                                    <div className="text-normal-1">Discount code</div>
                                    <div ref={codeRef} className="create-discount__code-card__body__code-input">
                                        <CustomInput
                                            value={code}
                                            onChange={(e) => setCode(e.target.value)}
                                            warning={codeErr}
                                        />
                                        <BasicButton
                                            style={{
                                                marginLeft: '15px',
                                                display: 'flex'
                                            }}
                                            onClick={hanldeGeneratecode}
                                        >
                                            {isGerenating ?
                                                <span>
                                                    <Loader className='create-discount__code-card__loader' />
                                                </span>
                                                : null}
                                            <span>Generate</span>
                                        </BasicButton>
                                    </div>
                                    {codeErr ? <TextError>{codeErr}</TextError> : null}
                                    <div className="create-discount__code-card__currency">
                                        <div className="text-normal-1">Currency: </div>
                                        <Form.Select
                                            style={{ width: 'fit-content' }}
                                            className="text-normal-1"
                                            value={currency}
                                            onChange={(e) => setCurrency(e.target.value)}
                                        >
                                            <option className="text-normal-1" value='USD'>USD</option>
                                            <option className="text-normal-1" value='VND'>VND</option>
                                        </Form.Select>
                                    </div>
                                    <div className="text-normal-2">Customers must enter this code at checkout.</div>
                                </Card.Body>
                            </BlankCard>

                            <BlankCard className='create-discount__value-card'>
                                <Card.Body>
                                    <div className="text-title-2">
                                        Value
                                    </div>
                                    <Row>
                                        <Col md={6} sm={12}>
                                            <div className="create-discount__value-card__tabs">
                                                <div
                                                    className={`create-discount__value-card__tabs--item ${valueType === 0 ? 'create-discount__value-card__tabs--item--active' : ''}`}
                                                    onClick={() => setValueType(0)}
                                                >
                                                    Percentage
                                                </div>
                                                <div
                                                    className={`create-discount__value-card__tabs--item ${valueType === 1 ? 'create-discount__value-card__tabs--item--active' : ''}`}
                                                    onClick={() => setValueType(1)}
                                                >
                                                    Fixed amount
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md={6} sm={12}>
                                            {valueType ?
                                                <CustomInput
                                                    value={discountValue}
                                                    onChange={(e) => setDiscountValue(e.target.value)}
                                                    icon={currency === 'USD' ? '$' : null}
                                                    unit={currency !== 'USD' ? 'VND' : null}
                                                /> :
                                                <CustomInput
                                                    value={discountPercent}
                                                    onChange={(e) => setDiscountPercent(e.target.value)}
                                                    unit='%'
                                                />
                                            }
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </BlankCard>

                            <BlankCard className='create-discount__condition-card'>
                                <Card.Body>
                                    <div className="text-title-2">Minimum purchase requirements</div>
                                    <FormControl>
                                        <RadioGroup
                                            aria-labelledby="demo-radio-buttons-group-label"
                                            defaultValue='0'
                                            value={selected}
                                            onChange={(e) => {
                                                setRequireValue(0)
                                                setSelected(e.target.value)
                                            }}
                                            name="radio-buttons-group"
                                        >
                                            <FormControlLabel value={0} control={<Radio />} label="No minimum requirements" />
                                            <FormControlLabel value={1} control={<Radio />} label="Minimum purchase amount" />
                                            {selected === '1' &&
                                                <CustomInput
                                                    type='number'
                                                    value={requireValue}
                                                    onChange={(e) => setRequireValue(e.target.value)}
                                                    icon={currency === 'USD' ? '$' : null}
                                                    unit={currency !== 'USD' ? 'VND' : null}
                                                />
                                            }
                                            <FormControlLabel value={2} control={<Radio />} label="Minimum quantity of items" />
                                            {selected === '2' &&
                                                <CustomInput
                                                    type='number'
                                                    value={requireValue}
                                                    onChange={(e) => setRequireValue(e.target.value)}
                                                />
                                            }
                                        </RadioGroup>
                                    </FormControl>
                                </Card.Body>
                            </BlankCard>

                            <BlankCard className='create-discount__limit-card'>
                                <Card.Body>
                                    <div className="text-title-2">Maximum discount uses</div>
                                    <div className="create-discount__limit-card__check-box">
                                        <Checkbox
                                            value={isLimit}
                                            onChange={(e) => {
                                                setIsLimit(e.target.checked)
                                            }}
                                        />
                                        <span className="text-normal-1">Limit number of times this discount can be used in total</span>
                                    </div>
                                    {isLimit &&
                                        <CustomInput
                                            value={limitValue}
                                            onChange={(e) => setLimitValue(e.target.value)}
                                            type='number'
                                            step='1'
                                        />
                                    }
                                </Card.Body>
                            </BlankCard>

                            <BlankCard className='create-discount__date-card'>
                                <Card.Body>
                                    <div className="text-title-2">Active dates</div>
                                    <Row className="">
                                        <Col md={6} sm={12}>
                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                <DatePicker
                                                    inputFormat="dd/MM/yyyy"
                                                    label="Start date"
                                                    value={startDate}
                                                    onChange={(newValue) => {
                                                        setStartDate(newValue);
                                                    }}
                                                    renderInput={(params) => <TextField {...params} />}
                                                />
                                            </LocalizationProvider>
                                        </Col>
                                        <Col md={6} sm={12}>
                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                <TimePicker
                                                    label="Start at"
                                                    value={startTime}
                                                    onChange={(newValue) => {
                                                        setStartTime(newValue);
                                                    }}
                                                    renderInput={(params) => <TextField {...params} />}
                                                />
                                            </LocalizationProvider>
                                        </Col>
                                    </Row>

                                    <div className="create-discount__date-card__check-box">
                                        <Checkbox
                                            value={isEnd}
                                            onChange={(e) => {
                                                setIsEnd(e.target.checked)
                                            }}
                                        />
                                        <span className="text-normal-1">Set end date</span>
                                    </div>

                                    {isEnd &&
                                        <Row style={{ marginTop: 20 }}>
                                            <Col md={6} sm={12}>
                                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                    <DatePicker
                                                        inputFormat="dd/MM/yyyy"
                                                        label="End date"
                                                        value={endDate}
                                                        onChange={(newValue) => {
                                                            setEndDate(newValue);
                                                        }}
                                                        renderInput={(params) => <TextField {...params} />}
                                                    />
                                                </LocalizationProvider>
                                            </Col>
                                            <Col md={6} sm={12}>
                                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                    <TimePicker
                                                        label="End at"
                                                        value={endTime}
                                                        onChange={(newValue) => {
                                                            setEndTime(newValue);
                                                        }}
                                                        renderInput={(params) => <TextField {...params} />}
                                                    />
                                                </LocalizationProvider>
                                            </Col>
                                        </Row>
                                    }

                                </Card.Body>
                            </BlankCard>
                        </Col>

                        <Col md={4} sm={12}>
                            <BlankCard>
                                <Card.Body className="create-discount__summary">
                                    <div className="text-title-2">Sumarry</div>
                                    {code ?
                                        <div className="create-discount__summary__code text-title-2">{code}</div>
                                        :
                                        <div className="create-discount__summary__code text-normal-2 font-weight-bold">No discount code yet.</div>}

                                    <div className="text-title-2 create-discount__summary__title">TYPE AND METHOD</div>
                                    <ul>
                                        <li className="text-normal-1">Amount off order</li>
                                        <li className="text-normal-1">Code</li>
                                    </ul>

                                    <div className="text-title-2 create-discount__summary__title">DETAILS</div>
                                    <ul>
                                        <li className="text-normal-1">Available on online sales channels</li>

                                        {discountValue && !valueType ?
                                            <li className="text-normal-1">{discountValue}% off all products</li> :
                                            discountValue && valueType ?
                                                <li className="text-normal-1">{currency === 'USD' ? '$' : null}{discountValue}{currency !== 'USD' ? 'VND' : null} off all products</li> :
                                                null
                                        }

                                        <li className='text-normal-1'>
                                            {selected === '0' || !requireValue ?
                                                'No minimum purchase requirement' :
                                                selected === '1' ?
                                                    `Minimum purchase of $${requireValue}` :
                                                    `Minimum purchase of ${requireValue} item`
                                            }
                                        </li>
                                        <li className='text-normal-1'>
                                            {isLimit ?
                                                `Limit of ${limitValue} uses` :
                                                `No usage limits`
                                            }
                                        </li>
                                        <li className='text-normal-1'>
                                            Active from {startDate.toDateString()} {isEnd ? `to ${endDate.toDateString()}` : null}
                                        </li>
                                    </ul>

                                </Card.Body>
                            </BlankCard>
                        </Col>
                    </Row>
                    <div className="create-discount__save">
                        <Button
                            onClick={handleCreateDiscount}
                            variant="success"
                        >
                            Save
                        </Button>
                    </div>
                </div>
            </div>
            <LoadingModal show={isLoading} />
        </div >
    )
}