import React from "react";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import './ThemeCollection.scss'
import { Card } from "react-bootstrap";
import defaultThemeImg from '../../../assets/image/temp.png';
import { Loader } from "../../common/Loader/Loader";
import { CheckIcon } from "../../../assets/icon/svg/CheckIcon";

export const ListTheme = ({ listTheme, isLoading, setThemeDetail }) => {

    return (
        <div className="themes">
            {isLoading ?
                <Loader className='themes__loader' /> :
                <Row className="themes__list">
                    {listTheme?.map((item) =>
                        <Col xs={12} md={6} lg={4}
                            key={item.id}
                            className="themes__list__item">
                            <Card
                                style={{ cursor: 'pointer' }}
                                onClick={() => setThemeDetail(item)}
                            >
                                <div className="themes__list__item__container">
                                    <Card.Img
                                        className="themes__list__item__img"
                                        variant="top"
                                        src={item.thumbnail ? item.thumbnail : defaultThemeImg}
                                    />
                                </div>
                                <Card.Body>
                                    <Card.Text className="themes__list__item__name">
                                        {item.name}
                                        {item.current ?
                                        <span className="themes__list__item__name__current">
                                            current
                                        </span> : null}
                                        {item.owned ? <CheckIcon /> : null}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    )}
                </Row>
            }
        </div>
    )
}