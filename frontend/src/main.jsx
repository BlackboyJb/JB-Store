import { createRoot } from "react-dom/client";
// import 'bootstrap/dist/css/bootstrap.min.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./assets/styles/bootstrap.custom.css";
import "./assets/styles/index.css";
import { Provider } from "react-redux";
import stores from "./store.js";
import App from "./App.jsx";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import {HelmetProvider} from 'react-helmet-async'
import PrivatePage from "./component/PrivateRoute.jsx";
import AdminPage from "./component/AdminRoute.jsx";
import ProductDisplayPage from "./pages/Productdisplaypages.jsx";
import ProductDetailPage from "./pages/ProductdetailsPage.jsx";
import Cartpage from "./pages/CartPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegsiterPage.jsx";
import ShippingPage from "./pages/ShippingPage.jsx";
import PaymentPage from "./pages/PaymentPage.jsx";
import PlaceOrderPage from "./pages/placeOrderPage.jsx";
import OrderPage from "./pages/OrderPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import OrderListPage from "./pages/Admin/OrderListPage.jsx";
import ProductListPage from "./pages/Admin/ProductListPage.jsx";
import ProductEditPage from "./pages/Admin/ProductEditPage.jsx";
import UserListPage from "./pages/Admin/UserListPage.jsx";
import UserEditPage from "./pages/Admin/UserEditPage.jsx"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/"  element={<ProductDisplayPage />} />
      <Route path="/search/:keywords" element={<ProductDisplayPage />} />
      <Route path="/page/:pageNo"  element={<ProductDisplayPage />} />
      <Route path="/search/:keywords/page/:pageNo/"  element={<ProductDisplayPage />} />
      <Route path="/product/:id" element={<ProductDetailPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/cart" element={<Cartpage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route path="" element={<PrivatePage />}>
        <Route path="/shipping" element={<ShippingPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/placeOrder" element={<PlaceOrderPage />} />
        <Route path="/order/:id" element={<OrderPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>

      <Route path="" element={<AdminPage />}>
        <Route path="/admin/orderList" element={<OrderListPage />} />
        <Route path="/admin/productList" element={<ProductListPage />} />
        <Route path="/admin/productList/:pageNo" element={<ProductListPage />} />
        <Route path="/admin/product/:id/edit" element={<ProductEditPage />} />
        <Route path="/admin/userList" element={<UserListPage />} />
       <Route path="/admin/user/:id/edit" element={<UserEditPage />} />
      </Route>
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
<HelmetProvider>
<Provider store={stores}>
    <PayPalScriptProvider options={{ clientId: "test" }}>
      <RouterProvider router={router} />
    </PayPalScriptProvider>
  </Provider>
</HelmetProvider>
 

  
);
