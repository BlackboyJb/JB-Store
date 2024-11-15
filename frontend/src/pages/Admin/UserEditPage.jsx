import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Message from "../../helpers/message";
import Loader from "../../helpers/loader";
import FormContainer from "../../component/formCont";
import { toast } from "react-toastify";
import {
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from "../../slices/userApiSlice";

const UserEditPage = () => {
  const { id: userId } = useParams();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const {
    data: users,
    isLoading,
    error,
    refetch,
  } = useGetUserDetailsQuery(userId);
  const [editUserProfile, { isLoading: loadingEditProfile }] =
    useUpdateUserMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (users) {
      setFullName(users.fullName);
      setEmail(users.email);
      setIsAdmin(users.isAdmin);
    }
  }, [users]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await editUserProfile({ userId, fullName, email, isAdmin });
      toast.success("Profile Updated Successfully");
      refetch();
      navigate("/admin/userList");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <>
      <Link to="/admin/userList" className="btn btn-light my-3 ">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User Profile</h1>
        {loadingEditProfile && <Loader />}

        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name" className="my-2">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="Email" className="my-2">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="Category" className="my-2">
              <Form.Check
                type="checkbox"
                label="Is Admin"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Button type="submit" variant="primary" className="my-2">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditPage;
