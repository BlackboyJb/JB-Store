import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Row, Col, Card, Button, ListGroup, Image } from "react-bootstrap";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { toast } from "react-toastify";
import Message from "../helpers/message";
import Loader from "../helpers/loader";
import {
  useGetOrdersByIdQuery,
  usePayOrderMutation,
  useGetPayPalClientIdQuery,
  useDeliverOrderMutation,
} from "../slices/orderApiSlice";

const OrderPage = () => {
  const { id: orderId } = useParams();

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrdersByIdQuery(orderId);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();

  const [{ isPending }, payPalDispatch] = usePayPalScriptReducer();

  const [deliverOrder, { isLoading: deliveryLoading }] =
    useDeliverOrderMutation();

  const {
    data: payPal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPayPalClientIdQuery();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && payPal.clientId) {
      const loadPayPalScript = async () => {
        payPalDispatch({
          type: "resetOptions",
          value: {
            "client-id": payPal.clientId,
            currency: "USD",
          },
        });
        payPalDispatch({ type: "setLoadingStatus", value: "pending" });
      };
      if (order && order.isPaid) {
        if (!window.paypal) {
          loadPayPalScript();
        }
      }
    }
  }, [order, payPal, payPalDispatch, loadingPayPal, errorPayPal]);

  ///Functions for PayPal Payment
  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details }).unwrap();
        refetch();
        toast.success("Payment Successful");
      } catch (err) {
        toast.error(err?.data?.message || err.message);
      }
    });
  }

  function createOrder(data, actions) {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: order.totalPrice,
          },
        },
      ],
    })
    .then((orderID) => {
      return orderID;
    });
  }

  function onError(err) {
    toast.error(err.message);
  }

  // async function onApprovedTest() {
  //   await payOrder({ orderId, details: { payer: {} } });
  //   refetch();
  //   toast.success("Payment Successful");
  // }


  //Deliver Order Handler
  const deliverOrderHandler =async () => {
     try {
      await deliverOrder(orderId)
      refetch()
      toast.success('Delivery Successful')
     } catch (err) {
      toast.error(err?.data?.message || err.message);
     }
  }
  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error?.data?.message}</Message>
  ) : (
    <>
      <h1>Order Id = {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h1>Shipping</h1>
              <p>
                <strong>Name :</strong> {order.user.fullName}
              </p>
              <p>
                <strong>E-mail :</strong> {order.user.email}
              </p>
              <p>
                <strong>Shipping Address :</strong>{" "}
                {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
                {order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.country}.
              </p>
              {order.isDelivered ? (
                <Message variant="success">Delivered</Message>
              ) : (
                <Message variant="danger">Still Pending, Not Delivered</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h1>Payment Method</h1>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">Paid on :{order.paidAt}</Message>
              ) : (
                <Message variant="danger">No Payment Made</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.map((item, index) => (
                <ListGroup.Item key={index}>
                  <Row>
                    <Col md={1}>
                      <Image src={item.image} fluid rounded></Image>
                    </Col>
                    <Col>
                      <Link to={`/product/${item.products}`}>{item.name}</Link>
                    </Col>
                    <Col md={4}>
                      {item.qty} * {item.price} = ${item.qty * item.price}
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>Order Summary</ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Items Price</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping Price</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax Price</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total Price</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}

                  {isPending ? (
                    <Loader />
                  ) : (
                    <div>
                      {/* <Button
                        onClick={onApprovedTest}
                        style={{ marginBottom: "10px" }}
                      >
                        Test Pay Order
                      </Button> */}
                      <div>
                        <PayPalButtons
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onError={onError}
                        ></PayPalButtons>
                      </div>
                    </div>
                  )}
                </ListGroup.Item>
              )}

              {/* Mark AS DELVERED PLACEHOLDER */}
              {deliveryLoading && <Loader />}

              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type="button"
                      className="btn btn-block"
                      onClick={deliverOrderHandler}
                    >
                      Mark as Delivered
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderPage;
