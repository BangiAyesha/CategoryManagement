import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { lazy, Suspense } from "react";
import { Spinner } from "react-bootstrap";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
const Category = lazy(() => import("./components/pages/Category"));
const Products = lazy(() => import("./components/products/Products"));

function App() {
    return (
        <>
            <Router>
                <Suspense
                    fallback={
                        <div className="text-center">
                            <Spinner
                                animation="grow"
                                size="lg"
                                variant="primary"
                            />
                            <Spinner animation="grow" variant="secondary" />
                            <Spinner animation="grow" variant="success" />
                            <Spinner animation="grow" variant="danger" />
                            <Spinner animation="grow" variant="warning" />
                            <Spinner animation="grow" variant="info" />
                            <Spinner animation="grow" variant="dark" />
                        </div>
                    }
                >
                    <Routes>
                        <Route path="/category" element={<Category />} />
                        <Route path="/products" element={<Products />} />
                    </Routes>
                </Suspense>
            </Router>
        </>
    );
}

export default App;
