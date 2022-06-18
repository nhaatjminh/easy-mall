import React, { useState } from "react";
import { Button, Card, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { CheckIcon } from "../../../assets/icon/svg/CheckIcon";
import defaultThemeImg from '../../../assets/image/temp.png';
import { doBuyTemplate, doUseTemplate } from "../../../redux/slice/themeSlice";
import './PaidThemeCollection.scss'

export const PaidThemCard = ({ item, storeId, setIsProcessing }) => {
    const [style, setStyle] = useState({ display: 'none' })
    const dispatch = useDispatch()

    const handleUseTheme = () => {
        const templateObj = {
            template: item,
            user_id: localStorage.getItem('userId'),
            store_id: storeId
        }
        setIsProcessing(true)
        dispatch(doUseTemplate(templateObj))
        .then((res) => {
            if (!res.payload.message) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Use theme successfully!',
                })
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oop...',
                    text: res.payload.message,
                })
            }
            setIsProcessing(false)
        })
    }

    const handleBuyTheme = () => {
        const templateObj = {
            template: item,
            user_id: localStorage.getItem('userId'),
            store_id: storeId
        }
        setIsProcessing(true)
        dispatch(doBuyTemplate(templateObj))
        .then((res) => {
            if (!res.payload.message) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Buy theme successfully!',
                })
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oop...',
                    text: res.payload.message,
                })
            }
            setIsProcessing(false)
        })
    }

    return (
        <Col xs={12} md={6} lg={4}
            className="paid-theme-collection__list-theme__item"
        >
            <Card style={{ cursor: 'pointer' }}>
                <div className="paid-theme-collection__list-theme__item__img-card">
                    <Card.Img
                        variant="top"
                        src={item.thumbnail ? item.thumbnail : defaultThemeImg}
                        onMouseEnter={(e) => setStyle({ display: 'block' })}
                    />
                    <div
                        className="paid-theme-collection__list-theme__item__img-card--hover-btn"
                        style={style}
                        onMouseLeave={(e) => setStyle({ display: 'none' })}
                    >
                        {item.owned ? 
                        <Button 
                            className="btn btn-success theme-card__hover-btn"
                            onClick={handleUseTheme}    
                        >
                            Use
                        </Button>
                        :
                        <Button 
                            variant="secondary" className="theme-card__hover-btn"
                            onClick={handleBuyTheme}
                        >
                            Buy
                        </Button>
                        }
                    </div>
                </div>

                <Card.Body>
                    <Card.Text className="theme-card__name">
                        {item.name}
                        {item.owned ? <CheckIcon/> : null}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>
    )
}