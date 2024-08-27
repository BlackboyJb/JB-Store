import { useParams, Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import product from "../products";
import Rating from '../helpers/ratings'

const ProductdetailsPage = () => {
  const { id: prouctID } = useParams();
  const products = product.find((p) => p._id === prouctID);
  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      <Row>
        <Col md={5}>
          <Image src={products.image} alt="" width='500px' />
        </Col>

        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroup.Item as='h1'>{products.name}</ListGroup.Item>
            <ListGroup.Item><Rating value={products.rating} /></ListGroup.Item>
            <ListGroup.Item as='p'>Description: {products.description}</ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={3}>
        <Card>
          <ListGroup variant="flush">
          <ListGroup.Item>
            <Row>
             <Col>Description:</Col>
             <Col><strong>${products.price}</strong></Col>
            </Row>
          </ListGroup.Item>

          <ListGroup.Item>
            <Row>
             <Col>Status:</Col>
             <Col><strong>{products.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</strong></Col>
            </Row>
          </ListGroup.Item>

          
          <ListGroup.Item>
          <Button className="btn-block"
              type="button"
              disabled={products.countInStock === 0}
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
