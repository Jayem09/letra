import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/customer/Home';
import Products from './pages/customer/Products';
import Dashboard from './pages/admin/Dashboard';
import ManageProducts from './pages/admin/ManageProduct';
import AddProduct from './pages/admin/AddProducts'; // Ensure correct path
import PageNotFound from './pages/PageNotFound';
import ProductDetail from './pages/customer/ProductDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/manage-products" element={<ManageProducts />} />
        <Route path="/admin/add-products" element={<AddProduct />} /> {/* Ensure correct path */}
        <Route path="*" element={<PageNotFound />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
