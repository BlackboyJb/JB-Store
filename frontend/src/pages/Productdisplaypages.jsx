import { Row, Col } from "react-bootstrap";
import Brands from "../component/Brand";
import Loader from "../helpers/loader";
import Message from "../helpers/message";
import { useGetProductsQuery } from "../slices/productApiSlice";

const Productdisplaypages = () => {
  const { data: product, isLoading, error } = useGetProductsQuery();
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
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
      )}
    </>
  );
};

export default Productdisplaypages;
