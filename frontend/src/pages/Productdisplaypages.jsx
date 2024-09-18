import axios from 'axios'
import { useEffect, useState } from 'react';
import { Row, Col } from "react-bootstrap";
import Brands from '../component/Brand'

const Productdisplaypages = () => {
  const [product, setProduct] = useState([])
  useEffect(() => {
    const getProduct = async() => {
      try {
       const res = await axios.get('/api/product') 
       return setProduct(res.data )
      } catch (error) {
        console.log(error)
      }
    }
    getProduct()
  },[])
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
