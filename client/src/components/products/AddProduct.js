import React, { useState, useEffect } from "react";
import { Button, Dropdown, Form, Modal } from "react-bootstrap";
import { getCategory } from "../../config/CategoryService";
import { addProduct } from "../../config/ProductService";
import { toast } from "react-toastify";
toast.configure();

export default function AddProduct() {
    const [show, setShow] = useState(false);
    const [drop, setDrop] = useState([]);
    const [cat, setCat] = useState([]);
    const [sub, setSub] = useState([]);
    const [data, setData] = useState({
        pname: "",
        cost: "",
        rating: "",
        material: "",
        producer: "",
        stock: "",
        description: "",
    });

    const handler = (event) => {
        const { name, value } = event.target;
        setData({ ...data, [name]: value });
    };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const success = (data) => {
        toast.success(data, { position: toast.POSITION.TOP_RIGHT });
    };
    const failure = (data) => {
        toast.error(data, { position: toast.POSITION.TOP_RIGHT });
    };

    const addProd = (event) => {
        event.preventDefault();
        let value = {
            name: data.pname,
            cost: data.cost,
            rating: data.rating,
            material: data.material,
            producer: data.producer,
            stock: data.stock,
            description: data.description,
            category: cat._id,
            subcategory: sub._id,
        };
        addProduct(value).then((res) => {
            if (res.data.flag === 0) {
                failure(res.data.message);
            } else if (res.data.flag === 1) {
                success(res.data.message);
                setShow(false);
            }
        });
    };

    useEffect(() => {
        getCategory().then((res) => {
            setDrop(res.data);
        });
    }, []);
    return (
        <div className="text-center">
            <Button variant="success" onClick={handleShow}>
                Add Product
            </Button>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add Products Here</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Product name"
                                name="pname"
                                onChange={handler}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Dropdown>
                                <Dropdown.Toggle variant="outline-secondary">
                                    {cat.length !== 0
                                        ? cat.categoryName
                                        : "Select category"}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {drop.map((value, index) => {
                                        return (
                                            <Dropdown.Item
                                                key={index}
                                                onClick={() => setCat(value)}
                                            >
                                                {value.categoryName}
                                            </Dropdown.Item>
                                        );
                                    })}
                                </Dropdown.Menu>
                            </Dropdown>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Dropdown>
                                <Dropdown.Toggle variant="outline-secondary">
                                    {sub.length === 0
                                        ? "Select Subcategory"
                                        : sub.name}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {cat.length !== 0
                                        ? cat.subcategory.map(
                                              (value, index) => {
                                                  return (
                                                      <Dropdown.Item
                                                          key={index}
                                                          onClick={() =>
                                                              setSub(value)
                                                          }
                                                      >
                                                          {value.name}
                                                      </Dropdown.Item>
                                                  );
                                              }
                                          )
                                        : ""}
                                </Dropdown.Menu>
                            </Dropdown>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Product Cost</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter Cost"
                                name="cost"
                                onChange={handler}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Product description</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter description"
                                name="description"
                                onChange={handler}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Product rating</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter Rating"
                                name="rating"
                                onChange={handler}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Product Producer</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Producer"
                                name="producer"
                                onChange={handler}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Product Stock</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter stock"
                                name="stock"
                                onChange={handler}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Product Material</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter material"
                                name="material"
                                onChange={handler}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={(e) => addProd(e)}>
                        Add Product
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
