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
import App from "./App.jsx";
import ProductDisplayPage from "./pages/Productdisplaypages.jsx";
import ProductDetailPage from "./pages/ProductdetailsPage.jsx";
import Cartpage from "./pages/CartPage.jsx";
import stores from './store.js'
import {Provider} from 'react-redux'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" index={true} element={<ProductDisplayPage />} />
      <Route path="/product/:id"  element={<ProductDetailPage />}/>
      <Route path="/cart" element={<Cartpage />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <Provider store={stores}>
 <RouterProvider router={router} />
  </Provider>
);
