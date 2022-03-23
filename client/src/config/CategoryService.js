import axios from "axios";
import { URL } from "./Url";

export function addCategory(data) {
    return axios.post(`${URL}addcategory`, data);
}

export function getCategory() {
    return axios.get(`${URL}getcategory`);
}

export function deleteSubcategory(data) {
    return axios.put(`${URL}deletesubcategory`, data);
}

export function deleteCategory(id) {
    return axios.delete(`${URL}deletecategory/${id}`);
}

export function editSubcategory(data) {
    return axios.put(`${URL}editsubcategory`, data);
}

export function editCategory(data) {
    return axios.put(`${URL}editcategory`, data);
}
