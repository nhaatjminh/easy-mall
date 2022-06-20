import React from "react";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import './ThemeCollection.scss'
import defaultThemeImg from '../../../assets/image/temp.png';
import { TickIcon } from "../../../assets/icon/svg/TickIcon";

export const ThemeDetail = ({ theme }) => {

    return (
        <Row className="theme-detail">
            <Col
                xs={12} md={7}
                className="theme-detail__img"
            >
                <img src={theme.thumbnail ? theme.thumbnail : defaultThemeImg} />
            </Col>
            <Col
                xs={12} md={5}
                className="theme-detail__content"
            >
                <div className="theme-detail__content__text text-nomal-1">
                    A bold theme that elevates product quality and brand storytelling.
                </div>
                <div className="text-title-2">
                    Features
                </div>
                <div className="theme-detail__content__feature">
                    {['Quick buy', 
                    'Slideshow', 
                    'Advanced product filtering', 
                    'Customer testimonials']
                    .map((item, index) => (
                        <div key={index} className="theme-detail__content__feature__item">
                            <span>
                                <TickIcon/>
                            </span>
                            <span className="text-normal-1">
                                {item}
                            </span>
                        </div>
                    ))
                    }
                </div>
            </Col>
        </Row>
    )
}