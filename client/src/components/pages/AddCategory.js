import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { addCategory } from "../../config/CategoryService";
import { toast } from "react-toastify";
import Validation from "../common/Validation";
toast.configure();

export default function AddCategory() {
    const [show, setShow] = useState(false);
    const [data, setData] = useState("");
    const handler1 = (event) => {
        const { name, value } = event.target;
        setData({ ...data, [name]: value });
    };

    const success = (data) => {
        toast.success(data, { position: toast.POSITION.TOP_RIGHT });
    };
    const failure = (data) => {
        toast.error(data, { position: toast.POSITION.TOP_RIGHT });
    };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const add = () => {
        // event.preventDefault();
        const details = { data, values };
        console.log(details);
        addCategory(details).then((res) => {
            if (res.data.flag === 1) {
                success(res.data.message);
                handleClose();
            } else if (res.data.flag === 0) {
                failure(res.data.message);
            }
        });
    };

    const { handler, values, errors, handleSubmit } = Validation(add);
    console.log(errors);
    console.log(values);

    return (
        <div className="text-center">
            <Button variant="success" onClick={handleShow}>
                Add Category
            </Button>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                name="category"
                                onChange={handler}
                                type="text"
                                placeholder="Enter category"
                            />
                            <Form.Text>
                                {errors.category && (
                                    <p
                                        style={{
                                            color: "red",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        {errors.category}
                                    </p>
                                )}
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Sub-Category</Form.Label>
                            <Form.Control
                                name="subcategory"
                                onChange={handler1}
                                type="text"
                                placeholder="Enter sub-category"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={(e) => handleSubmit(e)}>
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
