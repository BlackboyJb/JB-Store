import { Alert } from "react-bootstrap";



const message = ({variant, children}) => {
  return (
  <Alert variant={variant}>{children}</Alert>
  )
}


message.defaultProps ={
    variant:'info'
}

export default message
