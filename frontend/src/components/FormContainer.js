//Bahot sy form k leye same styling chaiye is lye ye template bana rahy
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
//jitny b form banaien gay wo as a children isky bech mein chaly jaein gay
const FormContainer = ({ children }) => {
  return (
    <Container>
      <Row className='justify-content-md-center'>
        <Col xs={12} md={6}>
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;
