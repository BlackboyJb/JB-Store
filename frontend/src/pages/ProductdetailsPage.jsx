import { useParams, Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import Rating from '../helpers/ratings'
import axios from "axios";
import { useEffect, useState } from "react";

const ProductdetailsPage = () => {
  const { id: productID } = useParams();

  const [product, setProduct] = useState([])

  useEffect(() => {
   const getProductDetails = async() => {
    try {
      const res = await axios.get(`/api/product/${productID}`)
      return setProduct(res.data)
    } catch (error) {
      console.log(error)
    }
   }
   getProductDetails()
  },[productID])
    


  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      <Row>
        <Col md={5}>
          <Image src={product.image} alt="" width='500px' />
        </Col>

        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroup.Item as='h1'>{product.name}</ListGroup.Item>
            <ListGroup.Item><Rating value={product.rating} /></ListGroup.Item>
            <ListGroup.Item as='p'>Description: {product.description}</ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={3}>
        <Card>
          <ListGroup variant="flush">
          <ListGroup.Item>
            <Row>
             <Col>Description:</Col>
             <Col><strong>${product.price}</strong></Col>
            </Row>
          </ListGroup.Item>

          <ListGroup.Item>
            <Row>
             <Col>Status:</Col>
             <Col><strong>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</strong></Col>
            </Row>
          </ListGroup.Item>

          
          <ListGroup.Item>
          <Button className="btn-block"
              type="button"
              disabled={product.countInStock === 0}
          >
            Add to Cart
          </Button>
          </ListGroup.Item>

          </ListGroup>
          </Card>
          </Col>
      </Row>
    </>
  );
};

export default ProductdetailsPage;
