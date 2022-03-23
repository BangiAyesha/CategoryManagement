import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import Category from "./components/pages/Category";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Products from "./components/products/Products";

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/category" element={<Category />} />
                    <Route path="/products" element={<Products />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
