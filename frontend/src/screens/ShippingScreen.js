// import React, { useState } from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { Form, Button } from 'react-bootstrap';
// import { useDispatch, useSelector } from 'react-redux';
// import FormContainer from '../components/FormContainer';
// const ShippingScreen = () => {
//   const navigate = useNavigate();
//   const [address, setAddress] = useState();
//   const [city, setCity] = useState();
//   const [postalCode, setPostalCode] = useState();
//   const [country, setCountry] = useState();
//   return (
//     <FormContainer>
//       <h1>Shipping</h1>
//       <Form onSubmit={submitHandler}>
//         <Form.Group controlId='name'>
//           <Form.Label>Name</Form.Label>
//           <Form.Control
//             type='name'
//             placeholder='Enter Name'
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           ></Form.Control>
//         </Form.Group>
//       </Form>
//     </FormContainer>
//   );
// };
// export default ShippingScreen;
