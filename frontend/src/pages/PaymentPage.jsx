import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Form, Col, Button } from "react-bootstrap";
import FormCont from "../component/formCont";
import CheckoutSteps from "../component/checkoutSteps";
import { savePaymentMethod } from "../slices/cartSlice";

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeOrder");
  };
  return (
    <FormCont>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              className="my-2"
              label="PayPal or Credit Card"
              id="PayPal"
              name="paymentMethod"
              value="paypal"
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>

        <Button type="submit" variant="primary" >
          Continue
        </Button>
      </Form>
    </FormCont>
  );
};

export default PaymentPage;
