import React, { useState, useEffect } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import {
    deleteCategory,
    deleteSubcategory,
    getCategory,
} from "../../config/CategoryService";
import AddCategory from "./AddCategory";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import EditSubcategory from "./EditSubcategory";
import { toast } from "react-toastify";
import EditCategory from "./EditCategory";
toast.configure();

export default function Category() {
    const [category, setCategory] = useState([]);

    const success = (data) => {
        toast.success(data, { position: toast.POSITION.TOP_RIGHT });
    };
    const failure = (data) => {
        toast.error(data, { position: toast.POSITION.TOP_RIGHT });
    };

    const deleteSubcat = (id) => {
        let data = { id: id };
        deleteSubcategory(data).then((res) => {
            if (res.data.flag === 0) {
                failure(res.data.message);
            } else if (res.data.flag === 1) {
                success(res.data.message);
            }
        });
    };

    const deleteCat = (id) => {
        console.log(id);
        let data = { id: id };
        console.log(data);
        deleteCategory(id).then((res) => {
            if (res.data.flag === 0) {
                failure(res.data.message);
            } else if (res.data.flag === 1) {
                success(res.data.message);
            }
        });
    };

    useEffect(() => {
        getCategory().then((res) => {
            setCategory(res.data);
        });
    }, []);
    return (
        <div className="text-center">
            <br />
            <AddCategory />
            <br />
            <Container>
                <Row>
                    {category.map((value, index) => {
                        return (
                            <Card
                                style={{ width: "18rem" }}
                                className="m-3"
                                key={index}
                            >
                                <Card.Body>
                                    <Card.Title>
                                        <Row>
                                            <Col md={8} sm={8} xs={8}>
                                                {value.categoryName}
                                            </Col>
                                            <Col md={2} sm={2} xs={2}>
                                                <EditCategory value={value} />
                                            </Col>
                                            <Col md={2} sm={2} xs={2}>
                                                <FontAwesomeIcon
                                                    icon={faTrashCan}
                                                    color="red"
                                                    size="xs"
                                                    onClick={() =>
                                                        deleteCat(value._id)
                                                    }
                                                />
                                            </Col>
                                        </Row>
                                    </Card.Title>
                                    <hr />
                                    {/* <Card.Text> */}
                                    {category[index].subcategory.map(
                                        (element, index) => {
                                            return (
                                                <div key={index}>
                                                    <Row
                                                        style={{
                                                            fontWeight: "bold",
                                                        }}
                                                    >
                                                        <Col
                                                            md={8}
                                                            sm={8}
                                                            xs={8}
                                                        >
                                                            <li
                                                                style={{
                                                                    listStyleType:
                                                                        "none",
                                                                }}
                                                            >
                                                                {element.name}
                                                            </li>
                                                        </Col>
                                                        <Col
                                                            md={2}
                                                            sm={2}
                                                            xs={2}
                                                        >
                                                            <EditSubcategory
                                                                value={element}
                                                            />
                                                        </Col>
                                                        <Col
                                                            md={2}
                                                            sm={2}
                                                            xs={2}
                                                        >
                                                            <FontAwesomeIcon
                                                                icon={
                                                                    faTrashCan
                                                                }
                                                                color="red"
                                                                onClick={() =>
                                                                    deleteSubcat(
                                                                        element._id
                                                                    )
                                                                }
                                                            />
                                                        </Col>
                                                    </Row>
                                                </div>
                                            );
                                        }
                                    )}
                                    {/* </Card.Text> */}
                                </Card.Body>
                            </Card>
                        );
                    })}
                </Row>
            </Container>
        </div>
    );
}
