import { Card } from "react-bootstrap";
import {Link} from 'react-router-dom'
import Rating from '../helpers/ratings'


const Brand = ({ brands }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${brands._id}`}>
        <Card.Img src={brands.image} variant="top" />
      </Link>

      <Card.Body>
        <Link to={`/product/${brands._id}`}>
          <Card.Title as="div">
            <strong>{brands.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="h3">${brands.price}</Card.Text>

        <Card.Text as='div'>
          <Rating value={brands.rating} />
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Brand;
