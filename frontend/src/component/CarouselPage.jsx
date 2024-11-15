import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import Loader from "../helpers/loader";
import Message from "../helpers/message";
import { useGetTopProductQuery} from "../slices/productApiSlice";




const CarouselPage = () => {
  
  const { data: products, isLoading, error } = useGetTopProductQuery();

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Carousel pause="hover" className="bg-primary mb-3 carousel" >
        {products.map(item => (
           <Carousel.Item key={item._id} className="carousel-item">
            <Link to={`product/${item._id}`}>
             <Image src={item.image} alt={item.name}   fluid></Image>
             <Carousel.Caption className="carousel-caption">
                <h2>
                    {item.name} (${item.price})
                </h2>
             </Carousel.Caption>
            </Link>
           </Carousel.Item>
        ))}
    </Carousel>
  );
};






export default CarouselPage

