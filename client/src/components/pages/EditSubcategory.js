import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import Validation from "../common/Validation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { editSubcategory } from "../../config/CategoryService";
toast.configure();

export default function EditSubcategory(props) {
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
    console.log(data.subcategory);

    const editSubcat = () => {
        setShow(true);
        let val = {
            id: props.value._id,
            subcategory: data.subcategory,
        };
        console.log("////////////////", data);
        editSubcategory(val).then((res) => {
            if (res.data.flag === 0) {
                failure(res.data.message);
            } else if (res.data.flag === 1) {
                success(res.data.message);
                setShow(false);
            }
        });
    };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className="text-center">
            <FontAwesomeIcon
                icon={faPencil}
                color="green"
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
                            <Form.Label>Sub-Category</Form.Label>
                            <Form.Control
                                name="subcategory"
                                onChange={handler1}
                                type="text"
                                placeholder="Enter sub-category"
                                defaultValue={props.value.name}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => editSubcat()}>
                        Edit
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
