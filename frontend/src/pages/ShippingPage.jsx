import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../component/formCont";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { saveShippingAddress } from "../slices/cartSlice";
import { Country, State } from "country-state-city";
import CheckoutSteps from "../component/checkoutSteps";

const ShippingPage = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress?.address || "");
  const [city, setCity] = useState([]);
  const [selectedCity, setSelectedCity] = useState(shippingAddress?.selectedCity || "");
  const [country, setCountry] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(shippingAddress?.selectedCountry || "");
  const [countryFlag, setCountryFlag] = useState("");
  const [postalCode, setPostalCode] = useState(
    shippingAddress?.postalCode || ""
  );

  //initiating useDispacth and use Navigate
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //Getting the Country and States
  useEffect(() => {
    const getCountries = () => {
      const countryList = Country.getAllCountries();
      setCountry(countryList);
    };
    getCountries();
  }, []);

  // Fetch states and flag based on the selected country
  useEffect(() => {
    if (selectedCountry) {
      const selectedCountryIsoCode = country.find(
        (countries) => countries.name === selectedCountry
      )?.isoCode;

      const getCity = () => {
        const cityList = State.getStatesOfCountry(selectedCountryIsoCode);
        setCity(cityList);
      };

      // Set the flag based on the country ISO code
      const getCountryFlag = () => {
        const selectedCountryData = country.find(
          (country) => country.name === selectedCountry
        );
        if (selectedCountryData) {
          setCountryFlag(
            `https://flagcdn.com/w320/${selectedCountryData.isoCode.toLowerCase()}.png`
          );
        }
      };

      getCity();
      getCountryFlag();
    } else {
      setCity([]);
      setCountryFlag("");
    }
  }, [selectedCountry, country]);

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
    // setSelectedCity("");
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  const submitHnadler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, selectedCity, postalCode, selectedCountry}));
    navigate("/payment");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1  step2/>
      <h1>Shipping</h1>

      <Form onSubmit={submitHnadler}>
        <Form.Group controlId="countrySelect" className="my-3">
          <Form.Label>Select Country</Form.Label>
          <Form.Select value={selectedCountry} onChange={handleCountryChange}>
            <option value="">Select a Country</option>
            {country.map((country) => (
              <option key={country.isoCode} value={country.name}>
                {country.name} 
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        {countryFlag && (
          <div style={{ margin: "10px 0" }}>
            <img
              src={countryFlag}
              alt={`Flag of ${selectedCountry}`}
              style={{ width: "50px", height: "50px", borderRadius: "50%" }}
            />
          </div>
        )}

       
          <Form.Group controlId="stateSelect">
            <Form.Label>Select a State</Form.Label>
            <Form.Select value={selectedCity} onChange={handleCityChange}>
              <option value="">-- Select a state --</option>
              {city.map((state) => (
                <option key={state.isoCode} value={state.name}>
                  {state.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
   

        <Form.Group controlId="Address" className="my-3">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your Home Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="Postal Code" className="my-3">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter your Postal Code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary" className="mt-2">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingPage;
