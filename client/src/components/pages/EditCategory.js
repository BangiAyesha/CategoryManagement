import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { editCategory } from "../../config/CategoryService";
import { toast } from "react-toastify";
import Validation from "../common/Validation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
toast.configure();

export default function EditCategory(props) {
    const [show, setShow] = useState(false);

    const success = (data) => {
        toast.success(data, { position: toast.POSITION.TOP_RIGHT });
    };
    const failure = (data) => {
        toast.error(data, { position: toast.POSITION.TOP_RIGHT });
    };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const editCat = () => {
        let data = { id: props.value._id, category: values.category };
        editCategory(data).then((res) => {
            if (res.data.flag === 0) {
                failure(res.data.message);
            } else if (res.data.flag === 1) {
                success(res.data.message);
                setShow(false);
            }
        });
    };

    const { handler, values, errors, handleSubmit } = Validation(editCat);
    console.log(errors);
    console.log(values);

    return (
        <div className="text-center">
            <FontAwesomeIcon
                icon={faPencil}
                color="green"
                size="xs"
                onClick={handleShow}
            />
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Category</Modal.Title>
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
                                defaultValue={props.value.categoryName}
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
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={(e) => handleSubmit(e)}>
                        Edit
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
