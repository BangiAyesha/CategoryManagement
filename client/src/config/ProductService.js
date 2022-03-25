import axios from "axios";
import { URL } from "./Url";

export function addProduct(data) {
    return axios.post(`${URL}product/addproduct`, data);
}

export function getProducts() {
    return axios.get(`${URL}product/getproducts`);
}

export function deleteProduct(id) {
    return axios.delete(`${URL}product/deleteproduct/${id}`);
}
