import React from "react";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import './StoreThemeCollection.scss'
import { Card } from "react-bootstrap";
import defaultThemeImg from '../../../assets/image/temp.png';
import { Loader } from "../../common/Loader/Loader";

export const ListStoreTheme = ({ listTheme, isLoading, setThemeDetail }) => {

    return (
        <div className="list-store-theme">
            {isLoading ?
                <Loader className='list-store-theme__loader' /> :
                <Row className="list-store-theme__list-theme">
                    {listTheme?.map((item) =>
                        <Col xs={12} md={6} lg={4}
                            key={item.id}
                            className="list-store-theme__list-theme__item">
                            <Card
                                style={{ cursor: 'pointer' }}
                                onClick={() => setThemeDetail(item)}
                            >
                                <Card.Img variant="top" src={item.thumbnail ? item.thumbnail : defaultThemeImg} />
                                <Card.Body>
                                    <Card.Text>
                                        {item.name}
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