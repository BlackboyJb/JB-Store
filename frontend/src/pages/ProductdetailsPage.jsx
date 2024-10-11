import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Form,
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
} from "react-bootstrap";
import Rating from "../helpers/ratings";
import { useGetProductsbyIdQuery } from "../slices/productApiSlice.js";
import Loader from "../helpers/loader.jsx";
import { addToCart} from "../slices/cartSlice.js";

const ProductdetailsPage = () => {
  //Params for ID
  const { id: productID } = useParams();

  //useDispatch 
  const dispatch = useDispatch()
  
  //useNavigate
  const navigate = useNavigate()

  //Use State for controlling Quantity
  const [qty, setQty] = useState(1);

  //ProductApiSlice
  const {
    data: product,
    isLoading,
    error,
  } = useGetProductsbyIdQuery(productID);


 //for handling products in the Cart
 const addToCartBtn = () => {
  dispatch(addToCart({...product, qty}))
  navigate('/cart')
};



  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <div>{error.data.message || error.error};</div>
      ) : (
        <>
          <Row>
            <Col md={5}>
              <Image src={product.image} alt="" width="400px" />
            </Col>
            <Col md={4}>
              <ListGroup variant="flush">
                <ListGroup.Item as="h1">{product.name}</ListGroup.Item>
                <ListGroup.Item>
                  <Rating value={product.rating} />
                </ListGroup.Item>
                <ListGroup.Item as="p">
                  Description: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>

            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Description:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(Number(e.target.value))}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        <strong>
                          {product.countInStock > 0
                            ? "In Stock"
                            : "Out of Stock"}
                        </strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Button
                      className="btn-block"
                      type="button"
                      disabled={product.countInStock === 0}
                      onClick={() => addToCartBtn()}
                    >
                      Add to Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductdetailsPage;
