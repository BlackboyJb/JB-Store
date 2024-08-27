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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" index={true} element={<ProductDisplayPage />} />
      <Route path="/product/:id"  element={<ProductDetailPage />}/>
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
