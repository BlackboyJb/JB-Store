import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Message from "../../helpers/message";
import Loader from "../../helpers/loader";
import { toast } from "react-toastify";
import {
  useGetProductsQuery,
  useCreateProductsMutation,
  useDeleteProductMutation,
} from "../../slices/productApiSlice";
import Paginate from "../../component/Paginate"

const ProductListPage = () => {
  const {pageNo} = useParams()
  const { data,isLoading, error, refetch } = useGetProductsQuery({pageNo});
  const [createProduct, { isLoading: loadingProduct }] =
    useCreateProductsMutation();
  const [deleteProduct, { isLoading: loadingDelete }] =
    useDeleteProductMutation();

    
  const createProductHandler = async () => {
    if (window.confirm("Are you sure you want to create a New Product?")) {
      try {
        await createProduct();
        refetch();
      } catch (err) {
        toast.error(err?.data?.Message || err.error);
      }
    }
  };

  const deleteHandler = async (id) => {
    if (window.confirm("Are you Sure")) {
      try {
        await deleteProduct(id);
        refetch();
        toast.success('Deleted Sucessfully')
      } catch (err) {
        toast.error(err?.data?.Message || err.error);
      }
    }
  };
  return (
    <div>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-end">
          <Button className="btn-sm m-3" onClick={createProductHandler}>
            <FaEdit /> Create Product
          </Button>
        </Col>
      </Row>

      {loadingProduct && <Loader />}
     {loadingDelete && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.products.map((item) => (
                <tr key={item._id}>
                  <td>{item._id}</td>
                  <td>{item.name}</td>
                  <td>${item.price}</td>
                  <td>{item.category}</td>
                  <td>{item.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${item._id}/edit`}>
                      <Button variant="light" className="btn-sm mx-2">
                        <FaEdit />
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(item._id)}
                    >
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate page={data.page} pages={data.pages} isAdmin={true} />
        </>
      )}
    </div>
  );
};

export default ProductListPage;
