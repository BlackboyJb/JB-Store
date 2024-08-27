import { Container } from "react-bootstrap";
import { Outlet } from 'react-router-dom'
import Headbox from "./component/Headers";
import Footbox from "./component/Footers";


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
    </>
  );
};

export default App;
