import axios from "axios";
import { URL } from "./Url";

export function addCategory(data) {
    return axios.post(`${URL}category/addcategory`, data);
}

export function getCategory() {
    return axios.get(`${URL}category/getcategory`);
}

export function deleteSubcategory(data) {
    return axios.put(`${URL}category/deletesubcategory`, data);
}

export function deleteCategory(id) {
    return axios.delete(`${URL}category/deletecategory/${id}`);
}

export function editSubcategory(data) {
    return axios.put(`${URL}category/editsubcategory`, data);
}

export function editCategory(data) {
    return axios.put(`${URL}category/editcategory`, data);
}
