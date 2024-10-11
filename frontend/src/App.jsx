import { Container } from "react-bootstrap";
import { Outlet } from 'react-router-dom'
import Headbox from "./component/Headers";
import Footbox from "./component/Footers";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  return (
    <>
      <Headbox />
      <main className="py-3">
        <Container>
       <Outlet />
        </Container>
      </main>
      <Footbox />
      <ToastContainer />
    </>
  );
};

export default App;
