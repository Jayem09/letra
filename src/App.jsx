import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/customer/Home';
import Products from './pages/customer/Products';
import Dashboard from './pages/admin/Dashboard';
import ManageProducts from './pages/admin/ManageProduct';
import AddProduct from './pages/admin/AddProducts';
import PageNotFound from './pages/PageNotFound';
import ProductDetail from './pages/customer/ProductDetails';
import Login from './auth/Login'; // Import Login component
import PrivateRoute from './components/PrivateRoute'; // Import your PrivateRoute component
import Register from './auth/Register';
import Unauthorized from './components/Unautorize';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetail />} />
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

        {/* Catch all route */}
        <Route path="*" element={<PageNotFound />} />
        <Route path="/register" element={<Register />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
    </Router>
  );
}

export default App;