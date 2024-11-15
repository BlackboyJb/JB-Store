import {Container, Row, Col}  from 'react-bootstrap'





const Footers = () => {
    const currentYear = new Date().getFullYear()
  return (
    <footer>
        <Container>
            <Row>
                <Col className='text-center py-3'>
                <p>JB STORE &copy; {currentYear} </p>
                </Col>
            </Row>
        </Container>
    </footer>
  )
}

export default Footers
