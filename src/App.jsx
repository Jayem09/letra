import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/customer/Home';
import Products from './pages/customer/Products';
import Dashboard from './pages/admin/Dashboard';
import ManageProducts from './pages/admin/ManageProduct';
import AddProduct from './pages/admin/AddProducts';
import Login from './auth/Login';
import PrivateRoute from './components/PrivateRoute';
import Unauthorized from './components/Unautorize'; // New component for Unauthorized access
import PageNotFound from './pages/PageNotFound';
import About from './pages/customer/About';
import ProductDetail from './pages/customer/ProductDetails';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />


        {/* Admin Routes - Protected with PrivateRoute */}
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/manage-products"
          element={
            <PrivateRoute>
              <ManageProducts />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/add-products"
          element={
            <PrivateRoute>
              <AddProduct />
            </PrivateRoute>
          }
        />

        {/* Unauthorized Route */}
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Catch all route */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
