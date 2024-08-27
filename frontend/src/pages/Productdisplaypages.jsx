import { Row, Col } from "react-bootstrap";
import product from "../products";
import Brands from '../component/Brand'

const Productdisplaypages = () => {
  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {product.map((item) => (
          <Col key={item._id} sm={12} md={6} lg={4} xl={3}>
             <Brands brands={item} />
        </Col>
        ))}
      </Row>
    </>
  );
};

export default Productdisplaypages;
