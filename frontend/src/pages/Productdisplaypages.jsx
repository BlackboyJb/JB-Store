import { Row, Col } from "react-bootstrap";
import Brands from "../component/Brand";
import Loader from "../helpers/loader";
import Message from "../helpers/message";
import Paginate from "../component/Paginate.jsx"
import CarouselPage from '../component/CarouselPage.jsx'
import { useGetProductsQuery } from "../slices/productApiSlice";
import { Link, useParams } from "react-router-dom";


const Productdisplaypages = () => {
  const {pageNo, keywords} = useParams()
  const { data, isLoading, error } = useGetProductsQuery({keywords,pageNo});
  return (
    <>
    {!keywords  ? ( <CarouselPage />) : (<Link to='/' className="btn btn-light mb-4">Go Back</Link>)}
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
            {data.products.map((item) => (
              <Col key={item._id} sm={12} md={6} lg={4} xl={3}>
                <Brands brands={item} />
              </Col>
            ))}
          </Row>
          <Paginate pages={data.pages} page={data.page} keyword={keywords ? keywords : ''} />
        </>
      )}
    </>
  );
};

export default Productdisplaypages;
