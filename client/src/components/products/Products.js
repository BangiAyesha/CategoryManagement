import { faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { deleteProduct, getProducts } from "../../config/ProductService";
import AddProduct from "./AddProduct";
import { toast } from "react-toastify";
toast.configure();

export default function Products() {
    const [products, setProducts] = useState([]);

    const success = (data) => {
        toast.success({ data, position: toast.POSITION.TOP_RIGHT });
    };
    const failure = (data) => {
        toast.error({ data, position: toast.POSITION.TOP_RIGHT });
    };

    const deleteProd = (id) => {
        deleteProduct(id).then((res) => {
            if (res.data.flag === 0) {
                failure(res.data.message);
            } else if (res.data.flag === 1) {
                success(res.data.message);
            }
        });
    };

    useEffect(() => {
        getProducts().then((res) => {
            setProducts(res.data);
        });
    }, []);
    console.log(products);
    return (
        <div>
            <br />
            <AddProduct />
            <br />
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Product Name</th>
                        <th>Product Category</th>
                        <th>Product Subcategory</th>
                        <th>Product Cost</th>
                        <th colSpan={2}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((value, index) => {
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{value.name}</td>
                                <td>{value.category.categoryName}</td>
                                <td>{console.log(value.subcategory)}</td>
                                <td>{value.cost}</td>
                                <td>
                                    <FontAwesomeIcon
                                        icon={faPencil}
                                        color="green"
                                    />
                                </td>
                                <td>
                                    <FontAwesomeIcon
                                        icon={faTrashCan}
                                        color="red"
                                        onClick={() => deleteProd(value._id)}
                                    />
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </div>
    );
}
